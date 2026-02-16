import {
    ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine, LabelList
} from 'recharts';

export function SupplyChainNetwork({ data, selectedSupplier, onSupplierClick }) {
    // Aggregate data by supplier
    const supplierData = {};
    
    data.forEach(item => {
        const supplier = item['Supplier name'];
        
        if (!supplierData[supplier]) {
            supplierData[supplier] = {
                name: supplier,
                location: item.Location,
                totalRevenue: 0,
                avgDefectRate: 0,
                avgLeadTime: 0,
                avgShippingTime: 0,
                count: 0,
                failCount: 0,
                passCount: 0,
                pendingCount: 0
            };
        }
        
        supplierData[supplier].totalRevenue += parseFloat(item['Revenue generated']) || 0;
        supplierData[supplier].avgDefectRate += parseFloat(item['Defect rates']) || 0;
        supplierData[supplier].avgLeadTime += parseFloat(item['Lead times']) || 0;
        supplierData[supplier].avgShippingTime += parseFloat(item['Shipping times']) || 0;
        supplierData[supplier].count += 1;
        
        if (item['Inspection results'] === 'Fail') supplierData[supplier].failCount++;
        if (item['Inspection results'] === 'Pass') supplierData[supplier].passCount++;
        if (item['Inspection results'] === 'Pending') supplierData[supplier].pendingCount++;
    });

    // Position suppliers in a network layout
    const positions = {
        'Supplier 1': { x: -60, y: 40 },
        'Supplier 2': { x: -30, y: -30 },
        'Supplier 3': { x: 0, y: 50 },
        'Supplier 4': { x: 30, y: -20 },
        'Supplier 5': { x: 60, y: 30 }
    };

    const nodes = Object.values(supplierData).map(s => {
        const avgDefectRate = s.avgDefectRate / s.count;
        const avgLeadTime = s.avgLeadTime / s.count;
        
        // Color based on defect rate (Red = high, Orange = medium, Green = low)
        let fill = '#4caf50'; // Green - stable
        if (avgDefectRate > 3) fill = '#d32f2f'; // Red - high delay
        else if (avgDefectRate > 1.5) fill = '#ff9800'; // Orange - moderate delay
        
        // Highlight selected supplier
        if (selectedSupplier && s.name === selectedSupplier) {
            fill = '#2196f3'; // Blue for selected
        }
        
        return {
            ...s,
            avgDefectRate,
            avgLeadTime: avgLeadTime,
            avgShippingTime: s.avgShippingTime / s.count,
            x: positions[s.name]?.x || 0,
            y: positions[s.name]?.y || 0,
            size: s.totalRevenue / 100, // Size based on revenue
            fill
        };
    });

    const hub = { name: 'Distribution Hub', x: 0, y: 0, size: 800, fill: '#1976d2' };

    const handleNodeClick = (data) => {
        if (data && data.name !== 'Distribution Hub') {
            onSupplierClick(data.name === selectedSupplier ? null : data.name);
        }
    };

    return (
        <div style={{ width: '100%', height: 600 }}>
            <ResponsiveContainer width="100%" height={450}>
                <ScatterChart margin={{ top: 60, right: 50, bottom: 30, left: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" hide domain={[-80, 80]} />
                    <YAxis type="number" dataKey="y" hide domain={[-60, 70]} />
                    <ZAxis type="number" dataKey="size" range={[200, 800]} />
                    <Tooltip 
                        content={({ payload }) => {
                            if (payload && payload[0]) {
                                const d = payload[0].payload;
                                if (d.name === 'Distribution Hub') return null;
                                return (
                                    <div className="custom-tooltip">
                                        <p><strong>{d.name}</strong></p>
                                        <p>Location: {d.location}</p>
                                        <p>Products: {d.count}</p>
                                        <p>Avg Defect Rate: {d.avgDefectRate?.toFixed(2)}%</p>
                                        <p>Avg Lead Time: {d.avgLeadTime?.toFixed(1)} days</p>
                                        <p>Avg Shipping Time: {d.avgShippingTime?.toFixed(1)} days</p>
                                        <p>Total Revenue: ${d.totalRevenue?.toFixed(0)}</p>
                                        <p style={{ marginTop: '8px', fontSize: '11px' }}>
                                            Pass: {d.passCount} | Fail: {d.failCount} | Pending: {d.pendingCount}
                                        </p>
                                        <p style={{ fontSize: '10px', fontStyle: 'italic', marginTop: '4px' }}>
                                            Click to filter
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />

                    {/* Draw connections from hub to suppliers */}
                    {nodes.map((node, index) => (
                        <ReferenceLine
                            key={`line-${index}`}
                            segment={[{ x: 0, y: 0 }, { x: node.x, y: node.y }]}
                            stroke={node.fill}
                            strokeWidth={selectedSupplier === node.name ? 3 : 2}
                            strokeOpacity={selectedSupplier && selectedSupplier !== node.name ? 0.2 : 0.6}
                        />
                    ))}

                    {/* Hub */}
                    <Scatter data={[hub]} fill="#1976d2">
                        <LabelList dataKey="name" position="bottom" 
                                  style={{ fill: '#1976d2', fontSize: '14px', fontWeight: 'bold' }} />
                    </Scatter>

                    {/* Supplier nodes */}
                    <Scatter 
                        data={nodes}
                        onClick={handleNodeClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <LabelList dataKey="name" position="top" 
                                  style={{ fill: '#333', fontSize: '12px', fontWeight: 'bold' }} />
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>

            <div className="legend" style={{ marginTop: '20px', padding: '10px 0' }}>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#4caf50' }}></span>
                    <span>Low Defect Rate (&lt;1.5%)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#ff9800' }}></span>
                    <span>Moderate Defect Rate (1.5-3%)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#d32f2f' }}></span>
                    <span>High Defect Rate (&gt;3%)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#2196f3' }}></span>
                    <span>Selected Supplier</span>
                </div>
            </div>
        </div>
    );
}


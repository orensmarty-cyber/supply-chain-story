import {
    ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend, ReferenceLine, Label
} from 'recharts';

export function RevenueImpact({ data, selectedSupplier }) {
    // Aggregate data by supplier
    const supplierStats = {};
    
    data.forEach(item => {
        const supplier = item['Supplier name'];
        
        if (!supplierStats[supplier]) {
            supplierStats[supplier] = {
                supplier,
                totalRevenue: 0,
                totalDefectRate: 0,
                totalLeadTime: 0,
                count: 0
            };
        }
        
        supplierStats[supplier].totalRevenue += parseFloat(item['Revenue generated']) || 0;
        supplierStats[supplier].totalDefectRate += parseFloat(item['Defect rates']) || 0;
        supplierStats[supplier].totalLeadTime += parseFloat(item['Lead times']) || 0;
        supplierStats[supplier].count += 1;
    });

    const chartData = Object.values(supplierStats).map(s => ({
        supplier: s.supplier,
        revenue: s.totalRevenue,
        avgDefectRate: s.totalDefectRate / s.count,
        avgLeadTime: s.totalLeadTime / s.count,
        productCount: s.count
    }));

    // Determine fill color based on defect rate
    const getColor = (defectRate) => {
        if (defectRate > 3) return '#d32f2f'; // Red - high risk
        if (defectRate > 1.5) return '#ff9800'; // Orange - moderate risk
        return '#4caf50'; // Green - low risk
    };

    const dataWithColors = chartData.map(d => ({
        ...d,
        fill: selectedSupplier === d.supplier ? '#2196f3' : getColor(d.avgDefectRate)
    }));

    return (
        <div style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        type="number" 
                        dataKey="avgDefectRate" 
                        name="Avg Defect Rate" 
                        unit="%"
                        label={{ value: 'Average Defect Rate (%)', position: 'bottom', offset: 40 }}
                    />
                    <YAxis 
                        type="number" 
                        dataKey="revenue" 
                        name="Revenue" 
                        unit="$"
                        label={{ value: 'Total Revenue ($)', angle: -90, position: 'insideLeft', offset: 10 }}
                    />
                    <ZAxis 
                        type="number" 
                        dataKey="productCount" 
                        range={[100, 1000]} 
                        name="Products"
                    />
                    <Tooltip 
                        content={({ payload }) => {
                            if (payload && payload[0]) {
                                const d = payload[0].payload;
                                return (
                                    <div className="custom-tooltip">
                                        <p><strong>{d.supplier}</strong></p>
                                        <p>Total Revenue: ${d.revenue.toFixed(0)}</p>
                                        <p>Avg Defect Rate: {d.avgDefectRate.toFixed(2)}%</p>
                                        <p>Avg Lead Time: {d.avgLeadTime.toFixed(1)} days</p>
                                        <p>Products: {d.productCount}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend 
                        payload={[
                            { value: 'Low Risk (Defect < 1.5%)', type: 'circle', color: '#4caf50' },
                            { value: 'Moderate Risk (1.5-3%)', type: 'circle', color: '#ff9800' },
                            { value: 'High Risk (Defect > 3%)', type: 'circle', color: '#d32f2f' },
                        ]}
                    />
                    
                    {/* Critical threshold line */}
                    <ReferenceLine x={3} stroke="#d32f2f" strokeDasharray="3 3">
                        <Label value="Critical" position="top" style={{ fill: '#d32f2f', fontSize: '11px' }} />
                    </ReferenceLine>
                    
                    <Scatter 
                        data={dataWithColors.filter(d => !selectedSupplier || d.supplier !== selectedSupplier)} 
                        opacity={selectedSupplier ? 0.3 : 1}
                    />
                    
                    {selectedSupplier && (
                        <Scatter 
                            data={dataWithColors.filter(d => d.supplier === selectedSupplier)}
                        />
                    )}
                </ScatterChart>
            </ResponsiveContainer>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '10px' }}>
                Bubble size represents number of products. High-revenue suppliers with high defect rates pose the greatest risk.
            </p>
        </div>
    );
}


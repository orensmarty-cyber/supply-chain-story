import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, ReferenceLine, Label, Cell
} from 'recharts';

export function DefectRateChart({ data, selectedSupplier, onSupplierClick }) {
    // Aggregate data by supplier
    const supplierStats = {};
    
    data.forEach(item => {
        const supplier = item['Supplier name'];
        
        if (!supplierStats[supplier]) {
            supplierStats[supplier] = {
                supplier,
                totalDefectRate: 0,
                count: 0,
                failCount: 0,
                passCount: 0
            };
        }
        
        supplierStats[supplier].totalDefectRate += parseFloat(item['Defect rates']) || 0;
        supplierStats[supplier].count += 1;
        
        if (item['Inspection results'] === 'Fail') supplierStats[supplier].failCount++;
        if (item['Inspection results'] === 'Pass') supplierStats[supplier].passCount++;
    });

    const chartData = Object.values(supplierStats).map(s => ({
        supplier: s.supplier,
        avgDefectRate: s.totalDefectRate / s.count,
        failCount: s.failCount,
        passCount: s.passCount
    })).sort((a, b) => b.avgDefectRate - a.avgDefectRate);

    const getBarColor = (defectRate) => {
        if (defectRate > 3) return '#d32f2f'; // Red - high
        if (defectRate > 1.5) return '#ff9800'; // Orange - moderate
        return '#4caf50'; // Green - low
    };

    const handleBarClick = (data) => {
        if (data && data.supplier) {
            onSupplierClick(data.supplier === selectedSupplier ? null : data.supplier);
        }
    };

    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                <BarChart 
                    data={chartData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    onClick={(e) => e && e.activePayload && handleBarClick(e.activePayload[0].payload)}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="supplier" />
                    <YAxis label={{ value: 'Defect Rate (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                        content={({ payload }) => {
                            if (payload && payload[0]) {
                                const d = payload[0].payload;
                                return (
                                    <div className="custom-tooltip">
                                        <p><strong>{d.supplier}</strong></p>
                                        <p>Avg Defect Rate: {d.avgDefectRate.toFixed(2)}%</p>
                                        <p>Failed Inspections: {d.failCount}</p>
                                        <p>Passed Inspections: {d.passCount}</p>
                                        <p style={{ fontSize: '10px', fontStyle: 'italic', marginTop: '4px' }}>
                                            Click to filter
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    
                    {/* Critical threshold annotation */}
                    <ReferenceLine y={3} stroke="#d32f2f" strokeDasharray="3 3">
                        <Label value="Critical Threshold (3%)" position="right" 
                               style={{ fill: '#d32f2f', fontSize: '12px' }} />
                    </ReferenceLine>
                    
                    <Bar 
                        dataKey="avgDefectRate" 
                        name="Avg Defect Rate (%)"
                        style={{ cursor: 'pointer' }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={selectedSupplier === entry.supplier ? '#2196f3' : getBarColor(entry.avgDefectRate)}
                                opacity={selectedSupplier && selectedSupplier !== entry.supplier ? 0.3 : 1}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}


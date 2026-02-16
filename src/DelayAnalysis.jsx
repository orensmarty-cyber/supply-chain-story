import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Brush
} from 'recharts';

export function DelayAnalysis({ data, selectedSupplier }) {
    // Aggregate data by supplier
    const supplierStats = {};
    
    data.forEach(item => {
        const supplier = item['Supplier name'];
        
        if (!supplierStats[supplier]) {
            supplierStats[supplier] = {
                supplier,
                totalLeadTime: 0,
                totalShippingTime: 0,
                count: 0
            };
        }
        
        supplierStats[supplier].totalLeadTime += parseFloat(item['Lead times']) || 0;
        supplierStats[supplier].totalShippingTime += parseFloat(item['Shipping times']) || 0;
        supplierStats[supplier].count += 1;
    });

    const chartData = Object.values(supplierStats).map(s => ({
        supplier: s.supplier,
        avgLeadTime: s.totalLeadTime / s.count,
        avgShippingTime: s.totalShippingTime / s.count,
        totalDelay: (s.totalLeadTime + s.totalShippingTime) / s.count
    })).sort((a, b) => b.totalDelay - a.totalDelay);

    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="supplier" />
                    <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                        content={({ payload }) => {
                            if (payload && payload[0]) {
                                const data = payload[0].payload;
                                return (
                                    <div className="custom-tooltip">
                                        <p><strong>{data.supplier}</strong></p>
                                        <p>Avg Lead Time: {data.avgLeadTime.toFixed(1)} days</p>
                                        <p>Avg Shipping Time: {data.avgShippingTime.toFixed(1)} days</p>
                                        <p>Total Avg Delay: {data.totalDelay.toFixed(1)} days</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend />
                    <Bar 
                        dataKey="avgLeadTime" 
                        fill="#8884d8" 
                        name="Avg Lead Time"
                        opacity={selectedSupplier ? 0.3 : 1}
                    />
                    <Bar 
                        dataKey="avgShippingTime" 
                        fill="#82ca9d" 
                        name="Avg Shipping Time"
                        opacity={selectedSupplier ? 0.3 : 1}
                    />
                    {selectedSupplier && chartData.filter(d => d.supplier === selectedSupplier).map(d => (
                        <>
                            <Bar 
                                key={`lead-${d.supplier}`}
                                dataKey="avgLeadTime" 
                                fill="#8884d8" 
                                data={[d]}
                            />
                            <Bar 
                                key={`ship-${d.supplier}`}
                                dataKey="avgShippingTime" 
                                fill="#82ca9d" 
                                data={[d]}
                            />
                        </>
                    ))}
                    <Brush dataKey="supplier" height={30} stroke="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}


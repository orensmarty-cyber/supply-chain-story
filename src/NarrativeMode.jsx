import { useState } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine, LabelList, Label
} from 'recharts';

export function NarrativeMode({ data, onStartExploring }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Filter data for different narrative stages
    const stableData = data.filter(d => d['Inspection results'] === 'Pass');
    const disruptedData = data.filter(d => d['Inspection results'] === 'Fail');
    const recoveryData = data.filter(d => d['Inspection results'] === 'Pending');

    // Create network nodes for visualization
    const createNetworkNodes = (filteredData) => {
        const suppliers = {};
        
        filteredData.forEach(item => {
            const supplier = item['Supplier name'];
            const location = item.Location;
            
            if (!suppliers[supplier]) {
                suppliers[supplier] = {
                    name: supplier,
                    location: location,
                    totalRevenue: 0,
                    avgDefectRate: 0,
                    avgLeadTime: 0,
                    count: 0,
                    avgShippingTime: 0
                };
            }
            
            suppliers[supplier].totalRevenue += parseFloat(item['Revenue generated']) || 0;
            suppliers[supplier].avgDefectRate += parseFloat(item['Defect rates']) || 0;
            suppliers[supplier].avgLeadTime += parseFloat(item['Lead times']) || 0;
            suppliers[supplier].avgShippingTime += parseFloat(item['Shipping times']) || 0;
            suppliers[supplier].count += 1;
        });

        // Calculate averages and create positioned nodes
        const positions = {
            'Supplier 1': { x: -60, y: 40 },
            'Supplier 2': { x: -30, y: -30 },
            'Supplier 3': { x: 0, y: 50 },
            'Supplier 4': { x: 30, y: -20 },
            'Supplier 5': { x: 60, y: 30 }
        };

        return Object.values(suppliers).map(s => ({
            ...s,
            avgDefectRate: s.avgDefectRate / s.count,
            avgLeadTime: s.avgLeadTime / s.count,
            avgShippingTime: s.avgShippingTime / s.count,
            x: positions[s.name]?.x || 0,
            y: positions[s.name]?.y || 0,
            size: s.totalRevenue / 100,
            fill: s.avgDefectRate > 3 ? '#d32f2f' : s.avgDefectRate > 1.5 ? '#ff9800' : '#4caf50'
        }));
    };

    const slides = [
        {
            title: "Stable Supply Chain Network",
            description: "Global supply chains were tightly connected and operating efficiently. Suppliers with passing inspection results maintained steady operations.",
            nodes: createNetworkNodes(stableData),
            annotation: "✓ All systems operational"
        },
        {
            title: "Disruption Event",
            description: "A disruption in key supplier hubs triggered cascading delays. Failed inspections revealed critical bottlenecks in the network.",
            nodes: createNetworkNodes(disruptedData),
            annotation: "⚠ Breaking Point: Major supply disruption"
        },
        {
            title: "Recovery Phase",
            description: "The network begins recovery with pending inspections. Some suppliers show improvement while others struggle with persistent delays.",
            nodes: createNetworkNodes(recoveryData),
            annotation: "⟳ Network stabilizing..."
        }
    ];

    const currentSlideData = slides[currentSlide];
    const hub = { name: 'Distribution Hub', x: 0, y: 0, size: 800, fill: '#1976d2' };

    return (
        <div className="narrative-container">
            <div className="narrative-header">
                <h1>Supply Chain Data Story</h1>
                <p className="subtitle">From Efficiency to Bottleneck</p>
            </div>

            <div className="slide-content">
                <h2>{currentSlideData.title}</h2>
                <p className="slide-description">{currentSlideData.description}</p>

                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={500}>
                        <ScatterChart margin={{ top: 40, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="x" hide domain={[-80, 80]} />
                            <YAxis type="number" dataKey="y" hide domain={[-50, 60]} />
                            <ZAxis type="number" dataKey="size" range={[200, 800]} />
                            <Tooltip 
                                content={({ payload }) => {
                                    if (payload && payload[0]) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="custom-tooltip">
                                                <p><strong>{data.name}</strong></p>
                                                <p>Location: {data.location}</p>
                                                <p>Avg Defect Rate: {data.avgDefectRate?.toFixed(2)}%</p>
                                                <p>Avg Lead Time: {data.avgLeadTime?.toFixed(1)} days</p>
                                                <p>Revenue: ${data.totalRevenue?.toFixed(0)}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />

                            {/* Draw connections from hub to suppliers */}
                            {currentSlideData.nodes.map((node, index) => (
                                <ReferenceLine
                                    key={`line-${index}`}
                                    segment={[{ x: 0, y: 0 }, { x: node.x, y: node.y }]}
                                    stroke={node.fill}
                                    strokeWidth={2}
                                    strokeOpacity={0.6}
                                />
                            ))}

                            {/* Annotation */}
                            <ReferenceLine y={-45} stroke="none">
                                <Label value={currentSlideData.annotation} position="insideTop" 
                                       style={{ fontSize: '16px', fontWeight: 'bold', fill: '#333' }} />
                            </ReferenceLine>

                            {/* Hub */}
                            <Scatter data={[hub]} fill="#1976d2">
                                <LabelList dataKey="name" position="bottom" 
                                          style={{ fill: '#1976d2', fontSize: '14px', fontWeight: 'bold' }} />
                            </Scatter>

                            {/* Supplier nodes */}
                            <Scatter data={currentSlideData.nodes}>
                                <LabelList dataKey="name" position="top" 
                                          style={{ fill: '#333', fontSize: '12px', fontWeight: 'bold' }} />
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                <div className="slide-controls">
                    <button 
                        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                        disabled={currentSlide === 0}
                        className="nav-button"
                    >
                        ← Previous
                    </button>
                    
                    <div className="slide-indicators">
                        {slides.map((_, index) => (
                            <span 
                                key={index} 
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>

                    {currentSlide < slides.length - 1 ? (
                        <button 
                            onClick={() => setCurrentSlide(currentSlide + 1)}
                            className="nav-button"
                        >
                            Next →
                        </button>
                    ) : (
                        <button 
                            onClick={onStartExploring}
                            className="explore-button"
                        >
                            Start Exploring →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}


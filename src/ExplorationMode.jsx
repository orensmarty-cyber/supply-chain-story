import { useState, useMemo } from 'react';
import { SupplyChainNetwork } from './SupplyChainNetwork';
import { DelayAnalysis } from './DelayAnalysis';
import { DefectRateChart } from './DefectRateChart';
import { RevenueImpact } from './RevenueImpact';

export function ExplorationMode({ data }) {
    const [filters, setFilters] = useState({
        supplier: 'All',
        location: 'All',
        productType: 'All',
        inspectionResult: 'All',
        transportMode: 'All'
    });

    const [selectedSupplier, setSelectedSupplier] = useState(null);

    // Extract unique values for filters
    const filterOptions = useMemo(() => ({
        suppliers: ['All', ...new Set(data.map(d => d['Supplier name']))],
        locations: ['All', ...new Set(data.map(d => d.Location))],
        productTypes: ['All', ...new Set(data.map(d => d['Product type']))],
        inspectionResults: ['All', ...new Set(data.map(d => d['Inspection results']))],
        transportModes: ['All', ...new Set(data.map(d => d['Transportation modes']))]
    }), [data]);

    // Apply filters
    const filteredData = useMemo(() => {
        return data.filter(item => {
            return (
                (filters.supplier === 'All' || item['Supplier name'] === filters.supplier) &&
                (filters.location === 'All' || item.Location === filters.location) &&
                (filters.productType === 'All' || item['Product type'] === filters.productType) &&
                (filters.inspectionResult === 'All' || item['Inspection results'] === filters.inspectionResult) &&
                (filters.transportMode === 'All' || item['Transportation modes'] === filters.transportMode)
            );
        });
    }, [data, filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const resetFilters = () => {
        setFilters({
            supplier: 'All',
            location: 'All',
            productType: 'All',
            inspectionResult: 'All',
            transportMode: 'All'
        });
        setSelectedSupplier(null);
    };

    return (
        <div className="exploration-container">
            <div className="exploration-header">
                <h1>Supply Chain Explorer</h1>
                <p className="subtitle">Interactive Analysis Dashboard</p>
            </div>

            {/* Filters Panel */}
            <div className="filters-panel">
                <h3>Filters</h3>
                <div className="filter-grid">
                    <div className="filter-group">
                        <label>Supplier:</label>
                        <select 
                            value={filters.supplier} 
                            onChange={(e) => handleFilterChange('supplier', e.target.value)}
                        >
                            {filterOptions.suppliers.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Location:</label>
                        <select 
                            value={filters.location} 
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                        >
                            {filterOptions.locations.map(l => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Product Type:</label>
                        <select 
                            value={filters.productType} 
                            onChange={(e) => handleFilterChange('productType', e.target.value)}
                        >
                            {filterOptions.productTypes.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Inspection Result:</label>
                        <select 
                            value={filters.inspectionResult} 
                            onChange={(e) => handleFilterChange('inspectionResult', e.target.value)}
                        >
                            {filterOptions.inspectionResults.map(i => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Transport Mode:</label>
                        <select 
                            value={filters.transportMode} 
                            onChange={(e) => handleFilterChange('transportMode', e.target.value)}
                        >
                            {filterOptions.transportModes.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <button onClick={resetFilters} className="reset-button">
                            Reset All Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
                <div className="dashboard-card full-width">
                    <h3>Supply Chain Network</h3>
                    <SupplyChainNetwork 
                        data={filteredData} 
                        selectedSupplier={selectedSupplier}
                        onSupplierClick={setSelectedSupplier}
                    />
                </div>

                <div className="dashboard-card">
                    <h3>Lead Time & Shipping Time Analysis</h3>
                    <DelayAnalysis 
                        data={filteredData}
                        selectedSupplier={selectedSupplier}
                    />
                </div>

                <div className="dashboard-card">
                    <h3>Defect Rate by Supplier</h3>
                    <DefectRateChart 
                        data={filteredData}
                        selectedSupplier={selectedSupplier}
                        onSupplierClick={setSelectedSupplier}
                    />
                </div>

                <div className="dashboard-card full-width">
                    <h3>Revenue Impact Analysis</h3>
                    <RevenueImpact 
                        data={filteredData}
                        selectedSupplier={selectedSupplier}
                    />
                </div>
            </div>
        </div>
    );
}


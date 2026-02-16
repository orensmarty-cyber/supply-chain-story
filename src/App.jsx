import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { NarrativeMode } from './NarrativeMode';
import { ExplorationMode } from './ExplorationMode';
import './App.css';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState('narrative'); // 'narrative' or 'exploration'

    useEffect(() => {
        // Load CSV data
        fetch('/supply_chain_data.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setData(results.data);
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                        setLoading(false);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading CSV:', error);
                setLoading(false);
            });
    }, []);

    const handleStartExploring = () => {
        setMode('exploration');
    };

    const handleBackToNarrative = () => {
        setMode('narrative');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading supply chain data...</p>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="error-container">
                <h2>Error Loading Data</h2>
                <p>Unable to load supply chain data. Please check the console for details.</p>
            </div>
        );
    }

    return (
        <div className="app-container">
            {mode === 'narrative' ? (
                <NarrativeMode data={data} onStartExploring={handleStartExploring} />
            ) : (
                <>
                    <button
                        className="back-to-narrative-button"
                        onClick={handleBackToNarrative}
                    >
                        ← Back to Story
                    </button>
                    <ExplorationMode data={data} />
                </>
            )}
        </div>
    );
}

export default App;

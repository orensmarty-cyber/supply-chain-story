# Supply Chain Data Story - Project Summary

## Overview
This project implements an interactive data story about supply chain disruptions using the **Martini Glass Model**. The application guides users through a narrative about supply chain network stability, disruption, and recovery, then allows free exploration of the data.

## Narrative Story: "From Efficiency to Bottleneck"

### The Story Arc
The narrative presents three key phases of supply chain evolution:

1. **Slide 1 - Stable Network**: Shows suppliers with "Pass" inspection results, demonstrating efficient operations
2. **Slide 2 - Disruption Event**: Reveals suppliers with "Fail" inspection results and high defect rates, showing critical bottlenecks
3. **Slide 3 - Recovery Phase**: Displays suppliers with "Pending" inspection results as the network stabilizes

## Technical Implementation

### Phase 1: The Stem (Narrative Mode)
**File**: `NarrativeMode.jsx`

**Features**:
- ✅ 3 controlled slides with guided storytelling
- ✅ Network visualization showing supplier-hub relationships
- ✅ Annotations explaining disruptions ("⚠ Breaking Point: Major supply disruption")
- ✅ Color-coded nodes based on defect rates:
  - 🟢 Green: Low defect rate (<1.5%)
  - 🟠 Orange: Moderate defect rate (1.5-3%)
  - 🔴 Red: High defect rate (>3%)
- ✅ Smooth transitions between slides
- ✅ "Start Exploring" button to enter exploration mode

### Phase 2: The Glass (Exploration Mode)
**File**: `ExplorationMode.jsx`

**Features**:
- ✅ Interactive filters for:
  - Supplier
  - Location
  - Product Type
  - Inspection Result
  - Transportation Mode
- ✅ Four interconnected visualizations
- ✅ Linked views with supplier selection
- ✅ Reset filters functionality

## Visualizations

### 1. Supply Chain Network (Network Graph - Vis 7)
**File**: `SupplyChainNetwork.jsx`

**Features**:
- Hub & Spoke network layout
- 5 suppliers connected to central distribution hub
- Node size represents total revenue
- Color coding by defect rate
- Click interaction to filter by supplier
- Hover tooltips with detailed metrics
- Visual legend explaining color scheme

### 2. Lead Time & Shipping Time Analysis (Bar Chart with Brush)
**File**: `DelayAnalysis.jsx`

**Features**:
- Stacked bar chart showing average lead times and shipping times
- Brush component for zooming into specific suppliers
- Linked highlighting when supplier is selected
- Sorted by total delay (highest to lowest)

### 3. Defect Rate by Supplier (Annotated Bar Chart - Vis 8)
**File**: `DefectRateChart.jsx`

**Features**:
- Bar chart with color-coded defect rates
- **Annotation**: ReferenceLine at 3% marking "Critical Threshold"
- Click interaction to select supplier
- Shows inspection results (Pass/Fail counts)
- Color scheme matches network visualization

### 4. Revenue Impact Analysis (Multivariate Scatter Plot)
**File**: `RevenueImpact.jsx`

**Features**:
- X-axis: Average Defect Rate
- Y-axis: Total Revenue
- Z-axis (bubble size): Number of products
- Color: Risk level based on defect rate
- **Annotation**: Vertical line at 3% defect rate marking critical threshold
- Identifies high-revenue suppliers with quality issues

## Interactive Features (Vis 7)

### Linked Views
- Clicking a supplier in the network graph highlights it across all charts
- Clicking a bar in the defect rate chart filters all visualizations
- Selected supplier shown in blue across all views
- Non-selected items fade to 30% opacity for focus

### Zoom/Brush
- Delay Analysis chart includes brush component
- Users can zoom into specific supplier ranges
- Smooth interaction for detailed analysis

### Hover Effects
- Rich tooltips on all visualizations
- Context-sensitive information
- Professional styling with borders and shadows

## Color Scheme & Design

### Meaning Through Color
- 🟢 **Green (#4caf50)**: Stable operations, low defect rate
- 🟠 **Orange (#ff9800)**: Moderate delays, warning state
- 🔴 **Red (#d32f2f)**: Critical bottleneck, high defect rate
- 🔵 **Blue (#2196f3)**: Selected supplier (user interaction)
- 🔵 **Dark Blue (#1976d2)**: Distribution hub (central node)

### Visual Design
- Gradient background (purple theme)
- White cards with rounded corners
- Smooth animations and transitions
- Responsive layout
- Professional typography

## Code Architecture

### Component Structure
```
App.jsx (Main controller)
├── NarrativeMode.jsx (Phase 1)
└── ExplorationMode.jsx (Phase 2)
    ├── SupplyChainNetwork.jsx
    ├── DelayAnalysis.jsx
    ├── DefectRateChart.jsx
    └── RevenueImpact.jsx
```

### State Management
- Clean separation between narrative and exploration modes
- Filter state managed in ExplorationMode
- Supplier selection state shared across visualizations
- CSV data loaded once and passed down

### No Code Duplication
- Reusable tooltip component pattern
- Consistent color scheme defined once
- Shared styling through CSS classes
- DRY principles throughout

## Data Processing

### CSV Parsing
- Uses PapaParse library for robust CSV handling
- Automatic header detection
- Error handling for missing data

### Data Aggregation
- Suppliers aggregated from individual product records
- Calculated metrics:
  - Average defect rates
  - Average lead times
  - Average shipping times
  - Total revenue
  - Inspection result counts

## Assignment Requirements Met

✅ **Martini Glass Structure (30%)**
- Smooth button-based mode switching
- Animated transitions
- Graph updates synchronized with narrative text

✅ **Narrative Quality - Annotations (25%)**
- In-canvas annotations on network graph
- ReferenceLine annotations on defect rate chart
- Labels explaining "why" disruptions occurred
- Context-rich storytelling

✅ **Network Graph Quality (20%)**
- Hub & Spoke visualization
- Node size = revenue (ZAxis)
- Color coding: Red/Orange/Green for defect rates
- Clean, professional design
- Interactive elements

✅ **Code & Architecture (15%)**
- Separate NarrativeMode and ExplorationMode components
- No code duplication
- Clean state management
- Well-organized file structure

✅ **Deployment Ready (10%)**
- Built with Vite for easy deployment
- All dependencies included
- Ready for Firebase hosting

## How to Run

```bash
cd supply-chain-story
npm install
npm run dev
```

Visit http://localhost:5173

## How to Build for Production

```bash
npm run build
```

The `dist` folder will contain the production-ready files for deployment.

## Technologies Used
- React 18
- Vite
- Recharts (visualization library)
- PapaParse (CSV parsing)
- CSS3 (animations and styling)


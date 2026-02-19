# Supply Chain Data Story

An interactive data visualization project implementing the **Martini Glass Model** to tell the story of supply chain disruptions.

## 🎯 Project Overview

This application presents a data-driven narrative about supply chain networks, showing how they transition from efficiency to bottleneck during disruption events, and then begin recovery.

### The Martini Glass Model

**Phase 1 - The Stem (Narrative)**: Guided storytelling with 3 controlled slides
- Slide 1: Stable supply chain network
- Slide 2: Disruption event with failed inspections
- Slide 3: Recovery phase with pending inspections

**Phase 2 - The Glass (Exploration)**: Free exploration with interactive filters and linked visualizations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/orensmarty-cyber/supply-chain-story.git

# Navigate to project directory
cd supply-chain-story

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Locally (if you already have the files)

```bash
# Navigate to project directory
cd supply-chain-story

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

## 📊 Features

### Narrative Mode
- ✅ 3 guided slides with storytelling
- ✅ Network visualization with annotations
- ✅ Color-coded supplier nodes (Green/Orange/Red)
- ✅ Smooth slide transitions
- ✅ Embedded explanations of disruptions

### Exploration Mode
- ✅ Interactive filters (Supplier, Location, Product Type, etc.)
- ✅ 4 interconnected visualizations
- ✅ Linked views with click interactions
- ✅ Zoom/brush functionality
- ✅ Rich hover tooltips

### Visualizations

1. **Supply Chain Network** (Hub & Spoke)
   - Central distribution hub connected to 5 suppliers
   - Node size = Revenue
   - Color = Defect rate risk level
   - Click to filter by supplier

2. **Lead Time & Shipping Time Analysis**
   - Stacked bar chart
   - Brush component for zooming
   - Linked highlighting

3. **Defect Rate by Supplier**
   - Color-coded bars
   - Critical threshold annotation at 3%
   - Click interaction

4. **Revenue Impact Analysis**
   - Multivariate scatter plot
   - X: Defect Rate, Y: Revenue, Z: Product Count
   - Identifies high-risk, high-revenue suppliers

## 🎨 Color Scheme

- 🟢 **Green**: Low defect rate (<1.5%) - Stable
- 🟠 **Orange**: Moderate defect rate (1.5-3%) - Warning
- 🔴 **Red**: High defect rate (>3%) - Critical
- 🔵 **Blue**: Selected supplier

## 🏗️ Project Structure

```
supply-chain-story/
├── src/
│   ├── App.jsx                    # Main application controller
│   ├── App.css                    # Global styles
│   ├── NarrativeMode.jsx          # Phase 1: Guided narrative
│   ├── ExplorationMode.jsx        # Phase 2: Free exploration
│   ├── SupplyChainNetwork.jsx     # Network visualization
│   ├── DelayAnalysis.jsx          # Lead time analysis
│   ├── DefectRateChart.jsx        # Defect rate visualization
│   └── RevenueImpact.jsx          # Revenue impact analysis
├── public/
│   └── supply_chain_data.csv      # Dataset
└── PROJECT_SUMMARY.md             # Detailed documentation
```

## 📦 Technologies

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Recharts**: Charting library
- **PapaParse**: CSV parsing
- **CSS3**: Styling and animations

## 🎓 Assignment Requirements

This project fulfills all requirements for the Interactive Data Visualization final project:

- ✅ Martini Glass structure with smooth transitions (30%)
- ✅ Narrative quality with in-canvas annotations (25%)
- ✅ Network graph with proper visual encoding (20%)
- ✅ Clean code architecture with no duplication (15%)
- ✅ Deployment-ready (10%)

## � Upload to GitHub

### First Time Setup

1. **Create a new repository on GitHub**
   - Go to [GitHub](https://github.com) and sign in
   - Click the "+" icon in the top right and select "New repository"
   - Name it `supply-chain-story`
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code to GitHub**

```bash
git init
# Add all files to git
git add .

# Commit the files
git commit -m "Initial commit: Supply Chain Data Story application"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/supply-chain-story.git

# Push to GitHub
git push -u origin main
```

If you get an error about the branch name, try:
```bash
git branch -M main
git push -u origin main
```

### Update Existing Repository

```bash
# Add changes
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## �🚢 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder will contain optimized production files.

### Deploy to Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Select Hosting
# Set public directory to: dist
# Configure as single-page app: Yes

# Deploy
firebase deploy
```

## 📝 Data Source

The project uses the Supply Chain Analysis Dataset with the following key fields:
- Supplier information (name, location)
- Product details (type, SKU, price)
- Quality metrics (defect rates, inspection results)
- Logistics data (lead times, shipping times, routes)
- Financial data (revenue, costs)

## 🎯 Key Insights

The visualization reveals:
1. **Supplier Performance**: Which suppliers have the highest defect rates
2. **Revenue Risk**: High-revenue suppliers with quality issues
3. **Delay Patterns**: Lead time and shipping time bottlenecks
4. **Network Resilience**: How disruptions cascade through the network

## 👥 Author

Created for the Interactive Data Visualization course final project.

## 📄 License

This project is created for educational purposes.

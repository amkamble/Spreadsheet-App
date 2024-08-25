This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Spreadsheet App
This is a fully functional spreadsheet-like application built using Next.js, Zustand for state management, and Tailwind CSS for styling. The application supports basic spreadsheet features such as cell editing, formatting, search, filtering, pagination, and undo/redo functionality.

Features
Editable Cells: Click on any cell to edit its content.
Undo/Redo: Easily revert or reapply changes made to cell content.
Cell Formatting: Format cells with text alignment (left, center, right) and font size adjustments.
Search and Filter: Search through cell content and apply numeric filters.
Pagination: Navigate through large datasets with pagination controls.
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js: v14 or later
npm: v6 or later
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/spreadsheet-app.git
cd spreadsheet-app
Install dependencies:

bash
Copy code
npm install
Running the Project
To run the project locally:

Start the development server:

bash
Copy code
npm run dev
Open the application:

Open your browser and navigate to http://localhost:3000.

Building for Production
To build the project for production:

bash
Copy code
npm run build
This will create an optimized build in the .next directory.

Deployment
After building the project, you can deploy the out directory to any static hosting service, such as Vercel or Netlify.

Usage Instructions
Cell Editing
Click on any cell to make it editable.
Type your desired content and click outside the cell to save.
Undo/Redo
Undo: Click the "Undo" button to revert the last change.
Redo: Click the "Redo" button to reapply a reverted change.
Cell Formatting
Text Alignment: Use the "Left", "Center", or "Right" buttons to align text within the selected cell.
Font Size: Use the dropdown to select font size for the selected cell.
Search and Filter
Search: Enter a term in the search box and click "Search" to filter cells.
Reset Filters: Click "Reset" to clear all applied filters and restore the full dataset.
Pagination
Navigate Pages: Use the "Previous" and "Next" buttons to navigate between pages of cells.
Page Indicator: The current page number is displayed between the navigation buttons.
License
This project is licensed under the MIT License.

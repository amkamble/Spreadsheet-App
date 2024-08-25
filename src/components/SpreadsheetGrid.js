import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSpreadsheetStore } from '@/store/useSpreadsheetStore';

const Spreadsheet = () => {
  const { 
    cells, 
    formattedCells, 
    currentPage, 
    pageSize, 
    setCell, 
    setCellFormatting, 
    undo, 
    redo, 
    setSearchTerm, 
    applyFilters, 
    resetFilters, 
    goToPage 
  } = useSpreadsheetStore();
  
  const [selectedCell, setSelectedCell] = useState(null);
  const [alignment, setAlignment] = useState('left');
  const [fontSize, setFontSize] = useState('base');
  const [visibleCells, setVisibleCells] = useState(pageSize);

  useEffect(() => {
    goToPage(currentPage);
  }, [currentPage]);

  const fetchMoreData = () => {
    setVisibleCells((prev) => prev + pageSize);
  };

  const handleCellClick = (index) => {
    setSelectedCell(index);
  };

  const handleCellChange = (index, value) => {
    setCell(index, value);
  };

  const handleAlignmentChange = (alignment) => {
    if (selectedCell !== null) {
      setCellFormatting(selectedCell, { alignment });
      setAlignment(alignment);
    }
  };

  const handleFontSizeChange = (size) => {
    if (selectedCell !== null) {
      setCellFormatting(selectedCell, { fontSize: size });
      setFontSize(size);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-center text-4xl font-bold text-teal-500">Spreadsheet App</h1>
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={handleSearchChange} 
          className="border p-2 bg-gray-600 rounded m-5"
        />
        <button onClick={handleApplyFilters} className="ml-2 p-2 bg-blue-500 text-white rounded">
          Search
        </button>
        <button onClick={handleResetFilters} className="ml-2 p-2 bg-gray-500 text-white rounded">
          Reset 
        </button>
        <button onClick={undo} className="ml-2 p-2 bg-yellow-500 text-white rounded">
          Undo
        </button>
        <button onClick={redo} className="ml-2 p-2 bg-green-500 text-white rounded">
          Redo
        </button>
      </div>

      <div className="mb-4 m-5">
        <button onClick={() => handleAlignmentChange('left')} className="p-2 bg-gray-700 rounded">Left</button>
        <button onClick={() => handleAlignmentChange('center')} className="p-2 bg-gray-700 ml-2 rounded">Center</button>
        <button onClick={() => handleAlignmentChange('right')} className="p-2 bg-gray-700 ml-2 rounded">Right</button>
        <select 
          value={fontSize} 
          onChange={(e) => handleFontSizeChange(e.target.value)} 
          className="ml-4 p-2 border text-black rounded"
        >
          <option value="base">Base</option>
          <option value="lg">Large</option>
          <option value="xl">X-Large</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={visibleCells}
        next={fetchMoreData}
        hasMore={visibleCells < cells.length}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-10 gap-1">
          {cells.slice(0, visibleCells).map((cell, index) => (
            <input
              key={index}
              value={cell}
              onClick={() => handleCellClick(index)}
              onChange={(e) => handleCellChange(index, e.target.value)}
              style={{
                textAlign: formattedCells[index]?.alignment || 'left',
                fontSize: formattedCells[index]?.fontSize === 'base' ? '1rem' : formattedCells[index]?.fontSize === 'lg' ? '1.25rem' : '1.5rem',
              }}
              className="border p-2 bg-white text-black"
            />
          ))}
        </div>
      </InfiniteScroll>

      <div className="flex justify-between mt-4 m-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="p-2 bg-blue-700 disabled:opacity-50 rounded"
        >
          Previous
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= Math.ceil(1000 / pageSize) - 1}
          className="p-2 bg-blue-700 disabled:opacity-50 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Spreadsheet;

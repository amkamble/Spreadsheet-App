import create from 'zustand';

const PAGE_SIZE = 1000;

export const useSpreadsheetStore = create((set) => ({
  cells: Array(1000).fill(''), // Initialize a grid of 1000 blank cells
  formattedCells: Array(100).fill({ text: '', alignment: 'left', fontSize: 'base' }),
  undoStack: [],
  redoStack: [],
  searchTerm: '',
  numericFilter: { min: null, max: null },
  currentPage: 0,
  pageSize: PAGE_SIZE,
  paginatedCells: Array(1000).fill(''),

  setCell: (index, value) => set((state) => {
    const newCells = [...state.cells];
    const previousValue = newCells[index];
    newCells[index] = value;

    const undoAction = { index, value: previousValue };
    const redoAction = { index, value };

    return {
      cells: newCells,
      formattedCells: state.formattedCells,
      undoStack: [...state.undoStack, undoAction],
      redoStack: [],
    };
  }),

  setCellFormatting: (index, format) => set((state) => {
    const newFormatting = [...state.formattedCells];
    newFormatting[index] = { ...newFormatting[index], ...format };

    return { formattedCells: newFormatting };
  }),

  undo: () => set((state) => {
    if (state.undoStack.length === 0) return {};
    const lastAction = state.undoStack[state.undoStack.length - 1];
    const newCells = [...state.cells];
    newCells[lastAction.index] = lastAction.value;

    return {
      cells: newCells,
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [...state.redoStack, lastAction],
    };
  }),

  redo: () => set((state) => {
    if (state.redoStack.length === 0) return {};
    const lastAction = state.redoStack[state.redoStack.length - 1];
    const newCells = [...state.cells];
    newCells[lastAction.index] = lastAction.value;

    return {
      cells: newCells,
      redoStack: state.redoStack.slice(0, -1),
      undoStack: [...state.undoStack, lastAction],
    };
  }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setNumericFilter: (min, max) => set({ numericFilter: { min, max } }),

  applyFilters: () => set((state) => {
    const filteredCells = state.cells
      .filter((cell) => {
        if (state.searchTerm && !cell.includes(state.searchTerm)) return false;
        if (state.numericFilter.min !== null && parseFloat(cell) < state.numericFilter.min) return false;
        if (state.numericFilter.max !== null && parseFloat(cell) > state.numericFilter.max) return false;
        return true;
      });

    return { cells: filteredCells };
  }),

  resetFilters: () => set((state) => {
    return { cells: Array(1000).fill('') }; // Resets to the original state
  }),

  goToPage: (page) => set((state) => {
    const start = page * state.pageSize;
    const end = Math.min(start + state.pageSize, state.cells.length);
    const newCells = state.cells.slice(start, end);

    return {
      currentPage: page,
      paginatedCells: newCells,
    };
  }),

  setPagination: (pageSize) => set({ pageSize }),

  initializePagination: () => set((state) => {
    const start = state.currentPage * state.pageSize;
    const end = Math.min(start + state.pageSize, state.cells.length);
    const newCells = state.cells.slice(start, end);

    return { paginatedCells: newCells };
  }),
}));

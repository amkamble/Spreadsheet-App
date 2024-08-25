import { render, screen, fireEvent } from '@testing-library/react';
import Cell from '../components/Cell';
import { useSpreadsheetStore } from '../store/useSpreadsheetStore';

jest.mock('../store/useSpreadsheetStore');

describe('Cell component', () => {
  it('renders with initial value', () => {
    useSpreadsheetStore.mockReturnValue({
      cells: ['Test Value'],
      updateCell: jest.fn(),
    });

    render(<Cell index={0} />);
    const input = screen.getByDisplayValue('Test Value');
    expect(input).toBeInTheDocument();
  });

  it('updates value on change', () => {
    const updateCellMock = jest.fn();
    useSpreadsheetStore.mockReturnValue({
      cells: [''],
      updateCell: updateCellMock,
    });

    render(<Cell index={0} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(updateCellMock).toHaveBeenCalledWith(0, 'New Value');
  });
});

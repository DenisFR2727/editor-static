import { RowsTypes, TextAlign, UseAddRowAndColumnProps } from "./type";

export const useAddRowAndColumn = ({
  setRows,
  rows,
  setSelectedRowIndex,
  setSelectedColumn,
  setOpenTextArea,
  openDownloadByURL,
  setOpenDownloadByURL,
  selectedRowIndex,
  selectedColumn,
  setImageURL,
}: UseAddRowAndColumnProps) => {
  // Add new Row
  const addRow = (): void => {
    const newRowIndex = rows.length;
    setRows((prevRows: RowsTypes[]) => [
      ...prevRows,
      { id: Date.now(), text: "", columns: [{ id: Date.now(), text: "" }] },
    ]);
    setSelectedRowIndex(rows.length);
    setSelectedColumn({ rowIndex: newRowIndex, colIndex: 0 });
    setOpenTextArea(true);
    if (openDownloadByURL) {
      setOpenTextArea(false);
    } else {
      setOpenDownloadByURL(false);
    }
    setOpenDownloadByURL(false);
  };

  // Add new Column
  const addColumn = () => {
    if (selectedRowIndex === null || selectedColumn === null) return;
    const newColumn = rows.map((row, index) =>
      index === selectedRowIndex
        ? {
            ...row,

            columns: [...row.columns, { id: Date.now(), text: "" }],
          }
        : row
    );
    setRows(newColumn);
    setSelectedColumn({ rowIndex: selectedRowIndex, colIndex: rows[selectedRowIndex].columns.length });
    setImageURL("");
    setOpenDownloadByURL(false);
  };
  return { addRow, addColumn };
};
// ---------

export const useSelectColumn = ({
  setSelectedRowIndex,
  setSelectedColumn,
  setOpenTextArea,
}: Partial<UseAddRowAndColumnProps>) => {
  const handleColumnSelect = (rowIndex: number, colIndex: number): void => {
    setSelectedRowIndex?.(rowIndex);
    setSelectedColumn?.((prev) => {
      const newSelectedColumn =
        prev.rowIndex === rowIndex && prev.colIndex === colIndex
          ? { rowIndex: null, colIndex: null }
          : { rowIndex, colIndex };

      //  open textarea
      if (rowIndex === 0 && colIndex === 0) {
        setOpenTextArea?.(true);
      }
      return newSelectedColumn;
    });
  };
  return { handleColumnSelect };
};

export const useChangeText = ({ selectedRowIndex, selectedColumn, setRows }: Partial<UseAddRowAndColumnProps>) => {
  // Change text in row
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newTextRow = e.target.value;
    if (selectedRowIndex === null || selectedColumn === null) {
      return;
    }
    setRows?.((prevRows) =>
      prevRows.map((row, rowIndex) => {
        if (rowIndex === selectedRowIndex) {
          return {
            ...row,
            text: "",
            columns: row.columns.map((column, colIndex) => {
              if (colIndex === selectedColumn?.colIndex) {
                return { ...column, text: newTextRow };
              }
              return column;
            }),
          };
        }
        return row;
      })
    );
  };

  return { handleTextChange };
};

export const useImageURLChange = ({
  setImageURL,
  selectedRowIndex,
  selectedColumn,
  setRows,
}: Partial<UseAddRowAndColumnProps>) => {
  // Change url image in column
  const handleImageURLChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newURL = e.target.value;
    setImageURL?.(newURL);

    if (selectedRowIndex === null || selectedColumn?.colIndex === null) return;

    setRows?.((prevRows) =>
      prevRows.map((row, rowIndex) => {
        if (rowIndex === selectedRowIndex) {
          return {
            ...row,
            columns: row.columns.map((column, colIndex) => {
              if (colIndex === selectedColumn?.colIndex) {
                return { ...column, text: newURL };
              }
              return column;
            }),
          };
        }
        return row;
      })
    );
  };
  return { handleImageURLChange };
};

export const useTextAlign = ({ selectedRowIndex, selectedColumn, setRows }: Partial<UseAddRowAndColumnProps>) => {
  // TextAlign
  const handleTextAlignChange = (align: TextAlign) => {
    if (selectedRowIndex === null || selectedColumn?.colIndex === null) return;

    setRows?.((prevRows) =>
      prevRows.map((row, rowIndex) => {
        if (rowIndex === selectedRowIndex) {
          return {
            ...row,
            columns: row.columns.map((column, colIndex) => {
              if (colIndex === selectedColumn?.colIndex) {
                return { ...column, textAlign: align };
              }
              return column;
            }),
          };
        }
        return row;
      })
    );
  };
  return { handleTextAlignChange };
};

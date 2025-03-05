export interface Columns {
  id: number;
  text: string;
}
export interface RowsTypes {
  id: number;
  text: string;
  columns: Columns[];
}

export interface SelectedColumnIndex {
  rowIndex: number | null;
  colIndex: number | null;
}

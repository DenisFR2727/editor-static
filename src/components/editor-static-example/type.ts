import { Dispatch, SetStateAction } from "react";

export interface Columns {
  id: number;
  text: string;
  textAlign?: TextAlign;
}
export type TextAlign = "left" | "center" | "right";

export interface RowsTypes {
  id: number;
  text: string;
  columns: Columns[];
}

export interface SelectedColumnIndex {
  rowIndex: number | null;
  colIndex: number | null;
}

export interface UseAddRowAndColumnProps {
  setRows: Dispatch<SetStateAction<RowsTypes[]>>;
  rows: RowsTypes[];
  setSelectedRowIndex: Dispatch<SetStateAction<number | null>>;
  setSelectedColumn: Dispatch<SetStateAction<SelectedColumnIndex>>;
  setOpenTextArea: Dispatch<SetStateAction<boolean>>;
  openDownloadByURL: boolean;
  setOpenDownloadByURL: Dispatch<SetStateAction<boolean>>;
  selectedRowIndex: number | null;
  selectedColumn: SelectedColumnIndex;
  setImageURL: Dispatch<string>;
}

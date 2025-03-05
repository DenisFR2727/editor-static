import React from "react";
import { Icons } from "../icons";
import { RowsTypes, SelectedColumnIndex, TextAlign } from "./type";

interface PropertiesProps {
  addRow: () => void;
  selectedRowIndex: number | null;
  addColumn: () => void;
  openTextArea: boolean;
  selectTextArea: () => void;
  openDownloadByURL: boolean;
  selectImageLoading: () => void;
  selectedColumn: SelectedColumnIndex;
  rows: RowsTypes[];
  handleTextAlignChange: (align: TextAlign) => void;
  handleTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  imageInputRef?: React.RefObject<HTMLInputElement | null>;
  imageURL: string | null;
  handleImageURLChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Properties({
  addRow,
  selectedRowIndex,
  addColumn,
  openTextArea,
  selectTextArea,
  openDownloadByURL,
  selectImageLoading,
  selectedColumn,
  rows,
  handleTextAlignChange,
  handleTextChange,
  textareaRef,
  imageInputRef,
  imageURL,
  handleImageURLChange,
}: PropertiesProps) {
  return (
    <div className="properties">
      <div className="section">
        <div className="section-header">Page</div>
        <div className="actions">
          <button onClick={addRow} className="action">
            Add row
          </button>
        </div>
      </div>
      {selectedRowIndex !== null && (
        <>
          <div className="section">
            <div className="section-header">Row</div>
            <div className="actions">
              <button onClick={addColumn} className="action">
                Add column
              </button>
            </div>
          </div>

          <div className="section">
            <div className="section-header">Column</div>
            <div className="button-group-field">
              <label>Contents</label>
              <div className="button-group">
                <button className={openTextArea ? "selected" : ""} onClick={selectTextArea}>
                  <Icons.Text />
                </button>
                <button className={openDownloadByURL ? "selected" : ""} onClick={selectImageLoading}>
                  <Icons.Image />
                </button>
              </div>
            </div>
          </div>
          {openTextArea && (
            <div className="section">
              <div className="section-header">Text</div>
              <div className="button-group-field">
                <label>Alignment</label>
                <div className="button-group">
                  <button
                    className={
                      selectedColumn?.colIndex !== null &&
                      rows[selectedRowIndex].columns[selectedColumn.colIndex]?.textAlign === "left"
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleTextAlignChange("left")}
                  >
                    <Icons.TextAlignLeft />
                  </button>
                  <button
                    className={
                      selectedColumn?.colIndex !== null &&
                      rows[selectedRowIndex].columns[selectedColumn.colIndex]?.textAlign === "center"
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleTextAlignChange("center")}
                  >
                    <Icons.TextAlignCenter />
                  </button>
                  <button
                    className={
                      selectedColumn?.colIndex !== null &&
                      rows[selectedRowIndex].columns[selectedColumn.colIndex]?.textAlign === "right"
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleTextAlignChange("right")}
                  >
                    <Icons.TextAlignRight />
                  </button>
                </div>
              </div>

              <div className="textarea-field">
                <textarea
                  onChange={handleTextChange}
                  value={
                    selectedRowIndex !== null && selectedColumn.colIndex !== null
                      ? rows[selectedRowIndex].text || rows[selectedRowIndex].columns[selectedColumn.colIndex]?.text
                      : ""
                  }
                  ref={textareaRef}
                  rows={8}
                  placeholder="Enter text"
                />
              </div>
            </div>
          )}
        </>
      )}
      {openDownloadByURL && (
        <div className="section">
          <div className="section-header">Image</div>
          <div className="text-field">
            <label htmlFor="image-url">URL</label>
            <input
              ref={imageInputRef}
              id="image-url"
              type="text"
              value={imageURL || ""}
              onChange={handleImageURLChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default Properties;

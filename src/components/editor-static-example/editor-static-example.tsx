import { FC, useEffect, useRef, useState } from "react";
import { Column } from "../column";
import { Icons } from "../icons";
import { Markdown } from "../markdown";
import { Row } from "../row";
import { Stage } from "../stage";
import { RowsTypes, SelectedColumnIndex } from "./type";
import { useAddRowAndColumn, useChangeText, useImageURLChange, useSelectColumn, useTextAlign } from "./editor-hooks";
import { ImagePlaceholder } from "../image-placeholder";

const initialState = { id: Date.now(), text: "# Untitled", columns: [{ id: Date.now(), text: "" }] };

export const EditorStaticExample: FC = () => {
  const [rows, setRows] = useState<RowsTypes[]>([initialState]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<SelectedColumnIndex>({
    rowIndex: null,
    colIndex: null,
  });
  const [openDownloadByURL, setOpenDownloadByURL] = useState<boolean>(false);
  const [openTextArea, setOpenTextArea] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { addRow, addColumn } = useAddRowAndColumn({
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
  });
  const { handleColumnSelect } = useSelectColumn({ setSelectedRowIndex, setSelectedColumn, setOpenTextArea });
  const { handleTextChange } = useChangeText({ selectedRowIndex, selectedColumn, setRows });
  const { handleImageURLChange } = useImageURLChange({ setImageURL, selectedRowIndex, selectedColumn, setRows });
  const { handleTextAlignChange } = useTextAlign({ selectedRowIndex, selectedColumn, setRows });

  useEffect(() => {
    if (selectedColumn && textareaRef.current) {
      textareaRef.current.focus();
    }
    if (openDownloadByURL && imageInputRef.current) {
      imageInputRef.current.focus();
    }
  }, [selectedColumn, rows, openDownloadByURL]);

  useEffect(() => {
    if (selectedColumn.rowIndex !== null && selectedColumn.colIndex !== null) {
      const timer = setTimeout(() => {
        setSelectedColumn({ rowIndex: null, colIndex: null });
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [selectedColumn]);
  const selectImageLoading = (): void => {
    setOpenDownloadByURL(true);
    setOpenTextArea(false);

    if (imageInputRef.current) {
      imageInputRef.current.focus();
    }
  };
  const selectTextArea = (): void => {
    setOpenDownloadByURL(false);
    setOpenTextArea(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    if (openTextArea) {
      textareaRef.current?.focus();
    }
    setImageURL("");
  };

  return (
    <div className="editor">
      <Stage selected={selectedRowIndex !== null} onSelect={() => setSelectedRowIndex(null)}>
        {rows.map((row, rowIndex) => (
          <Row key={row.id}>
            {row.columns?.map((column, colIndex) => (
              <Column
                key={column.id}
                onSelect={() => handleColumnSelect(rowIndex, colIndex)}
                selected={selectedColumn.rowIndex === rowIndex && selectedColumn.colIndex === colIndex}
              >
                {column.text && column.text.startsWith("https") ? (
                  <img src={column.text} alt="img" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                ) : (
                  <div style={{ width: "100%", maxHeight: "100%", textAlign: column.textAlign || "center" }}>
                    {openDownloadByURL && selectedColumn.rowIndex === rowIndex ? (
                      <ImagePlaceholder />
                    ) : (
                      <Markdown>{row.text || column.text}</Markdown>
                    )}
                  </div>
                )}
              </Column>
            ))}
          </Row>
        ))}
      </Stage>
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
    </div>
  );
};

// Photo by [Jordan Whitt](https://unsplash.com/photos/EerxztHCjM8)

// “Immensely powerful though we are today, it’s equally clear that we’re going to be even more powerful
// tomorrow. And what’s more there will be greater compulsion upon us to use our power as the number of human
// beings on Earth increases still further. Clearly we could devastate the world. As far as we know, the Earth
// is the only place in the universe where there is life. Its continued survival now rests in our hands.”

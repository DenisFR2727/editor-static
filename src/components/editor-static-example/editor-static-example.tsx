import { FC, useEffect, useRef, useState } from "react";
import { Column } from "../column";
import { Icons } from "../icons";
import { ImagePlaceholder } from "../image-placeholder";
import { Markdown } from "../markdown";
import { Row } from "../row";
import { Stage } from "../stage";
import { RowsTypes, SelectedColumnIndex } from "./type";

const initialState = { id: Date.now(), text: "# Untitled", columns: [{ id: Date.now(), text: "" }] };

export const EditorStaticExample: FC = () => {
  const [rows, setRows] = useState<RowsTypes[]>([initialState]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null); // select state row
  const [selectedColumn, setSelectedColumn] = useState<SelectedColumnIndex>({
    rowIndex: null,
    colIndex: null,
  });
  const [openDownloadByURL, setOpenDownloadByURL] = useState<boolean>(false);
  const [openTextArea, setOpenTextArea] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectedColumn && textareaRef.current) {
      textareaRef.current.focus();
    }
    if (openDownloadByURL && imageInputRef.current) {
      imageInputRef.current.focus();
    }
  }, [selectedColumn, rows, openDownloadByURL]);

  // Add new Row
  const addRow = (): void => {
    const newRowIndex = rows.length;
    setRows((prevRows) => [...prevRows, { id: Date.now(), text: "", columns: [{ id: Date.now(), text: "" }] }]);
    setSelectedRowIndex(rows.length);
    setSelectedColumn({ rowIndex: newRowIndex, colIndex: 0 });
    setOpenTextArea(true);
  };

  // Function select Column
  const handleColumnSelect = (rowIndex: number, colIndex: number): void => {
    setSelectedRowIndex(rowIndex);
    setSelectedColumn((prev) =>
      prev.rowIndex === rowIndex && prev.colIndex === colIndex
        ? { rowIndex: null, colIndex: null }
        : { rowIndex, colIndex }
    );
  };

  // Change text in row
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newTextRow = e.target.value;
    if (selectedRowIndex === null || selectedColumn === null) {
      return;
    }
    setRows((prevRows) =>
      prevRows.map((row, rowIndex) => {
        if (rowIndex === selectedRowIndex) {
          return {
            ...row,
            text: "",
            columns: row.columns.map((column, colIndex) => {
              if (colIndex === selectedColumn.colIndex) {
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

  const handleImageURLChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newURL = e.target.value;
    setImageURL(newURL);

    if (selectedRowIndex === null || selectedColumn.colIndex === null) return;

    setRows((prevRows) =>
      prevRows.map((row, rowIndex) => {
        if (rowIndex === selectedRowIndex) {
          return {
            ...row,
            columns: row.columns.map((column, colIndex) => {
              if (colIndex === selectedColumn.colIndex) {
                return { ...column, text: imageURL };
              }
              return column;
            }),
          };
        }
        return row;
      })
    );
  };
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

    setOpenDownloadByURL(false);
  };
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
                  <Markdown className="text-align-center">{row.text || column.text}</Markdown>
                )}
                {/* <Markdown className="text-align-center">{row.text || column.text}</Markdown> */}
              </Column>
            ))}
          </Row>
        ))}

        {/* <Row>
        <Column>
          <Markdown className="text-align-left">
            Photo by [Linnea Sandbakk](https://unsplash.com/photos/HQqIOc8oYro)
          </Markdown>
        </Column>
        <Column>
          <Markdown className="text-align-center">
            Photo by [Jordan Whitt](https://unsplash.com/photos/EerxztHCjM8)
          </Markdown>
        </Column>
        <Column>
          <Markdown className="text-align-right">
            Photo by [Donnie Ray Crisp](https://unsplash.com/photos/cpL9skvSypI)
          </Markdown>
        </Column>
      </Row> */}
        {/* <Row>
        <Column>
          <Markdown>
            “Immensely powerful though we are today, it’s equally clear that we’re going to be even more powerful
            tomorrow. And what’s more there will be greater compulsion upon us to use our power as the number of human
            beings on Earth increases still further. Clearly we could devastate the world. As far as we know, the Earth
            is the only place in the universe where there is life. Its continued survival now rests in our hands.”
          </Markdown>
        </Column>
      </Row> */}
        {/* <Row>
        <Column>
          <Markdown className="text-align-right">— David Attenborough</Markdown>
        </Column>
      </Row>
      <Row /> */}
        {/* <Row selected>
        <Column>Selected row</Column>
      </Row> */}
        {/* <Row>
        <Column selected>Selected column</Column>
        <Column>
          <Markdown>{"**Bold text**\n\n*Italic text*"}</Markdown>
        </Column>
        <Column>
          <Markdown>Hippopotomonstrosesquippedaliophobia</Markdown>
        </Column>
        <Column>
          <ImagePlaceholder />
        </Column>
      </Row> */}
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

            <div className="section">
              <div className="section-header">Text</div>
              <div className="button-group-field">
                <label>Alignment</label>
                <div className="button-group">
                  <button className="selected">
                    <Icons.TextAlignLeft />
                  </button>
                  <button>
                    <Icons.TextAlignCenter />
                  </button>
                  <button>
                    <Icons.TextAlignRight />
                  </button>
                </div>
              </div>

              {openTextArea && (
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
              )}
            </div>
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

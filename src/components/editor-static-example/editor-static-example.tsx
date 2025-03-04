import { FC, useEffect, useRef, useState } from "react";
import { Column } from "../column";
import { Icons } from "../icons";
import { ImagePlaceholder } from "../image-placeholder";
import { Markdown } from "../markdown";
import { Row } from "../row";
import { Stage } from "../stage";
import { SelectableContainer } from "../selectable-container";

export const EditorStaticExample: FC = () => {
  const [rows, setRows] = useState([{ id: Date.now(), text: "# Untitled", columns: [{ id: Date.now(), text: "" }] }]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null); // select state row
  const [selectedColumn, setSelectedColumn] = useState<{ rowIndex: number | null; colIndex: number | null }>({
    rowIndex: null,
    colIndex: null,
  });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (selectedColumn && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [selectedColumn]);

  // Add new Row
  const addRow = () => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows, { id: Date.now(), text: "", columns: [{ id: Date.now(), text: "" }] }];

      return updatedRows;
    });
    setSelectedRowIndex(rows.length);
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
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTextRow = e.target.value;
    if (selectedRowIndex === null || selectedColumn === null) {
      return;
    }

    const updateRow = rows.map((row, index: number) =>
      index === selectedRowIndex ? { ...row, text: newTextRow } : row
    );
    // const updateColumn = rows.map((row, index: number) =>
    //   index === selectedColumnIndex ? { ...row, columns: { text: newTextRow } } : row
    // );
    setRows(updateRow);
    // setRows({columns: updateColumn})

    console.log(updateRow);
  };

  const addColumn = () => {
    if (selectedRowIndex === null || selectedColumn === null) return;

    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === selectedRowIndex
          ? {
              ...row,
              columns: [...row.columns, { id: Date.now(), text: "" }],
            }
          : row
      )
    );
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
                <Markdown className="text-align-center">{row.text || column.text}</Markdown>
              </Column>
            ))}
          </Row>
        ))}

        {/* <Row>
          <Column>
            <img src="/images/linnea-sandbakk-HQqIOc8oYro.jpg" alt="" />
          </Column>
          <Column>
            <img src="/images/jordan-whitt-EerxztHCjM8.jpg" alt="" />
          </Column>
          <Column>
            <img src="/images/donnie-ray-crisp-cpL9skvSypI.jpg" alt="" />
          </Column>
        </Row> */}
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
                  <button className="selected">
                    <Icons.Text />
                  </button>
                  <button>
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

              <div className="textarea-field">
                <textarea
                  onChange={handleTextChange}
                  value={rows[selectedRowIndex].text}
                  ref={textareaRef}
                  rows={8}
                  placeholder="Enter text"
                />
              </div>
            </div>
          </>
        )}

        {/* <div className="section">
          <div className="section-header">Image</div>
          <div className="text-field">
            <label htmlFor="image-url">URL</label>
            <input id="image-url" type="text" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

import classNames from "classnames";
import { FC } from "react";
import { SelectableContainer } from "../selectable-container";

export interface RowProps {
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
}

export const Row: FC<RowProps> = ({ selected, onSelect, ...props }) => (
  <SelectableContainer className={classNames("row", { selected })} onClick={onSelect} {...props} />
);

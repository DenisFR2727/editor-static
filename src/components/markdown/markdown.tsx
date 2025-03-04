import { Children, FC } from "react";
import MarkdownBase, { MarkdownToJSX } from "markdown-to-jsx";

export interface MarkdownProps {
  id?: string;
  className?: string;
  children: string;
  options?: MarkdownToJSX.Options;
}

export const Markdown: FC<MarkdownProps> = (props: any) => (
  <MarkdownBase {...props} options={{ forceBlock: true, ...props.options }} />
);

import { ComponentClass } from "react";
import { CommonEventFunction } from "@tarojs/components/types/common";

import AtComponent from "taro-ui/types/base";

export interface ListItemProps extends AtComponent {
  hasBorder?: boolean;

  disabled?: boolean;

  title?: string;

  thumb?: string;

  renderExtra?: JSX.Element;
  renderNote?: JSX.Element;

  customStyle?: React.CSSProperties;
  extraThumb?: string;

  arrow?: "up" | "down" | "right";

  onClick?: CommonEventFunction;
}

declare const ListItem: ComponentClass<ListItemProps>;

export default ListItem;

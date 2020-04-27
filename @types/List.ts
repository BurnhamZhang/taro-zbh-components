import { ComponentClass } from "react";



import AtComponent from 'taro-ui/types/base'

export interface ListProps extends AtComponent {
  /**
   * 是否有边框
   * @default true
   */
  hasBorder?: boolean
}

declare const List: ComponentClass<ListProps>;

export default List;

import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import PropTypes, { InferProps } from "prop-types";
import { View } from "@tarojs/components";
import AtComponent from "taro-ui/types/base";
import './index.scss'

interface ListProps extends AtComponent {
  /**
   * 是否有边框
   * @default true
   */
  hasBorder?: boolean;
}

export default class List extends Component<ListProps> {
  public static defaultProps: ListProps;
  public static propTypes: InferProps<ListProps>;

  static options = {
    addGlobalClass: true,
  };

  public render() {
    const rootClass = classNames(
      "my-list",
      {
        "my-list--no-border": !this.props.hasBorder,
      },
      this.props.className
    );

    return <View className={rootClass}>{this.props.children}</View>;
  }
}

List.defaultProps = {
  hasBorder: true,
};

List.propTypes = {
  hasBorder: PropTypes.bool,
};

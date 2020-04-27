import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { Image, Text, View } from "@tarojs/components";
import {
  ITouchEvent,
  CommonEventFunction,
} from "@tarojs/components/types/common";
import AtComponent from "taro-ui/types/base";
import "./index.scss";

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

export default class ListItem extends Component<ListItemProps> {
  public static defaultProps: ListItemProps = {
    disabled: false,
    title: "",
    thumb: "",
    hasBorder: true,
    renderExtra: undefined,
    renderNote: undefined,
    extraThumb: "",
    onClick: () => {},
  };
  static options = {
    addGlobalClass: true,
  };

  private handleClick = (event: ITouchEvent): void => {
    if (typeof this.props.onClick === "function" && !this.props.disabled) {
      this.props.onClick(event);
    }
  };

  public render() {
    const {
      arrow,
      thumb,
      disabled,
      hasBorder,
      renderNote,
      customStyle,
    } = this.props;

    let { title } = this.props;

    title = String(title);

    const rootClass = classNames(
      "my-list__item",
      {
        "my-list__item--thumb": thumb,
        "my-list__item--multiple": renderNote,
        "my-list__item--disabled": disabled,
        "my-list__item--no-border": !hasBorder,
      },
      this.props.className
    );

    return (
      <View
        className={rootClass}
        style={customStyle}
        onClick={this.handleClick}
      >
        <View className="my-list__item-container">
          {thumb && (
            <View className="my-list__item-thumb item-thumb">
              <Image
                className="item-thumb__info"
                mode="scaleToFill"
                src={thumb}
              />
            </View>
          )}
          <View className="my-list__item-content item-content">
            <View className="item-content__info">
              <View className="item-content__info-title">{title}</View>
              <View className="item-content__info-note">
                {this.props.renderNote}
              </View>
            </View>
          </View>
          <View className="my-list__item-extra item-extra">
            <View className="item-extra__info">{this.props.renderExtra}</View>
            {arrow ? (
              <View className="item-extra__icon">
                <Text
                  className={`at-icon item-extra__icon-arrow at-icon-chevron-${arrow}`}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

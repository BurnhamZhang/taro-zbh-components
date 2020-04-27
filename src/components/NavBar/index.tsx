import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

interface NavBarProps {
  extClass: string;
  title: string;
  background: string;
  color: string;
  back: "auto" | true | false;
  loading: boolean;
  animated: boolean;
  show: boolean;
  delta: number;
  displayStyle: string;
  isNative: boolean;
  renderRight: () => any;
  renderLeft: () => any;
  renderTitle: () => any;
  leftCircle: boolean;
}

interface NavBarState {
  displayStyle: string;
}

const isSupport = !!Taro.getMenuButtonBoundingClientRect;
const rect = Taro.getMenuButtonBoundingClientRect
  ? Taro.getMenuButtonBoundingClientRect()
  : { left: 0 };
const res = Taro.getSystemInfoSync();

const ios = !!(res.system.toLowerCase().search("ios") + 1);
const statusBarHeight = res.statusBarHeight;

const innerStyle = isSupport
  ? `width:${rect.left}px;padding-right:${res.windowWidth - rect.left}px;`
  : "";
const leftWidth = isSupport ? `width:${res.windowWidth - rect.left}px` : "";

export default class Card extends Component<NavBarProps, NavBarState> {
  static defaultProps: NavBarProps = {
    extClass: "",
    title: "",
    background: "white",
    color: "",
    back: "auto",
    loading: false,
    animated: true,
    show: true,
    delta: 1,
    displayStyle: "",
    isNative: true,
    renderRight: () => undefined,
    renderLeft: () => undefined,
    renderTitle: () => undefined,
    leftCircle: false,
  };

  state: NavBarState = {
    displayStyle: "",
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.show != this.props.show) {
      this._showChange(nextProps.show);
    }
  }

  onClickBack() {
    const { delta } = this.props;
    Taro.navigateBack({
      delta,
    });
  }
  _showChange(show) {
    const { animated } = this.props;
    let displayStyle = "";
    if (animated) {
      displayStyle = `opacity: ${
        show ? "1" : "0"
      };-webkit-transition:opacity 0.5s;transition:opacity 0.5s;`;
    } else {
      displayStyle = `display: ${show ? "" : "none"}`;
    }
    this.setState({
      displayStyle,
    });
  }

  render() {
    let {
      extClass,
      title,
      background,
      color,
      back,
      loading,
      renderLeft,
      renderRight,
      isNative,
      leftCircle,
    } = this.props;

    const { displayStyle } = this.state;

    const paddingTop = isNative ? `padding-top: ${statusBarHeight}px;` : "";

    if (back === "auto") {
      const length = Taro.getCurrentPages().length;
      back = length !== 1;
    }

    return (
      <View
        className={`navigation-bar ${extClass} ${isNative ? "is_native" : ""}`}
      >
        <View
          className={`navigation-bar__placeholder ${ios ? "ios" : "android"}`}
          style={paddingTop}
        />
        <View
          className={`navigation-bar__inner ${ios ? "ios" : "android"}`}
          style={`${paddingTop} color: ${color};background: ${background};${displayStyle};${
            isNative ? innerStyle : ""
          }`}
        >
          <View
            className={`navigation-bar__left  ${leftCircle ? "circle" : ""}`}
            style={isNative && !leftCircle ? leftWidth : ""}
          >
            {back === true && (
              <View className="navigation-bar__buttons">
                <View
                  onClick={this.onClickBack.bind(this)}
                  className="navigation-bar__button navigation-bar__btn_goback"
                />
              </View>
            )}
            <View className='navigation-bar__btn_left'>
            {renderLeft()}
            </View>
          </View>

          <View className="navigation-bar__center">
            {loading && (
              <View className="navigation-bar__loading">
                <View
                  className="loading"
                  style={`width:${50}rpx;height:${50}rpx;`}
                />
              </View>
            )}
            {title ? <Text>{title}</Text> : null}
            {this.props.renderTitle()}
          </View>

          <View className="navigation-bar__right">{renderRight()}</View>
        </View>
      </View>
    );
  }
}

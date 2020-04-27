import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";
import { Token, TokenTemplet } from "@/types";
import humanizeDuration from "humanize-duration";
import moment from "moment";

interface CouponProps {
  token?: Token;
  templet?: TokenTemplet;
  onClick?: () => void;
  share?: boolean;
  hideLogo?: boolean;
  customStyle?: any;
  renderExtra?: any;
}

export default class Coupon extends Component<CouponProps> {
  static options = {
    addGlobalClass: true,
  };
  static externalClasses = ["coupon-class"];
  static defaultProps: CouponProps = {
    token: undefined,
    templet: undefined,
    onClick: () => {},
    hideLogo: false,
    share: false,
    customStyle: {},
    renderExtra: undefined,
  };

  bg: string;

  constructor(props) {
    super(props);
  }
  render() {
    const {
      token,
      templet,
      onClick,
      share,
      customStyle,
      hideLogo,
    } = this.props;

    const isExpired = token
      ? moment(token.expire, "x").isBefore(moment())
      : false;

    return (
      <View>
        {token && (
          <View
            className="coupon"
            onClick={() => !isExpired && onClick && onClick()}
          >
            <View className="coupon-header">
              <View>
                ¥{" "}
                <Text className="coupon-price">
                  {token.templet.price / 100}
                </Text>
              </View>
              <View>优惠券</View>
            </View>
            <View className="content">
              <View className="title">{token.templet.name}</View>
              <View className="expire-time">
                {token.expire
                  ? `${moment(token.expire, "x").format(
                      "YYYY-MM-DD HH:mm"
                    )}到期`
                  : ""}
              </View>
              {share &&
                token.marketingTempletShare &&
                token.marketingTempletShare.total &&
                !isExpired && (
                  <View className="share">
                    分享最多赚
                    {(token.marketingTempletShare.total / 100).toFixed(2)}
                  </View>
                )}
              {token.templet.issuer && !hideLogo && (
                <View className="brand">
                  <Image
                    className="brand-logo"
                    src={token.templet.issuer.logo}
                  />{" "}
                  {token.templet.issuer.name}
                </View>
              )}
            </View>
            <View className="right">{this.props.children}</View>
          </View>
        )}
        {templet && (
          <View
            className="coupon coupon-class"
            style={customStyle}
            onClick={() => !isExpired && onClick && onClick()}
          >
            <View className="coupon-header">
              <View>
                ¥ <Text className="coupon-price">{templet.price / 100}</Text>
              </View>
              <View>优惠券</View>
            </View>
            <View className="content">
              <View className="title">{templet.name}</View>
              <View className="expire-time">
                有效期{" "}
                {templet.duration
                  ? humanizeDuration(templet.duration, {
                      largest: 1,
                      language: "zh_CN",
                    })
                  : ""}
              </View>
              {templet.issuer && !hideLogo && (
                <View className="brand">
                  <Image className="brand-logo" src={templet.issuer.logo} />{" "}
                  {templet.issuer.name}
                </View>
              )}
              {this.props.renderExtra}
            </View>
            <View className="right">{this.props.children}</View>
          </View>
        )}
      </View>
    );
  }
}

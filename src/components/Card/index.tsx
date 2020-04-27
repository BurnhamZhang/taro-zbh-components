import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";
import { Token, TokenTemplet } from "@/types";
import humanizeDuration from "humanize-duration";
import moment from "moment";

interface CardProps {
  token?: Token;
  templet?: TokenTemplet;
  onClick?: () => void;
  extra?: boolean;
}

const default_bg =
  "https://6b61-kaxinbao-dlr8f-1259756874.tcb.qcloud.la/card_1.png?sign=c5cb7f275c8b3d73615a9525877e8766&t=1564580600";

export default class Card extends Component<CardProps> {
  static defaultProps: CardProps = {
    token: undefined,
    templet: undefined,
    onClick: () => {},
    extra: false,
  };

  bg: string;

  constructor(props) {
    super(props);
  }
  render() {
    const { token, templet, onClick, extra } = this.props;

    let bg = "";
    if (token) {
      bg = token.theme && token.theme.theme ? token.theme.theme.background : "";
    } else if (templet) {
      bg =
        templet.profile &&
        templet.profile.theme &&
        templet.profile.theme.background;
    }
    if (!bg) {
      bg = default_bg;
    }

    const isExpired = token
      ? moment(token.expire, "x").isBefore(moment())
      : false;
    return (
      <View>
        {token && (
          <View
            className="card"
            style={{ backgroundImage: `url(${bg})` }}
            onClick={() => !isExpired && onClick && onClick()}
          >
            <View className="header">
              <Image className="logo" src={token.templet.issuer.logo} />
              <View className="title">
                {token.templet.name}
                {isExpired ? "（已过期）" : ""}
              </View>
            </View>
            <View className="footer">
              <View>
                <View className="count">¥{token.amount / 100}</View>
                <View className="expire-time">
                  {token.expire
                    ? `有效期至 ${moment(token.expire, "x").format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}`
                    : ""}
                </View>
              </View>
              {!isExpired &&
                (token && token.transferFee
                  ? token.transferFee < token.amount
                  : true) &&
                extra && (
                  <AtButton
                    size="small"
                    type="secondary"
                    customStyle={{ borderColor: "white" }}
                  >
                    赠送好友
                  </AtButton>
                )}
            </View>
          </View>
        )}
        {templet && (
          <View
            className="card"
            style={{ backgroundImage: `url(${bg})` }}
            onClick={() => !isExpired && onClick && onClick()}
          >
            <View className="header">
              <Image className="logo" src={templet.issuer.logo} />
              <View className="title">{templet.name}</View>
            </View>
            <View className="footer">
              <View>
                <View className="count">¥{templet.price / 100}</View>
                <View className="expire-time">
                  {templet.duration
                    ? `有效期 ${humanizeDuration(templet.duration, {
                        largest: 1,
                        language: "zh_CN",
                      })}`
                    : ""}
                </View>
              </View>
              {extra && (
                <AtButton
                  size="small"
                  type="secondary"
                  customStyle={{ borderColor: "white" }}
                >
                  立即购买
                </AtButton>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

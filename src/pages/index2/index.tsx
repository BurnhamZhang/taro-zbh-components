import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { AtIcon, AtButton } from "taro-ui";

import NavBar from "../../components/NavBar";

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationStyle: "custom",
  };

  state = {
    leftCircle: true,
  };

  render() {
    const { leftCircle } = this.state;
    return (
      <View className="index">
        <NavBar
          title={"测试"}
          renderLeft={() => <AtIcon value="filter" size="20" />}
          leftCircle={leftCircle}
        />
        <AtButton
          type="primary"
          onClick={() => this.setState({ leftCircle: !leftCircle })}
        >
          leftCircle
        </AtButton>
      </View>
    );
  }
}

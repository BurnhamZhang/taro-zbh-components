import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import "./index.scss";

import NavBar from "../../components/NavBar";
import NumberInput from "../../components/NumberInput";
import ListItem from "../../components/ListItem";
import List from "../../components/List";

interface State {
  value: string;
}

export default class Index extends Component<State> {
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

  state: State = {
    value: "123",
  };

  onClick() {
    Taro.navigateTo({
      url: "/pages/index2/index",
    });
  }
  onChange(v) {
    console.warn("onChange", v);
  }

  render() {
    return (
      <View className="index">
        <NavBar title="首页" />
        <Button onClick={this.onClick.bind(this)}>次页</Button>
        <NumberInput onChange={this.onChange.bind(this)} />
        <List>
          <ListItem
            title="test"
            renderExtra={<View>sdsd</View>}
            renderNote={<View>note</View>}
          />
          <ListItem
            title="test"
            renderExtra={<View>sdsd</View>}
            renderNote={<View>note</View>}
            hasBorder={false}
          />
        </List>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import "./index.scss";

interface SelectProps {
  label: string;
  value: number;
  range: Array<string>;
  onChange(v: any): void;
}

export default class Select extends Component<SelectProps, any> {
  static defaultProps: SelectProps = {
    value: -1,
    label: "",
    range: [],
    onChange: () => {},
  };

  render() {
    const { label, range, value, onChange } = this.props;

    return (
      <View className="select">
        {label && <View>{label}</View>}
        <Picker mode="selector" range={range} value={value} onChange={onChange}>
          <View className="select-item">{range[value] || "请选择"}</View>
        </Picker>
      </View>
    );
  }
}

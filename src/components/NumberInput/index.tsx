import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import delete_icon from "./delete.png";
import keyboard_dismiss_icon from "./keyboard_dismiss.png";
import "./index.scss";

interface NumberInputProps {
  value: string | undefined;
  onChange: (value: string) => any;
  show: false;
  extClass: string | undefined;
}
const res = Taro.getSystemInfoSync();

const isIpx = res.model.indexOf("iPhone X") > -1;

interface NumberInputState {
  value: string;
  show: false;
  index: number;
}

export default class extends Component<NumberInputProps, NumberInputState> {
  static defaultProps: NumberInputProps = {
    onChange: () => {},
    show: false,
    value: "",
    extClass: ""
  };

  constructor(props) {
    super(props);

    this.state = this.updateState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.props.value ||
      nextProps.show !== this.props.show
    ) {
      this.updateState(nextProps);
    }
  }

  updateState(props) {
    return {
      value: props.value || "",
      show: props.show || false,
      index: props.value ? props.value.length : 0
    };
  }

  onClick(v) {
    let { value, index } = this.state;

    value =
      value
        .split("")
        .slice(0, index)
        .join("") +
      v +
      value
        .split("")
        .slice(index, value.length)
        .join("");
    this.setState({
      value,
      index: index + 1
    });
    this.props.onChange(value);
  }
  onSubmit() {}
  onDelete() {
    let { value, index } = this.state;

    value =
      value
        .split("")
        .slice(0, index - 1)
        .join("") +
      value
        .split("")
        .slice(index, value.length)
        .join("");
    this.setState({
      value,
      index: index - 1
    });
    this.props.onChange(value);
  }
  onToggleShow(show, e?) {
    e && e.preventDefault();

    const { value, index } = this.state;

    this.setState({
      show,
      index: show ? value.length : index
    });
  }

  onChangeIndex(index, e) {
    const { show, value } = this.state;
    console.warn("onChangeIndex", show);
    if (show) {
      e && e.stopPropagation();
      this.setState({
        index
      });
    } else {
      this.onClickInput(value.length);
    }
  }

  onClickInput(index) {
    console.warn("onClickInput", index);
    const { show } = this.state;

    if (show) {
      this.setState({
        index
      });
    } else {
      this.onToggleShow(true);
    }
  }

  render() {
    const { value, show, index } = this.state;
    const { extClass } = this.props;

    const data = value.split("");

    const left = data.slice(0, index);
    const right = data.slice(index, data.length);

    return (
      <View className={extClass}>
        <View
          className="input"
          onTouchStart={this.onClickInput.bind(this, value.length)}
        >
          {left.map((text, _index) => (
            <Text
              key={_index}
              onTouchStart={this.onChangeIndex.bind(this, _index)}
            >
              {text}
            </Text>
          ))}
          {show && <Text className="cursor">|</Text>}
          {right.map((text, _index) => (
            <Text
              key={_index}
              onTouchStart={this.onChangeIndex.bind(this, left.length + _index)}
            >
              {text}
            </Text>
          ))}
        </View>
        <View
          className={`number-input-layer  ${show ? "show" : ""} ${
            isIpx ? "isIpx" : ""
          }`}
        >
          <View className="left">
            <View onTouchStart={this.onClick.bind(this, 1)}>1</View>
            <View onTouchStart={this.onClick.bind(this, 4)}>4</View>
            <View onTouchStart={this.onClick.bind(this, 7)}>7</View>
            <View onTouchStart={this.onClick.bind(this, ".")}>.</View>

            <View onTouchStart={this.onClick.bind(this, 2)}>2</View>
            <View onTouchStart={this.onClick.bind(this, 5)}>5</View>
            <View onTouchStart={this.onClick.bind(this, 8)}>8</View>
            <View onTouchStart={this.onClick.bind(this, 0)}>0</View>

            <View onTouchStart={this.onClick.bind(this, 3)}>3</View>
            <View onTouchStart={this.onClick.bind(this, 6)}>6</View>
            <View onTouchStart={this.onClick.bind(this, 9)}>9</View>
            <View onTouchStart={this.onToggleShow.bind(this, false)}>
              <Image src={keyboard_dismiss_icon} className="icon" />
            </View>
          </View>
          <View className="right">
            <View className="delete" onTouchStart={this.onDelete.bind(this)}>
              <Image src={delete_icon} className="icon" />
            </View>
            <View
              className="submit"
              onTouchStart={this.onToggleShow.bind(this, false)}
            >
              确定
            </View>
          </View>
        </View>
      </View>
    );
  }
}

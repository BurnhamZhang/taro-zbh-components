import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtFloatLayout, AtCalendar } from 'taro-ui'
import moment from 'moment'
import 'moment/locale/zh-cn'

interface Value {
  startTime: string
  endTime: string
}

interface FloatCalendarProps {
  value: Value
  onChange(value: Value): void
}

interface FloatCalendarState {
  isOpenedDate: string
}

export default class FloatCalendar extends Component<FloatCalendarProps, FloatCalendarState> {
  static defaultProps: FloatCalendarProps = {
    value: {
      startTime: '',
      endTime: ''
    },
    onChange: () => {}
  }
  state: FloatCalendarState = {
    isOpenedDate: ''
  }
  onChangeDate(e) {
    console.warn(e)
    const { start } = e.value
    if (this.state.isOpenedDate === 'startTime') {
      if (moment(start).isAfter(moment(this.props.value.endTime))) {
        Taro.showToast({
          title: '开始日期不能大与结束日期',
          icon: 'none'
        })
      } else {
        this.props.onChange({ startTime: start, endTime: this.props.value.endTime })
      }
    } else {
      if (moment(this.props.value.startTime).isAfter(moment(start))) {
        Taro.showToast({
          title: '开始日期不能大与结束日期',
          icon: 'none'
        })
      } else {
        this.props.onChange({ startTime: this.props.value.startTime, endTime: start })
      }
    }
    this.setState({
      isOpenedDate: ''
    })
  }

  render() {
    const { isOpenedDate } = this.state
    const { value } = this.props
    const { startTime, endTime } = value || {}
    return (
      <View className="time-select">
        <View>
          日期范围
          <View
            className={`time-select-tag ${
              moment(startTime)
                .add(6, 'days')
                .isSame(moment(endTime), 'day') && moment(endTime).isSame(moment(), 'day')
                ? 'time-select-tag--active'
                : ''
            }`}
            onClick={() => {
              this.props.onChange({
                startTime: moment()
                  .subtract(6, 'days')
                  .format('YYYY-MM-DD'),
                endTime: moment().format('YYYY-MM-DD')
              })
            }}
          >
            近7天
          </View>
          <View
            className={`time-select-tag ${
              moment(startTime)
                .add(29, 'days')
                .isSame(moment(endTime), 'day') && moment(endTime).isSame(moment(), 'day')
                ? 'time-select-tag--active'
                : ''
            }`}
            onClick={() => {
              this.props.onChange({
                startTime: moment()
                  .subtract(29, 'days')
                  .format('YYYY-MM-DD'),
                endTime: moment().format('YYYY-MM-DD')
              })
            }}
          >
            近30天
          </View>
        </View>
        <View>
          <View
            className="time-item"
            onClick={() => {
              this.setState({
                isOpenedDate: 'startTime'
              })
            }}
          >
            {moment(startTime).format('YYYY-MM-DD')}
          </View>
          到
          <View
            className="time-item"
            onClick={() => {
              this.setState({
                isOpenedDate: 'endTime'
              })
            }}
          >
            {moment(endTime).format('YYYY-MM-DD')}
          </View>
        </View>
        <AtFloatLayout isOpened={!!isOpenedDate} onClose={() => this.setState({ isOpenedDate: '' })}>
          <AtCalendar isVertical currentDate={isOpenedDate === 'startTime' ? startTime : endTime} onSelectDate={this.onChangeDate.bind(this)} />
        </AtFloatLayout>
      </View>
    )
  }
}

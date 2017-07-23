import React from 'react'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'

export default React.createClass({
  getInitialState () {
    const start = moment().subtract(29, 'days')
    const today = moment()

    return {
      minDate: '05/20/2016',
      maxDate: today,
      startDate: start,
      endDate: today,
      text: 'Last 30 Days',
      locale: {
        firstDay: 1,
        format: 'DD.MM.YYYY'
      },
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }
  },
  propTypes: {
    changeEvent: React.PropTypes.func.isRequired
  },
  componentDidMount () {
    this.sendDate(this.state)
  },
  handleEvent (event, picker) {
    if (event.type !== 'apply') return

    const start = picker.startDate.format('DD.MM.YYYY')
    const end = picker.endDate.format('DD.MM.YYYY')
    const label = picker.chosenLabel
    const text = (label === 'Custom Range') ? start + ' - ' + end : label

    this.sendDate(picker)
    this.setState({text})
  },
  sendDate (obj) {
    this.props.changeEvent({
      start: obj.startDate.toDate(),
      end: obj.endDate.toDate()
    })
  },
  render () {
    return (
      <DateRangePicker
        onEvent={this.handleEvent}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        locale={this.state.locale}
        ranges={this.state.ranges}
        minDate={this.state.minDate}
        maxDate={this.state.maxDate}
      >
        <button className='ui basic button datepicker-button'>
          <span>{this.state.text}</span>
          <i className='calendar outline icon' />
        </button>
      </DateRangePicker>
    )
  }
})

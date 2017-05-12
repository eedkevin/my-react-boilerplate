import React from 'react';
import { connect } from 'react-redux';
import { changeText } from './redux/actions';

function mapStateToProps(state) {
  return {
    text: 'Hello World',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeText: (text) => dispatch(changeText(text)),
  };
}

class Sample extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  handleChange = (event) => {
    this.props.changeText(event.target.value);
  }
  render() {
    return (
      <div>
        <div>Repeater: {this.props.text}</div>
        <input onChange={this.handleChange} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
import React, {Component} from 'react';
import Toast from '../../components/toast/Toast';

class ToastExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: '轻轻的，我来了'
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
      content: '轻轻的，我来了'
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      content: '甩甩手，我走了'
    });
  };

  render() {
    const {content, open} = this.state;
    return (
      <div>
        <button className="btn btn-raised" onClick={this.handleOpen}>显示 Toast</button>
        <Toast open={open} content={content} handleClose={this.handleClose}/>
      </div>
    );
  }
}

export default ToastExample;

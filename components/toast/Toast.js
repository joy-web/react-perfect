import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Toast 建议在根组件使用，调用的地方只需改变 props 中 open 和 content 即可
class Toast extends Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    prefixCls: PropTypes.string, // 样式前缀，默认为空字符串
    open: PropTypes.bool, // 为 true 时表示打开
    handleClose: PropTypes.func, // 隐藏回调，交由调用者处理
    duration: PropTypes.number, // Toast 持续的时间
  };

  static defaultProps = {
    prefixCls: '',
    duration: 3000
  };

  constructor(props) {
    super(props);
    this.timeoutId = null;
  }

  componentWillReceiveProps(nextProps) {
    const {open} = nextProps;
    if (open === true && open !== this.props.open) {
      const {duration, handleClose} = this.props;
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        if (handleClose && typeof handleClose === 'function') {
          handleClose();
        } else { // 强制隐藏
          this.forceClose();
        }
        clearTimeout(this.timeoutId);
      }, duration);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {content, open} = this.props;
    if (content === nextProps.content && open === nextProps.open) {
      return false;
    }
    return true;
  }

  // 强制隐藏 Toast
  forceClose() {
    const {toast} = this.refs;
    toast.classList.remove('enter');
  }

  render() {
    const {className, style, content, prefixCls, open} = this.props;
    const classes = classNames({
      [`${prefixCls}toast`]: true,
      enter: open
    }, className);

    return (
      <div className={classes} style={style} ref="toast">
        <div className="toast-content">{content}</div>
      </div>
    );
  }
}

export default Toast;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class DropDown extends Component {
  static propTypes = {
    label: PropTypes.string, // label 名称
    options: PropTypes.array, // 数据， 格式为 [{value: '', text: ''}]
    value: PropTypes.string, //当前选中的值
    handleClick: PropTypes.func, // 选择某个下拉框选项事件
    selectHandleClick: PropTypes.func, // 显示某个下拉框选项时事件
    codeKey: PropTypes.string, //键
    placeholder: PropTypes.string,
    optionVisible: PropTypes.bool, //是否显示 options 多个 DropDown 处理
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    options: [],
    placeholder: '全部',
    optionVisible: true,
    disabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.hideOptions, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideOptions, false);
  }

  hideOptions = () => {
    this.setState({
      show: false
    });
  };

  showOptions = (e) => {
    e.stopPropagation();
    const {selectHandleClick, disabled} = this.props;
    if (disabled) {
      return;
    }
    if (selectHandleClick) {
      selectHandleClick();
    }
    const {show} = this.state;
    this.setState({
      show: !show
    });
  };

  handleClick = ({value, text}, index) => {
    const {codeKey} = this.props;
    return () => {
      const {handleClick} = this.props;
      if (codeKey) {
        handleClick({[codeKey]: value, text, index});
      } else {
        handleClick({value, text, index});
      }
      this.setState({
        show: false
      });
    };
  };

  render() {
    const {label, options, value, placeholder, optionVisible} = this.props;
    const {show} = this.state;
    return (
      <div className="select-item">
        <div className={classNames('clearfix', {active: show && optionVisible})}>
          <label>{label}</label>
          <div className="select-wrap">
            <div className="select" onClick={this.showOptions}>
              <input type="text" placeholder={placeholder} readOnly
                value={value}/>
            </div>
            <div className="options-wrap">
              <ul className="options-list">
                {
                  options.map((item, index) => {
                    return (
                      <li key={item.value} className={classNames({active: item.value === value})}
                        onClick={this.handleClick(item, index)}>
                        <span>{item.text}</span>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DropDown;

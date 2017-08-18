import React, {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Row = ({className, style, gutter, children, prefixCls}) => {
  const rowStyle = gutter > 0 ? {
    marginLeft: gutter / -2,
    marginRight: gutter / -2,
    ...style,
  } : style;

  // 处理列对应的间距
  const cols = Children.map(children, (col) => {
    if (!col) {
      return null;
    }
    if (col.props && gutter > 0) {
      return cloneElement(col, {
        style: {
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2,
          ...col.props.style,
        },
      });
    }
    return col;
  });

  return (
    <div className={classNames({
      [`${prefixCls ? `${prefixCls}-` : ''}row`]: true,
    }, className)} style={rowStyle}>
      {cols}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  // 自定义间距，样式 .row 和 .col 提供了默认间距，也可以通过设置 .no-gutters 来取消间距
  // 但当我们想自定义间距时，这时可以使用 gutter 来实现
  gutter: PropTypes.number,
  children: PropTypes.node,
  prefixCls: PropTypes.string, // 样式前缀，默认为空字符串
};

export default Row;

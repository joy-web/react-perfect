import React from 'react';
import PropTypes from 'prop-types';

const Col = ({className, style, children, prefixCls}) => {
  const classes = prefixCls ?
    className.split(/\s+/).map((item) => {
      if (item.startsWith('col')) {
        return `${prefixCls}-${item}`
      }
      return item;
    }).join(' ') : className;
  return (
    <div style={style} className={classes}>
      {children}
    </div>
  );
};

Col.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  children: PropTypes.node,
  prefixCls: PropTypes.string, // 样式前缀，默认为空字符串
};

export default Col;

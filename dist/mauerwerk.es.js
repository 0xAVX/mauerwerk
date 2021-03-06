import React from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import { Transition, Trail, animated, interpolate } from 'react-spring'

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

  return _extends.apply(this, arguments)
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype)
  subClass.prototype.constructor = subClass
  subClass.__proto__ = superClass
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {}
  var target = {}
  var sourceKeys = Object.keys(source)
  var key, i

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i]
    if (excluded.indexOf(key) >= 0) continue
    target[key] = source[key]
  }

  return target
}

var styles = {
  outer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  inner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    minHeight: '100%',
  },
  cell: {
    position: 'absolute',
    willChange: 'transform, width, height, opacity',
  },
}
var Grid = /*#__PURE__*/ (function(_React$PureComponent) {
  _inheritsLoose(Grid, _React$PureComponent)

  function Grid() {
    var _this

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    _this =
      _React$PureComponent.call.apply(
        _React$PureComponent,
        [this].concat(args)
      ) || this
    _this.state = {
      mounted: false,
      width: 0,
      height: 0,
      heightOuter: 0,
      widthOuter: 0,
      curOpen: null,
      lastOpen: null,
    }

    _this.scrollOut = function(e) {
      if (!_this.props.lockScroll) {
        _this.state.curOpen && _this.toggle(null)
        _this.clicked = false
      }
    }

    _this.toggle = function(key) {
      return _this.setState(
        function(state) {
          return {
            lastOpen: state.curOpen,
            curOpen: state.curOpen === key ? null : key,
          }
        },
        function() {
          return (_this.clicked = true)
        }
      )
    }

    _this.resize = function(width, height, props) {
      var _this$setState

      return _this.setState(
        ((_this$setState = {}),
        (_this$setState[width] = props.client.width),
        (_this$setState[height] = props.client.height),
        (_this$setState.mounted = width === 'width' || _this.state.mounted),
        _this$setState)
      )
    }

    _this.resizeOuter = function(props) {
      return _this.resize('widthOuter', 'heightOuter', props)
    }

    _this.resizeInner = function(props) {
      return _this.resize('width', 'height', props)
    }

    _this.update = function(_ref) {
      var key = _ref.key,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height
      var curOpen = _this.state.curOpen === key
      return {
        opacity: _this.state.open && !open ? 0 : 1,
        x: curOpen ? _this.outerRef.scrollLeft : x,
        y: curOpen ? _this.outerRef.scrollTop : y,
        width: curOpen ? _this.state.width : width,
        height: curOpen ? _this.state.heightOuter : height,
      }
    }

    _this.cell = function(_ref2, i) {
      var key = _ref2.key,
        object = _ref2.object
      return function(_ref3) {
        var opacity = _ref3.opacity,
          x = _ref3.x,
          y = _ref3.y,
          width = _ref3.width,
          height = _ref3.height
        var _this$state = _this.state,
          lastOpen = _this$state.lastOpen,
          curOpen = _this$state.curOpen
        var open = _this.props.open
        return React.createElement(animated.div, {
          style: _extends({}, styles.cell, {
            opacity: opacity,
            width: width,
            height: height,
            zIndex: lastOpen === key || curOpen === key ? 1000 : i,
            transform: interpolate([x, y], function(x, y) {
              return 'translate3d(' + x + 'px,' + y + 'px, 0)'
            }),
          }),
          children: _this.props.children(
            object,
            curOpen === key,
            open !== undefined &&
              function() {
                return _this.toggle(key)
              }
          ),
        })
      }
    }

    return _this
  }

  var _proto = Grid.prototype

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.clicked = false
  }

  Grid.getDerivedStateFromProps = function getDerivedStateFromProps(
    props,
    state
  ) {
    if (props.open !== undefined && props.open !== state.curOpen) {
      return {
        lastOpen: state.curOpen,
        curOpen: props.open,
      }
    } else return null
  }

  _proto.render = function render() {
    var _this2 = this

    var _this$props = this.props,
      _this$props$columns = _this$props.columns,
      columns = _this$props$columns === void 0 ? 3 : _this$props$columns,
      _this$props$margin = _this$props.margin,
      margin = _this$props$margin === void 0 ? 0 : _this$props$margin,
      _this$props$occupySpa = _this$props.occupySpace,
      occupySpace =
        _this$props$occupySpa === void 0 ? true : _this$props$occupySpa,
      _this$props$lockScrol = _this$props.lockScroll,
      lockScroll =
        _this$props$lockScrol === void 0 ? false : _this$props$lockScrol,
      _this$props$closeDela = _this$props.closeDelay,
      closeDelay = _this$props$closeDela === void 0 ? 0 : _this$props$closeDela,
      _this$props$transitio = _this$props.transitionMount,
      transitionMount =
        _this$props$transitio === void 0 ? true : _this$props$transitio,
      children = _this$props.children,
      impl = _this$props.impl,
      config = _this$props.config,
      data = _this$props.data,
      keys = _this$props.keys,
      heights = _this$props.heights,
      open = _this$props.open,
      rest = _objectWithoutPropertiesLoose(_this$props, [
        'columns',
        'margin',
        'occupySpace',
        'lockScroll',
        'closeDelay',
        'transitionMount',
        'children',
        'impl',
        'config',
        'data',
        'keys',
        'heights',
        'open',
      ])

    var _this$state2 = this.state,
      curOpen = _this$state2.curOpen,
      height = _this$state2.height,
      width = _this$state2.width,
      widthOuter = _this$state2.widthOuter,
      heightOuter = _this$state2.heightOuter
    var column = 0
    var columnHeights = new Array(columns).fill(0)
    var displayData = data.map(function(child, i) {
      var index = occupySpace
        ? columnHeights.indexOf(Math.min.apply(Math, columnHeights))
        : column++ % columns
      var cellWidth = width / columns - margin / (1 - 1 / (columns + 1))
      var left = cellWidth * index
      var offset = (index + 1) * margin
      var top = columnHeights[index] + margin
      var cellHeight =
        typeof heights === 'function'
          ? heights(child)
          : heights || heightOuter - margin * 2
      columnHeights[index] += cellHeight + margin
      return {
        x: margin ? left + offset : left,
        y: top,
        width: cellWidth,
        height: cellHeight,
        key: keys(child, i),
        object: child,
      }
    })
    var overflow = lockScroll ? (curOpen ? 'hidden' : 'auto') : 'auto'
    var totalHeight = Math.max.apply(Math, columnHeights) + margin
    return React.createElement(
      Measure,
      {
        client: true,
        innerRef: function innerRef(r) {
          return (_this2.outerRef = r)
        },
        onResize: this.resizeOuter,
      },
      function(_ref4) {
        var measureRef = _ref4.measureRef
        return React.createElement(
          'div',
          _extends(
            {
              ref: measureRef,
              style: _extends({}, styles.outer, {}, _this2.props.style, {
                overflow: overflow,
              }),
            },
            rest,
            {
              onScroll: _this2.scrollOut,
              onWheel: _this2.scrollOut,
              onTouchMove: _this2.scrollOut,
            }
          ),
          React.createElement(
            Measure,
            {
              client: true,
              innerRef: function innerRef(r) {
                return (_this2.innerRef = r)
              },
              onResize: _this2.resizeInner,
            },
            function(_ref5) {
              var measureRef = _ref5.measureRef
              return React.createElement(
                'div',
                {
                  ref: measureRef,
                  style: _extends({}, styles.inner, {
                    height: totalHeight,
                  }),
                },
                React.createElement(Transition, {
                  native: true,
                  delay: _this2.clicked && !curOpen ? closeDelay : 0,
                  items: displayData,
                  keys: function keys(d) {
                    return d.key
                  },
                  from: {
                    opacity: 0,
                  },
                  leave: {
                    opacity: 0,
                  },
                  enter: _this2.update,
                  update: _this2.update,
                  impl: impl,
                  config: config,
                  children:
                    (transitionMount || _this2.state.mounted) &&
                    displayData.map(_this2.cell),
                })
              )
            }
          )
        )
      }
    )
  }

  return Grid
})(React.PureComponent)
process.env.NODE_ENV !== 'production'
  ? (Grid.propTypes = {
      data: PropTypes.array,
      keys: PropTypes.func,
      occupySpace: PropTypes.bool,
      columns: PropTypes.number,
      margin: PropTypes.number,
      heights: /*#__PURE__*/ PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
      ]),
      lockScroll: PropTypes.bool,
      closeDelay: PropTypes.number,
      transitionMount: PropTypes.bool,
      open: PropTypes.string,
    })
  : void 0
var index = function(props) {
  return (
    console.warn(
      'The default export will be deprecated next version, import { Grid } from mauerwerk instead!'
    ) || React.createElement(Grid, props)
  )
}

var wrap = function wrap(child, styles) {
  styles = _extends(
    {
      willChange: Object.keys(styles).join(','),
    },
    styles
  )

  if (!animated[child.type]) {
    // Wrap components into animated divs
    return React.createElement(
      animated.div,
      {
        style: _extends({}, styles),
      },
      child
    )
  } else {
    // Otherwise inject styles into existing component-props
    var Component = animated[child.type]

    var props = _extends({}, child.props, {
      style: _extends({}, child.props.style, {}, styles),
    })

    return React.createElement(Component, props)
  }
} // Wrapper around react-springs Trail component.
// It will make each child (which must be a dom node) fade and trail in.

var Slug = /*#__PURE__*/ (function(_React$PureComponent2) {
  _inheritsLoose(Slug, _React$PureComponent2)

  function Slug() {
    return _React$PureComponent2.apply(this, arguments) || this
  }

  var _proto2 = Slug.prototype

  _proto2.render = function render() {
    var _this$props2 = this.props,
      children = _this$props2.children,
      _this$props2$from = _this$props2.from,
      from =
        _this$props2$from === void 0
          ? {
              opacity: 0,
              transform: 'translate3d(0,40px,0)',
            }
          : _this$props2$from,
      _this$props2$to = _this$props2.to,
      to =
        _this$props2$to === void 0
          ? {
              opacity: 1,
              transform: 'translate3d(0,0px,0)',
            }
          : _this$props2$to,
      rest = _objectWithoutPropertiesLoose(_this$props2, [
        'children',
        'from',
        'to',
      ])

    var result = React.Children.map(children, function(child) {
      return function(styles) {
        return wrap(child, styles)
      }
    })
    return React.createElement(
      Trail,
      _extends(
        {
          native: true,
        },
        rest,
        {
          keys: result.map(function(_, i) {
            return i
          }),
          from: from,
          to: to,
          children: result,
        }
      )
    )
  }

  return Slug
})(React.PureComponent) // Wrapper around react-springs Transition.
// It will Transition the child node in and out depending on the "show" prop.

process.env.NODE_ENV !== 'production'
  ? (Slug.propTypes = {
      from: /*#__PURE__*/ PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
      ]),
      to: /*#__PURE__*/ PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    })
  : void 0
var Fade = /*#__PURE__*/ (function(_React$PureComponent3) {
  _inheritsLoose(Fade, _React$PureComponent3)

  function Fade() {
    return _React$PureComponent3.apply(this, arguments) || this
  }

  var _proto3 = Fade.prototype

  _proto3.render = function render() {
    var _this$props3 = this.props,
      children = _this$props3.children,
      _this$props3$show = _this$props3.show,
      show = _this$props3$show === void 0 ? true : _this$props3$show,
      _this$props3$from = _this$props3.from,
      from =
        _this$props3$from === void 0
          ? {
              opacity: 0,
            }
          : _this$props3$from,
      _this$props3$enter = _this$props3.enter,
      enter =
        _this$props3$enter === void 0
          ? {
              opacity: 1,
            }
          : _this$props3$enter,
      _this$props3$leave = _this$props3.leave,
      leave =
        _this$props3$leave === void 0
          ? {
              opacity: 0,
            }
          : _this$props3$leave,
      rest = _objectWithoutPropertiesLoose(_this$props3, [
        'children',
        'show',
        'from',
        'enter',
        'leave',
      ])

    var result = function result(styles) {
      return wrap(children, styles)
    }

    return React.createElement(
      Transition,
      _extends(
        {
          native: true,
          keys: show.toString(),
        },
        rest,
        {
          from: from,
          enter: enter,
          leave: leave,
          children: show ? result : undefined,
        }
      )
    )
  }

  return Fade
})(React.PureComponent)
process.env.NODE_ENV !== 'production'
  ? (Fade.propTypes = {
      children: PropTypes.node.isRequired,
      show: PropTypes.bool,
      from: /*#__PURE__*/ PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
      ]),
      enter: /*#__PURE__*/ PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
      ]),
      leave: /*#__PURE__*/ PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
      ]),
    })
  : void 0

export default index
export { Grid, Slug, Fade }

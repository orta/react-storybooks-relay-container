'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Emulates a Relay-compatible container, passing the data in directly.
// It's hard to know how well this can work for complicated examples. However,
// it's worked well enough so far - ./

var StubbedRelayContainer = function (_React$Component) {
  _inherits(StubbedRelayContainer, _React$Component);

  function StubbedRelayContainer() {
    _classCallCheck(this, StubbedRelayContainer);

    return _possibleConstructorReturn(this, (StubbedRelayContainer.__proto__ || Object.getPrototypeOf(StubbedRelayContainer)).apply(this, arguments));
  }

  _createClass(StubbedRelayContainer, [{
    key: 'getChildContext',

    // Provide a stubbed context for child componentes
    value: function getChildContext() {
      var _this2 = this;

      return {
        relay: {
          environment: {
            '@@RelayModernEnvironment': true,
            unstable_internal: {
              areEqualSelectors: function areEqualSelectors() {},
              createFragmentSpecResolver: function createFragmentSpecResolver() {
                return {
                  resolve: function resolve() {
                    return _this2.props.props;
                  },
                  dispose: function dispose() {},
                  setProps: function setProps() {},
                  isLoading: function isLoading() {},
                  setCallback: function setCallback() {}
                };
              },
              createOperationSelector: function createOperationSelector() {
                return { fragment: {} };
              },
              getDataIDsFromObject: function getDataIDsFromObject() {},
              getFragment: function getFragment() {},
              getOperation: function getOperation() {},
              getSelector: function getSelector() {},
              getSelectorList: function getSelectorList() {},
              getSlectorsFromObject: function getSlectorsFromObject() {},
              getVariablesFromObject: function getVariablesFromObject() {}
            },
            check: function check() {},
            execute: function execute() {},
            lookup: function lookup() {
              return { data: {} };
            },
            retain: function retain() {},
            sendQuery: function sendQuery() {},
            streamQuery: function streamQuery() {},
            subscribe: function subscribe() {},
            applyMutation: function applyMutation() {},
            sendMutation: function sendMutation(input) {
              var onCompleted = input.onCompleted,
                  optimisticResponse = input.optimisticResponse,
                  expectedError = input.expectedError;

              if (onCompleted) {
                onCompleted(optimisticResponse, expectedError);
              }
            },
            forceFetch: function forceFetch() {
              return { abort: function abort() {} };
            },
            getFragmentResolver: function getFragmentResolver() {},
            getStoreData: function getStoreData() {},
            primeCache: function primeCache() {
              return { abort: function abort() {} };
            }
          },
          refetch: function refetch() {},
          variables: this.props.variables || {}
        },
        route: { name: 'string', params: {}, useMockData: true, queries: {} },
        useFakeData: true
      };
    }

    // Directly render the child, and add the data

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(this.props.Component, this.props.props);
    }

    // Needed to pass the isRelayContainer validation step

  }, {
    key: 'getFragmentNames',
    value: function getFragmentNames() {}
  }, {
    key: 'getFragment',
    value: function getFragment() {}
  }, {
    key: 'hasFragment',
    value: function hasFragment() {}
  }, {
    key: 'hasVariable',
    value: function hasVariable() {}
  }]);

  return StubbedRelayContainer;
}(_react2.default.Component);

exports.default = StubbedRelayContainer;


StubbedRelayContainer.childContextTypes = {
  relay: _propTypes2.default.object,
  route: _propTypes2.default.object,
  useFakeData: _propTypes2.default.bool
};


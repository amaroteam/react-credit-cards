'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _payment = require('payment');

var _payment2 = _interopRequireDefault(_payment);

require('./styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCreditCards = function (_React$Component) {
  _inherits(ReactCreditCards, _React$Component);

  function ReactCreditCards(props) {
    _classCallCheck(this, ReactCreditCards);

    var _this = _possibleConstructorReturn(this, (ReactCreditCards.__proto__ || Object.getPrototypeOf(ReactCreditCards)).call(this, props));

    _this.state = {
      isValid: false,
      type: {
        name: 'unknown',
        maxLength: 16
      }
    };
    return _this;
  }

  _createClass(ReactCreditCards, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setCards();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var number = this.props.number;

      this.updateType(number);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          acceptedCards = _props.acceptedCards,
          number = _props.number;
      var nextAcceptedCards = nextProps.acceptedCards,
          nextNumber = nextProps.number;


      if (number !== nextNumber) {
        this.updateType(nextNumber);
      }

      if (acceptedCards.toString() !== nextAcceptedCards.toString()) {
        this.setCards(nextProps);
      }
    }
  }, {
    key: 'setCards',
    value: function setCards() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var acceptedCards = props.acceptedCards;

      var newCardArray = [];

      if (acceptedCards.length) {
        _payment2.default.getCardArray().forEach(function (d) {
          if (acceptedCards.includes(d.type)) {
            newCardArray.push(d);
          }
        });
      } else {
        newCardArray = newCardArray.concat(_payment2.default.getCardArray());
      }

      _payment2.default.setCardArray(newCardArray);
    }
  }, {
    key: 'updateType',
    value: function updateType(number) {
      var callback = this.props.callback;

      var type = _payment2.default.fns.cardType(number) || 'unknown';

      var maxLength = 16;

      if (type === 'amex') {
        maxLength = 15;
      } else if (type === 'dinersclub') {
        maxLength = 14;
      } else if (['hipercard', 'mastercard', 'visa'].includes(type)) {
        maxLength = 19;
      }

      var typeState = {
        issuer: type,
        maxLength: maxLength
      };
      var isValid = _payment2.default.fns.validateCardNumber(number);

      this.setState({
        isValid: isValid,
        type: typeState
      });

      /* istanbul ignore else */
      if (typeof callback === 'function') {
        callback(typeState, isValid);
      }
    }
  }, {
    key: 'formatNumber',
    value: function formatNumber() {
      var type = this.state.type;
      var number = this.props.number;


      var maxLength = type.maxLength;
      var string = typeof number === 'number' ? number.toString() : number;
      if (isNaN(parseInt(number, 10))) {
        string = '';
      }

      if (type.maxLength > 16) {
        maxLength = string.length <= 16 ? 16 : type.maxLength;
      }

      if (string.length > maxLength) {
        string = string.slice(0, maxLength);
      }

      while (string.length < maxLength) {
        string += '•';
      }

      if (['amex', 'dinersclub'].includes(type.issuer)) {
        var format = [0, 4, 10];
        var limit = [4, 6, 5];
        string = string.substr(format[0], limit[0]) + ' ' + string.substr(format[1], limit[1]) + ' ' + string.substr(format[2], limit[2]);
      } else if (number.length > 16) {
        var _format = [0, 4, 8, 12];
        var _limit = [4, 7];
        string = string.substr(_format[0], _limit[0]) + ' ' + string.substr(_format[1], _limit[0]) + ' ' + string.substr(_format[2], _limit[0]) + ' ' + string.substr(_format[3], _limit[1]);
      } else {
        for (var i = 1; i < maxLength / 4; i++) {
          var space_index = i * 4 + (i - 1);
          string = string.slice(0, space_index) + ' ' + string.slice(space_index);
        }
      }

      return string;
    }
  }, {
    key: 'formatExpiry',
    value: function formatExpiry() {
      var expiry = this.props.expiry;


      var value = expiry.toString();
      var maxLength = 6;
      var string = value || '••/••';

      if (value.match(/\//)) {
        string = expiry.replace('/', '');
      }

      if (!string.match(/^[0-9]*$/)) {
        return '••/••';
      }

      while (string.length < 4) {
        string += '•';
      }

      return string.slice(0, 2) + '/' + string.slice(2, maxLength);
    }
  }, {
    key: 'render',
    value: function render() {
      var type = this.state.type;
      var _props2 = this.props,
          cvc = _props2.cvc,
          focused = _props2.focused,
          locale = _props2.locale,
          name = _props2.name,
          placeholders = _props2.placeholders;

      var number = this.formatNumber();
      var expiry = this.formatExpiry();

      return _react2.default.createElement(
        'div',
        { key: 'Cards', className: 'rccs' },
        _react2.default.createElement(
          'div',
          {
            className: ['rccs__card', 'rccs__card--' + type.issuer, focused === 'cvc' && type.issuer !== 'amex' ? 'rccs__card--flipped' : ''].join(' ').trim()
          },
          _react2.default.createElement(
            'div',
            { className: 'rccs__card--front' },
            _react2.default.createElement('div', { className: 'rccs__card__background' }),
            _react2.default.createElement('div', { className: 'rccs__issuer' }),
            _react2.default.createElement(
              'div',
              {
                className: ['rccs__cvc__front', focused === 'cvc' ? 'rccs--focused' : ''].join(' ').trim()
              },
              cvc
            ),
            _react2.default.createElement(
              'div',
              {
                className: ['rccs__number', number.replace(/ /g, '').length > 16 ? 'rccs__number--large' : '', focused === 'number' ? 'rccs--focused' : '', number.substr(0, 1) !== '•' ? 'rccs--filled' : ''].join(' ').trim()
              },
              number
            ),
            _react2.default.createElement(
              'div',
              {
                className: ['rccs__name', focused === 'name' ? 'rccs--focused' : '', name ? 'rccs--filled' : ''].join(' ').trim()
              },
              name || placeholders.name
            ),
            _react2.default.createElement(
              'div',
              {
                className: ['rccs__expiry', focused === 'expiry' ? 'rccs--focused' : '', expiry.substr(0, 1) !== '•' ? 'rccs--filled' : ''].join(' ').trim()
              },
              _react2.default.createElement(
                'div',
                { className: 'rccs__expiry__valid' },
                locale.valid
              ),
              _react2.default.createElement(
                'div',
                { className: 'rccs__expiry__value' },
                expiry
              )
            ),
            _react2.default.createElement('div', { className: 'rccs__chip' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'rccs__card--back' },
            _react2.default.createElement('div', { className: 'rccs__card__background' }),
            _react2.default.createElement('div', { className: 'rccs__stripe' }),
            _react2.default.createElement('div', { className: 'rccs__signature' }),
            _react2.default.createElement(
              'div',
              {
                className: ['rccs__cvc', focused === 'cvc' ? 'rccs--focused' : ''].join(' ').trim()
              },
              cvc
            ),
            _react2.default.createElement('div', { className: 'rccs__issuer' })
          )
        )
      );
    }
  }]);

  return ReactCreditCards;
}(_react2.default.Component);

ReactCreditCards.propTypes = {
  acceptedCards: _propTypes2.default.array,
  callback: _propTypes2.default.func,
  cvc: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  expiry: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  focused: _propTypes2.default.string,
  locale: _propTypes2.default.shape({
    valid: _propTypes2.default.string
  }),
  name: _propTypes2.default.string.isRequired,
  number: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  placeholders: _propTypes2.default.shape({
    name: _propTypes2.default.string
  })
};
ReactCreditCards.defaultProps = {
  acceptedCards: [],
  expiry: '',
  locale: {
    valid: 'valid thru'
  },
  placeholders: {
    name: 'YOUR NAME HERE'
  }
};
exports.default = ReactCreditCards;
'use strict';

exports.__esModule = true;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _payment = require('payment');

var _payment2 = _interopRequireDefault(_payment);

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
      type: {
        name: 'unknown',
        maxLength: 16
      }
    };

    _this.setCards();
    return _this;
  }

  _createClass(ReactCreditCards, [{
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
          if (acceptedCards.indexOf(d.type) !== -1) {
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
      } else if (['hipercard', 'mastercard', 'visa'].indexOf(type) !== -1) {
        maxLength = 19;
      }

      var typeState = {
        issuer: type,
        maxLength: maxLength
      };
      var isValid = _payment2.default.fns.validateCardNumber(number);

      this.setState({
        type: typeState
      });

      /* istanbul ignore else */
      if (typeof callback === 'function') {
        callback(typeState, isValid);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          cvc = _props2.cvc,
          focused = _props2.focused,
          locale = _props2.locale,
          name = _props2.name,
          placeholders = _props2.placeholders;
      var number = this.number,
          expiry = this.expiry;


      return _react2.default.createElement(
        'div',
        { key: 'Cards', className: 'rccs' },
        _react2.default.createElement(
          'div',
          {
            className: ['rccs__card', 'rccs__card--' + this.issuer, focused === 'cvc' && this.issuer !== 'amex' ? 'rccs__card--flipped' : ''].join(' ').trim()
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
  }, {
    key: 'issuer',
    get: function get() {
      var type = this.state.type;
      var _props3 = this.props,
          issuer = _props3.issuer,
          preview = _props3.preview;


      return preview && issuer ? issuer.toLowerCase() : type.issuer;
    }
  }, {
    key: 'number',
    get: function get() {
      var type = this.state.type;
      var _props4 = this.props,
          number = _props4.number,
          preview = _props4.preview;


      var maxLength = preview ? 19 : type.maxLength;
      var nextNumber = typeof number === 'number' ? number.toString() : number.replace(/[A-Za-z]| /g, '');

      if (isNaN(parseInt(nextNumber, 10)) && !preview) {
        nextNumber = '';
      }

      if (maxLength > 16) {
        maxLength = nextNumber.length <= 16 ? 16 : maxLength;
      }

      if (nextNumber.length > maxLength) {
        nextNumber = nextNumber.slice(0, maxLength);
      }

      while (nextNumber.length < maxLength) {
        nextNumber += '•';
      }

      if (['amex', 'dinersclub'].indexOf(this.issuer) !== -1) {
        var format = [0, 4, 10];
        var limit = [4, 6, 5];
        nextNumber = nextNumber.substr(format[0], limit[0]) + ' ' + nextNumber.substr(format[1], limit[1]) + ' ' + nextNumber.substr(format[2], limit[2]);
      } else if (nextNumber.length > 16) {
        var _format = [0, 4, 8, 12];
        var _limit = [4, 7];
        nextNumber = nextNumber.substr(_format[0], _limit[0]) + ' ' + nextNumber.substr(_format[1], _limit[0]) + ' ' + nextNumber.substr(_format[2], _limit[0]) + ' ' + nextNumber.substr(_format[3], _limit[1]);
      } else {
        for (var i = 1; i < maxLength / 4; i++) {
          var space_index = i * 4 + (i - 1);
          nextNumber = nextNumber.slice(0, space_index) + ' ' + nextNumber.slice(space_index);
        }
      }

      return nextNumber;
    }
  }, {
    key: 'expiry',
    get: function get() {
      var _props$expiry = this.props.expiry,
          expiry = _props$expiry === undefined ? '' : _props$expiry;

      var date = typeof expiry === 'number' ? expiry.toString() : expiry;
      var month = '';
      var year = '';

      if (date.indexOf('/') !== -1) {
        var _date$split = date.split('/');

        var _date$split2 = _slicedToArray(_date$split, 2);

        month = _date$split2[0];
        year = _date$split2[1];
      } else if (date.length) {
        month = date.substr(0, 2);
        year = date.substr(2, 6);
      }

      while (month.length < 2) {
        month += '•';
      }

      if (year.length > 2) {
        year = year.substr(2, 4);
      }

      while (year.length < 2) {
        year += '•';
      }

      return month + '/' + year;
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
  issuer: _propTypes2.default.string,
  locale: _propTypes2.default.shape({
    valid: _propTypes2.default.string
  }),
  name: _propTypes2.default.string.isRequired,
  number: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  placeholders: _propTypes2.default.shape({
    name: _propTypes2.default.string
  }),
  preview: _propTypes2.default.bool
};
ReactCreditCards.defaultProps = {
  acceptedCards: [],
  locale: {
    valid: 'valid thru'
  },
  placeholders: {
    name: 'YOUR NAME HERE'
  },
  preview: false
};
exports.default = ReactCreditCards;
/* eslint-disable guard-for-in */
import React from 'react';
import Payment from 'payment';
import './styles.scss';

class CreditCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      type: {
        name: 'unknown',
        maxLength: 16,
      },
    };

    this.hipercard = {
      type: 'hipercard',
      pattern: /^(3841|606282|637)/,
      format: /(\d{1,4})/g,
      length: [16, 19],
      cvcLength: [3],
      luhn: true,
    };
  }

  static propTypes = {
    acceptedCards: React.PropTypes.array,
    callback: React.PropTypes.func,
    cvc: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
    expiry: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
    focused: React.PropTypes.string,
    locale: React.PropTypes.shape({
      valid: React.PropTypes.string,
    }),
    name: React.PropTypes.string.isRequired,
    number: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
    placeholders: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
  };

  static defaultProps = {
    acceptedCards: [],
    expiry: '',
    locale: {
      valid: 'valid thru',
    },
    placeholders: {
      name: 'YOUR NAME HERE',
    },
  };

  componentWillMount() {
    this.setCards();
  }

  componentDidMount() {
    const { number } = this.props;
    this.updateType(number);
  }

  componentWillReceiveProps(nextProps) {
    const { acceptedCards, number } = this.props;

    const {
      acceptedCards: nextAcceptedCards,
      number: nextNumber,
    } = nextProps;

    if (number !== nextNumber) {
      this.updateType(nextNumber);
    }

    if (acceptedCards.toString() !== nextAcceptedCards.toString()) {
      this.setCards(nextProps);
    }
  }

  setCards(props = this.props) {
    const { acceptedCards } = props;
    let newCardArray = [];

    if (acceptedCards.length) {
      /* istanbul ignore else */
      if (acceptedCards.includes('hipercard')) {
        newCardArray.push(this.hipercard);
      }

      Payment.getCardArray().forEach(d => {
        if (acceptedCards.includes(d.type)) {
          newCardArray.push(d);
        }
      });
    }
    else {
      newCardArray.push(this.hipercard);
      newCardArray = newCardArray.concat(Payment.getCardArray());
    }

    Payment.setCardArray(newCardArray);
    this.cardTypes = Payment.getCardArray();
  }

  updateType(number) {
    const { callback } = this.props;
    const type = Payment.fns.cardType(number) || 'unknown';

    let maxLength = 16;

    if (type === 'amex') {
      maxLength = 15;
    }
    else if (type === 'dinersclub') {
      maxLength = 14;
    }
    else if (type === 'hipercard' || type === 'visa') {
      maxLength = 19;
    }

    const typeState = {
      issuer: type,
      maxLength,
    };
    const isValid = Payment.fns.validateCardNumber(number);

    this.setState({
      isValid,
      type: typeState,
    });

    /* istanbul ignore else */
    if (typeof callback === 'function') {
      callback(typeState, isValid);
    }
  }

  formatNumber() {
    const { type } = this.state;
    const { number } = this.props;

    let string = !isNaN(parseInt(number, 10)) ? number : '';
    let maxLength = type.maxLength;

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
      const format = [0, 4, 10];
      const limit = [4, 6, 5];
      string = `${string.substr(format[0], limit[0])} ${string.substr(format[1], limit[1])} ${string.substr(format[2], limit[2])}`;
    }
    else if (number.length > 16) {
      const format = [0, 4, 8, 12];
      const limit = [4, 7];
      string = `${string.substr(format[0], limit[0])} ${string.substr(format[1], limit[0])} ${string.substr(format[2], limit[0])} ${string.substr(format[3], limit[1])}`;
    }
    else {
      for (let i = 1; i < (maxLength / 4); i++) {
        const space_index = (i * 4) + (i - 1);
        string = `${string.slice(0, space_index)} ${string.slice(space_index)}`;
      }
    }

    return string;
  }

  formatExpiry() {
    const { expiry } = this.props;

    const value = expiry.toString();
    const maxLength = 6;
    let string = value || '••/••';

    if (value.match(/\//)) {
      string = expiry.replace('/', '');
    }

    if (!string.match(/^[0-9]*$/)) {
      return '••/••';
    }

    while (string.length < 4) {
      string += '•';
    }

    return `${string.slice(0, 2)}/${string.slice(2, maxLength)}`;
  }

  render() {
    const { type } = this.state;
    const { cvc, focused, locale, name, placeholders } = this.props;
    const number = this.formatNumber();
    const expiry = this.formatExpiry();

    return (
      <div key="Cards" className="rccs">
        <div
          className={[
            'rccs__card',
            `rccs__card--${type.issuer}`,
            focused === 'cvc' && type.issuer !== 'amex' ? 'rccs__card--flipped' : '',
          ].join(' ').trim()}
        >
          <div className="rccs__card--front">
            <div className="rccs__card__background" />
            <div className="rccs__issuer" />
            <div
              className={[
                'rccs__cvc__front',
                focused === 'cvc' ? 'rccs--focused' : '',
              ].join(' ').trim()}
            >
              {cvc}
            </div>
            <div
              className={[
                'rccs__number',
                number.replace(/ /g, '').length > 16 ? 'rccs__number--large' : '',
                focused === 'number' ? 'rccs--focused' : '',
                number.substr(0, 1) !== '•' ? 'rccs--filled' : '',
              ].join(' ').trim()}
            >
              {number}
            </div>
            <div
              className={[
                'rccs__name',
                focused === 'name' ? 'rccs--focused' : '',
                name ? 'rccs--filled' : '',
              ].join(' ').trim()}
            >
              {name || placeholders.name}
            </div>
            <div
              className={[
                'rccs__expiry',
                focused === 'expiry' ? 'rccs--focused' : '',
                expiry.substr(0, 1) !== '•' ? 'rccs--filled' : '',
              ].join(' ').trim()}
            >
              <div className="rccs__expiry__valid">{locale.valid}</div>
              <div className="rccs__expiry__value">{expiry}</div>
            </div>
            <div className="rccs__chip" />
          </div>
          <div className="rccs__card--back">
            <div className="rccs__card__background" />
            <div className="rccs__stripe" />
            <div className="rccs__signature" />
            <div
              className={[
                'rccs__cvc',
                focused === 'cvc' ? 'rccs--focused' : '',
              ].join(' ').trim()}
            >
              {cvc}
            </div>
            <div className="rccs__issuer" />
          </div>
        </div>
      </div>
    );
  }
}

export default CreditCards;

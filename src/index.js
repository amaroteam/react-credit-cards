import React from 'react';
import PropTypes from 'prop-types';
import Payment from 'payment';

class ReactCreditCards extends React.Component {
  constructor(props) {
    super(props);

    this.setCards();
  }

  static propTypes = {
    acceptedCards: PropTypes.array,
    callback: PropTypes.func,
    cvc: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    expiry: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    focused: PropTypes.string,
    issuer: PropTypes.string,
    locale: PropTypes.shape({
      valid: PropTypes.string,
    }),
    name: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    placeholders: PropTypes.shape({
      name: PropTypes.string,
    }),
    preview: PropTypes.bool,
  };

  static defaultProps = {
    acceptedCards: [],
    locale: {
      valid: 'valid thru',
    },
    placeholders: {
      name: 'YOUR NAME HERE',
    },
    preview: false,
  };

  componentDidUpdate(prevProps) {
    const { acceptedCards, callback, number } = this.props;

    if (prevProps.number !== number) {
      /* istanbul ignore else */
      if (typeof callback === 'function') {
        callback(this.options, Payment.fns.validateCardNumber(number));
      }
    }

    if (prevProps.acceptedCards.toString() !== acceptedCards.toString()) {
      this.setCards();
    }
  }

  get issuer() {
    const { issuer, preview } = this.props;

    return preview && issuer ? issuer.toLowerCase() : this.options.issuer;
  }

  get number() {
    const { number, preview } = this.props;

    let maxLength = preview ? 19 : this.options.maxLength;
    let nextNumber = typeof number === 'number' ? number.toString() : number.replace(/[A-Za-z]| /g, '');

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

    if (['amex', 'dinersclub'].includes(this.issuer)) {
      const format = [0, 4, 10];
      const limit = [4, 6, 5];
      nextNumber = `${nextNumber.substr(format[0], limit[0])} ${nextNumber.substr(format[1], limit[1])} ${nextNumber.substr(format[2], limit[2])}`;
    }
    else if (nextNumber.length > 16) {
      const format = [0, 4, 8, 12];
      const limit = [4, 7];
      nextNumber = `${nextNumber.substr(format[0], limit[0])} ${nextNumber.substr(format[1], limit[0])} ${nextNumber.substr(format[2], limit[0])} ${nextNumber.substr(format[3], limit[1])}`;
    }
    else {
      for (let i = 1; i < (maxLength / 4); i++) {
        const space_index = (i * 4) + (i - 1);
        nextNumber = `${nextNumber.slice(0, space_index)} ${nextNumber.slice(space_index)}`;
      }
    }

    return nextNumber;
  }

  get expiry() {
    const { expiry = '' } = this.props;
    const date = typeof expiry === 'number' ? expiry.toString() : expiry;
    let month = '';
    let year = '';

    if (date.includes('/')) {
      [month, year] = date.split('/');
    }
    else if (date.length) {
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

    return `${month}/${year}`;
  }

  get options() {
    const { number } = this.props;
    const issuer = Payment.fns.cardType(number) || 'unknown';

    let maxLength = 16;

    if (issuer === 'amex') {
      maxLength = 15;
    }
    else if (issuer === 'dinersclub') {
      maxLength = 14;
    }
    else if (['hipercard', 'mastercard', 'visa'].includes(issuer)) {
      maxLength = 19;
    }

    return {
      issuer,
      maxLength,
    };
  }

  setCards() {
    const { acceptedCards } = this.props;
    let newCardArray = [];

    if (acceptedCards.length) {
      Payment.getCardArray()
        .forEach(d => {
          if (acceptedCards.includes(d.type)) {
            newCardArray.push(d);
          }
        });
    }
    else {
      newCardArray = newCardArray.concat(Payment.getCardArray());
    }

    Payment.setCardArray(newCardArray);
  }

  render() {
    const { cvc, focused, locale, name, placeholders } = this.props;
    const { number, expiry } = this;

    return (
      <div key="Cards" className="rccs">
        <div
          className={[
            'rccs__card',
            `rccs__card--${this.issuer}`,
            focused === 'cvc' && this.issuer !== 'amex' ? 'rccs__card--flipped' : '',
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

export default ReactCreditCards;

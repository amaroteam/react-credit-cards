/* eslint-disable guard-for-in */
import React from 'react';
import Payment from 'payment';
import './styles.scss';

class CreditCards extends React.PureComponent {
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
      pattern: /^(3841|606282)/,
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
    ]),
    expiry: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    focused: React.PropTypes.string,
    locale: React.PropTypes.shape({
      valid: React.PropTypes.string,
    }),
    name: React.PropTypes.string.isRequired,
    number: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    placeholders: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
  };

  static defaultProps = {
    acceptedCards: [],
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
      this.setCards();
    }
  }

  setCards() {
    const { acceptedCards } = this.props;

    if (acceptedCards.length) {
      const newCardArray = [];

      Payment.getCardArray().forEach(d => {
        if (acceptedCards.includes(d.type)) {
          newCardArray.push(d);
        }
      });

      if (acceptedCards.includes('hipercard')) {
        newCardArray.push(this.hipercard);
      }

      Payment.setCardArray(newCardArray);
    } else {
      Payment.addToCardArray(this.hipercard);
    }

    this.cardTypes = Payment.getCardArray();
  }

  updateType(number) {
    const { type } = this.state;
    const { callback } = this.props;
    const nextType = Payment.fns.cardType(number) || 'unknown';

    if (type.name !== nextType) {
      let maxLength = 16;

      if (nextType === 'amex') {
        maxLength = 15;
      } else if (nextType === 'hipercard' && number.startsWith('3841')) {
        maxLength = 19;
      }

      const typeState = {
        name: nextType,
        maxLength,
      };
      const isValid = Payment.fns.validateCardNumber(number);

      this.setState({
        isValid,
        type: typeState,
      });

      if (typeof callback === 'function') {
        callback(typeState, isValid);
      }
    }
  }

  formatNumber() {
    const { type } = this.state;
    const { number } = this.props;

    let string = number || '';

    if (string.length > type.maxLength) {
      string = string.slice(0, type.maxLength);
    }

    while (string.length < type.maxLength) {
      string += '•';
    }

    if (type.name === 'amex') {
      const spaces = [4, 10];
      string = `${string.substring(0, spaces[0])} ${string.substring(spaces[0], spaces[1])} ${string.substring(spaces[1])}`;
    } else {
      for (let i = 1; i < type.maxLength / 4; i++) {
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
    const { cvc, focused, locale, name, placeholders } = this.props;
    const { type } = this.state;

    return (
      <div key="Cards" className="rccs">
        <div
          className={[
            'rccs__card',
            `rccs__card--${type.name}`,
            focused === 'cvc' && type.name !== 'amex' ? 'rccs__card--flipped' : '',
          ].join(' ').trim()}
        >
          <div className="rccs__card--front">
            <div className="rccs__issuer" />
            <div
              className={[
                'rccs__cvc--front',
                focused === 'cvc' ? 'rccs--focused' : '',
              ].join(' ').trim()}
            >
              {cvc}
            </div>
            <div
              className={[
                'rccs__number',
                focused === 'number' ? 'rccs--focused' : '',
              ].join(' ').trim()}
            >
              {this.formatNumber()}
            </div>
            <div
              className={[
                'rccs__name',
                focused === 'name' ? 'rccs--focused' : '',
              ].join(' ').trim()}
            >
              {name || placeholders.name}
            </div>
            <div
              className={[
                'rccs__expiry',
                focused === 'expiry' ? 'rccs--focused' : '',
              ].join(' ').trim()}
            >
              <div className="rccs__expiry__valid">{locale.valid}</div>
              <div className="rccs__expiry__value">{this.formatExpiry()}</div>
            </div>
            <div className="rccs__chip" />
          </div>
          <div className="rccs__card--back">
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

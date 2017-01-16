import React from 'react';
import Payment from 'payment';

import Cards from '../src';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      name: '',
      exp: '',
      cvc: '',
      focused: '',
    };
  }

  componentDidMount() {
    Payment.formatCardNumber(document.querySelector('[name="number"]'));
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
  }

  handleInputFocus = (e) => {
    const target = e.target;

    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = (e) => {
    const target = e.target;

    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    } else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    } else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  render() {
    const { name, number, expiry, cvc, focused } = this.state;
    return (
      <div className="rccs__demo">
        <h1>React Credit Cards</h1>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
        />
        <form>
          <p>Fill the form with your credit card info</p>
          <div>
            <label htmlFor="number">
              Number
            </label>
            <input
              type="text"
              name="number"
              id="number"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div>
            <label htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div>
            <label htmlFor="expiry">
              Valid Thru
            </label>
            <input
              type="text"
              name="expiry"
              id="expiry"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div>
            <label htmlFor="cvc">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
        </form>
      </div>
    );
  }
}


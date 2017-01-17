# React Credit Cards (rccs)
---

[? ADD LOGO HERE]

[![Travis](https://travis-ci.org/amarofashion/react-credit-cards.svg?branch=master)](https://travis-ci.org/amarofashion/react-credit-cards) [![Code Climate](https://codeclimate.com/github/amarofashion/react-credit-cards/badges/gpa.svg)](https://codeclimate.com/github/amarofashion/react-credit-cards)

React Component to render a beautiful credit card on screen. It integrates with your payment form and updates card brand in real-time.

[ADD GIF HERE]

## Getting Started

To use `rccs` you'll need to install it locally in your project and import the component. There's no need to manually import the `.scss` as it will be done automatically.

### Install

Install `rccs` locally in your project:

    npm install --save-dev react-credit-cards

### Usage

To use `rccs` you'll need to import it in your project:

```jsx
    import Cards from 'react-credit-cards';
    ...

    <Cards
      number={paymentForm.props.number}
      name={paymentForm.props.name}
      expiry={paymentForm.props.expiry}
      cvc={paymentForm.props.cvc}
      focused={paymentForm.props.name}
    />
```

### Features

- We support all credit card brands used in [Payment](https://github.com/jessepollak/payment) and also Hipercard.

### Demo

## Options

You can change the initial options passing props to the component:

- `acceptedCards` {array}: Accepted credit card brands.
- `callback` {func}: A callback function.
- `name` {string}: Name on card.
- `number` {string|number}: Card number.
- `expiry` {string|number}: Card expiry date.
- `cvc` {string|number}: Card CVC/CVV.
- `focused` {string}: Focused field on card.
- `locale` {object}: Localization text on card (e.g. `valid: 'valid thru'`).
- `placeholders` {object}: Placeholder text on card (e.g. `name: 'YOUR NAME HERE'`).

## SCSS options

**Credit Card sizing**

- `$rccs-card-ratio`: Credit card ratio
- `$rccs-size`: Credit card width 
- `$rccs-padding`: Padding around the card

**Credit Card fonts**

- `$rccs-name-font-size`: Name size.
- `$rccs-name-font-family`: Name family.
- `$rccs-number-font-size`: Number size.
- `$rccs-number-font-family`: Number family.
- `$rccs-valid-font-size`: Valid size.
- `$rccs-expiry-font-size`: Expiry size.
- `$rccs-expiry-font-family`: Expiry family.
- `$rccs-cvc-font-size`: CVC size.
- `$rccs-cvc-font-family`: CVC family.
- `$rccs-cvc-color`: CVC color.

**Credit Card styling**

- `$rccs-shadow`: Credit card shadow.
- `$rccs-light-text-color`: Light text color.
- `$rccs-dark-text-color`: Dark text color.
- `$rccs-stripe-bg-color`: Stripe background color on back.
- `$rccs-signature-background`: Sginature space background.
- `$rccs-default-background`: Default card background.
- `$rccs-unknown-background`: Unknown card background.
- `$rccs-background-transition`: Card background transition.
- `$rccs-animate-background`: Card background animation (boolean).

**Credit Card brands**

- `$rccs-amex-background`: Amex card background;

**NOTE:** Syntax is the same for every available issuer.

## Development

Here's how you can get started developing locally:

    $ git clone git@github.com:amarofashion/react-credit-cards.git
    $ cd react-credit-cards
    $ npm install
    $ npm start

Now, if you go to `http://localhost:3000` in your browser, you should see the demo page.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process of contributing to the project.

## LICENSE

This project is licensed under the [MIT License](LICENSE.md).

###### Made with :heart: at [AMARO](https://amaro.com).

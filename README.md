# React Credit Cards 2 - Community Package

> This repository is a hard-fork from the original [react-credit-cards](https://github.com/amaroteam/react-credit-cards) package. The main purpose is to update dependencies, make it usable with React 17 and 18 and clear installation warnings.

[![NPM](https://img.shields.io/npm/v/react-credit-cards-2)](https://www.npmjs.com/package/react-credit-cards-2) [![BundleSize](https://img.shields.io/bundlephobia/min/react-credit-cards-2)](https://bundlephobia.com/package/react-credit-cards-2) [![Travis](https://travis-ci.org/amarofashion/react-credit-cards.svg?branch=master)](https://travis-ci.org/amarofashion/react-credit-cards) [![Maintainability](https://api.codeclimate.com/v1/badges/bb0aa1a6b782c3845f6a/maintainability)](https://codeclimate.com/github/amarofashion/react-credit-cards/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/bb0aa1a6b782c3845f6a/test_coverage)](https://codeclimate.com/github/amarofashion/react-credit-cards/test_coverage)

A slick credit card component for React.

![demo](https://raw.githubusercontent.com/felquis/react-credit-cards-2/master/docs/media/rccs.gif)

[Demo - CodeSandbox](https://ovvwzkzry9.codesandbox.io/)

### Install

```
npm install --save react-credit-cards-2
```

### Usage

```tsx
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';

const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        ...
      </form>
    </div>
  );
}

export default PaymentForm;
```

If you are using SASS, import the CSS `react-credit-cards-2/dist/lib/styles.scss` 

Or you can import the CSS:  
`import 'react-credit-cards-2/dist/es/styles-compiled.css';`

### Features

- We support all credit card issuers available in [credit-card-type](https://github.com/braintree/credit-card-type) plus
 Dankort, Laser, and Visa Electron.

## Props

- `name` {string}: Name on card. \*
- `number` {string|number}: Card number. \*
- `expiry` {string|number}: Card expiry date. `10/20` or `012017` \*
- `cvc` {string|number}: Card CVC/CVV. \*
- `focused` {string}: Focused card field. `name|number|expiry|cvc`
- `locale` {object}: Localization text (e.g. `{ valid: 'valid thru' }`).
- `placeholders` {object}: Placeholder text (e.g. `{ name: 'YOUR NAME HERE' }`).
- `preview` {bool}: To use the card to show scrambled data (e.g. `**** 4567`).
- `issuer` {string}: Set the issuer for the `preview` mode (e.g. `visa|mastercard|...`)
- `acceptedCards` {array}: If you want to limit the accepted cards. (e.g. `['visa', 'mastercard']`
- `callback` {func}: A callback function that will be called when the card number has changed with 2 paramaters: `type ({ issuer: 'visa', maxLength: 19 }), isValid ({boolean})`

\* _Required fields_

## SCSS options

**Credit Card sizing**

- `$rccs-card-ratio`: Card ratio. Defaults to `1.5858`
- `$rccs-size`: Card width. Defaults to `290px`

**Credit Card fonts**

- `$rccs-name-font-size`: Defaults to `17px`
- `$rccs-name-font-family`: Defaults to `Consolas, Courier, monospace`
- `$rccs-number-font-size`: Defaults to `17px`
- `$rccs-number-font-family`: Defaults to `Consolas, Courier, monospace`
- `$rccs-valid-font-size`: Defaults to `10px`
- `$rccs-expiry-font-size`: Defaults to `16px`
- `$rccs-expiry-font-family`: Defaults to `Consolas, Courier, monospace`
- `$rccs-cvc-font-size`: Defaults to `14px`
- `$rccs-cvc-font-family`: Defaults to `Consolas, Courier, monospace`
- `$rccs-cvc-color`: Defaults to `#222`

**Credit Card styling**

- `$rccs-shadow`: Defaults to `0 0 20px rgba(#000, 0.2)`
- `$rccs-light-text-color`: Card text color for dark cards. Defaults to `#fff`
- `$rccs-dark-text-color`: Card text color for light cards. Defaults to `#555`
- `$rccs-stripe-bg-color`: Stripe background color in the back. Defaults to `#2a1d16`
- `$rccs-signature-background`: Signature background in the back. Defaults to `repeating-linear-gradient(0.1deg, #fff 20%, #fff 40%, #fea 40%, #fea 44%, #fff 44%)`
- `$rccs-default-background`: Default card background. Defaults to `linear-gradient(25deg, #939393, #717171)`
- `$rccs-unknown-background`: Unknown card background. Defaults to `linear-gradient(25deg, #999, #999)`
- `$rccs-background-transition`: Card background transition. Defaults to `all 0.5s ease-out`
- `$rccs-animate-background`: Card background animation. Defaults to `true`

**Credit Card brands**

- `$rccs-amex-background`: Defaults to `linear-gradient(25deg, #308c67, #a3f2cf)`
- `$rccs-dankort-background`: Defaults to `linear-gradient(25deg, #ccc, #999)`
- `$rccs-dinersclub-background`: Defaults to `linear-gradient(25deg, #fff, #eee)`
- `$rccs-discover-background`: Defaults to `linear-gradient(25deg, #fff, #eee)`
- `$rccs-mastercard-background`: Defaults to `linear-gradient(25deg, #e8e9e5, #fbfbfb)`
- `$rccs-visa-background`: Defaults to `linear-gradient(25deg, #0f509e, #1399cd)`
- `$rccs-elo-background`: Defaults to `linear-gradient(25deg, #211c18, #aaa7a2)`
- `$rccs-hipercard-background`: Defaults to `linear-gradient(25deg, #8b181b, #de1f27)`

## Development

Here's how you can get started developing locally:

1. Clone this repo and link it to your global `node_modules`:

      $ git clone https://github.com/felquis/react-credit-cards-2.git

      $ cd react-credit-cards-2

      $ npm install

      $ npm link

2. Download the demo source from [codesandbox](https://codesandbox.io/s/ovvwzkzry9).
3. Unzip it to the desired directory.
4. Install the dependencies

    $ cd react-credit-cards-demo

    $ npm install

    $ npm link react-credit-cards

5. On the `react-credit-cards` directory, start the watcher:

    $ npm run watch
    
6. On the `react-credit-cards-demo` directory, start the demo app:

    $ npm start
    
7. 🎉 Done! The demo app will be running on: `http://localhost:3000/`. Your local changes should be automatically reflected there.

Check [npm-link](https://docs.npmjs.com/cli/link.html) for detailed instructions.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process of contributing to the project.

## Useful links

[EBANK's test numbers](https://www.ebanx.com/business/en/developers/integrations/testing/credit-card-test-numbers)  
[Adyen's test numbers](https://gist.github.com/j3j5/8b3e48ccad746b90a54a)  
[Worldpay's test card numbers](https://support.worldpay.com/support/kb/bg/testandgolive/tgl5103.html)  
[Brazilian cards patterns](https://github.com/erikhenrique/bin-cc/blob/master/README.md)

## LICENSE

This project is licensed under the [MIT License](LICENSE.md).

###### Made with ❤️ at [AMARO](https://amaro.com).
###### Maintained with ❤️ by the community

import React from 'react';
import { mount } from 'enzyme';

import ReactCreditCards from '../src';

const mockCallback = jest.fn();

const props = {
  name: '',
  number: '',
  expiry: '',
  cvc: '',
  focused: '',
  callback: mockCallback,
};

function setup(ownProps = props) {
  return mount(<ReactCreditCards {...ownProps} />);
}

describe('ReactCreditCards', () => {
  const wrapper = setup();

  beforeEach(() => {
    mockCallback.mockClear();
  });

  it('should render properly', () => {
    expect(wrapper.find('.rccs').length).toBe(1);
    expect(wrapper.find('.rccs__card').length).toBe(1);
    expect(wrapper.find('.rccs__card').hasClass('rccs__card--unknown')).toBe(true);
  });

  it('should render the card front', () => {
    const front = wrapper.find('.rccs__card--front');

    expect(front.length).toBe(1);
    expect(front.find('.rccs__card__background').length).toBe(1);
    expect(front.find('.rccs__number').length).toBe(1);
    expect(front.find('.rccs__number').text()).toBe('•••• •••• •••• ••••');
    expect(front.find('.rccs__name').length).toBe(1);
    expect(front.find('.rccs__name').text()).toBe('YOUR NAME HERE');
    expect(front.find('.rccs__expiry').length).toBe(1);
    expect(front.find('.rccs__expiry__valid').text()).toBe('valid thru');
    expect(front.find('.rccs__expiry__value').text()).toBe('••/••');
    expect(front.find('.rccs__chip').length).toBe(1);
    expect(front.find('.rccs__issuer').length).toBe(1);
  });

  it('should render the card back', () => {
    const back = wrapper.find('.rccs__card--back');

    expect(back.length).toBe(1);
    expect(back.find('.rccs__card__background').length).toBe(1);
    expect(back.find('.rccs__stripe').length).toBe(1);
    expect(back.find('.rccs__signature').length).toBe(1);
    expect(back.find('.rccs__cvc').length).toBe(1);
    expect(back.find('.rccs__issuer').length).toBe(1);
  });

  it('should handle locale and placeholders updates', () => {
    wrapper.setProps({
      placeholders: {
        name: '------------',
      },
      locale: {
        valid: 'Expiration',
      },
    });

    expect(wrapper.find('.rccs__name').text()).toBe('------------');
    expect(wrapper.find('.rccs__expiry__valid').text()).toBe('Expiration');
  });

  it('should handle new number props (American Express)', () => {
    wrapper.setProps({
      number: '378282246310005',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--amex')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('3782 822463 10005');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 15, issuer: 'amex' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Dankort)', () => {
    wrapper.setProps({
      number: '5019717010103742',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--dankort')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('5019 7170 1010 3742');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 16, issuer: 'dankort' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Diners)', () => {
    wrapper.setProps({
      number: '30569309025904',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--dinersclub')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('3056 930902 5904');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 14, issuer: 'dinersclub' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Discover)', () => {
    wrapper.setProps({
      number: '6011111111111117',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--discover')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('6011 1111 1111 1117');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 16, issuer: 'discover' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Elo)', () => {
    wrapper.setProps({
      number: '6362970000457013',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--elo')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('6362 9700 0045 7013');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 16, issuer: 'elo' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Hipercard)', () => {
    wrapper.setProps({
      number: '3841005899088180330',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--hipercard')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('3841 0058 9908 8180330');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 19, issuer: 'hipercard' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (JCB)', () => {
    wrapper.setProps({
      number: '3530111333300000',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--jcb')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('3530 1113 3330 0000');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 16, issuer: 'jcb' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Laser)', () => {
    wrapper.setProps({
      number: '6709359636227382',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--laser')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('6709 3596 3622 7382');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 16, issuer: 'laser' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Maestro)', () => {
    wrapper.setProps({
      number: '6304414232839699',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--maestro')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('6304 4142 3283 9699');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 16, issuer: 'maestro' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Mastercard)', () => {
    wrapper.setProps({
      number: '5105105105105100',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--mastercard')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('5105 1051 0510 5100');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 19, issuer: 'mastercard' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Unionpay)', () => {
    wrapper.setProps({
      number: '6240008631401148',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--unionpay')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('6240 0086 3140 1148');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 16, issuer: 'unionpay' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Visa)', () => {
    wrapper.setProps({
      number: '4012888888881881',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--visa')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('4012 8888 8888 1881');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 19, issuer: 'visa' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (Visa with 19 digits)', () => {
    wrapper.setProps({
      number: '4111111111111111342',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--visa')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('4111 1111 1111 1111342');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 19, issuer: 'visa' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props (VisaElectron)', () => {
    wrapper.setProps({
      number: '4508269706217171',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--visaelectron')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('4508 2697 0621 7171');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 16, issuer: 'visaelectron' });
    expect(mockCallback.mock.calls[0][1]).toEqual(true);
  });

  it('should handle new number props with extra digits', () => {
    wrapper.setProps({
      number: '5512888888881881000000',
      focused: 'number',
    });

    expect(wrapper.find('.rccs__card').hasClass('rccs__card--mastercard')).toBe(true);
    expect(wrapper.find('.rccs__number').text()).toBe('5512 8888 8888 1881000');
    expect(wrapper.find('.rccs__number').hasClass('rccs--focused')).toBe(true);

    expect(mockCallback.mock.calls[0][0]).toEqual({ maxLength: 19, issuer: 'mastercard' });
    expect(mockCallback.mock.calls[0][1]).toEqual(false);
  });

  it('should handle new name props', () => {
    wrapper.setProps({
      name: 'John Smith',
      focused: 'name',
    });

    expect(wrapper.find('.rccs__name').text()).toBe('John Smith');
    expect(wrapper.find('.rccs__name').hasClass('rccs--focused')).toBe(true);
  });

  it('should handle partial expiry props', () => {
    wrapper.setProps({
      expiry: '12/1',
      focused: 'expiry',
    });

    expect(wrapper.find('.rccs__expiry').hasClass('rccs--focused')).toBe(true);
    expect(wrapper.find('.rccs__expiry__value').text()).toBe('12/1•');
  });

  it('should handle long expiry props', () => {
    wrapper.setProps({
      expiry: '01/2025',
    });

    expect(wrapper.find('.rccs__expiry__value').text()).toBe('01/25');
  });

  it('should handle new expiry props', () => {
    wrapper.setProps({
      expiry: 1218,
      focused: 'expiry',
    });

    expect(wrapper.find('.rccs__expiry').hasClass('rccs--focused')).toBe(true);
    expect(wrapper.find('.rccs__expiry__value').text()).toBe('12/18');
  });

  it('should handle empty expiry props', () => {
    wrapper.setProps({
      expiry: '',
      focused: 'expiry',
    });

    expect(wrapper.find('.rccs__expiry__value').text()).toBe('••/••');
  });

  it('should handle malformatted expiry props', () => {
    wrapper.setProps({
      expiry: '/',
      focused: 'expiry',
    });

    expect(wrapper.find('.rccs__expiry__value').text()).toBe('••/••');
  });

  it('should handle new CVC props', () => {
    wrapper.setProps({
      cvc: '121',
      focused: 'cvc',
    });

    expect(wrapper.find('.rccs__cvc').text()).toBe('121');
    expect(wrapper.find('.rccs__cvc').hasClass('rccs--focused')).toBe(true);
  });

  it('should handle new acceptedCard props', () => {
    expect(wrapper.props().acceptedCards).toEqual([]);

    wrapper.setProps({
      acceptedCards: ['visa', 'mastercard', 'hipercard', 'elo'],
    });

    expect(wrapper.props().acceptedCards).toEqual(['visa', 'mastercard', 'hipercard', 'elo']);
  });

  it('should format a number into string', () => {
    wrapper.setProps({
      number: 4111111111111111,
    });

    expect(typeof wrapper.find('.rccs__number').text()).toBe('string');
  });

  it('should handle preview', () => {
    wrapper.setProps({
      number: '**** **** **** 7056',
      preview: true,
      issuer: 'Hipercard',
    });

    expect(wrapper.find('.rccs__number').text()).toBe('**** **** **** 7056');
    expect(wrapper.find('.rccs__card').hasClass('rccs__card--hipercard')).toBe(true);
  });

  it('should fail with preview set to false', () => {
    wrapper.setProps({
      number: '**** **** **** 1234',
      preview: false,
      issuer: 'Elo',
    });

    expect(wrapper.find('.rccs__number').text()).toBe('•••• •••• •••• ••••');
    expect(wrapper.find('.rccs__card').hasClass('rccs__card--elo')).toBe(false);
  });
});

import React from 'react';
import { mount } from 'enzyme';

import Cards from 'index';

const props = {
  name: 'John Smith',
  number: '4901090345347688',
  expiry: '12/18',
  cvc: '457',
  focused: '',
};

function setup(ownProps = props) {
  return mount(<Cards {...ownProps} />);
}

describe('Cards', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

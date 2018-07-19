import React from 'react';
import { shallow, mount } from 'enzyme';

import Cameras from './Cameras';

describe('<Cameras> <TVs> <Phones>', () => {
  it('should render without crashing', () => {
    shallow(<Cameras />)
  });
  
  // it('should render all component tree', () => {
  //   mount(<Cameras />)
  // })

  it('should check default state of component', () => {
    const wrapper = shallow(<Cameras />);

    expect(wrapper.state().cameras.length).toBe(0);
    expect(wrapper.state().auth).toBe(false);
    expect(wrapper.state().currentPage).toBe(1);
    expect(wrapper.state().foundItems.length).toBe(0);
  });

  it('should check className of elemetns', () => {
    const wrapper = shallow(<Cameras />);

    expect(wrapper.find('.heading')).toHaveClassName('heading')
  })

  it('should check elements children', () => {
    const wrapper = shallow(<Cameras />);

    expect(wrapper.find('.heading').children()).toHaveLength(2);
  })

  it('should check text value', () => {
    const wrapper = shallow(<Cameras />);

    expect(wrapper.find('.items__title').text()).toBe('Cameras');
  })

});
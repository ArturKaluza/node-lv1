import React from 'react';
import { shallow } from 'enzyme';

import NewItem from './NewItem';

describe('<NewItem>', () => {
  it('should render without crashing', () => {
    shallow(<NewItem />);
  })

  it('should check default component state', () => {
    const wrapper = shallow(<NewItem />);

    expect(wrapper.state().name).toBe('');
    expect(wrapper.state().error).toBe('hidden');
    expect(wrapper.state().price).toBe('');
    expect(wrapper.state().name).not.toBe('test');
  });
});
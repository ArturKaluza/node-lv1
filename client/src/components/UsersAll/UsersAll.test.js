import React from 'react';
import { shallow } from 'enzyme';

import UsersAll from './UsersAll';

describe('<UsersAll />', () => {
  it('should render without crashing', () => {
    shallow(<UsersAll />);
  });

  it('should check elements contains another elements', () => {
    const wrapper = shallow(<UsersAll />);

    expect(wrapper.find('.users__list').contains(<div className='users__user-cell'>Last login</div>)).toBe(true);
  });

  it('should chceck elements itself', () => {
    const wrapper = shallow(<UsersAll />);

    expect(wrapper.find('.users__title').exists()).toBe(true);
    expect(wrapper.find('.users__title').equals(<h2 className='users__title'>Users List</h2>)).toBe(true);
  })

})
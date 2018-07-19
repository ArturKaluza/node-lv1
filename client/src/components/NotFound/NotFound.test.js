import React from 'react';
import { shallow } from 'enzyme';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('should render without crashing', () => {
    shallow(<NotFound />);
  })

  it('should check text value', () => {
    expect(shallow(<NotFound />).find('.not__element-heading').text()).toBe('Sorry, page not found');
  })
})
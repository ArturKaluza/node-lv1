import React from 'react';
import { shallow } from 'enzyme';

import Item from './Item';

describe('<Item />', () => {
  it('should make render without crashing', () => {
    shallow(<Item />);
  });

  it('should check amount if h3 elements' , () => {
    expect(shallow(<Item />).find('h3').length).toBe(2);
  });


})
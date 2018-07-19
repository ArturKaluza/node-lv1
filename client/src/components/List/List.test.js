import React from 'react';
import { shallow } from 'enzyme';

import List from './List';

describe('<List />', () => {
  it('should render without crashing', () => {
    const list = [{name: 'test', desc:'test', amount: 20, price: 19}]

    shallow(<List list={list} />);
  })
})
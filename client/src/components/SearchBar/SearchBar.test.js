import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from './SearchBar';

describe('<SearchBar>', () => {
  it('should render without crashing', () => {
    shallow(<SearchBar />)
  })

  it('should check h3 elements text', () => {
    
    expect(shallow(<SearchBar />).find('h3').text()).toBe('Online Store');
  })

  it('should check h3 elemetn exsist', () => {
    expect(shallow(<SearchBar />).find('h3').exists()).toBe(true);
  })

  it('should chceck input props', () => {
    expect(shallow(<SearchBar />).find('input').props().type).toBe('text');
    expect(shallow(<SearchBar />).find('input').props().placeholder).toBe('Search...',);
  })
})
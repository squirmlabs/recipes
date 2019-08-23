import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Container from './index';

const mockStore = configureStore()({});

jest.mock('../actions', () => ({
  getUser: jest.fn().mockReturnValue({ type: 'mock-getUser' }),
}));

describe('Container', () => {
  let mockParams;
  let subject;

  beforeEach(() => {
    mockParams = {};
    mockStore.clearActions();
    subject = shallow(<Container {...mockParams} store={mockStore} />);
  });

  it('should map getUser', () => {
    subject.props().getUser();

    expect(mockStore.getActions()).toEqual([{ type: 'mock-getUser' }]);
  });
});

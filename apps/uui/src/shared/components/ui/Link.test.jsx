// Dependencies
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

// Testable Component
import Link from './Link';

describe('Link Component', () => {
  it('should render a link with href="/foo" and text="Foo"', () => {
    const link = mount(
      <MemoryRouter>
        <Link to="/foo">Foo</Link>
      </MemoryRouter>
    );

    expect(link.find({ href: '/foo' }).length).toEqual(1);
    expect(link.text()).toEqual('Foo');
  });

  it('should render a link with href="https://uui.com" and text="Example"', () => {
    const link = mount(
      <MemoryRouter>
        <Link to="https://uui.com">Upfronts</Link>
      </MemoryRouter>
    );

    expect(link.find({ href: 'https://uui.com' }).length).toEqual(1);
    expect(link.text()).toEqual('Upfronts');
  });

  it('should render an external link with href="/bar" and text="Bar" and target="_blank"', () => {
    const link = mount(
      <MemoryRouter>
        <Link to="/bar" target="_blank" external>
          Bar
        </Link>
      </MemoryRouter>
    );

    expect(link.find({ href: '/bar', target: '_blank' }).length).toEqual(1);
    expect(link.text()).toEqual('Bar');
  });
});

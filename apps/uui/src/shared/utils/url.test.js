import {
  getCurrentApp,
  getParamsFromUrl,
  getLocation,
  getCurrentFrontendApp,
} from './url';

global.window = {
  location: {
    href: 'http://localhost:3000/en/uui',
    pathname: '/en/uui',
  },
};

describe('#getCurrentApp', () => {
  it('should return the current app', () => {
    expect(getCurrentApp('/uui')).toBe('uui');
  });

  it('should return the current app passing the language', () => {
    expect(getCurrentApp('en/uui')).toBe('uui');
  });
});

describe('#getParamsFromUrl', () => {
  it('should return an array of params from given url', () => {
    expect(getParamsFromUrl('/es/blog')).toEqual(['es', 'blog']);
  });
});

describe('#getLocation', () => {
  it('should return the location value', () => {
    const { pathname } = getLocation();

    expect(pathname).toBe('blank');
  });
});

describe('#getCurrentFrontendApp', () => {
  it('should return the current frontend app', () => {
    expect(getCurrentFrontendApp()).toBe('uui');
  });
});

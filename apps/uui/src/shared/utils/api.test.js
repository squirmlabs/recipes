import {
  apiEndpoint,
  apiOptions,
  apiFetch
} from './api';

describe('#apiEndpoint', () => {
  it('should return the endpoint URL', () => {
    expect(apiEndpoint('foo')).toBe('http://localhost:3000/api/foo');
  });
});

describe('#apiOptions', () => {
  it('should return the endpoint URL', () => {
    expect(apiOptions()).toEqual({
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
      },
      body: false
    });
  });
});

describe('#apiFetch', () => {
  it('should get data from the server', () => {
    expect(apiFetch('foo')).resolves.toEqual({});
  });
});

// Utils
import { apiFetch, clientErrorHandler } from '@Utils/api';

// Constants
import { API } from './constants';

class httpAPI {
  static fetchUser() {
    return apiFetch(API.USER);
  }

  static updateSomething(data) {
    const { somethingItemId: id } = data;

    const options = {
      method: 'PUT',
      body: {
        ...data,
      },
    };

    return apiFetch(`${API.SOMETHING.UPDATE}/${id}`, options);
  }

  static createSomething(data) {
    const options = {
      method: 'POST',
      body: {
        ...data,
      },
    };

    return apiFetch(API.SOMETHING.CREATE, options);
  }

  static updateSomethingItem(data, somethingItemId) {
    const options = {
      method: 'PUT',
      body: { ...data },
    };

    return apiFetch(
      `${API.SOMETHING.UPDATEITEM}/${somethingItemId}`,
      options,
      false,
      false,
      clientErrorHandler,
    );
  }

  static addSomethingItem(data) {
    const options = {
      method: 'POST',
      body: { ...data },
    };

    return apiFetch(
      API.SOMETHING.UPDATEITEM,
      options,
      false,
      false,
      clientErrorHandler,
    );
  }

}

export default httpAPI;

// Base Actions
export const request = (ACTION, payload = false) => ({
  type: ACTION.request(),
  payload,
});

export const received = (ACTION, data) => ({
  type: ACTION.success(),
  payload: data,
});

export const failed = (ACTION, err) => ({
  type: ACTION.error(),
  payload: err,
});

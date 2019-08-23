function ClientApiError(response) {
  this.name = 'ClientApiError';
  this.response = response;
}
ClientApiError.prototype = Error.prototype;

export default ClientApiError;

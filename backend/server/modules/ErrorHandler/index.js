class ErrorHandler extends Error {
  constructor(message = 'something went wrong', status = 500) {
    super();
    this.message = typeof message !== 'string' ? '' : message.replace(/"/g, '');
    this.status = Number.isNaN(Number(status)) ? 500 : status;
  }
}

module.exports = ErrorHandler;

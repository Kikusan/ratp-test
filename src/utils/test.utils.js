const PassThrough = require("stream").PassThrough;

class FakeResponse extends PassThrough {
  constructor(options) {
    super(options);
    this.headers = [];
  }
  status(status) {
    this.__status = status;
    return this;
  }
  send(content) {
    this.__content = content;
  }
  set(headers) {
    if (!Array.isArray(headers)) {
      Object.keys(headers).forEach((headerKey) => {
        this.headers.push(`${headerKey}=${headers[headerKey]}`);
      });
    }
  }
}

class FakeRequest extends PassThrough {
  constructor(options = {}) {
    super();
    this.headers = options.headers ? options.headers : {};
    this.params = options.params ? options.params : {};
    this.query = options.query;
    this.user = options.user;
    this.body = options.body;
  }

  setCustom(key, value) {
    this[key] = value;
  }

  param(key) {
    return this.params[key];
  }
}

module.exports = {
  FakeResponse,
  FakeRequest,
};

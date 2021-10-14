
App({
  /**
   * [request description]
   * @param  {[type]} method [description]
   * @param  {[type]} url    [description]
   * @param  {[type]} data   [description]
   * @param  {[type]} header [description]
   * @return {[type]}        [description]
   */
  request: function (method, url, data = {}, header = {}) {
    if (typeof method === 'object') {
      url = method.url;
      data = method.data;
      header = method.header;
      method = method.method;
    }
    var req = {
      method: method,
      url: url,
      header: header,
      data: data,
      config: {},
    }, def = {
      header: function (name, value) {
        if (value) req.header[name] = value;
        else req.header = name;
        return def;
      },
      query: function (name, value) {
        if (value) req.data[name] = value;
        else req.data = name;
        return def;
      },
      send: function (name, value) {
        if (value) req.data[name] = value;
        else req.data = name;
        return def;
      },
      use: function (middleware) {
        req = middleware.call(def, req);
        return def;
      },
      config(name, value) {
        req.config[name] = value;
        return def;
      },
      end: function (callback, done) {
        var p = new Promise(function (accept, reject) {
          if (!callback) {
            if (req.config.loading) {
              wx.showLoading();
            }
            callback = function (err, res) {
              wx.hideLoading();
              if (err) return reject(err);
              else accept(res);
            };
          }
        });
        if (!req.header['content-type']) {
          req.header['content-type'] = req.method == 'get' ?
            'application/x-www-form-urlencoded' : 'application/json';
        }
        req.complete = done;
        req.fail = callback;
        req.success = callback.bind(req, null);
        wx.request(req);
        return p;
      }
    };
    'get post put delete'.split(' ').forEach(function (method) {
      def[method] = (function () {
        return function (url) {
          req.url = req.url || url;
          req.method = req.method || method;
          return def;
        };
      })();
    });
    return def;
  },
  invoke(fn, params = {}) {
    if (typeof fn === 'string') fn = wx[fn];
    return new Promise((resolve, reject) => {
      params.success = resolve;
      params.fail = reject;
      return fn(params);
    });
  }
});
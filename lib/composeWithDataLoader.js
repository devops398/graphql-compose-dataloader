'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

exports.composeWithDataLoader = composeWithDataLoader;

var _graphqlCompose = require('graphql-compose');

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _definitions = require('./definitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeWithDataLoader(typeComposer) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  // if (!(typeComposer instanceof TypeComposer)) {
  //   throw new Error('You should provide TypeComposer instance to composeWithDataLoader method');
  // }
  // 
  // 
  /**
   * Set defaults
   */
  options = {
    cacheExpiration: options.cacheExpiration || 300,
    removeProjection: options.removeProjection || true,
    debug: options.debug || false

    /**
     * Add DataLoader to FindById
     */
  };var findByIdResolver = typeComposer.get('$findById');
  var findByIdLoader = new _dataloader2.default(function (resolveParamsArray) {
    return new _promise2.default(function (resolve, reject) {
      if (options.debug) console.log('New db request (findById)');
      resolve(resolveParamsArray.map(function (rp) {
        return findByIdResolver.resolve(rp);
      }));
    });
  }, { cacheKeyFn: function cacheKeyFn(key) {
      var newKey = getHashKey(key);
      return newKey;
    } });

  typeComposer.setResolver('findById', findByIdResolver.wrapResolve(function (next) {
    return function (rp) {
      if (options.removeProjection) delete rp.projection;
      setTimeout(function () {
        var res = findByIdLoader.clear(rp);
      }, options.cacheExpiration);
      return findByIdLoader.load(rp);
    };
  }));

  /**
   * Add DataLoader to FindByIds
   */
  var findByIdsResolver = typeComposer.get('$findByIds');
  var findByIdsLoader = new _dataloader2.default(function (resolveParamsArray) {
    return new _promise2.default(function (resolve, reject) {
      if (options.debug) console.log('New db request (findByIds)');
      resolve(resolveParamsArray.map(function (rp) {
        return findByIdResolver.resolve(rp);
      }));
    });
  }, { cacheKeyFn: function cacheKeyFn(key) {
      return getHashKey(key);
    } });

  typeComposer.setResolver('findByIds', findByIdsResolver.wrapResolve(function (fn) {
    return function (rp) {
      setTimeout(function () {
        var res = findByIdsLoader.clear(rp);
      }, options.cacheExpiration);
      return findByIdsLoader.load(rp);
    };
  }));

  /**
   * Add DataLoader to Count
   */
  var countResolver = typeComposer.get('$count');
  var countLoader = new _dataloader2.default(function (resolveParamsArray) {
    return new _promise2.default(function (resolve, reject) {
      if (options.debug) console.log('New db request (count)');
      resolve(resolveParamsArray.map(function (rp) {
        return countResolver.resolve(rp);
      }));
    });
  }, { cacheKeyFn: function cacheKeyFn(key) {
      return getHashKey(key);
    } });

  typeComposer.setResolver('count', countResolver.wrapResolve(function (fn) {
    return function (rp) {
      setTimeout(function () {
        var res = countLoader.clear(rp);
      }, options.cacheExpiration);
      return countLoader.load(rp);
    };
  }));

  /**
   * Add DataLoader to FindOne
   */
  var findOneResolver = typeComposer.get('$findOne');
  var findOneLoader = new _dataloader2.default(function (resolveParamsArray) {
    return new _promise2.default(function (resolve, reject) {
      if (options.debug) console.log('New db request (findOne)');
      resolve(resolveParamsArray.map(function (rp) {
        return findOneResolver.resolve(rp);
      }));
    });
  }, { cacheKeyFn: function cacheKeyFn(key) {
      return getHashKey(key);
    } });

  typeComposer.setResolver('findOne', findOneResolver.wrapResolve(function (fn) {
    return function (rp) {
      setTimeout(function () {
        var res = findOneLoader.clear(rp);
      }, options.cacheExpiration);
      return findOneLoader.load(rp);
    };
  }));

  /**
   * Add DataLoader to FindMany
   */
  var findManyResolver = typeComposer.get('$findMany');
  var findManyLoader = new _dataloader2.default(function (resolveParamsArray) {
    return new _promise2.default(function (resolve, reject) {
      if (options.debug) console.log('New db request (findMany)');
      resolve(resolveParamsArray.map(function (rp) {
        return findManyResolver.resolve(rp);
      }));
    });
  }, { cacheKeyFn: function cacheKeyFn(key) {
      return getHashKey(key);
    } });

  typeComposer.setResolver('findMany', findManyResolver.wrapResolve(function (next) {
    return function (rp) {
      if (options.removeProjection) delete rp.projection;
      setTimeout(function () {
        var res = findManyLoader.clear(rp);
      }, options.cacheExpiration);
      return findManyLoader.load(rp);
    };
  }));

  /**
   * Add DataLoader to Connection
   */
  var connectionResolver = typeComposer.get('$connection');
  var connectionFieldNames = typeComposer.getFieldNames();
  var connectionLoader = new _dataloader2.default(function (resolveParamsArray) {
    return new _promise2.default(function (resolve, reject) {
      if (options.debug) console.log('New db request (connection)');
      resolve(resolveParamsArray.map(function (rp) {
        return connectionResolver.resolve(rp);
      }));
    });
  }, { cacheKeyFn: function cacheKeyFn(key) {
      return getHashKey(key);
    } });

  typeComposer.setResolver('connection', connectionResolver.wrapResolve(function (next) {
    return function (rp) {
      if (options.removeProjection) {
        var projection = { edges: { node: {} } };
        connectionFieldNames.map(function (field) {
          return projection.edges.node[field] = true;
        });
        rp.projection = projection;
      }
      setTimeout(function () {
        var res = connectionLoader.clear(rp);
      }, options.cacheExpiration);
      return connectionLoader.load(rp);
    };
  }));

  function censor(censor) {
    // stackoverflow-driven fix
    var i = 0; // https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json

    return function (key, value) {
      if (i !== 0 && (typeof censor === 'undefined' ? 'undefined' : _typeof(censor)) === 'object' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && censor == value) return '[Circular]';

      if (i >= 29) // seems to be a harded maximum of 30 serialized objects?
        return '[Unknown]';

      ++i; // so we know we aren't using the original object anymore

      return value;
    };
  }

  var getHashKey = function getHashKey(key) {
    var object = {};
    (0, _assign2.default)(object, { args: key.args || {} }, { projection: key.projection || {} }, { rawQuery: (0, _stringify2.default)(key.rawQuery || {}) }, { context: (0, _stringify2.default)(key.context || {}, censor(key.context)) });

    var hash = (0, _md2.default)((0, _stringify2.default)(object));
    return hash;
  };

  return typeComposer;
}
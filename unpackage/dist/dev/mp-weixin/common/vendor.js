(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!***************************************************************************!*\
  !*** C:/Users/yanchao03/Desktop/IM demo/HBuilderProjects/demo/pages.json ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 19);

/***/ }),
/* 19 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 20);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 20 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 21 */
/*!*******************************************************************************************************************!*\
  !*** C:/Users/yanchao03/Desktop/IM demo/HBuilderProjects/demo/node_modules/nim-web-sdk-ng/dist/NIM_UNIAPP_SDK.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, uni) {!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {"use strict";var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function t(e) {var t = { exports: {} };return e(t, t.exports), t.exports;}var r,n = function n(e) {return e && e.Math == Math && e;},a = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || function () {return this;}() || Function("return this")(),i = function i(e) {try {return !!e();} catch (e) {return !0;}},o = !i(function () {return 7 != Object.defineProperty({}, 1, { get: function get() {return 7;} })[1];}),s = {}.propertyIsEnumerable,c = Object.getOwnPropertyDescriptor,u = { f: c && !s.call({ 1: 2 }, 1) ? function (e) {var t = c(this, e);return !!t && t.enumerable;} : s },l = function l(e, t) {return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };},p = {}.toString,m = function m(e) {return p.call(e).slice(8, -1);},d = "".split,f = i(function () {return !Object("z").propertyIsEnumerable(0);}) ? function (e) {return "String" == m(e) ? d.call(e, "") : Object(e);} : Object,y = function y(e) {if (null == e) throw TypeError("Can't call method on " + e);return e;},v = function v(e) {return f(y(e));},g = function g(e) {return "object" == typeof e ? null !== e : "function" == typeof e;},h = function h(e, t) {if (!g(e)) return e;var r, n;if (t && "function" == typeof (r = e.toString) && !g(n = r.call(e))) return n;if ("function" == typeof (r = e.valueOf) && !g(n = r.call(e))) return n;if (!t && "function" == typeof (r = e.toString) && !g(n = r.call(e))) return n;throw TypeError("Can't convert object to primitive value");},b = {}.hasOwnProperty,T = function T(e, t) {return b.call(e, t);},M = a.document,S = g(M) && g(M.createElement),k = function k(e) {return S ? M.createElement(e) : {};},w = !o && !i(function () {return 7 != Object.defineProperty(k("div"), "a", { get: function get() {return 7;} }).a;}),x = Object.getOwnPropertyDescriptor,I = { f: o ? x : function (e, t) {if (e = v(e), t = h(t, !0), w) try {return x(e, t);} catch (e) {}if (T(e, t)) return l(!u.f.call(e, t), e[t]);} },E = /#|\.prototype\./,A = function A(e, t) {var r = C[_(e)];return r == j || r != P && ("function" == typeof t ? i(t) : !!t);},_ = A.normalize = function (e) {return String(e).replace(E, ".").toLowerCase();},C = A.data = {},P = A.NATIVE = "N",j = A.POLYFILL = "P",O = A,R = {},L = function L(e) {if ("function" != typeof e) throw TypeError(String(e) + " is not a function");return e;},N = function N(e, t, r) {if (L(e), void 0 === t) return e;switch (r) {case 0:return function () {return e.call(t);};case 1:return function (r) {return e.call(t, r);};case 2:return function (r, n) {return e.call(t, r, n);};case 3:return function (r, n, a) {return e.call(t, r, n, a);};}return function () {return e.apply(t, arguments);};},F = function F(e) {if (!g(e)) throw TypeError(String(e) + " is not an object");return e;},q = Object.defineProperty,U = { f: o ? q : function (e, t, r) {if (F(e), t = h(t, !0), F(r), w) try {return q(e, t, r);} catch (e) {}if ("get" in r || "set" in r) throw TypeError("Accessors not supported");return "value" in r && (e[t] = r.value), e;} },D = o ? function (e, t, r) {return U.f(e, t, l(1, r));} : function (e, t, r) {return e[t] = r, e;},B = I.f,H = function H(e) {var t = function t(_t2, r, n) {if (this instanceof e) {switch (arguments.length) {case 0:return new e();case 1:return new e(_t2);case 2:return new e(_t2, r);}return new e(_t2, r, n);}return e.apply(this, arguments);};return t.prototype = e.prototype, t;},z = function z(e, t) {var r,n,i,o,s,c,u,l,p = e.target,m = e.global,d = e.stat,f = e.proto,y = m ? a : d ? a[p] : (a[p] || {}).prototype,v = m ? R : R[p] || (R[p] = {}),g = v.prototype;for (i in t) {r = !O(m ? i : p + (d ? "." : "#") + i, e.forced) && y && T(y, i), s = v[i], r && (c = e.noTargetGet ? (l = B(y, i)) && l.value : y[i]), o = r && c ? c : t[i], r && typeof s == typeof o || (u = e.bind && r ? N(o, a) : e.wrap && r ? H(o) : f && "function" == typeof o ? N(Function.call, o) : o, (e.sham || o && o.sham || s && s.sham) && D(u, "sham", !0), v[i] = u, f && (T(R, n = p + "Prototype") || D(R, n, {}), R[n][i] = o, e.real && g && !g[i] && D(g, i, o)));}},V = function V(e) {return "function" == typeof e ? e : void 0;},W = function W(e, t) {return arguments.length < 2 ? V(R[e]) || V(a[e]) : R[e] && R[e][t] || a[e] && a[e][t];},$ = Math.ceil,K = Math.floor,G = function G(e) {return isNaN(e = +e) ? 0 : (e > 0 ? K : $)(e);},J = Math.min,Y = function Y(e) {return e > 0 ? J(G(e), 9007199254740991) : 0;},Q = Math.max,X = Math.min,Z = function Z(e, t) {var r = G(e);return r < 0 ? Q(r + t, 0) : X(r, t);},ee = function ee(e) {return function (t, r, n) {var a,i = v(t),o = Y(i.length),s = Z(n, o);if (e && r != r) {for (; o > s;) {if ((a = i[s++]) != a) return !0;}} else for (; o > s; s++) {if ((e || s in i) && i[s] === r) return e || s || 0;}return !e && -1;};},te = { includes: ee(!0), indexOf: ee(!1) },re = {},ne = te.indexOf,ae = function ae(e, t) {var r,n = v(e),a = 0,i = [];for (r in n) {!T(re, r) && T(n, r) && i.push(r);}for (; t.length > a;) {T(n, r = t[a++]) && (~ne(i, r) || i.push(r));}return i;},ie = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],oe = Object.keys || function (e) {return ae(e, ie);},se = o ? Object.defineProperties : function (e, t) {F(e);for (var r, n = oe(t), a = n.length, i = 0; a > i;) {U.f(e, r = n[i++], t[r]);}return e;},ce = W("document", "documentElement"),ue = !0,le = "__core-js_shared__",pe = a[le] || function (e, t) {try {D(a, e, t);} catch (r) {a[e] = t;}return t;}(le, {}),me = t(function (e) {(e.exports = function (e, t) {return pe[e] || (pe[e] = void 0 !== t ? t : {});})("versions", []).push({ version: "3.10.1", mode: "pure", copyright: "© 2021 Denis Pushkarev (zloirock.ru)" });}),de = 0,fe = Math.random(),ye = function ye(e) {return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++de + fe).toString(36);},ve = me("keys"),ge = function ge(e) {return ve[e] || (ve[e] = ye(e));},he = ge("IE_PROTO"),be = function be() {},Te = function Te(e) {return "<script>" + e + "</" + "script>";},_Me = function Me() {try {r = document.domain && new ActiveXObject("htmlfile");} catch (e) {}var e, t;_Me = r ? function (e) {e.write(Te("")), e.close();var t = e.parentWindow.Object;return e = null, t;}(r) : ((t = k("iframe")).style.display = "none", ce.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(Te("document.F=Object")), e.close(), e.F);for (var n = ie.length; n--;) {delete _Me.prototype[ie[n]];}return _Me();};re[he] = !0;var Se = Object.create || function (e, t) {var r;return null !== e ? (be.prototype = F(e), r = new be(), be.prototype = null, r[he] = e) : r = _Me(), void 0 === t ? r : se(r, t);},ke = [].slice,we = {},xe = function xe(e, t, r) {if (!(t in we)) {for (var n = [], a = 0; a < t; a++) {n[a] = "a[" + a + "]";}we[t] = Function("C,a", "return new C(" + n.join(",") + ")");}return we[t](e, r);},Ie = Function.bind || function (e) {var t = L(this),r = ke.call(arguments, 1),n = function n() {var a = r.concat(ke.call(arguments));return this instanceof n ? xe(t, a.length, a) : t.apply(e, a);};return g(t.prototype) && (n.prototype = t.prototype), n;},Ee = W("Reflect", "construct"),Ae = i(function () {function e() {}return !(Ee(function () {}, [], e) instanceof e);}),_e = !i(function () {Ee(function () {});}),Ce = Ae || _e;z({ target: "Reflect", stat: !0, forced: Ce, sham: Ce }, { construct: function construct(e, t) {L(e), F(t);var r = arguments.length < 3 ? e : L(arguments[2]);if (_e && !Ae) return Ee(e, t, r);if (e == r) {switch (t.length) {case 0:return new e();case 1:return new e(t[0]);case 2:return new e(t[0], t[1]);case 3:return new e(t[0], t[1], t[2]);case 4:return new e(t[0], t[1], t[2], t[3]);}var n = [null];return n.push.apply(n, t), new (Ie.apply(e, n))();}var a = r.prototype,i = Se(g(a) ? a : Object.prototype),o = Function.apply.call(e, i, t);return g(o) ? o : i;} });var Pe,je,Oe = R.Reflect.construct,Re = "process" == m(a.process),Le = W("navigator", "userAgent") || "",Ne = a.process,Fe = Ne && Ne.versions,qe = Fe && Fe.v8;qe ? je = (Pe = qe.split("."))[0] + Pe[1] : Le && (!(Pe = Le.match(/Edge\/(\d+)/)) || Pe[1] >= 74) && (Pe = Le.match(/Chrome\/(\d+)/)) && (je = Pe[1]);var Ue = je && +je,De = !!Object.getOwnPropertySymbols && !i(function () {return !Symbol.sham && (Re ? 38 === Ue : Ue > 37 && Ue < 41);}),Be = De && !Symbol.sham && "symbol" == typeof Symbol.iterator,He = Array.isArray || function (e) {return "Array" == m(e);},ze = function ze(e) {return Object(y(e));},Ve = ie.concat("length", "prototype"),We = { f: Object.getOwnPropertyNames || function (e) {return ae(e, Ve);} },$e = We.f,Ke = {}.toString,Ge = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],Je = { f: function f(e) {return Ge && "[object Window]" == Ke.call(e) ? function (e) {try {return $e(e);} catch (e) {return Ge.slice();}}(e) : $e(v(e));} },Ye = { f: Object.getOwnPropertySymbols },Qe = function Qe(e, t, r, n) {n && n.enumerable ? e[t] = r : D(e, t, r);},Xe = me("wks"),Ze = a.Symbol,et = Be ? Ze : Ze && Ze.withoutSetter || ye,tt = function tt(e) {return T(Xe, e) && (De || "string" == typeof Xe[e]) || (De && T(Ze, e) ? Xe[e] = Ze[e] : Xe[e] = et("Symbol." + e)), Xe[e];},rt = { f: tt },nt = U.f,at = function at(e) {var t = R.Symbol || (R.Symbol = {});T(t, e) || nt(t, e, { value: rt.f(e) });},it = {};it[tt("toStringTag")] = "z";var ot = "[object z]" === String(it),st = tt("toStringTag"),ct = "Arguments" == m(function () {return arguments;}()),ut = ot ? m : function (e) {var t, r, n;return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (r = function (e, t) {try {return e[t];} catch (e) {}}(t = Object(e), st)) ? r : ct ? m(t) : "Object" == (n = m(t)) && "function" == typeof t.callee ? "Arguments" : n;},lt = ot ? {}.toString : function () {return "[object " + ut(this) + "]";},pt = U.f,mt = tt("toStringTag"),dt = function dt(e, t, r, n) {if (e) {var a = r ? e : e.prototype;T(a, mt) || pt(a, mt, { configurable: !0, value: t }), n && !ot && D(a, "toString", lt);}},ft = Function.toString;"function" != typeof pe.inspectSource && (pe.inspectSource = function (e) {return ft.call(e);});var yt,vt,gt,ht = pe.inspectSource,bt = a.WeakMap,Tt = "function" == typeof bt && /native code/.test(ht(bt)),Mt = a.WeakMap;if (Tt) {var St = pe.state || (pe.state = new Mt()),kt = St.get,wt = St.has,xt = St.set;yt = function yt(e, t) {return t.facade = e, xt.call(St, e, t), t;}, vt = function vt(e) {return kt.call(St, e) || {};}, gt = function gt(e) {return wt.call(St, e);};} else {var It = ge("state");re[It] = !0, yt = function yt(e, t) {return t.facade = e, D(e, It, t), t;}, vt = function vt(e) {return T(e, It) ? e[It] : {};}, gt = function gt(e) {return T(e, It);};}var Et = { set: yt, get: vt, has: gt, enforce: function enforce(e) {return gt(e) ? vt(e) : yt(e, {});}, getterFor: function getterFor(e) {return function (t) {var r;if (!g(t) || (r = vt(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");return r;};} },At = tt("species"),_t = function _t(e, t) {var r;return He(e) && ("function" != typeof (r = e.constructor) || r !== Array && !He(r.prototype) ? g(r) && null === (r = r[At]) && (r = void 0) : r = void 0), new (void 0 === r ? Array : r)(0 === t ? 0 : t);},Ct = [].push,Pt = function Pt(e) {var t = 1 == e,r = 2 == e,n = 3 == e,a = 4 == e,i = 6 == e,o = 7 == e,s = 5 == e || i;return function (c, u, l, p) {for (var m, d, y = ze(c), v = f(y), g = N(u, l, 3), h = Y(v.length), b = 0, T = p || _t, M = t ? T(c, h) : r || o ? T(c, 0) : void 0; h > b; b++) {if ((s || b in v) && (d = g(m = v[b], b, y), e)) if (t) M[b] = d;else if (d) switch (e) {case 3:return !0;case 5:return m;case 6:return b;case 2:Ct.call(M, m);} else switch (e) {case 4:return !1;case 7:Ct.call(M, m);}}return i ? -1 : n || a ? a : M;};},jt = { forEach: Pt(0), map: Pt(1), filter: Pt(2), some: Pt(3), every: Pt(4), find: Pt(5), findIndex: Pt(6), filterOut: Pt(7) },Ot = jt.forEach,Rt = ge("hidden"),Lt = "Symbol",Nt = tt("toPrimitive"),Ft = Et.set,qt = Et.getterFor(Lt),Ut = Object.prototype,_Dt = a.Symbol,Bt = W("JSON", "stringify"),Ht = I.f,zt = U.f,Vt = Je.f,Wt = u.f,$t = me("symbols"),Kt = me("op-symbols"),Gt = me("string-to-symbol-registry"),Jt = me("symbol-to-string-registry"),Yt = me("wks"),Qt = a.QObject,Xt = !Qt || !Qt.prototype || !Qt.prototype.findChild,Zt = o && i(function () {return 7 != Se(zt({}, "a", { get: function get() {return zt(this, "a", { value: 7 }).a;} })).a;}) ? function (e, t, r) {var n = Ht(Ut, t);n && delete Ut[t], zt(e, t, r), n && e !== Ut && zt(Ut, t, n);} : zt,er = function er(e, t) {var r = $t[e] = Se(_Dt.prototype);return Ft(r, { type: Lt, tag: e, description: t }), o || (r.description = t), r;},tr = Be ? function (e) {return "symbol" == typeof e;} : function (e) {return Object(e) instanceof _Dt;},rr = function rr(e, t, r) {e === Ut && rr(Kt, t, r), F(e);var n = h(t, !0);return F(r), T($t, n) ? (r.enumerable ? (T(e, Rt) && e[Rt][n] && (e[Rt][n] = !1), r = Se(r, { enumerable: l(0, !1) })) : (T(e, Rt) || zt(e, Rt, l(1, {})), e[Rt][n] = !0), Zt(e, n, r)) : zt(e, n, r);},nr = function nr(e, t) {F(e);var r = v(t),n = oe(r).concat(sr(r));return Ot(n, function (t) {o && !ar.call(r, t) || rr(e, t, r[t]);}), e;},ar = function ar(e) {var t = h(e, !0),r = Wt.call(this, t);return !(this === Ut && T($t, t) && !T(Kt, t)) && (!(r || !T(this, t) || !T($t, t) || T(this, Rt) && this[Rt][t]) || r);},ir = function ir(e, t) {var r = v(e),n = h(t, !0);if (r !== Ut || !T($t, n) || T(Kt, n)) {var a = Ht(r, n);return !a || !T($t, n) || T(r, Rt) && r[Rt][n] || (a.enumerable = !0), a;}},or = function or(e) {var t = Vt(v(e)),r = [];return Ot(t, function (e) {T($t, e) || T(re, e) || r.push(e);}), r;},sr = function sr(e) {var t = e === Ut,r = Vt(t ? Kt : v(e)),n = [];return Ot(r, function (e) {!T($t, e) || t && !T(Ut, e) || n.push($t[e]);}), n;};if (De || (_Dt = function Dt() {if (this instanceof _Dt) throw TypeError("Symbol is not a constructor");var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,t = ye(e),r = function r(e) {this === Ut && r.call(Kt, e), T(this, Rt) && T(this[Rt], t) && (this[Rt][t] = !1), Zt(this, t, l(1, e));};return o && Xt && Zt(Ut, t, { configurable: !0, set: r }), er(t, e);}, Qe(_Dt.prototype, "toString", function () {return qt(this).tag;}), Qe(_Dt, "withoutSetter", function (e) {return er(ye(e), e);}), u.f = ar, U.f = rr, I.f = ir, We.f = Je.f = or, Ye.f = sr, rt.f = function (e) {return er(tt(e), e);}, o && zt(_Dt.prototype, "description", { configurable: !0, get: function get() {return qt(this).description;} })), z({ global: !0, wrap: !0, forced: !De, sham: !De }, { Symbol: _Dt }), Ot(oe(Yt), function (e) {at(e);}), z({ target: Lt, stat: !0, forced: !De }, { for: function _for(e) {var t = String(e);if (T(Gt, t)) return Gt[t];var r = _Dt(t);return Gt[t] = r, Jt[r] = t, r;}, keyFor: function keyFor(e) {if (!tr(e)) throw TypeError(e + " is not a symbol");if (T(Jt, e)) return Jt[e];}, useSetter: function useSetter() {Xt = !0;}, useSimple: function useSimple() {Xt = !1;} }), z({ target: "Object", stat: !0, forced: !De, sham: !o }, { create: function create(e, t) {return void 0 === t ? Se(e) : nr(Se(e), t);}, defineProperty: rr, defineProperties: nr, getOwnPropertyDescriptor: ir }), z({ target: "Object", stat: !0, forced: !De }, { getOwnPropertyNames: or, getOwnPropertySymbols: sr }), z({ target: "Object", stat: !0, forced: i(function () {Ye.f(1);}) }, { getOwnPropertySymbols: function getOwnPropertySymbols(e) {return Ye.f(ze(e));} }), Bt) {var cr = !De || i(function () {var e = _Dt();return "[null]" != Bt([e]) || "{}" != Bt({ a: e }) || "{}" != Bt(Object(e));});z({ target: "JSON", stat: !0, forced: cr }, { stringify: function stringify(e, t, r) {for (var n, a = [e], i = 1; arguments.length > i;) {a.push(arguments[i++]);}if (n = t, (g(t) || void 0 !== e) && !tr(e)) return He(t) || (t = function t(e, _t3) {if ("function" == typeof n && (_t3 = n.call(this, e, _t3)), !tr(_t3)) return _t3;}), a[1] = t, Bt.apply(null, a);} });}_Dt.prototype[Nt] || D(_Dt.prototype, Nt, _Dt.prototype.valueOf), dt(_Dt, Lt), re[Rt] = !0;var ur = R.Object.getOwnPropertySymbols,lr = tt("species"),pr = function pr(e) {return Ue >= 51 || !i(function () {var t = [];return (t.constructor = {})[lr] = function () {return { foo: 1 };}, 1 !== t[e](Boolean).foo;});},mr = jt.filter,dr = pr("filter");z({ target: "Array", proto: !0, forced: !dr }, { filter: function filter(e) {return mr(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var fr = function fr(e) {return R[e + "Prototype"];},yr = fr("Array").filter,vr = Array.prototype,gr = function gr(e) {var t = e.filter;return e === vr || e instanceof Array && t === vr.filter ? yr : t;},hr = I.f,br = i(function () {hr(1);});z({ target: "Object", stat: !0, forced: !o || br, sham: !o }, { getOwnPropertyDescriptor: function getOwnPropertyDescriptor(e, t) {return hr(v(e), t);} });var Tr = t(function (e) {var t = R.Object,r = e.exports = function (e, r) {return t.getOwnPropertyDescriptor(e, r);};t.getOwnPropertyDescriptor.sham && (r.sham = !0);}),Mr = Tr,Sr = W("Reflect", "ownKeys") || function (e) {var t = We.f(F(e)),r = Ye.f;return r ? t.concat(r(e)) : t;},kr = function kr(e, t, r) {var n = h(t);n in e ? U.f(e, n, l(0, r)) : e[n] = r;};z({ target: "Object", stat: !0, sham: !o }, { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(e) {for (var t, r, n = v(e), a = I.f, i = Sr(n), o = {}, s = 0; i.length > s;) {void 0 !== (r = a(n, t = i[s++])) && kr(o, t, r);}return o;} });var wr = R.Object.getOwnPropertyDescriptors;z({ target: "Object", stat: !0, forced: !o, sham: !o }, { defineProperties: se });var xr = t(function (e) {var t = R.Object,r = e.exports = function (e, r) {return t.defineProperties(e, r);};t.defineProperties.sham && (r.sham = !0);}),Ir = xr;z({ target: "Object", stat: !0, forced: !o, sham: !o }, { defineProperty: U.f });var Er = t(function (e) {var t = R.Object,r = e.exports = function (e, r, n) {return t.defineProperty(e, r, n);};t.defineProperty.sham && (r.sham = !0);}),Ar = Er,_r = !i(function () {function e() {}return e.prototype.constructor = null, Object.getPrototypeOf(new e()) !== e.prototype;}),Cr = ge("IE_PROTO"),Pr = Object.prototype,jr = _r ? Object.getPrototypeOf : function (e) {return e = ze(e), T(e, Cr) ? e[Cr] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? Pr : null;},Or = Object.setPrototypeOf || ("__proto__" in {} ? function () {var e,t = !1,r = {};try {(e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(r, []), t = r instanceof Array;} catch (e) {}return function (r, n) {return F(r), function (e) {if (!g(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype");}(n), t ? e.call(r, n) : r.__proto__ = n, r;};}() : void 0),Rr = {},Lr = tt("iterator"),Nr = Array.prototype,Fr = function Fr(e) {return void 0 !== e && (Rr.Array === e || Nr[Lr] === e);},qr = tt("iterator"),Ur = function Ur(e) {if (null != e) return e[qr] || e["@@iterator"] || Rr[ut(e)];},Dr = function Dr(e) {var t = e.return;if (void 0 !== t) return F(t.call(e)).value;},Br = function Br(e, t) {this.stopped = e, this.result = t;},Hr = function Hr(e, t, r) {var n,a,i,o,s,c,u,l = r && r.that,p = !(!r || !r.AS_ENTRIES),m = !(!r || !r.IS_ITERATOR),d = !(!r || !r.INTERRUPTED),f = N(t, l, 1 + p + d),y = function y(e) {return n && Dr(n), new Br(!0, e);},v = function v(e) {return p ? (F(e), d ? f(e[0], e[1], y) : f(e[0], e[1])) : d ? f(e, y) : f(e);};if (m) n = e;else {if ("function" != typeof (a = Ur(e))) throw TypeError("Target is not iterable");if (Fr(a)) {for (i = 0, o = Y(e.length); o > i; i++) {if ((s = v(e[i])) && s instanceof Br) return s;}return new Br(!1);}n = a.call(e);}for (c = n.next; !(u = c.call(n)).done;) {try {s = v(u.value);} catch (e) {throw Dr(n), e;}if ("object" == typeof s && s && s instanceof Br) return s;}return new Br(!1);},zr = function zr(e, t) {var r = this;if (!(r instanceof zr)) return new zr(e, t);Or && (r = Or(new Error(void 0), jr(r))), void 0 !== t && D(r, "message", String(t));var n = [];return Hr(e, n.push, { that: n }), D(r, "errors", n), r;};zr.prototype = Se(Error.prototype, { constructor: l(5, zr), message: l(5, ""), name: l(5, "AggregateError") }), z({ global: !0 }, { AggregateError: zr });var Vr = a.Promise,Wr = function Wr(e, t, r) {for (var n in t) {r && r.unsafe && e[n] ? e[n] = t[n] : Qe(e, n, t[n], r);}return e;},$r = tt("species"),Kr = function Kr(e) {var t = W(e),r = U.f;o && t && !t[$r] && r(t, $r, { configurable: !0, get: function get() {return this;} });},Gr = function Gr(e, t, r) {if (!(e instanceof t)) throw TypeError("Incorrect " + (r ? r + " " : "") + "invocation");return e;},Jr = tt("iterator"),Yr = !1;try {var Qr = 0,Xr = { next: function next() {return { done: !!Qr++ };}, return: function _return() {Yr = !0;} };Xr[Jr] = function () {return this;}, Array.from(Xr, function () {throw 2;});} catch (e) {}var Zr,en,tn,rn = function rn(e, t) {if (!t && !Yr) return !1;var r = !1;try {var n = {};n[Jr] = function () {return { next: function next() {return { done: r = !0 };} };}, e(n);} catch (e) {}return r;},nn = tt("species"),an = function an(e, t) {var r,n = F(e).constructor;return void 0 === n || null == (r = F(n)[nn]) ? t : L(r);},on = /(?:iphone|ipod|ipad).*applewebkit/i.test(Le),sn = a.location,cn = a.setImmediate,un = a.clearImmediate,ln = a.process,pn = a.MessageChannel,mn = a.Dispatch,dn = 0,fn = {},yn = "onreadystatechange",vn = function vn(e) {if (fn.hasOwnProperty(e)) {var t = fn[e];delete fn[e], t();}},gn = function gn(e) {return function () {vn(e);};},hn = function hn(e) {vn(e.data);},bn = function bn(e) {a.postMessage(e + "", sn.protocol + "//" + sn.host);};cn && un || (cn = function cn(e) {for (var t = [], r = 1; arguments.length > r;) {t.push(arguments[r++]);}return fn[++dn] = function () {("function" == typeof e ? e : Function(e)).apply(void 0, t);}, Zr(dn), dn;}, un = function un(e) {delete fn[e];}, Re ? Zr = function Zr(e) {ln.nextTick(gn(e));} : mn && mn.now ? Zr = function Zr(e) {mn.now(gn(e));} : pn && !on ? (tn = (en = new pn()).port2, en.port1.onmessage = hn, Zr = N(tn.postMessage, tn, 1)) : a.addEventListener && "function" == typeof postMessage && !a.importScripts && sn && "file:" !== sn.protocol && !i(bn) ? (Zr = bn, a.addEventListener("message", hn, !1)) : Zr = yn in k("script") ? function (e) {ce.appendChild(k("script")).onreadystatechange = function () {ce.removeChild(this), vn(e);};} : function (e) {setTimeout(gn(e), 0);});var Tn,Mn,Sn,kn,wn,xn,In,En,An = { set: cn, clear: un },_n = /web0s(?!.*chrome)/i.test(Le),Cn = I.f,Pn = An.set,jn = a.MutationObserver || a.WebKitMutationObserver,On = a.document,Rn = a.process,Ln = a.Promise,Nn = Cn(a, "queueMicrotask"),Fn = Nn && Nn.value;Fn || (Tn = function Tn() {var e, t;for (Re && (e = Rn.domain) && e.exit(); Mn;) {t = Mn.fn, Mn = Mn.next;try {t();} catch (e) {throw Mn ? kn() : Sn = void 0, e;}}Sn = void 0, e && e.enter();}, on || Re || _n || !jn || !On ? Ln && Ln.resolve ? (In = Ln.resolve(void 0), En = In.then, kn = function kn() {En.call(In, Tn);}) : kn = Re ? function () {Rn.nextTick(Tn);} : function () {Pn.call(a, Tn);} : (wn = !0, xn = On.createTextNode(""), new jn(Tn).observe(xn, { characterData: !0 }), kn = function kn() {xn.data = wn = !wn;}));var qn = Fn || function (e) {var t = { fn: e, next: void 0 };Sn && (Sn.next = t), Mn || (Mn = t, kn()), Sn = t;},Un = function Un(e) {var t, r;this.promise = new e(function (e, n) {if (void 0 !== t || void 0 !== r) throw TypeError("Bad Promise constructor");t = e, r = n;}), this.resolve = L(t), this.reject = L(r);},Dn = { f: function f(e) {return new Un(e);} },Bn = function Bn(e, t) {if (F(e), g(t) && t.constructor === e) return t;var r = Dn.f(e);return (0, r.resolve)(t), r.promise;},Hn = function Hn(e) {try {return { error: !1, value: e() };} catch (e) {return { error: !0, value: e };}},zn = An.set,Vn = tt("species"),Wn = "Promise",$n = Et.get,Kn = Et.set,Gn = Et.getterFor(Wn),_Jn = Vr,Yn = a.TypeError,Qn = a.document,Xn = a.process;W("fetch");var Zn,ea,ta,ra = Dn.f,na = ra,aa = !!(Qn && Qn.createEvent && a.dispatchEvent),ia = "function" == typeof PromiseRejectionEvent,oa = "unhandledrejection",sa = O(Wn, function () {if (!(ht(_Jn) !== String(_Jn))) {if (66 === Ue) return !0;if (!Re && !ia) return !0;}if (!_Jn.prototype.finally) return !0;if (Ue >= 51 && /native code/.test(_Jn)) return !1;var e = _Jn.resolve(1),t = function t(e) {e(function () {}, function () {});};return (e.constructor = {})[Vn] = t, !(e.then(function () {}) instanceof t);}),ca = sa || !rn(function (e) {_Jn.all(e).catch(function () {});}),ua = function ua(e) {var t;return !(!g(e) || "function" != typeof (t = e.then)) && t;},la = function la(e, t) {if (!e.notified) {e.notified = !0;var r = e.reactions;qn(function () {for (var n = e.value, a = 1 == e.state, i = 0; r.length > i;) {var o,s,c,u = r[i++],l = a ? u.ok : u.fail,p = u.resolve,m = u.reject,d = u.domain;try {l ? (a || (2 === e.rejection && fa(e), e.rejection = 1), !0 === l ? o = n : (d && d.enter(), o = l(n), d && (d.exit(), c = !0)), o === u.promise ? m(Yn("Promise-chain cycle")) : (s = ua(o)) ? s.call(o, p, m) : p(o)) : m(n);} catch (e) {d && !c && d.exit(), m(e);}}e.reactions = [], e.notified = !1, t && !e.rejection && ma(e);});}},pa = function pa(e, t, r) {var n, i;aa ? ((n = Qn.createEvent("Event")).promise = t, n.reason = r, n.initEvent(e, !1, !0), a.dispatchEvent(n)) : n = { promise: t, reason: r }, !ia && (i = a["on" + e]) ? i(n) : e === oa && function (e, t) {var r = a.console;r && r.error && (1 === arguments.length ? r.error(e) : r.error(e, t));}("Unhandled promise rejection", r);},ma = function ma(e) {zn.call(a, function () {var t,r = e.facade,n = e.value;if (da(e) && (t = Hn(function () {Re ? Xn.emit("unhandledRejection", n, r) : pa(oa, r, n);}), e.rejection = Re || da(e) ? 2 : 1, t.error)) throw t.value;});},da = function da(e) {return 1 !== e.rejection && !e.parent;},fa = function fa(e) {zn.call(a, function () {var t = e.facade;Re ? Xn.emit("rejectionHandled", t) : pa("rejectionhandled", t, e.value);});},ya = function ya(e, t, r) {return function (n) {e(t, n, r);};},va = function va(e, t, r) {e.done || (e.done = !0, r && (e = r), e.value = t, e.state = 2, la(e, !0));},ga = function ga(e, t, r) {if (!e.done) {e.done = !0, r && (e = r);try {if (e.facade === t) throw Yn("Promise can't be resolved itself");var n = ua(t);n ? qn(function () {var r = { done: !1 };try {n.call(t, ya(ga, r, e), ya(va, r, e));} catch (t) {va(r, t, e);}}) : (e.value = t, e.state = 1, la(e, !1));} catch (t) {va({ done: !1 }, t, e);}}};sa && (_Jn = function Jn(e) {Gr(this, _Jn, Wn), L(e), Zn.call(this);var t = $n(this);try {e(ya(ga, t), ya(va, t));} catch (e) {va(t, e);}}, (Zn = function Zn(e) {Kn(this, { type: Wn, done: !1, notified: !1, parent: !1, reactions: [], rejection: !1, state: 0, value: void 0 });}).prototype = Wr(_Jn.prototype, { then: function then(e, t) {var r = Gn(this),n = ra(an(this, _Jn));return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = Re ? Xn.domain : void 0, r.parent = !0, r.reactions.push(n), 0 != r.state && la(r, !1), n.promise;}, catch: function _catch(e) {return this.then(void 0, e);} }), ea = function ea() {var e = new Zn(),t = $n(e);this.promise = e, this.resolve = ya(ga, t), this.reject = ya(va, t);}, Dn.f = ra = function ra(e) {return e === _Jn || e === ta ? new ea(e) : na(e);}), z({ global: !0, wrap: !0, forced: sa }, { Promise: _Jn }), dt(_Jn, Wn, !1, !0), Kr(Wn), ta = W(Wn), z({ target: Wn, stat: !0, forced: sa }, { reject: function reject(e) {var t = ra(this);return t.reject.call(void 0, e), t.promise;} }), z({ target: Wn, stat: !0, forced: ue }, { resolve: function resolve(e) {return Bn(this === ta ? _Jn : this, e);} }), z({ target: Wn, stat: !0, forced: ca }, { all: function all(e) {var t = this,r = ra(t),n = r.resolve,a = r.reject,i = Hn(function () {var r = L(t.resolve),i = [],o = 0,s = 1;Hr(e, function (e) {var c = o++,u = !1;i.push(void 0), s++, r.call(t, e).then(function (e) {u || (u = !0, i[c] = e, --s || n(i));}, a);}), --s || n(i);});return i.error && a(i.value), r.promise;}, race: function race(e) {var t = this,r = ra(t),n = r.reject,a = Hn(function () {var a = L(t.resolve);Hr(e, function (e) {a.call(t, e).then(r.resolve, n);});});return a.error && n(a.value), r.promise;} }), z({ target: "Promise", stat: !0 }, { allSettled: function allSettled(e) {var t = this,r = Dn.f(t),n = r.resolve,a = r.reject,i = Hn(function () {var r = L(t.resolve),a = [],i = 0,o = 1;Hr(e, function (e) {var s = i++,c = !1;a.push(void 0), o++, r.call(t, e).then(function (e) {c || (c = !0, a[s] = { status: "fulfilled", value: e }, --o || n(a));}, function (e) {c || (c = !0, a[s] = { status: "rejected", reason: e }, --o || n(a));});}), --o || n(a);});return i.error && a(i.value), r.promise;} });var ha = "No one promise resolved";z({ target: "Promise", stat: !0 }, { any: function any(e) {var t = this,r = Dn.f(t),n = r.resolve,a = r.reject,i = Hn(function () {var r = L(t.resolve),i = [],o = 0,s = 1,c = !1;Hr(e, function (e) {var u = o++,l = !1;i.push(void 0), s++, r.call(t, e).then(function (e) {l || c || (c = !0, n(e));}, function (e) {l || c || (l = !0, i[u] = e, --s || a(new (W("AggregateError"))(i, ha)));});}), --s || a(new (W("AggregateError"))(i, ha));});return i.error && a(i.value), r.promise;} });var ba = !!Vr && i(function () {Vr.prototype.finally.call({ then: function then() {} }, function () {});});z({ target: "Promise", proto: !0, real: !0, forced: ba }, { finally: function _finally(e) {var t = an(this, W("Promise")),r = "function" == typeof e;return this.then(r ? function (r) {return Bn(t, e()).then(function () {return r;});} : e, r ? function (r) {return Bn(t, e()).then(function () {throw r;});} : e);} });var Ta,Ma,Sa,ka = function ka(e) {return function (t, r) {var n,a,i = String(y(t)),o = G(r),s = i.length;return o < 0 || o >= s ? e ? "" : void 0 : (n = i.charCodeAt(o)) < 55296 || n > 56319 || o + 1 === s || (a = i.charCodeAt(o + 1)) < 56320 || a > 57343 ? e ? i.charAt(o) : n : e ? i.slice(o, o + 2) : a - 56320 + (n - 55296 << 10) + 65536;};},wa = { codeAt: ka(!1), charAt: ka(!0) },xa = tt("iterator"),Ia = !1;[].keys && ("next" in (Sa = [].keys()) ? (Ma = jr(jr(Sa))) !== Object.prototype && (Ta = Ma) : Ia = !0);var Ea = null == Ta || i(function () {var e = {};return Ta[xa].call(e) !== e;});Ea && (Ta = {}), Ea && !T(Ta, xa) && D(Ta, xa, function () {return this;});var Aa = { IteratorPrototype: Ta, BUGGY_SAFARI_ITERATORS: Ia },_a = Aa.IteratorPrototype,Ca = function Ca() {return this;},Pa = Aa.IteratorPrototype,ja = Aa.BUGGY_SAFARI_ITERATORS,Oa = tt("iterator"),Ra = "keys",La = "values",Na = "entries",Fa = function Fa() {return this;},qa = function qa(e, t, r, n, a, i, o) {!function (e, t, r) {var n = t + " Iterator";e.prototype = Se(_a, { next: l(1, r) }), dt(e, n, !1, !0), Rr[n] = Ca;}(r, t, n);var s,c,u,p = function p(e) {if (e === a && v) return v;if (!ja && e in f) return f[e];switch (e) {case Ra:case La:case Na:return function () {return new r(this, e);};}return function () {return new r(this);};},m = t + " Iterator",d = !1,f = e.prototype,y = f[Oa] || f["@@iterator"] || a && f[a],v = !ja && y || p(a),g = "Array" == t && f.entries || y;if (g && (s = jr(g.call(new e())), Pa !== Object.prototype && s.next && (dt(s, m, !0, !0), Rr[m] = Fa)), a == La && y && y.name !== La && (d = !0, v = function v() {return y.call(this);}), o && f[Oa] !== v && D(f, Oa, v), Rr[t] = v, a) if (c = { values: p(La), keys: i ? v : p(Ra), entries: p(Na) }, o) for (u in c) {(ja || d || !(u in f)) && Qe(f, u, c[u]);} else z({ target: t, proto: !0, forced: ja || d }, c);return c;},Ua = wa.charAt,Da = "String Iterator",Ba = Et.set,Ha = Et.getterFor(Da);qa(String, "String", function (e) {Ba(this, { type: Da, string: String(e), index: 0 });}, function () {var e,t = Ha(this),r = t.string,n = t.index;return n >= r.length ? { value: void 0, done: !0 } : (e = Ua(r, n), t.index += e.length, { value: e, done: !1 });});var za = "Array Iterator",Va = Et.set,Wa = Et.getterFor(za);qa(Array, "Array", function (e, t) {Va(this, { type: za, target: v(e), index: 0, kind: t });}, function () {var e = Wa(this),t = e.target,r = e.kind,n = e.index++;return !t || n >= t.length ? (e.target = void 0, { value: void 0, done: !0 }) : "keys" == r ? { value: n, done: !1 } : "values" == r ? { value: t[n], done: !1 } : { value: [n, t[n]], done: !1 };}, "values"), Rr.Arguments = Rr.Array;var $a = tt("toStringTag");for (var Ka in { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 }) {var Ga = a[Ka],Ja = Ga && Ga.prototype;Ja && ut(Ja) !== $a && D(Ja, $a, Ka), Rr[Ka] = Rr.Array;}var Ya = R.Promise;z({ target: "Promise", stat: !0 }, { try: function _try(e) {var t = Dn.f(this),r = Hn(e);return (r.error ? t.reject : t.resolve)(r.value), t.promise;} });var Qa = Ya;function Xa(e, t, r, n, a, i, o) {try {var s = e[i](o),c = s.value;} catch (e) {return void r(e);}s.done ? t(c) : Qa.resolve(c).then(n, a);}function Za(e) {return function () {var t = this,r = arguments;return new Qa(function (n, a) {var i = e.apply(t, r);function o(e) {Xa(i, n, a, o, s, "next", e);}function s(e) {Xa(i, n, a, o, s, "throw", e);}o(void 0);});};}function ei(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function ti(e, t) {for (var r = 0; r < t.length; r++) {var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Ar(e, n.key, n);}}function ri(e, t, r) {return t && ti(e.prototype, t), r && ti(e, r), e;}function ni(e) {if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e;}z({ target: "Reflect", stat: !0 }, { get: function e(t, r) {var n,a,i = arguments.length < 3 ? t : arguments[2];return F(t) === i ? t[r] : (n = I.f(t, r)) ? T(n, "value") ? n.value : void 0 === n.get ? void 0 : n.get.call(i) : g(a = jr(t)) ? e(a, r, i) : void 0;} });var ai = R.Reflect.get;z({ target: "Object", stat: !0 }, { setPrototypeOf: Or });var ii = R.Object.setPrototypeOf,oi = i(function () {jr(1);});z({ target: "Object", stat: !0, forced: oi, sham: !_r }, { getPrototypeOf: function getPrototypeOf(e) {return jr(ze(e));} });var si = R.Object.getPrototypeOf;function ci(e) {return ci = ii ? si : function (e) {return e.__proto__ || si(e);}, ci(e);}function ui(e, t, r) {return ui = "undefined" != typeof Reflect && ai ? ai : function (e, t, r) {var n = function (e, t) {for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = ci(e));) {;}return e;}(e, t);if (n) {var a = Mr(n, t);return a.get ? a.get.call(r) : a.value;}}, ui(e, t, r || e);}z({ target: "Object", stat: !0, sham: !o }, { create: Se });var li = R.Object,pi = function pi(e, t) {return li.create(e, t);};function mi(e, t) {return mi = ii || function (e, t) {return e.__proto__ = t, e;}, mi(e, t);}function di(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");e.prototype = pi(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && mi(e, t);}var fi = tt("isConcatSpreadable"),yi = 9007199254740991,vi = "Maximum allowed index exceeded",gi = Ue >= 51 || !i(function () {var e = [];return e[fi] = !1, e.concat()[0] !== e;}),hi = pr("concat"),bi = function bi(e) {if (!g(e)) return !1;var t = e[fi];return void 0 !== t ? !!t : He(e);};z({ target: "Array", proto: !0, forced: !gi || !hi }, { concat: function concat(e) {var t,r,n,a,i,o = ze(this),s = _t(o, 0),c = 0;for (t = -1, n = arguments.length; t < n; t++) {if (bi(i = -1 === t ? o : arguments[t])) {if (c + (a = Y(i.length)) > yi) throw TypeError(vi);for (r = 0; r < a; r++, c++) {r in i && kr(s, c, i[r]);}} else {if (c >= yi) throw TypeError(vi);kr(s, c++, i);}}return s.length = c, s;} }), at("asyncIterator"), at("hasInstance"), at("isConcatSpreadable"), at("iterator"), at("match"), at("matchAll"), at("replace"), at("search"), at("species"), at("split"), at("toPrimitive"), at("toStringTag"), at("unscopables"), dt(a.JSON, "JSON", !0);var Ti = R.Symbol;at("asyncDispose"), at("dispose"), at("observable"), at("patternMatch"), at("replaceAll");var Mi = Ti,Si = rt.f("iterator");function ki(e) {return ki = "function" == typeof Mi && "symbol" == typeof Si ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Mi && e.constructor === Mi && e !== Mi.prototype ? "symbol" : typeof e;}, ki(e);}function wi(e, t) {return !t || "object" !== ki(t) && "function" != typeof t ? ni(e) : t;}function xi(e, t, r) {return t in e ? Ar(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;}var Ii = t(function (e) {var t = function (e) {var t,r = Object.prototype,n = r.hasOwnProperty,a = "function" == typeof Symbol ? Symbol : {},i = a.iterator || "@@iterator",o = a.asyncIterator || "@@asyncIterator",s = a.toStringTag || "@@toStringTag";function c(e, t, r) {return Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }), e[t];}try {c({}, "");} catch (e) {c = function c(e, t, r) {return e[t] = r;};}function u(e, t, r, n) {var a = t && t.prototype instanceof v ? t : v,i = Object.create(a.prototype),o = new A(n || []);return i._invoke = function (e, t, r) {var n = p;return function (a, i) {if (n === d) throw new Error("Generator is already running");if (n === f) {if ("throw" === a) throw i;return C();}for (r.method = a, r.arg = i;;) {var o = r.delegate;if (o) {var s = x(o, r);if (s) {if (s === y) continue;return s;}}if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {if (n === p) throw n = f, r.arg;r.dispatchException(r.arg);} else "return" === r.method && r.abrupt("return", r.arg);n = d;var c = l(e, t, r);if ("normal" === c.type) {if (n = r.done ? f : m, c.arg === y) continue;return { value: c.arg, done: r.done };}"throw" === c.type && (n = f, r.method = "throw", r.arg = c.arg);}};}(e, r, o), i;}function l(e, t, r) {try {return { type: "normal", arg: e.call(t, r) };} catch (e) {return { type: "throw", arg: e };}}e.wrap = u;var p = "suspendedStart",m = "suspendedYield",d = "executing",f = "completed",y = {};function v() {}function g() {}function h() {}var b = {};b[i] = function () {return this;};var T = Object.getPrototypeOf,M = T && T(T(_([])));M && M !== r && n.call(M, i) && (b = M);var S = h.prototype = v.prototype = Object.create(b);function k(e) {["next", "throw", "return"].forEach(function (t) {c(e, t, function (e) {return this._invoke(t, e);});});}function w(e, t) {function r(a, i, o, s) {var c = l(e[a], e, i);if ("throw" !== c.type) {var u = c.arg,p = u.value;return p && "object" == typeof p && n.call(p, "__await") ? t.resolve(p.__await).then(function (e) {r("next", e, o, s);}, function (e) {r("throw", e, o, s);}) : t.resolve(p).then(function (e) {u.value = e, o(u);}, function (e) {return r("throw", e, o, s);});}s(c.arg);}var a;this._invoke = function (e, n) {function i() {return new t(function (t, a) {r(e, n, t, a);});}return a = a ? a.then(i, i) : i();};}function x(e, r) {var n = e.iterator[r.method];if (n === t) {if (r.delegate = null, "throw" === r.method) {if (e.iterator.return && (r.method = "return", r.arg = t, x(e, r), "throw" === r.method)) return y;r.method = "throw", r.arg = new TypeError("The iterator does not provide a 'throw' method");}return y;}var a = l(n, e.iterator, r.arg);if ("throw" === a.type) return r.method = "throw", r.arg = a.arg, r.delegate = null, y;var i = a.arg;return i ? i.done ? (r[e.resultName] = i.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : i : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);}function I(e) {var t = { tryLoc: e[0] };1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);}function E(e) {var t = e.completion || {};t.type = "normal", delete t.arg, e.completion = t;}function A(e) {this.tryEntries = [{ tryLoc: "root" }], e.forEach(I, this), this.reset(!0);}function _(e) {if (e) {var r = e[i];if (r) return r.call(e);if ("function" == typeof e.next) return e;if (!isNaN(e.length)) {var a = -1,o = function r() {for (; ++a < e.length;) {if (n.call(e, a)) return r.value = e[a], r.done = !1, r;}return r.value = t, r.done = !0, r;};return o.next = o;}}return { next: C };}function C() {return { value: t, done: !0 };}return g.prototype = S.constructor = h, h.constructor = g, g.displayName = c(h, s, "GeneratorFunction"), e.isGeneratorFunction = function (e) {var t = "function" == typeof e && e.constructor;return !!t && (t === g || "GeneratorFunction" === (t.displayName || t.name));}, e.mark = function (e) {return Object.setPrototypeOf ? Object.setPrototypeOf(e, h) : (e.__proto__ = h, c(e, s, "GeneratorFunction")), e.prototype = Object.create(S), e;}, e.awrap = function (e) {return { __await: e };}, k(w.prototype), w.prototype[o] = function () {return this;}, e.AsyncIterator = w, e.async = function (t, r, n, a, i) {void 0 === i && (i = Promise);var o = new w(u(t, r, n, a), i);return e.isGeneratorFunction(r) ? o : o.next().then(function (e) {return e.done ? e.value : o.next();});}, k(S), c(S, s, "Generator"), S[i] = function () {return this;}, S.toString = function () {return "[object Generator]";}, e.keys = function (e) {var t = [];for (var r in e) {t.push(r);}return t.reverse(), function r() {for (; t.length;) {var n = t.pop();if (n in e) return r.value = n, r.done = !1, r;}return r.done = !0, r;};}, e.values = _, A.prototype = { constructor: A, reset: function reset(e) {if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(E), !e) for (var r in this) {"t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);}}, stop: function stop() {this.done = !0;var e = this.tryEntries[0].completion;if ("throw" === e.type) throw e.arg;return this.rval;}, dispatchException: function dispatchException(e) {if (this.done) throw e;var r = this;function a(n, a) {return s.type = "throw", s.arg = e, r.next = n, a && (r.method = "next", r.arg = t), !!a;}for (var i = this.tryEntries.length - 1; i >= 0; --i) {var o = this.tryEntries[i],s = o.completion;if ("root" === o.tryLoc) return a("end");if (o.tryLoc <= this.prev) {var c = n.call(o, "catchLoc"),u = n.call(o, "finallyLoc");if (c && u) {if (this.prev < o.catchLoc) return a(o.catchLoc, !0);if (this.prev < o.finallyLoc) return a(o.finallyLoc);} else if (c) {if (this.prev < o.catchLoc) return a(o.catchLoc, !0);} else {if (!u) throw new Error("try statement without catch or finally");if (this.prev < o.finallyLoc) return a(o.finallyLoc);}}}}, abrupt: function abrupt(e, t) {for (var r = this.tryEntries.length - 1; r >= 0; --r) {var a = this.tryEntries[r];if (a.tryLoc <= this.prev && n.call(a, "finallyLoc") && this.prev < a.finallyLoc) {var i = a;break;}}i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);var o = i ? i.completion : {};return o.type = e, o.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(o);}, complete: function complete(e, t) {if ("throw" === e.type) throw e.arg;return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), y;}, finish: function finish(e) {for (var t = this.tryEntries.length - 1; t >= 0; --t) {var r = this.tryEntries[t];if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), E(r), y;}}, catch: function _catch(e) {for (var t = this.tryEntries.length - 1; t >= 0; --t) {var r = this.tryEntries[t];if (r.tryLoc === e) {var n = r.completion;if ("throw" === n.type) {var a = n.arg;E(r);}return a;}}throw new Error("illegal catch attempt");}, delegateYield: function delegateYield(e, r, n) {return this.delegate = { iterator: _(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y;} }, e;}(e.exports);try {regeneratorRuntime = t;} catch (e) {Function("r", "regeneratorRuntime = r")(t);}}),Ei = Ii;z({ target: "Number", stat: !0 }, { MAX_SAFE_INTEGER: 9007199254740991 });var Ai = 9007199254740991,_i = function _i(e, t) {var r = [][e];return !!r && i(function () {r.call(null, t || function () {throw 1;}, 1);});},Ci = jt.forEach,Pi = _i("forEach") ? [].forEach : function (e) {return Ci(this, e, arguments.length > 1 ? arguments[1] : void 0);};z({ target: "Array", proto: !0, forced: [].forEach != Pi }, { forEach: Pi });var ji = fr("Array").forEach,Oi = Array.prototype,Ri = { DOMTokenList: !0, NodeList: !0 },Li = function Li(e) {var t = e.forEach;return e === Oi || e instanceof Array && t === Oi.forEach || Ri.hasOwnProperty(ut(e)) ? ji : t;},Ni = i(function () {oe(1);});z({ target: "Object", stat: !0, forced: Ni }, { keys: function keys(e) {return oe(ze(e));} });var Fi = R.Object.keys,qi = te.indexOf,Ui = [].indexOf,Di = !!Ui && 1 / [1].indexOf(1, -0) < 0,Bi = _i("indexOf");z({ target: "Array", proto: !0, forced: Di || !Bi }, { indexOf: function indexOf(e) {return Di ? Ui.apply(this, arguments) || 0 : qi(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var Hi = fr("Array").indexOf,zi = Array.prototype,Vi = function Vi(e) {var t = e.indexOf;return e === zi || e instanceof Array && t === zi.indexOf ? Hi : t;},Wi = fr("Array").concat,$i = Array.prototype,Ki = function Ki(e) {var t = e.concat;return e === $i || e instanceof Array && t === $i.concat ? Wi : t;},Gi = pr("slice"),Ji = tt("species"),Yi = [].slice,Qi = Math.max;z({ target: "Array", proto: !0, forced: !Gi }, { slice: function slice(e, t) {var r,n,a,i = v(this),o = Y(i.length),s = Z(e, o),c = Z(void 0 === t ? o : t, o);if (He(i) && ("function" != typeof (r = i.constructor) || r !== Array && !He(r.prototype) ? g(r) && null === (r = r[Ji]) && (r = void 0) : r = void 0, r === Array || void 0 === r)) return Yi.call(i, s, c);for (n = new (void 0 === r ? Array : r)(Qi(c - s, 0)), a = 0; s < c; s++, a++) {s in i && kr(n, a, i[s]);}return n.length = a, n;} });var Xi = fr("Array").slice,Zi = Array.prototype,eo = function eo(e) {var t = e.slice;return e === Zi || e instanceof Array && t === Zi.slice ? Xi : t;},to = !i(function () {return Object.isExtensible(Object.preventExtensions({}));}),ro = t(function (e) {var t = U.f,r = ye("meta"),n = 0,a = Object.isExtensible || function () {return !0;},i = function i(e) {t(e, r, { value: { objectID: "O" + ++n, weakData: {} } });},o = e.exports = { REQUIRED: !1, fastKey: function fastKey(e, t) {if (!g(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;if (!T(e, r)) {if (!a(e)) return "F";if (!t) return "E";i(e);}return e[r].objectID;}, getWeakData: function getWeakData(e, t) {if (!T(e, r)) {if (!a(e)) return !0;if (!t) return !1;i(e);}return e[r].weakData;}, onFreeze: function onFreeze(e) {return to && o.REQUIRED && a(e) && !T(e, r) && i(e), e;} };re[r] = !0;}),no = U.f,ao = jt.forEach,io = Et.set,oo = Et.getterFor,so = U.f,co = ro.fastKey,uo = Et.set,lo = Et.getterFor,po = { getConstructor: function getConstructor(e, t, r, n) {var a = e(function (e, i) {Gr(e, a, t), uo(e, { type: t, index: Se(null), first: void 0, last: void 0, size: 0 }), o || (e.size = 0), null != i && Hr(i, e[n], { that: e, AS_ENTRIES: r });}),i = lo(t),s = function s(e, t, r) {var n,a,s = i(e),u = c(e, t);return u ? u.value = r : (s.last = u = { index: a = co(t, !0), key: t, value: r, previous: n = s.last, next: void 0, removed: !1 }, s.first || (s.first = u), n && (n.next = u), o ? s.size++ : e.size++, "F" !== a && (s.index[a] = u)), e;},c = function c(e, t) {var r,n = i(e),a = co(t);if ("F" !== a) return n.index[a];for (r = n.first; r; r = r.next) {if (r.key == t) return r;}};return Wr(a.prototype, { clear: function clear() {for (var e = i(this), t = e.index, r = e.first; r;) {r.removed = !0, r.previous && (r.previous = r.previous.next = void 0), delete t[r.index], r = r.next;}e.first = e.last = void 0, o ? e.size = 0 : this.size = 0;}, delete: function _delete(e) {var t = this,r = i(t),n = c(t, e);if (n) {var a = n.next,s = n.previous;delete r.index[n.index], n.removed = !0, s && (s.next = a), a && (a.previous = s), r.first == n && (r.first = a), r.last == n && (r.last = s), o ? r.size-- : t.size--;}return !!n;}, forEach: function forEach(e) {for (var t, r = i(this), n = N(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.next : r.first;) {for (n(t.value, t.key, this); t && t.removed;) {t = t.previous;}}}, has: function has(e) {return !!c(this, e);} }), Wr(a.prototype, r ? { get: function get(e) {var t = c(this, e);return t && t.value;}, set: function set(e, t) {return s(this, 0 === e ? 0 : e, t);} } : { add: function add(e) {return s(this, e = 0 === e ? 0 : e, e);} }), o && so(a.prototype, "size", { get: function get() {return i(this).size;} }), a;}, setStrong: function setStrong(e, t, r) {var n = t + " Iterator",a = lo(t),i = lo(n);qa(e, t, function (e, t) {uo(this, { type: n, target: e, state: a(e), kind: t, last: void 0 });}, function () {for (var e = i(this), t = e.kind, r = e.last; r && r.removed;) {r = r.previous;}return e.target && (e.last = r = r ? r.next : e.state.first) ? "keys" == t ? { value: r.key, done: !1 } : "values" == t ? { value: r.value, done: !1 } : { value: [r.key, r.value], done: !1 } : (e.target = void 0, { value: void 0, done: !0 });}, r ? "entries" : "values", !r, !0), Kr(t);} };!function (e, t, r) {var n,s = -1 !== e.indexOf("Map"),c = -1 !== e.indexOf("Weak"),u = s ? "set" : "add",l = a[e],p = l && l.prototype,m = {};if (o && "function" == typeof l && (c || p.forEach && !i(function () {new l().entries().next();}))) {n = t(function (t, r) {io(Gr(t, n, e), { type: e, collection: new l() }), null != r && Hr(r, t[u], { that: t, AS_ENTRIES: s });});var d = oo(e);ao(["add", "clear", "delete", "forEach", "get", "has", "set", "keys", "values", "entries"], function (e) {var t = "add" == e || "set" == e;!(e in p) || c && "clear" == e || D(n.prototype, e, function (r, n) {var a = d(this).collection;if (!t && c && !g(r)) return "get" == e && void 0;var i = a[e](0 === r ? 0 : r, n);return t ? this : i;});}), c || no(n.prototype, "size", { configurable: !0, get: function get() {return d(this).collection.size;} });} else n = r.getConstructor(t, e, s, u), ro.REQUIRED = !0;dt(n, e, !1, !0), m[e] = n, z({ global: !0, forced: !0 }, m), c || r.setStrong(n, e, s);}("Map", function (e) {return function () {return e(this, arguments.length ? arguments[0] : void 0);};}, po);var mo = R.Map;z({ target: "Map", stat: !0 }, { from: function from(e) {var t,r,n,a,i = arguments.length,o = i > 1 ? arguments[1] : void 0;return L(this), (t = void 0 !== o) && L(o), null == e ? new this() : (r = [], t ? (n = 0, a = N(o, i > 2 ? arguments[2] : void 0, 2), Hr(e, function (e) {r.push(a(e, n++));})) : Hr(e, r.push, { that: r }), new this(r));} });z({ target: "Map", stat: !0 }, { of: function of() {for (var e = arguments.length, t = new Array(e); e--;) {t[e] = arguments[e];}return new this(t);} });var fo = function fo() {for (var e, t = F(this), r = L(t.delete), n = !0, a = 0, i = arguments.length; a < i; a++) {e = r.call(t, arguments[a]), n = n && e;}return !!n;};z({ target: "Map", proto: !0, real: !0, forced: ue }, { deleteAll: function deleteAll() {return fo.apply(this, arguments);} });z({ target: "Map", proto: !0, real: !0, forced: ue }, { emplace: function emplace(e, t) {var r = F(this),n = r.has(e) && "update" in t ? t.update(r.get(e), e, r) : t.insert(e, r);return r.set(e, n), n;} });var yo = function yo(e) {var t = Ur(e);if ("function" != typeof t) throw TypeError(String(e) + " is not iterable");return F(t.call(e));},vo = yo;z({ target: "Map", proto: !0, real: !0, forced: ue }, { every: function every(e) {var t = F(this),r = vo(t),n = N(e, arguments.length > 1 ? arguments[1] : void 0, 3);return !Hr(r, function (e, r, a) {if (!n(r, e, t)) return a();}, { AS_ENTRIES: !0, IS_ITERATOR: !0, INTERRUPTED: !0 }).stopped;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { filter: function filter(e) {var t = F(this),r = vo(t),n = N(e, arguments.length > 1 ? arguments[1] : void 0, 3),a = new (an(t, W("Map")))(),i = L(a.set);return Hr(r, function (e, r) {n(r, e, t) && i.call(a, e, r);}, { AS_ENTRIES: !0, IS_ITERATOR: !0 }), a;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { find: function find(e) {var t = F(this),r = vo(t),n = N(e, arguments.length > 1 ? arguments[1] : void 0, 3);return Hr(r, function (e, r, a) {if (n(r, e, t)) return a(r);}, { AS_ENTRIES: !0, IS_ITERATOR: !0, INTERRUPTED: !0 }).result;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { findKey: function findKey(e) {var t = F(this),r = vo(t),n = N(e, arguments.length > 1 ? arguments[1] : void 0, 3);return Hr(r, function (e, r, a) {if (n(r, e, t)) return a(e);}, { AS_ENTRIES: !0, IS_ITERATOR: !0, INTERRUPTED: !0 }).result;} }), z({ target: "Map", stat: !0 }, { groupBy: function groupBy(e, t) {var r = new this();L(t);var n = L(r.has),a = L(r.get),i = L(r.set);return Hr(e, function (e) {var o = t(e);n.call(r, o) ? a.call(r, o).push(e) : i.call(r, o, [e]);}), r;} });z({ target: "Map", proto: !0, real: !0, forced: ue }, { includes: function includes(e) {return Hr(vo(F(this)), function (t, r, n) {if ((a = r) === (i = e) || a != a && i != i) return n();var a, i;}, { AS_ENTRIES: !0, IS_ITERATOR: !0, INTERRUPTED: !0 }).stopped;} }), z({ target: "Map", stat: !0 }, { keyBy: function keyBy(e, t) {var r = new this();L(t);var n = L(r.set);return Hr(e, function (e) {n.call(r, t(e), e);}), r;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { keyOf: function keyOf(e) {return Hr(vo(F(this)), function (t, r, n) {if (r === e) return n(t);}, { AS_ENTRIES: !0, IS_ITERATOR: !0, INTERRUPTED: !0 }).result;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { mapKeys: function mapKeys(e) {var t = F(this),r = vo(t),n = N(e, arguments.length > 1 ? arguments[1] : void 0, 3),a = new (an(t, W("Map")))(),i = L(a.set);return Hr(r, function (e, r) {i.call(a, n(r, e, t), r);}, { AS_ENTRIES: !0, IS_ITERATOR: !0 }), a;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { mapValues: function mapValues(e) {var t = F(this),r = vo(t),n = N(e, arguments.length > 1 ? arguments[1] : void 0, 3),a = new (an(t, W("Map")))(),i = L(a.set);return Hr(r, function (e, r) {i.call(a, e, n(r, e, t));}, { AS_ENTRIES: !0, IS_ITERATOR: !0 }), a;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { merge: function merge(e) {for (var t = F(this), r = L(t.set), n = 0; n < arguments.length;) {Hr(arguments[n++], r, { that: t, AS_ENTRIES: !0 });}return t;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { reduce: function reduce(e) {var t = F(this),r = vo(t),n = arguments.length < 2,a = n ? void 0 : arguments[1];if (L(e), Hr(r, function (r, i) {n ? (n = !1, a = i) : a = e(a, i, r, t);}, { AS_ENTRIES: !0, IS_ITERATOR: !0 }), n) throw TypeError("Reduce of empty map with no initial value");return a;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { some: function some(e) {var t = F(this),r = vo(t),n = N(e, arguments.length > 1 ? arguments[1] : void 0, 3);return Hr(r, function (e, r, a) {if (n(r, e, t)) return a();}, { AS_ENTRIES: !0, IS_ITERATOR: !0, INTERRUPTED: !0 }).stopped;} }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { update: function update(e, t) {var r = F(this),n = arguments.length;L(t);var a = r.has(e);if (!a && n < 3) throw TypeError("Updating absent value");var i = a ? r.get(e) : L(n > 2 ? arguments[2] : void 0)(e, r);return r.set(e, t(i, e, r)), r;} });var go = function go(e, t) {var r,n = F(this),a = arguments.length > 2 ? arguments[2] : void 0;if ("function" != typeof t && "function" != typeof a) throw TypeError("At least one callback required");return n.has(e) ? (r = n.get(e), "function" == typeof t && (r = t(r), n.set(e, r))) : "function" == typeof a && (r = a(), n.set(e, r)), r;};z({ target: "Map", proto: !0, real: !0, forced: ue }, { upsert: go }), z({ target: "Map", proto: !0, real: !0, forced: ue }, { updateOrInsert: go });var ho = mo;z({ target: "Function", proto: !0 }, { bind: Ie });var bo = fr("Function").bind,To = Function.prototype,Mo = function Mo(e) {var t = e.bind;return e === To || e instanceof Function && t === To.bind ? bo : t;},So = [].slice,ko = /MSIE .\./.test(Le),wo = function wo(e) {return function (t, r) {var n = arguments.length > 2,a = n ? So.call(arguments, 2) : void 0;return e(n ? function () {("function" == typeof t ? t : Function(t)).apply(this, a);} : t, r);};};z({ global: !0, bind: !0, forced: ko }, { setTimeout: wo(a.setTimeout), setInterval: wo(a.setInterval) });var xo = R.setTimeout,Io = W("JSON", "stringify"),Eo = /[\uD800-\uDFFF]/g,Ao = /^[\uD800-\uDBFF]$/,_o = /^[\uDC00-\uDFFF]$/,Co = function Co(e, t, r) {var n = r.charAt(t - 1),a = r.charAt(t + 1);return Ao.test(e) && !_o.test(a) || _o.test(e) && !Ao.test(n) ? "\\u" + e.charCodeAt(0).toString(16) : e;},Po = i(function () {return "\"\\udf06\\ud834\"" !== Io("\uDF06\uD834") || "\"\\udead\"" !== Io("\uDEAD");});Io && z({ target: "JSON", stat: !0, forced: Po }, { stringify: function stringify(e, t, r) {var n = Io.apply(null, arguments);return "string" == typeof n ? n.replace(Eo, Co) : n;} }), R.JSON || (R.JSON = { stringify: JSON.stringify });var jo = function jo(e, t, r) {return R.JSON.stringify.apply(null, arguments);},Oo = jo,Ro = t(function (e) {var t = Object.prototype.hasOwnProperty,r = "~";function n() {}function a(e, t, r) {this.fn = e, this.context = t, this.once = r || !1;}function i(e, t, n, i, o) {if ("function" != typeof n) throw new TypeError("The listener must be a function");var s = new a(n, i || e, o),c = r ? r + t : t;return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;}function o(e, t) {0 == --e._eventsCount ? e._events = new n() : delete e._events[t];}function s() {this._events = new n(), this._eventsCount = 0;}Object.create && (n.prototype = Object.create(null), new n().__proto__ || (r = !1)), s.prototype.eventNames = function () {var e,n,a = [];if (0 === this._eventsCount) return a;for (n in e = this._events) {t.call(e, n) && a.push(r ? n.slice(1) : n);}return Object.getOwnPropertySymbols ? a.concat(Object.getOwnPropertySymbols(e)) : a;}, s.prototype.listeners = function (e) {var t = r ? r + e : e,n = this._events[t];if (!n) return [];if (n.fn) return [n.fn];for (var a = 0, i = n.length, o = new Array(i); a < i; a++) {o[a] = n[a].fn;}return o;}, s.prototype.listenerCount = function (e) {var t = r ? r + e : e,n = this._events[t];return n ? n.fn ? 1 : n.length : 0;}, s.prototype.emit = function (e, t, n, a, i, o) {var s = r ? r + e : e;if (!this._events[s]) return !1;var c,u,l = this._events[s],p = arguments.length;if (l.fn) {switch (l.once && this.removeListener(e, l.fn, void 0, !0), p) {case 1:return l.fn.call(l.context), !0;case 2:return l.fn.call(l.context, t), !0;case 3:return l.fn.call(l.context, t, n), !0;case 4:return l.fn.call(l.context, t, n, a), !0;case 5:return l.fn.call(l.context, t, n, a, i), !0;case 6:return l.fn.call(l.context, t, n, a, i, o), !0;}for (u = 1, c = new Array(p - 1); u < p; u++) {c[u - 1] = arguments[u];}l.fn.apply(l.context, c);} else {var m,d = l.length;for (u = 0; u < d; u++) {switch (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), p) {case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context, t);break;case 3:l[u].fn.call(l[u].context, t, n);break;case 4:l[u].fn.call(l[u].context, t, n, a);break;default:if (!c) for (m = 1, c = new Array(p - 1); m < p; m++) {c[m - 1] = arguments[m];}l[u].fn.apply(l[u].context, c);}}}return !0;}, s.prototype.on = function (e, t, r) {return i(this, e, t, r, !1);}, s.prototype.once = function (e, t, r) {return i(this, e, t, r, !0);}, s.prototype.removeListener = function (e, t, n, a) {var i = r ? r + e : e;if (!this._events[i]) return this;if (!t) return o(this, i), this;var s = this._events[i];if (s.fn) s.fn !== t || a && !s.once || n && s.context !== n || o(this, i);else {for (var c = 0, u = [], l = s.length; c < l; c++) {(s[c].fn !== t || a && !s[c].once || n && s[c].context !== n) && u.push(s[c]);}u.length ? this._events[i] = 1 === u.length ? u[0] : u : o(this, i);}return this;}, s.prototype.removeAllListeners = function (e) {var t;return e ? (t = r ? r + e : e, this._events[t] && o(this, t)) : (this._events = new n(), this._eventsCount = 0), this;}, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = r, s.EventEmitter = s, e.exports = s;}),Lo = No;function No(e) {e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;}No.prototype.duration = function () {var e = this.ms * Math.pow(this.factor, this.attempts++);if (this.jitter) {var t = Math.random(),r = Math.floor(t * this.jitter * e);e = 0 == (1 & Math.floor(10 * t)) ? e - r : e + r;}return 0 | Math.min(e, this.max);}, No.prototype.reset = function () {this.attempts = 0;}, No.prototype.setMin = function (e) {this.ms = e;}, No.prototype.setMax = function (e) {this.max = e;}, No.prototype.setJitter = function (e) {this.jitter = e;};var Fo = "object" == typeof e && e && e.Object === Object && e,qo = "object" == typeof self && self && self.Object === Object && self,Uo = Fo || qo || Function("return this")(),Do = Uo.Symbol,Bo = Object.prototype,Ho = Bo.hasOwnProperty,zo = Bo.toString,Vo = Do ? Do.toStringTag : void 0;var Wo = function Wo(e) {var t = Ho.call(e, Vo),r = e[Vo];try {e[Vo] = void 0;var n = !0;} catch (e) {}var a = zo.call(e);return n && (t ? e[Vo] = r : delete e[Vo]), a;},$o = Object.prototype.toString;var Ko = function Ko(e) {return $o.call(e);},Go = Do ? Do.toStringTag : void 0;var Jo = function Jo(e) {return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : Go && Go in Object(e) ? Wo(e) : Ko(e);};var Yo = function Yo(e) {var t = typeof e;return null != e && ("object" == t || "function" == t);};var Qo,Xo = function Xo(e) {if (!Yo(e)) return !1;var t = Jo(e);return "[object Function]" == t || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t;},Zo = (Qo = function Qo() {return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);}, function () {return Qo() + Qo() + Qo() + Qo() + Qo() + Qo() + Qo() + Qo();});function es(e) {var t;return gr(t = Fi(e)).call(t, function (e) {return !(+e >= 0);});}function ts(e, t) {var r,n = gr(r = Fi(e)).call(r, function (r) {return e[r] == t;});return n.length > 0 ? n[0] : void 0;}var rs = { lbsUrl: "https://lbs.netease.im/lbs/webconf.jsp", defaultLink: "", timeout: 8e3, deviceId: Zo(), chunkUploadHost: "https://wanproxy-web.127.net", commonUploadHost: "https://nos.netease.com", chunkMaxSize: 4194304e4, commonMaxSize: 104857600, uploadReplaceFormat: "https://{host}/{object}", downloadHostWhiteList: ["nos.netease.com"], downloadReplaceFormat: "https://{host}/{object}", cdn: { defaultCdnDomain: "nim.nosdn.127.net", cdnDomain: "", bucket: "", objectNamePrefix: "" } },ns = { 200: null, 406: null, 808: null, 810: null, 201: "客户端版本不对, 需升级sdk", 302: "用户名或密码错误, 请检查appKey和token是否有效, account和token是否匹配", 403: "非法操作或没有权限", 404: "对象(用户/群/聊天室)不存在", 405: "参数长度过长", 408: "客户端请求超时", 414: "参数错误", 415: "服务不可用/没有聊天室服务器可分配", 416: "频率控制", 417: "重复操作", 422: "帐号被禁用", 500: "服务器内部错误", 503: "服务器繁忙", 508: "删除有效期过了", 509: "已失效", 7101: "被拉黑", 700: "批量操作部分失败", 801: "群人数达到上限", 802: "没有权限", 803: "群不存在或未发生变化", 804: "用户不在群里面", 805: "群类型不匹配", 806: "创建群数量达到限制", 807: "群成员状态不对", 809: "已经在群里", 811: "强推列表中帐号数量超限", 812: "群被禁言", 813: "因群数量限制，部分拉人成功", 814: "禁止使用群组消息已读服务", 815: "群管理员人数上限", 816: "批量操作部分失败", 997: "协议已失效", 998: "解包错误", 999: "打包错误", 9102: "通道失效", 9103: "已经在其他端接听/拒绝过这通电话", 13002: "聊天室状态异常", 13003: "在黑名单中", 13004: "在禁言名单中", 13006: "聊天室处于整体禁言状态,只有管理员能发言", Connect_Failed: "无法建立连接, 请确保能 ping/telnet 到云信服务器; 如果是IE8/9, 请确保项目部署在 HTTPS 环境下", Error_Internet_Disconnected: "网断了", No_connected: "连接未建立", Socket_error: "socket状态不对", Timeout: "超时", Param_Error: "参数错误", Not_Support: "不支持", Error_Unknown: "未知错误", Operation_Canceled: "操作取消", Destroy: "instance destroy" };function as(e, t) {var r = ns[e];if (null === r) return null;var n = { code: e, message: r || "操作失败", timetag: +new Date() };return t && (n.event = t), n;}var is = te.includes;z({ target: "Array", proto: !0 }, { includes: function includes(e) {return is(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var os = fr("Array").includes,ss = tt("match"),cs = function cs(e) {if (function (e) {var t;return g(e) && (void 0 !== (t = e[ss]) ? !!t : "RegExp" == m(e));}(e)) throw TypeError("The method doesn't accept regular expressions");return e;},us = tt("match");z({ target: "String", proto: !0, forced: !function (e) {var t = /./;try {"/./"[e](t);} catch (r) {try {return t[us] = !1, "/./"[e](t);} catch (e) {}}return !1;}("includes") }, { includes: function includes(e) {return !!~String(y(this)).indexOf(cs(e), arguments.length > 1 ? arguments[1] : void 0);} });var ls = fr("String").includes,ps = Array.prototype,ms = String.prototype,ds = function ds(e) {var t = e.includes;return e === ps || e instanceof Array && t === ps.includes ? os : "string" == typeof e || e === ms || e instanceof String && t === ms.includes ? ls : t;},fs = jt.findIndex,ys = "findIndex",vs = !0;ys in [] && Array(1).findIndex(function () {vs = !1;}), z({ target: "Array", proto: !0, forced: vs }, { findIndex: function findIndex(e) {return fs(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var gs = fr("Array").findIndex,hs = Array.prototype,bs = function bs(e) {var t = e.findIndex;return e === hs || e instanceof Array && t === hs.findIndex ? gs : t;},Ts = jt.map,Ms = pr("map");z({ target: "Array", proto: !0, forced: !Ms }, { map: function map(e) {return Ts(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var Ss = fr("Array").map,ks = Array.prototype,ws = function ws(e) {var t = e.map;return e === ks || e instanceof Array && t === ks.map ? Ss : t;},xs = ["error", "warn", "log", "debug"],Is = function Is() {},Es = function () {function e(t, r) {var n;ei(this, e), xi(this, "strategies", { debug: console.log, log: console.log, warn: console.warn, error: console.error }), xi(this, "debug", Is), xi(this, "log", Is), xi(this, "warn", Is), xi(this, "error", Is), this.name = r, e.instancesName.push(r), ds(n = ["off", "error", "warn", "log", "debug"]).call(n, t) || (t = "off"), this.setLogFunc(t);}return ri(e, [{ key: "setLogFunc", value: function value(e) {var t = this,r = bs(xs).call(xs, function (t) {return t === e;});Li(xs).call(xs, function (e, n) {n <= r && (t[e] = function () {var t = eo(Array.prototype).call(arguments),r = this.formatArgs(t, e);this.strategies[e](r);});});} }, { key: "formatArgs", value: function value(e, t) {var r,n,a,i,o,s,c,u = new Date(),l = Ki(r = Ki(n = Ki(a = Ki(i = Ki(o = "".concat(u.getMonth() + 1, "-")).call(o, u.getDate(), " ")).call(i, u.getHours(), ":")).call(a, u.getMinutes(), ":")).call(n, u.getSeconds(), ":")).call(r, u.getMilliseconds());return Ki(s = Ki(c = "[NIM ".concat(t, " ")).call(c, this.name, " ")).call(s, l, "] ") + ws(e).call(e, function (e) {return "object" === ki(e) ? Oo(e) : e;}).join(" ");} }]), e;}();xi(Es, "instancesName", []);var As = Object.assign,_s = Object.defineProperty,Cs = !As || i(function () {if (o && 1 !== As({ b: 1 }, As(_s({}, "a", { enumerable: !0, get: function get() {_s(this, "b", { value: 3, enumerable: !1 });} }), { b: 2 })).b) return !0;var e = {},t = {},r = Symbol(),n = "abcdefghijklmnopqrst";return e[r] = 7, n.split("").forEach(function (e) {t[e] = e;}), 7 != As({}, e)[r] || oe(As({}, t)).join("") != n;}) ? function (e, t) {for (var r = ze(e), n = arguments.length, a = 1, i = Ye.f, s = u.f; n > a;) {for (var c, l = f(arguments[a++]), p = i ? oe(l).concat(i(l)) : oe(l), m = p.length, d = 0; m > d;) {c = p[d++], o && !s.call(l, c) || (r[c] = l[c]);}}return r;} : As;z({ target: "Object", stat: !0, forced: Object.assign !== Cs }, { assign: Cs });var Ps = R.Object.assign,js = function e() {ei(this, e);};xi(js, "platform", void 0), xi(js, "WebSocket", void 0), xi(js, "localStorage", void 0), xi(js, "request", void 0), xi(js, "uploadFile", void 0), xi(js, "getSystemInfo", void 0);var Os = function Os(e) {return void 0 === e;},Rs = {},Ls = {},Ns = {},Fs = {};function qs(e, t) {var r,n = JSON.parse(e),a = as(n.code),i = n.sid + "_" + n.cid,o = n.r;if (ds(r = ["4_1", "4_2", "4_10", "4_11"]).call(r, i)) {var s,c = n.r[1].headerPacket;i = Ki(s = "".concat(c.sid, "_")).call(s, c.cid), o = n.r[1].body;}var u,l = Ls[i],p = Rs[l],m = { cmd: l, raw: n, error: a, service: null == p ? void 0 : p.service, content: {} };if (!l || !p) return m.notFound = !0, m;if ("sync" === p.ext && (m.raw.ser = "sync"), m.error) {var d;if (m.error.cmd = l, m.error.callFunc = "parseCmd", null == p || null === (d = p.ignoreErrCodes) || void 0 === d || !ds(d).call(d, n.code)) return m;t.warn("parseCmd:: ignore error ", m.error), m.error.ignore = !0;}p.response && Li(u = p.response).call(u, function (e, t) {var r = o[t],n = e.type,a = e.name,i = e.entity || a;if (!Os(r)) switch (n) {case "Property":m.content[a] = Ds(r, i);break;case "PropertyArray":m.content[a] = ws(r).call(r, function (e) {return Ds(e, i);});break;case "long":case "Long":case "byte":case "Byte":case "Number":m.content[a] = +r;break;default:m.content[a] = r;}});return m;}function Us(e, t) {var r = Ns[t],n = {};for (var a in e) {void 0 !== r[a] && (n[r[a]] = e[a]);}return n;}function Ds(e, t) {var r = Fs[t],n = {};for (var a in e) {void 0 !== r[a] && (n[r[a]] = e[a]);}return n;}z({ target: "Array", stat: !0 }, { isArray: He });var Bs = R.Array.isArray;var Hs = tt("iterator"),zs = function zs(e) {var t = Object(e);return void 0 !== t[Hs] || "@@iterator" in t || Rr.hasOwnProperty(ut(t));},Vs = yo;var Ws = function Ws(e, t, r, n) {try {return n ? t(F(r)[0], r[1]) : t(r);} catch (t) {throw Dr(e), t;}},$s = !rn(function (e) {Array.from(e);});z({ target: "Array", stat: !0, forced: $s }, { from: function from(e) {var t,r,n,a,i,o,s = ze(e),c = "function" == typeof this ? this : Array,u = arguments.length,l = u > 1 ? arguments[1] : void 0,p = void 0 !== l,m = Ur(s),d = 0;if (p && (l = N(l, u > 2 ? arguments[2] : void 0, 2)), null == m || c == Array && Fr(m)) for (r = new c(t = Y(s.length)); t > d; d++) {o = p ? l(s[d], d) : s[d], kr(r, d, o);} else for (i = (a = m.call(s)).next, r = new c(); !(n = i.call(a)).done; d++) {o = p ? Ws(a, l, [n.value, d], !0) : n.value, kr(r, d, o);}return r.length = d, r;} });var Ks = R.Array.from;function Gs(e, t) {(null == t || t > e.length) && (t = e.length);for (var r = 0, n = new Array(t); r < t; r++) {n[r] = e[r];}return n;}function Js(e, t) {return function (e) {if (Bs(e)) return e;}(e) || function (e, t) {if (void 0 !== Mi && zs(Object(e))) {var r = [],n = !0,a = !1,i = void 0;try {for (var o, s = Vs(e); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0) {;}} catch (e) {a = !0, i = e;} finally {try {n || null == s.return || s.return();} finally {if (a) throw i;}}return r;}}(e, t) || function (e, t) {var r;if (e) {if ("string" == typeof e) return Gs(e, t);var n = eo(r = Object.prototype.toString.call(e)).call(r, 8, -1);return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Ks(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Gs(e, t) : void 0;}}(e, t) || function () {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}z({ target: "Date", stat: !0 }, { now: function now() {return new Date().getTime();} });var Ys = R.Date.now;function Qs(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var Xs = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],Zs = ["transport not supported", "client not handshaken", "unauthorized"],ec = ["reconnect"],tc = function (e) {di(r, e);var t = Qs(r);function r(e, n) {var a;return ei(this, r), xi(ni(a = t.call(this)), "status", void 0), xi(ni(a), "websocket", null), xi(ni(a), "sessionId", void 0), xi(ni(a), "closeTimeout", void 0), xi(ni(a), "closeTimer", void 0), a.url = e, a.status = "disconnected", a.logger = n, a.connect(), a;}return ri(r, [{ key: "connect", value: function value() {var e = this;"connecting" !== this.status && "connected" !== this.status ? (this.status = "connecting", js.request("https://" + this.url + "/socket.io/1/?t=" + Ys()).then(function (t) {var r = Js(t.data.split(":"), 2),n = r[0],a = r[1];return e.sessionId = n, e.closeTimeout = 1e3 * a, e._createWebsocket("wss://" + e.url + "/socket.io/1/websocket/" + n);}).catch(function (t) {e.logger.error("imsocket::handshake fail", t), e.status = "disconnected", e.emit("disconnect");})) : this.logger.warn("imsocket::socket is connecting or connected", this.status);} }, { key: "close", value: function value() {if (this.websocket) {this.status = "disconnected", this.websocket.onmessage = null, this.websocket.onopen = null, this.websocket.onerror = null;try {var e;null === (e = this.websocket) || void 0 === e || e.send(this.encodePacket({ type: "disconnect" })), this.websocket.close();} catch (e) {this.logger.warn("attempt to close websocket error", e);}this.websocket.onclose = null, this.websocket = null, this.emit("disconnect");}} }, { key: "onConnect", value: function value() {this.status = "connected", this.resetCloseTimer(), this.emit("connect");} }, { key: "_createWebsocket", value: function value(e) {var t,r = this;this.websocket = new js.WebSocket(e), this.websocket.onmessage = Mo(t = this.onMessage).call(t, this), this.websocket.onclose = function () {r.logger.log("imsocket:: websocket onclose done"), "disconnected" !== r.status && (r.logger.log("imsocket:: close()", r.status), r.close());}, this.websocket.onerror = function (e) {r.logger.error("imsocket:: onerror", e);};} }, { key: "onMessage", value: function value(e) {var t;this.resetCloseTimer();var r = this.decodePacket(e.data);if (r) switch (r.type) {case "connect":this.onConnect();break;case "disconnect":this.close();break;case "message":case "json":this.emit("message", r.data);break;case "event":r.name && this.emit(r.name, r.args);break;case "error":"unauthorized" === r.reason ? this.emit("connect_failed", r.reason) : this.emit("error", r.reason);break;case "heartbeat":null === (t = this.websocket) || void 0 === t || t.send(this.encodePacket({ type: "heartbeat" }));break;default:this.logger.warn("imsocket::no handler type", r.type);}} }, { key: "encodePacket", value: function value(e) {var t,r,n = e.type,a = e.id,i = void 0 === a ? "" : a,o = e.endpoint,s = void 0 === o ? "" : o,c = e.ack,u = null;if (!n) return "";switch (n) {case "error":t = e.reason ? Vi(Zs).call(Zs, e.reason) : "", r = e.advice ? Vi(ec).call(ec, e.advice) : "", "" === t && "" === r || (u = t + ("" !== r ? "+" + r : ""));break;case "message":"" !== e.data && (u = e.data);break;case "event":t = { name: e.name }, t = e.args && e.args.length ? { name: e.name, args: e.args } : { name: e.name }, u = Oo(t);break;case "json":u = Oo(e.data);break;case "connect":e.qs && (u = e.qs);break;case "ack":u = e.ackId + (e.args && e.args.length ? "+" + Oo(e.args) : "");}var l = [Vi(Xs).call(Xs, n), i + ("data" === c ? "+" : ""), s];return null != u && l.push(u), l.join(":");} }, { key: "decodePacket", value: function value(e) {if (e) if ("�" != e.charAt(0)) {var t = e.match(/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/);if (t) {var r,n = Js(t, 6),a = n[1],i = n[2],o = n[3],s = n[4],c = n[5],u = { type: Xs[+a], endpoint: s };switch (i && (u.id = i, u.ack = !o || "data"), u.type) {case "error":r = c.split("+"), u.reason = Zs[+r[0]] || "";break;case "message":u.data = c || "";break;case "connect":u.qs = c || "";break;case "event":try {var l = JSON.parse(c);u.name = l.name, u.args = l.args;} catch (e) {this.logger.error("imsocket::parseData::type::event error", e);}u.args = u.args || [];break;case "json":try {u.data = JSON.parse(c);} catch (e) {this.logger.error("imsocket::parseData::type::json error", e);}break;case "ack":if ((r = c.match(/^([0-9]+)(\+)?(.*)/)) && (u.ackId = r[1], u.args = [], r[3])) try {u.args = r[3] ? JSON.parse(r[3]) : [];} catch (e) {this.logger.error("imsocket::parseData::type::ack error", e);}}return u;}} else this.logger.error("imsocket::unrecognize dataStr", eo(e).call(e, 0, 20));} }, { key: "send", value: function value(e) {var t,r = { data: e, type: "message", endpoint: "" };null === (t = this.websocket) || void 0 === t || t.send(this.encodePacket(r));} }, { key: "resetCloseTimer", value: function value() {var e = this;this.closeTimeout && (clearTimeout(this.closeTimer), this.closeTimer = xo(function () {e.close();}, this.closeTimeout));} }]), r;}(Ro),rc = fr("Array").values,nc = Array.prototype,ac = { DOMTokenList: !0, NodeList: !0 },ic = function ic(e) {var t = e.values;return e === nc || e instanceof Array && t === nc.values || ac.hasOwnProperty(ut(e)) ? rc : t;},oc = jt.every,sc = _i("every");z({ target: "Array", proto: !0, forced: !sc }, { every: function every(e) {return oc(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var cc = fr("Array").every,uc = Array.prototype,lc = function lc(e) {var t = e.every;return e === uc || e instanceof Array && t === uc.every ? cc : t;};var pc = function pc(e) {return null != e && "object" == typeof e;};var mc = function mc(e) {return pc(e) && "[object RegExp]" == Jo(e);};var dc = function dc(e) {return function (t) {return e(t);};},fc = t(function (e, t) {var r = t && !t.nodeType && t,n = r && e && !e.nodeType && e,a = n && n.exports === r && Fo.process,i = function () {try {var e = n && n.require && n.require("util").types;return e || a && a.binding && a.binding("util");} catch (e) {}}();e.exports = i;}),yc = fc && fc.isRegExp,vc = yc ? dc(yc) : mc;function gc(e, t) {return t instanceof RegExp ? "__REGEXP " + t.toString() : t;}function hc(e, t, r) {var n,a = {};return Li(n = Fi(e)).call(n, function (n) {var i = e[n].type,o = r ? "In ".concat(r, ", ") : "";if (void 0 === t[n]) {if (!1 === e[n].required) return void (a[n] = t[n]);var s;throw new TypeError(Ki(s = "".concat(o, 'param "')).call(s, n, '" is required'));}var c,u,l = bc[i];if (l && !l(t, n, e[n])) throw new TypeError(Ki(c = Ki(u = "".concat(o, 'param "')).call(u, n, '" expects ')).call(c, Oo(e[n], gc)));a[n] = t[n];}), a;}var bc = { string: function string(e, t, r) {var n = r.allowEmpty,a = r.max,i = r.min,o = r.regExp,s = e[t];return "string" == typeof s && (!1 !== n || "" !== s) && !("number" == typeof a && s.length > a) && !("number" == typeof i && s.length < i) && !(vc(o) && !o.test(s));}, number: function number(e, t, r) {var n = r.min,a = r.max,i = e[t];return "number" == typeof i && !("number" == typeof n && i < n) && !("number" == typeof a && i > a);}, boolean: function boolean(e, t) {return "boolean" == typeof e[t];}, enum: function _enum(e, t, r) {var n = ic(r),a = e[t];return !n || Vi(n).call(n, a) > -1;}, array: function array(e, t, r) {var n = r.itemType,a = r.rules,i = r.min,o = r.max,s = e[t];return !!Bs(s) && !("number" == typeof o && s.length > o) && !("number" == typeof i && s.length < i) && !(n && !lc(s).call(s, function (e) {return ki(e) === n;})) && (a && Li(s).call(s, function (e, r) {var n;return hc(a, e, Ki(n = "".concat(t, "[")).call(n, r, "]"));}), !0);}, object: function object(e, t, r) {var n = r.rules,a = e[t];return n && hc(n, a, t), !0;} };function Tc(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Mc(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Tc(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Tc(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Sc(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var kc = { debugLevel: "off", needReconnect: !0, reconnectionAttempts: Ai },wc = window && window.navigator && window.navigator.onLine,xc = window && Xo(window.addEventListener) && Xo(window.removeEventListener),Ic = wc ? function () {return window.navigator.onLine;} : function () {return !1;},Ec = function (e) {di(n, e);var t,r = Sc(n);function n(e) {var t;return ei(this, n), xi(ni(t = r.call(this)), "status", "unconnected"), xi(ni(t), "linkUrls", []), xi(ni(t), "socket", void 0), xi(ni(t), "packetSer", 1), xi(ni(t), "retryCount", 0), xi(ni(t), "reconnectTimer", 0), xi(ni(t), "backoff", new Lo({ max: 8e3, min: 1600, jitter: .01 })), xi(ni(t), "sendingCmdMap", new ho()), xi(ni(t), "pingTimer", 0), xi(ni(t), "onlineListener", void 0), xi(ni(t), "offlineListener", void 0), xi(ni(t), "logger", void 0), xi(ni(t), "options", void 0), hc({ linkUrls: { type: "array", itemType: "string", required: !1 } }, e), t.options = Mc(Mc({}, kc), e), t.logger = new Es(t.options.debugLevel, t.options.account), t;}return ri(n, [{ key: "connect", value: (t = Za(Ei.mark(function e() {var t,r,n,a,i = arguments;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (hc({ linkUrls: { type: "array", itemType: "string", required: !1 } }, t = i.length > 0 && void 0 !== i[0] ? i[0] : {}), /^(unconnected|waitReconnect)$/.test(this.status)) {e.next = 6;break;}return r = "Core socket status is ".concat(this.status, ", and would not repeat connect"), this.logger.warn(r), e.abrupt("return", Qa.reject(r));case 6:return this.status = "connecting", t.linkUrls && t.linkUrls.length > 0 && (this.linkUrls = Ki(n = t.linkUrls).call(n, this.linkUrls)), (a = this.linkUrls.pop()) || (a = rs.defaultLink), e.next = 12, this.doConnect(a);case 12:this.status = "connected";case 13:case "end":return e.stop();}}}, e, this);})), function () {return t.apply(this, arguments);}) }, { key: "doConnect", value: function value(e) {var t = this;return new Qa(function (r) {var n;t.socket = new tc(e, t.logger), t.socket.on("connect", function () {t.logger.log("socket on connect"), r();}), t.socket.on("message", Mo(n = t.onMessage).call(n, t)), t.socket.on("disconnect", function (e) {t.logger.log("core:: socket on disconnect", e), t.onDisconnect("socket on disconnect");});});} }, { key: "resetConnectStatus", value: function value() {clearTimeout(this.reconnectTimer), this.backoff.reset(), this.retryCount = 0, this.initOnlineListener();} }, { key: "onDisconnect", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];if ("unconnected" !== this.status) {if (this.markAllCmdInvaild(), clearTimeout(this.pingTimer), !r || !this.willReconnect()) return this.logger.log("onDisconnect start to emit disconnect;" + t), this.status = "unconnected", this.socket && "function" == typeof this.socket.close && this.socket.close(), this.socket = void 0, clearTimeout(this.reconnectTimer), this.logger.log("onDisconnect emit disconnect"), void (n && this.emit("disconnect"));var a;if (this.logger.log("onDisconnect start to reconnect; " + t), "waitReconnect" !== this.status) {var i = this.backoff.duration();this.retryCount++, this.logger.log(Ki(a = "willReconnect ".concat(this.retryCount, " ")).call(a, i)), this.emit("willReconnect", { retryCount: this.retryCount, duration: i }), this.status = "waitReconnect", clearTimeout(this.reconnectTimer), this.reconnectTimer = xo(function () {"waitReconnect" === e.status ? (clearTimeout(e.reconnectTimer), e.clearOldSocket(), e.connect({ isAutoReconnect: !0 })) : e.logger.warn("reconnect: status now is ".concat(e.status, ", would not go on reconnecting"));}, i);} else this.logger.warn("onDisconnect already is waiting reconnect");} else this.logger.warn("onDisconnect already is unconnected, " + t);} }, { key: "willReconnect", value: function value() {return this.options.needReconnect && this.retryCount < this.options.reconnectionAttempts;} }, { key: "clearOldSocket", value: function value() {if (this.socket) {var e = this.socket;this.socket = void 0, "function" == typeof e.removeAllListeners && e.removeAllListeners(), "function" == typeof e.close && e.close();}} }, { key: "sendCmd", value: function value(e, t) {var r,n = this;if ("logined" !== this.status && "login" !== e && "chatroomLogin" !== e) return this.logger.warn(Ki(r = "nim status is ".concat(this.status, ", so can not sendCmd ")).call(r, e)), Qa.reject({ cmd: e, error: as("No_connected") });var a = "heartbeat" !== e,i = a ? this.packetSer++ : 0,o = function (e, t, r, n) {var a = Rs[e];if (!a) return r.error("createCmd:: can not find cmd config: ", e), null;var i,o = { SER: t, SID: a.sid, CID: a.cid, Q: [] };return a.params && n && Li(i = a.params).call(i, function (e) {var t = n[e.name];if (!Os(t)) {var r = e.type;switch (e.type) {case "PropertyArray":r = "ArrayMable", t = ws(t).call(t, function (t) {return { t: "Property", v: Us(t, e.entity) };});break;case "Property":t = Us(t, e.name);break;case "bool":t = t ? "true" : "false";}o.Q.push({ t: r, v: t });}}), o;}(e, i, this.logger, t);if (!o) {var s,c = Ki(s = "SendCmd ".concat(i, " ")).call(s, e, " error");return this.logger.error(c), Qa.reject(c);}var u = Oo(o);return a && ("debug" === this.options.debugLevel ? this.logger.debug("core::sendCmd", e, u) : this.logger.log("core::sendCmd", e)), new Qa(function (r, a) {n.sendingCmdMap.set(i, { cmd: e, params: t, callback: [r, a], timer: "sync" === e ? null : xo(function () {n.markCmdInvalid(i, as("Timeout", { callFunc: "sendCmd", message: "ser ".concat(i, " timeout") }), e);}, rs.timeout) });try {var o;null === (o = n.socket) || void 0 === o || o.send(u);} catch (t) {n.markCmdInvalid(i, as("Socket_error", { callFunc: "sendCmd", message: "send json error", error: t }), e), n.onDisconnect("sendCmd error");}});} }, { key: "onMessage", value: function value(e) {var t = qs(e, this.logger);if (t) {var r = t.raw.ser;if (!t.notFound) return t.raw && "heartbeat" !== t.cmd && ("debug" === this.options.debugLevel ? this.logger.debug("imsocket::recvCmd", r, t.cmd, t.content) : this.logger.log("imsocket::recvCmd", r, t.cmd)), this.sendingCmdMap.get(r);this.logger.warn("core::onMessage packet not found", r, t.raw.sid + "_" + t.raw.cid);}} }, { key: "markCmdInvalid", value: function value(e, t, r) {var n = this.sendingCmdMap.get(e);if (n) {var a = n.callback,i = n.timer;i && clearTimeout(i), this.sendingCmdMap.delete(e), "batchMarkRead" !== r && (this.logger.warn("packet ".concat(e, " is invalid:"), t), a[1](t));}} }, { key: "markAllCmdInvaild", value: function value(e) {var t;this.logger.log("markAllCmdInvaild"), Li(t = this.sendingCmdMap).call(t, function (t) {var r = t.callback,n = t.timer;n && clearTimeout(n), r[1](e);}), this.sendingCmdMap.clear();} }, { key: "ping", value: function value() {var e = this;function t() {var e = this;clearTimeout(this.pingTimer), this.pingTimer = xo(function () {e.ping();}, 3e4);}clearTimeout(this.pingTimer), this.sendCmd("heartbeat").then(function () {t.call(e);}).catch(function () {Ic() ? e.onDisconnect("ping error") : t.call(e);});} }, { key: "initOnlineListener", value: function value() {var e, t;this.onlineListener || (xc ? (this.onlineListener = Mo(e = function e() {"logined" === this.status && this.ping();}).call(e, this), this.offlineListener = Mo(t = function t() {this.logger.log("offline"), this.onDisconnect("offlineListener", !0);}).call(t, this), window.addEventListener("online", this.onlineListener), window.addEventListener("offline", this.offlineListener)) : this.logger.warn("initOnlineListener not support add listener"));} }, { key: "disconnect", value: function value() {switch (this.status) {case "connected":case "logined":case "connecting":case "waitReconnect":return this.onDisconnect("disconnect", !1), Qa.resolve();case "unconnected":case "destroyed":return Qa.resolve();}} }, { key: "destroy", value: function value() {var e = this;return this.disconnect().then(function () {e.removeAllListeners(), e.status = "destroyed", e.connect = function () {return Qa.resolve();}, e.disconnect = function () {return Qa.resolve();}, e.destroy = function () {return Qa.resolve();}, e.onlineListener && window.removeEventListener("online", e.onlineListener), e.offlineListener && window.removeEventListener("offline", e.offlineListener);});} }]), n;}(Ro);function Ac(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function _c(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Ac(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Ac(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Cc(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}xi(Ec, "setAdapters", function (e) {Ps(js, e);});var Pc = { debugLevel: "off", needReconnect: !0, reconnectionAttempts: Ai, lbsUrls: [rs.lbsUrl], linkUrl: rs.defaultLink },jc = function (e) {di(i, e);var t,r,n,a = Cc(i);function i(e, t) {var r, n;ei(this, i), xi(ni(n = a.call(this, e)), "account", void 0), xi(ni(n), "options", void 0), xi(ni(n), "auth", {}), xi(ni(n), "sync", {}), xi(ni(n), "msg", {}), xi(ni(n), "msgLog", {}), xi(ni(n), "session", {}), xi(ni(n), "misc", {}), xi(ni(n), "user", {}), xi(ni(n), "friend", {}), xi(ni(n), "systemMessage", {}), xi(ni(n), "team", {}), xi(ni(n), "event", {}), xi(ni(n), "msgExtend", {}), xi(ni(n), "cloudStorage", {}), xi(ni(n), "passThrough", {}), xi(ni(n), "superTeam", {}), hc({ account: { type: "string" }, appkey: { type: "string" }, token: { type: "string" }, needReconnect: { type: "boolean", required: !1 }, reconnectionAttempts: { type: "number", required: !1 }, customClientType: { type: "number", min: 1, required: !1 }, authType: { type: "number", min: 0, max: 2, required: !1 }, lbsUrls: { type: "array", itemType: "string", min: 1, required: !1 }, linkUrl: { type: "string", allowEmpty: !1, required: !1 } }, e), n.account = e.account, n.options = _c(_c({}, Pc), e);var o = null;return Li(r = Fi(i.serviceMap)).call(r, function (e) {var t = i.serviceMap[e];"sync" === e ? o = t : n[e] = new t(ni(n));}), o && (n.sync = new o(ni(n), t)), n;}return ri(i, [{ key: "connect", value: (n = Za(Ei.mark(function e() {var t,r,n = arguments;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (t = n.length > 0 && void 0 !== n[0] ? n[0] : {}, /^(unconnected|waitReconnect)$/.test(this.status)) {e.next = 5;break;}return r = "NIM status is ".concat(this.status, ", and would not repeat connect"), this.logger.warn(r), e.abrupt("return", Qa.reject(r));case 5:return e.next = 7, this.getLbsInfos();case 7:return e.next = 9, ui(ci(i.prototype), "connect", this).call(this);case 9:return e.next = 11, this.login(t.isAutoReconnect);case 11:case "end":return e.stop();}}}, e, this);})), function () {return n.apply(this, arguments);}) }, { key: "login", value: (r = Za(Ei.mark(function e() {var t,r,n = arguments;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return t = n.length > 0 && void 0 !== n[0] && n[0], e.prev = 1, e.next = 4, this.auth.doLogin(t);case 4:r = e.sent, this.status = "logined", this.emit("logined", r), e.next = 14;break;case 9:throw e.prev = 9, e.t0 = e.catch(1), this.logger.error("login error", e.t0), this.onDisconnect("NIM::login", !1), e.t0;case 14:if (this.logger.log("login done"), this.resetConnectStatus(), !this.sync || !this.sync.doSync) {e.next = 19;break;}return e.next = 19, this.sync.doSync();case 19:if (!this.misc || !this.misc.getNosCdnHost) {e.next = 22;break;}return e.next = 22, this.misc.getNosCdnHost();case 22:this.ping();case 23:case "end":return e.stop();}}}, e, this, [[1, 9]]);})), function () {return r.apply(this, arguments);}) }, { key: "onMessage", value: function value(e) {var t = qs(e, this.logger);if (t) {var r = t.raw.ser;if (t.notFound) this.logger.warn("core::onMessage packet not found", r, t.raw.sid + "_" + t.raw.cid);else {t.raw && "heartbeat" !== t.cmd && ("debug" === this.options.debugLevel ? this.logger.debug("imsocket::recvCmd", r, t.cmd, t.content) : this.logger.log("imsocket::recvCmd", r, t.cmd));var n = this.sendingCmdMap.get(r);if (n && n.cmd === t.cmd) {var a,i = n.callback,o = n.timer,s = n.params;clearTimeout(o), t.params = s, this.sendingCmdMap.delete(r);var c = null === (a = this[t.service]) || void 0 === a ? void 0 : a.process(t);c && "function" == typeof c.then ? c.then(function (e) {i[0](e);}).catch(function (e) {i[1](e);}) : (this.logger.log("imsocket:: handlerFn without promise", t.service, t.cmd), i[0]());} else {var u;null === (u = this[t.service]) || void 0 === u || u.process(t);}}}} }, { key: "getLbsInfos", value: (t = Za(Ei.mark(function e() {var t, r, n, a, i, o, s, c;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return t = js.request, r = this.options.lbsUrls[0], n = Vi(r).call(r, "?") > -1 ? "&" : "?", a = r + n + "k=" + this.options.appkey + "&id=" + this.options.account + "&sv=180&pv=1&networkType=0", e.prev = 4, e.next = 7, t(a);case 7:if (200 === (s = e.sent).status && s.data) {e.next = 11;break;}throw this.logger.error("getLbsInfos::error status", s.status, s), new Error("getLbsInfos failed, status ".concat(s.status));case 11:c = s.data.common, this.linkUrls = Ki(i = c.link).call(i, c["link.default"]), rs.chunkUploadHost = s.data["nos-chunk"], this.logger.log("getLbsInfos success, socket link:", eo(o = this.linkUrls).call(o, 0), "chunkUploadHost: ", rs.chunkUploadHost), e.next = 21;break;case 17:e.prev = 17, e.t0 = e.catch(4), this.logger.error("getLbsInfos::error", e.t0), this.linkUrls = [this.options.linkUrl];case 21:case "end":return e.stop();}}}, e, this, [[4, 17]]);})), function () {return t.apply(this, arguments);}) }, { key: "disconnect", value: function value() {return ui(ci(i.prototype), "disconnect", this).call(this);} }, { key: "destroy", value: function value() {return ui(ci(i.prototype), "destroy", this).call(this);} }, { key: "kick", value: function value(e) {return hc({ deviceIds: { type: "array", itemType: "string" } }, e), this.auth.kick(e);} }], [{ key: "registerService", value: function value(e) {var t,r = e.idName;i.serviceMap[r] = e, t = e.cmdParser, Rs = Ps(Rs, t.cmdConfig), Ls = Ps(Ls, t.cmdMap), Ns = Ps(Ns, t.serializeMap), Fs = Ps(Fs, t.deserializeMap), e.cmdParser = null;} }]), i;}(Ec);xi(jc, "serviceMap", {});var Oc = Math.min,Rc = [].lastIndexOf,Lc = !!Rc && 1 / [1].lastIndexOf(1, -0) < 0,Nc = _i("lastIndexOf"),Fc = Lc || !Nc ? function (e) {if (Lc) return Rc.apply(this, arguments) || 0;var t = v(this),r = Y(t.length),n = r - 1;for (arguments.length > 1 && (n = Oc(n, G(arguments[1]))), n < 0 && (n = r + n); n >= 0; n--) {if (n in t && t[n] === e) return n || 0;}return -1;} : Rc;z({ target: "Array", proto: !0, forced: Fc !== [].lastIndexOf }, { lastIndexOf: Fc });var qc = fr("Array").lastIndexOf,Uc = Array.prototype,Dc = function Dc(e) {var t = e.lastIndexOf;return e === Uc || e instanceof Array && t === Uc.lastIndexOf ? qc : t;};function Bc(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Hc(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Bc(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Bc(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}var zc = function () {function e() {ei(this, e);}return ri(e, [{ key: "getItem", value: function value(e) {return uni.getStorageSync(e);} }, { key: "setItem", value: function value(e, t) {return uni.getStorageSync(e, t);} }, { key: "removeItem", value: function value(e) {return uni.removeStorageSync(e);} }]), e;}(),Vc = function () {function e(t) {var r = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";if (ei(this, e), xi(this, "CONNECTING", 0), xi(this, "OPEN", 1), xi(this, "CLOSING", 2), xi(this, "CLOSED", 3), xi(this, "protocol", void 0), xi(this, "readyState", void 0), xi(this, "url", void 0), xi(this, "onclose", function (e) {console.log("uniapp: sockets on close ", e);}), xi(this, "onerror", function (e) {console.error("uniapp: sockets error ", e);}), xi(this, "onmessage", function (e) {}), xi(this, "onopen", function (e) {}), !t) throw new Error("Failed to construct 'socket': url required");this.url = t.replace(/:443(\/|$)/, "$1"), this.protocol = n, this.readyState = this.CONNECTING;var a = this.protocol ? { protocols: this.protocol } : {};uni.connectSocket(Hc(Hc({ url: this.url }, a), {}, { fail: function fail(e) {r.errorHandler(e);}, success: function success() {} })), uni.onSocketOpen(function (e) {r.readyState = r.OPEN, r.onmessage && r.onmessage({ type: "open", header: e });}), uni.onSocketError(function (e) {r.errorHandler(e);}), uni.onSocketClose(function (e) {r.readyState = r.CLOSED;var t = e.code,n = e.reason,a = e.wasClean;"function" == typeof r.onclose && r.onclose && r.onclose({ code: t, reason: n, wasClean: a, type: "close" });}), uni.onSocketMessage(function (e) {var t = e.data,n = e.origin,a = e.ports,i = e.source;r.onmessage && r.onmessage({ data: t, origin: n, ports: a, source: i, type: "message" });});}return ri(e, [{ key: "close", value: function value() {uni.closeSocket({ code: 1e3, reason: "user force close websocket", complete: function complete() {} });} }, { key: "send", value: function value(e) {if (this.readyState !== this.OPEN) throw new Error("uniapp: socket sendMsg when readyState=".concat(this.readyState));if (!("string" == typeof e || e instanceof ArrayBuffer)) throw new TypeError("uniapp: socket sendMsg only String/ArrayBuffer supported");uni.sendSocketMessage({ data: e });} }, { key: "errorHandler", value: function value(e) {var t, r;this.readyState = this.CLOSED, this.onerror && this.onerror({ type: "error", message: e && e.errMsg }), e.errMsg && "[object Array]" === Object.prototype.toString.call(e.errMsg) && (Vi(t = e.errMsg).call(t, "断裂管道") > 0 || Vi(r = e.errMsg).call(r, "broken pipe") > 0) && this.onclose && this.onclose({ code: 1006, reason: e && e.errMsg, type: "close" });} }]), e;}();function Wc() {return (Wc = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return e.next = 2, new Qa(function (e, r) {var n,a = uni.uploadFile({ url: t.commonUploadHost ? Ki(n = "".concat(t.commonUploadHost, "/")).call(n, t.nosToken.bucket) : "https://nos.netease.com/nim", formData: { Object: decodeURIComponent(t.nosToken.objectName), "x-nos-token": t.nosToken.token, "x-nos-entity-type": "json" }, name: "file", filePath: t.filePath, success: function success(n) {var a;if (200 === n.statusCode) try {var i,o,s,c = JSON.parse(n.data);c.name = t.filePath, c.ext = Dc(i = c.name).call(i, ".") > -1 ? eo(o = c.name).call(o, Dc(s = c.name).call(s, ".") + 1).toLowerCase() : "", e(c);} catch (e) {r(new Error("Upload Error parse result error: ".concat(n.data)));} else r(new Error(Ki(a = "Upload error ".concat(n.statusCode, ": ")).call(a, n.errMsg)));}, fail: function fail(e) {r(e);} });try {t.onUploadStart && t.onUploadStart(a);} catch (e) {console.error("uploadFile: options.onUploadStart error", e), a.abort(), r(e);}t.onUploadProgress && a.onProgressUpdate(function (e) {t.onUploadProgress && t.onUploadProgress({ total: e.totalBytesExpectedToSend, loaded: e.totalBytesSent, percentage: e.progress, percentageText: e.progress + "%" });});});case 2:return e.abrupt("return", e.sent);case 3:case "end":return e.stop();}}}, e);}))).apply(this, arguments);}var $c = { platform: "UNIAPP", localStorage: zc, request: function request(e, t) {return new Qa(function (r, n) {uni.request(Hc(Hc({ method: "GET", url: e }, t), {}, { success: function success(e) {e = { data: e.data, status: e.statusCode, errMsg: e.errMsg, header: e.header }, r(e);}, fail: function fail(e) {n(e);} }));});}, WebSocket: Vc, uploadFile: function uploadFile(e) {return Wc.apply(this, arguments);}, getSystemInfo: function getSystemInfo() {var e = uni.getSystemInfoSync() || {};return { os: e.platform || "UNIAPP_UNKNOW", browser: "UNIAPP", pushDeviceInfo: { PRODUCT: e.model, DEVICE: e.model, MANUFACTURER: e.brand } };} };function Kc(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var Gc = function (e) {di(r, e);var t = Kc(r);function r(e, n) {var a;return ei(this, r), xi(ni(a = t.call(this)), "logger", void 0), a.name = e, a.logger = n.logger, a.core = n, a;}return ri(r, [{ key: "process", value: function value(e) {var t = this[e.cmd + "Handler"];return "function" == typeof t ? t.call(this, e) : e.error && !e.error.ignore ? Qa.reject(e.error) : Qa.resolve(e);} }]), r;}(Ro);xi(Gc, "cmdParser", void 0);var Jc = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF",Yc = "[" + Jc + "]",Qc = RegExp("^" + Yc + Yc + "*"),Xc = RegExp(Yc + Yc + "*$"),Zc = function Zc(e) {return function (t) {var r = String(y(t));return 1 & e && (r = r.replace(Qc, "")), 2 & e && (r = r.replace(Xc, "")), r;};},eu = { start: Zc(1), end: Zc(2), trim: Zc(3) }.trim,tu = a.parseInt,ru = /^[+-]?0[Xx]/,nu = 8 !== tu(Jc + "08") || 22 !== tu(Jc + "0x16") ? function (e, t) {var r = eu(String(e));return tu(r, t >>> 0 || (ru.test(r) ? 16 : 10));} : tu;z({ global: !0, forced: parseInt != nu }, { parseInt: nu });var au = R.parseInt;var iu = function iu(e) {return function () {return e;};};var ou = function (e) {return function (t, r, n) {for (var a = -1, i = Object(t), o = n(t), s = o.length; s--;) {var c = o[e ? s : ++a];if (!1 === r(i[c], c, i)) break;}return t;};}();var su = function su(e, t) {for (var r = -1, n = Array(e); ++r < e;) {n[r] = t(r);}return n;};var cu = function cu(e) {return pc(e) && "[object Arguments]" == Jo(e);},uu = Object.prototype,lu = uu.hasOwnProperty,pu = uu.propertyIsEnumerable,mu = cu(function () {return arguments;}()) ? cu : function (e) {return pc(e) && lu.call(e, "callee") && !pu.call(e, "callee");},du = mu,fu = Array.isArray;var yu = function yu() {return !1;},vu = t(function (e, t) {var r = t && !t.nodeType && t,n = r && e && !e.nodeType && e,a = n && n.exports === r ? Uo.Buffer : void 0,i = (a ? a.isBuffer : void 0) || yu;e.exports = i;}),gu = /^(?:0|[1-9]\d*)$/;var hu = function hu(e, t) {var r = typeof e;return !!(t = null == t ? 9007199254740991 : t) && ("number" == r || "symbol" != r && gu.test(e)) && e > -1 && e % 1 == 0 && e < t;};var bu = function bu(e) {return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991;},Tu = {};Tu["[object Float32Array]"] = Tu["[object Float64Array]"] = Tu["[object Int8Array]"] = Tu["[object Int16Array]"] = Tu["[object Int32Array]"] = Tu["[object Uint8Array]"] = Tu["[object Uint8ClampedArray]"] = Tu["[object Uint16Array]"] = Tu["[object Uint32Array]"] = !0, Tu["[object Arguments]"] = Tu["[object Array]"] = Tu["[object ArrayBuffer]"] = Tu["[object Boolean]"] = Tu["[object DataView]"] = Tu["[object Date]"] = Tu["[object Error]"] = Tu["[object Function]"] = Tu["[object Map]"] = Tu["[object Number]"] = Tu["[object Object]"] = Tu["[object RegExp]"] = Tu["[object Set]"] = Tu["[object String]"] = Tu["[object WeakMap]"] = !1;var Mu = function Mu(e) {return pc(e) && bu(e.length) && !!Tu[Jo(e)];},Su = fc && fc.isTypedArray,ku = Su ? dc(Su) : Mu,wu = Object.prototype.hasOwnProperty;var xu = function xu(e, t) {var r = fu(e),n = !r && du(e),a = !r && !n && vu(e),i = !r && !n && !a && ku(e),o = r || n || a || i,s = o ? su(e.length, String) : [],c = s.length;for (var u in e) {!t && !wu.call(e, u) || o && ("length" == u || a && ("offset" == u || "parent" == u) || i && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || hu(u, c)) || s.push(u);}return s;},Iu = Object.prototype;var Eu = function Eu(e) {var t = e && e.constructor;return e === ("function" == typeof t && t.prototype || Iu);};var Au = function Au(e, t) {return function (r) {return e(t(r));};},_u = Au(Object.keys, Object),Cu = Object.prototype.hasOwnProperty;var Pu = function Pu(e) {if (!Eu(e)) return _u(e);var t = [];for (var r in Object(e)) {Cu.call(e, r) && "constructor" != r && t.push(r);}return t;};var ju = function ju(e) {return null != e && bu(e.length) && !Xo(e);};var Ou = function Ou(e) {return ju(e) ? xu(e) : Pu(e);};var Ru = function Ru(e, t) {return e && ou(e, t, Ou);};var Lu = function Lu(e, t, r, n) {return Ru(e, function (e, a, i) {t(n, r(e), a, i);}), n;};var Nu = function Nu(e, t) {return function (r, n) {return Lu(r, e, t(n), {});};};var Fu,qu = function qu(e) {return e;},Uu = Object.prototype.toString,Du = Nu(function (e, t, r) {null != t && "function" != typeof t.toString && (t = Uu.call(t)), e[t] = r;}, iu(qu)),Bu = Du({ Android: 1, iOS: 2, PC: 4, WindowsPhone: 8, Web: 16, Server: 32, Mac: 64 }),Hu = { p2p: 0, team: 1, superTeam: 5 };function zu(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Vu(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = zu(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = zu(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Wu(e, t) {return e && e.length > 0 ? ws(e).call(e, function (e) {return Vu(Vu({}, e), {}, { type: Bu[e.type] || e.type, time: au(e.time), online: 3 !== t });}) : [];}Du(Hu), function (e) {e[e.text = 0] = "text", e[e.image = 1] = "image", e[e.audio = 2] = "audio", e[e.video = 3] = "video", e[e.geo = 4] = "geo", e[e.notification = 5] = "notification", e[e.file = 6] = "file", e[e.tip = 10] = "tip", e[e.robot = 11] = "robot", e[e.g2 = 12] = "g2", e[e.custom = 100] = "custom";}(Fu || (Fu = {}));var $u = { "-1": { code: "unknow", message: "Unknown reason" }, 1: { code: "samePlatformKick", message: "The same account is not allowed to multiple login at the same time" }, 2: { code: "serverKick", message: "Kicked out by IM server" }, 3: { code: "otherPlatformKick", message: "Kicked out by other client of your account" }, 4: { code: "silentlyKick", message: "Quietly kicked" } };function Ku(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Gu(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Ku(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Ku(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Ju(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var Yu = { BROWSER: 0, RN: 2, UNIAPP: 3, WECHAT: 6 },Qu = function (e) {di(a, e);var t,r,n = Ju(a);function a(e) {return ei(this, a), n.call(this, "auth", e);}return ri(a, [{ key: "doLogin", value: (r = Za(Ei.mark(function e() {var t,r,n,a,i,o,s,c,u,l,p,m,d,f = arguments;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return n = f.length > 0 && void 0 !== f[0] && f[0], a = this.core.options, i = js.getSystemInfo(), o = Gu(Gu({}, a), {}, { appLogin: n ? 0 : 1, appkey: a.appkey, account: a.account, token: a.token, deviceId: rs.deviceId, clientType: 16, protocolVersion: 1, sdkVersion: 230, sdkHumanVersion: "8.9.0", os: i.os, browser: i.browser, session: null === (t = this.core.socket) || void 0 === t ? void 0 : t.sessionId, sdkType: Yu[js.platform] || 0, userAgent: "Native/8.9.0" }), s = i.os.toLowerCase(), "UNIAPP" !== js.platform || "ios" !== s && "android" !== s || (o.isReactNative = 1, o.clientType = "ios" === s ? 2 : 1, i.pushDeviceInfo && i.pushDeviceInfo.MANUFACTURER && (o.deviceInfo = Oo(i.pushDeviceInfo))), this.logger.log("auth::do login ", a.account, null === (r = this.core.socket) || void 0 === r ? void 0 : r.sessionId), e.next = 9, this.core.sendCmd("login", { login: o });case 9:if (!(c = e.sent).error) {e.next = 12;break;}throw c.error;case 12:return u = c.content, l = u.loginRes, p = u.loginPorts, m = u.aosPushInfo, d = Wu(p, 2), (d = gr(d).call(d, function (e) {return e.connectionId !== l.connectionId;})).length > 0 && this.core.emit("multiPortLogin", d), e.abrupt("return", Gu(Gu({}, l), {}, { aosPushInfo: m }));case 17:case "end":return e.stop();}}}, e, this);})), function () {return r.apply(this, arguments);}) }, { key: "kick", value: (t = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return e.next = 2, this.core.sendCmd("kick", t);case 2:return n = e.sent, e.abrupt("return", null === (r = n.content) || void 0 === r ? void 0 : r.deviceIds);case 4:case "end":return e.stop();}}}, e, this);})), function (e) {return t.apply(this, arguments);}) }, { key: "multiPortLoginHandler", value: function value(e) {if (e.error) this.logger.error("multiPortLoginHandler:: error, ", e.error);else {var t = e.content,r = Wu(t.loginPorts, t.state);r.length > 0 && this.core.emit("multiPortLogin", r);}} }, { key: "kickedHandler", value: function value(e) {if (e.error) this.logger.error("kickedHandler:: error, ", e.error);else {var t = e.content,r = t.reason,n = t.ext,a = function (e) {var t = $u[e];return { reason: t ? t.code : "unknow", message: t ? t.message : "Unknown reason" };}(r);this.logger.warn("kicked::", a.reason, a.message, n), "silentlyKick" !== a.reason ? (this.core.onDisconnect("kicked::normalKick", !1, !1), this.core.emit("kicked", a)) : this.core.onDisconnect("kicked::silentlyKick", !0);}} }]), a;}(Gc);xi(Qu, "idName", "auth"), xi(Qu, "cmdParser", { cmdMap: { "1_2": "heartbeat", "2_3": "login", "2_5": "kicked", "2_6": "logout", "2_7": "multiPortLogin", "2_8": "kick" }, cmdConfig: { login: { sid: 2, cid: 3, service: "auth", params: [{ type: "Property", name: "login" }], response: [{ type: "Property", name: "loginRes" }, { type: "PropertyArray", name: "loginPorts", entity: "loginPort" }, { type: "Property", name: "aosPushInfo" }] }, logout: { sid: 2, cid: 6, service: "auth" }, heartbeat: { sid: 1, cid: 2, service: "auth" }, kicked: { sid: 2, cid: 5, service: "auth", response: [{ type: "Number", name: "from" }, { type: "Number", name: "reason" }, { type: "String", name: "custom" }, { type: "Number", name: "customClientType" }] }, multiPortLogin: { sid: 2, cid: 7, service: "auth", response: [{ type: "Number", name: "state" }, { type: "PropertyArray", name: "loginPorts", entity: "loginPort" }] }, kick: { sid: 2, cid: 8, service: "auth", params: [{ type: "StrArray", name: "deviceIds" }], response: [{ type: "StrArray", name: "deviceIds" }] } }, serializeMap: { login: { clientType: 3, os: 4, sdkVersion: 6, appLogin: 8, protocolVersion: 9, pushTokenName: 10, pushToken: 11, deviceId: 13, appkey: 18, account: 19, browser: 24, session: 26, deviceInfo: 32, isReactNative: 112, token: 1e3, customTag: 38, customClientType: 39, sdkHumanVersion: 40, sdkType: 41, userAgent: 42, authType: 115, loginExt: 116 } }, deserializeMap: { loginRes: { 17: "lastLoginDeviceId", 38: "customTag", 102: "connectionId", 103: "ip", 104: "port", 106: "country", 111: "hasXMPush" }, loginPort: { 3: "type", 4: "os", 5: "mac", 13: "deviceId", 19: "account", 32: "deviceInfo", 38: "customTag", 102: "connectionId", 103: "ip", 109: "time" }, aosPushInfo: { 110: "pushType", 111: "hasTokenPreviously" } } });var Xu = [],Zu = Xu.sort,el = i(function () {Xu.sort(void 0);}),tl = i(function () {Xu.sort(null);}),rl = _i("sort");z({ target: "Array", proto: !0, forced: el || !tl || !rl }, { sort: function sort(e) {return void 0 === e ? Zu.call(ze(this)) : Zu.call(ze(this), L(e));} });var nl,al,il,ol,sl,cl = fr("Array").sort,ul = Array.prototype,ll = function ll(e) {var t = e.sort;return e === ul || e instanceof Array && t === ul.sort ? cl : t;};function pl(e, t) {if (null == e) return {};var r,n,a = function (e, t) {if (null == e) return {};var r,n,a = {},i = Fi(e);for (n = 0; n < i.length; n++) {r = i[n], Vi(t).call(t, r) >= 0 || (a[r] = e[r]);}return a;}(e, t);if (ur) {var i = ur(e);for (n = 0; n < i.length; n++) {r = i[n], Vi(t).call(t, r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);}}return a;}function ml(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}!function (e) {e[e.text = 0] = "text", e[e.image = 1] = "image", e[e.audio = 2] = "audio", e[e.video = 3] = "video", e[e.geo = 4] = "geo", e[e.notification = 5] = "notification", e[e.file = 6] = "file", e[e.tip = 10] = "tip", e[e.robot = 11] = "robot", e[e.g2 = 12] = "g2", e[e.custom = 100] = "custom";}(nl || (nl = {})), function (e) {e[e.p2p = 0] = "p2p", e[e.team = 1] = "team", e[e.superTeam = 5] = "superTeam";}(al || (al = {})), function (e) {e[e.Android = 1] = "Android", e[e.iOS = 2] = "iOS", e[e.PC = 4] = "PC", e[e.WindowsPhone = 8] = "WindowsPhone", e[e.Web = 16] = "Web", e[e.Server = 32] = "Server", e[e.Mac = 64] = "Mac";}(il || (il = {})), function (e) {e[e.unread = 1] = "unread", e[e.read = 2] = "read", e[e.deleted = 3] = "deleted", e[e.sending = 4] = "sending", e[e.sendFailed = 5] = "sendFailed", e[e.sent = 6] = "sent", e[e.receipt = 7] = "receipt", e[e.refused = 10] = "refused";}(ol || (ol = {})), function (e) {e[e.default = 0] = "default", e[e.leave = 1] = "leave", e[e.roam = 2] = "roam";}(sl || (sl = {}));var dl,fl = Du({ none: 0, normal: 1, all: 3 }),yl = { normal: 0, advanced: 1 },vl = Du(yl),gl = Du({ normal: 0, owner: 1, manager: 2 }),hl = { noVerify: 0, needVerify: 1, rejectAll: 2 },bl = Du(hl),Tl = { needVerify: 0, noVerify: 1 },Ml = Du(Tl),Sl = { manager: 0, all: 1 },kl = Du(Sl),wl = { manager: 0, all: 1 },xl = Du(wl),Il = { manager: 0, all: 1 },El = Du(Il);function Al(e) {var t,r = ["teamId"],n = ["level", "memberNum", "memberUpdateTime", "createTime", "updateTime"],a = ["valid", "validToCurrentUser", "mute"],i = { type: vl, muteType: fl, joinMode: bl, beInviteMode: Ml, inviteMode: kl, updateTeamMode: xl, updateExtMode: El };e.bits;var o = pl(e, ["bits"]);return Li(r).call(r, function (e) {o[e] && (o[e] = o[e].toString());}), Li(n).call(n, function (e) {void 0 !== o[e] && (o[e] = au(o[e]));}), Li(a).call(a, function (e) {void 0 !== o[e] && (o[e] = 1 === au(o[e]));}), Li(t = Fi(i)).call(t, function (e) {void 0 !== o[e] && (o[e] = i[e][o[e]] || o[e]);}), o;}function _l(e) {return e && e.length > 0 ? ws(e).call(e, function (e) {return Al(e);}) : [];}function Cl(e) {var t,r = function (e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = ml(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = ml(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}({}, e),n = ["avatar", "name", "intro", "announcement", "ext"],a = { type: yl, joinMode: hl, beInviteMode: Tl, inviteMode: Sl, updateTeamMode: wl, updateExtMode: Il };return Li(n).call(n, function (e) {void 0 !== r[e] && (r[e] = r[e].toString());}), Li(t = Fi(a)).call(t, function (e) {void 0 !== r[e] && (r[e] = a[e][r[e]]);}), r;}function Pl(e) {var t = ["teamId", "ext", "account", "nickInTeam"],r = ["mute"],n = {};return void 0 !== e.bitConfigMask && (n.bits = au(e.bitConfigMask)), Li(t).call(t, function (t) {e[t] && (n[t] = e[t].toString());}), Li(r).call(r, function (t) {void 0 !== e[t] && (n[t] = !!e[t]);}), n;}function jl(e) {var t,r,n = ["teamId"],a = ["joinTime", "updateTime"],i = ["active", "valid", "mute"],o = { type: gl },s = e.bits,c = pl(e, ["bits"]);return void 0 !== s && (c.muteTeam = 1 === au(s), c.bitConfigMask = s), c.id = Ki(t = "".concat(c.teamId, "-")).call(t, c.account), Li(n).call(n, function (e) {c[e] && (c[e] = c[e].toString());}), Li(a).call(a, function (e) {void 0 !== c[e] && (c[e] = au(c[e]));}), Li(i).call(i, function (e) {void 0 !== c[e] && (c[e] = 1 === au(c[e]));}), Li(r = Fi(o)).call(r, function (e) {void 0 !== c[e] && (c[e] = o[e][c[e]] || c[e]);}), c;}function Ol(e) {return e && e.length > 0 ? ws(e).call(e, function (e) {return jl(e);}) : [];}function Rl(e, t) {var r,n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "normal";return { id: Ki(r = "".concat(e.teamId, "-")).call(r, t), account: t, type: n, nickInTeam: "", muteTeam: !1, mute: !1, joinTime: e.memberUpdateTime, updateTime: e.memberUpdateTime, active: !0, valid: !0, invitorAccid: "" };}function Ll(e, t) {var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "normal";return t && t.length > 0 ? ws(t).call(t, function (t) {return Rl(e, t, r);}) : [];}function Nl(e) {var t = Ps({}, e);return t.createTime && (t.createTime = +t.createTime), t.updateTime && (t.updateTime = +t.updateTime), t.gender && (t.gender = dl[+t.gender]), t;}!function (e) {e[e.unknown = 0] = "unknown", e[e.male = 1] = "male", e[e.female = 2] = "female";}(dl || (dl = {}));var Fl = function Fl(e) {return function (t, r, n, a) {L(r);var i = ze(t),o = f(i),s = Y(i.length),c = e ? s - 1 : 0,u = e ? -1 : 1;if (n < 2) for (;;) {if (c in o) {a = o[c], c += u;break;}if (c += u, e ? c < 0 : s <= c) throw TypeError("Reduce of empty array with no initial value");}for (; e ? c >= 0 : s > c; c += u) {c in o && (a = r(a, o[c], c, i));}return a;};},ql = { left: Fl(!1), right: Fl(!0) }.left,Ul = _i("reduce");z({ target: "Array", proto: !0, forced: !Ul || !Re && Ue > 79 && Ue < 83 }, { reduce: function reduce(e) {return ql(this, e, arguments.length, arguments.length > 1 ? arguments[1] : void 0);} });var Dl = fr("Array").reduce,Bl = Array.prototype,Hl = function Hl(e) {var t = e.reduce;return e === Bl || e instanceof Array && t === Bl.reduce ? Dl : t;},zl = Au(Object.getPrototypeOf, Object),Vl = Function.prototype,Wl = Object.prototype,$l = Vl.toString,Kl = Wl.hasOwnProperty,Gl = $l.call(Object);var Jl = function Jl(e) {if (!pc(e) || "[object Object]" != Jo(e)) return !1;var t = zl(e);if (null === t) return !0;var r = Kl.call(t, "constructor") && t.constructor;return "function" == typeof r && r instanceof r && $l.call(r) == Gl;};function Yl(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Ql(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Yl(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Yl(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Xl(e, t) {if (!Jl(t)) return {};var r = JSON.parse(Oo(t)),n = Zl(e, r);return JSON.parse(Oo(Ql(Ql({}, r), n)));}function Zl(e, t) {if (!Jl(t)) return {};var r = {},n = Fi(e);return Li(n).call(n, function (n) {var a = e[n].type;if ("string" != typeof a) r[n] = Zl(e[n], t);else {var i = e[n].rawKey || n,o = ep[a](t, i);void 0 !== o && (t[i] = void 0, r[n] = o);}}), r;}var ep = { number: function number(e, t) {if (void 0 !== e[t]) return au(e[t]);}, string: function string(e, t) {if (void 0 !== e[t]) return e[t];}, boolean: function boolean(e, t) {return +e[t] > 0 || 0 != +e[t] && void 0;} };function tp(e, t) {if (!Jl(t)) return {};var r = JSON.parse(Oo(t)),n = rp(e, r);return JSON.parse(Oo(Ql(Ql({}, r), n)));}function rp(e, t) {var r;if (!Jl(t)) return Hl(r = Fi(e)).call(r, function (e, t) {return e[t] = void 0, e;}, {});var n = {},a = Fi(e);return Li(a).call(a, function (r) {var a = e[r].type;if ("string" != typeof a) return Ps(n, rp(e[r], t[r])), void (t[r] = void 0);var i = e[r].rawKey || r,o = np[a](t, i);t[i] = void 0, n[r] = o;}), n;}var np = { number: function number(e, t) {return e[t];}, string: function string(e, t) {return e[t];}, boolean: function boolean(e, t) {return !0 === e[t] ? 1 : !1 === e[t] ? 0 : void 0;} };function ap(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function ip(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = ap(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = ap(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}var op = { subType: { type: "string" }, setting: { resendFlag: { type: "boolean" }, envConfig: { type: "string" }, needSaveHistory: { type: "boolean" }, needRoaming: { type: "boolean" }, needOffline: { type: "boolean" }, needSelfSync: { type: "boolean" }, needRouted: { type: "boolean" }, needUpdateSession: { type: "boolean" }, isMuted: { type: "boolean" }, isInBlackList: { type: "boolean" } }, antiSpamInfo: { needAntiSpam: { type: "boolean" }, antiSpamContent: { type: "string" }, antiSpamBIZID: { type: "string" }, clientAntispamHitting: { type: "boolean" }, antiSpamUsingYidun: { type: "boolean" }, yidunCallbackURL: { type: "string" }, yidunAntiCheating: { type: "string" }, yidunAntiSpamExtension: { type: "string" }, yidunAntiSpamResult: { type: "string" } }, pushInfo: { needPush: { type: "boolean" }, needPushBadge: { type: "boolean" }, needPushNick: { type: "boolean" }, pushApnsText: { type: "string" }, pushPayload: { type: "string" } }, teamSpecializationInfo: { needForcePush: { type: "boolean" }, needACK: { type: "boolean" }, forcePushIDsList: { type: "string" }, pushContent: { type: "string" }, isACKSent: { type: "boolean" }, ackSnapshot: { type: "number" } }, threadMessageInfo: { replyMsgFromAccount: { type: "string" }, replyMsgToAccount: { type: "string" }, replyMsgTime: { type: "number" }, replyMsgIdServer: { type: "string" }, replyMsgIdClient: { type: "string" }, threadMsgFromAccount: { type: "string" }, threadMsgToAccount: { type: "string" }, threadMsgTime: { type: "number" }, threadMsgIdServer: { type: "string" }, threadMsgIdClient: { type: "string" } } },sp = { 0: "addTeamMembers", 1: "removeTeamMembers", 2: "leaveTeam", 3: "updateTeam", 4: "dismissTeam", 5: "passTeamApply", 6: "transferTeam", 7: "addTeamManagers", 8: "removeTeamManagers", 9: "acceptTeamInvite", 10: "updateTeamMemberMute", 101: "netcallMiss", 102: "netcallBill", 103: "netcallReject", 401: "addSuperTeamMembers", 402: "removeSuperTeamMembers", 403: "leaveSuperTeam", 404: "updateSuperTeam", 405: "dismissSuperTeam", 406: "transferSuperTeam", 407: "addSuperTeamManagers", 408: "removeSuperTeamManagers", 409: "updateSuperTeamMembersMute", 410: "passSuperTeamApply", 411: "acceptSuperTeamInvite" };function cp(e, t, r, n) {var a,i = al[e.scene],o = e.to === t ? e.from : e.to,s = t === e.from ? ol.sent : ol.unread,c = sl.default,u = ip(ip({}, Xl(op, e)), {}, { scene: i, type: nl[e.type], fromClientType: il[e.fromClientType], flow: e.from === t ? "out" : "in", target: o, to: e.to, from: e.from, time: e.time ? +e.time : void 0, userUpdateTime: e.userUpdateTime ? +e.userUpdateTime : void 0, idClient: e.idClient, sessionId: Ki(a = "".concat(i, "-")).call(a, o), status: ol[n || s], feature: sl[r || c] });if (u.setting && u.setting.isInBlackList && (u.status = ol[ol.refused], delete u.setting.isInBlackList), "string" == typeof u.attach) try {u.attach = JSON.parse(u.attach);} catch (e) {}return "notification" === u.type && (u.attach = u.attach ? function (e) {var t,r = {};if (r.type = sp[e.id] || e.id, !e.data) return r;var n,a = { ids: "accounts", id: "account", attach: "custom", channel: "channelId", calltype: "netcallType", mute: "mute", duration: "duration", time: "time", from: "from", ext: "ext" },i = e.data;return Li(t = Fi(a)).call(t, function (e) {void 0 !== i[e] && (r[a[e]] = i[e]);}), i.tinfo && (r.team = Al(Ds(i.tinfo, "team"))), i.uinfos && (r.users = ws(n = i.uinfos).call(n, function (e) {return Nl(Ds(e, "user"));})), void 0 !== i.mute && (r.mute = 1 === au(i.mute)), r;}(u.attach) : {}), u;}function up(e, t, r, n) {return e && e.length > 0 ? ws(e).call(e, function (e) {return cp(e, t, r, n);}) : [];}var lp = Array.prototype.reverse;var pp = function pp(e) {return null == e ? e : lp.call(e);},mp = function () {function e(t) {ei(this, e), xi(this, "core", void 0), this.core = t;}return ri(e, [{ key: "shouldSendMsgReceipt", value: function value(e) {if ("p2p" === e.scene && e.status === ol[ol.unread]) {var t = this.core.session && this.core.session.getSession && this.core.session.getSession({ id: e.sessionId });if (t) {var r = t.msgReceiptTime;return !r || r < e.time;}}return !1;} }]), e;}(),dp = { scene: 0, to: 1, from: 2, fromClientType: 4, fromDeviceId: 5, fromNick: 6, time: 7, type: 8, body: 9, attach: 10, idClient: 11, idServer: 12, resendFlag: 13, userUpdateTime: 14, ext: 15, pushPayload: 16, pushApnsText: 17, forcePushIDsList: 18, pushContent: 19, needForcePush: 20, needAntiSpam: 21, antiSpamContent: 22, antiSpamBIZID: 23, clientAntispamHitting: 24, antiSpamUsingYidun: 25, needACK: 26, yidunCallbackURL: 27, needUpdateSession: 28, replyMsgFromAccount: 29, replyMsgToAccount: 30, replyMsgTime: 31, replyMsgIdServer: 32, replyMsgIdClient: 33, threadMsgFromAccount: 34, threadMsgToAccount: 35, threadMsgTime: 36, threadMsgIdServer: 37, threadMsgIdClient: 38, isDeleted: 39, callbackExt: 40, subType: 41, yidunAntiCheating: 42, envConfig: 43, yidunAntiSpamExtension: 44, yidunAntiSpamResult: 45, needSaveHistory: 100, needRoaming: 101, needSelfSync: 102, isMuted: 104, needRouted: 105, isInBlackList: 106, needPush: 107, needOffline: 108, needPushBadge: 109, needPushNick: 110, isReplyMsg: 111, ackSnapshot: 112 },fp = { msg: dp, recallMsgTag: { time: 0, type: 1, to: 2, from: 3, ps: 4, attach: 5, apnsText: 8, pushPayload: 9, deletedIdClient: 10, deletedIdServer: 11, opeAccount: 16, env: 21 }, msgReceiptTag: { to: 1, from: 2, time: 7, idClient: 11 } },yp = { 0: "scene", 1: "to", 2: "from", 4: "fromClientType", 5: "fromDeviceId", 6: "fromNick", 7: "time", 8: "type", 9: "body", 10: "attach", 11: "idClient", 12: "idServer", 13: "resendFlag", 14: "userUpdateTime", 15: "ext", 16: "pushPayload", 17: "pushApnsText", 18: "forcePushIDsList", 19: "pushContent", 20: "needForcePush", 21: "needAntiSpam", 22: "antiSpamContent", 23: "antiSpamBIZID", 24: "clientAntispamHitting", 25: "antiSpamUsingYidun", 26: "needACK", 27: "yidunCallbackURL", 28: "needUpdateSession", 29: "replyMsgFromAccount", 30: "replyMsgToAccount", 31: "replyMsgTime", 32: "replyMsgIdServer", 33: "replyMsgIdClient", 34: "threadMsgFromAccount", 35: "threadMsgToAccount", 36: "threadMsgTime", 37: "threadMsgIdServer", 38: "threadMsgIdClient", 39: "isDeleted", 40: "callbackExt", 41: "subType", 42: "yidunAntiCheating", 43: "envConfig", 44: "yidunAntiSpamExtension", 45: "yidunAntiSpamResult", 100: "needSaveHistory", 101: "needRoaming", 102: "needSelfSync", 104: "isMuted", 105: "needRouted", 106: "isInBlackList", 107: "needPush", 108: "needOffline", 109: "needPushBadge", 110: "needPushNick", 111: "isReplyMsg", 112: "ackSnapshot" },vp = { msg: yp, msgReceiptTag: { 1: "to", 2: "from", 7: "time", 11: "idClient" } };function gp(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function hp(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = gp(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = gp(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function bp(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var Tp = function (e) {di(l, e);var t,r,n,a,i,o,s,c,u = bp(l);function l(e) {var t;return ei(this, l), xi(ni(t = u.call(this, "msg", e)), "service", void 0), t.service = new mp(e), t;}return ri(l, [{ key: "sendTextMsg", value: function value(e) {return hc({ body: { type: "string", allowEmpty: !1 } }, e), this.sendMsg(hp(hp({}, e), {}, { type: "text" }));} }, { key: "sendTipMsg", value: function value(e) {return hc({ body: { type: "string", allowEmpty: !1 } }, e), this.sendMsg(hp(hp({}, e), {}, { type: "tip" }));} }, { key: "sendGeoLocationMsg", value: function value(e) {return hc({ attach: { type: "object", rules: { title: { type: "string", allowEmpty: !1 }, lat: { type: "number" }, lng: { type: "number" } } } }, e), this.sendMsg(hp(hp({}, e), {}, { type: "geo", attach: Oo(e.attach) }));} }, { key: "sendCustomMsg", value: function value(e) {return hc({ attach: { type: "string", allowEmpty: !1 } }, e), this.sendMsg(hp(hp({}, e), {}, { type: "custom" }));} }, { key: "sendMsg", value: function value(e) {var t,r = this;hc({ scene: { type: "enum", values: es(al) }, type: { type: "enum", values: es(nl) }, to: { type: "string", allowEmpty: !1 }, ext: { type: "string", required: !1 }, setting: { type: "object", rules: { resendFlag: { type: "boolean", required: !1 }, needSaveHistory: { type: "boolean", required: !1 }, needRoaming: { type: "boolean", required: !1 }, needOffline: { type: "boolean", required: !1 }, needSelfSync: { type: "boolean", required: !1 }, needRouted: { type: "boolean", required: !1 }, needUpdateSession: { type: "boolean", required: !1 } }, required: !1 }, antiSpamInfo: { type: "object", required: !1, rules: { clientAntispamHitting: { type: "boolean", required: !1 }, antiSpamUsingYidun: { type: "boolean", required: !1 } } }, pushInfo: { type: "object", required: !1, rules: { needPush: { type: "boolean", required: !1 }, pushApnsText: { type: "string", allowEmpty: !1, required: !1 }, pushPayload: { type: "string", allowEmpty: !1, max: 2048, required: !1 } } }, teamSpecializationInfo: { type: "object", required: !1, rules: { needForcePush: { type: "boolean", required: !1 }, needACK: { type: "boolean", required: !1 }, forcePushIDsList: { type: "string", allowEmpty: !1, required: !1 }, pushContent: { type: "string", allowEmpty: !1, max: 150, required: !1 } } } }, e);var n = "p2p" === e.scene ? "sendMsg" : "team" === e.scene ? "sendTeamMsg" : "sendSuperTeamMsg",a = function (e, t, r) {e.onSendBefore, e.onUploadStart, e.onUploadDone;var n = e.replyMsg,a = pl(e, ["onSendBefore", "onUploadStart", "onUploadDone", "replyMsg"]),i = ip(ip({}, tp(op, a)), {}, { scene: al[e.scene], type: nl[e.type], from: t, fromClientType: 16, fromDeviceId: rs.deviceId, fromNick: null == r ? void 0 : r.nick, userUpdateTime: null == r ? void 0 : r.updateTime, status: ol[ol.sending] });if (i.idClient = i.resendFlag ? e.idClient : Zo(), !i.idClient) throw new Error("idClient is required to resend a message");return i.scene === al.team && i.needForcePush && (i.pushContent = i.pushContent || i.pushApnsText, i.forcePushIDsList = i.forcePushIDsList ? i.forcePushIDsList : "#%@all@%#"), n && (i.replyMsgFromAccount = n.from, i.replyMsgToAccount = n.to, i.replyMsgTime = +n.time, i.replyMsgIdServer = n.idServer, i.replyMsgIdClient = n.idClient, i.threadMsgFromAccount = n.from, i.threadMsgToAccount = n.to, i.threadMsgTime = +n.time, i.threadMsgIdServer = n.idServer, i.threadMsgIdClient = n.idClient, n.threadMessageInfo && n.threadMessageInfo.threadMsgIdServer && (i.threadMsgFromAccount = n.threadMessageInfo.threadMsgFromAccount, i.threadMsgToAccount = n.threadMessageInfo.threadMsgToAccount, i.threadMsgTime = n.threadMessageInfo.threadMsgTime, i.threadMsgIdServer = n.threadMessageInfo.threadMsgIdServer, i.threadMsgIdClient = n.threadMessageInfo.threadMsgIdClient)), i;}(e, this.core.account, null === (t = this.core.user) || void 0 === t ? void 0 : t.myInfo),i = cp(hp(hp({}, a), {}, { time: new Date().getTime() }), this.core.account, sl.default, ol.sending);try {e.onSendBefore && e.onSendBefore(i);} catch (e) {this.logger.error("sendMsg: options.onSendBefore error", e);}return this.core.emit("_sendMsg", i), this.core.sendCmd(n, { msg: a }).then(function (e) {var t = e.content,n = cp(hp(hp({}, a), t.msg), r.core.account, sl.default, ol.sent);return r.core.emit("_sendMsg", n), n;}).catch(function (e) {var t = cp(hp(hp({}, a), {}, { time: new Date().getTime() }), r.core.account, sl.default, 7101 === e.code ? ol.refused : ol.sendFailed);throw e.msg = t, r.core.emit("_sendMsgDone", t), e;});} }, { key: "resendMsg", value: (c = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (hc({ msg: { type: "object", rules: { idClient: { type: "string", allowEmpty: !1 } } } }, t), r = t.msg, n = hp(hp({}, r), {}, { attach: r.attach ? Oo(r.attach) : void 0, setting: { resendFlag: !0 } }), "out" === r.flow) {e.next = 5;break;}throw new Error("You can only resend messages that you sent: ".concat(r.idClient));case 5:return e.abrupt("return", this.sendMsg(n));case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return c.apply(this, arguments);}) }, { key: "forwardMsg", value: (s = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ msg: { type: "object", rules: { idClient: { type: "string", allowEmpty: !1 } } }, scene: { type: "enum", values: es(al) }, to: { type: "string", allowEmpty: !1 } }, t), r = t.msg, n = hp(hp({}, r), {}, { scene: t.scene, to: t.to, attach: r.attach ? Oo(r.attach) : void 0 }), e.abrupt("return", this.sendMsg(n));case 4:case "end":return e.stop();}}}, e, this);})), function (e) {return s.apply(this, arguments);}) }, { key: "sendImageMsg", value: function value(e) {return this.doSendFile(hp(hp({}, e), {}, { type: "image" }));} }, { key: "sendFileMsg", value: function value(e) {return this.doSendFile(hp(hp({}, e), {}, { type: "file" }));} }, { key: "sendAudioMsg", value: function value(e) {return this.doSendFile(hp(hp({}, e), {}, { type: "audio" }));} }, { key: "sendVideoMsg", value: function value(e) {return this.doSendFile(hp(hp({}, e), {}, { type: "video" }));} }, { key: "doSendFile", value: (o = Za(Ei.mark(function e(t) {var r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (hc({ scene: { type: "enum", values: es(al) }, to: { type: "string", allowEmpty: !1 }, type: { type: "string", allowEmpty: !1 }, attach: { type: "object", rules: { url: { type: "string", allowEmpty: !1 } }, required: !1 }, maxSize: { type: "number", min: 1, required: !1 } }, t), r = t.attach) {e.next = 23;break;}if (this.core.cloudStorage && this.core.cloudStorage.uploadFile) {e.next = 5;break;}throw new Error('Service "cloudStorage" does not exist');case 5:return e.prev = 5, e.next = 8, this.core.cloudStorage.uploadFile(t);case 8:r = e.sent, e.next = 15;break;case 11:throw e.prev = 11, e.t0 = e.catch(5), this.logger.error("sendFile:: upload File error or abort", e.t0), e.t0;case 15:e.prev = 15, t.onUploadDone && t.onUploadDone(r), e.next = 23;break;case 19:throw e.prev = 19, e.t1 = e.catch(15), this.logger.error("sendFile options.onUploadDone err", e.t1), e.t1;case 23:return e.abrupt("return", this.sendMsg(hp(hp({}, t), {}, { attach: Oo(r), type: t.type })));case 24:case "end":return e.stop();}}}, e, this, [[5, 11], [15, 19]]);})), function (e) {return o.apply(this, arguments);}) }, { key: "recallMsg", value: (i = Za(Ei.mark(function e(t) {var r, n, a;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ msg: { type: "object", rules: { idClient: { type: "string", allowEmpty: !1 }, idServer: { type: "string", allowEmpty: !1 }, scene: { type: "enum", values: es(al) }, time: { type: "number" } } }, apnsText: { type: "string", allowEmpty: !1, required: !1 }, ps: { type: "string", allowEmpty: !1, required: !1 } }, t), r = t.msg, n = { p2p: "recallMsg", team: "recallMsg", superTeam: "recallSuperTeamMsg" }, a = { p2p: 7, team: 8, superTeam: 12 }, e.next = 6, this.core.sendCmd(n[r.scene], { recallMsgTag: { time: r.time, type: a[r.scene], to: r.to, from: r.from, ps: t.ps, attach: t.attach, apnsText: t.apnsText, pushPayload: t.pushPayload, deletedIdClient: r.idClient, deletedIdServer: r.idServer, opeAccount: r.from, env: t.env } });case 6:return e.abrupt("return", r);case 7:case "end":return e.stop();}}}, e, this);})), function (e) {return i.apply(this, arguments);}) }, { key: "sendMsgReceipt", value: (a = Za(Ei.mark(function e(t) {var r, n, a, i, o, s, c, u, l;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (hc({ msg: { type: "object", rules: { idClient: { type: "string", allowEmpty: !1 }, target: { type: "string", allowEmpty: !1 }, time: { type: "number" } } } }, t), a = t.msg, this.service.shouldSendMsgReceipt(a)) {e.next = 5;break;}return this.logger.warn(Ki(i = Ki(o = Ki(s = "P2p Message receipt should not be sent，check msg idClient ".concat(a.idClient, ", scene ")).call(s, a.scene, ", status ")).call(o, a.status, ", time ")).call(i, a.time)), e.abrupt("return", void 0);case 5:return c = { to: a.target, idClient: a.idClient, time: a.time }, e.next = 8, this.core.sendCmd("sendMsgReceipt", { msgReceiptTag: c });case 8:return u = e.sent, l = au(null === (r = u.content) || void 0 === r || null === (n = r.msgReceiptTag) || void 0 === n ? void 0 : n.time), e.abrupt("return", hp(hp({}, c), {}, { time: l ? Math.min(l, c.time) : c.time }));case 11:case "end":return e.stop();}}}, e, this);})), function (e) {return a.apply(this, arguments);}) }, { key: "sendTeamMsgReceipt", value: (n = Za(Ei.mark(function e(t) {var r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamMsgReceipts: { type: "array", rules: { teamId: { type: "string", allowEmpty: !1 }, idClient: { type: "string", allowEmpty: !1 }, idServer: { type: "string", allowEmpty: !1 } }, max: 50 } }, t), r = t.teamMsgReceipts, this.core.sendCmd("sendTeamMsgReceipt", { teamMsgReceipts: r }), e.abrupt("return", void 0);case 4:case "end":return e.stop();}}}, e, this);})), function (e) {return n.apply(this, arguments);}) }, { key: "getTeamMsgReads", value: (r = Za(Ei.mark(function e(t) {var r, n, a, i;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamMsgReceipts: { type: "array", rules: { teamId: { type: "string", allowEmpty: !1 }, idClient: { type: "string", allowEmpty: !1 }, idServer: { type: "string", allowEmpty: !1 } } } }, t), n = t.teamMsgReceipts, e.next = 4, this.core.sendCmd("getTeamMsgReads", { teamMsgReceipts: n });case 4:return a = e.sent, i = (i = null === (r = a.content) || void 0 === r ? void 0 : r.teamMsgReceipts) ? ws(i).call(i, function (e) {return hp(hp({}, e), {}, { read: au(e.read), unread: au(e.unread) });}) : [], e.abrupt("return", i);case 8:case "end":return e.stop();}}}, e, this);})), function (e) {return r.apply(this, arguments);}) }, { key: "getTeamMsgReadAccounts", value: (t = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamMsgReceipt: { type: "object", rules: { teamId: { type: "string", allowEmpty: !1 }, idClient: { type: "string", allowEmpty: !1 }, idServer: { type: "string", allowEmpty: !1 } } } }, t), r = t.teamMsgReceipt, e.next = 4, this.core.sendCmd("getTeamMsgReadAccounts", { teamMsgReceiptTag: r });case 4:return n = e.sent, e.abrupt("return", n.content);case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return t.apply(this, arguments);}) }, { key: "markMsgsAck", value: function value(e) {if (e && e.length > 0) {var t = [],r = [];Li(e).call(e, function (e) {"p2p" === e.scene && "in" === e.flow ? t.push(e) : "team" === e.scene && "in" === e.flow && r.push(e);}), t.length > 0 && this.core.sendCmd("batchMarkRead", { sid: 7, cid: 2, ids: ws(t).call(t, function (e) {return e.idServer;}) }), r.length > 0 && this.core.sendCmd("batchMarkRead", { sid: 8, cid: 3, ids: ws(r).call(r, function (e) {return e.idServer;}) });}} }, { key: "onMsgHandler", value: function value(e) {if (e.error) this.logger.error("msgHandler::recvError", e.error);else {var t = cp(e.content.msg, this.core.account);"debug" === this.core.options.debugLevel ? this.logger.debug("msgHandler::recvMsg", t.idClient, t.idServer, t) : this.logger.log("msgHandler::recvMsg", t.idClient, t.idServer), this.markMsgsAck([t]), "notification" === t.type ? this.core.emit("_notification", t) : this.core.emit("msg", t);}} }, { key: "syncRoamingMsgsHandler", value: function value(e) {var t = this,r = e.content.msgs || [];if (0 !== r.length) {var n = (r = ws(r).call(r, function (e) {return cp(e, t.core.account, sl.roam);}))[0].time;this.core.emit("syncRoamingMsgs", { timetag: n, sessionId: r[0].sessionId, msgs: pp(r) }), this.core.emit("_updateTimetag", { roamingMsgs: n });}} }, { key: "syncOfflineMsgsHandler", value: function value(e) {var t,r = this,n = e.content.msgs || [];if (0 !== n.length) {var a = {},i = [];Li(n).call(n, function (e) {var t = cp(e, r.core.account, sl.leave);i.push(t), a[t.sessionId] ? a[t.sessionId].push(t) : a[t.sessionId] = [t];}), this.markMsgsAck(i);var o = 0;Li(t = Fi(a)).call(t, function (e) {var t,n = ll(t = a[e]).call(t, function (e, t) {return t.time - e.time;});n[0].time > o && (o = n[0].time), r.core.emit("syncOfflineMsgs", { timetag: n[0].time, sessionId: e, msgs: n });}), this.core.emit("_updateTimetag", { offlineMsgs: o });}} }, { key: "onMsgReceiptHandler", value: function value(e) {var t,r = null === (t = e.content) || void 0 === t ? void 0 : t.msgReceiptTag;r && this.core.emit("_updateSessionMsgReceiptTime", [r]);} }, { key: "syncMsgReceiptsHandler", value: function value(e) {var t,r = null === (t = e.content) || void 0 === t ? void 0 : t.msgReceipts;r && this.core.emit("_updateSessionMsgReceiptTime", r);} }]), l;}(Gc);xi(Tp, "idName", "msg"), xi(Tp, "cmdParser", { cmdMap: { "4_4": "syncOfflineMsgs", "4_9": "syncRoamingMsgs", "4_12": "syncMsgReceipts", "4_17": "syncRoamingMsgs", "7_1": "sendMsg", "8_23": "getHistoryTeamMsgs", "21_14": "getHistorySuperTeamMsgs", "8_2": "sendTeamMsg", "21_2": "sendSuperTeamMsg", "7_11": "sendMsgReceipt", "7_12": "onMsgReceipt", "7_13": "recallMsg", "21_17": "recallSuperTeamMsg", "7_2": "onMsg", "8_3": "onMsg", "21_3": "onMsg", "7_101": "onMsg", "8_102": "onMsg", "21_102": "onMsg" }, cmdConfig: { sendMsg: { sid: 7, cid: 1, service: "msg", params: [{ type: "Property", name: "msg" }], response: [{ type: "Property", name: "msg" }] }, sendTeamMsg: { sid: 8, cid: 2, service: "msg", params: [{ type: "Property", name: "msg" }], response: [{ type: "Property", name: "msg" }] }, sendSuperTeamMsg: { sid: 21, cid: 2, service: "msg", params: [{ type: "Property", name: "msg" }], response: [{ type: "Property", name: "msg" }] }, onMsg: { sid: 7, cid: 2, service: "msg", response: [{ type: "Property", name: "msg" }] }, getHistoryTeamMsgs: { sid: 8, cid: 23, params: [{ type: "Long", name: "to" }, { type: "Long", name: "beginTime" }, { type: "Long", name: "endTime" }, { type: "Long", name: "lastMsgId" }, { type: "int", name: "limit" }, { type: "bool", name: "reverse" }, { type: "LongArray", name: "msgTypes" }], response: [{ type: "PropertyArray", name: "msgs", entity: "msg" }], service: "msg" }, getHistorySuperTeamMsgs: { sid: 21, cid: 14, params: [{ type: "Long", name: "to" }, { type: "Long", name: "beginTime" }, { type: "Long", name: "endTime" }, { type: "Long", name: "lastMsgId" }, { type: "int", name: "limit" }, { type: "bool", name: "reverse" }, { type: "LongArray", name: "msgTypes" }], response: [{ type: "PropertyArray", name: "msgs", entity: "msg" }], service: "msg" }, recallMsg: { sid: 7, cid: 13, service: "msg", params: [{ type: "Property", name: "recallMsgTag" }] }, recallSuperTeamMsg: { sid: 21, cid: 17, service: "msg", params: [{ type: "Property", name: "recallMsgTag" }] }, sendMsgReceipt: { sid: 7, cid: 11, service: "msg", params: [{ type: "Property", name: "msgReceiptTag" }], response: [{ type: "Property", name: "msgReceiptTag" }] }, onMsgReceipt: { sid: 7, cid: 12, service: "msg", response: [{ type: "Property", name: "msgReceiptTag" }] }, batchMarkRead: { sid: 4, cid: 5, service: "msg", params: [{ type: "byte", name: "sid" }, { type: "byte", name: "cid" }, { type: "LongArray", name: "ids" }] }, syncMsgReceipts: { sid: 4, cid: 12, service: "msg", response: [{ type: "PropertyArray", name: "msgReceipts", entity: "msgReceiptTag" }, { type: "Number", name: "timetag" }] }, syncOfflineMsgs: { sid: 4, cid: 4, service: "msg", response: [{ type: "PropertyArray", name: "msgs", entity: "msg" }] }, syncRoamingMsgs: { sid: 4, cid: 9, service: "msg", response: [{ type: "PropertyArray", name: "msgs", entity: "msg" }] } }, serializeMap: fp, deserializeMap: vp });function Mp(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var Sp = function (e) {di(n, e);var t,r = Mp(n);function n(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var a;return ei(this, n), xi(ni(a = r.call(this, "sync", e)), "timetags", void 0), xi(ni(a), "pArray", void 0), a.options = Ps({ myInfo: !!e.user.name, offlineMsgs: !!e.msg.name, teams: !!e.team.name, roamingMsgs: !!e.msg.name, relations: !!e.user.name, friends: !!e.friend.name, friendUsers: !!e.user.name, msgReceipts: !!e.msg.name, recallMsg: !!e.msg.name, sessionAck: !!e.session.name, superTeams: !!e.superTeam.name, superTeamRoamingMsgs: !!e.superTeam.name, deleteSuperTeamMsg: !!e.superTeam.name, deleteMsgSelf: !!e.msg.name, sessionHistoryMsgsDelete: !!e.msgLog.name }, t), a.timetags = {}, a.pArray = [], a.initEventListeners(), a;}return ri(n, [{ key: "doSync", value: (t = Za(Ei.mark(function e() {var t;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return t = this.genSyncParams(), this.logger.log("doSync: ", t), e.next = 4, this.core.sendCmd("sync", { sync: t });case 4:case "end":return e.stop();}}}, e, this);})), function () {return t.apply(this, arguments);}) }, { key: "initEventListeners", value: function value() {var e = this;this.core.on("_updateTimetag", function (t) {var r;Li(r = Fi(t)).call(r, function (r) {t[r] > (e.timetags[r] || 0) && (e.timetags[r] = t[r]);});});} }, { key: "genSyncParams", value: function value() {var e,t,r = this;return Hl(e = gr(t = Fi(this.options)).call(t, function (e) {var t = e;return r.options[t];})).call(e, function (e, t) {var n = t;return e[n] = r.timetags[n] || 0, e;}, {});} }, { key: "syncHandler", value: function value(e) {var t;this.core.session && this.core.session.onSyncDone && this.core.session.onSyncDone(), this.logger.log("sync: emit syncdone", null === (t = e.content) || void 0 === t ? void 0 : t.timetag), this.core.emit("syncdone");} }]), n;}(Gc);xi(Sp, "idName", "sync"), xi(Sp, "cmdParser", { cmdMap: { "5_1": "sync" }, cmdConfig: { sync: { sid: 5, cid: 1, service: "sync", params: [{ type: "Property", name: "sync" }], response: [{ type: "Number", name: "timetag" }] } }, serializeMap: { sync: { myInfo: 1, offlineMsgs: 2, teams: 3, roamingMsgs: 7, relations: 9, friends: 11, friendUsers: 13, msgReceipts: 14, myTeamMembers: 15, donnop: 16, recallMsg: 17, sessionAck: 18, broadcastMsgs: 20, superTeams: 22, myInfoInSuperTeams: 23, superTeamRoamingMsgs: 24, deleteSuperTeamMsg: 25, superTeamSessionAck: 26, deleteMsgSelf: 27, stickTopSessions: 28, sessionHistoryMsgsDelete: 29 } }, deserializeMap: {} });function kp(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var wp = function (e) {di(n, e);var t,r = kp(n);function n(e) {var t;return ei(this, n), xi(ni(t = r.call(this, "misc", e)), "nosCdnHostTimer", void 0), t.core = e, t.nosCdnHostTimer = 0, t;}return ri(n, [{ key: "getNosCdnHost", value: (t = Za(Ei.mark(function e() {var t,r,n,a,i,o = this;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return e.prev = 0, e.next = 3, this.core.sendCmd("getNosCdnHost");case 3:n = e.sent, e.next = 10;break;case 6:return e.prev = 6, e.t0 = e.catch(0), this.logger.error("getNosCdnHost::error", e.t0), e.abrupt("return");case 10:a = null === (t = n) || void 0 === t || null === (r = t.content) || void 0 === r ? void 0 : r.nosConfigTag, 0 !== (i = au(null == a ? void 0 : a.expire)) && a.cdnDomain ? -1 === i ? (rs.cdn.bucket = a.bucket, rs.cdn.cdnDomain = a.cdnDomain, rs.cdn.objectNamePrefix = a.objectNamePrefix) : (rs.cdn.bucket = a.bucket, rs.cdn.cdnDomain = a.cdnDomain, rs.cdn.objectNamePrefix = a.objectNamePrefix, this.nosCdnHostTimer && clearTimeout(this.nosCdnHostTimer), this.nosCdnHostTimer = xo(function () {o.getNosCdnHost();}, 1e3 * i)) : (rs.cdn.bucket = "", rs.cdn.cdnDomain = "", rs.cdn.objectNamePrefix = "");case 13:case "end":return e.stop();}}}, e, this, [[0, 6]]);})), function () {return t.apply(this, arguments);}) }]), n;}(Gc);xi(wp, "idName", "misc"), xi(wp, "cmdParser", { cmdMap: { "6_26": "getNosCdnHost" }, cmdConfig: { getNosCdnHost: { sid: 6, cid: 26, service: "misc", response: [{ type: "Property", name: "nosConfigTag" }] } }, serializeMap: {}, deserializeMap: { nosConfigTag: { 1: "bucket", 2: "cdnDomain", 3: "expire", 4: "objectNamePrefix" } } });var xp = function xp(e) {return "symbol" == typeof e || pc(e) && "[object Symbol]" == Jo(e);},Ip = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ep = /^\w*$/;var Ap = function Ap(e, t) {if (fu(e)) return !1;var r = typeof e;return !("number" != r && "symbol" != r && "boolean" != r && null != e && !xp(e)) || Ep.test(e) || !Ip.test(e) || null != t && e in Object(t);},_p = Uo["__core-js_shared__"],Cp = function () {var e = /[^.]+$/.exec(_p && _p.keys && _p.keys.IE_PROTO || "");return e ? "Symbol(src)_1." + e : "";}();var Pp = function Pp(e) {return !!Cp && Cp in e;},jp = Function.prototype.toString;var Op = function Op(e) {if (null != e) {try {return jp.call(e);} catch (e) {}try {return e + "";} catch (e) {}}return "";},Rp = /^\[object .+?Constructor\]$/,Lp = Function.prototype,Np = Object.prototype,Fp = Lp.toString,qp = Np.hasOwnProperty,Up = RegExp("^" + Fp.call(qp).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");var Dp = function Dp(e) {return !(!Yo(e) || Pp(e)) && (Xo(e) ? Up : Rp).test(Op(e));};var Bp = function Bp(e, t) {return null == e ? void 0 : e[t];};var Hp = function Hp(e, t) {var r = Bp(e, t);return Dp(r) ? r : void 0;},zp = Hp(Object, "create");var Vp = function Vp() {this.__data__ = zp ? zp(null) : {}, this.size = 0;};var Wp = function Wp(e) {var t = this.has(e) && delete this.__data__[e];return this.size -= t ? 1 : 0, t;},$p = Object.prototype.hasOwnProperty;var Kp = function Kp(e) {var t = this.__data__;if (zp) {var r = t[e];return "__lodash_hash_undefined__" === r ? void 0 : r;}return $p.call(t, e) ? t[e] : void 0;},Gp = Object.prototype.hasOwnProperty;var Jp = function Jp(e) {var t = this.__data__;return zp ? void 0 !== t[e] : Gp.call(t, e);};var Yp = function Yp(e, t) {var r = this.__data__;return this.size += this.has(e) ? 0 : 1, r[e] = zp && void 0 === t ? "__lodash_hash_undefined__" : t, this;};function Qp(e) {var t = -1,r = null == e ? 0 : e.length;for (this.clear(); ++t < r;) {var n = e[t];this.set(n[0], n[1]);}}Qp.prototype.clear = Vp, Qp.prototype.delete = Wp, Qp.prototype.get = Kp, Qp.prototype.has = Jp, Qp.prototype.set = Yp;var Xp = Qp;var Zp = function Zp() {this.__data__ = [], this.size = 0;};var em = function em(e, t) {return e === t || e != e && t != t;};var tm = function tm(e, t) {for (var r = e.length; r--;) {if (em(e[r][0], t)) return r;}return -1;},rm = Array.prototype.splice;var nm = function nm(e) {var t = this.__data__,r = tm(t, e);return !(r < 0) && (r == t.length - 1 ? t.pop() : rm.call(t, r, 1), --this.size, !0);};var am = function am(e) {var t = this.__data__,r = tm(t, e);return r < 0 ? void 0 : t[r][1];};var im = function im(e) {return tm(this.__data__, e) > -1;};var om = function om(e, t) {var r = this.__data__,n = tm(r, e);return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;};function sm(e) {var t = -1,r = null == e ? 0 : e.length;for (this.clear(); ++t < r;) {var n = e[t];this.set(n[0], n[1]);}}sm.prototype.clear = Zp, sm.prototype.delete = nm, sm.prototype.get = am, sm.prototype.has = im, sm.prototype.set = om;var cm = sm,um = Hp(Uo, "Map");var lm = function lm() {this.size = 0, this.__data__ = { hash: new Xp(), map: new (um || cm)(), string: new Xp() };};var pm = function pm(e) {var t = typeof e;return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e;};var mm = function mm(e, t) {var r = e.__data__;return pm(t) ? r["string" == typeof t ? "string" : "hash"] : r.map;};var dm = function dm(e) {var t = mm(this, e).delete(e);return this.size -= t ? 1 : 0, t;};var fm = function fm(e) {return mm(this, e).get(e);};var ym = function ym(e) {return mm(this, e).has(e);};var vm = function vm(e, t) {var r = mm(this, e),n = r.size;return r.set(e, t), this.size += r.size == n ? 0 : 1, this;};function gm(e) {var t = -1,r = null == e ? 0 : e.length;for (this.clear(); ++t < r;) {var n = e[t];this.set(n[0], n[1]);}}gm.prototype.clear = lm, gm.prototype.delete = dm, gm.prototype.get = fm, gm.prototype.has = ym, gm.prototype.set = vm;var hm = gm;function bm(e, t) {if ("function" != typeof e || null != t && "function" != typeof t) throw new TypeError("Expected a function");var r = function r() {var n = arguments,a = t ? t.apply(this, n) : n[0],i = r.cache;if (i.has(a)) return i.get(a);var o = e.apply(this, n);return r.cache = i.set(a, o) || i, o;};return r.cache = new (bm.Cache || hm)(), r;}bm.Cache = hm;var Tm = bm;var Mm = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Sm = /\\(\\)?/g,km = function (e) {var t = Tm(e, function (e) {return 500 === r.size && r.clear(), e;}),r = t.cache;return t;}(function (e) {var t = [];return 46 === e.charCodeAt(0) && t.push(""), e.replace(Mm, function (e, r, n, a) {t.push(n ? a.replace(Sm, "$1") : r || e);}), t;}),wm = km;var xm = function xm(e, t) {for (var r = -1, n = null == e ? 0 : e.length, a = Array(n); ++r < n;) {a[r] = t(e[r], r, e);}return a;},Im = Do ? Do.prototype : void 0,Em = Im ? Im.toString : void 0;var Am = function e(t) {if ("string" == typeof t) return t;if (fu(t)) return xm(t, e) + "";if (xp(t)) return Em ? Em.call(t) : "";var r = t + "";return "0" == r && 1 / t == -Infinity ? "-0" : r;};var _m = function _m(e) {return null == e ? "" : Am(e);};var Cm = function Cm(e, t) {return fu(e) ? e : Ap(e, t) ? [e] : wm(_m(e));};var Pm = function Pm(e) {if ("string" == typeof e || xp(e)) return e;var t = e + "";return "0" == t && 1 / e == -Infinity ? "-0" : t;};var jm = function jm(e, t) {for (var r = 0, n = (t = Cm(t, e)).length; null != e && r < n;) {e = e[Pm(t[r++])];}return r && r == n ? e : void 0;},Om = function () {try {var e = Hp(Object, "defineProperty");return e({}, "", {}), e;} catch (e) {}}();var Rm = function Rm(e, t, r) {"__proto__" == t && Om ? Om(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 }) : e[t] = r;},Lm = Object.prototype.hasOwnProperty;var Nm = function Nm(e, t, r) {var n = e[t];Lm.call(e, t) && em(n, r) && (void 0 !== r || t in e) || Rm(e, t, r);};var Fm = function Fm(e, t, r, n) {if (!Yo(e)) return e;for (var a = -1, i = (t = Cm(t, e)).length, o = i - 1, s = e; null != s && ++a < i;) {var c = Pm(t[a]),u = r;if ("__proto__" === c || "constructor" === c || "prototype" === c) return e;if (a != o) {var l = s[c];void 0 === (u = n ? n(l, c, s) : void 0) && (u = Yo(l) ? l : hu(t[a + 1]) ? [] : {});}Nm(s, c, u), s = s[c];}return e;};var qm = function qm(e, t, r) {for (var n = -1, a = t.length, i = {}; ++n < a;) {var o = t[n],s = jm(e, o);r(s, o) && Fm(i, Cm(o, e), s);}return i;};var Um = function Um(e, t) {return null != e && t in Object(e);};var Dm = function Dm(e, t, r) {for (var n = -1, a = (t = Cm(t, e)).length, i = !1; ++n < a;) {var o = Pm(t[n]);if (!(i = null != e && r(e, o))) break;e = e[o];}return i || ++n != a ? i : !!(a = null == e ? 0 : e.length) && bu(a) && hu(o, a) && (fu(e) || du(e));};var Bm = function Bm(e, t) {return null != e && Dm(e, t, Um);};var Hm = function Hm(e, t) {return qm(e, t, function (t, r) {return Bm(e, r);});};var zm = function zm(e, t) {for (var r = -1, n = t.length, a = e.length; ++r < n;) {e[a + r] = t[r];}return e;},Vm = Do ? Do.isConcatSpreadable : void 0;var Wm = function Wm(e) {return fu(e) || du(e) || !!(Vm && e && e[Vm]);};var $m = function e(t, r, n, a, i) {var o = -1,s = t.length;for (n || (n = Wm), i || (i = []); ++o < s;) {var c = t[o];r > 0 && n(c) ? r > 1 ? e(c, r - 1, n, a, i) : zm(i, c) : a || (i[i.length] = c);}return i;};var Km = function Km(e) {return (null == e ? 0 : e.length) ? $m(e, 1) : [];};var Gm = function Gm(e, t, r) {switch (r.length) {case 0:return e.call(t);case 1:return e.call(t, r[0]);case 2:return e.call(t, r[0], r[1]);case 3:return e.call(t, r[0], r[1], r[2]);}return e.apply(t, r);},Jm = Math.max;var Ym = function Ym(e, t, r) {return t = Jm(void 0 === t ? e.length - 1 : t, 0), function () {for (var n = arguments, a = -1, i = Jm(n.length - t, 0), o = Array(i); ++a < i;) {o[a] = n[t + a];}a = -1;for (var s = Array(t + 1); ++a < t;) {s[a] = n[a];}return s[t] = r(o), Gm(e, this, s);};},Qm = Om ? function (e, t) {return Om(e, "toString", { configurable: !0, enumerable: !1, value: iu(t), writable: !0 });} : qu,Xm = Date.now;var Zm = function Zm(e) {var t = 0,r = 0;return function () {var n = Xm(),a = 16 - (n - r);if (r = n, a > 0) {if (++t >= 800) return arguments[0];} else t = 0;return e.apply(void 0, arguments);};},ed = Zm(Qm);var td = function (e) {return ed(Ym(e, void 0, Km), e + "");}(function (e, t) {return null == e ? {} : Hm(e, t);});function rd(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var nd = function (e) {di(a, e);var t,r,n = rd(a);function a(e) {var t;return ei(this, a), xi(ni(t = n.call(this, "user", e)), "myInfo", void 0), t.myInfo = Nl({}), t;}return ri(a, [{ key: "setBlack", value: function value(e) {return hc({ account: { type: "string", allowEmpty: !1 }, isAdd: { type: "boolean" } }, e), this.core.sendCmd("setBlack", e).then(function () {});} }, { key: "setMute", value: function value(e) {return hc({ account: { type: "string", allowEmpty: !1 }, isAdd: { type: "boolean" } }, e), this.core.sendCmd("setMute", e).then(function () {});} }, { key: "getRelations", value: function value() {return this.core.sendCmd("syncRelations", { timetag: 0 });} }, { key: "getBlackList", value: (r = Za(Ei.mark(function e() {var t;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return e.next = 2, this.core.sendCmd("syncRelations", { timetag: 0 });case 2:return t = e.sent, e.abrupt("return", t.blackList || []);case 4:case "end":return e.stop();}}}, e, this);})), function () {return r.apply(this, arguments);}) }, { key: "getMuteList", value: (t = Za(Ei.mark(function e() {var t;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return e.next = 2, this.core.sendCmd("syncRelations", { timetag: 0 });case 2:return t = e.sent, e.abrupt("return", t.muteList || []);case 4:case "end":return e.stop();}}}, e, this);})), function () {return t.apply(this, arguments);}) }, { key: "getUsersNameCardFromServer", value: function value(e) {var t = this;return hc({ accounts: { type: "array", max: 150, itemType: "string" } }, e), this.core.sendCmd("getUsersNameCardFromServer", td(e, ["accounts"])).then(function (r) {var n,a = r.content;return t.logger.log("user:: getUsers done", e.accounts), a && a.users ? ws(n = a.users).call(n, function (e) {return Nl(e);}) : [];});} }, { key: "updateMyNameCard", value: function value(e) {var t = this;if (hc({ nick: { type: "string", required: !1 }, avatar: { type: "string", required: !1 }, signature: { type: "string", required: !1 }, gender: { type: "enum", values: es(dl), required: !1 }, email: { type: "string", required: !1 }, birth: { type: "string", required: !1 }, tel: { type: "string", required: !1 }, ext: { type: "string", required: !1 } }, e), 0 === Fi(e).length) return Qa.resolve(this.myInfo);var r = td(e, ["nick", "avatar", "signature", "email", "birth", "tel", "ext"]);return e.gender && (r.gender = dl[e.gender]), this.core.sendCmd("updateMyNameCard", { user: r }).then(function (n) {var a = n.content;return a && a.timetag && t.core.emit("_updateTimetag", { myInfo: +a.timetag }), e.gender && (r.gender = e.gender), t.myInfo = Ps({}, t.myInfo, r), t.myInfo;});} }, { key: "onUpdateBlackListHandler", value: function value(e) {var t = e.content;t.account ? this.core.emit("updateBlackList", t) : this.logger.warn("onUpdateBlackListHandler: no account");} }, { key: "onUpdateMuteListHandler", value: function value(e) {var t = e.content;t.account ? this.core.emit("updateMuteList", t) : this.logger.warn("onUpdateBlackListHandler: no account");} }, { key: "syncRelationsHandler", value: function value(e) {var t,r = e.content,n = r.list,a = r.timetag,i = { blackList: [], muteList: [] };(a && this.core.emit("_updateTimetag", { relations: a }), n && n.length) && Li(t = n).call(t, function (e) {var t = function (e) {var t = { account: e.account, updateTime: +e.updateTime, createTime: +e.createTime };return "1" === e.isMuted && (t.isMuted = !0), "1" === e.isBlack && (t.isBlack = !0), t;}(e);t.isBlack && i.blackList.push(t), t.isMuted && i.muteList.push(t);});return this.core.emit("relations", i), Qa.resolve(i);} }, { key: "syncMyNameCardHandler", value: function value(e) {e.content.user && (this.myInfo = Nl(e.content.user), this.core.emit("syncMyNameCard", this.myInfo), this.core.emit("_updateTimetag", { myInfo: e.content.timetag }));} }, { key: "onUpdateMyNameCardHandler", value: function value(e) {var t = e.content.user;t ? (Ps(this.myInfo, Nl(t)), this.core.emit("updateMyNameCard", this.myInfo)) : this.logger.warn("onUpdateMyNameCardHandler no user info");} }]), a;}(Gc);xi(nd, "idName", "user"), xi(nd, "cmdParser", { cmdMap: { "3_1": "updatePushToken", "3_2": "updateAppBackground", "3_7": "getUsersNameCardFromServer", "3_10": "updateMyNameCard", "3_109": "syncMyNameCard", "3_110": "onUpdateMyNameCard", "3_3": "setBlack", "3_103": "onUpdateBlackList", "3_5": "setMute", "3_105": "onUpdateMuteList", "3_8": "syncRelations" }, cmdConfig: { updatePushToken: { sid: 3, cid: 1, service: "user", params: [{ type: "String", name: "tokenName" }, { type: "String", name: "token" }, { type: "Int", name: "pushkit" }] }, updateAppBackground: { sid: 3, cid: 2, service: "user", params: [{ type: "Boolean", name: "isBackground" }, { type: "Int", name: "badge" }] }, syncMyNameCard: { sid: 3, cid: 109, service: "user", response: [{ type: "Property", name: "user" }, { type: "Number", name: "timetag" }] }, setBlack: { service: "user", sid: 3, cid: 3, params: [{ type: "String", name: "account" }, { type: "bool", name: "isAdd" }] }, onUpdateBlackList: { service: "user", sid: 3, cid: 103, response: [{ type: "String", name: "account" }, { type: "Boolean", name: "isAdd" }] }, setMute: { service: "user", sid: 3, cid: 5, params: [{ type: "String", name: "account" }, { type: "bool", name: "isAdd" }] }, onUpdateMuteList: { service: "user", sid: 3, cid: 105, response: [{ type: "String", name: "account" }, { type: "Boolean", name: "isAdd" }] }, syncRelations: { service: "user", sid: 3, cid: 8, params: [{ type: "long", name: "timetag" }], response: [{ type: "PropertyArray", name: "list", entity: "relationMember" }, { type: "Number", name: "timetag" }] }, getUsersNameCardFromServer: { service: "user", sid: 3, cid: 7, params: [{ type: "StrArray", name: "accounts" }], response: [{ type: "PropertyArray", name: "users", entity: "user" }] }, updateMyNameCard: { service: "user", sid: 3, cid: 10, params: [{ type: "Property", name: "user" }], response: [{ type: "Number", name: "timetag" }] }, onUpdateMyNameCard: { service: "user", sid: 3, cid: 110, response: [{ type: "Property", name: "user" }] } }, serializeMap: { user: { account: 1, nick: 3, avatar: 4, signature: 5, gender: 6, email: 7, birth: 8, tel: 9, ext: 10, createTime: 12, updateTime: 13 }, relationMember: { account: 0, isMuted: 1, isBlack: 2, createTime: 3, updateTime: 4 } }, deserializeMap: { user: { 1: "account", 3: "nick", 4: "avatar", 5: "signature", 6: "gender", 7: "email", 8: "birth", 9: "tel", 10: "ext", 12: "createTime", 13: "updateTime" }, relationMember: { 0: "account", 1: "isMuted", 2: "isBlack", 3: "createTime", 4: "updateTime" } } });var ad = Ur,id = [].reverse,od = [1, 2];z({ target: "Array", proto: !0, forced: String(od) === String(od.reverse()) }, { reverse: function reverse() {return He(this) && (this.length = this.length), id.call(this);} });var sd = fr("Array").reverse,cd = Array.prototype,ud = function ud(e) {var t = e.reverse;return e === cd || e instanceof Array && t === cd.reverse ? sd : t;};function ld(e, t) {var r;if (void 0 === Mi || null == ad(e)) {if (Bs(e) || (r = function (e, t) {var r;if (!e) return;if ("string" == typeof e) return pd(e, t);var n = eo(r = Object.prototype.toString.call(e)).call(r, 8, -1);"Object" === n && e.constructor && (n = e.constructor.name);if ("Map" === n || "Set" === n) return Ks(e);if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return pd(e, t);}(e)) || t && e && "number" == typeof e.length) {r && (e = r);var _n2 = 0,a = function a() {};return { s: a, n: function n() {return _n2 >= e.length ? { done: !0 } : { done: !1, value: e[_n2++] };}, e: function e(_e2) {throw _e2;}, f: a };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var i,o = !0,s = !1;return { s: function s() {r = Vs(e);}, n: function n() {var e = r.next();return o = e.done, e;}, e: function e(_e3) {s = !0, i = _e3;}, f: function f() {try {o || null == r.return || r.return();} finally {if (s) throw i;}} };}function pd(e, t) {(null == t || t > e.length) && (t = e.length);for (var r = 0, n = new Array(t); r < t; r++) {n[r] = e[r];}return n;}function md(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var dd = function (e) {di(n, e);var t,r = md(n);function n(e) {var t;return ei(this, n), xi(ni(t = r.call(this, "session", e)), "list", new ho()), t.core.on("logined", function () {t.initEventListeners();}), t;}return ri(n, [{ key: "initEventListeners", value: function value() {var e,t,r,n,a,i = this;this.core.on("syncRoamingMsgs", Mo(e = this.onSyncMsgs).call(e, this)), this.core.on("syncOfflineMsgs", Mo(t = this.onSyncMsgs).call(t, this)), this.core.on("_updateSessionMsgReceiptTime", Mo(r = this.updateSessionMsgReceiptTime).call(r, this)), this.core.on("msg", Mo(n = this.updateSessionWithMsg).call(n, this)), this.core.on("_sendMsg", Mo(a = this.updateSessionWithMsg).call(a, this)), this.core.on("onClearServerHistoryMsgs", function (e) {i.updateSession({ id: e.sessionId, lastMsg: null, unread: 0 }, !0);});} }, { key: "createSession", value: function value(e, t) {var r = e.split("-");return { id: e, scene: r[0], to: r[1], lastMsg: t || null, updateTime: t ? t.time : 0, unread: 0, ack: 0 };} }, { key: "getSession", value: function value(e) {return hc({ id: { type: "string", allowEmpty: !1 } }, e), this.list.get(e.id);} }, { key: "getSessions", value: function value(e) {hc({ limit: { type: "number", required: !1 }, lastSessionId: { type: "string", allowEmpty: !1, required: !1 }, desc: { type: "boolean", required: !1 } }, e);var t = [],r = e.limit,n = void 0 === r ? 100 : r,a = e.desc,i = void 0 === a || a,o = e.lastSessionId,s = 0;if (i) {var c,u,l = ld(this.list);try {for (l.s(); !(u = l.n()).done;) {var p = Js(u.value, 2),m = p[0],d = p[1];if (o === m) break;d.lastMsg && t.push(d);}} catch (e) {l.e(e);} finally {l.f();}return ud(c = eo(t).call(t, -n)).call(c);}var f,y = ld(this.list);try {for (y.s(); !(f = y.n()).done;) {var v = Js(f.value, 2),g = v[0],h = v[1];if (o) g === o && (o = void 0);else if (h.lastMsg) {if (++s > n) break;t.push(h);}}} catch (e) {y.e(e);} finally {y.f();}return t;} }, { key: "resetSessionUnreadCount", value: function value(e) {var t = this,r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];hc({ id: { type: "string", allowEmpty: !1 } }, e);var n = e.id,a = this.list.get(n);if (!a) return this.logger.warn("resetSessionUnreadCount: can not find session " + n), Qa.reject("can not find session " + n);if (!a.lastMsg) return this.logger.warn("resetSessionUnreadCount: session ".concat(n, ", no lastMsg")), Qa.reject("session ".concat(n, " is not completly, no lastMsg"));if (a.ack && a.ack >= a.lastMsg.time) return Qa.resolve();var i = n.split("-"),o = { to: i[1], timetag: a.lastMsg.time },s = "markSuperTeamSessionAck";return "superTeam" !== i[0] && (o.scene = "p2p" === i[0] ? 0 : 1, s = "markSessionAck"), this.core.sendCmd(s, o).then(function () {var e = t.storeUnreadByAck(n, o.timetag);e && r && t.core.emit("updateSession", e);});} }, { key: "resetAllSessionsUnreadCount", value: function value() {var e,t = this,r = [];return Li(e = this.list).call(e, function (e) {e.unread > 0 && e.lastMsg && r.push(t.resetSessionUnreadCount({ id: e.id }));}), Qa.race(r);} }, { key: "deleteSession", value: (t = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (hc({ id: { type: "string", allowEmpty: !1 }, isSyncToServer: { type: "boolean", required: !1 } }, t), this.list.delete(t.id), !this.core.msgLog || !t.isSyncToServer) {e.next = 5;break;}return e.next = 5, this.core.msgLog.deleteRoamingMsgs({ ids: [t.id] });case 5:case "end":return e.stop();}}}, e, this);})), function (e) {return t.apply(this, arguments);}) }, { key: "deleteAllSessionsFromLocal", value: function value() {this.list.clear();} }, { key: "updateSessionWithMsg", value: function value(e) {var t = this.list.get(e.sessionId) || this.createSession(e.sessionId, e),r = !1;if (this.logger.log("session: onMsg", e.sessionId, e.idClient, e.idServer), (!t.lastMsg || t.lastMsg.time < e.time || e.status === ol[ol.sending]) && (t.lastMsg = e, t.updateTime = e.time, r = !0), e.status === ol[ol.unread] && e.time > (t.ack || 0)) {t.unread++;var n = t.unreadMsgs || [];n.unshift(e), ll(n).call(n, function (e, t) {return t.time - e.time;}), r = !0;}r && (this.logger.log("session: onMsg updatesession", t.unread, t.lastMsg.idClient), this.list.set(t.id, t), this.core.emit("updateSession", t));} }, { key: "updateSessionMsgReceiptTime", value: function value(e) {var t = this;e && e.length > 0 && Li(e).call(e, function (e) {var r = t.list.get("p2p-".concat(e.from));if (r) {var n,a = au(e.time);if (!r.msgReceiptTime || r.msgReceiptTime < a) r.msgReceiptTime = a, t.logger.log(Ki(n = "session: update session msgReceiptTime: ".concat(r.msgReceiptTime, ", from msg ")).call(n, e.idClient)), t.list.set(r.id, r), t.core.emit("updateSession", r);}});} }, { key: "storeUnreadByAck", value: function value(e, t) {var r = this.list.get(e) || this.createSession(e);if (!(r.ack && t < r.ack)) {var n = r.unreadMsgs || [],a = [],i = 0;return n.length > 0 && (Li(n).call(n, function (e) {e.time > t && (i++, a.push(e));}), r.unreadMsgs = ll(a).call(a, function (e, t) {return t.time - e.time;})), r.ack = t, r.unread = i, this.list.set(e, r), r;}this.logger.warn("storeUnreadByAck: not need update ack", e, t, r.ack);} }, { key: "updateSession", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],r = e.id,n = this.list.get(r) || this.createSession(e.id),a = Ps(n, e);return this.list.set(r, a), this.logger.log("updateSession: update", t, td(e, ["id", "ack", "unread"]), a.lastMsg && a.lastMsg.idClient), t && this.core.emit("updateSession", e), a;} }, { key: "syncSessionAckHandler", value: function value(e) {var t,r,n = this,a = e.content.p2p || {},i = e.content.team.m_map || {};this.logger.log("syncSessionAck::", a, i), Li(t = Fi(a)).call(t, function (e) {n.updateSession({ id: "p2p-" + e, ack: a[e] }, !1);}), Li(r = Fi(i)).call(r, function (e) {n.updateSession({ id: "team-" + e, ack: i[e] }, !1);}), this.core.emit("_updateTimetag", { sessionAck: e.content.timetag });} }, { key: "syncSuperTeamSessionAckHandler", value: function value(e) {var t,r = this,n = e.content.superTeam;this.logger.log("syncSuperTeamSessionAck::", n), Li(t = Fi(n)).call(t, function (e) {r.updateSession({ id: "superTeam-" + e, ack: n[e] }, !1);}), this.core.emit("_updateTimetag", { superTeamSessionAck: e.content.timetag });} }, { key: "syncMarkSessionAckHandler", value: function value(e) {var t,r = e.content,n = 0 === r.scene ? "p2p" : 1 === r.scene ? "team" : "superTeam",a = Ki(t = "".concat(n, "-")).call(t, r.to),i = this.list.get(a);if (i && i.ack && r.timetag < i.ack) this.logger.warn("syncMarkSessionAckHandler: ".concat(a, " do not need update ack"), i.ack, r.timetag);else {var o = this.storeUnreadByAck(a, r.timetag);o && this.core.emit("updateSession", o);}} }, { key: "onSyncDone", value: function value() {var e,t,r,n = this,a = [];Li(e = this.list).call(e, function (e, t) {a.push(n.storeUnreadByAck(t, e.ack || 0));}), this.list.clear(), Li(t = ll(a).call(a, function (e, t) {return e.updateTime - t.updateTime;})).call(t, function (e) {n.list.set(e.id, e);}), (a = ll(r = gr(a).call(a, function (e) {return e.lastMsg;})).call(r, function (e, t) {return t.updateTime - e.updateTime;})).length > 0 && this.core.emit("sessions", a);} }, { key: "onSyncMsgs", value: function value(e) {var t,r,n,a = this.list.get(e.sessionId),i = e.msgs[e.msgs.length - 1];(e.msgs[0].time > i.time && (i = e.msgs[0]), a || (a = this.createSession(i.sessionId, i)), a.unreadMsgs) ? a.unreadMsgs = gr(t = Ki(r = e.msgs).call(r, a.unreadMsgs)).call(t, function (e) {return e.status === ol[ol.unread];}) : a.unreadMsgs = gr(n = e.msgs).call(n, function (e) {return e.status === ol[ol.unread];});(!a.updateTime || a.updateTime < i.time) && (a.updateTime = i.time), (!a.lastMsg || a.lastMsg.time < i.time) && (a.lastMsg = i), this.list.set(a.id, a);} }]), n;}(Gc);xi(dd, "idName", "session"), xi(dd, "cmdParser", { cmdMap: { "4_14": "syncSessionAck", "4_20": "syncSuperTeamSessionAck", "7_16": "markSessionAck", "7_116": "syncMarkSessionAck", "21_25": "markSuperTeamSessionAck", "21_125": "syncMarkSessionAck" }, cmdConfig: { syncSessionAck: { sid: 4, cid: 14, service: "session", response: [{ type: "StrLongMap", name: "p2p" }, { type: "LongLongMap", name: "team" }, { type: "Number", name: "timetag" }] }, syncSuperTeamSessionAck: { sid: 4, cid: 20, service: "session", response: [{ type: "LongLongMap", name: "superTeam" }, { type: "Number", name: "timetag" }] }, markSessionAck: { sid: 7, cid: 16, service: "session", params: [{ type: "byte", name: "scene" }, { type: "String", name: "to" }, { type: "long", name: "timetag" }] }, syncMarkSessionAck: { sid: 7, cid: 116, service: "session", response: [{ type: "byte", name: "scene" }, { type: "String", name: "to" }, { type: "long", name: "timetag" }] }, markSuperTeamSessionAck: { sid: 21, cid: 25, service: "session", params: [{ type: "long", name: "to" }, { type: "long", name: "timetag" }] } }, serializeMap: { sessionAckTag: { scene: 1, to: 2, timetag: 3 } }, deserializeMap: {} });var fd = function () {function e(t) {ei(this, e), xi(this, "core", void 0), this.core = t;}return ri(e, [{ key: "notifyAddTeamMembers", value: function value(e, t) {this.core.emit("addTeamMembers", { team: e, accounts: t, members: Ll(e, t) });} }, { key: "notifyUpdateTeamManagers", value: function value(e, t, r, n) {this.core.emit("updateTeamManagers", { team: { teamId: e, memberUpdateTime: n }, accounts: t, isManager: r, members: ws(t).call(t, function (t) {var r;return { id: Ki(r = "".concat(e, "-")).call(r, t), type: "manager", updateTime: n };}) });} }, { key: "notifyRemoveTeamMembers", value: function value(e, t) {this.core.emit("removeTeamMembers", { team: e, accounts: t });} }, { key: "notifyTransferTeam", value: function value(e, t, r) {var n, a;this.core.emit("transferTeam", { team: e, from: { id: Ki(n = "".concat(e.teamId, "-")).call(n, t), type: "normal", updateTime: e.memberUpdateTime }, to: { id: Ki(a = "".concat(e.teamId, "-")).call(a, r), type: "owner", updateTime: e.memberUpdateTime } });} }, { key: "notifyUpdateTeamMembersMute", value: function value(e, t, r) {this.core.emit("updateTeamMembersMute", { team: e, accounts: t, members: ws(t).call(t, function (t) {var n;return { id: Ki(n = "".concat(e.teamId, "-")).call(n, t), account: t, teamId: e.teamId, mute: r, updateTime: e.memberUpdateTime };}), mute: r });} }]), e;}();function yd(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function vd(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = yd(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = yd(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function gd(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var hd,bd,Td = function (e) {di(I, e);var t,r,n,a,i,o,s,c,u,l,p,m,d,f,y,v,g,h,b,T,M,S,k,w,x = gd(I);function I(e) {var t;return ei(this, I), xi(ni(t = x.call(this, "team", e)), "service", void 0), t.service = new fd(e), t.core.on("_notification", function (e) {return t.notificationHandler(e);}), t;}return ri(I, [{ key: "getTeamInfo", value: (w = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("getTeamInfo", { teamId: t.teamId });case 3:return r = e.sent, n = r.content.team, e.abrupt("return", Al(n));case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return w.apply(this, arguments);}) }, { key: "getTeams", value: (k = Za(Ei.mark(function e() {var t, r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return e.next = 2, this.core.sendCmd("getTeams", { timetag: 0 });case 2:return t = e.sent, r = t.content.teams, e.abrupt("return", _l(r));case 5:case "end":return e.stop();}}}, e, this);})), function () {return k.apply(this, arguments);}) }, { key: "getTeamsById", value: (S = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamIds: { type: "array", itemType: "string" } }, t), e.next = 3, this.core.sendCmd("getTeamsById", { teamIds: t.teamIds });case 3:return r = e.sent, n = _l(r.content.teams), e.abrupt("return", { teams: n, tids: r.content.tids });case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return S.apply(this, arguments);}) }, { key: "createTeam", value: (M = Za(Ei.mark(function e(t) {var r, n, a;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ type: { type: "enum", values: ["advanced", "normal"] }, name: { type: "string", allowEmpty: !1 }, level: { type: "number", required: !1 }, accounts: { type: "array", itemType: "string", required: !1 }, ps: { type: "string", allowEmpty: !1, max: 5e3, required: !1 }, joinMode: { type: "enum", values: ["noVerify", "needVerify", "rejectAll"], required: !1 }, beInviteMode: { type: "enum", values: ["noVerify", "needVerify"], required: !1 }, inviteMode: { type: "enum", values: ["manager", "all"], required: !1 }, updateTeamMode: { type: "enum", values: ["manager", "all"], required: !1 }, updateExtMode: { type: "enum", values: ["manager", "all"], required: !1 }, intro: { type: "string", allowEmpty: !1, required: !1 }, announcement: { type: "string", allowEmpty: !1, required: !1 }, avatar: { type: "string", allowEmpty: !1, required: !1 }, ext: { type: "string", allowEmpty: !1, required: !1 } }, t), r = Cl(t), e.next = 4, this.core.sendCmd("createTeam", { team: r, accounts: t.accounts || [], ps: t.ps || "" });case 4:return n = e.sent, a = Al(n.content.team), e.abrupt("return", a);case 7:case "end":return e.stop();}}}, e, this);})), function (e) {return M.apply(this, arguments);}) }, { key: "dismissTeam", value: (T = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("dismissTeam", { teamId: t.teamId });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return T.apply(this, arguments);}) }, { key: "leaveTeam", value: (b = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("leaveTeam", { teamId: t.teamId });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return b.apply(this, arguments);}) }, { key: "transferTeam", value: (h = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, account: { type: "string", allowEmpty: !1 }, leave: { type: "boolean" } }, t), e.next = 3, this.core.sendCmd("transferTeam", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return h.apply(this, arguments);}) }, { key: "updateTeamInfo", value: (g = Za(Ei.mark(function e(t) {var r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, joinMode: { type: "enum", values: ["noVerify", "needVerify", "rejectAll"], required: !1 }, beInviteMode: { type: "enum", values: ["noVerify", "needVerify"], required: !1 }, inviteMode: { type: "enum", values: ["manager", "all"], required: !1 }, updateTeamMode: { type: "enum", values: ["manager", "all"], required: !1 }, updateExtMode: { type: "enum", values: ["manager", "all"], required: !1 }, intro: { type: "string", allowEmpty: !1, required: !1 }, announcement: { type: "string", allowEmpty: !1, required: !1 }, avatar: { type: "string", allowEmpty: !1, required: !1 }, ext: { type: "string", allowEmpty: !1, required: !1 } }, t), r = Cl(t), e.next = 4, this.core.sendCmd("updateTeamInfo", { team: r });case 4:return e.abrupt("return", Al(r));case 5:case "end":return e.stop();}}}, e, this);})), function (e) {return g.apply(this, arguments);}) }, { key: "getTeamMembers", value: (v = Za(Ei.mark(function e(t) {var r, n, a;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", itemType: "string", required: !1 } }, t), e.next = 3, this.core.sendCmd("getTeamMembers", { teamId: t.teamId, timetag: 0 });case 3:if (n = e.sent, a = Ol(null === (r = n.content) || void 0 === r ? void 0 : r.teamMembers), t.accounts && t.accounts.length > 0) {e.next = 7;break;}return e.abrupt("return", a);case 7:return e.abrupt("return", gr(a).call(a, function (e) {var r;return null === (r = t.accounts) || void 0 === r ? void 0 : ds(r).call(r, e.account);}));case 8:case "end":return e.stop();}}}, e, this);})), function (e) {return v.apply(this, arguments);}) }, { key: "getMutedTeamMembers", value: (y = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("getMutedTeamMembers", { teamId: t.teamId });case 3:return r = e.sent, n = r.content, e.abrupt("return", Ol(n.teamMembers));case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return y.apply(this, arguments);}) }, { key: "addTeamMembers", value: (f = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", itemType: "string", min: 1 }, ps: { type: "string", allowEmpty: !0, max: 5e3, required: !1 } }, t), e.next = 3, this.core.sendCmd("addTeamMembers", { teamId: t.teamId, accounts: t.accounts, ps: t.ps || "", attach: t.ext || "" });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return f.apply(this, arguments);}) }, { key: "removeTeamMembers", value: (d = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", itemType: "string", min: 1 } }, t), e.next = 3, this.core.sendCmd("removeTeamMembers", { teamId: t.teamId, accounts: t.accounts });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return d.apply(this, arguments);}) }, { key: "applyTeam", value: (m = Za(Ei.mark(function e(t) {var r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, ps: { type: "string", allowEmpty: !0, max: 5e3, required: !1 } }, t), e.next = 3, this.core.sendCmd("applyTeam", { teamId: t.teamId, ps: t.ps || "" });case 3:return r = e.sent, e.abrupt("return", Al(r.content.team));case 5:case "end":return e.stop();}}}, e, this);})), function (e) {return m.apply(this, arguments);}) }, { key: "addTeamManagers", value: (p = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", min: 1, itemType: "string" } }, t), e.next = 3, this.core.sendCmd("addTeamManagers", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return p.apply(this, arguments);}) }, { key: "removeTeamManagers", value: (l = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", min: 1, itemType: "string" } }, t), e.next = 3, this.core.sendCmd("removeTeamManagers", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return l.apply(this, arguments);}) }, { key: "updateMyMemberInfo", value: (u = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, nickInTeam: { type: "string", allowEmpty: !1, required: !1 }, bitConfigMask: { type: "number", min: 0, max: 2, required: !1 }, ext: { type: "string", required: !1 } }, t), r = Pl({ teamId: t.teamId, nickInTeam: t.nickInTeam, bitConfigMask: t.bitConfigMask, ext: t.ext }), e.next = 4, this.core.sendCmd("updateMyMemberInfo", { teamMember: r });case 4:return n = jl(vd({ updateTime: new Date().getTime(), account: this.core.account }, r)), this.core.emit("updateTeamMember", n), e.abrupt("return", n);case 7:case "end":return e.stop();}}}, e, this);})), function (e) {return u.apply(this, arguments);}) }, { key: "updateMemberNick", value: (c = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, account: { type: "string", allowEmpty: !1 }, nickInTeam: { type: "string", allowEmpty: !1 } }, t), r = Pl({ teamId: t.teamId, nickInTeam: t.nickInTeam, account: t.account }), e.next = 4, this.core.sendCmd("updateNickInTeam", { teamMember: r });case 4:return n = jl(vd({ updateTime: new Date().getTime() }, r)), e.abrupt("return", n);case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return c.apply(this, arguments);}) }, { key: "muteTeamMember", value: (s = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, account: { type: "string", allowEmpty: !1 }, mute: { type: "boolean" } }, t), e.next = 3, this.core.sendCmd("muteTeamMember", { teamId: t.teamId, account: t.account, mute: t.mute ? 1 : 0 });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return s.apply(this, arguments);}) }, { key: "getTeamMemberInvitorAccid", value: (o = Za(Ei.mark(function e(t) {var r, n, a;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", itemType: "string", max: 200 } }, t), n = { teamId: t.teamId }, t.accounts && t.accounts.length > 0 && (n.accounts = t.accounts), e.next = 5, this.core.sendCmd("getTeamMemberInvitorAccid", n);case 5:return a = e.sent, e.abrupt("return", (null === (r = a.content) || void 0 === r ? void 0 : r.accountsMap) || {});case 7:case "end":return e.stop();}}}, e, this);})), function (e) {return o.apply(this, arguments);}) }, { key: "muteTeam", value: (i = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, mute: { type: "boolean" } }, t), e.next = 3, this.core.sendCmd("muteTeam", { teamId: t.teamId, mute: t.mute ? 1 : 0 });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return i.apply(this, arguments);}) }, { key: "passTeamApply", value: (a = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, from: { type: "string", allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("passTeamApply", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return a.apply(this, arguments);}) }, { key: "rejectTeamApply", value: (n = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, from: { type: "string", allowEmpty: !1 }, ps: { type: "string", max: 5e3, required: !1 } }, t), e.next = 3, this.core.sendCmd("rejectTeamApply", { teamId: t.teamId, from: t.from, ps: t.ps || "" });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return n.apply(this, arguments);}) }, { key: "acceptTeamInvite", value: (r = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, from: { type: "string", allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("acceptTeamInvite", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return r.apply(this, arguments);}) }, { key: "rejectTeamInvite", value: (t = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, from: { type: "string", allowEmpty: !1 }, ps: { type: "string", max: 5e3, required: !1 } }, t), e.next = 3, this.core.sendCmd("rejectTeamInvite", { teamId: t.teamId, from: t.from, ps: t.ps || "" });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return t.apply(this, arguments);}) }, { key: "notifyTeamMsgReceiptsHandler", value: function value(e) {var t,r = null === (t = e.content) || void 0 === t ? void 0 : t.teamMsgReceipts;r && r.length > 0 && this.core.emit("teamMsgReceipts", r);} }, { key: "syncTeamsHandler", value: function value(e) {var t = e.content;this.core.emit("_updateTimetag", { teams: au(t.timetag) });var r = null == t ? void 0 : t.teams;if (r && r.length) {var n = _l(r);this.core.emit("teams", n);}} }, { key: "syncCreateTeamHandler", value: function value(e) {var t = e.content,r = Al(null == t ? void 0 : t.team),n = Rl(r, r.owner, "owner");this.core.emit("createTeam", r, n);} }, { key: "syncUpdateTeamMemberHandler", value: function value(e) {var t = e.content,r = jl(null == t ? void 0 : t.teamMember);r.updateTime || (r.updateTime = new Date().getTime()), this.core.emit("updateTeamMember", r);} }, { key: "notificationHandler", value: function value(e) {var t = e.attach,r = e.scene,n = e.from,a = e.to,i = e.time,o = e.idServer,s = e.idClient,c = t.team,u = t.account,l = t.accounts,p = t.type;if ("team" === r) switch ("debug" === this.core.options.debugLevel ? this.logger.debug("team::recvNotification", o, s, t) : this.logger.log("team::recvNotification", o, s, a, p, u, l), p) {case "updateTeam":c.updateTime = i, this.core.emit("updateTeam", c);break;case "addTeamMembers":this.service.notifyAddTeamMembers(c, l);break;case "acceptTeamInvite":this.service.notifyAddTeamMembers(c, [n]);break;case "passTeamApply":this.service.notifyAddTeamMembers(c, [u]);break;case "addTeamManagers":this.service.notifyUpdateTeamManagers(a, l, !0, i);break;case "removeTeamManagers":this.service.notifyUpdateTeamManagers(a, l, !1, i);break;case "removeTeamMembers":this.service.notifyRemoveTeamMembers(c, l);break;case "leaveTeam":this.service.notifyRemoveTeamMembers(c, [n]);break;case "dismissTeam":this.core.emit("dismissTeam", { teamId: a });break;case "transferTeam":this.service.notifyTransferTeam(c, n, u);break;case "updateTeamMemberMute":this.service.notifyUpdateTeamMembersMute(c, [u], t.mute);}} }]), I;}(Gc);xi(Td, "idName", "team"), xi(Td, "cmdParser", { cmdMap: { "8_1": "createTeam", "8_5": "addTeamMembers", "8_6": "removeTeamMembers", "8_7": "updateTeamInfo", "8_8": "leaveTeam", "8_9": "getTeamInfo", "8_10": "getTeams", "8_11": "getTeamMembers", "8_12": "dismissTeam", "8_13": "applyTeam", "8_14": "passTeamApply", "8_15": "rejectTeamApply", "8_16": "addTeamManagers", "8_17": "removeTeamManagers", "8_18": "transferTeam", "8_19": "updateMyMemberInfo", "8_20": "updateNickInTeam", "8_21": "acceptTeamInvite", "8_22": "rejectTeamInvite", "8_25": "muteTeamMember", "8_27": "getMutedTeamMembers", "8_28": "sendTeamMsgReceipt", "8_29": "getTeamMsgReads", "8_30": "getTeamMsgReadAccounts", "8_31": "notifyTeamMsgReceipts", "8_32": "muteTeam", "8_33": "getTeamMemberInvitorAccid", "8_34": "getTeamsById", "8_101": "syncCreateTeam", "8_109": "syncTeams", "8_119": "syncUpdateTeamMember" }, cmdConfig: { getTeamInfo: { sid: 8, cid: 9, service: "team", params: [{ type: "Long", name: "teamId" }], response: [{ type: "Property", name: "team" }] }, getTeams: { sid: 8, cid: 10, service: "team", params: [{ type: "long", name: "timetag" }], response: [{ type: "PropertyArray", name: "teams", entity: "team" }, { type: "Number", name: "timetag" }] }, createTeam: { sid: 8, cid: 1, service: "team", params: [{ type: "Property", name: "team" }, { type: "StrArray", name: "accounts" }, { type: "String", name: "ps" }], response: [{ type: "Property", name: "team" }, { type: "StrArray", name: "abortedAccidList" }] }, sendTeamMsgReceipt: { sid: 8, cid: 28, service: "team", params: [{ type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceiptTag" }], response: [{ type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceiptTag" }] }, getTeamMsgReads: { sid: 8, cid: 29, service: "team", params: [{ type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceiptTag" }], response: [{ type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceiptTag" }] }, getTeamMsgReadAccounts: { sid: 8, cid: 30, service: "team", params: [{ type: "Property", name: "teamMsgReceiptTag" }], response: [{ type: "Property", name: "teamMsgReceipt", entity: "teamMsgReceiptTag" }, { type: "StrArray", name: "readAccounts" }, { type: "StrArray", name: "unreadAccounts" }] }, notifyTeamMsgReceipts: { sid: 8, cid: 31, service: "team", response: [{ type: "PropertyArray", name: "teamMsgReceipts", entity: "teamMsgReceiptTag" }] }, dismissTeam: { sid: 8, cid: 12, service: "team", params: [{ type: "Long", name: "teamId" }] }, leaveTeam: { sid: 8, cid: 8, service: "team", params: [{ type: "Long", name: "teamId" }] }, transferTeam: { sid: 8, cid: 18, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "account" }, { type: "bool", name: "leave" }] }, updateTeamInfo: { sid: 8, cid: 7, service: "team", params: [{ type: "Property", name: "team" }], response: [{ type: "Number", name: "id" }, { type: "Number", name: "time" }] }, getTeamsById: { sid: 8, cid: 34, service: "team", params: [{ type: "LongArray", name: "teamIds" }], response: [{ type: "PropertyArray", name: "teams", entity: "team" }, { type: "StrArray", name: "tids" }], ignoreErrCodes: [816] }, getTeamMembers: { sid: 8, cid: 11, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "Long", name: "timetag" }], response: [{ type: "String", name: "teamId" }, { type: "PropertyArray", name: "teamMembers", entity: "teamMember" }, { type: "Number", name: "timetag" }] }, getMutedTeamMembers: { sid: 8, cid: 27, service: "team", params: [{ type: "Long", name: "teamId" }], response: [{ type: "String", name: "teamId" }, { type: "PropertyArray", name: "teamMembers", entity: "teamMember" }] }, addTeamMembers: { sid: 8, cid: 5, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }, { type: "String", name: "ps" }, { type: "String", name: "attach" }], response: [{ type: "Long", name: "time" }, { type: "StrArray", name: "abortedAccidList" }] }, removeTeamMembers: { sid: 8, cid: 6, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, applyTeam: { sid: 8, cid: 13, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "ps" }], response: [{ type: "Property", name: "team" }] }, addTeamManagers: { sid: 8, cid: 16, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, removeTeamManagers: { sid: 8, cid: 17, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, updateMyMemberInfo: { sid: 8, cid: 19, service: "team", params: [{ type: "Property", name: "teamMember" }] }, updateNickInTeam: { sid: 8, cid: 20, service: "team", params: [{ type: "Property", name: "teamMember" }] }, muteTeamMember: { sid: 8, cid: 25, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "account" }, { type: "Int", name: "mute" }] }, getTeamMemberInvitorAccid: { sid: 8, cid: 33, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }], response: [{ type: "Object", name: "accountsMap" }] }, muteTeam: { sid: 8, cid: 32, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "Int", name: "mute" }] }, passTeamApply: { sid: 8, cid: 14, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }] }, rejectTeamApply: { sid: 8, cid: 15, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }, { type: "String", name: "ps" }] }, acceptTeamInvite: { sid: 8, cid: 21, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }] }, rejectTeamInvite: { sid: 8, cid: 22, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }, { type: "String", name: "ps" }] }, syncTeams: { sid: 8, cid: 109, service: "team", response: [{ type: "Number", name: "timetag" }, { type: "PropertyArray", name: "teams", entity: "team" }] }, syncCreateTeam: { sid: 8, cid: 101, service: "team", response: [{ type: "Property", name: "team" }] }, syncUpdateTeamMember: { sid: 8, cid: 119, service: "team", response: [{ type: "Property", name: "teamMember" }] } }, serializeMap: { team: { teamId: 1, name: 3, type: 4, owner: 5, level: 6, selfCustom: 7, valid: 8, memberNum: 9, memberUpdateTime: 10, createTime: 11, updateTime: 12, validToCurrentUser: 13, intro: 14, announcement: 15, joinMode: 16, bits: 17, ext: 18, serverExt: 19, avatar: 20, beInviteMode: 21, inviteMode: 22, updateTeamMode: 23, updateExtMode: 24, mute: 100, muteType: 101 }, teamMsgReceiptTag: { teamId: 0, idServer: 1, read: 100, unread: 101, idClient: 102, account: 103 }, teamMember: { teamId: 1, account: 3, type: 4, nickInTeam: 5, bits: 7, active: 8, valid: 9, joinTime: 10, updateTime: 11, ext: 12, mute: 13, invitorAccid: 14 } }, deserializeMap: { team: { 1: "teamId", 3: "name", 4: "type", 5: "owner", 6: "level", 7: "selfCustom", 8: "valid", 9: "memberNum", 10: "memberUpdateTime", 11: "createTime", 12: "updateTime", 13: "validToCurrentUser", 14: "intro", 15: "announcement", 16: "joinMode", 17: "bits", 18: "ext", 19: "serverExt", 20: "avatar", 21: "beInviteMode", 22: "inviteMode", 23: "updateTeamMode", 24: "updateExtMode", 100: "mute", 101: "muteType" }, teamMember: { 1: "teamId", 3: "account", 4: "type", 5: "nickInTeam", 7: "bits", 8: "active", 9: "valid", 10: "joinTime", 11: "updateTime", 12: "ext", 13: "mute", 14: "invitorAccid" }, teamMsgReceiptTag: { 0: "teamId", 1: "idServer", 100: "read", 101: "unread", 102: "idClient", 103: "account" } } }), function (e) {e[e.none = 0] = "none", e[e.pass = 1] = "pass", e[e.decline = 2] = "decline", e[e.read = 3] = "read", e[e.deleted = 4] = "deleted", e[e.invalid = 5] = "invalid";}(hd || (hd = {})), function (e) {e[e.default = 0] = "default", e[e.leave = 1] = "leave", e[e.roam = 2] = "roam";}(bd || (bd = {}));var Md = { applyTeam: 0, rejectTeamApply: 1, teamInvite: 2, rejectTeamInvite: 3, friendRequest: 5, deleteFriend: 6, recallMsgP2p: 7, recallMsgTeam: 8, recallMsgSuperTeam: 12, deleteMsgP2pOneWay: 13, deleteMsgTeamOneWay: 14, applySuperTeam: 15, rejectSuperTeamApply: 16, superTeamInvite: 17, rejectSuperTeamInvite: 18, customP2p: 100, customTeam: 101, customSuperTeam: 103 };function Sd(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function kd(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Sd(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Sd(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}var wd = { 1: "addFriend", 2: "applyFriend", 3: "passFriendApply", 4: "rejectFriendApply" };var xd = { setting: { needSaveOffline: { type: "boolean" }, envConfig: { type: "string" } }, antiSpamInfo: { needAntiSpam: { type: "boolean" }, antiSpamContent: { type: "boolean" } }, pushInfo: { needPush: { type: "boolean" }, needPushBadge: { type: "boolean" }, needPushNick: { type: "boolean" }, pushApnsText: { type: "string" }, pushPayload: { type: "string" }, needForcePush: { type: "boolean" }, forcePushIDsList: { type: "string" }, pushContent: { type: "string", rawKey: "forcePushContent" } }, recallMessageInfo: { idClient: { type: "string", rawKey: "deletedIdClient" }, idServer: { type: "string", rawKey: "deletedIdServer" }, createTime: { type: "number", rawKey: "deletedMsgTime" }, fromNick: { type: "string", rawKey: "deletedMsgFromNick" }, opeAccount: { type: "string" } } };function Id(e, t, r) {var n = +e.type,a = ts(Md, n);r = r || bd.default;var i,o,s,c,u = kd(kd({}, Xl(xd, e)), {}, { type: a, time: +e.time, to: e.to, from: e.from, idServer: e.idServer, state: hd[hd.none], feature: bd[r] });if ("string" == typeof u.attach) try {u.attach = JSON.parse(u.attach);} catch (e) {t.error("formatSystemMessage: ".concat(u.idServer, " parse attach error"), e && e.message);}return 5 === n && u.attach ? (u.attach.type = wd[+u.attach.vt], "passFriendApply" === u.attach.type ? u.state = hd[hd.pass] : "rejectFriendApply" === u.attach.type && (u.state = hd[hd.decline])) : n <= 3 && u.attach && (u.attach = (i = u.attach, o = i.attach, s = i.tinfo, (c = pl(i, ["attach", "tinfo"])).ext = o, void 0 !== s && (c.team = Al(Ds(i.tinfo, "team"))), c)), u;}function Ed(e) {var t = Ps({}, e);return kd(kd({}, tp(xd, t)), {}, { type: Md[t.type], to: t.to, attach: t.attach });}function Ad(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var _d = function (e) {di(r, e);var t = Ad(r);function r(e) {var n;return ei(this, r), (n = t.call(this, "systemMessage", e)).sysMsgUnread = { total: 0, friend: 0, msg: 0, team: 0, superTeam: 0 }, n.core.on("logined", function () {n.initEventListeners();}), n;}return ri(r, [{ key: "initEventListeners", value: function value() {var e = this;this.core.on("_passFriendApply", function (t) {e.core.emit("updateSystemMessages", [{ idServer: t.idServer, from: t.account, state: hd[hd.pass], type: "applyFriend" }]);}), this.core.on("_rejectFriendApply", function (t) {e.core.emit("updateSystemMessages", [{ idServer: t.idServer, from: t.account, state: hd[hd.decline], type: "applyFriend" }]);});} }, { key: "doMarkSysMsgAck", value: function value(e) {var t = [],r = [],n = ["applySuperTeam", "rejectSuperTeamApply", "superTeamInvite", "rejectSuperTeamInvite", "customSuperTeam"];Li(e).call(e, function (e) {e.idServer && (ds(n).call(n, e.type) ? r.push(e.idServer) : t.push(e.idServer));}), t.length > 0 && this.core.sendCmd("batchMarkRead", { sid: "7", cid: "3", ids: t }), r.length > 0 && this.core.sendCmd("batchMarkRead", { sid: "21", cid: "19", ids: r });} }, { key: "sendCustomSysMsg", value: function value(e) {var t = this;hc({ to: { type: "string", allowEmpty: !1 }, type: { type: "enum", values: ["customP2p", "customTeam", "customSuperTeam"] }, attach: { type: "string", allowEmpty: !1 }, setting: { type: "object", rules: { needSaveOffline: { type: "boolean", required: !1 }, env: { type: "string", allowEmpty: !1, required: !1 } }, required: !1 }, pushInfo: { type: "object", required: !1, rules: { needPush: { type: "boolean", required: !1 }, pushApnsText: { type: "string", required: !1 }, pushPayload: { type: "string", required: !1 } } } }, e);var r = "customSuperTeam" === e.type ? "sendSuperTeamCustomSysMsg" : "sendCustomSysMsg";return this.core.sendCmd(r, { sysMsg: Ed(e) }).then(function () {t.logger.log("sendCustomSysMsg success");}).catch(function (e) {throw t.logger.error("sendCustomSysMsg failed", e.message), e;});} }, { key: "onSysMsgHandler", value: function value(e) {var t = e.content.sysMsg;if (t) {var r = Id(t, this.logger, bd.default);this.core.emit("sysMsg", r), this.doMarkSysMsgAck([r]);} else this.logger.warn("onSysMsg no content.sysMsg");} }, { key: "syncOfflineSysMsgsHandler", value: function value(e) {var t,r = this;if (e.content.sysMsgs && e.content.sysMsgs.length > 0) {var n = ws(t = e.content.sysMsgs).call(t, function (e) {return Id(e, r.logger, bd.leave);});this.core.emit("syncSysMsgs", n), this.doMarkSysMsgAck(n);}} }, { key: "onRecallMsgHandler", value: function value(e) {var t = e.content.sysMsg;if (t) {var r = Id(t, this.logger, bd.default);this.core.emit("sysMsg", r), this.doMarkSysMsgAck([r]);} else this.logger.warn("onSysMsg no content.sysMsg");} }, { key: "syncDeleteMsgOfflineRoamingHandler", value: function value(e) {var t = this,r = e.content,n = r.timetag,a = r.type,i = r.sysMsgs,o = au(a),s = 1 === o ? bd.leave : bd.roam,c = ws(i).call(i, function (e) {return Id(e, t.logger, s);});1 === o && this.doMarkSysMsgAck(c), this.core.emit("_updateTimatag", { deleteMsg: n }), this.core.emit("syncSysMsgs", c);} }]), r;}(Gc);function Cd(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Pd(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Cd(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Cd(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function jd(e) {var t = ["bitsExtension", "createTime", "updateTime", "passRelationShip", "relationShip", "source"],r = Pd({}, e);return Li(t).call(t, function (e) {void 0 !== r[e] && (r[e] = au(r[e]));}), void 0 !== r.relationShip && (r.valid = 1 === r.relationShip), r;}xi(_d, "idName", "systemMessage"), xi(_d, "cmdParser", { cmdMap: { "4_5": "batchMarkRead", "4_6": "syncOfflineSysMsgs", "4_18": "syncOfflineSysMsgs", "4_19": "syncDeleteMsgOfflineRoaming", "4_101": "syncOfflineSysMsgs", "7_3": "onSysMsg", "7_7": "sendCustomSysMsg", "7_14": "onRecallMsg", "7_15": "syncDeleteMsgOfflineRoaming", "21_19": "onSysMsg", "21_16": "sendSuperTeamCustomSysMsg", "101_3": "onSysMsg", "101_7": "sendFilterCustomSysMsg" }, cmdConfig: { onSysMsg: { service: "systemMessage", sid: 7, cid: 3, response: [{ type: "Property", name: "sysMsg" }] }, sendCustomSysMsg: { service: "systemMessage", sid: 7, cid: 7, params: [{ type: "Property", name: "sysMsg" }] }, sendSuperTeamCustomSysMsg: { service: "systemMessage", sid: 21, cid: 16, params: [{ type: "Property", name: "sysMsg" }] }, sendFilterCustomSysMsg: { service: "systemMessage", sid: 101, cid: 7, params: [{ type: "Property", name: "sysMsg" }] }, batchMarkRead: { service: "systemMessage", sid: 4, cid: 5, params: [{ type: "byte", name: "sid" }, { type: "byte", name: "cid" }, { type: "LongArray", name: "ids" }] }, onRecallMsg: { sid: 7, cid: 14, service: "systemMessage", response: [{ type: "Property", name: "sysMsg" }] }, syncDeleteMsgOfflineRoaming: { sid: 7, cid: 15, service: "systemMessage", response: [{ type: "PropertyArray", name: "sysMsgs", entity: "sysMsg" }, { type: "Number", name: "timetag" }, { type: "Number", name: "type" }] }, syncOfflineSysMsgs: { sid: 4, cid: 9, service: "systemMessage", response: [{ type: "PropertyArray", name: "sysMsgs", entity: "sysMsg" }] } }, serializeMap: { sysMsg: { time: 0, type: 1, to: 2, from: 3, content: 4, attach: 5, idServer: 6, needSaveOffline: 7, pushApnsText: 8, pushPayload: 9, deletedIdClient: 10, deletedIdServer: 11, needcAntiSpam: 12, antiSpamContent: 13, deletedMsgTime: 14, deletedMsgFromNick: 15, opeAccount: 16, forcePushIDsList: 18, forcePushContent: 19, needForcePush: 20, envConfig: 21, callbackExt: 22, isRoutable: 105, needPush: 107, needPushBadge: 109, needPushNick: 110 } }, deserializeMap: { sysMsg: { 0: "time", 1: "type", 2: "to", 3: "from", 4: "content", 5: "attach", 6: "idServer", 7: "needSaveOffline", 8: "pushApnsText", 9: "pushPayload", 10: "deletedIdClient", 11: "deletedIdServer", 12: "needcAntiSpam", 13: "antiSpamContent", 14: "deletedMsgTime", 15: "deletedMsgFromNick", 16: "opeAccount", 18: "forcePushIDsList", 19: "forcePushContent", 20: "needForcePush", 21: "envConfig", 22: "callbackExt", 105: "isRoutable", 107: "needPush", 109: "needPushBadge", 110: "needPushNick" } } });var Od = { 1: "addFriend", 2: "applyFriend", 3: "passFriendApply", 4: "rejectFriendApply" };function Rd(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var Ld = function (e) {di(u, e);var t,r,n,a,i,o,s,c = Rd(u);function u(e) {return ei(this, u), c.call(this, "friend", e);}return ri(u, [{ key: "getFriends", value: (s = Za(Ei.mark(function e() {var t, r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return e.next = 2, this.core.sendCmd("getFriends", { timetag: 0 });case 2:return r = e.sent, n = (null === (t = r.content) || void 0 === t ? void 0 : t.friends) || [], n = ws(n).call(n, function (e) {return jd(e);}), e.abrupt("return", n);case 6:case "end":return e.stop();}}}, e, this);})), function () {return s.apply(this, arguments);}) }, { key: "addFriend", value: (o = Za(Ei.mark(function e(t) {var r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ account: { type: "string", allowEmpty: !1 }, ps: { type: "string", allowEmpty: !1, required: !1 } }, t), e.next = 3, this.core.sendCmd("friendReuqest", { account: t.account, type: 1, ps: t.ps || "" });case 3:return r = new Date().getTime(), e.abrupt("return", { account: t.account, createTime: r, updateTime: r, valid: !0, source: 0, passRelationShip: 1, relationShip: 1, bitsExtension: 0 });case 5:case "end":return e.stop();}}}, e, this);})), function (e) {return o.apply(this, arguments);}) }, { key: "applyFriend", value: (i = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ account: { type: "string", allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("friendReuqest", { account: t.account, type: 2, ps: t.ps || "" });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return i.apply(this, arguments);}) }, { key: "passFriendApply", value: (a = Za(Ei.mark(function e(t) {var r = this;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ account: { type: "string", allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("friendReuqest", { account: t.account, type: 3, ps: t.ps || "" }).then(function (e) {return r.core.emit("_passFriendApply", t), e;});case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return a.apply(this, arguments);}) }, { key: "rejectFriendApply", value: (n = Za(Ei.mark(function e(t) {var r = this;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ account: { type: "string", allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("friendReuqest", { account: t.account, type: 4, ps: t.ps || "" }).then(function (e) {return r.core.emit("_rejectFriendApply", t), e;});case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return n.apply(this, arguments);}) }, { key: "deleteFriend", value: (r = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ account: { type: "string", allowEmpty: !1 }, delAlias: { type: "boolean" } }, t), e.next = 3, this.core.sendCmd("deleteFriend", { account: t.account, delFriendParams: { delAlias: !0 === t.delAlias ? 1 : 0 } });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return r.apply(this, arguments);}) }, { key: "updateFriend", value: (t = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ account: { type: "string", allowEmpty: !1 }, alias: { type: "string", allowEmpty: !1 }, ext: { type: "string", required: !1 } }, t), e.next = 3, this.core.sendCmd("updateFriend", { updateFriendTag: t });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return t.apply(this, arguments);}) }, { key: "syncFriendRequestHandler", value: function value(e) {var t = function (e) {var t = Pd({}, e);try {t.ps = t.ps && JSON.parse(t.ps);} catch (e) {}if (t.type = Od[t.type], "addFriend" === t.type || "passFriendApply" === t.type) {var r = new Date().getTime();t.friend = { account: e.account, alias: "", createTime: r, ext: "", updateTime: r, valid: !0 };}return t;}(e.content);this.core.emit("syncFriend", t);} }, { key: "syncDeleteFriendHandler", value: function value(e) {var t = e.content.account;this.logger.log("friend::emit syncFriendAction: deleteFriend ".concat(t)), this.core.emit("syncFriend", { type: "deleteFriend", account: t });} }, { key: "syncUpdateFriendHandler", value: function value(e) {var t = jd(e.content.friend);this.logger.log("friend::emit syncFriendAction: updateFriend, ", null == t ? void 0 : t.account), this.core.emit("syncFriend", { type: "updateFriend", friend: t });} }, { key: "syncFriendsHandler", value: function value(e) {var t = e.content;this.core.emit("_updateTimetag", { friends: au(t.timetag) });var r = null == t ? void 0 : t.friends;if (r && r.length) {var n = ws(r).call(r, function (e) {return jd(e);});this.core.emit("friends", n);}} }, { key: "syncFriendUsersHandler", value: function value(e) {var t = e.content;this.core.emit("_updateTimetag", { friendUsers: au(t.timetag) });var r = null == t ? void 0 : t.users;if (r && r.length) {var n = ws(r).call(r, function (e) {return Nl(e);});this.core.emit("users", n);}} }]), u;}(Gc);function Nd(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}xi(Ld, "idName", "friend"), xi(Ld, "cmdParser", { cmdMap: { "12_4": "getFriends", "12_1": "friendReuqest", "12_2": "deleteFriend", "12_3": "updateFriend", "12_5": "syncFriends", "12_6": "syncFriendUsers", "12_101": "syncFriendRequest", "12_102": "syncDeleteFriend", "12_103": "syncUpdateFriend" }, cmdConfig: { getFriends: { sid: 12, cid: 4, service: "friend", params: [{ type: "Long", name: "timetag" }], response: [{ type: "PropertyArray", name: "friends", entity: "friendTag" }, { type: "Number", name: "timetag" }] }, friendReuqest: { sid: 12, cid: 1, service: "friend", params: [{ type: "String", name: "account" }, { type: "Byte", name: "type" }, { type: "String", name: "ps" }] }, deleteFriend: { sid: 12, cid: 2, service: "friend", params: [{ type: "String", name: "account" }, { type: "Property", name: "delFriendParams" }] }, updateFriend: { sid: 12, cid: 3, service: "friend", params: [{ type: "Property", name: "updateFriendTag" }] }, syncFriends: { sid: 12, cid: 5, service: "friend", response: [{ type: "PropertyArray", name: "friends", entity: "friendTag" }, { type: "Number", name: "timetag" }] }, syncFriendUsers: { sid: 12, cid: 6, service: "friend", response: [{ type: "PropertyArray", name: "users", entity: "userTag" }, { type: "Number", name: "timetag" }] }, syncFriendRequest: { sid: 12, cid: 101, service: "friend", params: [{ type: "String", name: "account" }, { type: "Number", name: "type" }, { type: "String", name: "ps" }], response: [{ type: "String", name: "account" }, { type: "Number", name: "type" }, { type: "String", name: "ps" }] }, syncDeleteFriend: { sid: 12, cid: 102, service: "friend", response: [{ type: "String", name: "account" }] }, syncUpdateFriend: { sid: 12, cid: 103, service: "friend", response: [{ type: "Property", name: "friend", entity: "friendTag" }] } }, serializeMap: { updateFriendTag: { account: 4, alias: 8, ext: 10 }, delFriendParams: { delAlias: 1 } }, deserializeMap: { friendTag: { 4: "account", 5: "relationShip", 6: "passRelationShip", 7: "source", 8: "alias", 9: "bitsExtension", 10: "ext", 11: "createTime", 12: "updateTime", 13: "serverex" }, userTag: { 1: "account", 3: "nick", 4: "avatar", 5: "sign", 6: "gender", 7: "email", 8: "birth", 9: "tel", 10: "ext", 12: "createTime", 13: "updateTime" } } });var Fd = { 1: "Android", 2: "iOS", 4: "PC", 8: "WindowsPhone", 16: "Web", 32: "Server", 64: "Mac" };function qd(e) {var t = function (e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Nd(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Nd(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}({}, e),r = ["subscribeTime", "time"];return Li(r).call(r, function (e) {t[e] && (t[e] = au(t[e]));}), t;}function Ud(e) {if (!e) return e;var t = e.serverExt,r = pl(e, ["serverExt"]),n = ["time", "type", "value"];if (Li(n).call(n, function (e) {r[e] && (r[e] = au(r[e]));}), r.clientType && (r.clientType = Fd[r.clientType] || ""), t) try {r.ext = JSON.parse(t), "string" == typeof r.ext[0] && (r.ext = r.ext[0]);} catch (e) {}return r;}function Dd(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Bd(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Dd(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Dd(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Hd(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var zd = function (e) {di(o, e);var t,r,n,a,i = Hd(o);function o(e) {return ei(this, o), i.call(this, "event", e);}return ri(o, [{ key: "publishEvent", value: (a = Za(Ei.mark(function e(t) {var r, n, a, i;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ type: { type: "number" }, value: { type: "number" }, ext: { type: "string", required: !1 }, validTime: { type: "number", min: 60, max: 2592e3, required: !1 }, broadcastType: { type: "number", required: !1 }, sync: { type: "boolean", required: !1 } }, t), n = Bd(Bd({ validTime: 604800 }, t), {}, { idClient: Zo(), sync: !0 === t.sync ? 1 : 0 }), e.next = 4, this.core.sendCmd("publishEvent", { msgEvent: n });case 4:return a = e.sent, i = (null === (r = a.content) || void 0 === r ? void 0 : r.msgEvent) || {}, e.abrupt("return", Ud(i));case 7:case "end":return e.stop();}}}, e, this);})), function (e) {return a.apply(this, arguments);}) }, { key: "subscribeEvent", value: (n = Za(Ei.mark(function e(t) {var r, n, a, i;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ type: { type: "number" }, accounts: { type: "array", itemType: "string", max: 100 }, subscribeTime: { type: "number", min: 60, max: 2592e3, required: !1 } }, t), n = Bd(Bd({ subscribeTime: 2592e3 }, t), {}, { sync: !0 === t.sync ? 1 : 0 }), e.next = 4, this.core.sendCmd("subscribeEvent", { msgEventSubscribe: n, accounts: t.accounts });case 4:return a = e.sent, i = (null === (r = a.content) || void 0 === r ? void 0 : r.accounts) || [], e.abrupt("return", { failedAccounts: i });case 7:case "end":return e.stop();}}}, e, this);})), function (e) {return n.apply(this, arguments);}) }, { key: "unSubscribeEvents", value: (r = Za(Ei.mark(function e(t) {var r, n, a, i;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (hc({ type: { type: "number" }, accounts: { type: "array", itemType: "string", max: 100, required: !1 } }, t), r = { type: t.type }, !(t.accounts && t.accounts.length > 0)) {e.next = 9;break;}return e.next = 5, this.core.sendCmd("unSubscribeEventsByAccounts", { msgEventSubscribe: r, accounts: t.accounts });case 5:i = e.sent, n = (null === (a = i.content) || void 0 === a ? void 0 : a.accounts) || [], e.next = 12;break;case 9:return e.next = 11, this.core.sendCmd("unSubscribeEventsByType", { msgEventSubscribe: r });case 11:n = [];case 12:return e.abrupt("return", { failedAccounts: n });case 13:case "end":return e.stop();}}}, e, this);})), function (e) {return r.apply(this, arguments);}) }, { key: "querySubscribeEvents", value: (t = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (hc({ type: { type: "number" }, accounts: { type: "array", itemType: "string", max: 100, required: !1 } }, t), !(t.accounts && t.accounts.length > 0)) {e.next = 7;break;}return e.next = 4, this.core.sendCmd("querySubscribeEventsByAccounts", { msgEventSubscribe: { type: t.type }, accounts: t.accounts });case 4:n = e.sent, e.next = 10;break;case 7:return e.next = 9, this.core.sendCmd("querySubscribeEventsByType", { msgEventSubscribe: { type: t.type } });case 9:n = e.sent;case 10:return e.abrupt("return", (a = null === (r = n.content) || void 0 === r ? void 0 : r.msgEventSubscribes) && a.length > 0 ? ws(a).call(a, function (e) {return qd(e);}) : []);case 11:case "end":return e.stop();}}var a;}, e, this);})), function (e) {return t.apply(this, arguments);}) }, { key: "pushEventHandler", value: function value(e) {var t,r = (null === (t = e.content) || void 0 === t ? void 0 : t.msgEvent) || {};this.core.emit("pushEvents", [Ud(r)]);} }, { key: "pushEventsHandler", value: function value(e) {var t,r,n = (null === (t = e.content) || void 0 === t ? void 0 : t.msgEvents) || {};this.core.emit("pushEvents", Bs(r = n) && r.length > 0 ? ws(r).call(r, function (e) {return Ud(e);}) : []);} }]), o;}(Gc);function Vd(e) {var t = { scene: Hu[e.scene], from: e.threadMsgFromAccount, to: e.threadMsgToAccount, time: e.threadMsgTime, idServer: e.threadMsgIdServer },r = { limit: e.limit < 100 ? e.limit : 100, beginTime: "number" == typeof e.beginTime ? e.beginTime : 0, reverse: !0 === ud(e) ? 1 : 0 };return e.lastMsgId && (r.lastMsgId = e.lastMsgId), { msg: t, threadMsgReq: r };}xi(zd, "idName", "event"), xi(zd, "cmdParser", { cmdMap: { "14_1": "publishEvent", "14_2": "pushEvent", "14_3": "subscribeEvent", "14_4": "unSubscribeEventsByAccounts", "14_5": "unSubscribeEventsByType", "14_6": "querySubscribeEventsByAccounts", "14_7": "querySubscribeEventsByType", "14_9": "pushEvents" }, cmdConfig: { publishEvent: { sid: 14, cid: 1, service: "event", params: [{ type: "Property", name: "msgEvent" }], response: [{ type: "Property", name: "msgEvent" }] }, pushEvent: { sid: 14, cid: 2, service: "event", response: [{ type: "Property", name: "msgEvent" }] }, subscribeEvent: { sid: 14, cid: 3, service: "event", params: [{ type: "Property", name: "msgEventSubscribe" }, { type: "StrArray", name: "accounts" }], response: [{ type: "StrArray", name: "accounts" }] }, unSubscribeEventsByAccounts: { sid: 14, cid: 4, service: "event", params: [{ type: "Property", name: "msgEventSubscribe" }, { type: "StrArray", name: "accounts" }], response: [{ type: "StrArray", name: "accounts" }] }, unSubscribeEventsByType: { sid: 14, cid: 5, service: "event", params: [{ type: "Property", name: "msgEventSubscribe" }] }, querySubscribeEventsByAccounts: { sid: 14, cid: 6, service: "event", params: [{ type: "Property", name: "msgEventSubscribe" }, { type: "StrArray", name: "accounts" }], response: [{ type: "PropertyArray", name: "msgEventSubscribes", entity: "msgEventSubscribe" }] }, querySubscribeEventsByType: { sid: 14, cid: 7, service: "event", params: [{ type: "Property", name: "msgEventSubscribe" }], response: [{ type: "PropertyArray", name: "msgEventSubscribes", entity: "msgEventSubscribe" }] }, pushEvents: { sid: 14, cid: 9, service: "event", response: [{ type: "PropertyArray", name: "msgEvents", entity: "msgEvent" }] } }, serializeMap: { msgEvent: { type: 1, value: 2, idClient: 3, ext: 4, validTime: 5, broadcastType: 6, sync: 7, validTimeType: 8, durable: 9, time: 10, idServer: 11, clientType: 12, serverConfig: 13, serverExt: 14, appid: 101, account: 103, enableMultiClient: 104, consid: 106 }, msgEventSubscribe: { type: 1, subscribeTime: 2, sync: 3, to: 102, from: 104, time: 105 } }, deserializeMap: { msgEvent: { 1: "type", 2: "value", 3: "idClient", 4: "ext", 5: "validTime", 6: "broadcastType", 7: "sync", 8: "validTimeType", 9: "durable", 10: "time", 11: "idServer", 12: "clientType", 13: "serverConfig", 14: "serverExt", 101: "appid", 103: "account", 104: "enableMultiClient", 106: "consid" }, msgEventSubscribe: { 1: "type", 2: "subscribeTime", 3: "sync", 102: "to", 104: "from", 105: "time" } } });var Wd = { msg: dp, threadMsgReq: { beginTime: 1, endTime: 2, lastMsgId: 3, limit: 4, reverse: 5 } },$d = { msg: yp, threadMsgsMeta: { 1: "total", 2: "lastMsgTime" } };function Kd(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Gd(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Kd(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Kd(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Jd(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var Yd = function (e) {di(a, e);var t,r,n = Jd(a);function a(e) {return ei(this, a), n.call(this, "msgExtend", e);}return ri(a, [{ key: "getThreadMsgs", value: (r = Za(Ei.mark(function e(t) {var r, n, a, i, o;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ scene: { type: "enum", values: es(al) }, threadMsgFromAccount: { type: "string", allowEmpty: !1 }, threadMsgIdServer: { type: "string", allowEmpty: !1 }, threadMsgTime: { type: "number" }, threadMsgToAccount: { type: "string", allowEmpty: !1 }, beginTime: { type: "number", required: !1 }, endTime: { type: "number", required: !1 }, lastMsgId: { type: "string", allowEmpty: !1, required: !1 }, limit: { type: "number", min: 1, max: 100, required: !1 }, reverse: { type: "boolean", required: !1 } }, t), e.next = 3, this.core.sendCmd("getThreadMsgs", Vd(t));case 3:return r = e.sent, n = r.content, a = n.msgs, i = n.threadMsg, o = n.threadMsgsMeta, e.abrupt("return", { msgs: up(a, this.core.account), threadMsg: cp(i, this.core.account), total: o.total, timetag: o.lastMsgTime });case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return r.apply(this, arguments);}) }, { key: "getMsgsByIdServer", value: (t = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ reqMsgs: { type: "array", rules: { scene: { type: "enum", values: es(al) }, from: { type: "string", allowEmpty: !1 }, to: { type: "string", allowEmpty: !1 }, idServer: { type: "string", allowEmpty: !1 }, time: { type: "number" } }, min: 1, max: 100 } }, t), e.next = 3, this.core.sendCmd("getMsgsByIdServer", { reqMsgs: ws(r = t.reqMsgs).call(r, function (e) {return Gd(Gd({}, e), {}, { scene: ts(al, e.scene) });}) });case 3:return n = e.sent, e.abrupt("return", up(n.content.msgs, this.core.account));case 5:case "end":return e.stop();}}}, e, this);})), function (e) {return t.apply(this, arguments);}) }]), a;}(Gc);xi(Yd, "idName", "msgExtend"), xi(Yd, "cmdParser", { cmdMap: { "23_1": "getThreadMsgs", "23_2": "getMsgsByIdServer" }, cmdConfig: { getThreadMsgs: { sid: 23, cid: 1, service: "msgExtend", params: [{ type: "Property", name: "msg" }, { type: "Property", name: "threadMsgReq" }], response: [{ type: "Property", name: "threadMsg", entity: "msg" }, { type: "Property", name: "threadMsgsMeta" }, { type: "PropertyArray", name: "msgs", entity: "msg" }] }, getMsgsByIdServer: { sid: 23, cid: 2, service: "msgExtend", params: [{ type: "PropertyArray", name: "reqMsgs", entity: "msg" }], response: [{ type: "PropertyArray", name: "msgs", entity: "msg" }] } }, serializeMap: Wd, deserializeMap: $d });function Qd(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Xd(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Qd(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Qd(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Zd(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var ef = function (e) {di(i, e);var t,r,n,a = Zd(i);function i(e) {return ei(this, i), a.call(this, "msgLog", e);}return ri(i, [{ key: "deleteRoamingMsgs", value: (n = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ ids: { type: "array", itemType: "string" } }, t), n = ws(r = t.ids).call(r, function (e) {return e.split("-").join("|");}), e.next = 4, this.core.sendCmd("deleteRoamingMsgs", { ids: n });case 4:case "end":return e.stop();}}}, e, this);})), function (e) {return n.apply(this, arguments);}) }, { key: "getHistoryMsgs", value: (r = Za(Ei.mark(function e(t) {var r, n, a, i, o;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ scene: { type: "enum", values: Fi(Hu) }, to: { type: "string", allowEmpty: !1 }, beginTime: { type: "number", required: !1 }, endTime: { type: "number", required: !1 }, limit: { type: "number", min: 1, max: 100, required: !1 }, reverse: { type: "boolean", required: !1 }, lastMsgId: { type: "string", required: !1, allowEmpty: !1 }, asc: { type: "boolean", required: !1 }, msgTypes: { type: "array", itemType: "string", required: !1 } }, t), n = "p2p" === t.scene ? "getHistoryMsgs" : "team" === t.scene ? "getHistoryTeamMsgs" : "getHistorySuperTeamMsgs", e.next = 4, this.core.sendCmd(n, Xd(Xd({ beginTime: 0, endTime: 0, lastMsgId: 0, limit: 100, reverse: !1 }, t), {}, { msgTypes: t.msgTypes ? ws(r = t.msgTypes).call(r, function (e) {return Fu[e];}) : [] }));case 4:if (a = e.sent, i = a.content, o = up(i.msgs, this.core.account), !0 !== t.asc) {e.next = 9;break;}return e.abrupt("return", ll(o).call(o, function (e, t) {return e.time - t.time;}));case 9:return e.abrupt("return", o);case 10:case "end":return e.stop();}}}, e, this);})), function (e) {return r.apply(this, arguments);}) }, { key: "clearHistoryMsgsFromServer", value: (t = Za(Ei.mark(function e(t) {var r, n, a;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ scene: { type: "enum", values: ["p2p", "team"] }, to: { type: "string", allowEmpty: !1 }, ext: { type: "string", required: !1 }, isSyncSelf: { type: "boolean", required: !1 } }, t), (r = Xd(Xd({ isDeleteRoam: 1 }, t), {}, { type: "team" === t.scene ? 2 : 1, isSyncSelf: !0 === t.isSyncSelf ? 1 : 0 }))[2 === r.type ? "toTid" : "otherAccid"] = t.to, e.next = 5, this.core.sendCmd("clearHistoryMsgsFromServer", { clearHistoryMsgsFromServerReqTag: r });case 5:return n = e.sent, a = n.content, e.abrupt("return", a);case 8:case "end":return e.stop();}}}, e, this);})), function (e) {return t.apply(this, arguments);}) }, { key: "onClearServerHistoryMsgsHandler", value: function value(e) {var t = e.content.sessionHistoryMsgsDeleteTag;if (t) {var r = "p2p" === (t.type && "2" === t.type.toString() ? "team" : "p2p") ? "p2 p-".concat(t.otherAccid) : "team-".concat(t.toTid),n = au(t.time);this.core.emit("onClearServerHistoryMsgs", { sessionId: r, time: n });}} }]), i;}(Gc);xi(ef, "idName", "msgLog"), xi(ef, "cmdParser", { cmdMap: { "7_6": "getHistoryMsgs", "7_9": "deleteRoamingMsgs", "7_18": "clearHistoryMsgsFromServer", "7_118": "onClearServerHistoryMsgs" }, cmdConfig: { deleteRoamingMsgs: { sid: 7, cid: 9, service: "msgLog", params: [{ type: "StrArray", name: "ids" }] }, getHistoryMsgs: { sid: 7, cid: 6, params: [{ type: "String", name: "to" }, { type: "Long", name: "beginTime" }, { type: "Long", name: "endTime" }, { type: "Long", name: "lastMsgId" }, { type: "int", name: "limit" }, { type: "bool", name: "reverse" }, { type: "LongArray", name: "msgTypes" }], response: [{ type: "PropertyArray", name: "msgs", entity: "msg" }], service: "msgLog" }, clearHistoryMsgsFromServer: { sid: 7, cid: 18, params: [{ type: "Property", name: "clearHistoryMsgsFromServerReqTag" }], response: [{ type: "Long", name: "timetag" }], service: "msgLog" }, onClearServerHistoryMsgs: { sid: 7, cid: 118, response: [{ type: "Property", name: "sessionHistoryMsgsDeleteTag", entity: "clearMsgsParamsWithSync" }], service: "msgLog" } }, serializeMap: { clearHistoryMsgsFromServerReqTag: { type: 0, otherAccid: 1, isDeleteRoam: 2, toTid: 3, isSyncSelf: 4, ext: 7 } }, deserializeMap: { clearMsgsParamsWithSync: { 0: "type", 1: "otherAccid", 2: "delRoam", 3: "toTid", 4: "isSyncSelf", 5: "fromAccid", 6: "time", 7: "ext" } } });function tf(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var rf = function (e) {di(r, e);var t = tf(r);function r(e) {var n;return ei(this, r), (n = t.call(this, "passThrough", e)).core = e, n;}return ri(r, [{ key: "request", value: function value(e) {return hc({ path: { type: "string", allowEmpty: !1 } }, e), this.core.sendCmd("requestProxy", { requestProxyTag: e }).then(function (e) {return e.content.proxyTag;});} }, { key: "onRequestProxyHandler", value: function value(e) {var t = e.content.proxyMsg;t && t.time && (t.time = +t.time), this.core.emit("proxyMsg", t);} }]), r;}(Gc);xi(rf, "idName", "passThrough"), xi(rf, "cmdParser", { cmdMap: { "22_1": "requestProxy", "22_2": "onRequestProxy" }, cmdConfig: { requestProxy: { sid: 22, cid: 1, service: "passThrough", params: [{ type: "Property", name: "requestProxyTag" }], response: [{ type: "Property", name: "requestProxyTag" }] }, onRequestProxy: { sid: 22, cid: 2, service: "passThrough", response: [{ type: "Property", name: "proxyMsg", entity: "requestProxyMsgTag" }] } }, serializeMap: { requestProxyTag: { zone: 1, path: 2, method: 3, header: 4, body: 5 }, requestProxyMsgTag: { from: 1, body: 2, time: 3 } }, deserializeMap: { requestProxyTag: { 1: "zone", 2: "path", 3: "method", 4: "header", 5: "body" }, requestProxyMsgTag: { 1: "from", 2: "body", 3: "time" } } });var nf = function nf() {this.__data__ = new cm(), this.size = 0;};var af = function af(e) {var t = this.__data__,r = t.delete(e);return this.size = t.size, r;};var of = function of(e) {return this.__data__.get(e);};var sf = function sf(e) {return this.__data__.has(e);};var cf = function cf(e, t) {var r = this.__data__;if (r instanceof cm) {var n = r.__data__;if (!um || n.length < 199) return n.push([e, t]), this.size = ++r.size, this;r = this.__data__ = new hm(n);}return r.set(e, t), this.size = r.size, this;};function uf(e) {var t = this.__data__ = new cm(e);this.size = t.size;}uf.prototype.clear = nf, uf.prototype.delete = af, uf.prototype.get = of, uf.prototype.has = sf, uf.prototype.set = cf;var lf = uf;var pf = function pf(e) {return this.__data__.set(e, "__lodash_hash_undefined__"), this;};var mf = function mf(e) {return this.__data__.has(e);};function df(e) {var t = -1,r = null == e ? 0 : e.length;for (this.__data__ = new hm(); ++t < r;) {this.add(e[t]);}}df.prototype.add = df.prototype.push = pf, df.prototype.has = mf;var ff = df;var yf = function yf(e, t) {for (var r = -1, n = null == e ? 0 : e.length; ++r < n;) {if (t(e[r], r, e)) return !0;}return !1;};var vf = function vf(e, t) {return e.has(t);};var gf = function gf(e, t, r, n, a, i) {var o = 1 & r,s = e.length,c = t.length;if (s != c && !(o && c > s)) return !1;var u = i.get(e),l = i.get(t);if (u && l) return u == t && l == e;var p = -1,m = !0,d = 2 & r ? new ff() : void 0;for (i.set(e, t), i.set(t, e); ++p < s;) {var f = e[p],y = t[p];if (n) var v = o ? n(y, f, p, t, e, i) : n(f, y, p, e, t, i);if (void 0 !== v) {if (v) continue;m = !1;break;}if (d) {if (!yf(t, function (e, t) {if (!vf(d, t) && (f === e || a(f, e, r, n, i))) return d.push(t);})) {m = !1;break;}} else if (f !== y && !a(f, y, r, n, i)) {m = !1;break;}}return i.delete(e), i.delete(t), m;},hf = Uo.Uint8Array;var bf = function bf(e) {var t = -1,r = Array(e.size);return e.forEach(function (e, n) {r[++t] = [n, e];}), r;};var Tf = function Tf(e) {var t = -1,r = Array(e.size);return e.forEach(function (e) {r[++t] = e;}), r;},Mf = Do ? Do.prototype : void 0,Sf = Mf ? Mf.valueOf : void 0;var kf = function kf(e, t, r, n, a, i, o) {switch (r) {case "[object DataView]":if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;e = e.buffer, t = t.buffer;case "[object ArrayBuffer]":return !(e.byteLength != t.byteLength || !i(new hf(e), new hf(t)));case "[object Boolean]":case "[object Date]":case "[object Number]":return em(+e, +t);case "[object Error]":return e.name == t.name && e.message == t.message;case "[object RegExp]":case "[object String]":return e == t + "";case "[object Map]":var s = bf;case "[object Set]":var c = 1 & n;if (s || (s = Tf), e.size != t.size && !c) return !1;var u = o.get(e);if (u) return u == t;n |= 2, o.set(e, t);var l = gf(s(e), s(t), n, a, i, o);return o.delete(e), l;case "[object Symbol]":if (Sf) return Sf.call(e) == Sf.call(t);}return !1;};var wf = function wf(e, t, r) {var n = t(e);return fu(e) ? n : zm(n, r(e));};var xf = function xf(e, t) {for (var r = -1, n = null == e ? 0 : e.length, a = 0, i = []; ++r < n;) {var o = e[r];t(o, r, e) && (i[a++] = o);}return i;};var If = function If() {return [];},Ef = Object.prototype.propertyIsEnumerable,Af = Object.getOwnPropertySymbols,_f = Af ? function (e) {return null == e ? [] : (e = Object(e), xf(Af(e), function (t) {return Ef.call(e, t);}));} : If,Cf = _f;var Pf = function Pf(e) {return wf(e, Ou, Cf);},jf = Object.prototype.hasOwnProperty;var Of = function Of(e, t, r, n, a, i) {var o = 1 & r,s = Pf(e),c = s.length;if (c != Pf(t).length && !o) return !1;for (var u = c; u--;) {var l = s[u];if (!(o ? l in t : jf.call(t, l))) return !1;}var p = i.get(e),m = i.get(t);if (p && m) return p == t && m == e;var d = !0;i.set(e, t), i.set(t, e);for (var f = o; ++u < c;) {var y = e[l = s[u]],v = t[l];if (n) var g = o ? n(v, y, l, t, e, i) : n(y, v, l, e, t, i);if (!(void 0 === g ? y === v || a(y, v, r, n, i) : g)) {d = !1;break;}f || (f = "constructor" == l);}if (d && !f) {var h = e.constructor,b = t.constructor;h == b || !("constructor" in e) || !("constructor" in t) || "function" == typeof h && h instanceof h && "function" == typeof b && b instanceof b || (d = !1);}return i.delete(e), i.delete(t), d;},Rf = Hp(Uo, "DataView"),Lf = Hp(Uo, "Promise"),Nf = Hp(Uo, "Set"),Ff = Hp(Uo, "WeakMap"),qf = "[object Map]",Uf = "[object Promise]",Df = "[object Set]",Bf = "[object WeakMap]",Hf = "[object DataView]",zf = Op(Rf),Vf = Op(um),Wf = Op(Lf),$f = Op(Nf),Kf = Op(Ff),Gf = Jo;(Rf && Gf(new Rf(new ArrayBuffer(1))) != Hf || um && Gf(new um()) != qf || Lf && Gf(Lf.resolve()) != Uf || Nf && Gf(new Nf()) != Df || Ff && Gf(new Ff()) != Bf) && (Gf = function Gf(e) {var t = Jo(e),r = "[object Object]" == t ? e.constructor : void 0,n = r ? Op(r) : "";if (n) switch (n) {case zf:return Hf;case Vf:return qf;case Wf:return Uf;case $f:return Df;case Kf:return Bf;}return t;});var Jf = Gf,Yf = "[object Arguments]",Qf = "[object Array]",Xf = "[object Object]",Zf = Object.prototype.hasOwnProperty;var ey = function ey(e, t, r, n, a, i) {var o = fu(e),s = fu(t),c = o ? Qf : Jf(e),u = s ? Qf : Jf(t),l = (c = c == Yf ? Xf : c) == Xf,p = (u = u == Yf ? Xf : u) == Xf,m = c == u;if (m && vu(e)) {if (!vu(t)) return !1;o = !0, l = !1;}if (m && !l) return i || (i = new lf()), o || ku(e) ? gf(e, t, r, n, a, i) : kf(e, t, c, r, n, a, i);if (!(1 & r)) {var d = l && Zf.call(e, "__wrapped__"),f = p && Zf.call(t, "__wrapped__");if (d || f) {var y = d ? e.value() : e,v = f ? t.value() : t;return i || (i = new lf()), a(y, v, r, n, i);}}return !!m && (i || (i = new lf()), Of(e, t, r, n, a, i));};var ty = function e(t, r, n, a, i) {return t === r || (null == t || null == r || !pc(t) && !pc(r) ? t != t && r != r : ey(t, r, n, a, e, i));};var ry = function ry(e, t, r, n) {var a = r.length,i = a,o = !n;if (null == e) return !i;for (e = Object(e); a--;) {var s = r[a];if (o && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;}for (; ++a < i;) {var c = (s = r[a])[0],u = e[c],l = s[1];if (o && s[2]) {if (void 0 === u && !(c in e)) return !1;} else {var p = new lf();if (n) var m = n(u, l, c, e, t, p);if (!(void 0 === m ? ty(l, u, 3, n, p) : m)) return !1;}}return !0;};var ny = function ny(e) {return e == e && !Yo(e);};var ay = function ay(e) {for (var t = Ou(e), r = t.length; r--;) {var n = t[r],a = e[n];t[r] = [n, a, ny(a)];}return t;};var iy = function iy(e, t) {return function (r) {return null != r && r[e] === t && (void 0 !== t || e in Object(r));};};var oy = function oy(e) {var t = ay(e);return 1 == t.length && t[0][2] ? iy(t[0][0], t[0][1]) : function (r) {return r === e || ry(r, e, t);};};var sy = function sy(e, t, r) {var n = null == e ? void 0 : jm(e, t);return void 0 === n ? r : n;};var cy = function cy(e, t) {return Ap(e) && ny(t) ? iy(Pm(e), t) : function (r) {var n = sy(r, e);return void 0 === n && n === t ? Bm(r, e) : ty(t, n, 3);};};var uy = function uy(e) {return function (t) {return null == t ? void 0 : t[e];};};var ly = function ly(e) {return function (t) {return jm(t, e);};};var py = function py(e) {return Ap(e) ? uy(Pm(e)) : ly(e);};var my = function my(e) {return "function" == typeof e ? e : null == e ? qu : "object" == typeof e ? fu(e) ? cy(e[0], e[1]) : oy(e) : py(e);},dy = Object.getOwnPropertySymbols ? function (e) {for (var t = []; e;) {zm(t, Cf(e)), e = zl(e);}return t;} : If;var fy = function fy(e) {var t = [];if (null != e) for (var r in Object(e)) {t.push(r);}return t;},yy = Object.prototype.hasOwnProperty;var vy = function vy(e) {if (!Yo(e)) return fy(e);var t = Eu(e),r = [];for (var n in e) {("constructor" != n || !t && yy.call(e, n)) && r.push(n);}return r;};var gy = function gy(e) {return ju(e) ? xu(e, !0) : vy(e);};var hy = function hy(e) {return wf(e, gy, dy);};var by = function by(e, t) {if (null == e) return {};var r = xm(hy(e), function (e) {return [e];});return t = my(t), qm(e, r, function (e, r) {return t(e, r[0]);});};function Ty(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function My(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Ty(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Ty(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Sy(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var ky = { file: { md5: "$(Etag)", size: "$(ObjectSize)" }, image: { md5: "$(Etag)", size: "$(ObjectSize)", w: "$(ImageInfo.Width)", h: "$(ImageInfo.Height)", orientation: "$(ImageInfo.Orientation)" }, audio: { md5: "$(Etag)", size: "$(ObjectSize)", dur: "$(AVinfo.Audio.Duration)" }, video: { md5: "$(Etag)", size: "$(ObjectSize)", dur: "$(AVinfo.Video.Duration)", w: "$(AVinfo.Video.Width)", h: "$(AVinfo.Video.Height)" } };function wy() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "file",t = ky[e] || {};return Oo(t).replace(/"/gi, '\\"');}var xy = function (e) {di(r, e);var t = Sy(r);function r(e) {return ei(this, r), t.call(this, "cloudStorage", e);}return ri(r, [{ key: "uploadFile", value: function () {var e = Za(Ei.mark(function e(t) {var r, n, a, i, o, s, c, u, l, p, m, d, f;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (hc({ maxSize: { type: "number", required: !1 }, type: { type: "string", allowEmpty: !1 } }, t), t.fileInput || t.file || t.filePath) {e.next = 3;break;}throw new Error("uploadFile needs target file object or a filePath");case 3:return n = { tag: t.nosScenes || rs.cdn.bucket || "im", expireSec: t.nosSurvivalTime }, e.prev = 4, e.next = 7, this.core.sendCmd("getNosToken", { responseBody: wy(t.type), nosToken: n });case 7:a = e.sent, e.next = 14;break;case 10:throw e.prev = 10, e.t0 = e.catch(4), this.core.logger.error("uploadFile:: getNosToken error", e.t0), e.t0;case 14:return e.prev = 14, e.next = 17, js.uploadFile(My(My({}, t), {}, { nosToken: a.content.nosToken, chunkUploadHost: rs.chunkUploadHost, commonUploadHost: rs.commonUploadHost, maxSize: t.maxSize || rs.chunkMaxSize }));case 17:i = e.sent, e.next = 24;break;case 20:throw e.prev = 20, e.t1 = e.catch(14), this.core.logger.error("uploadFile:: uploadFile error", e.t1), e.t1;case 24:if (o = i.type, s = o && Vi(o).call(o, "/") > -1 ? eo(o).call(o, 0, Vi(o).call(o, "/")) : "", c = { image: "imageInfo", video: "vinfo", audio: "vinfo" }, u = rs.uploadReplaceFormat.replace("{host}", rs.cdn.cdnDomain || rs.cdn.defaultCdnDomain).replace("{object}", a.content.nosToken.objectName), c[s]) {e.next = 30;break;}return e.abrupt("return", My({ url: u }, i));case 30:return e.prev = 30, e.next = 33, js.request(Ki(p = "".concat(u, "?")).call(p, c[s]));case 33:l = e.sent, e.next = 40;break;case 36:return e.prev = 36, e.t2 = e.catch(30), this.core.logger.error("uploadFile:: fetch file info error", e.t2), e.abrupt("return", My({ url: u }, i));case 40:return m = l.data, d = "imageInfo" === c[s] ? m : null == m || null === (r = m.GetVideoInfo) || void 0 === r ? void 0 : r.VideoInfo, f = { url: u, name: i.name, size: i.size, ext: i.ext, w: d.Width, h: d.Height, orientation: d.Orientation, dur: d.Duration, audioCodec: d.AudioCodec, videoCodec: d.VideoCodec, container: d.Container }, e.abrupt("return", by(f, function (e, t) {return void 0 !== t;}));case 44:case "end":return e.stop();}}}, e, this, [[4, 10], [14, 20], [30, 36]]);}));return function (t) {return e.apply(this, arguments);};}() }]), r;}(Gc);function Iy(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}xi(xy, "idName", "cloudStorage"), xi(xy, "cmdParser", { cmdMap: { "6_2": "getNosToken" }, cmdConfig: { getNosToken: { sid: 6, cid: 2, service: "cloudStorage", response: [{ type: "Property", name: "nosToken" }], params: [{ type: "String", name: "responseBody" }, { type: "Property", name: "nosToken", entity: "nosToken" }] } }, serializeMap: { nosToken: { objectName: 1, token: 2, bucket: 3, expireTime: 4, expireSec: 7, tag: 8, shortUrl: 9 } }, deserializeMap: { nosToken: { 1: "objectName", 2: "token", 3: "bucket", 4: "expireTime", 7: "expireSec", 8: "tag", 9: "shortUrl" } } });var Ey = Du({ none: 0, normal: 1, all: 3 }),Ay = Du({ normal: 0, advanced: 1 }),_y = Du({ normal: 0, owner: 1, manager: 2 }),Cy = { noVerify: 0, needVerify: 1, rejectAll: 2 },Py = Du(Cy),jy = { needVerify: 0, noVerify: 1 },Oy = Du(jy),Ry = { manager: 0, all: 1 },Ly = Du(Ry),Ny = { manager: 0, all: 1 },Fy = Du(Ny),qy = { manager: 0, all: 1 },Uy = Du(qy);function Dy(e) {var t,r = ["teamId"],n = ["level", "memberNum", "memberUpdateTime", "createTime", "updateTime"],a = ["valid", "validToCurrentUser", "mute"],i = { type: Ay, muteType: Ey, joinMode: Py, beInviteMode: Oy, inviteMode: Ly, updateTeamMode: Fy, updateExtMode: Uy };e.bits;var o = pl(e, ["bits"]);return Li(r).call(r, function (e) {o[e] && (o[e] = o[e].toString());}), Li(n).call(n, function (e) {void 0 !== o[e] && (o[e] = au(o[e]));}), Li(a).call(a, function (e) {void 0 !== o[e] && (o[e] = 1 === au(o[e]));}), Li(t = Fi(i)).call(t, function (e) {void 0 !== o[e] && (o[e] = i[e][o[e]] || o[e]);}), o;}function By(e) {return e && e.length > 0 ? ws(e).call(e, function (e) {return Dy(e);}) : [];}function Hy(e) {var t,r = function (e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Iy(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Iy(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}({}, e),n = ["avatar", "name", "intro", "announcement", "ext"],a = { joinMode: Cy, beInviteMode: jy, inviteMode: Ry, updateTeamMode: Ny, updateExtMode: qy };return Li(n).call(n, function (e) {void 0 !== r[e] && (r[e] = r[e].toString());}), Li(t = Fi(a)).call(t, function (e) {void 0 !== r[e] && (r[e] = a[e][r[e]]);}), r;}function zy(e) {var t = ["teamId", "ext", "account", "nickInTeam"],r = ["mute"],n = {};return void 0 !== e.bitConfigMask && (n.bits = au(e.bitConfigMask)), Li(t).call(t, function (t) {e[t] && (n[t] = e[t].toString());}), Li(r).call(r, function (t) {void 0 !== e[t] && (n[t] = !!e[t]);}), n;}function Vy(e) {var t,r,n = ["teamId"],a = ["joinTime", "updateTime"],i = ["active", "valid", "mute"],o = { type: _y },s = e.bits,c = pl(e, ["bits"]);return void 0 !== s && (c.muteTeam = 1 === au(s), c.bitConfigMask = s), c.id = Ki(t = "".concat(c.teamId, "-")).call(t, c.account), Li(n).call(n, function (e) {c[e] && (c[e] = c[e].toString());}), Li(a).call(a, function (e) {void 0 !== c[e] && (c[e] = au(c[e]));}), Li(i).call(i, function (e) {void 0 !== c[e] && (c[e] = 1 === au(c[e]));}), Li(r = Fi(o)).call(r, function (e) {void 0 !== c[e] && (c[e] = o[e][c[e]] || c[e]);}), c;}function Wy(e) {return e && e.length > 0 ? ws(e).call(e, function (e) {return Vy(e);}) : [];}function $y(e, t) {var r,n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "normal";return { id: Ki(r = "".concat(e.teamId, "-")).call(r, t), account: t, type: n, nickInTeam: "", muteTeam: !1, mute: !1, joinTime: e.memberUpdateTime, updateTime: e.memberUpdateTime, active: !0, valid: !0, invitorAccid: "" };}function Ky(e, t) {var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "normal";return t && t.length > 0 ? ws(t).call(t, function (t) {return $y(e, t, r);}) : [];}var Gy = function () {function e(t) {ei(this, e), xi(this, "core", void 0), this.core = t;}return ri(e, [{ key: "notifyAddSuperTeamMembers", value: function value(e, t) {this.core.emit("addSuperTeamMembers", { team: e, accounts: t, members: Ky(e, t) });} }, { key: "notifyUpdateSuperTeamManagers", value: function value(e, t, r, n) {this.core.emit("updateSuperTeamManagers", { team: { teamId: e, memberUpdateTime: n }, accounts: t, isManager: r, members: ws(t).call(t, function (t) {var r;return { id: Ki(r = "".concat(e, "-")).call(r, t), type: "manager", updateTime: n };}) });} }, { key: "notifyRemoveSuperTeamMembers", value: function value(e, t) {this.core.emit("removeSuperTeamMembers", { team: e, accounts: t });} }, { key: "notifyTransferSuperTeam", value: function value(e, t, r) {var n, a;this.core.emit("transferSuperTeam", { team: e, from: { id: Ki(n = "".concat(e.teamId, "-")).call(n, t), type: "normal", updateTime: e.memberUpdateTime }, to: { id: Ki(a = "".concat(e.teamId, "-")).call(a, r), type: "owner", updateTime: e.memberUpdateTime } });} }, { key: "notifyUpdateSuperTeamMembersMute", value: function value(e, t, r) {this.core.emit("updateSuperTeamMembersMute", { team: e, accounts: t, members: ws(t).call(t, function (t) {var n;return { id: Ki(n = "".concat(e.teamId, "-")).call(n, t), account: t, teamId: e.teamId, mute: r, updateTime: e.memberUpdateTime };}), mute: r });} }]), e;}();function Jy(e, t) {var r = Fi(e);if (ur) {var n = ur(e);t && (n = gr(n).call(n, function (t) {return Mr(e, t).enumerable;})), r.push.apply(r, n);}return r;}function Yy(e) {for (var t = 1; t < arguments.length; t++) {var r,n = null != arguments[t] ? arguments[t] : {};if (t % 2) Li(r = Jy(Object(n), !0)).call(r, function (t) {xi(e, t, n[t]);});else if (wr) Ir(e, wr(n));else {var a;Li(a = Jy(Object(n))).call(a, function (t) {Ar(e, t, Mr(n, t));});}}return e;}function Qy(e) {var t = function () {if ("undefined" == typeof Reflect || !Oe) return !1;if (Oe.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Boolean.prototype.valueOf.call(Oe(Boolean, [], function () {})), !0;} catch (e) {return !1;}}();return function () {var r,n = ci(e);if (t) {var a = ci(this).constructor;r = Oe(n, arguments, a);} else r = n.apply(this, arguments);return wi(this, r);};}var Xy = function (e) {di(k, e);var t,r,n,a,i,o,s,c,u,l,p,m,d,f,y,v,g,h,b,T,M,S = Qy(k);function k(e) {var t;return ei(this, k), xi(ni(t = S.call(this, "superTeam", e)), "service", void 0), t.service = new Gy(e), t.core.on("_notification", function (e) {return t.notificationHandler(e);}), t;}return ri(k, [{ key: "getSuperTeamInfo", value: (M = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("getSuperTeamInfo", { teamId: t.teamId });case 3:return r = e.sent, n = r.content.superTeam, e.abrupt("return", Dy(n));case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return M.apply(this, arguments);}) }, { key: "getSuperTeams", value: (T = Za(Ei.mark(function e() {var t, r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return e.next = 2, this.core.sendCmd("getSuperTeams", { timetag: 0 });case 2:return t = e.sent, r = t.content.superTeams, e.abrupt("return", By(r));case 5:case "end":return e.stop();}}}, e, this);})), function () {return T.apply(this, arguments);}) }, { key: "updateSuperTeamInfo", value: (b = Za(Ei.mark(function e(t) {var r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, name: { type: "string", allowEmpty: !1, required: !1 }, joinMode: { type: "enum", values: ["noVerify", "needVerify", "rejectAll"], required: !1 }, beInviteMode: { type: "enum", values: ["noVerify", "needVerify"], required: !1 }, inviteMode: { type: "enum", values: ["manager", "all"], required: !1 }, updateTeamMode: { type: "enum", values: ["manager", "all"], required: !1 }, updateExtMode: { type: "enum", values: ["manager", "all"], required: !1 }, intro: { type: "string", allowEmpty: !1, required: !1 }, announcement: { type: "string", allowEmpty: !1, required: !1 }, avatar: { type: "string", allowEmpty: !1, required: !1 }, ext: { type: "string", allowEmpty: !1, required: !1 } }, t), r = Hy(t), e.next = 4, this.core.sendCmd("updateSuperTeamInfo", { superTeam: r });case 4:return e.abrupt("return", Dy(r));case 5:case "end":return e.stop();}}}, e, this);})), function (e) {return b.apply(this, arguments);}) }, { key: "addSuperTeamMembers", value: (h = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", itemType: "string", min: 1 }, ps: { type: "string", allowEmpty: !0, max: 5e3, required: !1 } }, t), e.next = 3, this.core.sendCmd("addSuperTeamMembers", { teamId: t.teamId, accounts: t.accounts, ps: t.ps || "", attach: t.ext || "" });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return h.apply(this, arguments);}) }, { key: "removeSuperTeamMembers", value: (g = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", itemType: "string", min: 1 } }, t), e.next = 3, this.core.sendCmd("removeSuperTeamMembers", { teamId: t.teamId, accounts: t.accounts });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return g.apply(this, arguments);}) }, { key: "addSuperTeamManagers", value: (v = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", min: 1, itemType: "string" } }, t), e.next = 3, this.core.sendCmd("addSuperTeamManagers", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return v.apply(this, arguments);}) }, { key: "removeSuperTeamManagers", value: (y = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", min: 1, itemType: "string" } }, t), e.next = 3, this.core.sendCmd("removeSuperTeamManagers", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return y.apply(this, arguments);}) }, { key: "applySuperTeam", value: (f = Za(Ei.mark(function e(t) {var r;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, ps: { type: "string", allowEmpty: !0, max: 5e3, required: !1 } }, t), e.next = 3, this.core.sendCmd("applySuperTeam", { teamId: t.teamId, ps: t.ps || "" });case 3:return r = e.sent, e.abrupt("return", Dy(r.content.superTeam));case 5:case "end":return e.stop();}}}, e, this);})), function (e) {return f.apply(this, arguments);}) }, { key: "transferSuperTeam", value: (d = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, account: { type: "string", allowEmpty: !1 }, leave: { type: "boolean" } }, t), e.next = 3, this.core.sendCmd("transferSuperTeam", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return d.apply(this, arguments);}) }, { key: "muteSuperTeam", value: (m = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, mute: { type: "boolean" } }, t), e.next = 3, this.core.sendCmd("muteSuperTeam", { teamId: t.teamId, mute: t.mute ? 1 : 0 });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return m.apply(this, arguments);}) }, { key: "muteSuperTeamMembers", value: (p = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", itemType: "string" }, mute: { type: "boolean" } }, t), e.next = 3, this.core.sendCmd("muteSuperTeamMembers", { teamId: t.teamId, accounts: t.accounts, mute: t.mute ? 1 : 0 });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return p.apply(this, arguments);}) }, { key: "updateMemberNick", value: (l = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, account: { type: "string", allowEmpty: !1 }, nickInTeam: { type: "string", allowEmpty: !1 } }, t), r = zy({ teamId: t.teamId, nickInTeam: t.nickInTeam, account: t.account }), e.next = 4, this.core.sendCmd("updateSuperTeamMemberNick", { teamMember: r });case 4:return n = Vy(Yy({ updateTime: new Date().getTime() }, r)), e.abrupt("return", n);case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return l.apply(this, arguments);}) }, { key: "updateMyMemberInfo", value: (u = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, nickInTeam: { type: "string", allowEmpty: !1, required: !1 }, bitConfigMask: { type: "number", min: 0, max: 2, required: !1 }, ext: { type: "string", required: !1 } }, t), r = zy({ teamId: t.teamId, nickInTeam: t.nickInTeam, bitConfigMask: t.bitConfigMask, ext: t.ext }), e.next = 4, this.core.sendCmd("updateMySuperTeamMemberInfo", { teamMember: r });case 4:return n = Vy(Yy({ updateTime: new Date().getTime(), account: this.core.account }, r)), this.core.emit("updateSuperTeamMember", n), e.abrupt("return", n);case 7:case "end":return e.stop();}}}, e, this);})), function (e) {return u.apply(this, arguments);}) }, { key: "getSuperTeamMembersByAccounts", value: (c = Za(Ei.mark(function e(t) {var r, n, a, i;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, accounts: { type: "array", itemType: "string", max: 20, min: 1 } }, t), a = ws(r = t.accounts).call(r, function (e) {var r;return Ki(r = "".concat(t.teamId, "|")).call(r, e);}), e.next = 4, this.core.sendCmd("getSuperTeamMembersByAccounts", { memberIds: a });case 4:return i = e.sent, e.abrupt("return", Wy(null === (n = i.content) || void 0 === n ? void 0 : n.superTeamMembers));case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return c.apply(this, arguments);}) }, { key: "getSuperTeamMembers", value: (s = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, joinTime: { type: "number", min: 0, required: !1 }, limit: { type: "number", min: 1, max: 1e3, required: !1 }, reverse: { type: "boolean", required: !1 } }, t), e.next = 3, this.core.sendCmd("getSuperTeamMembers", Yy({ joinTime: 0, limit: 100, reverse: !1 }, t));case 3:return n = e.sent, e.abrupt("return", Wy(null === (r = n.content) || void 0 === r ? void 0 : r.superTeamMembers));case 5:case "end":return e.stop();}}}, e, this);})), function (e) {return s.apply(this, arguments);}) }, { key: "queryMuteMembers", value: (o = Za(Ei.mark(function e(t) {var r, n;return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("queryMuteSuperTeamMembers", Yy({ limit: 100, joinTime: 0, reverse: !1 }, t));case 3:return r = e.sent, n = r.content, e.abrupt("return", Wy(n.superTeamMembers));case 6:case "end":return e.stop();}}}, e, this);})), function (e) {return o.apply(this, arguments);}) }, { key: "leaveSuperTeam", value: (i = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("leaveSuperTeam", { teamId: t.teamId });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return i.apply(this, arguments);}) }, { key: "passSuperTeamApply", value: (a = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, from: { type: "string", allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("passSuperTeamApply", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return a.apply(this, arguments);}) }, { key: "rejectSuperTeamApply", value: (n = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, from: { type: "string", allowEmpty: !1 }, ps: { type: "string", max: 5e3, required: !1 } }, t), e.next = 3, this.core.sendCmd("rejectSuperTeamApply", { teamId: t.teamId, from: t.from, ps: t.ps || "" });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return n.apply(this, arguments);}) }, { key: "acceptSuperTeamInvite", value: (r = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, from: { type: "string", allowEmpty: !1 } }, t), e.next = 3, this.core.sendCmd("acceptSuperTeamInvite", t);case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return r.apply(this, arguments);}) }, { key: "rejectSuperTeamInvite", value: (t = Za(Ei.mark(function e(t) {return Ei.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return hc({ teamId: { type: "string", regExp: /\d+/, allowEmpty: !1 }, from: { type: "string", allowEmpty: !1 }, ps: { type: "string", max: 5e3, required: !1 } }, t), e.next = 3, this.core.sendCmd("rejectSuperTeamInvite", { teamId: t.teamId, from: t.from, ps: t.ps || "" });case 3:case "end":return e.stop();}}}, e, this);})), function (e) {return t.apply(this, arguments);}) }, { key: "syncSuperTeamsHandler", value: function value(e) {var t = e.content;this.core.emit("_updateTimetag", { teams: au(t.timetag) });var r = null == t ? void 0 : t.superTeams;if (r && r.length) {var n = By(r);this.core.emit("superTeams", n);}} }, { key: "syncCreateSuperTeamHandler", value: function value(e) {var t = e.content,r = Dy(null == t ? void 0 : t.superTeam),n = $y(r, r.owner, "owner");this.core.emit("createSuperTeam", r, n);} }, { key: "syncUpdateSuperTeamMemberHandler", value: function value(e) {var t = e.content,r = Vy(null == t ? void 0 : t.teamMember);r.updateTime || (r.updateTime = new Date().getTime()), this.core.emit("updateSuperTeamMember", r);} }, { key: "notificationHandler", value: function value(e) {var t = e.attach,r = e.scene,n = e.from,a = e.to,i = e.time,o = e.idServer,s = e.idClient,c = t.team,u = t.account,l = t.accounts,p = t.type;if ("superTeam" === r) switch ("debug" === this.core.options.debugLevel ? this.logger.debug("superTeam::recvNotification", o, s, t) : this.logger.log("superTeam::recvNotification", o, s, a, p, u, l), p) {case "updateSuperTeam":c.updateTime = i, this.core.emit("updateSuperTeam", c);break;case "addSuperTeamMembers":this.service.notifyAddSuperTeamMembers(c, l);break;case "acceptSuperTeamInvite":this.service.notifyAddSuperTeamMembers(c, [n]);break;case "passSuperTeamApply":this.service.notifyAddSuperTeamMembers(c, [u]);break;case "addSuperTeamManagers":this.service.notifyUpdateSuperTeamManagers(a, l, !0, i);break;case "removeSuperTeamManagers":this.service.notifyUpdateSuperTeamManagers(a, l, !1, i);break;case "removeSuperTeamMembers":this.service.notifyRemoveSuperTeamMembers(c, l);break;case "leaveSuperTeam":this.service.notifyRemoveSuperTeamMembers(c, [n]);break;case "dismissSuperTeam":this.core.emit("dismissSuperTeam", { teamId: a });break;case "transferSuperTeam":this.service.notifyTransferSuperTeam(c, n, u);break;case "updateSuperTeamMembersMute":this.service.notifyUpdateSuperTeamMembersMute(c, l, t.mute);}} }]), k;}(Gc);return xi(Xy, "idName", "superTeam"), xi(Xy, "cmdParser", { cmdMap: { "21_5": "addSuperTeamMembers", "21_6": "removeSuperTeamMembers", "21_7": "leaveSuperTeam", "21_8": "updateSuperTeamInfo", "21_9": "getSuperTeamInfo", "21_12": "getSuperTeams", "21_15": "getSuperTeamMembers", "21_10": "updateMySuperTeamMemberInfo", "21_20": "applySuperTeam", "21_21": "passSuperTeamApply", "21_22": "rejectSuperTeamApply", "21_23": "acceptSuperTeamInvite", "21_24": "rejectSuperTeamInvite", "21_26": "addSuperTeamManagers", "21_27": "removeSuperTeamManagers", "21_28": "muteSuperTeam", "21_29": "muteSuperTeamMembers", "21_30": "updateSuperTeamMemberNick", "21_31": "transferSuperTeam", "21_33": "getSuperTeamMembersByAccounts", "21_34": "queryMuteSuperTeamMembers", "21_101": "syncCreateSuperTeam", "21_109": "syncSuperTeams", "21_110": "syncUpdateSuperTeamMember" }, cmdConfig: { getSuperTeamInfo: { sid: 21, cid: 9, service: "superTeam", params: [{ type: "Long", name: "teamId" }], response: [{ type: "Property", name: "superTeam" }] }, getSuperTeams: { sid: 21, cid: 12, service: "superTeam", params: [{ type: "long", name: "timetag" }], response: [{ type: "PropertyArray", name: "superTeams", entity: "superTeam" }, { type: "Number", name: "timetag" }] }, updateSuperTeamInfo: { sid: 21, cid: 8, service: "superTeam", params: [{ type: "Property", name: "superTeam" }], response: [{ type: "Number", name: "id" }, { type: "Number", name: "time" }] }, addSuperTeamMembers: { sid: 21, cid: 5, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }, { type: "String", name: "ps" }], response: [{ type: "StrArray", name: "abortedAccidList" }, { type: "Long", name: "time" }] }, removeSuperTeamMembers: { sid: 21, cid: 6, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, addSuperTeamManagers: { sid: 21, cid: 26, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, removeSuperTeamManagers: { sid: 21, cid: 27, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, applySuperTeam: { sid: 21, cid: 20, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "ps" }], response: [{ type: "Property", name: "superTeam" }] }, transferSuperTeam: { sid: 21, cid: 31, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "account" }, { type: "bool", name: "leave" }] }, muteSuperTeam: { sid: 21, cid: 28, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "Int", name: "mute" }] }, muteSuperTeamMembers: { sid: 21, cid: 29, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }, { type: "Int", name: "mute" }] }, updateSuperTeamMemberNick: { sid: 21, cid: 30, service: "superTeam", params: [{ type: "Property", name: "teamMember" }] }, updateMySuperTeamMemberInfo: { sid: 21, cid: 10, service: "superTeam", params: [{ type: "Property", name: "teamMember" }] }, getSuperTeamMembersByAccounts: { sid: 21, cid: 33, service: "superTeam", params: [{ type: "StrArray", name: "memberIds" }], response: [{ type: "PropertyArray", name: "superTeamMembers", entity: "superTeamMember" }] }, getSuperTeamMembers: { sid: 21, cid: 15, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "Long", name: "joinTime" }, { type: "Int", name: "limit" }, { type: "Bool", name: "reverse" }], response: [{ type: "PropertyArray", name: "superTeamMembers", entity: "superTeamMember" }] }, queryMuteSuperTeamMembers: { sid: 21, cid: 34, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "Long", name: "joinTime" }, { type: "Int", name: "limit" }, { type: "Bool", name: "reverse" }], response: [{ type: "PropertyArray", name: "superTeamMembers", entity: "superTeamMember" }] }, leaveSuperTeam: { sid: 21, cid: 7, service: "superTeam", params: [{ type: "Long", name: "teamId" }] }, passSuperTeamApply: { sid: 21, cid: 21, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }] }, rejectSuperTeamApply: { sid: 21, cid: 22, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }, { type: "String", name: "ps" }] }, acceptSuperTeamInvite: { sid: 21, cid: 23, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }] }, rejectSuperTeamInvite: { sid: 21, cid: 24, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }, { type: "String", name: "ps" }] }, syncSuperTeams: { sid: 21, cid: 109, service: "superTeam", response: [{ type: "PropertyArray", name: "teams", entity: "superTeam" }, { type: "Bool", name: "isAll" }, { type: "Long", name: "timetag" }] }, syncCreateSuperTeam: { sid: 21, cid: 101, service: "superTeam", response: [{ type: "Property", name: "superTeam" }] }, syncUpdateSuperTeamMember: { sid: 21, cid: 110, service: "superTeam", response: [{ type: "Property", name: "teamMember", entity: "superTeamMember" }] } }, serializeMap: { superTeam: { teamId: 1, name: 3, type: 4, owner: 5, level: 6, selfCustom: 7, valid: 8, memberNum: 9, memberUpdateTime: 10, createTime: 11, updateTime: 12, validToCurrentUser: 13, intro: 14, announcement: 15, joinMode: 16, bits: 17, ext: 18, serverExt: 19, avatar: 20, beInviteMode: 21, inviteMode: 22, updateTeamMode: 23, updateExtMode: 24, mute: 100, muteType: 101 }, superTeamMember: { teamId: 1, account: 3, type: 4, nickInTeam: 5, bits: 7, active: 8, valid: 9, joinTime: 10, updateTime: 11, ext: 12, mute: 13, invitorAccid: 14 } }, deserializeMap: { superTeam: { 1: "teamId", 3: "name", 4: "type", 5: "owner", 6: "level", 7: "selfCustom", 8: "valid", 9: "memberNum", 10: "memberUpdateTime", 11: "createTime", 12: "updateTime", 13: "validToCurrentUser", 14: "intro", 15: "announcement", 16: "joinMode", 17: "bits", 18: "ext", 19: "serverExt", 20: "avatar", 21: "beInviteMode", 22: "inviteMode", 23: "updateTeamMode", 24: "updateExtMode", 100: "mute", 101: "muteType" }, superTeamMember: { 1: "teamId", 3: "account", 4: "type", 5: "nickInTeam", 7: "bits", 8: "active", 9: "valid", 10: "joinTime", 11: "updateTime", 12: "ext", 13: "mute", 14: "invitorAccid" } } }), jc.setAdapters($c), jc.registerService(Qu), jc.registerService(Tp), jc.registerService(wp), jc.registerService(nd), jc.registerService(dd), jc.registerService(Td), jc.registerService(_d), jc.registerService(Ld), jc.registerService(zd), jc.registerService(Yd), jc.registerService(ef), jc.registerService(rf), jc.registerService(xy), jc.registerService(Xy), jc.registerService(Sp), jc;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/global.js */ 2), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!****************************************************************************************!*\
  !*** C:/Users/yanchao03/Desktop/IM demo/HBuilderProjects/demo/static/default-icon.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAHl0lEQVR42u2d249bVxWHP59jezy+jEfT2kpmUElZKdAHCoGHCqo+NCWFSlSCNwoUtRQJBEUIJC5/AhQEAgICibQRIOAJkFqJpqHhragS4hKkXmi2ShNqReOJ5+IZj68xD+fMxDOxPT72vpi2nzTyTOK991q/OXO891p7rxPDIUqpG4FjwDuAd4avS8ANQBrIAk1gE1gLX5eBl4AXw9e/i8iKKx9ilgVLA3cDx4G7gNs02NAFzgN/Bs4Bz4hIzZZPxgVUSnnACeBB4D4gY3jILeAJ4DRwVkSumhzMmIBKqSzwWeDLwBGTTgzhP8APgJ+LyKaJAbQLqJSaBR4Bvg7caFKdCKwA3wF+JCLbOjvWKqBS6uPAt4Gb7GkTiYvAN0Tkt7o61CKgUuqtwE+BDzsSJipngM+JyKuTduRN2oFS6lMEn4L/L+IBfAg4H9o+EWNfgUqpFPBj4DOu1ZiQx4EviEh9nMZjCaiUKgJ/AN7v2ntN/AX4qIgsR20YWUCl1M3AWUBce60ZBZwQkVeiNIokoFLqVuBPwKJrbw1RAj4oIi+M2mBkAZVSRwmWS29x7aVh/gvcJSIXRnnzSAIqpQrAs8BR195Z4gLwAREpH/TGA6cxSqkkwdryjSIeoa9PKKVmDnrjKPPAnwC3u/bIAbcTTNOGMvRPOJxo/tK1J455QER+Neg/BwoYLs/OA3OuPXDMBnDboGVffEjDn2FZvEajwebmJvV6nXa7TafTAcD3feLxOKlUimw2y8zMgbcmncyFWvRdqva9AsOoym9sWdjpdCiXy9RqowWS0+k0hUIB3/dtmQjwCRG5TpPrBAzD7i9gKSTVbrcplUq02+1I7RKJBIcPHyYej0dqNwEXgVv3pwv6fQo/gsV4XrlcjiweQKvVolw+cJqmk5sItNnDniswDMO/gqVIcq1W4/LlyxP1cejQIdLptA1zAa4AR3rTA/uvwIewGIbf2NiYuI/NTSOpjkHcQKDRLrsChtmzr9i0pl4fKwSnvY+IfDXUCth7BZ4AbrZlRbvd5urVyTOOuvqJwBHgnp0fegV80KYVO3M8HVgWEHq08mB36nKfTQu63a62vhwI+BGlVAauXYH3YH7HwB48b+J8lpG+RiRDcMvbFdB6Rk3nKsKBgBBqtjPycduj+75PLDZ5WjoWi7kS8DiAF2bYbnFhQTKZnLiPRCLhwnSAW5RSRQ94rysLdERVdPwSJuB9HvAeV6PrEDCVSrkyH+DdHg5zHTrWsLOzs67MBzjqYXH1sR/f9ye6ChOJhMt7IMDbPBwnybPZrJO2mjjsAQsuLcjlcmNNQ2KxGHNzztM1Cx7g9Cbied5YQszNzdkO6fcj7QE511bMz89HCs37vs/8/LxrswGyHsE5DKd4nkexWBx5ZeIgoTTYdqDq2ggI5nP5fP7A9+XzeZsh/IPYnBoBu93uSCGuUd9niVochwI2Gg22trbY3t6m2WyOJMzGxgbVapVkMsns7CyZTMZ2or2XShywmhvsdrtUq1XW19dptVpj99FoNGg0GqytrZFIJMjn8+RyOS0RnghcjhOkMa1Qr9cpl8tjCzeIVqvFysoK6+vrFAoFm+tj5RFsJjROpVKhVCppF6+XVqtFqVSiUqnYcAngQhz4h+lRlpeXreZv19bW6HQ6FAoF00Od94C/mRxhdXXVdvIbgGq1yurqqulh/uqFZyOM/Bk3m00bTgxkdXWVZtPYOuFlEVneWcWfMzGCjq0bU2zDObiWVPqjiRFG3e9nEoM2PAXXBDxLcNJbKzp3H0yZDVsEmgUCisgW8KTuURylG/dgaGL9ZKjZnr0xp3WP4nCJtYuhSfXpnW96BXyaoMaANnI556FGEza8SqAV0CNgWN3iezpHymQyTtOOqVSKTEb7lp/v91YC2X+TepxgG6s2isWik+Cn7/sUi0Xd3V4BTvX+wx4Bw72/j+ocMR6Ps7i4aDX9mEgkWFxcNLGD/9H95VP6fUyeJNjSr9WhpaUlK2nIbDbL0tKSiV/YxVCbPQw6aHM/8GsTDm5vb1OpVGg0Glr7nZmZYWFhweROhU+KyHWaDDsr9xRBdQsj1Ot1qtUqtVpt7Mmu7/uk02lyuZzpD6unRaSvFsNuEp8H/omh83KpVGrX6UajQb1ep9ls0mq1djeO72zd9TwPz/OIx+MkEgmSySSpVMrWPHMj1KIvBx13fQD4hQ0rp5hPi8jAI79D11phw1O8cXlsmHgw2on1LwLPufbEAc+Fvg/lzaIT/dFXdAIg7Ohe4DXXnlngNeDeUcSDCMXHwjoqJ4BLrj00yCWC6kUjpzgiBezCij53AM+79tQAzwN3RKlaBGOUvxORS8CdBPfE1wvPAneGvkVirJCxiFQIDpqcHKf9lHESOB76FJmJ491KqY8BjwHzrpWIyBrwsIj8bpJOJk5aiMjvCc6anHGtSATOAMcmFQ/0F6G9H/gW012E9pv9ypeMi6kyyF8CvsZ0lUH+LvDDqS6D3ItSKgc8zHQU4j4lIkY2kr5ZCn5CXD2M4G6ChxG8S4MNXeBfBNU1n+H19jCCYYRBimPA27n+cRgZrl2tW+HXFYK16s7jMP5N8DgMq9uUe/kfaOJY16kdYkUAAAAASUVORK5CYII="

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
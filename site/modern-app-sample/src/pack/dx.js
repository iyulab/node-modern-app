var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ColumnBuilder {
  static Money(field, caption) {
    return {
      dataField: field,
      caption,
      format: { type: "number", formatter: (value) => value.toLocaleString() }
    };
  }
  static Lookup(lookupSource, keyField, field, caption) {
    return {
      dataField: keyField,
      caption,
      lookup: lookupSource.field(field)
    };
  }
}
var types = {
  "[object Array]": "array",
  "[object Date]": "date",
  "[object Object]": "object",
  "[object String]": "string"
};
var type = function(object) {
  if (null === object) {
    return "null";
  }
  var typeOfObject = Object.prototype.toString.call(object);
  return "object" === typeof object ? types[typeOfObject] || "object" : typeof object;
};
var isDefined = function(object) {
  return null !== object && void 0 !== object;
};
var isFunction = function(object) {
  return "function" === typeof object;
};
var isString = function(object) {
  return "string" === typeof object;
};
var isObject = function(object) {
  return "object" === type(object);
};
var isEmptyObject = function(object) {
  var property;
  for (property in object) {
    return false;
  }
  return true;
};
var isPlainObject = function(object) {
  if (!object || "object" !== type(object)) {
    return false;
  }
  var proto = Object.getPrototypeOf(object);
  if (!proto) {
    return true;
  }
  var ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return "function" === typeof ctor && Object.toString.call(ctor) === Object.toString.call(Object);
};
var isWindow = function(object) {
  return null != object && object === object.window;
};
var isPromise = function(object) {
  return !!object && isFunction(object.then);
};
var isDeferred = function(object) {
  return !!object && isFunction(object.done) && isFunction(object.fail);
};
var extendFromObject = function(target, source, overrideExistingValues) {
  target = target || {};
  for (var prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      var value = source[prop];
      if (!(prop in target) || overrideExistingValues) {
        target[prop] = value;
      }
    }
  }
  return target;
};
var extend = function extend2(target) {
  target = target || {};
  var i = 1;
  var deep = false;
  if ("boolean" === typeof target) {
    deep = target;
    target = arguments[1] || {};
    i++;
  }
  for (; i < arguments.length; i++) {
    var source = arguments[i];
    if (null == source) {
      continue;
    }
    for (var key in source) {
      var targetValue = target[key];
      var sourceValue = source[key];
      var sourceValueIsArray = false;
      var clone = void 0;
      if ("__proto__" === key || "constructor" === key || target === sourceValue) {
        continue;
      }
      if (deep && sourceValue && (isPlainObject(sourceValue) || (sourceValueIsArray = Array.isArray(sourceValue)))) {
        if (sourceValueIsArray) {
          clone = targetValue && Array.isArray(targetValue) ? targetValue : [];
        } else {
          clone = targetValue && isPlainObject(targetValue) ? targetValue : {};
        }
        target[key] = extend2(deep, clone, sourceValue);
      } else if (void 0 !== sourceValue) {
        target[key] = sourceValue;
      }
    }
  }
  return target;
};
var noop$1 = function() {
};
var getConsoleMethod = function(method) {
  if ("undefined" === typeof console || !isFunction(console[method])) {
    return noop$1;
  }
  return console[method].bind(console);
};
var logger = {
  log: getConsoleMethod("log"),
  info: getConsoleMethod("info"),
  warn: getConsoleMethod("warn"),
  error: getConsoleMethod("error")
};
function format$1(template) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  if (isFunction(template)) {
    return template(...values);
  }
  values.forEach((value, index) => {
    if (isString(value)) {
      value = value.replace(/\$/g, "$$$$");
    }
    var placeholderReg = new RegExp("\\{" + index + "\\}", "gm");
    template = template.replace(placeholderReg, value);
  });
  return template;
}
var version = "23.2.3";
var ERROR_URL = "https://js.devexpress.com/error/" + version.split(".").slice(0, 2).join("_") + "/";
function errorUtils(baseErrors, errors2) {
  var exports = {
    ERROR_MESSAGES: extend(errors2, baseErrors),
    Error: function() {
      return makeError([].slice.call(arguments));
    },
    log: function(id) {
      var method = "log";
      if (/^E\d+$/.test(id)) {
        method = "error";
      } else if (/^W\d+$/.test(id)) {
        method = "warn";
      }
      logger[method]("log" === method ? id : combineMessage([].slice.call(arguments)));
    }
  };
  function combineMessage(args) {
    var id = args[0];
    args = args.slice(1);
    return formatMessage(id, formatDetails(id, args));
  }
  function formatDetails(id, args) {
    args = [exports.ERROR_MESSAGES[id]].concat(args);
    return format$1.apply(this, args).replace(/\.*\s*?$/, "");
  }
  function formatMessage(id, details) {
    var kind = null !== id && void 0 !== id && id.startsWith("W") ? "warning" : "error";
    return format$1.apply(this, ["{0} - {1}.\n\nFor additional information on this {2} message, see: {3}", id, details, kind, getErrorUrl(id)]);
  }
  function makeError(args) {
    var id = args[0];
    args = args.slice(1);
    var details = formatDetails(id, args);
    var url = getErrorUrl(id);
    var message = formatMessage(id, details);
    return extend(new Error(message), {
      __id: id,
      __details: details,
      url
    });
  }
  function getErrorUrl(id) {
    return ERROR_URL + id;
  }
  return exports;
}
const coreErrors = errorUtils({
  E0001: "Method is not implemented",
  E0002: "Member name collision: {0}",
  E0003: "A class must be instantiated using the 'new' keyword",
  E0004: "The NAME property of the component is not specified",
  E0005: "Unknown device",
  E0006: "Unknown endpoint key is requested",
  E0007: "'Invalidate' method is called outside the update transaction",
  E0008: "Type of the option name is not appropriate to create an action",
  E0009: "Component '{0}' has not been initialized for an element",
  E0010: "Animation configuration with the '{0}' type requires '{1}' configuration as {2}",
  E0011: "Unknown animation type '{0}'",
  E0012: "jQuery version is too old. Please upgrade jQuery to 1.10.0 or later",
  E0013: "KnockoutJS version is too old. Please upgrade KnockoutJS to 2.3.0 or later",
  E0014: "The 'release' method shouldn't be called for an unlocked Lock object",
  E0015: "Queued task returned an unexpected result",
  E0017: "Event namespace is not defined",
  E0018: "DevExpress.ui.DevExpressPopup widget is required",
  E0020: "Template engine '{0}' is not supported",
  E0021: "Unknown theme is set: {0}",
  E0022: "LINK[rel=DevExpress-theme] tags must go before DevExpress included scripts",
  E0023: "Template name is not specified",
  E0024: "DevExtreme bundle already included",
  E0025: "Unexpected argument type",
  E0100: "Unknown validation type is detected",
  E0101: "Misconfigured range validation rule is detected",
  E0102: "Misconfigured comparison validation rule is detected",
  E0103: "validationCallback of an asynchronous rule should return a jQuery or a native promise",
  E0110: "Unknown validation group is detected",
  E0120: "Adapter for a DevExpressValidator component cannot be configured",
  E0121: "The 'customItem' parameter of the 'onCustomItemCreating' function is empty or contains invalid data. Assign a custom object or a Promise that is resolved after the item is created.",
  W0000: "'{0}' is deprecated in {1}. {2}",
  W0001: "{0} - '{1}' option is deprecated in {2}. {3}",
  W0002: "{0} - '{1}' method is deprecated in {2}. {3}",
  W0003: "{0} - '{1}' property is deprecated in {2}. {3}",
  W0004: "Timeout for theme loading is over: {0}",
  W0005: "'{0}' event is deprecated in {1}. {2}",
  W0006: "Invalid recurrence rule: '{0}'",
  W0007: "'{0}' Globalize culture is not defined",
  W0008: "Invalid view name: '{0}'",
  W0009: "Invalid time zone name: '{0}'",
  W0010: "{0} is deprecated in {1}. {2}",
  W0011: "Number parsing is invoked while the parser is not defined",
  W0012: "Date parsing is invoked while the parser is not defined",
  W0013: "'{0}' file is deprecated in {1}. {2}",
  W0014: "{0} - '{1}' type is deprecated in {2}. {3}",
  W0015: "Instead of returning a value from the '{0}' function, write it into the '{1}' field of the function's parameter.",
  W0016: 'The "{0}" option does not accept the "{1}" value since v{2}. {3}.',
  W0017: 'Setting the "{0}" property with a function is deprecated since v21.2',
  W0018: 'Setting the "position" property with a function is deprecated since v21.2',
  W0019: "DevExtreme: Unable to Locate a Valid License Key.\n\nIf you are using a 30-day trial version of DevExtreme, you must uninstall all copies of DevExtreme once your 30-day trial period expires. For terms and conditions that govern use of DevExtreme UI components/libraries, please refer to the DevExtreme End User License Agreement: https://js.devexpress.com/EULAs/DevExtremeComplete.\n\nTo use DevExtreme in a commercial project, you must purchase a license. For pricing/licensing options, please visit: https://js.devexpress.com/Buy.\n\nIf you have licensing-related questions or need help with a purchase, please email clientservices@devexpress.com.\n\n",
  W0020: "DevExtreme: License Key Has Expired.\n\nA mismatch exists between the license key used and the DevExtreme version referenced in this project.\n\nTo proceed, you can:\n• use a version of DevExtreme linked to your license key: https://www.devexpress.com/ClientCenter/DownloadManager\n• renew your DevExpress Subscription: https://www.devexpress.com/buy/renew (once you renew your subscription, you will be entitled to product updates and support service as defined in the DevExtreme End User License Agreement)\n\nIf you have licensing-related questions or need help with a renewal, please email clientservices@devexpress.com.\n\n",
  W0021: "DevExtreme: License Key Verification Has Failed.\n\nTo verify your DevExtreme license, make certain to specify a correct key in the GlobalConfig. If you continue to encounter this error, please visit https://www.devexpress.com/ClientCenter/DownloadManager to obtain a valid license key.\n\nIf you have a valid license and this problem persists, please submit a support ticket via the DevExpress Support Center. We will be happy to follow-up: https://supportcenter.devexpress.com/ticket/create.\n\n",
  W0022: "DevExtreme: Pre-release software. Not suitable for commercial use.\n\nPre-release software may contain deficiencies and as such, should not be considered for use or integrated in any mission critical application.\n\n"
});
var config = {
  rtlEnabled: false,
  defaultCurrency: "USD",
  defaultUseCurrencyAccountingStyle: true,
  oDataFilterToLower: true,
  serverDecimalSeparator: ".",
  decimalSeparator: ".",
  thousandsSeparator: ",",
  forceIsoDateParsing: true,
  wrapActionsBeforeExecute: true,
  useLegacyStoreResult: false,
  useJQuery: void 0,
  editorStylingMode: void 0,
  useLegacyVisibleIndex: false,
  floatingActionButtonConfig: {
    icon: "add",
    closeIcon: "close",
    label: "",
    position: {
      at: "right bottom",
      my: "right bottom",
      offset: {
        x: -16,
        y: -16
      }
    },
    maxSpeedDialActionCount: 5,
    shading: false,
    direction: "auto"
  },
  optionsParser: (optionsString) => {
    if ("{" !== optionsString.trim().charAt(0)) {
      optionsString = "{" + optionsString + "}";
    }
    try {
      return JSON.parse(optionsString);
    } catch (ex) {
      try {
        return JSON.parse(normalizeToJSONString(optionsString));
      } catch (exNormalize) {
        throw coreErrors.Error("E3018", ex, optionsString);
      }
    }
  }
};
var normalizeToJSONString = (optionsString) => optionsString.replace(/'/g, '"').replace(/,\s*([\]}])/g, "$1").replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":');
var deprecatedFields = ["decimalSeparator", "thousandsSeparator"];
var configMethod = function() {
  if (!arguments.length) {
    return config;
  }
  var newConfig = arguments.length <= 0 ? void 0 : arguments[0];
  deprecatedFields.forEach((deprecatedField) => {
    if (newConfig[deprecatedField]) {
      var message = "Now, the ".concat(deprecatedField, " is selected based on the specified locale.");
      coreErrors.log("W0003", "config", deprecatedField, "19.2", message);
    }
  });
  extend(config, newConfig);
};
if ("undefined" !== typeof DevExpress && DevExpress.config) {
  configMethod(DevExpress.config);
}
var wrapOverridden = function(baseProto, methodName, method) {
  return function() {
    var prevCallBase = this.callBase;
    this.callBase = baseProto[methodName];
    try {
      return method.apply(this, arguments);
    } finally {
      this.callBase = prevCallBase;
    }
  };
};
var clonePrototype = function(obj) {
  var func = function() {
  };
  func.prototype = obj.prototype;
  return new func();
};
var redefine = function(members) {
  var overridden;
  var memberName;
  var member;
  if (!members) {
    return this;
  }
  for (memberName in members) {
    member = members[memberName];
    overridden = "function" === typeof this.prototype[memberName] && "function" === typeof member;
    this.prototype[memberName] = overridden ? wrapOverridden(this.parent.prototype, memberName, member) : member;
  }
  return this;
};
var include = function() {
  var classObj = this;
  var argument;
  var name;
  var i;
  var hasClassObjOwnProperty = Object.prototype.hasOwnProperty.bind(classObj);
  var isES6Class = !hasClassObjOwnProperty("_includedCtors") && !hasClassObjOwnProperty("_includedPostCtors");
  if (isES6Class) {
    classObj._includedCtors = classObj._includedCtors.slice(0);
    classObj._includedPostCtors = classObj._includedPostCtors.slice(0);
  }
  for (i = 0; i < arguments.length; i++) {
    argument = arguments[i];
    if (argument.ctor) {
      classObj._includedCtors.push(argument.ctor);
    }
    if (argument.postCtor) {
      classObj._includedPostCtors.push(argument.postCtor);
    }
    for (name in argument) {
      if ("ctor" === name || "postCtor" === name || "default" === name) {
        continue;
      }
      classObj.prototype[name] = argument[name];
    }
  }
  return classObj;
};
var subclassOf = function(parentClass) {
  var hasParentProperty = Object.prototype.hasOwnProperty.bind(this)("parent");
  var isES6Class = !hasParentProperty && this.parent;
  if (isES6Class) {
    var baseClass = Object.getPrototypeOf(this);
    return baseClass === parentClass || baseClass.subclassOf(parentClass);
  } else {
    if (this.parent === parentClass) {
      return true;
    }
    if (!this.parent || !this.parent.subclassOf) {
      return false;
    }
    return this.parent.subclassOf(parentClass);
  }
};
var abstract$1 = function() {
  throw coreErrors.Error("E0001");
};
var copyStatic = /* @__PURE__ */ function() {
  var hasOwn = Object.prototype.hasOwnProperty;
  return function(source, destination) {
    for (var key in source) {
      if (!hasOwn.call(source, key)) {
        return;
      }
      destination[key] = source[key];
    }
  };
}();
var classImpl = function() {
};
classImpl.inherit = function(members) {
  var inheritor = function() {
    if (!this || isWindow(this) || "function" !== typeof this.constructor) {
      throw coreErrors.Error("E0003");
    }
    var instance = this;
    var ctor = instance.ctor;
    var includedCtors = instance.constructor._includedCtors;
    var includedPostCtors = instance.constructor._includedPostCtors;
    var i;
    for (i = 0; i < includedCtors.length; i++) {
      includedCtors[i].call(instance);
    }
    if (ctor) {
      ctor.apply(instance, arguments);
    }
    for (i = 0; i < includedPostCtors.length; i++) {
      includedPostCtors[i].call(instance);
    }
  };
  inheritor.prototype = clonePrototype(this);
  copyStatic(this, inheritor);
  inheritor.inherit = this.inherit;
  inheritor.abstract = abstract$1;
  inheritor.redefine = redefine;
  inheritor.include = include;
  inheritor.subclassOf = subclassOf;
  inheritor.parent = this;
  inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
  inheritor._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
  inheritor.prototype.constructor = inheritor;
  inheritor.redefine(members);
  return inheritor;
};
classImpl.abstract = abstract$1;
var map = (values, callback) => {
  if (Array.isArray(values)) {
    return values.map(callback);
  }
  var result = [];
  for (var key in values) {
    result.push(callback(values[key], key));
  }
  return result;
};
var each = (values, callback) => {
  if (!values) {
    return;
  }
  if ("length" in values) {
    for (var i = 0; i < values.length; i++) {
      if (false === callback.call(values[i], i, values[i])) {
        break;
      }
    }
  } else {
    for (var key in values) {
      if (false === callback.call(values[key], key, values[key])) {
        break;
      }
    }
  }
  return values;
};
var Callback = function(options) {
  this._options = options || {};
  this._list = [];
  this._queue = [];
  this._firing = false;
  this._fired = false;
  this._firingIndexes = [];
};
Callback.prototype._fireCore = function(context, args) {
  var firingIndexes = this._firingIndexes;
  var list = this._list;
  var stopOnFalse = this._options.stopOnFalse;
  var step = firingIndexes.length;
  for (firingIndexes[step] = 0; firingIndexes[step] < list.length; firingIndexes[step]++) {
    var result = list[firingIndexes[step]].apply(context, args);
    if (false === result && stopOnFalse) {
      break;
    }
  }
  firingIndexes.pop();
};
Callback.prototype.add = function(fn) {
  if ("function" === typeof fn && (!this._options.unique || !this.has(fn))) {
    this._list.push(fn);
  }
  return this;
};
Callback.prototype.remove = function(fn) {
  var list = this._list;
  var firingIndexes = this._firingIndexes;
  var index = list.indexOf(fn);
  if (index > -1) {
    list.splice(index, 1);
    if (this._firing && firingIndexes.length) {
      for (var step = 0; step < firingIndexes.length; step++) {
        if (index <= firingIndexes[step]) {
          firingIndexes[step]--;
        }
      }
    }
  }
  return this;
};
Callback.prototype.has = function(fn) {
  var list = this._list;
  return fn ? list.indexOf(fn) > -1 : !!list.length;
};
Callback.prototype.empty = function(fn) {
  this._list = [];
  return this;
};
Callback.prototype.fireWith = function(context, args) {
  var queue = this._queue;
  args = args || [];
  args = args.slice ? args.slice() : args;
  if (this._options.syncStrategy) {
    this._firing = true;
    this._fireCore(context, args);
  } else {
    queue.push([context, args]);
    if (this._firing) {
      return;
    }
    this._firing = true;
    while (queue.length) {
      var memory = queue.shift();
      this._fireCore(memory[0], memory[1]);
    }
  }
  this._firing = false;
  this._fired = true;
  return this;
};
Callback.prototype.fire = function() {
  this.fireWith(this, arguments);
};
Callback.prototype.fired = function() {
  return this._fired;
};
var Callbacks = function(options) {
  return new Callback(options);
};
var deferredConfig = [{
  method: "resolve",
  handler: "done",
  state: "resolved"
}, {
  method: "reject",
  handler: "fail",
  state: "rejected"
}, {
  method: "notify",
  handler: "progress"
}];
var _DeferredObj = function() {
  var that = this;
  this._state = "pending";
  this._promise = {};
  deferredConfig.forEach((function(config2) {
    var methodName = config2.method;
    this[methodName + "Callbacks"] = Callbacks();
    this[methodName] = (function() {
      return this[methodName + "With"](this._promise, arguments);
    }).bind(this);
    this._promise[config2.handler] = function(handler) {
      if (!handler) {
        return this;
      }
      var callbacks2 = that[methodName + "Callbacks"];
      if (callbacks2.fired()) {
        handler.apply(that[methodName + "Context"], that[methodName + "Args"]);
      } else {
        callbacks2.add((function(context, args) {
          handler.apply(context, args);
        }).bind(this));
      }
      return this;
    };
  }).bind(this));
  this._promise.always = function(handler) {
    return this.done(handler).fail(handler);
  };
  this._promise.catch = function(handler) {
    return this.then(null, handler);
  };
  this._promise.then = function(resolve, reject) {
    var result = new _DeferredObj();
    ["done", "fail"].forEach((function(method) {
      var callback = "done" === method ? resolve : reject;
      this[method](function() {
        if (!callback) {
          result["done" === method ? "resolve" : "reject"].apply(this, arguments);
          return;
        }
        var callbackResult = callback && callback.apply(this, arguments);
        if (isDeferred(callbackResult)) {
          callbackResult.done(result.resolve).fail(result.reject);
        } else if (isPromise(callbackResult)) {
          callbackResult.then(result.resolve, result.reject);
        } else {
          result.resolve.apply(this, isDefined(callbackResult) ? [callbackResult] : arguments);
        }
      });
    }).bind(this));
    return result.promise();
  };
  this._promise.state = function() {
    return that._state;
  };
  this._promise.promise = function(args) {
    return args ? extend(args, that._promise) : that._promise;
  };
  this._promise.promise(this);
};
deferredConfig.forEach(function(config2) {
  var methodName = config2.method;
  var state = config2.state;
  _DeferredObj.prototype[methodName + "With"] = function(context, args) {
    var callbacks2 = this[methodName + "Callbacks"];
    if ("pending" === this.state()) {
      this[methodName + "Args"] = args;
      this[methodName + "Context"] = context;
      if (state) {
        this._state = state;
      }
      callbacks2.fire(context, args);
    }
    return this;
  };
});
function fromPromise(promise, context) {
  if (isDeferred(promise)) {
    return promise;
  } else if (isPromise(promise)) {
    var d = new _DeferredObj();
    promise.then(function() {
      d.resolveWith.apply(d, [context].concat([
        [].slice.call(arguments)
      ]));
    }, function() {
      d.rejectWith.apply(d, [context].concat([
        [].slice.call(arguments)
      ]));
    });
    return d;
  }
  return new _DeferredObj().resolveWith(context, [promise]);
}
var whenFunc = function() {
  if (1 === arguments.length) {
    return fromPromise(arguments[0]);
  }
  var values = [].slice.call(arguments);
  var contexts = [];
  var resolvedCount = 0;
  var deferred = new _DeferredObj();
  var updateState = function(i2) {
    return function(value) {
      contexts[i2] = this;
      values[i2] = arguments.length > 1 ? [].slice.call(arguments) : value;
      resolvedCount++;
      if (resolvedCount === values.length) {
        deferred.resolveWith(contexts, values);
      }
    };
  };
  for (var i = 0; i < values.length; i++) {
    if (isDeferred(values[i])) {
      values[i].promise().done(updateState(i)).fail(deferred.reject);
    } else {
      resolvedCount++;
    }
  }
  if (resolvedCount === values.length) {
    deferred.resolveWith(contexts, values);
  }
  return deferred.promise();
};
function Deferred() {
  return new _DeferredObj();
}
function when() {
  return whenFunc.apply(this, arguments);
}
function injector(object) {
  var BaseClass = classImpl.inherit(object);
  var InjectedClass = BaseClass;
  var instance = new InjectedClass(object);
  var initialFields = {};
  var injectFields = function(injectionObject, initial) {
    each(injectionObject, function(key) {
      if (isFunction(instance[key])) {
        if (initial || !object[key]) {
          object[key] = function() {
            return instance[key].apply(object, arguments);
          };
        }
      } else {
        if (initial) {
          initialFields[key] = object[key];
        }
        object[key] = instance[key];
      }
    });
  };
  injectFields(object, true);
  object.inject = function(injectionObject) {
    InjectedClass = InjectedClass.inherit(injectionObject);
    instance = new InjectedClass();
    injectFields(injectionObject);
  };
  object.resetInjection = function() {
    extend(object, initialFields);
    InjectedClass = BaseClass;
    instance = new BaseClass();
  };
  return object;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Guid = classImpl.inherit({
  ctor: function(value) {
    if (value) {
      value = String(value);
    }
    this._value = this._normalize(value || this._generate());
  },
  _normalize: function(value) {
    value = value.replace(/[^a-f0-9]/gi, "").toLowerCase();
    while (value.length < 32) {
      value += "0";
    }
    return [value.substr(0, 8), value.substr(8, 4), value.substr(12, 4), value.substr(16, 4), value.substr(20, 12)].join("-");
  },
  _generate: function() {
    var value = "";
    for (var i = 0; i < 32; i++) {
      value += Math.round(15 * Math.random()).toString(16);
    }
    return value;
  },
  toString: function() {
    return this._value;
  },
  valueOf: function() {
    return this._value;
  },
  toJSON: function() {
    return this._value;
  }
});
const variableWrapper = injector({
  isWrapped: function() {
    return false;
  },
  isWritableWrapped: function() {
    return false;
  },
  wrap: function(value) {
    return value;
  },
  unwrap: function(value) {
    return value;
  },
  assign: function() {
    logger.error("Method 'assign' should not be used for not wrapped variables. Use 'isWrapped' method for ensuring.");
  }
});
var unwrapVariable = variableWrapper.unwrap;
variableWrapper.isWrapped;
variableWrapper.assign;
var bracketsToDots = function(expr) {
  return expr.replace(/\[/g, ".").replace(/\]/g, "");
};
var getPathParts = function(name) {
  return bracketsToDots(name).split(".");
};
var prepareOptions = function(options) {
  options = options || {};
  options.unwrapObservables = void 0 !== options.unwrapObservables ? options.unwrapObservables : true;
  return options;
};
function unwrap(value, options) {
  return options.unwrapObservables ? unwrapVariable(value) : value;
}
var compileGetter = function(expr) {
  if (arguments.length > 1) {
    expr = [].slice.call(arguments);
  }
  if (!expr || "this" === expr) {
    return function(obj) {
      return obj;
    };
  }
  if ("string" === typeof expr) {
    var path = getPathParts(expr);
    return function(obj, options) {
      options = prepareOptions(options);
      var functionAsIs = options.functionsAsIs;
      var hasDefaultValue = "defaultValue" in options;
      var current = unwrap(obj, options);
      for (var i = 0; i < path.length; i++) {
        if (!current) {
          if (null == current && hasDefaultValue) {
            return options.defaultValue;
          }
          break;
        }
        var pathPart = path[i];
        if (hasDefaultValue && isObject(current) && !(pathPart in current)) {
          return options.defaultValue;
        }
        var next = unwrap(current[pathPart], options);
        if (!functionAsIs && isFunction(next)) {
          next = next.call(current);
        }
        current = next;
      }
      return current;
    };
  }
  if (Array.isArray(expr)) {
    return combineGetters(expr);
  }
  if (isFunction(expr)) {
    return expr;
  }
};
function combineGetters(getters) {
  var compiledGetters = {};
  for (var i = 0, l = getters.length; i < l; i++) {
    var getter = getters[i];
    compiledGetters[getter] = compileGetter(getter);
  }
  return function(obj, options) {
    var result;
    each(compiledGetters, function(name) {
      var value = this(obj, options);
      if (void 0 === value) {
        return;
      }
      var current = result || (result = {});
      var path = name.split(".");
      var last = path.length - 1;
      for (var _i = 0; _i < last; _i++) {
        var pathItem = path[_i];
        if (!(pathItem in current)) {
          current[pathItem] = {};
        }
        current = current[pathItem];
      }
      current[path[last]] = value;
    });
    return result;
  };
}
var toComparable = function(value, caseSensitive) {
  var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  if (value instanceof Date) {
    return value.getTime();
  }
  if (value && value instanceof classImpl && value.valueOf) {
    return value.valueOf();
  }
  if (!caseSensitive && "string" === typeof value) {
    var _options$collatorOpti;
    if ("base" === (null === options || void 0 === options ? void 0 : null === (_options$collatorOpti = options.collatorOptions) || void 0 === _options$collatorOpti ? void 0 : _options$collatorOpti.sensitivity)) {
      var REMOVE_DIACRITICAL_MARKS_REGEXP = /[\u0300-\u036f]/g;
      value = value.normalize("NFD").replace(REMOVE_DIACRITICAL_MARKS_REGEXP, "");
    }
    return null !== options && void 0 !== options && options.locale ? value.toLocaleLowerCase(options.locale) : value.toLowerCase();
  }
  return value;
};
var noop = function() {
};
var grep = function(elements, checkFunction, invert) {
  var result = [];
  var check;
  var expectedCheck = !invert;
  for (var i = 0; i < elements.length; i++) {
    check = !!checkFunction(elements[i], i);
    if (check === expectedCheck) {
      result.push(elements[i]);
    }
  }
  return result;
};
function isPositionInElementRectangle(element, x, y) {
  var rect = element.getBoundingClientRect();
  return rect && x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom;
}
function createQueue() {
  var shiftIndex = 0;
  var items = [];
  return {
    push(item) {
      items.push(item);
      return this;
    },
    shift() {
      shiftIndex++;
      return items[shiftIndex - 1];
    },
    get length() {
      return items.length - shiftIndex;
    },
    get items() {
      return items;
    }
  };
}
function getShadowElementsFromPoint(x, y, root) {
  var elementQueue = createQueue().push(root);
  while (elementQueue.length) {
    var el = elementQueue.shift();
    for (var i = 0; i < el.childNodes.length; i++) {
      var childNode = el.childNodes[i];
      if (childNode.nodeType === Node.ELEMENT_NODE && isPositionInElementRectangle(childNode, x, y) && "none" !== getComputedStyle(childNode).pointerEvents) {
        elementQueue.push(childNode);
      }
    }
  }
  var result = elementQueue.items.reverse();
  result.pop();
  return result;
}
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
var nativeDOMAdapterStrategy = {
  querySelectorAll: (element, selector) => element.querySelectorAll(selector),
  elementMatches(element, selector) {
    var matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || ((selector2) => {
      var doc = element.document || element.ownerDocument;
      if (!doc) {
        return false;
      }
      var items = this.querySelectorAll(doc, selector2);
      for (var i = 0; i < items.length; i++) {
        if (items[i] === element) {
          return true;
        }
      }
    });
    return matches.call(element, selector);
  },
  createElement(tagName, context) {
    context = context || this._document;
    return context.createElement(tagName);
  },
  createElementNS(ns, tagName, context) {
    context = context || this._document;
    return context.createElementNS(ns, tagName);
  },
  createTextNode(text, context) {
    context = context || this._document;
    return context.createTextNode(text);
  },
  createAttribute(text, context) {
    context = context || this._document;
    return context.createAttribute(text);
  },
  isNode: (element) => element && "object" === typeof element && "nodeType" in element && "nodeName" in element,
  isElementNode: (element) => element && element.nodeType === ELEMENT_NODE,
  isTextNode: (element) => element && element.nodeType === TEXT_NODE,
  isDocument: (element) => element && element.nodeType === DOCUMENT_NODE,
  isDocumentFragment: (element) => element && element.nodeType === DOCUMENT_FRAGMENT_NODE,
  removeElement(element) {
    var parentNode = element && element.parentNode;
    if (parentNode) {
      parentNode.removeChild(element);
    }
  },
  insertElement(parentElement, newElement, nextSiblingElement) {
    if (parentElement && newElement && parentElement !== newElement) {
      if (nextSiblingElement) {
        parentElement.insertBefore(newElement, nextSiblingElement);
      } else {
        parentElement.appendChild(newElement);
      }
    }
  },
  getAttribute: (element, name) => element.getAttribute(name),
  setAttribute(element, name, value) {
    if ("style" === name) {
      element.style.cssText = value;
    } else {
      element.setAttribute(name, value);
    }
  },
  removeAttribute(element, name) {
    element.removeAttribute(name);
  },
  setProperty(element, name, value) {
    element[name] = value;
  },
  setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  },
  setClass(element, className, isAdd) {
    if (1 === element.nodeType && className) {
      isAdd ? element.classList.add(className) : element.classList.remove(className);
    }
  },
  setStyle(element, name, value) {
    element.style[name] = value || "";
  },
  _document: "undefined" === typeof document ? void 0 : document,
  getDocument() {
    return this._document;
  },
  getActiveElement(element) {
    var activeElementHolder = this.getRootNode(element);
    return activeElementHolder.activeElement;
  },
  getRootNode(element) {
    var _element$getRootNode, _element$getRootNode2;
    return null !== (_element$getRootNode = null === element || void 0 === element ? void 0 : null === (_element$getRootNode2 = element.getRootNode) || void 0 === _element$getRootNode2 ? void 0 : _element$getRootNode2.call(element)) && void 0 !== _element$getRootNode ? _element$getRootNode : this._document;
  },
  getBody() {
    return this._document.body;
  },
  createDocumentFragment() {
    return this._document.createDocumentFragment();
  },
  getDocumentElement() {
    return this._document.documentElement;
  },
  getLocation() {
    return this._document.location;
  },
  getSelection() {
    return this._document.selection;
  },
  getReadyState() {
    return this._document.readyState;
  },
  getHead() {
    return this._document.head;
  },
  hasDocumentProperty(property) {
    return property in this._document;
  },
  listen(element, event, callback, options) {
    if (!element || !("addEventListener" in element)) {
      return noop;
    }
    element.addEventListener(event, callback, options);
    return () => {
      element.removeEventListener(event, callback);
    };
  },
  elementsFromPoint(x, y, element) {
    var activeElementHolder = this.getRootNode(element);
    if (activeElementHolder.host) {
      return getShadowElementsFromPoint(x, y, activeElementHolder);
    }
    return activeElementHolder.elementsFromPoint(x, y);
  }
};
const domAdapter = injector(nativeDOMAdapterStrategy);
var hasWindowValue = "undefined" !== typeof window;
var hasWindow = () => hasWindowValue;
var windowObject = hasWindow() ? window : void 0;
if (!windowObject) {
  windowObject = {};
  windowObject.window = windowObject;
}
var getWindow = () => windowObject;
var window$2 = getWindow();
var nativeXMLHttpRequest = {
  getXhr: function() {
    return new window$2.XMLHttpRequest();
  }
};
const httpRequest = injector(nativeXMLHttpRequest);
var window$1 = getWindow();
var SUCCESS = "success";
var ERROR = "error";
var TIMEOUT = "timeout";
var NO_CONTENT = "nocontent";
var PARSER_ERROR = "parsererror";
var isStatusSuccess = function(status) {
  return 200 <= status && status < 300;
};
var hasContent = function(status) {
  return 204 !== status;
};
var paramsConvert = function(params) {
  var result = [];
  for (var name in params) {
    var value = params[name];
    if (void 0 === value) {
      continue;
    }
    if (null === value) {
      value = "";
    }
    if ("function" === typeof value) {
      value = value();
    }
    result.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
  }
  return result.join("&");
};
var createScript = function(options) {
  var script = domAdapter.createElement("script");
  for (var name in options) {
    script[name] = options[name];
  }
  return script;
};
var removeScript = function(scriptNode) {
  scriptNode.parentNode.removeChild(scriptNode);
};
var appendToHead = function(element) {
  return domAdapter.getHead().appendChild(element);
};
var evalScript = function(code) {
  var script = createScript({
    text: code
  });
  appendToHead(script);
  removeScript(script);
};
var evalCrossDomainScript = function(url) {
  var script = createScript({
    src: url
  });
  return new Promise(function(resolve, reject) {
    var events = {
      load: resolve,
      error: reject
    };
    var loadHandler = function(e) {
      events[e.type]();
      removeScript(script);
    };
    for (var event in events) {
      domAdapter.listen(script, event, loadHandler);
    }
    appendToHead(script);
  });
};
var getAcceptHeader = function(options) {
  var dataType = options.dataType || "*";
  var scriptAccept = "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";
  var accepts = {
    "*": "*/*",
    text: "text/plain",
    html: "text/html",
    xml: "application/xml, text/xml",
    json: "application/json, text/javascript",
    jsonp: scriptAccept,
    script: scriptAccept
  };
  extendFromObject(accepts, options.accepts, true);
  return accepts[dataType] ? accepts[dataType] + ("*" !== dataType ? ", */*; q=0.01" : "") : accepts["*"];
};
var getContentTypeHeader = function(options) {
  var defaultContentType;
  if (options.data && !options.upload && "GET" !== getMethod(options)) {
    defaultContentType = "application/x-www-form-urlencoded;charset=utf-8";
  }
  return options.contentType || defaultContentType;
};
var getDataFromResponse = function(xhr) {
  return xhr.responseType && "text" !== xhr.responseType || "string" !== typeof xhr.responseText ? xhr.response : xhr.responseText;
};
var postProcess = function(deferred, xhr, dataType) {
  var data = getDataFromResponse(xhr);
  switch (dataType) {
    case "jsonp":
      evalScript(data);
      break;
    case "script":
      evalScript(data);
      deferred.resolve(data, SUCCESS, xhr);
      break;
    case "json":
      try {
        deferred.resolve(JSON.parse(data), SUCCESS, xhr);
      } catch (e) {
        deferred.reject(xhr, PARSER_ERROR, e);
      }
      break;
    default:
      deferred.resolve(data, SUCCESS, xhr);
  }
};
var isCrossDomain = function(url) {
  if (!hasWindow()) {
    return true;
  }
  var crossDomain = false;
  var originAnchor = domAdapter.createElement("a");
  var urlAnchor = domAdapter.createElement("a");
  originAnchor.href = window$1.location.href;
  try {
    urlAnchor.href = url;
    urlAnchor.href = urlAnchor.href;
    crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
  } catch (e) {
    crossDomain = true;
  }
  return crossDomain;
};
var setHttpTimeout = function(timeout, xhr) {
  return timeout && setTimeout(function() {
    xhr.customStatus = TIMEOUT;
    xhr.abort();
  }, timeout);
};
var getJsonpOptions = function(options) {
  if ("jsonp" === options.dataType) {
    var random = Math.random().toString().replace(/\D/g, "");
    var callbackName = options.jsonpCallback || "dxCallback" + Date.now() + "_" + random;
    var callbackParameter = options.jsonp || "callback";
    options.data = options.data || {};
    options.data[callbackParameter] = callbackName;
    return callbackName;
  }
};
var getRequestOptions = function(options, headers) {
  var params = options.data;
  var paramsAlreadyString = "string" === typeof params;
  var url = options.url || window$1.location.href;
  if (!paramsAlreadyString && !options.cache) {
    params = params || {};
    params._ = Date.now();
  }
  if (params && !options.upload) {
    if (!paramsAlreadyString) {
      params = paramsConvert(params);
    }
    if ("GET" === getMethod(options)) {
      if ("" !== params) {
        url += (url.indexOf("?") > -1 ? "&" : "?") + params;
      }
      params = null;
    } else if (headers["Content-Type"] && headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
      params = params.replace(/%20/g, "+");
    }
  }
  return {
    url,
    parameters: params
  };
};
function getMethod(options) {
  return (options.method || "GET").toUpperCase();
}
var getRequestHeaders = function(options) {
  var headers = options.headers || {};
  headers["Content-Type"] = headers["Content-Type"] || getContentTypeHeader(options);
  headers.Accept = headers.Accept || getAcceptHeader(options);
  if (!options.crossDomain && !headers["X-Requested-With"]) {
    headers["X-Requested-With"] = "XMLHttpRequest";
  }
  return headers;
};
var sendRequest$1 = function(options) {
  var xhr = httpRequest.getXhr();
  var d = new Deferred();
  var result = d.promise();
  var async = isDefined(options.async) ? options.async : true;
  var dataType = options.dataType;
  var timeout = options.timeout || 0;
  var timeoutId;
  options.crossDomain = isCrossDomain(options.url);
  var needScriptEvaluation = "jsonp" === dataType || "script" === dataType;
  if (void 0 === options.cache) {
    options.cache = !needScriptEvaluation;
  }
  var callbackName = getJsonpOptions(options);
  var headers = getRequestHeaders(options);
  var requestOptions = getRequestOptions(options, headers);
  var url = requestOptions.url;
  var parameters = requestOptions.parameters;
  if (callbackName) {
    window$1[callbackName] = function(data) {
      d.resolve(data, SUCCESS, xhr);
    };
  }
  if (options.crossDomain && needScriptEvaluation) {
    evalCrossDomainScript(url).then(function() {
      if ("jsonp" === dataType) {
        return;
      }
      d.resolve(null, SUCCESS, xhr);
    }, function() {
      d.reject(xhr, ERROR);
    });
    return result;
  }
  if (options.crossDomain && !("withCredentials" in xhr)) {
    d.reject(xhr, ERROR);
    return result;
  }
  xhr.open(getMethod(options), url, async, options.username, options.password);
  if (async) {
    xhr.timeout = timeout;
    timeoutId = setHttpTimeout(timeout, xhr);
  }
  xhr.onreadystatechange = function(e) {
    if (4 === xhr.readyState) {
      clearTimeout(timeoutId);
      if (isStatusSuccess(xhr.status)) {
        if (hasContent(xhr.status)) {
          postProcess(d, xhr, dataType);
        } else {
          d.resolve(null, NO_CONTENT, xhr);
        }
      } else {
        d.reject(xhr, xhr.customStatus || ERROR);
      }
    }
  };
  if (options.upload) {
    xhr.upload.onprogress = options.upload.onprogress;
    xhr.upload.onloadstart = options.upload.onloadstart;
    xhr.upload.onabort = options.upload.onabort;
  }
  if (options.xhrFields) {
    for (var field in options.xhrFields) {
      xhr[field] = options.xhrFields[field];
    }
  }
  if ("arraybuffer" === options.responseType) {
    xhr.responseType = options.responseType;
  }
  for (var name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name) && isDefined(headers[name])) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }
  if (options.beforeSend) {
    options.beforeSend(xhr);
  }
  xhr.send(parameters);
  result.abort = function() {
    xhr.abort();
  };
  return result;
};
const ajax = injector({
  sendRequest: sendRequest$1
});
var errors = errorUtils(coreErrors.ERROR_MESSAGES, {
  E4000: "[DevExpress.data]: {0}",
  E4001: "Unknown aggregating function is detected: '{0}'",
  E4002: "Unsupported OData protocol version is used",
  E4003: "Unknown filter operation is used: {0}",
  E4004: "The thenby() method is called before the sortby() method",
  E4005: "Store requires a key expression for this operation",
  E4006: "ArrayStore 'data' option must be an array",
  E4007: "Compound keys cannot be auto-generated",
  E4008: "Attempt to insert an item with a duplicated key",
  E4009: "Data item cannot be found",
  E4010: "CustomStore does not support creating queries",
  E4011: "Custom Store method is not implemented or is not a function: {0}",
  E4012: "Custom Store method returns an invalid value: {0}",
  E4013: "Local Store requires the 'name' configuration option is specified",
  E4014: "Unknown data type is specified for ODataStore: {0}",
  E4015: "Unknown entity name or alias is used: {0}",
  E4016: "The compileSetter(expr) method is called with 'self' passed as a parameter",
  E4017: "Keys cannot be modified",
  E4018: "The server has returned a non-numeric value in a response to an item count request",
  E4019: "Mixing of group operators inside a single group of filter expression is not allowed",
  E4020: "Unknown store type is detected: {0}",
  E4021: "The server response does not provide the totalCount value",
  E4022: "The server response does not provide the groupCount value",
  E4023: "Could not parse the following XML: {0}",
  E4024: "String function {0} cannot be used with the data field {1} of type {2}.",
  W4000: "Data returned from the server has an incorrect structure",
  W4001: 'The {0} field is listed in both "keyType" and "fieldTypes". The value of "fieldTypes" is used.',
  W4002: "Data loading has failed for some cells due to the following error: {0}"
});
var errorHandler = null;
var handleError = function(error) {
  var _errorHandler;
  null === (_errorHandler = errorHandler) || void 0 === _errorHandler ? void 0 : _errorHandler(error);
};
var callOnce = function(handler) {
  var result;
  var _wrappedHandler = function() {
    result = handler.apply(this, arguments);
    _wrappedHandler = function() {
      return result;
    };
    return result;
  };
  return function() {
    return _wrappedHandler.apply(this, arguments);
  };
};
var callbacks = [];
var subscribeReady = callOnce(() => {
  var removeListener = domAdapter.listen(domAdapter.getDocument(), "DOMContentLoaded", () => {
    readyCallbacks.fire();
    removeListener();
  });
});
var readyCallbacks = {
  add: (callback) => {
    var windowExists = hasWindow();
    if (windowExists && "loading" !== domAdapter.getReadyState()) {
      callback();
    } else {
      callbacks.push(callback);
      windowExists && subscribeReady();
    }
  },
  fire: () => {
    callbacks.forEach((callback) => callback());
    callbacks = [];
  }
};
const readyCallbacks$1 = injector(readyCallbacks);
var ready = readyCallbacks$1.add;
var XHR_ERROR_UNLOAD = "DEVEXTREME_XHR_ERROR_UNLOAD";
var normalizeBinaryCriterion = function(crit) {
  return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]];
};
var normalizeSortingInfo = function(info) {
  if (!Array.isArray(info)) {
    info = [info];
  }
  return map(info, function(i) {
    var result = {
      selector: isFunction(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
      desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
    };
    if (i.compare) {
      result.compare = i.compare;
    }
    return result;
  });
};
var errorMessageFromXhr = function() {
  var textStatusMessages = {
    timeout: "Network connection timeout",
    error: "Unspecified network error",
    parsererror: "Unexpected server response"
  };
  var unloading;
  ready(function() {
    var window2 = getWindow();
    domAdapter.listen(window2, "beforeunload", function() {
      unloading = true;
    });
  });
  return function(xhr, textStatus) {
    if (unloading) {
      return XHR_ERROR_UNLOAD;
    }
    if (xhr.status < 400) {
      return function(textStatus2) {
        var result = textStatusMessages[textStatus2];
        if (!result) {
          return textStatus2;
        }
        return result;
      }(textStatus);
    }
    return xhr.statusText;
  };
}();
var aggregators = {
  count: {
    seed: 0,
    step: function(count) {
      return 1 + count;
    }
  },
  sum: {
    seed: 0,
    step: function(sum, item) {
      return sum + item;
    }
  },
  min: {
    step: function(min, item) {
      return item < min ? item : min;
    }
  },
  max: {
    step: function(max, item) {
      return item > max ? item : max;
    }
  },
  avg: {
    seed: [0, 0],
    step: function(pair, value) {
      return [pair[0] + value, pair[1] + 1];
    },
    finalize: function(pair) {
      return pair[1] ? pair[0] / pair[1] : NaN;
    }
  }
};
var processRequestResultLock = /* @__PURE__ */ function() {
  var lockCount = 0;
  var lockDeferred;
  return {
    obtain: function() {
      if (0 === lockCount) {
        lockDeferred = new Deferred();
      }
      lockCount++;
    },
    release: function() {
      lockCount--;
      if (lockCount < 1) {
        lockDeferred.resolve();
      }
    },
    promise: function() {
      var deferred = 0 === lockCount ? new Deferred().resolve() : lockDeferred;
      return deferred.promise();
    },
    reset: function() {
      lockCount = 0;
      if (lockDeferred) {
        lockDeferred.resolve();
      }
    }
  };
}();
function isConjunctiveOperator(condition) {
  return /^(and|&&|&)$/i.test(condition);
}
var isUnaryOperation = function(crit) {
  return "!" === crit[0] && Array.isArray(crit[1]);
};
var isGroupOperator = function(value) {
  return "and" === value || "or" === value;
};
var isGroupCriterion = function(crit) {
  var first = crit[0];
  var second = crit[1];
  if (Array.isArray(first)) {
    return true;
  }
  if (isFunction(first)) {
    if (Array.isArray(second) || isFunction(second) || isGroupOperator(second)) {
      return true;
    }
  }
  return false;
};
var GUID_REGEX = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
var VERBOSE_DATE_REGEX = /^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/;
var ISO8601_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]{1}\d{2}(:?)(\d{2})?)?$/;
var JSON_VERBOSE_MIME_TYPE = "application/json;odata=verbose";
var makeArray = (value) => "string" === type(value) ? value.split() : value;
var hasDot = (x) => /\./.test(x);
var pad = (text, length, right) => {
  text = String(text);
  while (text.length < length) {
    text = right ? "".concat(text, "0") : "0".concat(text);
  }
  return text;
};
var formatISO8601 = (date, skipZeroTime, skipTimezone) => {
  var bag = [];
  var padLeft2 = (text) => pad(text, 2);
  bag.push(date.getFullYear());
  bag.push("-");
  bag.push(padLeft2(date.getMonth() + 1));
  bag.push("-");
  bag.push(padLeft2(date.getDate()));
  if (!(skipZeroTime && date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1)) {
    bag.push("T");
    bag.push(padLeft2(date.getHours()));
    bag.push(":");
    bag.push(padLeft2(date.getMinutes()));
    bag.push(":");
    bag.push(padLeft2(date.getSeconds()));
    if (date.getMilliseconds()) {
      bag.push(".");
      bag.push(pad(date.getMilliseconds(), 3));
    }
    if (!skipTimezone) {
      bag.push("Z");
    }
  }
  return bag.join("");
};
var parseISO8601 = (isoString) => {
  var result = new Date(60 * (/* @__PURE__ */ new Date(0)).getTimezoneOffset() * 1e3);
  var chunks = isoString.replace("Z", "").split("T");
  var date = /(\d{4})-(\d{2})-(\d{2})/.exec(chunks[0]);
  var time = /(\d{2}):(\d{2}):(\d{2})\.?(\d{0,7})?/.exec(chunks[1]);
  result.setFullYear(Number(date[1]));
  result.setMonth(Number(date[2]) - 1);
  result.setDate(Number(date[3]));
  if (Array.isArray(time) && time.length) {
    result.setHours(Number(time[1]));
    result.setMinutes(Number(time[2]));
    result.setSeconds(Number(time[3]));
    var fractional = (time[4] || "").slice(0, 3);
    fractional = pad(fractional, 3, true);
    result.setMilliseconds(Number(fractional));
  }
  return result;
};
var isAbsoluteUrl = (url) => /^(?:[a-z]+:)?\/{2,2}/i.test(url);
var stripParams = (url) => {
  var index = url.indexOf("?");
  if (index > -1) {
    return url.substr(0, index);
  }
  return url;
};
var toAbsoluteUrl = (basePath, relativePath) => {
  var part;
  var baseParts = stripParams(basePath).split("/");
  var relativeParts = relativePath.split("/");
  baseParts.pop();
  while (relativeParts.length) {
    part = relativeParts.shift();
    if (".." === part) {
      baseParts.pop();
    } else {
      baseParts.push(part);
    }
  }
  return baseParts.join("/");
};
var param = (params) => {
  var result = [];
  for (var name in params) {
    result.push(name + "=" + params[name]);
  }
  return result.join("&");
};
var ajaxOptionsForRequest = function(protocolVersion, request) {
  var _options$beforeSend;
  var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  var formatPayload = (payload) => JSON.stringify(payload, function(key, value) {
    if (!(this[key] instanceof Date)) {
      return value;
    }
    value = formatISO8601(this[key]);
    switch (protocolVersion) {
      case 2:
        return value.substr(0, value.length - 1);
      case 3:
      case 4:
        return value;
      default:
        throw errors.Error("E4002");
    }
  });
  request = extend({
    async: true,
    method: "get",
    url: "",
    params: {},
    payload: null,
    headers: {},
    timeout: 3e4
  }, request);
  null === (_options$beforeSend = options.beforeSend) || void 0 === _options$beforeSend ? void 0 : _options$beforeSend.call(options, request);
  var {
    async,
    timeout,
    headers
  } = request;
  var {
    url,
    method
  } = request;
  var {
    jsonp,
    withCredentials
  } = options;
  method = (method || "get").toLowerCase();
  var isGet = "get" === method;
  var useJsonp = isGet && jsonp;
  var params = extend({}, request.params);
  var ajaxData = isGet ? params : formatPayload(request.payload);
  var qs = !isGet && param(params);
  var contentType = !isGet && JSON_VERBOSE_MIME_TYPE;
  if (qs) {
    url += (url.indexOf("?") > -1 ? "&" : "?") + qs;
  }
  if (useJsonp) {
    ajaxData.$format = "json";
  }
  return {
    url,
    data: ajaxData,
    dataType: useJsonp ? "jsonp" : "json",
    jsonp: useJsonp && "$callback",
    method,
    async,
    timeout,
    headers,
    contentType,
    accepts: {
      json: [JSON_VERBOSE_MIME_TYPE, "text/plain"].join()
    },
    xhrFields: {
      withCredentials
    }
  };
};
var sendRequest = (protocolVersion, request, options) => {
  var {
    deserializeDates,
    fieldTypes,
    countOnly,
    isPaged
  } = options;
  var d = new Deferred();
  var ajaxOptions = ajaxOptionsForRequest(protocolVersion, request, options);
  ajax.sendRequest(ajaxOptions).always((obj, textStatus) => {
    var transformOptions = {
      deserializeDates,
      fieldTypes
    };
    var tuple = interpretJsonFormat(obj, textStatus, transformOptions, ajaxOptions);
    var {
      error,
      data,
      count
    } = tuple;
    var {
      nextUrl
    } = tuple;
    if (error) {
      if (error.message !== XHR_ERROR_UNLOAD) {
        d.reject(error);
      }
    } else if (countOnly) {
      if (isFinite(count)) {
        d.resolve(count);
      } else {
        d.reject(new errors.Error("E4018"));
      }
    } else if (nextUrl && !isPaged) {
      if (!isAbsoluteUrl(nextUrl)) {
        nextUrl = toAbsoluteUrl(ajaxOptions.url, nextUrl);
      }
      sendRequest(protocolVersion, {
        url: nextUrl
      }, options).fail(d.reject).done((nextData) => d.resolve(data.concat(nextData)));
    } else {
      var extra = isFinite(count) ? {
        totalCount: count
      } : void 0;
      d.resolve(data, extra);
    }
  });
  return d.promise();
};
var formatDotNetError = (errorObj) => {
  var message;
  var currentMessage;
  var currentError = errorObj;
  if ("message" in errorObj) {
    var _errorObj$message;
    message = (null === (_errorObj$message = errorObj.message) || void 0 === _errorObj$message ? void 0 : _errorObj$message.value) || errorObj.message;
  }
  while (currentError = currentError.innererror || currentError.internalexception) {
    var _currentMessage;
    currentMessage = currentError.message;
    message = null !== (_currentMessage = currentMessage) && void 0 !== _currentMessage ? _currentMessage : message;
    if (currentError.internalexception && -1 === message.indexOf("inner exception")) {
      break;
    }
  }
  return message;
};
var errorFromResponse = (obj, textStatus, ajaxOptions) => {
  var _response, _response2, _response3, _response4;
  if ("nocontent" === textStatus) {
    return null;
  }
  var message = "Unknown error";
  var response = obj;
  var httpStatus = 200;
  var errorData = {
    requestOptions: ajaxOptions
  };
  if ("success" !== textStatus) {
    var {
      status,
      responseText
    } = obj;
    httpStatus = status;
    message = errorMessageFromXhr(obj, textStatus);
    try {
      response = JSON.parse(responseText);
    } catch (x) {
    }
  }
  var errorObj = (null === (_response = response) || void 0 === _response ? void 0 : _response.then) || (null === (_response2 = response) || void 0 === _response2 ? void 0 : _response2.error) || (null === (_response3 = response) || void 0 === _response3 ? void 0 : _response3["odata.error"]) || (null === (_response4 = response) || void 0 === _response4 ? void 0 : _response4["@odata.error"]);
  if (errorObj) {
    message = formatDotNetError(errorObj) || message;
    errorData.errorDetails = errorObj;
    if (200 === httpStatus) {
      httpStatus = 500;
    }
    var customCode = Number(errorObj.code);
    if (isFinite(customCode) && customCode >= 400) {
      httpStatus = customCode;
    }
  }
  if (httpStatus >= 400 || 0 === httpStatus) {
    errorData.httpStatus = httpStatus;
    return extend(Error(message), errorData);
  }
  return null;
};
var interpretJsonFormat = (obj, textStatus, transformOptions, ajaxOptions) => {
  var error = errorFromResponse(obj, textStatus, ajaxOptions);
  if (error) {
    return {
      error
    };
  }
  if (!isPlainObject(obj)) {
    return {
      data: obj
    };
  }
  var value = "d" in obj && (Array.isArray(obj.d) || isObject(obj.d)) ? interpretVerboseJsonFormat(obj) : interpretLightJsonFormat(obj);
  transformTypes(value, transformOptions);
  return value;
};
var interpretVerboseJsonFormat = (_ref) => {
  var _data$results;
  var {
    d: data
  } = _ref;
  if (!isDefined(data)) {
    return {
      error: Error("Malformed or unsupported JSON response received")
    };
  }
  return {
    data: null !== (_data$results = data.results) && void 0 !== _data$results ? _data$results : data,
    nextUrl: data.__next,
    count: parseInt(data.__count, 10)
  };
};
var interpretLightJsonFormat = (obj) => {
  var _obj$value;
  return {
    data: null !== (_obj$value = obj.value) && void 0 !== _obj$value ? _obj$value : obj,
    nextUrl: obj["@odata.nextLink"],
    count: parseInt(obj["@odata.count"], 10)
  };
};
var EdmLiteral = classImpl.inherit({
  ctor(value) {
    this._value = value;
  },
  valueOf() {
    return this._value;
  }
});
var transformTypes = function transformTypes2(obj) {
  var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  each(obj, (key, value) => {
    if (null !== value && "object" === typeof value) {
      if ("results" in value) {
        obj[key] = value.results;
      }
      transformTypes2(obj[key], options);
    } else if ("string" === typeof value) {
      var {
        fieldTypes,
        deserializeDates
      } = options;
      var canBeGuid = !fieldTypes || "String" !== fieldTypes[key];
      if (canBeGuid && GUID_REGEX.test(value)) {
        obj[key] = new Guid(value);
      }
      if (false !== deserializeDates) {
        if (value.match(VERBOSE_DATE_REGEX)) {
          var date = new Date(Number(RegExp.$1) + 60 * RegExp.$2 * 1e3);
          obj[key] = new Date(date.valueOf() + 60 * date.getTimezoneOffset() * 1e3);
        } else if (ISO8601_DATE_REGEX.test(value)) {
          obj[key] = new Date(parseISO8601(obj[key]).valueOf());
        }
      }
    }
  });
};
var serializeDate = (date) => "datetime'".concat(formatISO8601(date, true, true), "'");
var serializeString = (value) => "'".concat(value.replace(/'/g, "''"), "'");
var serializePropName = (propName) => propName instanceof EdmLiteral ? propName.valueOf() : propName.replace(/\./g, "/");
var serializeValueV4 = (value) => {
  if (value instanceof Date) {
    return formatISO8601(value, false, false);
  }
  if (value instanceof Guid) {
    return value.valueOf();
  }
  if (Array.isArray(value)) {
    return "[".concat(value.map((item) => serializeValueV4(item)).join(","), "]");
  }
  return serializeValueV2(value);
};
var serializeValueV2 = (value) => {
  if (value instanceof Date) {
    return serializeDate(value);
  }
  if (value instanceof Guid) {
    return "guid'".concat(value, "'");
  }
  if (value instanceof EdmLiteral) {
    return value.valueOf();
  }
  if ("string" === typeof value) {
    return serializeString(value);
  }
  return String(value);
};
var serializeValue = (value, protocolVersion) => {
  switch (protocolVersion) {
    case 2:
    case 3:
      return serializeValueV2(value);
    case 4:
      return serializeValueV4(value);
    default:
      throw errors.Error("E4002");
  }
};
var serializeKey = (key, protocolVersion) => {
  if (isPlainObject(key)) {
    var parts = [];
    each(key, (k, v) => parts.push("".concat(serializePropName(k), "=").concat(serializeValue(v, protocolVersion))));
    return parts.join();
  }
  return serializeValue(key, protocolVersion);
};
var keyConverters = {
  String: (value) => "".concat(value),
  Int32: (value) => Math.floor(value),
  Int64: (value) => value instanceof EdmLiteral ? value : new EdmLiteral("".concat(value, "L")),
  Guid: (value) => value instanceof Guid ? value : new Guid(value),
  Boolean: (value) => !!value,
  Single: (value) => value instanceof EdmLiteral ? value : new EdmLiteral(value + "f"),
  Decimal: (value) => value instanceof EdmLiteral ? value : new EdmLiteral(value + "m")
};
var convertPrimitiveValue = (type2, value) => {
  if (null === value) {
    return null;
  }
  var converter = keyConverters[type2];
  if (!converter) {
    throw errors.Error("E4014", type2);
  }
  return converter(value);
};
var generateSelect = (oDataVersion, select) => {
  if (!select) {
    return;
  }
  return oDataVersion < 4 ? serializePropName(select.join()) : grep(select, hasDot, true).join();
};
var formatCore = (hash) => {
  var result = "";
  var selectValue = [];
  var expandValue = [];
  each(hash, (key, value) => {
    if (Array.isArray(value)) {
      [].push.apply(selectValue, value);
    }
    if (isPlainObject(value)) {
      expandValue.push("".concat(key).concat(formatCore(value)));
    }
  });
  if (selectValue.length || expandValue.length) {
    result += "(";
    if (selectValue.length) {
      result += "$select=".concat(map(selectValue, serializePropName).join());
    }
    if (expandValue.length) {
      if (selectValue.length) {
        result += ";";
      }
      result += "$expand=".concat(map(expandValue, serializePropName).join());
    }
    result += ")";
  }
  return result;
};
var format = (hash) => {
  var result = [];
  each(hash, (key, value) => result.push("".concat(key).concat(formatCore(value))));
  return result.join();
};
var parseCore = (exprParts, root, stepper) => {
  var result = stepper(root, exprParts.shift(), exprParts);
  if (false === result) {
    return;
  }
  parseCore(exprParts, result, stepper);
};
var parseTree = (exprs, root, stepper) => each(exprs, (_, x) => parseCore(x.split("."), root, stepper));
var generatorV2 = (expand, select) => {
  var hash = {};
  if (expand) {
    each(makeArray(expand), function() {
      hash[serializePropName(this)] = 1;
    });
  }
  if (select) {
    each(makeArray(select), function() {
      var path = this.split(".");
      if (path.length < 2) {
        return;
      }
      path.pop();
      hash[serializePropName(path.join("."))] = 1;
    });
  }
  return map(hash, (_, v) => v).join();
};
var generatorV4 = (expand, select) => {
  var hash = {};
  if (expand || select) {
    if (expand) {
      parseTree(makeArray(expand), hash, (node, key, path) => {
        node[key] = node[key] || {};
        return !path.length ? false : node[key];
      });
    }
    if (select) {
      parseTree(grep(makeArray(select), hasDot), hash, (node, key, path) => {
        if (!path.length) {
          node[key] = node[key] || [];
          node[key].push(key);
          return false;
        }
        return node[key] = node[key] || {};
      });
    }
    return format(hash);
  }
};
var generateExpand = (oDataVersion, expand, select) => oDataVersion < 4 ? generatorV2(expand, select) : generatorV4(expand, select);
var formatFunctionInvocationUrl = (baseUrl, args) => format$1("{0}({1})", baseUrl, map(args || {}, (value, key) => format$1("{0}={1}", key, value)).join(","));
var escapeServiceOperationParams = (params, version2) => {
  if (!params) {
    return params;
  }
  var result = {};
  each(params, (k, v) => {
    result[k] = serializeValue(v, version2);
  });
  return result;
};
var Iterator = classImpl.inherit({
  toArray: function() {
    var result = [];
    this.reset();
    while (this.next()) {
      result.push(this.current());
    }
    return result;
  },
  countable: function() {
    return false;
  }
});
var ArrayIterator = Iterator.inherit({
  ctor: function(array) {
    this.array = array;
    this.index = -1;
  },
  next: function() {
    if (this.index + 1 < this.array.length) {
      this.index++;
      return true;
    }
    return false;
  },
  current: function() {
    return this.array[this.index];
  },
  reset: function() {
    this.index = -1;
  },
  toArray: function() {
    return this.array.slice(0);
  },
  countable: function() {
    return true;
  },
  count: function() {
    return this.array.length;
  }
});
var WrappedIterator = Iterator.inherit({
  ctor: function(iter) {
    this.iter = iter;
  },
  next: function() {
    return this.iter.next();
  },
  current: function() {
    return this.iter.current();
  },
  reset: function() {
    return this.iter.reset();
  }
});
var MapIterator = WrappedIterator.inherit({
  ctor: function(iter, mapper) {
    this.callBase(iter);
    this.index = -1;
    this.mapper = mapper;
  },
  current: function() {
    return this.mapper(this.callBase(), this.index);
  },
  next: function() {
    var hasNext = this.callBase();
    if (hasNext) {
      this.index++;
    }
    return hasNext;
  }
});
var defaultCompare = function(xValue, yValue, options) {
  if (isString(xValue) && isString(yValue) && (null !== options && void 0 !== options && options.locale || null !== options && void 0 !== options && options.collatorOptions)) {
    return new Intl.Collator((null === options || void 0 === options ? void 0 : options.locale) || void 0, (null === options || void 0 === options ? void 0 : options.collatorOptions) || void 0).compare(xValue, yValue);
  }
  xValue = toComparable(xValue, false, options);
  yValue = toComparable(yValue, false, options);
  if (null === xValue && null !== yValue) {
    return -1;
  }
  if (null !== xValue && null === yValue) {
    return 1;
  }
  if (void 0 === xValue && void 0 !== yValue) {
    return 1;
  }
  if (void 0 !== xValue && void 0 === yValue) {
    return -1;
  }
  if (xValue < yValue) {
    return -1;
  }
  if (xValue > yValue) {
    return 1;
  }
  return 0;
};
var SortIterator = Iterator.inherit({
  ctor: function(iter, getter, desc, compare) {
    this.langParams = iter.langParams;
    if (!(iter instanceof MapIterator)) {
      iter = new MapIterator(iter, this._wrap);
      iter.langParams = this.langParams;
    }
    this.iter = iter;
    this.rules = [{
      getter,
      desc,
      compare,
      langParams: this.langParams
    }];
  },
  thenBy: function(getter, desc, compare) {
    var result = new SortIterator(this.sortedIter || this.iter, getter, desc, compare);
    if (!this.sortedIter) {
      result.rules = this.rules.concat(result.rules);
    }
    return result;
  },
  next: function() {
    this._ensureSorted();
    return this.sortedIter.next();
  },
  current: function() {
    this._ensureSorted();
    return this.sortedIter.current();
  },
  reset: function() {
    delete this.sortedIter;
  },
  countable: function() {
    return this.sortedIter || this.iter.countable();
  },
  count: function() {
    if (this.sortedIter) {
      return this.sortedIter.count();
    }
    return this.iter.count();
  },
  _ensureSorted: function() {
    var that = this;
    if (that.sortedIter) {
      return;
    }
    each(that.rules, function() {
      this.getter = compileGetter(this.getter);
    });
    that.sortedIter = new MapIterator(new ArrayIterator(this.iter.toArray().sort(function(x, y) {
      return that._compare(x, y);
    })), that._unwrap);
  },
  _wrap: function(record, index) {
    return {
      index,
      value: record
    };
  },
  _unwrap: function(wrappedItem) {
    return wrappedItem.value;
  },
  _getDefaultCompare: (langParams) => (xValue, yValue) => defaultCompare(xValue, yValue, langParams),
  _compare: function(x, y) {
    var xIndex = x.index;
    var yIndex = y.index;
    x = x.value;
    y = y.value;
    if (x === y) {
      return xIndex - yIndex;
    }
    for (var i = 0, rulesCount = this.rules.length; i < rulesCount; i++) {
      var rule = this.rules[i];
      var xValue = rule.getter(x);
      var yValue = rule.getter(y);
      var compare = rule.compare || this._getDefaultCompare(rule.langParams);
      var compareResult = compare(xValue, yValue);
      if (compareResult) {
        return rule.desc ? -compareResult : compareResult;
      }
    }
    return xIndex - yIndex;
  }
});
var compileCriteria$1 = /* @__PURE__ */ function() {
  var langParams = {};
  var _toComparable = (value) => toComparable(value, false, langParams);
  var toString = function(value) {
    var _langParams;
    return isDefined(value) ? null !== (_langParams = langParams) && void 0 !== _langParams && _langParams.locale ? value.toLocaleString(langParams.locale) : value.toString() : "";
  };
  function compileEquals(getter, value, negate) {
    return function(obj) {
      obj = _toComparable(getter(obj));
      var result = /* @__PURE__ */ function(value2) {
        return "" === value2 || 0 === value2 || false === value2;
      }(value) ? obj === value : obj == value;
      if (negate) {
        result = !result;
      }
      return result;
    };
  }
  return function(crit, options) {
    langParams = options || {};
    if (isFunction(crit)) {
      return crit;
    }
    if (isGroupCriterion(crit)) {
      return function(crit2) {
        var ops = [];
        var isConjunctiveOperator$1 = false;
        var isConjunctiveNextOperator = false;
        each(crit2, function() {
          if (Array.isArray(this) || isFunction(this)) {
            if (ops.length > 1 && isConjunctiveOperator$1 !== isConjunctiveNextOperator) {
              throw new errors.Error("E4019");
            }
            ops.push(compileCriteria$1(this, langParams));
            isConjunctiveOperator$1 = isConjunctiveNextOperator;
            isConjunctiveNextOperator = true;
          } else {
            isConjunctiveNextOperator = isConjunctiveOperator(this);
          }
        });
        return function(d) {
          var result = isConjunctiveOperator$1;
          for (var i = 0; i < ops.length; i++) {
            if (ops[i](d) !== isConjunctiveOperator$1) {
              result = !isConjunctiveOperator$1;
              break;
            }
          }
          return result;
        };
      }(crit);
    }
    if (isUnaryOperation(crit)) {
      return function(crit2) {
        var op = crit2[0];
        var criteria = compileCriteria$1(crit2[1], langParams);
        if ("!" === op) {
          return function(obj) {
            return !criteria(obj);
          };
        }
        throw errors.Error("E4003", op);
      }(crit);
    }
    return function(crit2) {
      crit2 = normalizeBinaryCriterion(crit2);
      var getter = compileGetter(crit2[0]);
      var op = crit2[1];
      var value = crit2[2];
      value = _toComparable(value);
      var compare = (obj, operatorFn) => {
        obj = _toComparable(getter(obj));
        return (null == value || null == obj) && value !== obj ? false : operatorFn(obj, value);
      };
      switch (op.toLowerCase()) {
        case "=":
          return compileEquals(getter, value);
        case "<>":
          return compileEquals(getter, value, true);
        case ">":
          return (obj) => compare(obj, (a, b) => a > b);
        case "<":
          return (obj) => compare(obj, (a, b) => a < b);
        case ">=":
          return (obj) => compare(obj, (a, b) => a >= b);
        case "<=":
          return (obj) => compare(obj, (a, b) => a <= b);
        case "startswith":
          return function(obj) {
            return 0 === _toComparable(toString(getter(obj))).indexOf(value);
          };
        case "endswith":
          return function(obj) {
            var getterValue = _toComparable(toString(getter(obj)));
            var searchValue = toString(value);
            if (getterValue.length < searchValue.length) {
              return false;
            }
            var index = getterValue.lastIndexOf(value);
            return -1 !== index && index === getterValue.length - value.length;
          };
        case "contains":
          return function(obj) {
            return _toComparable(toString(getter(obj))).indexOf(value) > -1;
          };
        case "notcontains":
          return function(obj) {
            return -1 === _toComparable(toString(getter(obj))).indexOf(value);
          };
      }
      throw errors.Error("E4003", op);
    }(crit);
  };
}();
var FilterIterator = WrappedIterator.inherit({
  ctor: function(iter, criteria) {
    this.callBase(iter);
    this.langParams = iter.langParams;
    this.criteria = compileCriteria$1(criteria, this.langParams);
  },
  next: function() {
    while (this.iter.next()) {
      if (this.criteria(this.current())) {
        return true;
      }
    }
    return false;
  }
});
var GroupIterator = Iterator.inherit({
  ctor: function(iter, getter) {
    this.iter = iter;
    this.getter = getter;
  },
  next: function() {
    this._ensureGrouped();
    return this.groupedIter.next();
  },
  current: function() {
    this._ensureGrouped();
    return this.groupedIter.current();
  },
  reset: function() {
    delete this.groupedIter;
  },
  countable: function() {
    return !!this.groupedIter;
  },
  count: function() {
    return this.groupedIter.count();
  },
  _ensureGrouped: function() {
    if (this.groupedIter) {
      return;
    }
    var hash = {};
    var keys = [];
    var iter = this.iter;
    var getter = compileGetter(this.getter);
    iter.reset();
    while (iter.next()) {
      var current = iter.current();
      var key = getter(current);
      if (key in hash) {
        hash[key].push(current);
      } else {
        hash[key] = [current];
        keys.push(key);
      }
    }
    this.groupedIter = new ArrayIterator(map(keys, function(key2) {
      return {
        key: key2,
        items: hash[key2]
      };
    }));
  }
});
var SelectIterator = WrappedIterator.inherit({
  ctor: function(iter, getter) {
    this.callBase(iter);
    this.getter = compileGetter(getter);
  },
  current: function() {
    return this.getter(this.callBase());
  },
  countable: function() {
    return this.iter.countable();
  },
  count: function() {
    return this.iter.count();
  }
});
var SliceIterator = WrappedIterator.inherit({
  ctor: function(iter, skip, take) {
    this.callBase(iter);
    this.skip = Math.max(0, skip);
    this.take = Math.max(0, take);
    this.pos = 0;
  },
  next: function() {
    if (this.pos >= this.skip + this.take) {
      return false;
    }
    while (this.pos < this.skip && this.iter.next()) {
      this.pos++;
    }
    this.pos++;
    return this.iter.next();
  },
  reset: function() {
    this.callBase();
    this.pos = 0;
  },
  countable: function() {
    return this.iter.countable();
  },
  count: function() {
    return Math.min(this.iter.count() - this.skip, this.take);
  }
});
var arrayQueryImpl = function arrayQueryImpl2(iter, queryOptions) {
  queryOptions = queryOptions || {};
  if (!(iter instanceof Iterator)) {
    iter = new ArrayIterator(iter);
  }
  if (queryOptions.langParams) {
    iter.langParams = queryOptions.langParams;
  }
  var handleError$1 = function(error) {
    var handler = queryOptions.errorHandler;
    if (handler) {
      handler(error);
    }
    handleError(error);
  };
  var aggregateCore = function(aggregator) {
    var d = new Deferred().fail(handleError$1);
    var seed;
    var step = aggregator.step;
    var finalize = aggregator.finalize;
    try {
      iter.reset();
      if ("seed" in aggregator) {
        seed = aggregator.seed;
      } else {
        seed = iter.next() ? iter.current() : NaN;
      }
      var accumulator = seed;
      while (iter.next()) {
        accumulator = step(accumulator, iter.current());
      }
      d.resolve(finalize ? finalize(accumulator) : accumulator);
    } catch (x) {
      d.reject(x);
    }
    return d.promise();
  };
  var standardAggregate = function(name) {
    return aggregateCore(aggregators[name]);
  };
  var select = function(getter) {
    if (!isFunction(getter) && !Array.isArray(getter)) {
      getter = [].slice.call(arguments);
    }
    return chainQuery(new SelectIterator(iter, getter));
  };
  var selectProp = function(name) {
    return select(compileGetter(name));
  };
  function chainQuery(iter2) {
    return arrayQueryImpl2(iter2, queryOptions);
  }
  return {
    toArray: function() {
      return iter.toArray();
    },
    enumerate: function() {
      var d = new Deferred().fail(handleError$1);
      try {
        d.resolve(iter.toArray());
      } catch (x) {
        d.reject(x);
      }
      return d.promise();
    },
    setLangParams(options) {
      iter.langParams = options;
    },
    sortBy: function(getter, desc, compare) {
      return chainQuery(new SortIterator(iter, getter, desc, compare));
    },
    thenBy: function(getter, desc, compare) {
      if (iter instanceof SortIterator) {
        return chainQuery(iter.thenBy(getter, desc, compare));
      }
      throw errors.Error("E4004");
    },
    filter: function(criteria) {
      if (!Array.isArray(criteria)) {
        criteria = [].slice.call(arguments);
      }
      return chainQuery(new FilterIterator(iter, criteria));
    },
    slice: function(skip, take) {
      if (void 0 === take) {
        take = Number.MAX_VALUE;
      }
      return chainQuery(new SliceIterator(iter, skip, take));
    },
    select,
    groupBy: function(getter) {
      return chainQuery(new GroupIterator(iter, getter));
    },
    aggregate: function(seed, step, finalize) {
      if (arguments.length < 2) {
        return aggregateCore({
          step: arguments[0]
        });
      }
      return aggregateCore({
        seed,
        step,
        finalize
      });
    },
    count: function() {
      if (iter.countable()) {
        var d = new Deferred().fail(handleError$1);
        try {
          d.resolve(iter.count());
        } catch (x) {
          d.reject(x);
        }
        return d.promise();
      }
      return standardAggregate("count");
    },
    sum: function(getter) {
      if (getter) {
        return selectProp(getter).sum();
      }
      return standardAggregate("sum");
    },
    min: function(getter) {
      if (getter) {
        return selectProp(getter).min();
      }
      return standardAggregate("min");
    },
    max: function(getter) {
      if (getter) {
        return selectProp(getter).max();
      }
      return standardAggregate("max");
    },
    avg: function(getter) {
      if (getter) {
        return selectProp(getter).avg();
      }
      return standardAggregate("avg");
    }
  };
};
const queryAdapters = {};
var remoteQueryImpl = function remoteQueryImpl2(url, queryOptions, tasks) {
  tasks = tasks || [];
  queryOptions = queryOptions || {};
  var createTask = function(name, args) {
    return {
      name,
      args
    };
  };
  var exec = function(executorTask) {
    var d = new Deferred();
    var _adapterFactory;
    var _adapter;
    var _taskQueue;
    var _currentTask;
    var _mergedSortArgs;
    var rejectWithNotify = function(error) {
      var handler = queryOptions.errorHandler;
      if (handler) {
        handler(error);
      }
      handleError(error);
      d.reject(error);
    };
    function mergeSortTask(task) {
      switch (task.name) {
        case "sortBy":
          _mergedSortArgs = [task.args];
          return true;
        case "thenBy":
          if (!_mergedSortArgs) {
            throw errors.Error("E4004");
          }
          _mergedSortArgs.push(task.args);
          return true;
      }
      return false;
    }
    try {
      _adapterFactory = queryOptions.adapter;
      if (!isFunction(_adapterFactory)) {
        _adapterFactory = queryAdapters[_adapterFactory];
      }
      _adapter = _adapterFactory(queryOptions);
      _taskQueue = [].concat(tasks).concat(executorTask);
      var optimize = _adapter.optimize;
      if (optimize) {
        optimize(_taskQueue);
      }
      while (_taskQueue.length) {
        _currentTask = _taskQueue[0];
        if (!mergeSortTask(_currentTask)) {
          if (_mergedSortArgs) {
            _taskQueue.unshift(createTask("multiSort", [_mergedSortArgs]));
            _mergedSortArgs = null;
            continue;
          }
          if ("enumerate" !== String(_currentTask.name)) {
            if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
              break;
            }
          }
        }
        _taskQueue.shift();
      }
      !function() {
        var head = _taskQueue[0];
        var unmergedTasks = [];
        if (head && "multiSort" === head.name) {
          _taskQueue.shift();
          each(head.args[0], function() {
            unmergedTasks.push(createTask(unmergedTasks.length ? "thenBy" : "sortBy", this));
          });
        }
        _taskQueue = unmergedTasks.concat(_taskQueue);
      }();
      _adapter.exec(url).done(function(result, extra) {
        if (!_taskQueue.length) {
          d.resolve(result, extra);
        } else {
          var clientChain = arrayQueryImpl(result, {
            errorHandler: queryOptions.errorHandler
          });
          each(_taskQueue, function() {
            clientChain = clientChain[this.name].apply(clientChain, this.args);
          });
          clientChain.done(d.resolve).fail(d.reject);
        }
      }).fail(rejectWithNotify);
    } catch (x) {
      rejectWithNotify(x);
    }
    return d.promise();
  };
  var query2 = {};
  each(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], function() {
    var name = String(this);
    query2[name] = function() {
      return remoteQueryImpl2(url, queryOptions, tasks.concat(createTask(name, arguments)));
    };
  });
  each(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], function() {
    var name = String(this);
    query2[name] = function() {
      return exec.call(this, createTask(name, arguments));
    };
  });
  return query2;
};
var queryImpl = {
  array: arrayQueryImpl,
  remote: remoteQueryImpl
};
var query = function() {
  var impl = Array.isArray(arguments[0]) ? "array" : "remote";
  return queryImpl[impl].apply(this, arguments);
};
class EventsStrategy {
  constructor(owner) {
    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    this._events = {};
    this._owner = owner;
    this._options = options;
  }
  static create(owner, strategy) {
    if (strategy) {
      return isFunction(strategy) ? strategy(owner) : strategy;
    } else {
      return new EventsStrategy(owner);
    }
  }
  hasEvent(eventName) {
    var callbacks2 = this._events[eventName];
    return callbacks2 ? callbacks2.has() : false;
  }
  fireEvent(eventName, eventArgs) {
    var callbacks2 = this._events[eventName];
    if (callbacks2) {
      callbacks2.fireWith(this._owner, eventArgs);
    }
    return this._owner;
  }
  on(eventName, eventHandler) {
    if (isPlainObject(eventName)) {
      each(eventName, (e, h) => {
        this.on(e, h);
      });
    } else {
      var callbacks2 = this._events[eventName];
      if (!callbacks2) {
        callbacks2 = Callbacks({
          syncStrategy: this._options.syncStrategy
        });
        this._events[eventName] = callbacks2;
      }
      var addFn = callbacks2.originalAdd || callbacks2.add;
      addFn.call(callbacks2, eventHandler);
    }
  }
  off(eventName, eventHandler) {
    var callbacks2 = this._events[eventName];
    if (callbacks2) {
      if (isFunction(eventHandler)) {
        callbacks2.remove(eventHandler);
      } else {
        callbacks2.empty();
      }
    }
  }
  dispose() {
    each(this._events, (eventName, event) => {
      event.empty();
    });
  }
}
function multiLevelGroup(query2, groupInfo) {
  query2 = query2.groupBy(groupInfo[0].selector);
  if (groupInfo.length > 1) {
    query2 = query2.select(function(g) {
      return extend({}, g, {
        items: multiLevelGroup(arrayQueryImpl(g.items), groupInfo.slice(1)).toArray()
      });
    });
  }
  return query2;
}
function arrangeSortingInfo(groupInfo, sortInfo) {
  var filteredGroup = [];
  each(groupInfo, function(_, group) {
    var collision = grep(sortInfo, function(sort) {
      return group.selector === sort.selector;
    });
    if (collision.length < 1) {
      filteredGroup.push(group);
    }
  });
  return filteredGroup.concat(sortInfo);
}
function queryByOptions$1(query2, options, isCountQuery) {
  var _options;
  options = options || {};
  var filter = options.filter;
  if (null !== (_options = options) && void 0 !== _options && _options.langParams) {
    var _query$setLangParams, _query;
    null === (_query$setLangParams = (_query = query2).setLangParams) || void 0 === _query$setLangParams ? void 0 : _query$setLangParams.call(_query, options.langParams);
  }
  if (filter) {
    query2 = query2.filter(filter);
  }
  if (isCountQuery) {
    return query2;
  }
  var sort = options.sort;
  var select = options.select;
  var group = options.group;
  var skip = options.skip;
  var take = options.take;
  if (group) {
    group = normalizeSortingInfo(group);
    group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder;
  }
  if (sort || group) {
    sort = normalizeSortingInfo(sort || []);
    if (group && !group.keepInitialKeyOrder) {
      sort = arrangeSortingInfo(group, sort);
    }
    each(sort, function(index) {
      query2 = query2[index ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare);
    });
  }
  if (select) {
    query2 = query2.select(select);
  }
  if (group) {
    query2 = multiLevelGroup(query2, group);
  }
  if (take || skip) {
    query2 = query2.slice(skip || 0, take);
  }
  return query2;
}
const storeHelper = {
  multiLevelGroup,
  arrangeSortingInfo,
  queryByOptions: queryByOptions$1
};
var abstract = classImpl.abstract;
var queryByOptions = storeHelper.queryByOptions;
var storeImpl = {};
var Store = classImpl.inherit({
  _langParams: {},
  ctor: function(options) {
    var that = this;
    options = options || {};
    this._eventsStrategy = new EventsStrategy(this);
    each(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], function(_, optionName) {
      if (optionName in options) {
        that.on(optionName.slice(2).toLowerCase(), options[optionName]);
      }
    });
    this._key = options.key;
    this._errorHandler = options.errorHandler;
    this._useDefaultSearch = true;
  },
  _clearCache: noop,
  _customLoadOptions: function() {
    return null;
  },
  key: function() {
    return this._key;
  },
  keyOf: function(obj) {
    if (!this._keyGetter) {
      this._keyGetter = compileGetter(this.key());
    }
    return this._keyGetter(obj);
  },
  _requireKey: function() {
    if (!this.key()) {
      throw errors.Error("E4005");
    }
  },
  load: function(options) {
    var that = this;
    options = options || {};
    this._eventsStrategy.fireEvent("loading", [options]);
    return this._withLock(this._loadImpl(options)).done(function(result) {
      that._eventsStrategy.fireEvent("loaded", [result, options]);
    });
  },
  _loadImpl: function(options) {
    if (!isEmptyObject(this._langParams)) {
      options = options || {};
      options._langParams = _extends({}, this._langParams, options._langParams);
    }
    return queryByOptions(this.createQuery(options), options).enumerate();
  },
  _withLock: function(task) {
    var result = new Deferred();
    task.done(function() {
      var that = this;
      var args = arguments;
      processRequestResultLock.promise().done(function() {
        result.resolveWith(that, args);
      });
    }).fail(function() {
      result.rejectWith(this, arguments);
    });
    return result;
  },
  createQuery: abstract,
  totalCount: function(options) {
    return this._totalCountImpl(options);
  },
  _totalCountImpl: function(options) {
    return queryByOptions(this.createQuery(options), options, true).count();
  },
  byKey: function(key, extraOptions) {
    return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)));
  },
  _byKeyImpl: abstract,
  insert: function(values) {
    var that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("inserting", [values]);
    return that._addFailHandlers(that._insertImpl(values).done(function(callbackValues, callbackKey) {
      that._eventsStrategy.fireEvent("inserted", [callbackValues, callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _insertImpl: abstract,
  update: function(key, values) {
    var that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("updating", [key, values]);
    return that._addFailHandlers(that._updateImpl(key, values).done(function() {
      that._eventsStrategy.fireEvent("updated", [key, values]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _updateImpl: abstract,
  push: function(changes) {
    var beforePushArgs = {
      changes,
      waitFor: []
    };
    this._eventsStrategy.fireEvent("beforePushAggregation", [beforePushArgs]);
    when(...beforePushArgs.waitFor).done(() => {
      this._pushImpl(changes);
      this._eventsStrategy.fireEvent("beforePush", [{
        changes
      }]);
      this._eventsStrategy.fireEvent("push", [changes]);
    });
  },
  _pushImpl: noop,
  remove: function(key) {
    var that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("removing", [key]);
    return that._addFailHandlers(that._removeImpl(key).done(function(callbackKey) {
      that._eventsStrategy.fireEvent("removed", [callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _removeImpl: abstract,
  _addFailHandlers: function(deferred) {
    return deferred.fail(this._errorHandler).fail(handleError);
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});
Store.create = function(alias, options) {
  if (!(alias in storeImpl)) {
    throw errors.Error("E4020", alias);
  }
  return new storeImpl[alias](options);
};
Store.registerClass = function(type2, alias) {
  if (alias) {
    storeImpl[alias] = type2;
  }
  return type2;
};
Store.inherit = /* @__PURE__ */ function(inheritor) {
  return function(members, alias) {
    var type2 = inheritor.apply(this, [members]);
    Store.registerClass(type2, alias);
    return type2;
  };
}(Store.inherit);
var DEFAULT_PROTOCOL_VERSION$1 = 4;
var STRING_FUNCTIONS = ["contains", "notcontains", "startswith", "endswith"];
var compileCriteria = (() => {
  var protocolVersion;
  var forceLowerCase;
  var fieldTypes;
  var createBinaryOperationFormatter = (op) => (prop, val) => "".concat(prop, " ").concat(op, " ").concat(val);
  var createStringFuncFormatter = (op, reverse) => (prop, val) => {
    var bag = [op, "("];
    if (forceLowerCase) {
      prop = -1 === prop.indexOf("tolower(") ? "tolower(".concat(prop, ")") : prop;
      val = val.toLowerCase();
    }
    if (reverse) {
      bag.push(val, ",", prop);
    } else {
      bag.push(prop, ",", val);
    }
    bag.push(")");
    return bag.join("");
  };
  var formatters = {
    "=": createBinaryOperationFormatter("eq"),
    "<>": createBinaryOperationFormatter("ne"),
    ">": createBinaryOperationFormatter("gt"),
    ">=": createBinaryOperationFormatter("ge"),
    "<": createBinaryOperationFormatter("lt"),
    "<=": createBinaryOperationFormatter("le"),
    startswith: createStringFuncFormatter("startswith"),
    endswith: createStringFuncFormatter("endswith")
  };
  var formattersV2 = extend({}, formatters, {
    contains: createStringFuncFormatter("substringof", true),
    notcontains: createStringFuncFormatter("not substringof", true)
  });
  var formattersV4 = extend({}, formatters, {
    contains: createStringFuncFormatter("contains"),
    notcontains: createStringFuncFormatter("not contains")
  });
  var compileBinary = (criteria) => {
    var _fieldTypes;
    criteria = normalizeBinaryCriterion(criteria);
    var op = criteria[1];
    var fieldName = criteria[0];
    var fieldType = fieldTypes && fieldTypes[fieldName];
    if (fieldType && (name = op, STRING_FUNCTIONS.some((funcName) => funcName === name)) && "String" !== fieldType) {
      throw new errors.Error("E4024", op, fieldName, fieldType);
    }
    var name;
    var formatters2 = 4 === protocolVersion ? formattersV4 : formattersV2;
    var formatter = formatters2[op.toLowerCase()];
    if (!formatter) {
      throw errors.Error("E4003", op);
    }
    var value = criteria[2];
    if (null !== (_fieldTypes = fieldTypes) && void 0 !== _fieldTypes && _fieldTypes[fieldName]) {
      value = convertPrimitiveValue(fieldTypes[fieldName], value);
    }
    return formatter(serializePropName(fieldName), serializeValue(value, protocolVersion));
  };
  var compileGroup = (criteria) => {
    var bag = [];
    var groupOperator;
    var nextGroupOperator;
    each(criteria, function(index, criterion) {
      if (Array.isArray(criterion)) {
        if (bag.length > 1 && groupOperator !== nextGroupOperator) {
          throw new errors.Error("E4019");
        }
        bag.push("(".concat(compileCore(criterion), ")"));
        groupOperator = nextGroupOperator;
        nextGroupOperator = "and";
      } else {
        nextGroupOperator = isConjunctiveOperator(this) ? "and" : "or";
      }
    });
    return bag.join(" ".concat(groupOperator, " "));
  };
  var compileCore = (criteria) => {
    if (Array.isArray(criteria[0])) {
      return compileGroup(criteria);
    }
    if (isUnaryOperation(criteria)) {
      return ((criteria2) => {
        var op = criteria2[0];
        var crit = compileCore(criteria2[1]);
        if ("!" === op) {
          return "not (".concat(crit, ")");
        }
        throw errors.Error("E4003", op);
      })(criteria);
    }
    return compileBinary(criteria);
  };
  return (criteria, version2, types2, filterToLower) => {
    fieldTypes = types2;
    forceLowerCase = null !== filterToLower && void 0 !== filterToLower ? filterToLower : configMethod().oDataFilterToLower;
    protocolVersion = version2;
    return compileCore(criteria);
  };
})();
var createODataQueryAdapter = (queryOptions) => {
  var _sorting = [];
  var _criteria = [];
  var _expand = queryOptions.expand;
  var _select;
  var _skip;
  var _take;
  var _countQuery;
  var _oDataVersion = queryOptions.version || DEFAULT_PROTOCOL_VERSION$1;
  var hasSlice = () => _skip || void 0 !== _take;
  var hasFunction = (criterion) => {
    for (var i = 0; i < criterion.length; i++) {
      if (isFunction(criterion[i])) {
        return true;
      }
      if (Array.isArray(criterion[i]) && hasFunction(criterion[i])) {
        return true;
      }
    }
    return false;
  };
  var requestData = () => {
    var result = {};
    if (!_countQuery) {
      if (_sorting.length) {
        result.$orderby = _sorting.join(",");
      }
      if (_skip) {
        result.$skip = _skip;
      }
      if (void 0 !== _take) {
        result.$top = _take;
      }
      result.$select = generateSelect(_oDataVersion, _select) || void 0;
      result.$expand = generateExpand(_oDataVersion, _expand, _select) || void 0;
    }
    if (_criteria.length) {
      var criteria = _criteria.length < 2 ? _criteria[0] : _criteria;
      var fieldTypes = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.fieldTypes;
      var filterToLower = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.filterToLower;
      result.$filter = compileCriteria(criteria, _oDataVersion, fieldTypes, filterToLower);
    }
    if (_countQuery) {
      result.$top = 0;
    }
    if (queryOptions.requireTotalCount || _countQuery) {
      if (4 !== _oDataVersion) {
        result.$inlinecount = "allpages";
      } else {
        result.$count = "true";
      }
    }
    return result;
  };
  return {
    optimize: (tasks) => {
      var selectIndex = -1;
      for (var i = 0; i < tasks.length; i++) {
        if ("select" === tasks[i].name) {
          selectIndex = i;
          break;
        }
      }
      if (selectIndex < 0 || !isFunction(tasks[selectIndex].args[0])) {
        return;
      }
      var nextTask = tasks[1 + selectIndex];
      if (!nextTask || "slice" !== nextTask.name) {
        return;
      }
      tasks[1 + selectIndex] = tasks[selectIndex];
      tasks[selectIndex] = nextTask;
    },
    exec: (url) => sendRequest(_oDataVersion, {
      url,
      params: extend(requestData(), null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.params)
    }, {
      beforeSend: queryOptions.beforeSend,
      jsonp: queryOptions.jsonp,
      withCredentials: queryOptions.withCredentials,
      countOnly: _countQuery,
      deserializeDates: queryOptions.deserializeDates,
      fieldTypes: queryOptions.fieldTypes,
      isPaged: isFinite(_take)
    }),
    multiSort(args) {
      var rules;
      if (hasSlice()) {
        return false;
      }
      for (var i = 0; i < args.length; i++) {
        var getter = args[i][0];
        var desc = !!args[i][1];
        var rule = void 0;
        if ("string" !== typeof getter) {
          return false;
        }
        rule = serializePropName(getter);
        if (desc) {
          rule += " desc";
        }
        rules = rules || [];
        rules.push(rule);
      }
      _sorting = rules;
    },
    slice(skipCount, takeCount) {
      if (hasSlice()) {
        return false;
      }
      _skip = skipCount;
      _take = takeCount;
    },
    filter(criterion) {
      if (hasSlice()) {
        return false;
      }
      if (!Array.isArray(criterion)) {
        criterion = [].slice.call(arguments);
      }
      if (hasFunction(criterion)) {
        return false;
      }
      if (_criteria.length) {
        _criteria.push("and");
      }
      _criteria.push(criterion);
    },
    select(expr) {
      if (_select || isFunction(expr)) {
        return false;
      }
      if (!Array.isArray(expr)) {
        expr = [].slice.call(arguments);
      }
      _select = expr;
    },
    count: () => _countQuery = true
  };
};
queryAdapters.odata = createODataQueryAdapter;
var DEFAULT_PROTOCOL_VERSION = 4;
class RequestDispatcher {
  constructor(options) {
    options = options || {};
    this._url = String(options.url).replace(/\/+$/, "");
    this._beforeSend = options.beforeSend;
    this._jsonp = options.jsonp;
    this._version = options.version || DEFAULT_PROTOCOL_VERSION;
    this._withCredentials = options.withCredentials;
    this._deserializeDates = options.deserializeDates;
    this._filterToLower = options.filterToLower;
  }
  sendRequest(url, method, params, payload) {
    return sendRequest(this.version, {
      url,
      method,
      params: params || {},
      payload
    }, {
      beforeSend: this._beforeSend,
      jsonp: this._jsonp,
      withCredentials: this._withCredentials,
      deserializeDates: this._deserializeDates
    });
  }
  get version() {
    return this._version;
  }
  get beforeSend() {
    return this._beforeSend;
  }
  get url() {
    return this._url;
  }
  get jsonp() {
    return this._jsonp;
  }
  get filterToLower() {
    return this._filterToLower;
  }
}
var ANONYMOUS_KEY_NAME = "5d46402c-7899-4ea9-bd81-8b73c47c7683";
var expandKeyType = (key, keyType) => ({
  [key]: keyType
});
var mergeFieldTypesWithKeyType = (fieldTypes, keyType) => {
  var result = {};
  for (var field in fieldTypes) {
    result[field] = fieldTypes[field];
  }
  for (var keyName in keyType) {
    if (keyName in result) {
      if (result[keyName] !== keyType[keyName]) {
        errors.log("W4001", keyName);
      }
    } else {
      result[keyName] = keyType[keyName];
    }
  }
  return result;
};
var ODataStore = Store.inherit({
  ctor(options) {
    this.callBase(options);
    this._requestDispatcher = new RequestDispatcher(options);
    var key = this.key();
    var fieldTypes = options.fieldTypes;
    var keyType = options.keyType;
    if (keyType) {
      var keyTypeIsString = "string" === typeof keyType;
      if (!key) {
        key = keyTypeIsString ? ANONYMOUS_KEY_NAME : Object.keys(keyType);
        this._legacyAnonymousKey = key;
      }
      if (keyTypeIsString) {
        keyType = expandKeyType(key, keyType);
      }
      fieldTypes = mergeFieldTypesWithKeyType(fieldTypes, keyType);
    }
    this._fieldTypes = fieldTypes || {};
    if (2 === this.version()) {
      this._updateMethod = "MERGE";
    } else {
      this._updateMethod = "PATCH";
    }
  },
  _customLoadOptions: () => ["expand", "customQueryParams"],
  _byKeyImpl(key, extraOptions) {
    var params = {};
    if (extraOptions) {
      params.$expand = generateExpand(this.version(), extraOptions.expand, extraOptions.select) || void 0;
      params.$select = generateSelect(this.version(), extraOptions.select) || void 0;
    }
    return this._requestDispatcher.sendRequest(this._byKeyUrl(key), "GET", params);
  },
  createQuery(loadOptions) {
    var _loadOptions$urlOverr;
    var url;
    var queryOptions = {
      adapter: "odata",
      beforeSend: this._requestDispatcher.beforeSend,
      errorHandler: this._errorHandler,
      jsonp: this._requestDispatcher.jsonp,
      version: this._requestDispatcher.version,
      withCredentials: this._requestDispatcher._withCredentials,
      expand: null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.expand,
      requireTotalCount: null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.requireTotalCount,
      deserializeDates: this._requestDispatcher._deserializeDates,
      fieldTypes: this._fieldTypes
    };
    url = null !== (_loadOptions$urlOverr = null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.urlOverride) && void 0 !== _loadOptions$urlOverr ? _loadOptions$urlOverr : this._requestDispatcher.url;
    if (isDefined(this._requestDispatcher.filterToLower)) {
      queryOptions.filterToLower = this._requestDispatcher.filterToLower;
    }
    if (null !== loadOptions && void 0 !== loadOptions && loadOptions.customQueryParams) {
      var params = escapeServiceOperationParams(null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.customQueryParams, this.version());
      if (4 === this.version()) {
        url = formatFunctionInvocationUrl(url, params);
      } else {
        queryOptions.params = params;
      }
    }
    return query(url, queryOptions);
  },
  _insertImpl(values) {
    this._requireKey();
    var d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._requestDispatcher.url, "POST", null, values)).done((serverResponse) => d.resolve(serverResponse && !configMethod().useLegacyStoreResult ? serverResponse : values, this.keyOf(serverResponse))).fail(d.reject);
    return d.promise();
  },
  _updateImpl(key, values) {
    var d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._byKeyUrl(key), this._updateMethod, null, values)).done((serverResponse) => configMethod().useLegacyStoreResult ? d.resolve(key, values) : d.resolve(serverResponse || values, key)).fail(d.reject);
    return d.promise();
  },
  _removeImpl(key) {
    var d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._byKeyUrl(key), "DELETE")).done(() => d.resolve(key)).fail(d.reject);
    return d.promise();
  },
  _convertKey(value) {
    var result = value;
    var fieldTypes = this._fieldTypes;
    var key = this.key() || this._legacyAnonymousKey;
    if (Array.isArray(key)) {
      result = {};
      for (var i = 0; i < key.length; i++) {
        var keyName = key[i];
        result[keyName] = convertPrimitiveValue(fieldTypes[keyName], value[keyName]);
      }
    } else if (fieldTypes[key]) {
      result = convertPrimitiveValue(fieldTypes[key], value);
    }
    return result;
  },
  _byKeyUrl(value) {
    var baseUrl = this._requestDispatcher.url;
    var convertedKey = this._convertKey(value);
    return "".concat(baseUrl, "(").concat(encodeURIComponent(serializeKey(convertedKey, this.version())), ")");
  },
  version() {
    return this._requestDispatcher.version;
  }
}, "odata");
class LookupSource {
  constructor(options) {
    __publicField(this, "source");
    __publicField(this, "key");
    this.key = options.key || "_key";
    this.source = new ODataStore({
      url: `${options.url}/${options.resourceName}`,
      key: this.key,
      version: 4
    });
  }
  field(field) {
    return {
      dataSource: this.source,
      valueExpr: this.key,
      displayExpr: field
    };
  }
}
async function Build(options) {
  var _a;
  try {
    const response = await fetch(`${options.url}/$metadata#${options.resourceName}`);
    const str = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(str, "application/xml");
    const fieldTypes = {};
    const keyName = (_a = xml.querySelector("Key PropertyRef")) == null ? void 0 : _a.getAttribute("Name");
    const properties = xml.querySelectorAll("Property");
    const propertyDetails = Array.from(properties).map((prop) => ({
      name: prop.getAttribute("Name"),
      type: prop.getAttribute("Type")
    }));
    for (const p of propertyDetails) {
      let type2 = p.type;
      if (type2.startsWith("Edm.")) {
        type2 = type2.replace("Edm.", "");
      }
      fieldTypes[p.name] = type2;
    }
    const store = new ODataStore({
      version: 4,
      url: `${options.url}/${options.resourceName}`,
      key: `${keyName}`,
      keyType: "Guid",
      fieldTypes,
      onLoaded: () => {
      },
      beforeSend: () => {
      }
    });
    return store;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
function Lookup(options) {
  const lookupSource = new LookupSource(options);
  return lookupSource;
}
const ODataStoreBuilder = {
  Build,
  Lookup
};
export {
  ColumnBuilder,
  LookupSource,
  ODataStoreBuilder
};
//# sourceMappingURL=dx.js.map

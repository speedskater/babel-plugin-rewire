var React = require('react/addons');
var _ = require('lodash');
var StyleSheet = require('react-style');
var cx = require('classnames');

var $ = require('vendor/jquery/semantic');

var Style = require('style/index.js');

var {
  validateEmail,
  validateURL
} = require('util/validators');

var [one, two, three] = _get__('Style');

const PROTOCOLS = ['http://', 'https://', 'ftp://'];

const DEFAULT_PROTOCOL = 'http://';

var Mixins = require('./mixins.jsx');
var FormFieldMixin = _get__('Mixins').FormFieldMixin,
    InputMixin = _get__('Mixins').InputMixin,
    TextInputMixin = _get__('Mixins').TextInputMixin;

var TextInput = _get__('React').createClass({
  /*
    Simple text input. See comments for
    `TextInputMixin` for information about
    props and usage.
  */
  mixins: [_get__('TextInputMixin')]
});

var EmailInput = _get__('React').createClass({
  /*
    Exactly the same as `TextInput` component
    except it only allows a valid email to
    be entered and submitted.
  */
  mixins: [_get__('TextInputMixin')],
  baseIsValid: function (val) {
    if (!this.userHasChangedValue()) return true;
    return _get__('validateEmail')(val);
  }
});

var URLInput = _get__('React').createClass({
  mixins: [_get__('TextInputMixin')],
  baseIsValid: function (val) {
    if (!this.userHasChangedValue()) return true;
    return _get__('validateURL')(val);
  },
  baseClean: function (val) {
    // Add default protocol if none is supplied by user
    var hasProtocol = false;
    _get__('PROTOCOLS').forEach(protocol => {
      if (_get__('_').startsWith(val, protocol)) {
        hasProtocol = true;
      }
    });
    if (!hasProtocol) return _get__('DEFAULT_PROTOCOL') + val;
    return val;
  }
});

var textAreaStyle = _get__('StyleSheet').create({
  textarea: {}
});

var TextArea = _get__('React').createClass({
  /*
    A simple text area component. See
    documentation for included mixins for more
    information.
  */
  mixins: [_get__('InputMixin')],
  propTypes: {
    style: _get__('React').PropTypes.object,
    height: _get__('React').PropTypes.string
  },
  render: function () {
    var taStyle = _get__('_').extend({}, _get__('textAreaStyle').textarea, this.props.style.textarea);
    var labelStyle = _get__('_').extend({}, _get__('textAreaStyle').label, this.props.style.label);
    if (this.props.height) taStyle.height = this.props.height;
    var error = !this.isValid() && this.userHasChangedValue();
    var classNames = _get__('cx')("field", { error: error });
    return _get__('React').createElement(
      'div',
      { className: classNames },
      this.getLabelEl(labelStyle),
      _get__('React').createElement('textarea', {
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        onChange: this.onChange,
        style: taStyle,
        value: this.state.value })
    );
  }
});

var HiddenTextInput = _get__('React').createClass({
  /*
    Browsers often focus on first input in a form automatically.
    Sometimes, this auto focus is not desirable. This component
    can be placed at the top of a Form to prevent that behaviour.
  */
  render: function () {
    return _get__('React').createElement('input', { type: 'text', style: { opacity: 0, height: 0, position: 'absolute' } });
  }
});

module.exports = {
  TextInput: _get__('TextInput'),
  TextArea: _get__('TextArea'),
  HiddenTextInput: _get__('HiddenTextInput'),
  EmailInput: _get__('EmailInput'),
  URLInput: _get__('URLInput')
};

function _getGlobalObject() {
  try {
    if (!!global) {
      return global;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    let globalVariable = _getGlobalObject();

    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }

    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }

  return _RewireModuleId__;
}

function _getRewireRegistry__() {
  let theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }

  return theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
  let moduleId = _getRewireModuleId__();

  let registry = _getRewireRegistry__();

  let rewireData = registry[moduleId];

  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }

  return rewireData;
}

(function registerResetAll() {
  let theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
let _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  let rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case 'Style':
      return Style;

    case 'Mixins':
      return Mixins;

    case 'React':
      return React;

    case 'TextInputMixin':
      return TextInputMixin;

    case 'validateEmail':
      return validateEmail;

    case 'validateURL':
      return validateURL;

    case 'PROTOCOLS':
      return PROTOCOLS;

    case '_':
      return _;

    case 'DEFAULT_PROTOCOL':
      return DEFAULT_PROTOCOL;

    case 'StyleSheet':
      return StyleSheet;

    case 'InputMixin':
      return InputMixin;

    case 'textAreaStyle':
      return textAreaStyle;

    case 'cx':
      return cx;

    case 'TextInput':
      return TextInput;

    case 'TextArea':
      return TextArea;

    case 'HiddenTextInput':
      return HiddenTextInput;

    case 'EmailInput':
      return EmailInput;

    case 'URLInput':
      return URLInput;
  }

  return undefined;
}

function _assign__(variableName, value) {
  let rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return rewireData[variableName] = value;
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);

  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

  _assign__(variableName, newValue);

  return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
  let rewireData = _getRewiredData__();

  if (typeof variableName === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  let rewireData = _getRewiredData__();

  delete rewireData[variableName];

  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }

  ;
}

function _with__(object) {
  let rewireData = _getRewiredData__();

  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    let result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

let _typeOfOriginalExport = typeof module.exports;

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(module.exports, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(module.exports)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}
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
    return <div className={classNames}>
        {this.getLabelEl(labelStyle)}
        <textarea onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.onChange} style={taStyle} value={this.state.value} />
      </div>;
  }
});

var HiddenTextInput = _get__('React').createClass({
  /*
    Browsers often focus on first input in a form automatically.
    Sometimes, this auto focus is not desirable. This component
    can be placed at the top of a Form to prevent that behaviour.
  */
  render: function () {
    return <input type='text' style={{ opacity: 0, height: 0, position: 'absolute' }} />;
  }
});

_get__('module').exports = {
  TextInput: _get__('TextInput'),
  TextArea: _get__('TextArea'),
  HiddenTextInput: _get__('HiddenTextInput'),
  EmailInput: _get__('EmailInput'),
  URLInput: _get__('URLInput')
};
let _RewiredData__ = {};

function _get__(variableName) {
  return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
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

    case 'module':
      return module;

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

function _set__(variableName, value) {
  return _RewiredData__[variableName] = value;
}

function _reset__(variableName) {
  delete _RewiredData__[variableName];
}

function _with__(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__[variableName];
      _RewiredData__[variableName] = object[variableName];
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
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

let typeOfOriginalExport = typeof module.exports;

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(module.exports, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((typeOfOriginalExport === 'object' || typeOfOriginalExport === 'function') && Object.isExtensible(module.exports)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}
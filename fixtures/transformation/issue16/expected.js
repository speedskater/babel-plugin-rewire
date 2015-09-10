'use strict';

let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];

function __GetDependency__(name) {
  return __$Getters__[name]();
}

function __Rewire__(name, value) {
  __$Setters__[name](value);
}

function __ResetDependency__(name) {
  __$Resetters__[name]();
}

let __RewireAPI__ = {
  '__GetDependency__': __GetDependency__,
  '__get__': __GetDependency__,
  '__Rewire__': __Rewire__,
  '__set__': __Rewire__,
  '__ResetDependency__': __ResetDependency__
};
var React = require('react/addons');
var _React = React;

__$Getters__['React'] = function () {
  return React;
};

__$Setters__['React'] = function (value) {
  React = value;
};

__$Resetters__['React'] = function () {
  React = _React;
};

var _ = require('lodash');
var _2 = _;

__$Getters__['_'] = function () {
  return _;
};

__$Setters__['_'] = function (value) {
  _ = value;
};

__$Resetters__['_'] = function () {
  _ = _2;
};

var StyleSheet = require('react-style');
var _StyleSheet = StyleSheet;

__$Getters__['StyleSheet'] = function () {
  return StyleSheet;
};

__$Setters__['StyleSheet'] = function (value) {
  StyleSheet = value;
};

__$Resetters__['StyleSheet'] = function () {
  StyleSheet = _StyleSheet;
};

var cx = require('classnames');

var _cx = cx;

__$Getters__['cx'] = function () {
  return cx;
};

__$Setters__['cx'] = function (value) {
  cx = value;
};

__$Resetters__['cx'] = function () {
  cx = _cx;
};

var $ = require('vendor/jquery/semantic');

var _$ = $;

__$Getters__['$'] = function () {
  return $;
};

__$Setters__['$'] = function (value) {
  $ = value;
};

__$Resetters__['$'] = function () {
  $ = _$;
};

var Style = require('style/index.js');

var _Style = Style;

__$Getters__['Style'] = function () {
  return Style;
};

__$Setters__['Style'] = function (value) {
  Style = value;
};

__$Resetters__['Style'] = function () {
  Style = _Style;
};

var {
  validateEmail,
  validateURL
} = require('util/validators');

let PROTOCOLS = ['http://', 'https://', 'ftp://'];

let _PROTOCOLS = PROTOCOLS;

__$Getters__['PROTOCOLS'] = function () {
  return PROTOCOLS;
};

__$Setters__['PROTOCOLS'] = function (value) {
  PROTOCOLS = value;
};

__$Resetters__['PROTOCOLS'] = function () {
  PROTOCOLS = _PROTOCOLS;
};

let DEFAULT_PROTOCOL = 'http://';

let _DEFAULT_PROTOCOL = DEFAULT_PROTOCOL;

__$Getters__['DEFAULT_PROTOCOL'] = function () {
  return DEFAULT_PROTOCOL;
};

__$Setters__['DEFAULT_PROTOCOL'] = function (value) {
  DEFAULT_PROTOCOL = value;
};

__$Resetters__['DEFAULT_PROTOCOL'] = function () {
  DEFAULT_PROTOCOL = _DEFAULT_PROTOCOL;
};

var Mixins = require('./mixins.jsx');
var _Mixins = Mixins;

__$Getters__['Mixins'] = function () {
  return Mixins;
};

__$Setters__['Mixins'] = function (value) {
  Mixins = value;
};

__$Resetters__['Mixins'] = function () {
  Mixins = _Mixins;
};

var FormFieldMixin = Mixins.FormFieldMixin,
    InputMixin = Mixins.InputMixin,
    TextInputMixin = Mixins.TextInputMixin;

var _FormFieldMixin = FormFieldMixin;
var _InputMixin = InputMixin;
var _TextInputMixin = TextInputMixin;

__$Getters__['FormFieldMixin'] = function () {
  return FormFieldMixin;
};

__$Setters__['FormFieldMixin'] = function (value) {
  FormFieldMixin = value;
};

__$Resetters__['FormFieldMixin'] = function () {
  FormFieldMixin = _FormFieldMixin;
};

__$Getters__['InputMixin'] = function () {
  return InputMixin;
};

__$Setters__['InputMixin'] = function (value) {
  InputMixin = value;
};

__$Resetters__['InputMixin'] = function () {
  InputMixin = _InputMixin;
};

__$Getters__['TextInputMixin'] = function () {
  return TextInputMixin;
};

__$Setters__['TextInputMixin'] = function (value) {
  TextInputMixin = value;
};

__$Resetters__['TextInputMixin'] = function () {
  TextInputMixin = _TextInputMixin;
};

var TextInput = React.createClass({
  /*
    Simple text input. See comments for
    `TextInputMixin` for information about
    props and usage.
  */
  mixins: [TextInputMixin]
});

var _TextInput = TextInput;

__$Getters__['TextInput'] = function () {
  return TextInput;
};

__$Setters__['TextInput'] = function (value) {
  TextInput = value;
};

__$Resetters__['TextInput'] = function () {
  TextInput = _TextInput;
};

var EmailInput = React.createClass({
  /*
    Exactly the same as `TextInput` component
    except it only allows a valid email to
    be entered and submitted.
  */
  mixins: [TextInputMixin],
  baseIsValid: function (val) {
    if (!this.userHasChangedValue()) return true;
    return validateEmail(val);
  }
});

var _EmailInput = EmailInput;

__$Getters__['EmailInput'] = function () {
  return EmailInput;
};

__$Setters__['EmailInput'] = function (value) {
  EmailInput = value;
};

__$Resetters__['EmailInput'] = function () {
  EmailInput = _EmailInput;
};

var URLInput = React.createClass({
  mixins: [TextInputMixin],
  baseIsValid: function (val) {
    if (!this.userHasChangedValue()) return true;
    return validateURL(val);
  },
  baseClean: function (val) {
    // Add default protocol if none is supplied by user
    var hasProtocol = false;
    PROTOCOLS.forEach(protocol => {
      if (_.startsWith(val, protocol)) {
        hasProtocol = true;
      }
    });
    if (!hasProtocol) return DEFAULT_PROTOCOL + val;
    return val;
  }
});

var _URLInput = URLInput;

__$Getters__['URLInput'] = function () {
  return URLInput;
};

__$Setters__['URLInput'] = function (value) {
  URLInput = value;
};

__$Resetters__['URLInput'] = function () {
  URLInput = _URLInput;
};

var textAreaStyle = StyleSheet.create({
  textarea: {}
});

var _textAreaStyle = textAreaStyle;

__$Getters__['textAreaStyle'] = function () {
  return textAreaStyle;
};

__$Setters__['textAreaStyle'] = function (value) {
  textAreaStyle = value;
};

__$Resetters__['textAreaStyle'] = function () {
  textAreaStyle = _textAreaStyle;
};

var TextArea = React.createClass({
  /*
    A simple text area component. See
    documentation for included mixins for more
    information.
  */
  mixins: [InputMixin],
  propTypes: {
    style: React.PropTypes.object,
    height: React.PropTypes.string
  },
  render: function () {
    var taStyle = _.extend({}, textAreaStyle.textarea, this.props.style.textarea);
    var labelStyle = _.extend({}, textAreaStyle.label, this.props.style.label);
    if (this.props.height) taStyle.height = this.props.height;
    var error = !this.isValid() && this.userHasChangedValue();
    var classNames = cx("field", { error: error });
    return <div className={classNames}>
        {this.getLabelEl(labelStyle)}
        <textarea onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.onChange} style={taStyle} value={this.state.value} />
      </div>;
  }
});

var _TextArea = TextArea;

__$Getters__['TextArea'] = function () {
  return TextArea;
};

__$Setters__['TextArea'] = function (value) {
  TextArea = value;
};

__$Resetters__['TextArea'] = function () {
  TextArea = _TextArea;
};

var HiddenTextInput = React.createClass({
  /*
    Browsers often focus on first input in a form automatically.
    Sometimes, this auto focus is not desirable. This component
    can be placed at the top of a Form to prevent that behaviour.
  */
  render: function () {
    return <input type='text' style={{ opacity: 0, height: 0, position: 'absolute' }} />;
  }
});

var _HiddenTextInput = HiddenTextInput;

__$Getters__['HiddenTextInput'] = function () {
  return HiddenTextInput;
};

__$Setters__['HiddenTextInput'] = function (value) {
  HiddenTextInput = value;
};

__$Resetters__['HiddenTextInput'] = function () {
  HiddenTextInput = _HiddenTextInput;
};

module.exports = {
  TextInput: TextInput,
  TextArea: TextArea,
  HiddenTextInput: HiddenTextInput,
  EmailInput: EmailInput,
  URLInput: URLInput
};

if (typeof module.exports === 'object' || typeof module.exports === 'function') {
  Object.defineProperty(module.exports, '__Rewire__', {
    'value': __Rewire__,
    'enumerable': false
  });
  Object.defineProperty(module.exports, '__set__', {
    'value': __Rewire__,
    'enumerable': false
  });
  Object.defineProperty(module.exports, '__ResetDependency__', {
    'value': __ResetDependency__,
    'enumerable': false
  });
  Object.defineProperty(module.exports, '__GetDependency__', {
    'value': __GetDependency__,
    'enumerable': false
  });
  Object.defineProperty(module.exports, '__get__', {
    'value': __GetDependency__,
    'enumerable': false
  });
  Object.defineProperty(module.exports, '__RewireAPI__', {
    'value': __RewireAPI__,
    'enumerable': false
  });
}
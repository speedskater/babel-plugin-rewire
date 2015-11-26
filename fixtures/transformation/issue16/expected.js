var React = _get_require()('react/addons');
var _ = _get_require()('lodash');
var StyleSheet = _get_require()('react-style');
var cx = _get_require()('classnames');

var $ = _get_require()('vendor/jquery/semantic');

var Style = _get_require()('style/index.js');

var {
  validateEmail,
  validateURL
} = _get_require()('util/validators');

var [one, two, three] = _get_Style();

const PROTOCOLS = ['http://', 'https://', 'ftp://'];

const DEFAULT_PROTOCOL = 'http://';

var Mixins = _get_require()('./mixins.jsx');
var FormFieldMixin = _get_Mixins().FormFieldMixin,
    InputMixin = _get_Mixins().InputMixin,
    TextInputMixin = _get_Mixins().TextInputMixin;

var TextInput = _get_React().createClass({
  /*
    Simple text input. See comments for
    `TextInputMixin` for information about
    props and usage.
  */
  mixins: [_get_TextInputMixin()]
});

var EmailInput = _get_React().createClass({
  /*
    Exactly the same as `TextInput` component
    except it only allows a valid email to
    be entered and submitted.
  */
  mixins: [_get_TextInputMixin()],
  baseIsValid: function (val) {
    if (!this.userHasChangedValue()) return true;
    return _get_validateEmail()(val);
  }
});

var URLInput = _get_React().createClass({
  mixins: [_get_TextInputMixin()],
  baseIsValid: function (val) {
    if (!this.userHasChangedValue()) return true;
    return _get_validateURL()(val);
  },
  baseClean: function (val) {
    // Add default protocol if none is supplied by user
    var hasProtocol = false;
    _get_PROTOCOLS().forEach(protocol => {
      if (_get__().startsWith(val, protocol)) {
        hasProtocol = true;
      }
    });
    if (!hasProtocol) return _get_DEFAULT_PROTOCOL() + val;
    return val;
  }
});

var textAreaStyle = _get_StyleSheet().create({
  textarea: {}
});

var TextArea = _get_React().createClass({
  /*
    A simple text area component. See
    documentation for included mixins for more
    information.
  */
  mixins: [_get_InputMixin()],
  propTypes: {
    style: _get_React().PropTypes.object,
    height: _get_React().PropTypes.string
  },
  render: function () {
    var taStyle = _get__().extend({}, _get_textAreaStyle().textarea, this.props.style.textarea);
    var labelStyle = _get__().extend({}, _get_textAreaStyle().label, this.props.style.label);
    if (this.props.height) taStyle.height = this.props.height;
    var error = !this.isValid() && this.userHasChangedValue();
    var classNames = _get_cx()("field", { error: error });
    return <div className={classNames}>
        {this.getLabelEl(labelStyle)}
        <textarea onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.onChange} style={taStyle} value={this.state.value} />
      </div>;
  }
});

var HiddenTextInput = _get_React().createClass({
  /*
    Browsers often focus on first input in a form automatically.
    Sometimes, this auto focus is not desirable. This component
    can be placed at the top of a Form to prevent that behaviour.
  */
  render: function () {
    return <input type='text' style={{ opacity: 0, height: 0, position: 'absolute' }} />;
  }
});

_get_module().exports = {
  TextInput: _get_TextInput(),
  TextArea: _get_TextArea(),
  HiddenTextInput: _get_HiddenTextInput(),
  EmailInput: _get_EmailInput(),
  URLInput: _get_URLInput()
};

function _get_require() {
  return _RewiredData__ === undefined || _RewiredData__['require'] === undefined ? require : _RewiredData__['require'];
}

function _get_Style() {
  return _RewiredData__ === undefined || _RewiredData__['Style'] === undefined ? Style : _RewiredData__['Style'];
}

function _get_Mixins() {
  return _RewiredData__ === undefined || _RewiredData__['Mixins'] === undefined ? Mixins : _RewiredData__['Mixins'];
}

function _get_React() {
  return _RewiredData__ === undefined || _RewiredData__['React'] === undefined ? React : _RewiredData__['React'];
}

function _get_TextInputMixin() {
  return _RewiredData__ === undefined || _RewiredData__['TextInputMixin'] === undefined ? TextInputMixin : _RewiredData__['TextInputMixin'];
}

function _get_validateEmail() {
  return _RewiredData__ === undefined || _RewiredData__['validateEmail'] === undefined ? validateEmail : _RewiredData__['validateEmail'];
}

function _get_validateURL() {
  return _RewiredData__ === undefined || _RewiredData__['validateURL'] === undefined ? validateURL : _RewiredData__['validateURL'];
}

function _get_PROTOCOLS() {
  return _RewiredData__ === undefined || _RewiredData__['PROTOCOLS'] === undefined ? PROTOCOLS : _RewiredData__['PROTOCOLS'];
}

function _get__() {
  return _RewiredData__ === undefined || _RewiredData__['_'] === undefined ? _ : _RewiredData__['_'];
}

function _get_DEFAULT_PROTOCOL() {
  return _RewiredData__ === undefined || _RewiredData__['DEFAULT_PROTOCOL'] === undefined ? DEFAULT_PROTOCOL : _RewiredData__['DEFAULT_PROTOCOL'];
}

function _get_StyleSheet() {
  return _RewiredData__ === undefined || _RewiredData__['StyleSheet'] === undefined ? StyleSheet : _RewiredData__['StyleSheet'];
}

function _get_InputMixin() {
  return _RewiredData__ === undefined || _RewiredData__['InputMixin'] === undefined ? InputMixin : _RewiredData__['InputMixin'];
}

function _get_textAreaStyle() {
  return _RewiredData__ === undefined || _RewiredData__['textAreaStyle'] === undefined ? textAreaStyle : _RewiredData__['textAreaStyle'];
}

function _get_cx() {
  return _RewiredData__ === undefined || _RewiredData__['cx'] === undefined ? cx : _RewiredData__['cx'];
}

function _get_module() {
  return _RewiredData__ === undefined || _RewiredData__['module'] === undefined ? module : _RewiredData__['module'];
}

function _get_TextInput() {
  return _RewiredData__ === undefined || _RewiredData__['TextInput'] === undefined ? TextInput : _RewiredData__['TextInput'];
}

function _get_TextArea() {
  return _RewiredData__ === undefined || _RewiredData__['TextArea'] === undefined ? TextArea : _RewiredData__['TextArea'];
}

function _get_HiddenTextInput() {
  return _RewiredData__ === undefined || _RewiredData__['HiddenTextInput'] === undefined ? HiddenTextInput : _RewiredData__['HiddenTextInput'];
}

function _get_EmailInput() {
  return _RewiredData__ === undefined || _RewiredData__['EmailInput'] === undefined ? EmailInput : _RewiredData__['EmailInput'];
}

function _get_URLInput() {
  return _RewiredData__ === undefined || _RewiredData__['URLInput'] === undefined ? URLInput : _RewiredData__['URLInput'];
}

let _RewiredData__ = {};
let _GETTERS__ = {
  'require': _get_require,
  'Style': _get_Style,
  'Mixins': _get_Mixins,
  'React': _get_React,
  'TextInputMixin': _get_TextInputMixin,
  'validateEmail': _get_validateEmail,
  'validateURL': _get_validateURL,
  'PROTOCOLS': _get_PROTOCOLS,
  '_': _get__,
  'DEFAULT_PROTOCOL': _get_DEFAULT_PROTOCOL,
  'StyleSheet': _get_StyleSheet,
  'InputMixin': _get_InputMixin,
  'textAreaStyle': _get_textAreaStyle,
  'cx': _get_cx,
  'module': _get_module,
  'TextInput': _get_TextInput,
  'TextArea': _get_TextArea,
  'HiddenTextInput': _get_HiddenTextInput,
  'EmailInput': _get_EmailInput,
  'URLInput': _get_URLInput
};

function _GetDependency__(variableName) {
  return _GETTERS__[variableName]();
}

function _Rewire__(variableName, value) {
  return _RewiredData__[variableName] = value;
}

function _ResetDependency__(variableName) {
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

  addPropertyToAPIObject('__get__', _GetDependency__);
  addPropertyToAPIObject('__GetDependency__', _GetDependency__);
  addPropertyToAPIObject('__Rewire__', _Rewire__);
  addPropertyToAPIObject('__set__', _Rewire__);
  addPropertyToAPIObject('__ResetDependency__', _ResetDependency__);
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
  addNonEnumerableProperty('__get__', _GetDependency__);
  addNonEnumerableProperty('__GetDependency__', _GetDependency__);
  addNonEnumerableProperty('__Rewire__', _Rewire__);
  addNonEnumerableProperty('__set__', _Rewire__);
  addNonEnumerableProperty('__ResetDependency__', _ResetDependency__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}
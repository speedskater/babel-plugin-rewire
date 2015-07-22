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


const PROTOCOLS = [
  'http://',
  'https://',
  'ftp://'
];

const DEFAULT_PROTOCOL = 'http://';


var Mixins = require('./mixins.jsx');
var FormFieldMixin = Mixins.FormFieldMixin,
    InputMixin = Mixins.InputMixin,
    TextInputMixin = Mixins.TextInputMixin;


var TextInput = React.createClass({
  /*
    Simple text input. See comments for
    `TextInputMixin` for information about
    props and usage.
  */
  mixins: [TextInputMixin]
});


var EmailInput = React.createClass({
  /*
    Exactly the same as `TextInput` component
    except it only allows a valid email to
    be entered and submitted.
  */
  mixins: [TextInputMixin],
  baseIsValid: function(val) {
    if (!this.userHasChangedValue()) return true;
    return validateEmail(val);
  }
});


var URLInput = React.createClass({
  mixins: [TextInputMixin],
  baseIsValid: function(val) {
    if (!this.userHasChangedValue()) return true;
    return validateURL(val);
  },
  baseClean: function(val) {
    // Add default protocol if none is supplied by user
    var hasProtocol = false;
    PROTOCOLS.forEach((protocol)=>{
      if (_.startsWith(val, protocol)){
        hasProtocol = true;
      }
    });
    if (!hasProtocol) return DEFAULT_PROTOCOL + val;
    return val;
  }
});


var textAreaStyle = StyleSheet.create({
  textarea: {

  }
});


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
  render: function() {
    var taStyle = _.extend({}, textAreaStyle.textarea, this.props.style.textarea);
    var labelStyle = _.extend({}, textAreaStyle.label, this.props.style.label);
    if (this.props.height) taStyle.height = this.props.height;
    var error = !this.isValid() && this.userHasChangedValue();
    var classNames = cx("field", {error: error});
    return (
      <div className={classNames}>
        {this.getLabelEl(labelStyle)}
        <textarea
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
          style={taStyle}
          value={this.state.value} />
      </div>
    );
  }
});


var HiddenTextInput = React.createClass({
  /*
    Browsers often focus on first input in a form automatically.
    Sometimes, this auto focus is not desirable. This component
    can be placed at the top of a Form to prevent that behaviour.
  */
  render: function() {
    return <input type='text' style={{opacity: 0, height: 0, position: 'absolute'}}/>;
  }
});


module.exports = {
  TextInput: TextInput,
  TextArea: TextArea,
  HiddenTextInput: HiddenTextInput,
  EmailInput: EmailInput,
  URLInput: URLInput
};

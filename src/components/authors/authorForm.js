"use strict";

var React = require('react');
var Input = require('../common/textInput')

var AuthorForm = React.createClass({

  render: function() {
    return (
      <form>
        <h1>Manage Author</h1>
        <Input
          name="firstName"
          label="First Name"
          onChange={this.props.onChange}
          placeholder="First Name"
          value={this.props.firstName}
            />

        <Input
          name="lastName"
          label="Last Name"
          onChange={this.props.onChange}
          placeholder="Last Name"
          value={this.props.lastName}
            />

        <input type="submit" value="Save" className="btn btn-default" onClick={this.props.saveAuthor} />
      </form>
    );
  }
});

module.exports = AuthorForm;

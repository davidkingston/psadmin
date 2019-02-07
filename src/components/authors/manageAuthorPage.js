"use strict";

var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');

var ManageAuthorPage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('If you leave this page now, you\'ll lose any unsaved work.  Are you sure you want to leave?')) {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      author: {id: '', firstName: '', lastName: ''},
      errors: {},
      dirty: false
    };
  },

  setAuthorState: function(event) {
    var field = event.target.name;
    var value = event.target.value;
    console.log("field = " + field);
    console.log("value = " + value);
    this.state.author[field] = value;
    var dirty = value.length > 0;
    return this.setState({author: this.state.author, dirty: dirty});
  },

  authorFormIsValid: function() {
      var formIsValid = true;
      this.state.errors = {};

      if (this.state.author.firstName.length < 3) {
        this.state.errors.firstName = 'First name must be at least 3 characters.';
        formIsValid = false;
      }

      if (this.state.author.lastName.length < 3) {
        this.state.errors.lastName = 'Last name must be at least 3 characters.';
        formIsValid = false;
      }

      this.setState({errors: this.state.errors});
      return formIsValid;
  },

  saveAuthor: function(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    AuthorApi.saveAuthor(this.state.author);
    this.setState({dirty: true});
    toastr.success('Author saved.');
    this.transitionTo('authors');
  },

  render: function() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.setAuthorState}
        saveAuthor={this.saveAuthor}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageAuthorPage;

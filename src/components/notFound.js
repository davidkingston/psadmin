"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>Whoops!  This is not the page you're looking for.</p>
        <p><Link to="app">Back to Home</Link></p>
      </div>
    );
  }
});

module.exports = NotFoundPage;

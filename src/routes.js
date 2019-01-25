"use strict"

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')} />
    <Route name="authors" handler={require('./components/authors/authorPage')} /> //if no path is specified, it defaults to the name property
    <Route name="author" path="/author/:authorId" handler={require('./components/authors/manageAuthorPage')} />
    <Route name="addAuthor" path="/author" handler={require('./components/authors/manageAuthorPage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
    <NotFoundRoute handler={require('./components/notFound')} />
    <Redirect from="about-us" to="about" />  // for retired urls
    <Redirect from="awthurs" to="authors" />  // for commonly mispelled words
    <Redirect from="about/*" to="about" />  // wildcards
    <Redirect from="about*" to="about" />  // wildcards
  </Route>
);

module.exports = routes;

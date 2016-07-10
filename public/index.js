var React = require('react');
var App = require('./app/App');

React.render(
    <App view="login" url="http://localhost"/>,
    document.getElementById('container')
);

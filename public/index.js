var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./app/App');

ReactDOM.render(
    <App url="http://localhost:666"/>,
    document.getElementById('container')
);

var React = require('react');
var App = require('./app/App');

React.render(
    <App url="http://localhost:666" view="login"/>,
    document.getElementById('container')
);

var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppStateActions = require('./actions/AppState');
var AppStateStore = require('./stores/AppStateStore');
var UserAuth = require('./components/UserAuth');

/**
 * Retrieve the current data from store
 */
function getAppState() {
    return {
        url: AppStateStore.getUrl(),
        view: AppStateStore.getView()
    };
}

module.exports = React.createClass({
    propTypes: {
        view: ReactPropTypes.string.isRequired,
        url: ReactPropTypes.string.isRequired
    },

    componentDidMount: function() {
        AppStateStore.addChangeListener(this._onChange);
        console.log('props', this.props);
        AppStateActions.init(this.props);
    },

    componentWillUnmount: function() {
        AppStateStore.removeChangeListener(this._onChange);
    },

    render: function() {
        console.log('state', this.state);
        return (
            <div className="app">
                <UserAuth
                    onUsernameChange={this._onUsernameChange}
                    onPasswordChange={this._onPasswordChange}
                    onEmailChange={this._onEmailChange}
                />
            </div>
        );
    },

    _onUsernameChange: function(username) {
        AppStateActions.setUsername(username);
    },

    _onPasswordChange: function(password) {
        AppStateActions.setPassword(password);
    },

    _onEmailChange: function(email) {
        AppStateActions.setEmail(email);
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        console.log('OnChange');
        this.setState(getAppState());
    }
});

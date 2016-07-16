var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');
var Editor = require('../components/Editor');
var Grid = require('../components/Grid');
var UserAuth = require('../components/UserAuth');

var Content = React.createClass({

    propTypes: {
        user: ReactPropTypes.object,
        view: ReactPropTypes.string,
        onUsernameChange: ReactPropTypes.func,
        onPasswordChange: ReactPropTypes.func,
        onEmailChange: ReactPropTypes.func,
        onFirstNameChange: ReactPropTypes.func,
        onLastNameChange: ReactPropTypes.func,
        register: ReactPropTypes.func,
        login: ReactPropTypes.func,
        changeView: ReactPropTypes.func,
        loginBtnDisabled: ReactPropTypes.bool,
        registerBtnDisabled: ReactPropTypes.bool,
        fieldsDisabled: ReactPropTypes.bool
    },


    /**
     * @return {object}
     */
    render: function() {
        console.log('Content', this.props);
        var className = classnames("mdl-layout__header", {
            'hidden': (this.props.view == 'login' || this.props.view == 'registration')
        });
        var username = '';
        if (this.props.user.user) username = this.props.user.user.username;
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className={className}>
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">Code paste</span>
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only">
                            <a
                                className="mdl-navigation__link"
                                href="#paste"
                                key="new"
                                onClick={this._onNavigationLinkClick.bind(this, 'New')}>{'New'}
                            </a>
                            <a
                                className="mdl-navigation__link"
                                href="#pastes"
                                key="latest"
                                onClick={this._onNavigationLinkClick.bind(this, 'Pastes')}>{'Pastes'}
                            </a>
                            <a
                                className="mdl-navigation__link"
                                href="#logout"
                                key="logout"
                                onClick={this._onNavigationLinkClick.bind(this, 'Logout')}>{'Logout'}
                            </a>
                        </nav>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                        <span className="mdl-layout-title drawer-title">
                            {username}
                        </span>
                    <nav className="mdl-navigation">
                        <a
                            className="mdl-navigation__link"
                            href="#paste"
                            key="new"
                            onClick={this._onNavigationLinkClick.bind(this, 'New')}>{'New'}
                        </a>
                        <a
                            className="mdl-navigation__link"
                            href="#pastes"
                            key="latest"
                            onClick={this._onNavigationLinkClick.bind(this, 'Pastes')}>{'Pastes'}
                        </a>
                        <a
                            className="mdl-navigation__link"
                            href="#logout"
                            key="logout"
                            onClick={this._onNavigationLinkClick.bind(this, 'Logout')}>{'Logout'}
                        </a>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        {this._renderView()}
                    </div>
                </main>
            </div>
        )
    },

    /**
     * On navigation item click
     * @param label
     * @param e
     * @private
     */
    _onNavigationLinkClick: function(label, e) {
        e.preventDefault();
        this.props.onNavigationLinkClick(label);
    },

    _renderView: function() {
        var content;
        if (this.props.view == 'pastes') {
            content = <Grid />
        } else if (this.props.view == 'new') {
            content = <Editor />
        } else {
            content =
                <UserAuth
                    onUsernameChange={this.props.onUsernameChange}
                    onPasswordChange={this.props.onPasswordChange}
                    onEmailChange={this.props.onEmailChange}
                    onFirstNameChange={this.props.onFirstNameChange}
                    onLastNameChange={this.props.onLastNameChange}
                    register={this.props.register}
                    login={this.props.login}
                    view={this.props.view}
                    changeView={this.props.changeView}
                    loginBtnDisabled={this.props.loginBtnDisabled}
                    registerBtnDisabled={this.props.registerBtnDisabled}
                    user={this.props.user}
                    fieldsDisabled={this.props.fieldsDisabled}
                />
        }

        return content;
    }
});

module.exports = Content;

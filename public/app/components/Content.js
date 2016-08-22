var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');
var Editor = require('../components/Editor');
var Grid = require('../components/Grid');
var UserAuth = require('../components/UserAuth');
var Contacts = require('../components/Contacts');
var Icon = require('../components/common/Icon');

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
        fieldsDisabled: ReactPropTypes.bool,
        createNewPasteBtnDisabled: ReactPropTypes.bool,
        createNew: ReactPropTypes.func,
        viewedPaste: ReactPropTypes.object,
        cmOptions: ReactPropTypes.object,
        onTypeChecked: ReactPropTypes.func,
        onTitleChange: ReactPropTypes.func,
        title: ReactPropTypes.string,
        showToast: ReactPropTypes.func,
        onActionClick: ReactPropTypes.func,
        pastes: ReactPropTypes.array,
        search: ReactPropTypes.func,
        sort: ReactPropTypes.func,
        sortingOptions: ReactPropTypes.object,
        pagination: ReactPropTypes.object,
        paginate: ReactPropTypes.func,
        totalPastes: ReactPropTypes.number,
        onMessageTitleChange: ReactPropTypes.func,
        onMessageContentChange: ReactPropTypes.func,
        sendMessageBtnDisabled: ReactPropTypes.bool,
        sendMessage: ReactPropTypes.func,
        onNavigationLinkClick: ReactPropTypes.func
    },


    /**
     * @return {object}
     */
    render: function() {
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
                        {this._getItems(true)}
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                        <span className="mdl-layout-title drawer-title">
                            {username}
                        </span>
                    {this._getItems()}
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
     * Get items
     * @param largeScreenOnly
     * @returns {XML}
     * @private
     */
    _getItems: function(largeScreenOnly) {
        var className = 'mdl-navigation';
        if (largeScreenOnly) className += ' mdl-layout--large-screen-only';
        return (
            <nav className={className}>
                <span className="drawer-nav-item">
                    <Icon
                        wrapperClassName="drawer-nav-item-icon"
                        icon="add_circle"
                    />
                    <a
                        className={classnames("mdl-navigation__link", {selected: this.props.view == 'new'})}
                        href="#paste"
                        key="new"
                        onClick={this._onNavigationLinkClick.bind(this, 'New')}>{'New'}
                    </a>
                </span>
                <span className="drawer-nav-item">
                    <Icon
                        wrapperClassName="drawer-nav-item-icon"
                        icon="code"
                    />
                    <a
                        className={classnames("mdl-navigation__link", {selected: this.props.view == 'pastes'})}
                        href="#pastes"
                        key="latest"
                        onClick={this._onNavigationLinkClick.bind(this, 'Pastes')}>{'Pastes'}
                    </a>
                </span>
                <span className="drawer-nav-item">
                    <Icon
                        wrapperClassName="drawer-nav-item-icon"
                        icon="contact_mail"
                    />
                    <a
                        className={classnames("mdl-navigation__link", {selected: this.props.view == 'contacts'})}
                        href="#contacts"
                        key="contacts"
                        onClick={this._onNavigationLinkClick.bind(this, 'Contacts')}>{'Contacts'}
                    </a>
                </span>
                <span className="drawer-nav-item">
                    <Icon
                        wrapperClassName="drawer-nav-item-icon"
                        icon="exit_to_app"
                    />
                    <a
                        className="mdl-navigation__link"
                        href="#logout"
                        key="logout"
                        onClick={this._onNavigationLinkClick.bind(this, 'Logout')}>{'Logout'}
                    </a>
                </span>
            </nav>
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
        var editorHidden = true;
        var userAuthHidden = true;
        var contactsHidden = true;
        var gridHidden = true;
        var editorReadOnly = false;

        if (this.props.view == 'pastes') gridHidden = false;
        else if (this.props.view == 'new') editorHidden = false;
        else if (this.props.view == 'contacts') contactsHidden = false;
        else if (this.props.view == 'paste') {
            editorReadOnly = true;
            editorHidden = false;
        }
        else userAuthHidden = false;


        return (
            <span>
                <Editor
                    createNewPasteBtnDisabled={this.props.createNewPasteBtnDisabled}
                    createNew={this.props.createNew}
                    hidden={editorHidden}
                    readOnly={editorReadOnly}
                    viewedPaste={this.props.viewedPaste}
                    cmOptions={this.props.cmOptions}
                    onTypeChecked={this.props.onTypeChecked}
                    onTitleChange={this.props.onTitleChange}
                    title={this.props.title}
                    view={this.props.view}
                    showToast={this.props.showToast}
                />
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
                    hidden={userAuthHidden}
                />
                <Contacts
                    sendBtnDisabled={this.props.sendMessageBtnDisabled}
                    sendMessage={this.props.sendMessage}
                    onTitleChange={this.props.onMessageTitleChange}
                    onContentChange={this.props.onMessageContentChange}
                    hidden={contactsHidden}

                />
                <Grid
                    hidden={gridHidden}
                    onActionClick={this.props.onActionClick}
                    pastes={this.props.pastes}
                    search={this.props.search}
                    sort={this.props.sort}
                    sortingOptions={this.props.sortingOptions}
                    pagination={this.props.pagination}
                    paginate={this.props.paginate}
                    totalPastes={this.props.totalPastes}
                />
            </span>
        )
    }
});

module.exports = Content;

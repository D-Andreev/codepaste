var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Navigation = React.createClass({

    propTypes: {
        user: ReactPropTypes.object
    },


    /**
     * @return {object}
     */
    render: function() {
        var className = classnames('mdl-layout', 'mdl-js-layout', 'mdl-layout--fixed-header');
        return (
            <div className={className}>
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">Code paste</span>
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only">
                            {this._renderNavigationItems()}
                        </nav>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                        <span className="mdl-layout-title drawer-title">
                            {this.props.user.username}
                        </span>
                    <nav className="mdl-navigation">
                        {this._renderNavigationItems()}
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">CONTENT</div>
                </main>
            </div>
        )
    },

    /**
     * Render navigation items
     * @returns {XML}
     * @private
     */
    _renderNavigationItems: function() {
        var latestItem = this._renderNavigationLink('Latest');
        var newPasteItem = this._renderNavigationLink('New Paste');
        var logoutItem = this._renderNavigationLink('Logout');
        return (
            [
                {latestItem},
                {newPasteItem},
                {logoutItem}
            ]
        )
    },

    /**
     * Render navigation link
     * @param label
     * @returns {XML}
     * @private
     */
    _renderNavigationLink: function(label) {
        return (
            <a
                className="mdl-navigation__link"
                href="#"
                onClick={this._onNavigationLinkClick.bind(this, label)}>{label}
            </a>
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
    }
});

module.exports = Navigation;

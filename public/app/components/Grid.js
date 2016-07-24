var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');
var Table = require('./common/Grid');

var Grid = React.createClass({

    propTypes: {
        hidden: ReactPropTypes.bool,
        pastes: ReactPropTypes.object
    },


    /**
     * @return {object}
     */
    render: function() {
        var className = 'mdl-grid';
        if (this.props.hidden) className += ' hidden';
        return (
            <div className={className}>
                <div className="card mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title mdl-card--expand view-title-wrapper">
                        <h2 className="mdl-card__title-text view-title">Pastes</h2>
                    </div>
                    <div className="mdl-cell mdl-cell--12-col grid-wrapper">
                        <Table
                            onActionClick={this.props.onActionClick}
                            columns={[
                                {icon: 'account_circle', text: 'username'},
                                {icon: 'title', text: 'title'},
                                {icon: 'description', text: 'mode'},
                                {icon: 'code', text: 'code'},
                                {icon: 'date_range', text: 'created'}
                                ]}
                            rows={this.props.pastes}
                        />
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Grid;

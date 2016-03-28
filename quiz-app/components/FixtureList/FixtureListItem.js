import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import './FixtureList.scss';

class FixtureListItem extends Component {

    static propTypes = {
        header: PropTypes.string,
        data: PropTypes.object.isRequired
    };

    render() {
        const { teamHome, teamAway, time, tour, city, friends } = this.props.data;
        const headerClass = !this.props.header ? 'is-collapsed' : '';
        const title = `${teamHome.name} vs ${teamAway.name}`;
        const subTitle = `${time}. ${tour}, ${city}`;
        const badgeText = friends > 1 ? `+${friends} friends` :
            friends === 1 ? `+${friends} friend` : '';

        return (
            <li className="fixture-item">
                <div className={ "fixture-item-header " + headerClass }>
                    <h5>{ this.props.header }</h5>
                </div>
                <Link className="fixture-item-body" to="/quiz">
                    <div className="fixture-item-icons"></div>
                    <div className="fixture-item-content">
                        <h3 className="list-title">{ title }</h3>
                        <h5 className="list-meta">{ subTitle }</h5>
                        <div className="badge">{ badgeText }</div>
                    </div>
                    <div className="fixture-item-arrow"></div>
                </Link>
            </li>
        );
    }

}

export default FixtureListItem;

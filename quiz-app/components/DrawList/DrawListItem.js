import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Link from '../Link';
import './DrawList.scss';


function dateFormat(str) {
	const formatted = moment.utc(str).fromNow();
	const ended = formatted.indexOf('ago') > -1;
	const prefix = ended ? 'ended' : 'ends';
	return `${prefix} ${formatted}`;
}

class DrawListItem extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render() {
        const { drawId, endDate, prizeTitle, prizeImageUrl, completed } = this.props.data;
        const subTitle = dateFormat(endDate);
		const completedClass = (completed ? "completed" : "");

        return (
            <li className="draw-item">
                <Link className={"draw-item-body " + completedClass} to="./draw" state={{id: drawId}}>
                    <div className="draw-item-aside">
                        <div className="draw-item-image">
                            <img src={ prizeImageUrl } />
                        </div>
                    </div>
                    <div className="draw-item-content">
                        <h3 className="list-title">{ prizeTitle }</h3>
                        <h5 className="list-meta">{ subTitle }</h5>
                    </div>
                    <div className="list-item-arrow">
                        <img src={ require('../../static/images/arrow-right-grey.svg') } />
                    </div>
                </Link>
            </li>
        );
    }

}

export default DrawListItem;

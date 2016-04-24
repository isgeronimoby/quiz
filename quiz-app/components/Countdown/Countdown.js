import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import './Countdown.scss';

function parseDate(date) {
	const target = moment.utc(date);
	const diff = target.diff(moment());
	const duration = moment.duration(diff);
	return {
		days: duration.days(),
		hours: duration.hours(),
		minutes: duration.minutes(),
	};
}

class Countdown extends Component {

	static propTypes = {
		data: PropTypes.object.isRequied
	};

	render() {
		const { date } = this.props;
		const { days, hours, minutes } = parseDate(date);
		return (
			<div className="countdown">
				<div className="countdown-item">
					<div className="cd-panel days">{ days }</div>
					<div className="cd-label">Days</div>
					<div className="cd-separator"></div>
				</div>
				<div className="countdown-item">
					<div className="cd-panel hours">{ hours }</div>
					<div className="cd-label">Hours</div>
					<div className="cd-separator"></div>
				</div>
				<div className="countdown-item minutes">
					<div className="cd-panel minutes">{ minutes }</div>
					<div className="cd-label">Minutes</div>
					<div className="cd-separator"></div>
				</div>
			</div>
		);
	}
}

export default Countdown;

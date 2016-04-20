import React, { Component, PropTypes } from 'react';
import Section from './Section.js';
import './leader-board.scss'


class LeaderBoard extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	state = {
	};

	render() {
		const { data } = this.props;

		return (
			<div className="quiz">
				<Section title="TOP players">
					<div>TODO</div>
				</Section>
			</div>
		);
	}
}

export default LeaderBoard;

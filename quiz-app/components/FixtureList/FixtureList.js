import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import FixtureListItem from './FixtureListItem.js';
import './FixtureList.scss';


function sortFixturesByDate(a, b) {
	return new Date(b.startDate) - new Date(a.startDate);
}

class FixtureList extends Component {

	static propTypes = {
		list: PropTypes.array.isRequired
	};

	render() {
		const items = this.props.list
			.sort(sortFixturesByDate)
			.map((match) => {
				const { startDate } = match;
				const header = moment(startDate).format('D MMMM').toUpperCase();
				return {...match, header};
			})
			.map((match, i, array) => {
				const { header, ...others } = match;
				const { header: prevHeader } = array[i - 1] || {};
				const showHeader = !prevHeader || prevHeader !== header;
				const headerMaybe = showHeader ? header : null;

				return (
					<FixtureListItem key={'fixture-' + i} header={ headerMaybe } fixtureItem={ others }/>
				);
			});

		return (
			<ul className="fixture-list">
				{ items }
			</ul>
		);
	}

}

export default FixtureList;

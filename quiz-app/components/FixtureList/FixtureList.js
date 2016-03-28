import React, { Component, PropTypes } from 'react';
import FixtureListItem from './FixtureListItem.js';
import './FixtureList.scss';


function sortFixtures(a, b) {
	return 0; // TODO
}

class FixtureList extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired
	};

	render() {
		const items = this.props.items
			.sort(sortFixtures)
			.map((data) => {
				const { date, competition } = data;
				const header = `${date} - ${competition}`;

				return { ...data, header };
			})
			.map((data, idx, array) => {
				const { header, ...others } = data;
				const { header: prevHeader } = array[idx-1] || {};
				const showHeader = !prevHeader || prevHeader !== header;

				return (
					<FixtureListItem key={'fixture-' + idx} header={showHeader ? header: null} data={others}/>
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

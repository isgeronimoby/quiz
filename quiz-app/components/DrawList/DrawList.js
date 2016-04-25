import React, { Component, PropTypes } from 'react';
import DrawListItem from './DrawListItem.js';
import './DrawList.scss';


function sortItems(a, b) {
	return 0; // TODO - need?
}

class DrawList extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired
	};

	render() {
		const items = this.props.data
			.sort(sortItems)
			.map((data, i) => {
				return (
					<DrawListItem key={'draw-' + i} data={data}/>
				);
			});

		return (
			<ul className="draw-list">
				{ items }
			</ul>
		);
	}

}

export default DrawList;

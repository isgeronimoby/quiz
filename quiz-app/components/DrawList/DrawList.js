import React, { Component, PropTypes } from 'react';
import DrawListItem from './DrawListItem.js';
import './DrawList.scss';


class DrawList extends Component {

	static propTypes = {
		list: PropTypes.array.isRequired,
	};

	render() {
		const { list } = this.props;
		const items = list.map((data, i) => {
			return (
				<DrawListItem key={'draw-' + i} data={data} />
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

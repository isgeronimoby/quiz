import React, { Component, PropTypes } from 'react';
import DrawListItem from './DrawListItem.js';
import './DrawList.scss';


class DrawList extends Component {

	static propTypes = {
		list: PropTypes.array.isRequired,
		profile: PropTypes.object.isRequired,
	};

	render() {
		const { list, profile } = this.props;
		const items = list.map((data, i) => {
			return (
				<DrawListItem key={'draw-' + i} data={data} profile={profile}/>
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

import React, { Component, PropTypes } from 'react';
import withFetch from '../components/withFetch';
import DrawContainer from '../components/DrawContainer';
import data from '../components/DrawList/data.js';

const DELAY = 100;

async function fetch({ id }) {

	console.log('>>TODO: fetch /draw/[%s]', id);

	const item = data.find(({ drawId }) => drawId === id);

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(item), DELAY);
	});
}

class Draw extends Component {

	static title = 'TODO - change dinamically';

	static propTypes = {
		params: PropTypes.object.isRequired
	};

	render() {
		return (
			<DrawContainer {...this.props} />
		);
	}

}

export default withFetch(Draw, fetch);

import React, { Component, PropTypes } from 'react';
import withFetch from '../components/withFetch';
import DrawContainer from '../components/DrawContainer';
import data from '../components/DrawContainer/data.js';

const DELAY = 100;

async function fetch({ id }) {

	console.log('>>TODO: fetch /draw/[%s]', id);

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(data), DELAY);
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

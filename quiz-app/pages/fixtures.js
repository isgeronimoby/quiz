import React, { Component } from 'react';
import FixtureList from '../components/FixtureList';
import items from '../components/FixtureList/data.js';

class Fixtures extends Component {

	static title = 'Fixtures';

	render() {
		return (
			<FixtureList items={items} />
		);
	}
}

export default Fixtures;

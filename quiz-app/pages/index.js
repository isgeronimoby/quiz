import React, { Component } from 'react';
import Link from '../components/Link';

class Index extends Component {

	render() {
		return (
			<div style={{margin: '20px auto', textAlign: 'center'}}>
				<a href="/fixtures" onClick={Link.handleClick}>Fixtures</a>
			</div>
		);
	}
}

export default Index;

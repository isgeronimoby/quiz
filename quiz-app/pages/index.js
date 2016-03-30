import React, { Component } from 'react';
import Link from '../components/Link';

class Index extends Component {

	render() {
		return (
			<div style={{margin: '20px auto', textAlign: 'center'}}>
				<Link to="/fixtures">Fixtures</Link>
			</div>
		);
	}
}

export default Index;

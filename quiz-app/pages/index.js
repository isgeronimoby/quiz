import React, { Component } from 'react';
import Link from '../components/Link';

class Index extends Component {

	render() {
		return (
			<ul style={{margin: '20px auto', textAlign: 'center', fontSize: '2rem'}}>
				<li>
					<Link to="/fixtures">Fixtures</Link>
				</li>
				<li>
					<Link to="/quiz" state={{id: 1}}>Quiz 1 (1 step)</Link>
				</li>
				<li>
					<Link to="/quiz" state={{id: 2}}>Quiz 2 (2 steps)</Link>
				</li>
				<li>
					<Link to="/quiz" state={{id: 3}}>Quiz 3 (3 steps)</Link>
				</li>
			</ul>
		);
	}
}

export default Index;

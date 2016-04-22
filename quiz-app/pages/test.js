import React, { Component } from 'react';
import Link from '../components/Link';

class Test extends Component {

	static contextTypes = {
		toggleAuthPopup: React.PropTypes.func
	};

	static title = 'Test';

	render() {
		const { toggleAuthPopup } = this.context;

		return (
			<div>
				<ul style={{margin: '20px auto', textAlign: 'center', fontSize: '2rem'}}>
					<li>
						<Link to="./fixtures">Fixtures</Link>
					</li>
					<li>
						<Link to="./quiz" state={{id: 1}}>Quiz 1 (1 step)</Link>
					</li>
					<li >
						<a href="#" onClick={ () => toggleAuthPopup(true) }>Toggle Auth</a>
					</li>

				</ul>
			</div>
		);
	}
}

export default Test;

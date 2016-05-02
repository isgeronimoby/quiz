import React, { Component } from 'react';
import Link from '../components/Link';

class Test extends Component {

	static title = 'Test';

	static contextTypes = {
		openAuthPopup: React.PropTypes.func,
		openWelcomePopup: React.PropTypes.func,
	};

	render() {
		const onAuthPopupClick = () => this.context.openAuthPopup();
		const onWelcomePopupClick = () => this.context.openWelcomePopup();

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
						<a href="#" onClick={ onAuthPopupClick }>Toggle Auth</a>
					</li>
					<li >
						<a href="#" onClick={ onWelcomePopupClick }>Toggle Welcome</a>
					</li>
					<li>
						<Link to="./partners">Partners</Link>
					</li>
					<li>
						<Link to="./">Index</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default Test;

import React, { Component, PropTypes } from 'react';
import './BetSuccess.scss';

const SHOW_TIME = 3000;


class BetSuccess extends Component {

	static propTypes = {
		onDismiss: PropTypes.func.isRequired
	};

	componentDidMount() {
		setTimeout(() => this.props.onDismiss(), SHOW_TIME);
	}

	render() {
		const onClick = () => this.props.onDismiss();

		return (
			<div className="quiz-success" onClick={onClick}>
				<div className="icon-success">
					<img src={ require('../../static/images/icon-success.svg') }/>
				</div>

				<div className="success-subtitle">Accepted</div>
				<div className="success-text">Thank you</div>
			</div>
		);
	}
}

export default BetSuccess;

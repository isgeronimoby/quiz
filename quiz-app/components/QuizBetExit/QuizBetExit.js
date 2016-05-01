import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import './bet-exit.scss';


class QuizBetExit extends Component {

	static propTypes = {
	};

	render() {
		return (
			<div className="quiz-exit" >
				<div className="big-image">
					Amazing illustration here
				</div>

				<Link className="big-btn money-btn" to="./partners">
					SignUp to our betting partners<br/>
					<span className="btn-text-sm">and earn a lot of points</span>
				</Link>
				<div className="text-regular">earn 5 points for each pound you bet</div>

				<Link className="big-btn share-btn" to="./fixtures">
					Return to the other matches
				</Link>
			</div>
		);
	}
}

export default QuizBetExit;

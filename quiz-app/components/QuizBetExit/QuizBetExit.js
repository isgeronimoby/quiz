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

				<a className="big-btn money-btn" href="//google.com">
					Sign Up to our betting partner<br/>
					<span className="btn-text-sm">and earn +500 more points</span>
				</a>
				<div className="text-regular">earn 5 points for each pound you bet</div>

				<Link className="big-btn share-btn" to="./fixtures">
					Return to the other matches
				</Link>
			</div>
		);
	}
}

export default QuizBetExit;

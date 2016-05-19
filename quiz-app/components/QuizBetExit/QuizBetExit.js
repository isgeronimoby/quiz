import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import './QuizBetExit.scss';


class QuizBetExit extends Component {

	static propTypes = {
		nextDrawItem: PropTypes.object.isRequired
	};

	render() {
		const { drawId, prizeImageUrl } = this.props.nextDrawItem;

		return (
			<div className="quiz-exit">
				<Link className="big-image" to="./draw" state={ {drawId} }>
					<img src={ prizeImageUrl }/>
				</Link>

				<Link className="big-btn money-btn" to="./partners">
					SignUp to our betting partners<br/>
					<span className="btn-text-sm">and earn a +500 points</span>
				</Link>

				<Link className="big-btn share-btn" to="./fixtures">
					Return to the other matches
				</Link>
			</div>
		);
	}
}

export default QuizBetExit;

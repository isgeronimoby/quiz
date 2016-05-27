import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import './QuizBetExit.scss';


class QuizBetExit extends Component {

	static propTypes = {
		latestDrawItem: PropTypes.object.isRequired,
	};

	render() {
		const { prizeImageUrl } = this.props.latestDrawItem;

		return (
			<div className="quiz-exit">
				<div className="big-image-panel">
					<div className="big-image">
						<img src={ prizeImageUrl }/>
					</div>

					<Link className="big-btn money-btn" to="./partners">
						SignUp to our betting partner<br/>
						<span className="btn-text-sm">and win great prizes</span>
					</Link>
				</div>

				<Link className="big-btn share-btn" to="./fixtures">
					Return to the other matches
				</Link>
			</div>
		);
	}
}

export default QuizBetExit;

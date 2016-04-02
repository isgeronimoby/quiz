import React, { Component, PropTypes } from 'react';

class QuizItem extends Component {

	static propTypes = {

	};

	render() {
		return (
			<div className="quiz-content">
				<div className="quiz-info">23 March, 19:00, 3thd tour, London</div>
				
				
				<div className="teams-idle-wrapper">	
					<div className="team-idle">
						<div className="team-idle-content">?</div>
						<div className="team-name">Everton</div>
					</div>

					<div className="colon">:</div>
					
					<div className="team-idle disabled">
						<div className="team-idle-content">?</div>
						<div className="team-name">Manchester United</div>
					</div>
				</div>
				<div className="quiz-title">
					Select a score for Everton
				</div>

				<div className="score-choice">
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
					<div>5</div>
					<div>6</div>
					<div>7</div>
					<div>8</div>
					<div>9</div>
					<div>10</div>
				</div>

			</div>
		);
	}
}

export default QuizItem;
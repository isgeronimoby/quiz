import React, { Component, PropTypes } from 'react';
import QuizBet from '../QuizBet';
import QuizBetSuccess from '../QuizBetSuccess';
import QuizBetExit from '../QuizBetExit';
import '../QuizContainer/quiz.scss';


class QuizBetContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	state = {
		view: 'bet'
	};


	nextView(view) {
		this.setState({ view });
	}

	render() {
		const points = 220;
		const odds = [10, 1];
		const { view } = this.state;
		let View;
		if (view === 'bet') {
			View = <QuizBet points={points} odds={odds} onSubmit={() => this.nextView('success') }/>;
		}
		else if (view === 'success') {
			View = <QuizBetSuccess onDismiss={() => this.nextView('exit') }/>;
		}
		else if (view === 'exit') {
			View = <QuizBetExit />
		}

		return (
			<div className="quiz">
				{ View }
			</div>
		);
	}
}

export default QuizBetContainer;

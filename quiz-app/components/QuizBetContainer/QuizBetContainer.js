import React, { Component, PropTypes } from 'react';
import QuizBet from '../QuizBet';
import BetSuccess from '../BetSuccess';
import QuizBetExit from '../QuizBetExit';
import '../QuizContainer/quiz.scss';


class QuizBetContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	static contextTypes = {
		openAuthPopup: React.PropTypes.func
	};

	state = {
		view: 'bet'
	};

	nextView(view) {
		this.setState({ view });
	}

	submitBet(betValue) {
		this.context.openAuthPopup((result) => {
			result && this.nextView('success');
		});
	}


	render() {
		const points = 220;
		const odds = [10, 1];
		const { view } = this.state;
		let View;
		if (view === 'bet') {
			View = <QuizBet points={points} odds={odds} onSubmit={() => this.submitBet() }/>;
		}
		else if (view === 'success') {
			View = <BetSuccess onDismiss={() => this.nextView('exit') }/>;
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

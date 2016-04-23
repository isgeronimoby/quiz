import React, { Component, PropTypes } from 'react';
import DrawBet from '../DrawBet';
import QuizBetSuccess from '../QuizBetSuccess'; // TODO - rename
import QuizBetExit from '../QuizBetExit';
import '../QuizContainer/quiz.scss';


class DrawContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	static contextTypes = {
		toggleAuthPopup: React.PropTypes.func
	};

	state = {
		view: 'bet'
	};


	nextView(view) {
		this.setState({ view });
	}

	submitBet(betValue) {
		this.context.toggleAuthPopup(true, () => {
			this.nextView('success');
		});
	}


	render() {
		const points = 220;
		const odds = [10, 1];
		const { view } = this.state;
		let View;
		if (view === 'bet') {
			View = <DrawBet points={points} odds={odds} onSubmit={() => this.submitBet() }/>;
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

export default DrawContainer;

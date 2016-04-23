import React, { Component, PropTypes } from 'react';
import DrawBet from '../DrawBet';
import QuizBetSuccess from '../QuizBetSuccess'; // TODO - rename
import QuizBetExit from '../QuizBetExit';
import '../QuizContainer/quiz.scss';


class DrawContainer extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
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
		const { data } = this.props;
		const { view } = this.state;
		const onSubmit = () => this.submitBet();

		let View;
		if (view === 'bet') {
			View = <DrawBet points={points} data={data} onSubmit={onSubmit }/>;
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

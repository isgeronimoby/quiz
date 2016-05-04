import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestAuth } from '../../flux/actions';
import QuizBet from '../QuizBet';
import BetSuccess from '../BetSuccess';
import Location from '../../lib/Location';

import '../QuizContainer/quiz.scss';


class QuizBetContainer extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
		// from store
		isLoggedIn: PropTypes.bool.isRequired,
		openAuthPopup: PropTypes.func.isRequired,
	};

	state = {
		view: 'bet'
	};

	componentWillReceiveProps({isLoggedIn}) {
		const authorized = !this.props.isLoggedIn && isLoggedIn;
		if (authorized) {
			this.nextView('success');
		}
	}

	nextView(view) {
		this.setState({ view });
	}

	submitBet(betValue) {
		const { isLoggedIn, openAuthPopup } = this.props;
		if (!isLoggedIn) {
			openAuthPopup();
		} else {
			//TODO - post betValue & go next
		}
	}

	goToExitPage() {
		Location.push({
			pathname: './exit',
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
			View = <BetSuccess onDismiss={() => this.goToExitPage() }/>;
		}

		return (
			<div className="quiz">
				{ View }
			</div>
		);
	}
}


// Connect to store
//
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		openAuthPopup: () => dispatch(requestAuth()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizBetContainer);

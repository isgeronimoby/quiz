import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestAuth } from '../../flux/actions';
import DrawBet from '../DrawBet';
import BetSuccess from '../BetSuccess'; // TODO - rename
import DrawBetExit from '../DrawBetExit';
import '../Header/Header.scss';

const HeaderOverlay = ({ title }) => {
	return (
		<div className="header header-overlay">
			<div className="header-title">
				<h2>{ title }</h2>
			</div>
		</div>
	);
};

class DrawContainer extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
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
		this.setState({view});
	}

	submitBet(betValue) {
		const { isLoggedIn, openAuthPopup } = this.props;
		if (!isLoggedIn) {
			openAuthPopup();
		} else {
			//TODO - post betValue
		}
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
			View = <BetSuccess onDismiss={() => this.nextView('exit') }/>;
		}
		else if (view === 'exit') {
			View = <DrawBetExit />
		}

		return (
			<div className="screen">
				<HeaderOverlay title={ data.name }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer);

import React, { Component, PropTypes } from 'react';
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

export default DrawContainer;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleWelcome } from '../../flux/actions';
import ScreenSwiper from '../ScreenSwiper';
import './WelcomePopup.scss';


const WelcomeScreen = ({ figure, title, lines }) => {
	const linesStyled = lines.map((text, i) => {
		const opacity = .8 - .2 * i;
		return <p key={`p-${i}`} style={{ opacity }}>{ text }</p>;
	});

	return (
		<div className="welcome-content">
			<div className="welcome-figure">
				<img src={figure}/>
			</div>
			<div className="welcome-text">
				<h2 className="welcome-title">{ title }</h2>
				{ linesStyled }
			</div>
		</div>
	);
};


const WelcomeFooter = ({ stepIdx, onNext, onSkip }) => {
	const bullets = [0, 1, 2].map((i) => {
		const classActive = (i === stepIdx) ? 'active' : '';
		return (
			<li key={`bullet-${i}`} className={"bullet " + classActive}></li>
		);
	});
	const leftBtnStyle = (stepIdx === 2) ? {visibility: 'hidden'} : {};
	let rightBtn = (
		<div className="welcome-footer-link right" onClick={ onNext }>
			Next
			<img className="icon-next" src={ require('../../static/images/arrow-left-white.svg') }/>
		</div>
	);
	if (stepIdx === 2) {
		rightBtn = <div className="welcome-footer-link right" onClick={ onSkip }>Done</div>;
	}

	return (
		<div className="welcome-footer">
			<div className="welcome-footer-link left" style={ leftBtnStyle } onClick={ onSkip }>Skip</div>
			<ul className="welcome-bullets">
				{ bullets }
			</ul>
			{ rightBtn }
		</div>
	);
};


class WelcomePopup extends Component {

	static propTypes = {
		show: PropTypes.bool.isRequired,
		//from store
		onClose: PropTypes.func.isRequired,
	};

	state = {
		currentScreenIdx: 0,
	};

	nextScreen() {
		const { currentScreenIdx: idx } = this.state;
		const totalSteps = 3;
		if (idx + 1 < totalSteps) {
			this.setState({
				currentScreenIdx: idx + 1
			})
		}
	}

	prevScreen() {
		const { currentScreenIdx: idx } = this.state;
		if (idx > 0) {
			this.setState({
				currentScreenIdx: idx - 1
			});
		}
	}

	render() {
		const { show, onClose } = this.props;
		const { currentScreenIdx: idx } = this.state;
		const hiddenClass = !show ? 'is-hidden' : '';
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();
		const onSkip = () => onClose();

		return (
			<div className={"popup-screen welcome-screen " + hiddenClass }>
				<div className="popup welcome-popup">
					<ScreenSwiper currentScreenIdx={ idx } onPrevScreen={onPrev} onNextScreen={onNext}>
						<WelcomeScreen figure={ require('./images/fig-play.svg') } title="Play games"
							lines={ ['predict scores', 'beat your mates', 'rank highest in Leaderboards'] }/>
						<WelcomeScreen figure={ require('./images/fig-earn.svg') } title="Earn points"
							lines={ ['predicting match outcomes', 'downloading apps', 'sharing & more'] }/>
						<WelcomeScreen figure={ require('./images/fig-win.svg') } title="Win prizes"
							lines={ ['exclusive merchandise', 'money can’t buy experiences'] }/>
					</ScreenSwiper>

					<WelcomeFooter stepIdx={ idx } onNext={ onNext } onSkip={ onSkip }/>
				</div>
			</div>
		);
	}
}

// Connect to store
//
const mapDispatchToProps = (dispatch) => {
	return {
		onClose: () => dispatch(toggleWelcome(false)),
	};
};

export default connect(null, mapDispatchToProps)(WelcomePopup);

import React, { Component, PropTypes } from 'react';
import ScreenSwiper from '../ScreenSwiper';
import './WelcomePopup.scss';


const WelcomeScreen = ({ icon, title, text }) => {
	return (
		<div className="welcome-content">
			<div className="welcome-icon"></div>
			<h2 className="welcome-title">{ title }</h2>
			<div className="welcome-text">{ text }</div>
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
		const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
			"am vulputate faucibus luctus. Nulla scelerisque lectus at faucibus vestibulum.";
		const onPrev = () => this.prevScreen();
		const onNext = () => this.nextScreen();
		const onSkip = () => onClose();

		return (
			<div className={"popup-screen welcome-screen " + hiddenClass }>
				<div className="popup welcome-popup">
					<ScreenSwiper currentScreenIdx={ idx } onPrevScreen={onPrev} onNextScreen={onNext}>
						<WelcomeScreen icon="" title="Play games" text={ text }/>
						<WelcomeScreen icon="" title="Earn points" text={ text }/>
						<WelcomeScreen icon="" title="Win prizes" text={ text }/>
					</ScreenSwiper>

					<WelcomeFooter stepIdx={ idx } onNext={ onNext } onSkip={ onSkip }/>
				</div>
			</div>
		);
	}
}

export default WelcomePopup;

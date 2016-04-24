import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import { SharingPopup } from '../Popup';
import './DrawBetExit.scss';


const SocialLink = ({name, disabled, onClick, children}) => {
	const classDisabled = disabled ? 'disabled' : '';
	const onClickMaybe = () => (!disabled && onClick(name));

	return (
		<div className={ `social-link ${name} ${classDisabled}` } onClick={ onClickMaybe }>
			<img src={ require(`./images/icon-${name}.svg`) } alt="facebook"/>
			{ children }
		</div>
	)
};


class DrawBetExit extends Component {

	static propTypes = {
	};

	state = {
		facebook: false,
		twitter: false,
	};

	handleClick(name) {
		if (!this.state[name]) {
			this.showPopup();
		}

		this.setState({
			[name]: true
		});
	}

	showPopup() {
		this.refs['sharing-popup'].show(3000);
	}

	render() {
		const { facebook, twitter} = this.state;
		const onClick = this.handleClick.bind(this);


		return (
			<div className="draw-exit" >
				<SharingPopup ref="sharing-popup" />

				<div className="big-image">
					Amazing illustration here
				</div>

				<SocialLink name="facebook" disabled={facebook} onClick={ onClick }>
					Share & get + 10 pts
				</SocialLink>

				<SocialLink name="twitter" disabled={twitter} onClick={ onClick }>
					Tweet & get + 10 pts
				</SocialLink>

				<Link className="big-btn share-btn" to="./draws">
					Earn more points
				</Link>
			</div>
		);
	}
}

export default DrawBetExit;

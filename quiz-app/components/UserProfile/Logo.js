import React, { Component, PropTypes } from 'react';


class Logo extends Component {

	static propTypes = {
		src: PropTypes.string,
		rank: PropTypes.number
	};

	render() {
		const { src, rank } = this.props;
		const defaultPicture = require("../../static/images/user-default.png");
		let medalImg;
		if (rank) {
			const medal = ['gold', 'silver', 'bronze'][rank - 1];
			const medalSrc = require(`../../static/images/rank-${medal}.png`);
			medalImg = <img className="user-medal" src={medalSrc} alt="User rank"/>;
		}
		return (
			<div className="user-logo-cont">
				<img className="user-logo" src={src || defaultPicture} alt="User logo"/>
				{ medalImg }
			</div>
		);
	}
}

export default Logo;

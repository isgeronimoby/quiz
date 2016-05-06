import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import SectionCollapsible from '../SectionCollapsible';
import './PartnersContainer.scss';


const HeaderOverlay = ({ title }) => {
	return (
		<div className="header header-overlay">
			<div className="header-title with-btn">
				<h2>{ title }</h2>
			</div>
			<Link className="nav-button" goBack={true}>
				<img src={ require('../../static/images/arrow-left-white.svg') } alt="Back"/> Back
			</Link>
		</div>
	);
};


const PartnerSection = ({ partner }) => {
	const { picture, name, text, signupLink, privacyLink, facebookLink, mailtoLink, smsLink } = partner;
	let headerContent = name;
	if (picture) {
		headerContent = <img className="partner-img" src={ picture }/>;
	}


	return (
		<div className="partner-section">
			<div className="partner-title">
				{ headerContent }
			</div>

			<a className="big-btn money-btn" href={ signupLink } target="_blank">
				SignUp & get +10000 points<br/>
				<span className="btn-text-sm">get +10 points for each pound you bet</span>
			</a>

			<h3 className="invite-text">Invite a friend and get +50000pts</h3>

			<SectionCollapsible>
				<div className="partner-text">{ text }</div>
				<a className="partner-privacy-link link-normal" href={ privacyLink }>Privacy Policy</a>

				{/*
				 <div className="partner-share-links">
				 <a className="share-link link-facebook" href={ facebookLink }>
				 <img src={ require('./images/icon-facebook.svg') } />
				 Facebook
				 </a>
				 <a className="share-link link-email" href={ mailtoLink }>
				 <img src={ require('./images/icon-email.svg') } />
				 Email
				 </a>
				 <a className="share-link link-sms" href={ smsLink }>
				 <img src={ require('./images/icon-sms.svg') } />
				 SMS
				 </a>
				 </div>
				*/}
			</SectionCollapsible>
		</div>
	);
};


class PartnersContainer extends Component {

	static propTypes = {
		partnersList: PropTypes.array.isRequired,
	};

	state = {};

	render() {
		const { partnersList } = this.props;
		const partnerSections = partnersList.map((partner, i) => {
			return <PartnerSection key={ `partner-${i}` } partner={ partner }/>
		});

		return (
			<div className="partners">
				<HeaderOverlay title="Betting partner"/>
				{ partnerSections }
			</div>
		);
	}
}

export default PartnersContainer;

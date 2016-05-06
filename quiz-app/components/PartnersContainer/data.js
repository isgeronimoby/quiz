const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
	' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const mailto = 'mailto:?to=&subject=some%20subject&body=some%20body';
const sms = 'sms:';

const partners = [
	{
		partnerId: 1,
		name: 'Coral',
		picture: require("../../static/images/partner-picture.png"),
		text: text,
		signupLink: '//affiliate.coral.co.uk/processing/clickthrgh.asp?btag=a_20912b_2',
		privacyLink: '//google.com',
		facebookLink: '//facebook.com',
		mailtoLink: mailto,
		smsLink: sms,
	},
	{
		partnerId: 2,
		name: 'Sky bet',
		picture: null,
		text: text,
		signupLink: 'http://affiliatehub.skybet.com/processing/clickthrgh.asp?btag=a_19010b_2',
		privacyLink: '//google.com',
		facebookLink: '//facebook.com',
		mailtoLink: mailto,
		smsLink: sms,
	}
];


export default partners;

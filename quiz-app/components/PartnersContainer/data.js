const text = (name) => `Get £20 in free bets when you join ${name} today.
 Simply register your account and get your £20 in free bets instantly!
 You can get £20 in Free Bets if you haven't held an account before!`;
const mailto = 'mailto:?to=&subject=some%20subject&body=some%20body';
const sms = 'sms:';

const partners = [
	{
		partnerId: 1,
		name: 'Coral',
		picture: require("../../static/images/partner-picture.png"),
		text: text('Coral'),
		signupLink: '//affiliate.coral.co.uk/processing/clickthrgh.asp?btag=a_20912b_11330',
		privacyLink: '//coral-eng.custhelp.com/app/answers/detail/a_id/2132/~/privacy-policy',
		facebookLink: '//facebook.com',
		mailtoLink: mailto,
		smsLink: sms,
	},
	/*{
		partnerId: 2,
		name: 'Sky bet',
		picture: require("../../static/images/partner-picture2.png"),
		text: text('Sky Bet'),
		signupLink: 'http://affiliatehub.skybet.com/processing/clickthrgh.asp?btag=a_19010b_2',
		privacyLink: '//support.skybet.com/app/answers/detail/a_id/143/~/privacy-and-cookies-notice',
		facebookLink: '//facebook.com',
		mailtoLink: mailto,
		smsLink: sms,
	}*/
];


export default partners;

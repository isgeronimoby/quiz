const text = () => `Loyalty Rewarded will progressively launch interactive games and other activities which will enable users to earn points through a variety of actions. These actions include sharing, signing up, downloading or otherwise engaging with the relevant parts of the games. It will be made clear to users how to earn points, how many points will be earned and when those points will be credited to the user’s account on the Loyalty Rewarded websites and those of our partners.

Once credited to the user’s account, these points can be used in several ways. Currently, these include:

 Using of points to enter draws which have exclusive, often unique, prizes for the winners. All draws are drawn randomly and every entry will require an identical number of points. The more points used to enter a draw, the more chances the user has to win.

 Using of points to play “predictor” style games provided by Loyalty Rewarded. These games may often be provided to users in partnership with third parties. These games will offer the chance to multiply a user’s points by successfully playing the “predictor” style game.

Points earned by users through all games carry no financial value whatsoever and can only be used or exchanged via the routes described in these terms and conditions and/or made available, from time to time, by Loyalty Rewarded and its partners.

Corals “£5 get £20 in free bets” promotion. Users who sign up for this promotion and subsequently go on to pace a bet of £5 or more, in accordance with the terms of the promotion, will be credited with 500 additional loyalty points. These points will be credited to the user’s account as soon as possible once qualification for the promotional offer has been confirmed. This offer closes at midnight on 22nd May 2016.

Loyalty Rewarded reserves the right to alter the value of points with respect to points required for draw entries or game participation at any point at its absolute discretion.

Bet 5 Get 20 T&Cs

1. Offer available to UK & Republic of Ireland residents aged 18 years or over opening a new Online, Mobile or Telephone Coral account in either £/€ currency.

2. To qualify for this bet £/€5 get £/€20 in free bets offer, the first bet on your account after registration must be a real money sports bet of £/€5 Win or £/€5 Each-way or more at fractional odds of 1/2 (decimal odds 1.5) or greater.

3. The 4 x £5 free bets will be triggered by the placement of the qualifying bet and will not apply to subsequent bets. Void bets do not count towards this promotion.

4. The qualifying bet must be made within 14 days of account registration to qualify. First sports bets placed after this duration will not qualify for this bet £5 get £20 in free bets offer.

5. Free bet token will expire 7 days after issue.

6. The free bet must be wagered in full, can be redeemed on win or each-way bets and can be used on the following listed bet types: single, double, treble, 4-fold and upwards accumulator, forecast, combination.

7. Qualifying Bet and free bets cannot be used with Cash Out.

8. Free bet token is not valid on Football Jackpot, tote, other combination and multiple bets (i.e Lucky 15s).

9. Free bet tokens are non-refundable. Free bet stake is not included in any returns.

10. Free bet tokens are not returned if wagered on a void selection.

11. This free bet offer cannot be used in conjunction with, or contribute to any other coral.co.uk free bet offer or promotions.

12. For additional promotional terms click here.

13. Promoter: Coral Interactive (Gibraltar) Limited, Suite 711, 1st Floor, Europort, Europort Road, Gibraltar, GX11 1AA.

`.replace(/\n/g, '<br/>');

const mailto = 'mailto:?to=&subject=some%20subject&body=some%20body';
const sms = 'sms:';

const partners = [
	{
		partnerId: 1,
		name: 'Coral',
		picture: require("../../static/images/partner-picture.png"),
		text: text(),
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

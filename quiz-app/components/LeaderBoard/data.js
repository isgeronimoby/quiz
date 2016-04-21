const top3 = [
	{
		name: 'John Millson',
		answers: '1200',
		picture: require("../../static/images/user-picture.jpg"),
		rank: 1
	},
	{
		name: 'Henry Smith',
		answers: '5123',
		picture: null,
		rank: 2
	},
	{
		name: 'Andy rocket',
		answers: '6700',
		picture: null,
		rank: 3
	}
];

const rest = [
	{
		name: 'John Millson Jr',
		answers: '1200',
		picture: require("../../static/images/user-picture.jpg"),
	},
	{
		name: 'Henry Smith Jr',
		answers: '5123',
		picture: null,
	},
	{
		name: 'Andy rocket Jr',
		answers: '1200',
		picture: null,
	}
];

export default {
	top3: top3,
	rest: rest.concat(rest, rest, rest).map((u, i) => ({
		...u,
		rank: 55 + i,
		myself: i === 1
	}))
};

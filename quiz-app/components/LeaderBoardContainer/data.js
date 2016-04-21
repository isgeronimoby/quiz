const top3 = [
	{
		name: 'John Millson',
		answers: '1200',
		picture: require("../../static/images/user-picture.jpg"),
		points: 100,
		rank: 1
	},
	{
		name: 'Henry Smith',
		answers: '5123',
		picture: null,
		points: 10,
		rank: 2
	},
	{
		name: 'Andy rocket',
		answers: '6700',
		picture: null,
		points: 1000,
		rank: 3
	}
];

const rest = [
	{
		name: 'John Millson Jr',
		answers: '1200',
		picture: require("../../static/images/user-picture.jpg"),
		points: 99,
	},
	{
		name: 'Henry Smith Jr',
		answers: '5123',
		picture: null,
		points: 999,
	},
	{
		name: 'Andy rocket Jr',
		answers: '1200',
		picture: null,
		points: 9999,
	}
];

export default {
	top3: top3,
	rest: rest.concat(rest, rest, rest).map((u, i) => ({
		...u,
		rank: 55 + i,
		myself: i === 1,
		points: (i === 1 ? 220 : u.points)
	}))
};

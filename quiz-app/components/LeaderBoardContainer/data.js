const users = [
	{
		name: 'John Millson',
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
		name: 'Andy rocket',
		answers: '1200',
		picture: null,
		points: 9999,
	}
];

const groups = [
	{
		name: 'Everton Fan Club',
		members: 210,
		picture: require("../../static/images/group-picture.jpg"),
	},
	{
		name: 'My Own Group',
		members: 10,
		picture: require("../../static/images/group-picture2.jpg"),
		isMine: true,
	},
	{
		name: 'Ireland Group',
		members: 2100,
		picture: null,
	}
];

export default {
	users: {
		top3: users.slice(0, 3).map((u, i) => ({
			...u,
			rank: i + 1,
		})),
		all: users.concat(users, users, users).map((u, i) => ({
			...u,
			rank: 55 + i,
		})),
		friends: users.map((u, i) => ({
			...u,
			rank: Math.floor(Math.random() * 100),
		}))
	},

	groups: {
		top3: groups.slice(0, 3).map((g, i) => ({
			...g,
			rank: i + 1,
		})),
		all: groups.concat(groups, groups).map((g, i) => ({
			...g,
			rank: 9 + i,
		})),
	},

	profile: {
		rank: 56,
		points: 220,
	},
};

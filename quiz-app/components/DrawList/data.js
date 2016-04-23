const data = [
    {
		drawId: 1,
        endDateTime: '2016-05-10T03:25:00',
        name: 'Everton Home Shirt',
		picture: './images/t-shirt.png',
		friends: 10,
		bet: 20,
        completed: false
    },
    {
		drawId: 1,
		endDateTime: '2016-04-23T03:25:00',
		name: 'Everton Home Infant Kit',
		picture: './images/t-shirt2.png',
		friends: 10,
		bet: 20,
		completed: true
    },
    {
		drawId: 1,
		endDateTime: '2016-04-28T03:25:00',
		name: 'Everton Home Kit',
		picture: './images/t-shirt3.png',
		friends: 10,
		bet: 20,
		completed: false
    }
];

export default data.concat(data, data, data, data, data)
	.map((it, i) => ({
		...it,
		drawId: i + 1 // unique id
	}));

import React, { Component } from 'react';
import Link from '../components/Link';
import Location from '../lib/Location';
import withFetch from '../components/withFetch';
import items from '../components/FixtureList/data.js';

const DELAY = 3000;


async function fetch() {

	console.log('>>TODO: fetch /fixtures');

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(items),  DELAY);
	});
}

class Index extends Component {

	componentDidMount() {
		this.visitFirstQuiz();
	}

	visitFirstQuiz() {
		const [{ quizId }] = this.props.data;
		Location.pushState({id: quizId}, './quiz');
	}

	render() {
		return (
			<div>
				{/*<ul style={{margin: '20px auto', textAlign: 'center', fontSize: '2rem'}}>
				 <li>
				 <Link to="./fixtures">Fixtures</Link>
				 </li>
				 <li>
				 <Link to="./quiz" state={{id: 1}}>Quiz 1 (1 step)</Link>
				 </li>
				 <li>
				 <Link to="./quiz" state={{id: 2}}>Quiz 2 (2 steps)</Link>
				 </li>
				 <li>
				 <Link to="./quiz" state={{id: 3}}>Quiz 3 (3 steps)</Link>
				 </li>
				 </ul>*/}
			</div>
		);
	}
}

export default withFetch(Index, fetch, true);

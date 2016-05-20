import React, { Component, PropTypes } from 'react';
import withFetch from '../components/withFetch';
import QuizBetContainer from '../components/QuizBetContainer';


class Bet extends Component {

	static title = 'Score Predictor';

	static propTypes = {
		params: PropTypes.object.isRequired
	};

	render() {
		return (
			<QuizBetContainer params={ this.props.params } />
		);
	}

}

export default Bet;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../flux/actions';
import Location from '../lib/Location';

const DELAY = 3000;


class Index extends Component {

	static title = 'Match Quiz';

	static PropTypes = {
		// from store
		fetchProfile: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.fetchProfile()
			.then(() => this.visitFirstQuiz())
			.catch(() => this.visitFirstQuiz());
	}

	visitFirstQuiz() {
		//const [{ quizId }] = this.props.data; // TODO: first quiz's id
		const quizId = 1;

		setTimeout(() => {
			Location.push({
				pathname: './quiz',
				state: {id: quizId}
			});
		},  DELAY);
	}

	render() {
		return (
			<div className="preloader">
				<div className="loader-image"></div>
			</div>
		);
	}
}

// Connect to store
//
const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: () => dispatch(fetchProfile())
	};
};

export default connect(null, mapDispatchToProps)(Index);


import React, { Component, PropTypes } from 'react';
import './score.scss';


class QuizScoreControls extends Component {

	static propTypes = {
		info: PropTypes.string.isRequired,
		teams: PropTypes.array.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};

	state = {
		currentTeam: this.props.teams[0],
		scores: {}
	};

	selectTeam(team) {
		this.setState({
			currentTeam: team
		});
	}

	selectScore(num) {
		const { teams, onSubmit } = this.props;

		this.setState({
			scores: {
				...this.state.scores,
				[this.state.currentTeam]: num
			}
		}, () => {
			const {scores, currentTeam} = this.state;
			const nextTeam = teams.reduce((acc, name) => {
				return scores[name] === undefined ? name : acc;
			}, currentTeam);

			this.setState({
				currentTeam: nextTeam, // auto-switch to non-scored one
			}, () => {
				const {scores} = this.state;
				const complete = Object.keys(scores).length === 2;

				if (complete) {
					onSubmit(scores);
				}
			});
		});
	}

	render() {
		const { info, teams } = this.props;
		const { currentTeam } = this.state;
		const title = <span>Select a score<br/>for {currentTeam}</span>;
		const [ teamBtn1, teamBtn2 ] = teams.map((name, i) => {
			const score = this.state.scores[name];
			const scoreLabel = (score === undefined) ? '?' : score;
			const touchedClass = (name === currentTeam) ? 'touched' : '';
			const selectedClass = (score !== undefined) ? 'selected' : '';
			const classes = [touchedClass, selectedClass].join(' ');
			const onClick = () => this.selectTeam(name);

			return (
				<div key={`team-btn-${i}`} className={'team-idle ' + classes } onClick={ onClick }>
					<div className="team-idle-content">{ scoreLabel }</div>
					<div className="team-name">{ name }</div>
				</div>
			);
		});
		const scoreBtns = [...Array(10).keys()].map(i => {
			return (
				<div key={`btn-${i}`} className="score-btn" onClick={() => this.selectScore(i)}>{ i }</div>
			);
		});

		return (
			<div className="quiz-controls">
				<div className="quiz-info">{ info }</div>

				<div className="teams-idle-wrapper">
					{ teamBtn1 }
					<div className="colon">:</div>
					{ teamBtn2 }
				</div>

				<div className="quiz-title">{ title }</div>

				<div className="score-choice">
					{ scoreBtns }
				</div>
			</div>
		);
	}
}

export default QuizScoreControls;

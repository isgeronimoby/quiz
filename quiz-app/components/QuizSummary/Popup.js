import React, { Component, PropTypes } from 'react';
import './summary.scss';

class Popup extends Component {

	static propTypes = {
		autoHide: PropTypes.number
	};

	timeout = null;

	state = {
		show: false
	};

	show(autoHide) {
		this.setState({ show: true}, () => {
			if (autoHide) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => this.hide(), autoHide);
			}
		})
	}

	hide() {
		this.setState({ show: false });
	}

	render() {
		const { children, className, ...rest } = this.props;
		const { show } = this.state;
		const classes = ['popup', className, ...(show ? ['visible'] : [])].join(' ');
		return (
			<div className={ classes } {...rest}>{ children }</div>
		);
	}
}

export default Popup;

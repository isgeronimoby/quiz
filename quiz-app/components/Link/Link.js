import React, { Component, PropTypes } from 'react';
import './Link.scss';
import Location from '../../lib/Location';


function isLeftClickEvent(event) {
	return event.button === 0;
}

function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {

	static propTypes = {
		to: PropTypes.string.isRequired,
		children: PropTypes.any.isRequired,
		state: PropTypes.object,
		onClick: PropTypes.func,
	};

	static handleClick = event => {
		let allowTransition = true;
		let clickResult;

		if (this.props && this.props.onClick) {
			clickResult = this.props.onClick(event);
		}

		if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
			return;
		}

		if (clickResult === false || event.defaultPrevented === true) {
			allowTransition = false;
		}

		event.preventDefault();

		if (allowTransition) {
			const link = event.currentTarget;
			const state = this.props && this.props.state || null;
			const path = this.props && this.props.to || (link.pathname + link.search);

			Location.pushState(state, path);
		}
	};

	render() {
		const { to, children, ...props } = this.props;
		const href = '.' + to; // relative path!
		
		return <a href={href} onClick={Link.handleClick.bind(this)} {...props}>{children}</a>;
	}

}

export default Link;

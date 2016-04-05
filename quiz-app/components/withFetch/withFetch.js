import React, { Component, PropTypes } from 'react';
import '../utils.scss';

function withFetch(ComposedComponent, fetch) {
	return class WithFetch extends Component {

		static title = ComposedComponent.title;

		state = {
			data: {},
			loading: true,
			error: false, // TODO
		};

		async componentDidMount() {
			fetch(this.props.params).then((data) => {
				this.setState({
					data,
					loading: false
				})
			});
		}

		render() {
			if (this.state.loading) {
				return <div className="text-dark">Loading...</div>;
			}
			return <ComposedComponent ref="composed" {...this.props} data={this.state.data}/>;
		}
	}
}

export default withFetch;

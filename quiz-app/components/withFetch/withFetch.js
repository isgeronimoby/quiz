import React, { Component, PropTypes } from 'react';

function withFetch (ComposedComponent, fetch) {
	return class WithFetch extends Component {

		state = {
			data: {},
			loading: true,
			error: false, // TODO
		};

		async componentDidMount() {
			fetch().then((data) => {
				this.setState({
					data,
					loading: false
				})
			});
		}

		render() {
			if (this.state.loading) {
				return <div>Loading...</div>;
			}
			return <ComposedComponent {...this.props} data={this.state.data}/>;
		}

	}
}

export default withFetch;

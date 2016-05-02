import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPartnersIfNeeded } from '../flux/actions';
import PartnersContainer from '../components/PartnersContainer';


class Partners extends Component {

	static title = ' '; // set in overlay

	static propTypes = {
		// from store
		fetchPartners: PropTypes.func.isRequired,
		partners: PropTypes.object.isRequired,
	};

	componentDidMount() {
		this.props.fetchPartners();
	}

	render() {
		const { partners: { isFetching, payload } } = this.props;

		if (isFetching) {
			return <div/>; // TODO: spinner
		}
		return <PartnersContainer partnersList={ payload }/>;
	}
}

// Connect to store
//
const mapStateToProps = (state) => {
	return {
		partners: state.partners
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPartners: () => dispatch(fetchPartnersIfNeeded())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Partners);

import { connect } from 'react-redux';
import Header from './Header';


const mapStateToProps = (state) => {
	return {
		points: state.profile.points
	};
};

const HeaderSmart = connect(
	mapStateToProps
)(Header);

export default HeaderSmart;

import { connect } from "react-redux";
import Home from "./home";

const mapStateToProps = (state, ownProps) => {
    return {
        // map friends and direct messages here
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

const mapStateToProps = (state) => {
  return {
    displayName: state.userStatus.displayName,
  };
};

export default connect(mapStateToProps)(withRouter(Dashboard));

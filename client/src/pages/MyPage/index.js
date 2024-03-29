import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyPage from "./MyPage";
import {
  getAuthorEdit,
  updateAuthor,
  updateAuthorImage,
} from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpload: (file) => {
      dispatch(updateAuthorImage(file));
    },
    handleGetAuthorEdit: () => {
      dispatch(getAuthorEdit());
    },
    handleUpdateAuthor: (payload) => {
      dispatch(updateAuthor(payload));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.getAuthorEdit.success,
    loading: state.getAuthorEdit.loading,
    author: state.getAuthorEdit.author,
    error: state.getAuthorEdit.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyPage));

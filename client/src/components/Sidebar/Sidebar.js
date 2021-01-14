import { Drawer, List, ListItem } from "@material-ui/core";

import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { categories } from "../../utils/categories";
import { connect } from "react-redux";
import {
  getExplorePageCoursesByCategory,
  getExplorePageCourses,
} from "../../pages/Explore/redux/actions";
import PropTypes from "prop-types";

function Sidebar({
  exploreRoute,
  handleGetExplorePageCoursesByCategory,
  handleGetExplorePageCourses,
  categoryName,
}) {
  const handleCategoryClick = (e) => {
    handleGetExplorePageCoursesByCategory(e.target.innerText);
  };

  return (
    <Drawer variant='permanent' anchor='left' className='sidebar-container'>
      <div className='sidebar'>
        {exploreRoute && (
          <Fragment>
            <List>
              <Link to='/explore' onClick={handleGetExplorePageCourses}>
                <ListItem button>All Categories</ListItem>
              </Link>

              {categories.map((category) => (
                <ListItem
                  button
                  key={category.id}
                  onClick={handleCategoryClick}>
                  {category.value}
                </ListItem>
              ))}
            </List>
          </Fragment>
        )}
      </div>
    </Drawer>
  );
}

Sidebar.propType = {
  categoryName: PropTypes.string.isRequired,
  handleGetExplorePageCoursesByCategory: PropTypes.func.isRequired,
  handleGetExplorePageCourses: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleGetExplorePageCourses: () => {
      dispatch(getExplorePageCourses());
    },
    handleGetExplorePageCoursesByCategory: (category) => {
      dispatch(getExplorePageCoursesByCategory(category));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    categoryName: state.getExplorePageCourses.category,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

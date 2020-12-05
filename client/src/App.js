import "./App.scss";
import { Switch, Route, withRouter, useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "./components/Header/Header";
import Courses from "./pages/Courses/Courses";
import Explore from "./pages/Explore/Explore";
import EditCourse from "./pages/EditCourse/EditCourse";
import EditLecture from "./pages/EditLecture/EditLecture";
import Course from "./pages/Course/Course";
import Lecture from "./pages/Lecture/Lecture";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import React, { Fragment } from "react";

function App() {
  const courseRoute = useRouteMatch("/course");
  const exploreRoute = useRouteMatch("/explore");
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  return (
    <Fragment>
      <Header />
      <Switch>
        <React.Fragment>
          <Route exact path='/course' component={Course} />
          <Route exact path='/' component={Courses} />
          <Route exact path='/explore' component={Explore} />
          <Route exact path='/lecture' component={Lecture} />
          <div className='app'>
            {isDesktop && !courseRoute && !exploreRoute && <Sidebar />}
            <main className='main-container'>
              <Route exact path='/create/course' component={CreateCourse} />
              <Route exact path='/courses' component={Courses} />
              <Route exact path='/edit/course' component={EditCourse} />
              <Route
                exact
                path='/edit/course/lecture'
                component={EditLecture}
              />
            </main>
          </div>
        </React.Fragment>
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);

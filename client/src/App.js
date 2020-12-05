import "./App.scss";
import { Switch, Route, withRouter, useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "./components/Header/Header";
import MyCourses from "./pages/MyCourses/MyCourses";
import Explore from "./pages/Explore/Explore";
import EditCourse from "./pages/EditCourse/EditCourse";
import EditLecture from "./pages/EditLecture/EditLecture";
import CourseLandingPage from "./pages/CourseLandingPage/CourseLandingPage";
import Lecture from "./pages/Lecture/Lecture";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import React, { Fragment } from "react";
import MyLearning from "./pages/MyLearning/MyLearning";
import MyPage from "./pages/MyPage/MyPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyAccount from "./pages/MyAccount/MyAccount";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const courseRoute = useRouteMatch("/course");
  const exploreRoute = useRouteMatch("/explore");
  const lectureRoute = useRouteMatch("/lecture");
  const homeRoute = useRouteMatch({
    path: "/",
    exact: true,
    strict: true,
    sensitive: true,
  });
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  return (
    <Fragment>
      <Header />
      <Switch>
        <React.Fragment>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/course' component={CourseLandingPage} />
          <Route exact path='/explore' component={Explore} />
          <Route exact path='/lecture' component={Lecture} />
          <div className='app'>
            {isDesktop &&
              !homeRoute &&
              !courseRoute &&
              !exploreRoute &&
              !lectureRoute && <Sidebar />}
            <main className='main-container'>
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/create/course' component={CreateCourse} />
              <Route exact path='/my-courses' component={MyCourses} />
              <Route exact path='/my-learning' component={MyLearning} />
              <Route exact path='/my-page' component={MyPage} />
              <Route exact path='/edit/course' component={EditCourse} />
              <Route
                exact
                path='/edit/course/lecture'
                component={EditLecture}
              />
              <Route exact path='/my-account' component={MyAccount} />
            </main>
          </div>
        </React.Fragment>
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);

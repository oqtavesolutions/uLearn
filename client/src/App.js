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
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const courseRoute = useRouteMatch("/course");
  const exploreRoute = useRouteMatch("/explore");
  const lectureRoute = useRouteMatch("/lecture");
  const loginRoute = useRouteMatch("/login");
  const signupRoute = useRouteMatch("/signup");
  const homeRoute = useRouteMatch({
    path: "/",
    exact: true,
    strict: true,
    sensitive: true,
  });
  const createCourseRoute = useRouteMatch("/create/course");
  const dashboardRoute = useRouteMatch("/dashboard");
  const myCoursesRoute = useRouteMatch("/my-courses");
  const myLearningRoute = useRouteMatch("/my-learning");
  const myPageRoute = useRouteMatch("/my-page");
  const editCourseRoute = useRouteMatch("/edit/course");
  const editLectureRoute = useRouteMatch("/edit/course/lecture");
  const myAccountRoute = useRouteMatch("/my-account");
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  if (
    createCourseRoute ||
    dashboardRoute ||
    myCoursesRoute ||
    myLearningRoute ||
    myPageRoute ||
    editCourseRoute ||
    editLectureRoute ||
    myAccountRoute
  ) {
    return (
      <Fragment>
        <Header />
        <div className='app'>
          {isDesktop &&
            !loginRoute &&
            !signupRoute &&
            !homeRoute &&
            !courseRoute &&
            !exploreRoute &&
            !lectureRoute && <Sidebar />}
          <main className='main-container'>
            <Switch>
              <PrivateRoute
                exact
                path='/create/course'
                component={CreateCourse}
              />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/my-courses' component={MyCourses} />
              <PrivateRoute exact path='/my-learning' component={MyLearning} />
              <PrivateRoute exact path='/my-page' component={MyPage} />
              <PrivateRoute exact path='/edit/course' component={EditCourse} />
              <PrivateRoute
                exact
                path='/edit/course/lecture'
                component={EditLecture}
              />
              <PrivateRoute exact path='/my-account' component={MyAccount} />
            </Switch>
          </main>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header />
      <Switch>
        <React.Fragment>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/course' component={CourseLandingPage} />
          <Route exact path='/explore' component={Explore} />
          <Route exact path='/lecture' component={Lecture} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </React.Fragment>
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);

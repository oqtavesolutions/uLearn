import "./App.scss";
import { Switch, Route, withRouter, useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "./components/Header/Header";
import MyCourses from "./pages/MyCourses";
import Explore from "./pages/Explore";
import EditCourse from "./pages/EditCourse";
import EditLecture from "./pages/EditLecture";
import CourseLandingPage from "./pages/CourseLandingPage";
import Lecture from "./pages/Lecture";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateCourse from "./pages/CreateCourse";
import React from "react";
import MyLearning from "./pages/MyLearning";
import MyPage from "./pages/MyPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyAccount from "./pages/MyAccount/MyAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import CreateLecture from "./pages/CreateLecture";

function App() {
  //const exploreRoute = useRouteMatch("/explore");
  // const courseRoute = useRouteMatch("/course");
  // const lectureRoute = useRouteMatch("/lecture");
  // const loginRoute = useRouteMatch("/login");
  // const signupRoute = useRouteMatch("/signup");
  // const homeRoute = useRouteMatch({
  //   path: "/",
  //   exact: true,
  //   strict: true,
  //   sensitive: true,
  // });

  const createCourseRoute = useRouteMatch("/create/course");
  const createLectureRoute = useRouteMatch({
    path: "/create/:courseId/lecture",
    exact: true,
    strict: true,
    sensitive: true,
  });
  const dashboardRoute = useRouteMatch("/dashboard");
  const myCoursesRoute = useRouteMatch("/my-courses");
  const myLearningRoute = useRouteMatch("/my-learning");
  const myPageRoute = useRouteMatch("/my-page");
  const editCourseRoute = useRouteMatch("/edit/course/:courseId");
  const lectureRoute = useRouteMatch(
    "/course/:courseSlug/lecture/:lectureSlug"
  );
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
    myAccountRoute ||
    createLectureRoute
  ) {
    return (
      <PrivateRoute>
        <Header />
        <div className='app'>
          {isDesktop && <Sidebar />}
          <main className='main-container'>
            <Switch>
              <Route exact path='/create/course' component={CreateCourse} />
              <Route
                exact
                path='/create/:courseId/lecture'
                component={CreateLecture}
              />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/my-courses' component={MyCourses} />
              <Route exact path='/my-learning' component={MyLearning} />
              <Route exact path='/my-page' component={MyPage} />
              <Route
                exact
                path='/edit/course/:courseId'
                component={EditCourse}
              />
              <Route
                exact
                path='/edit/course/:courseId/lecture/:lectureId'
                component={EditLecture}
              />
              <Route exact path='/my-account' component={MyAccount} />
            </Switch>
          </main>
        </div>
      </PrivateRoute>
    );
  }

  if (lectureRoute) {
    return (
      <PrivateRoute>
        <Header />
        <div className='app'>
          <main className='main-container'>
            <Switch>
              <Route
                exact
                path='/course/:courseSlug/lecture/:lectureSlug'
                component={Lecture}
              />
            </Switch>
          </main>
        </div>
      </PrivateRoute>
    );
  }

  return (
    <ErrorBoundary>
      <Header />
      <Switch>
        <React.Fragment>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/explore' component={Explore} />
          <Route
            exact
            path='/course/:courseSlug'
            component={CourseLandingPage}
          />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </React.Fragment>
      </Switch>
    </ErrorBoundary>
  );
}

export default withRouter(App);

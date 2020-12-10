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
import CreateCourse from "./pages/CreateCourse";
import React from "react";
import MyLearning from "./pages/MyLearning/MyLearning";
import MyPage from "./pages/MyPage/MyPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyAccount from "./pages/MyAccount/MyAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";

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
      <PrivateRoute>
        <Header />
        <div className='app'>
          {isDesktop && <Sidebar />}
          <main className='main-container'>
            <Switch>
              <Route exact path='/create/course' component={CreateCourse} />
              <Route exact path='/dashboard' component={Dashboard} />
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
          <Route exact path='/course' component={CourseLandingPage} />
          <Route exact path='/lecture' component={Lecture} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </React.Fragment>
      </Switch>
    </ErrorBoundary>
  );
}

export default withRouter(App);

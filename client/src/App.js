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
import LandingPage from "./pages/LandingPage";
import MyAccount from "./pages/MyAccount";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import CreateLecture from "./pages/CreateLecture";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "./App.scss";
import LectureList from "./pages/LectureList/";

function App() {
  const exploreRoute = useRouteMatch("/explore");
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

  const loginRoute = useRouteMatch("/login");
  const signupRoute = useRouteMatch("/signup");
  const createCourseRoute = useRouteMatch("/create/course");
  const createLectureRoute = useRouteMatch({
    path: "/create/:courseId/lecture",
    exact: true,
    strict: true,
    sensitive: true,
  });
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
    query: "(min-device-width: 768px)",
  });

  if (myCoursesRoute || myLearningRoute) {
    return (
      <PrivateRoute>
        <Header />
        <div className='app'>
          <Switch>
            <Route exact path='/my-courses' component={MyCourses} />
            <Route exact path='/my-learning' component={MyLearning} />
          </Switch>
        </div>
      </PrivateRoute>
    );
  }

  if (
    createCourseRoute ||
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
          <Switch>
            <Route exact path='/create/course' component={CreateCourse} />
            <Route
              exact
              path='/create/:courseId/lecture'
              component={CreateLecture}
            />
            <Route exact path='/my-page' component={MyPage} />
            <Route exact path='/edit/course/:courseId' component={EditCourse} />
            <Route
              exact
              path='/edit/course/:courseId/lectures'
              component={LectureList}
            />
            <Route
              exact
              path='/edit/course/:courseId/lecture/:lectureId'
              component={EditLecture}
            />
            <Route exact path='/my-account' component={MyAccount} />
          </Switch>
        </div>
      </PrivateRoute>
    );
  }

  if (lectureRoute) {
    return (
      <PrivateRoute>
        <Header />
        <Switch>
          <Route
            exact
            path='/course/:courseSlug/lecture/:lectureSlug'
            component={Lecture}
          />
        </Switch>
      </PrivateRoute>
    );
  }

  if (exploreRoute) {
    return (
      <ErrorBoundary>
        <Header />
        <div className='app'>
          {isDesktop && <Sidebar exploreRoute={exploreRoute} />}
          <main className='main-container'>
            <Switch>
              <Route exact path='/explore' component={Explore} />
            </Switch>
          </main>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Header loginRoute={loginRoute} signupRoute={signupRoute} />
      <Switch>
        <React.Fragment>
          <Route exact path='/' component={LandingPage} />
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

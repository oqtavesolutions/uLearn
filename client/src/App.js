import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "./components/Header/Header";
import Courses from "./pages/Courses/Courses";
import Explore from "./pages/Explore/Explore";
import EditCourse from "./pages/EditCourse/EditCourse";
import EditLecture from "./pages/EditLecture/EditLecture";
import Course from "./pages/Course/Course";
import Lecture from "./pages/Lecture/Lecture";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  return (
    <Router>
      <Header />
      <div className='app'>
        {isDesktop && <Sidebar />}
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route exact path='/courses' component={Courses} />
          <Route exact path='/course' component={Course} />
          <Route exact path='/edit/course' component={EditCourse} />
          <Route exact path='/edit/course/lecture' component={EditLecture} />
          <Route exact path='/explore' component={Explore} />
          <Route exact path='/lecture' component={Lecture} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

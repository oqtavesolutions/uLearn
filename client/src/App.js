import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Courses from "./pages/Courses/Courses";
import Explore from "./pages/Explore/Explore";
import EditCourse from "./pages/EditCourse/EditCourse";
import EditLecture from "./pages/EditLecture/EditLecture";
import Course from "./pages/Course/Course";
import Lecture from "./pages/Lecture/Lecture";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Courses} />
        <Route exact path='/courses' component={Courses} />
        <Route exact path='/course' component={Course} />
        <Route exact path='/edit/course' component={EditCourse} />
        <Route exact path='/edit/course/lecture' component={EditLecture} />
        <Route exact path='/explore' component={Explore} />
        <Route exact path='/lecture' component={Lecture} />
      </Switch>
    </Router>
  );
}

export default App;

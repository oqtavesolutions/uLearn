import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Courses from "./pages/Courses/Courses";
import Explore from "./pages/Explore/Explore";
import EditCourse from "./pages/EditCourse/EditCourse";
import EditLecture from "./pages/EditLecture/EditLecture";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Courses} />
        <Route exact path='/courses' component={Courses} />
        <Route exact path='/edit/course' component={EditCourse} />
        <Route exact path='/edit/course/lecture' component={EditLecture} />
        <Route exact path='/explore' component={Explore} />
      </Switch>
    </Router>
  );
}

export default App;

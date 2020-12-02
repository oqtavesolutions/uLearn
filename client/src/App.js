import "./App.scss";
import Header from "./components/Header/Header";
import Courses from "./pages/Courses/Courses";
import Explore from "./pages/Explore/Explore";

function App() {
  return (
    <div className='App'>
      <Header />
      <Courses />
      <Explore />
    </div>
  );
}

export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Frontpage from './components/pages/frontpage';
import Employer from './components/pages/employer';
import Student from './components/pages/student';
import Container from './components/container';

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Frontpage />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/student" element={<Student/>} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
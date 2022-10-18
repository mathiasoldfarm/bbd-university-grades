import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Frontpage from './components/pages/frontpage';
import Employer from './components/pages/employer';
import Container from './components/pages/container';

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Frontpage />} />
            <Route path="/employer" element={<Employer />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
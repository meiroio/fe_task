import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Attributes } from './pages';

const Placeholder = () => {
  return <div>Placeholder</div>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attributes" element={<Attributes />} />
        <Route path="/attributes/:id" element={<Placeholder />} />
      </Routes>
    </Router>
  );
}

export default App;

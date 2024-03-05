import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Attributes, Attribute } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attributes" element={<Attributes />} />
        <Route path="/attributes/:id" element={<Attribute />} />
      </Routes>
    </Router>
  );
}

export default App;

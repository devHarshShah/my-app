import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Animation from './components/Animation';
import Animation2 from './components/Animation2';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col">
        <Routes>
          <Route path="/" element={<Animation />} />
          <Route path="/animation2" element={<Animation2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
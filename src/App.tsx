import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import D3 from './components/D3';
import TableChart from './components/charts/TableChart';
import LineChart from './components/charts/LineChart';
import PieChart from './components/charts/PieChart';
import BeautifulDnd from './components/dragndrop/BeautifulDnd';
import CustomDnd from './components/dragndrop/CustomDnd';
import LoginFormForTesting from './components/__test__/LoginFormForTesting';

function App():ReactElement {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/table" element={<TableChart />} />
        <Route path="/line" element={<LineChart />} />
        <Route path="/pie" element={<PieChart />} />
        <Route path="/d3" element={<D3 />} />
        <Route path="/beautiful-dnd" element={<BeautifulDnd />} />
        <Route path="/custom-dnd" element={<CustomDnd />} />
        <Route path="/login-test" element={<LoginFormForTesting />} />
      </Routes>
    </div>
  );
}

export default App;

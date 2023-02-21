import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Add from './Component/Add';
import View from './Component/View';
import Graph from './Component/Graph';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <>
     <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Header Panel</Navbar.Brand>
                </Container>
            </Navbar>
            <div className='bttns'>
                <Link className='lin_tag my-2 me-2' to="/add">Add</Link>
                <Link className='lin_tag my-2 me-2' to="/view">View</Link>
                <Link className='lin_tag my-2 me-2' to="/graph">Graph</Link>
            </div>
        </div>
      <Routes>
        <Route path='/add' element={<Add />} />
        <Route path='/view' element={<View />} />
        <Route path='/graph' element={<Graph />} />
      </Routes>
    </>
  );
}

export default App;

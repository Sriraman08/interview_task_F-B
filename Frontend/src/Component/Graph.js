import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const Graph = () => {
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const [respData, setResp] = useState();
  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  const handle = async (event) => {
    setSelected(event.target.value)
    await axios.get("http://localhost:4000/book/graph_count").then(resp => {
      console.log(resp.data.data, "resp=====")
      let arr = []
      if (event.target.value === 'book') {
        setData(resp.data.data.book)
      } else {
        setData(resp.data.data.journal)
      }
    }).catch(err => {
      console.log(err, "error0-00-")
    });

  }

  return (
    <div className='container mt-2'>
      <h4 className='mb-4 mt-3'>Graph</h4>
      <div>
        <Form.Select aria-label="Default select example" onChange={handle}>
          <option value="book">Books</option>
          <option value="journal">Journal</option>
        </Form.Select>
      </div>
      <div className='mt-5'>
        <PieChart
          animation
          animationDuration={500}
          animationEasing="ease-out"
          center={[50, 50]}
          data={data}
          style={{
            weight: '500px',
            height: '500px',
          }}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={(index) => ({
            // fill: data[index].color,
            fontSize: '5px',
            fontFamily: 'sans-serif',
          })}
          labelPosition={60}
        />
      </div>
    </div>
  )
}

export default Graph

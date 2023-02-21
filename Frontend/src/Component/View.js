import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const View = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();

  const handle = async (event) => {
    console.log("eventcheck===", event.target.value)
    setSelected(event.target.value)
    const getData = await axios.get(`http://localhost:4000/${event.target.value}/`).then(resp => {
      setData(resp.data.data, "resp=====")
    }).catch(err => {
      console.log(err, "error0-00-")
    })
    console.log(getData, "getData-=-=-")
  }


  return (
    <div className='container mt-2'>
      <h4 className='mb-4 mt-3'>View</h4>
      <div >
        <Form.Select aria-label="Default select example" onChange={handle}>
          <option value="book">Books</option>
          <option value="journal">Journal</option>
        </Form.Select>
      </div>
      <br />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Image Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, key) => {
              console.log(val, "val-=-=-")
              console.log(selected, "selected===")
              let filename = val.journals ? val.journals : val.books
              return (
                <tr key={key}>
                  <td>{filename}</td>
                  {/* <td>{val.journals}</td> */}
                  <td>
                    <img className="newimage" style={{ width: "100px" }} draggable={false} src={`http://localhost:4000/${selected}/${filename}`} alt="send" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default View

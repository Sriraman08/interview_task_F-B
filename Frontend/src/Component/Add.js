import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const Add = () => {

    const [file, setFile] = useState({
        filedata: null
    });
    const [dataSelect, setDataSelect] = useState({
        selected: "book",
    });

    const handleevent = (event) => {
        // console.log("event-=-=-=-=-=-=-",event.target.files[0])
        setFile({ ...file, filedata: event.target.files[0] })
    }
    const handle = (event) => {
        // console.log("eventcheck===",event.target.value)
        // console.log(event.target.value,"|===")
        setDataSelect({
            selected: event.target.value
        })
    }

    const handlesubmit = async(e) => {
    e.preventDefault()
    if(file.filedata === null){
        alert("File Upload Required")
        return
    }
        let formData = new FormData()
        formData.append(`${dataSelect.selected}_image`,file.filedata)
        const createData = await axios.post(`http://localhost:4000/${dataSelect.selected}`,formData).catch(err=>{
            console.log(err,"error====")
            alert(err.response.data.message)
            return
        });
        if(createData.data){
            alert(createData.data.message)
        }
    }

    return (
        <>
            <div className='container mt-2'>
                <h4 className='mb-4 mt-3'>Add</h4>
                <div >
                    {/* <Form.Select aria-label="Default select example" onSelect={handle()}>
                        <option value="books">Books</option>
                        <option value="journal">Journal</option>
                    </Form.Select> */}
                    <form onSubmit={handlesubmit}>
                    <Form.Select aria-label="Default select example" onChange={handle}>
                        <option value="book">Books</option>
                        <option value="journal">Journal</option>
                    </Form.Select>
                        <input
                            type="file"
                            name='file'
                            className="form-control mt-3"
                            onChange={(event) => handleevent(event)}
                            // value={input.filedata || ''}
                            placeholder="Upload Image"
                        />
                        <button type='submit' className='btn btn-secondary mt-4' >Upload Image</button>
                    </form>

                    <div style={{ marginTop: "20px" }}>
                        {
                            typeof file.filedata == "string" &&
                            <img style={{ width: "200px", height: "200px" }} src={`http://localhost:5000/${file.filedata}`} alt="" />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add

import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Tableapi, DeleteUser } from "../Apis/UserApi";


const TableData = () => {
    const [data, setData] = useState([])
    const [checkboxs, setCheckboxs] = useState({})

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const getdata = await Tableapi();
                setData(getdata);
            } catch (err) {
                console.log("Err")
            }
        }
        fetchdata();
    }, [])

    const handleCheckbox = (event, row) => {
        const updatecheckbox = {
            ...checkboxs,
            [row._id]: event.target.checked
        }
        setCheckboxs(updatecheckbox)
        if (event.target.checked) {
            console.log(row);
        }
    }

    const handButton = async (_id) => {
        if (checkboxs[_id]) {
            try {
                await DeleteUser(_id);
                const updateRows = data.filter(data => data._id !== _id);
                setData(updateRows)
            } catch (Err) {
                console.log("Err")
            }
        }
    }
    return (
        <div className="container mt-4">
            <h1>User Table</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row._id}>
                            <td>
                                <input type="checkbox" checked={checkboxs[row._id] || false} onChange={(event) => handleCheckbox(event, row)} />
                            </td>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td><Button variant="danger" onClick={() => handButton(row._id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default TableData;
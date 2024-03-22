


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // New state for password

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4009/api/admin/users/" + id);
                console.log(response);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id]); // Make sure to include id in the dependency array

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4009/api/admin/user/new/${id}`, { name, email, password }) // Include password in the request body
            .then((res) => {
                console.log(res);
                navigate("/admin");
            })
            .catch((err) => console.log(err));
    };

    const handleCancel = () => {
        navigate("/"); // Navigate back to the admin page
    };

    return (
        <div className="d-flex vh-100  justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Handle password change
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">Update</button>
                        <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;


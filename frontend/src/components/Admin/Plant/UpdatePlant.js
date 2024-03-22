import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdatePlant() {
    const { id } = useParams();

    const [plantName, setPlantName] = useState("");
    const [fertilizerType, setFertilizerType] = useState("");
    const [soilType, setSoilType] = useState("");
    const [botanicalName, setBotanicalName] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4009/api/plants/${id}`);
                console.log(response);
                const { plantName, fertilizerType, soilType, botanicalName, description, category } = response.data;
                setPlantName(plantName);
                setFertilizerType(fertilizerType);
                setSoilType(soilType);
                setBotanicalName(botanicalName);
                setDescription(description);
                setCategories(categories);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id]);

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4009/api/plants/${id}`, { plantName, fertilizerType, soilType, botanicalName, description, categories })
            .then((res) => {
                console.log(res);
                toast.success("Plant updated successfully"); // Display success message
                navigate("/admin");
            })
            .catch((err) => console.log(err));
    };

    const handleCancel = () => {
        navigate("/admin");
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategories([...categories, value]);
        } else {
            setCategories(categories.filter((category) => category !== value));
        }
    };

    return (
        <div className="container-fluid"style={{fontSize:'2.2vh'}}>
        <div className="flex  justify-content-center " style={{width:'160vh',paddingLeft:'45vh',paddingTop:'18vh',borderRadius:'5vh',borderColor:'brown'}}>
            <div className=" bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update Plant</h2>
                    <div className="mb-2">
                        <label htmlFor="">Plant Name</label>
                        <input
                            type="text"
                            placeholder="Enter Plant Name"
                            className="form-control"
                            value={plantName}
                            onChange={(e) => setPlantName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Fertilizer Type</label>
                        <input
                            type="text"
                            placeholder="Enter Fertilizer Type"
                            className="form-control"
                            value={fertilizerType}
                            onChange={(e) => setFertilizerType(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Soil Type</label>
                        <input
                            type="text"
                            placeholder="Enter Soil Type"
                            className="form-control"
                            value={soilType}
                            onChange={(e) => setSoilType(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Botanical Name</label>
                        <input
                            type="text"
                            placeholder="Enter Botanical Name"
                            className="form-control"
                            value={botanicalName}
                            onChange={(e) => setBotanicalName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Description</label>
                        <input
                            type="text"
                            placeholder="Enter Description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Categories</label>
                       <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value=" Sandy soils"
                                        checked={categories.includes(" Sandy soils")}
                                        onChange={handleCategoryChange}
                                    />
                                    Sandy soils
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Alluvial soils"
                                        checked={categories.includes("Alluvial soils")}
                                        onChange={handleCategoryChange}
                                    />
                                    Alluvial soils
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Red Yellow latasol soil"
                                        checked={categories.includes("Red Yellow latasol soil")}
                                        onChange={handleCategoryChange}
                                    />
                                    Red Yellow latasol soil
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Regasol"
                                        checked={categories.includes("Regasol")}
                                        onChange={handleCategoryChange}
                                    />
                                    Regasol
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Alkalin saline soil"
                                        checked={categories.includes("Alkalin saline soil")}
                                        onChange={handleCategoryChange}
                                    />
                                    Alkalin saline soil
                                </label>
                            </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">Update</button>
                        <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default UpdatePlant;



               
                
                
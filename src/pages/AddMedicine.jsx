import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";


function AddMedicine() {
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        expiry_date: ''
    });
  const token = isLoggedIn;
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://medicalstore.mashupstack.com/api/medicine', formData, {
                headers: {
                    Authorization: `Bearer ${isLoggedIn}`
                }
            });
            console.log(response.data);
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="container mt-5">
            <Navbar />
            <div className="border rounded p-4 shadow">
                <h1 className="text-center mb-4 fw-bolder">Add Medicine</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Medicine Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="company" className="form-label">Company</label>
                        <input type="text" className="form-control" id="company" name="company" value={formData.company} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiry_date" className="form-label">Expiry Date</label>
                        <input type="date" className="form-control" id="expiry_date" name="expiry_date" value={formData.expiry_date} onChange={handleInputChange} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMedicine;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate,Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Navbar from "../components/Navbar";

const EditMedicine = () => {
  const [medicineData, setMedicineData] = useState({
    name: "",
    company: "",
    expiry_date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { isLoggedIn, data, setData } = useContext(UserContext); // Assuming data is the list of medicines

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/home");
    } else {
      const getMedicineData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://medicalstore.mashupstack.com/api/medicine/${id}`,
            {
              headers: {
                Authorization: `Bearer ${isLoggedIn}`,
              },
            }
          );
          setIsLoading(false);
          setMedicineData(response.data);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      };

      getMedicineData();
    }
  }, [id, isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    setMedicineData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(medicineData);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://medicalstore.mashupstack.com/api/medicine/${id}`,
        medicineData,
        {
          headers: { Authorization: `Bearer ${isLoggedIn}` },
        }
      );
  
      if (res.status === 200) {
        setIsLoading(false);
      
        if (data) {
          const updatedData = data.map(item => {
            if (item.id === id) {
              return medicineData; 
            } else {
              return item;
            }
          });
          setData(updatedData);
        }
        navigate("/home");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  
  return (
    
    <div className="container mt-5">
      <Navbar/>
      <h1 className="text-center mb-4 fw-bolder">Edit Medicine</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Medicine Name</label>
          <input type="text" className="form-control" id="name" name="name" value={medicineData.name} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company</label>
          <input type="text" className="form-control" id="company" name="company" value={medicineData.company} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="expiry_date" className="form-label">Expiry Date</label>
          <input type="date" className="form-control" id="expiry_date" name="expiry_date" value={medicineData.expiry_date} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/home" className="btn btn-secondary mx-3">Back</Link>
        

      </form>
    </div>
  );
}

export default EditMedicine;

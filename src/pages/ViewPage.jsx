import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";

function ViewMedicine() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [medicine, setMedicine] = useState(null);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://medicalstore.mashupstack.com/api/medicine/${id}`, {
          headers: {
            Authorization: `Bearer ${isLoggedIn}`
          }
        });
        setMedicine(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, [id, isLoggedIn, navigate]);

  if (!medicine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <Navbar/>
      <h1 className="text-center mb-4 fw-bolder">Medicine Details</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{medicine.name}</h5>
          <p className="card-text">Company: {medicine.company}</p>
          <p className="card-text">Expiry Date: {medicine.expiry_date}</p>
          <Link to="/home" className="btn btn-secondary">Back</Link>
        </div>
      </div>
    </div>
  );
}

export default ViewMedicine;

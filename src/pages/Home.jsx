import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import DeleteModal from "../components/Modal"; 

function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [selectedMedicineId, setSelectedMedicineId] = useState(null); 
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const token = isLoggedIn;
  

  useEffect(() => {
    if (!token) {
      console.log("User not authenticated. Redirecting to login page...");
      navigate("/");
    } else {
      console.log("User authenticated");
      fetchData();
    }
  }, [token, navigate]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('https://medicalstore.mashupstack.com/api/medicine', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${selectedMedicineId}`, {
        headers: {
          Authorization: `Bearer ${isLoggedIn}`
        }
      });
      
      setData(prevData => prevData.filter(item => item.id !== selectedMedicineId));
      console.log(`Medicine with id ${selectedMedicineId} deleted successfully`);
      setShowModal(false); // Close the modal after successful deletion
    } catch (error) {
      console.log(`Error deleting medicine with id ${selectedMedicineId}:`, error);
    }
  };

  const handleShowModal = (id) => {
    setSelectedMedicineId(id);
    setShowModal(true);
  };


  const filteredData = data.filter(item => 
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase()) 
  
);
  return (
    <div className="container mt-5">
      <Navbar/>
      <h1 className="text-center mb-4 fw-bolder">Medicines</h1>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add" className="btn btn-info">Add Medicine</Link>
      </div>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      {filteredData.length === 0 && <p className="text-center">No data found.</p>}
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-striped">
          <thead className="text-center">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Company</th>
              <th>Expiry date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredData.map((d, index) => (
              <tr key={index}>
                <td>{index + 1}</td> 
                <td>{d.name}</td>
                <td>{d.company}</td>
                <td>{d.expiry_date}</td>
                <td>
                  <Link to={`/edit/${d.id}`} className="btn btn-sm btn-warning mx-2">Edit</Link>
                  <button className="btn btn-sm btn-danger mx-2" onClick={() => handleShowModal(d.id)}>Delete</button>
                  <Link to={`/view/${d.id}`} className="btn btn-sm btn-info mx-2">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Delete modal */}
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Home;

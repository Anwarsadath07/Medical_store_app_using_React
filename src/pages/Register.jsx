import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [passwordConf, setPasswordConf] = useState('');
  var [errorMessage, setErrorMessage] = useState('');
  var navigate = useNavigate();
  function registerUser(){
      var user = {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConf
      }
      axios.post('https://medicalstore.mashupstack.com/api/register',user).then(response=>{
          console.log(response);
          setErrorMessage('');
          navigate('/');
      }).catch(error=>{
          if(error.response.data.errors){
              setErrorMessage(Object.values(error.response.data.errors).join(' '));
          }else{
              setErrorMessage('Failed to connect to api');
          }
      })
  }
  return (
    <div style={{background: 'linear-gradient(to bottom, #ADD8E6, #FFFFFF)'}}>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="text-center">Register</h1>
        <div className="w-25 rounded bg-white border shadow p-4 mt-3">
          {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
          <div className="form-group">
            <input type="text"
                   className="form-control"
                   value={name}
                   placeholder="Name"
                   onInput={(event)=>setName(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <input type="text"
                   className="form-control"
                   value={email}
                   placeholder="Email"
                   onInput={(event)=>setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <input type="password"
                   className="form-control"
                   value={password}
                   placeholder="Password"
                   onInput={(event)=>setPassword(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <input type="password"
                   className="form-control"
                   value={passwordConf}
                   placeholder="Confirm password"
                   onInput={(event)=>setPasswordConf(event.target.value)}
            />
          </div>
          <div className="form-group text-center mt-3">
            <button className="btn btn-primary w-50" onClick={registerUser}>Submit</button>
          </div>
          <p className="text-center mt-2">
            Already have an account? <Link to={"/"}>Login Here!!!</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;

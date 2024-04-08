import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function Login() {
    const { setIsLoggedIn } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const submitLogin = (e) => {
        e.preventDefault();

        const loginuser = {
            email: email,
            password: password
        };

        axios.post('https://medicalstore.mashupstack.com/api/login', loginuser)
            .then(response => {
                const token = response.data.token;
                console.log(token);
                setIsLoggedIn(token); 
                navigate('/home');
            })
            .catch(error => {
                console.error('Error logging in:', error);
                setErrorMessage('Failed to login. Please try again.');
            });
    };

    return (
        <div style={{ 
            backgroundImage: 'linear-gradient(to right, #ADD8E6, #FFFFFF)', 
            display: 'flex',
            justifyContent: 'flex-end', 
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <div className="card p-4">
                            <h1 className="text-center mb-4">Login</h1>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={submitLogin}>
                                <div className="form-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                </div>
                                <p className="text-center mt-2">
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

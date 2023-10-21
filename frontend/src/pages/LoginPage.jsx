import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const logInUser = () => {
        if (email.length === 0) {
            alert("Email has been left blank!");
        } else if (password.length === 0) {
            alert("Password has been left blank!");
        } else {
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    alert("You have successfully logged in!");
                    login();
                    navigate("/home");
                })
                .catch(function (error) {
                    console.log(error, 'error');
                    if (error.response.status === 401) {
                        alert("Invalid credentials");
                    }
                });
        }
    }

    let imgs = [
        'https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg?w=826&t=st=1697858537~exp=1697859137~hmac=769ff22301d36dc8443dfc5eccd20d926e36a5b9d688528f6ec8487a13204282',
    ];

    return (
        <div>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-lg-6 col-xl-6 col-xxl-5"> {/* Increased size of the image column */}
                            <img src={imgs[0]} className="img-fluid" alt="Background" />
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6 col-xxl-5"
                         style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                                padding: "20px",
                                marginLeft: "10vh",
                                
                            }}>
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="fs-2 fw-bolder">Login to continue</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={logInUser}>Login</button>
                                    <p className="small mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-primary text-decoration-none">Register</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

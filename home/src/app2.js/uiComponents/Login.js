import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Rightcontainer from '../Components/Rightcontainer';
import '../css/layout.css';
import '../css/login.css';
import loginss from "./ss.png";
import BottomNav from '../Components/BottomNav';

export default function Login() {
    const history = useHistory();
    const backUrl = process.env.REACT_APP_BACKEND_LOCAL_API;

    // State variables
    const [Phone, setPhone] = useState('');
    const [twofactor_code, settwofactor_code] = useState('');
    const [otp, setOtp] = useState(false);
    const [secretCode, setSecretCode] = useState('');
    const [referral, setReferral] = useState(useLocation().pathname.split("/")[2]);
    const [agreeTerms, setAgreeTerms] = useState(false);

    // Handle initial phone number submission
    const handleClick = async (e) => {
        e.preventDefault();

        if (!Phone) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter your phone number',
            });
        } else if (Phone.length !== 10) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid phone number',
            });
        } else {
            await axios.post(backUrl + 'login', {
                Phone, referral
            }).then((response) => {
                console.log(response, "res")
                if (response.data.status === 101) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.msg,
                    });
                } else if (response.data.status === 200) {
                    setOtp(true);
                    console.log(response.data);
                    setSecretCode(response.data.secret);
                }
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong',
                });
            });
        }
    }

    // Handle OTP verification
    const verifyOtp = async (e) => {
        e.preventDefault();
        console.log('Verify OTP request');

        if (!Phone) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter your phone number',
            });
        } else if (!agreeTerms) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must agree to the terms and conditions to proceed',
            });
        } else {
            await axios.post(backUrl + "login/finish", {
                Phone,
                twofactor_code,
                referral,
                secretCode
            }).then((response) => {
                if (response.data.status === 101) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.msg,
                    });
                } else if (response.data.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    window.location.reload(true);
                    setTimeout(() => {
                        history.push("/Games");
                    }, 1000);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                }
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
        }
    }

    // Show error alert for invalid phone number
    const setError = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Number',
        });
    }

    return (
        <>
            <style jsx>{`
                .responsive-login-container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .main-area {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    overflow: hidden;
                }

                .splash-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.3);
                    z-index: 1;
                }

                .splash-screen {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    flex-direction: column;
                    z-index: 2;
                }

                .header_top_message {
                    background: linear-gradient(90deg, #ff6b6b, #ffa500);
                    color: white;
                    padding: 8px 16px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 500;
                    position: relative;
                    z-index: 3;
                }

                .splash-screen figure {
                    flex: 1;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .splash-screen img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }

                .login-form-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 16px;
                    padding: 20px 16px;
                    width: 90%;
                    max-width: 350px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .logo-container {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 16px;
                    border: 2px solid #fff;
                    flex-shrink: 0;
                }

                .logo-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .login-title {
                    color: #fff;
                    font-size: 22px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    text-align: center;
                }

                .input-container {
                    width: 100%;
                    background: #fff;
                    border-radius: 8px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    border: 1px solid #d8d6de;
                }

                .input-group {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .input-group-prepend {
                    flex-shrink: 0;
                }

                .input-group-text {
                    width: 70px;
                    background-color: #e9ecef;
                    border: none;
                    text-align: center;
                    padding: 0 8px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 500;
                }

                .form-control {
                    border: none;
                    height: 50px;
                    font-size: 16px;
                    flex: 1;
                    padding: 0 12px;
                    outline: none;
                    background: transparent;
                }

                .form-control:focus {
                    outline: none;
                    box-shadow: none;
                }

                .checkbox-container {
                    width: 100%;
                    background: #f9f9f9;
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: flex-start;
                    border: 1px solid #d8d6de;
                    gap: 10px;
                }

                .checkbox-input {
                    margin: 0;
                    border-radius: 4px;
                    border: 1px solid #d8d6de;
                    height: 18px;
                    width: 18px;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .checkbox-label {
                    color: #000;
                    font-size: 14px;
                    line-height: 1.4;
                    margin: 0;
                    flex: 1;
                }

                .checkbox-label a {
                    text-decoration: underline;
                    color: #007bff;
                }

                .login-button {
                    width: 100%;
                    padding: 12px 0;
                    background: #000;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 600;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .login-button:hover {
                    background: #333;
                }

                .login-button:active {
                    transform: translateY(1px);
                }

                .login-footer {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0, 0, 0, 0.8);
                    color: #fff;
                    padding: 16px;
                    font-size: 12px;
                    line-height: 1.4;
                    text-align: center;
                    z-index: 5;
                }

                .login-footer a {
                    color: #ffa500;
                    text-decoration: underline;
                }

                /* Mobile-specific adjustments */
                @media (max-width: 768px) {
                    .header_top_message {
                        font-size: 10px;
                        padding: 6px 12px;
                    }

                    .login-form-container {
                        width: 95%;
                        max-width: 320px;
                        padding: 16px 12px;
                    }

                    .logo-container {
                        width: 60px;
                        height: 60px;
                    }

                    .login-title {
                        font-size: 20px;
                        margin-bottom: 16px;
                    }

                    .input-group-text {
                        width: 60px;
                        font-size: 12px;
                    }

                    .form-control {
                        font-size: 14px;
                        height: 45px;
                    }

                    .checkbox-container {
                        padding: 10px;
                    }

                    .checkbox-label {
                        font-size: 12px;
                    }

                    .login-button {
                        font-size: 14px;
                        padding: 10px 0;
                    }

                    .login-footer {
                        font-size: 10px;
                        padding: 12px;
                    }
                }

                /* Extra small screens */
                @media (max-width: 480px) {
                    .login-form-container {
                        width: 98%;
                        padding: 14px 10px;
                    }

                    .logo-container {
                        width: 50px;
                        height: 50px;
                    }

                    .login-title {
                        font-size: 18px;
                    }

                    .input-group-text {
                        width: 50px;
                        font-size: 11px;
                    }

                    .form-control {
                        font-size: 13px;
                        height: 42px;
                    }

                    .checkbox-input {
                        width: 16px;
                        height: 16px;
                    }

                    .checkbox-label {
                        font-size: 11px;
                    }

                    .login-button {
                        font-size: 13px;
                        padding: 9px 0;
                    }
                }

                /* Large screens */
                @media (min-width: 1200px) {
                    .login-form-container {
                        max-width: 400px;
                        padding: 24px 20px;
                    }

                    .logo-container {
                        width: 90px;
                        height: 90px;
                    }

                    .login-title {
                        font-size: 24px;
                    }

                    .form-control {
                        font-size: 17px;
                        height: 55px;
                    }

                    .input-group-text {
                        width: 75px;
                        font-size: 15px;
                    }

                    .checkbox-label {
                        font-size: 15px;
                    }

                    .login-button {
                        font-size: 17px;
                        padding: 14px 0;
                    }
                }

                /* Landscape orientation on mobile */
                @media (max-height: 600px) and (orientation: landscape) {
                    .login-form-container {
                        top: 50%;
                        max-height: 90vh;
                        overflow-y: auto;
                    }

                    .logo-container {
                        width: 50px;
                        height: 50px;
                        margin-bottom: 10px;
                    }

                    .login-title {
                        font-size: 18px;
                        margin-bottom: 12px;
                    }

                    .input-container {
                        margin-bottom: 8px;
                    }

                    .checkbox-container {
                        margin-bottom: 10px;
                        padding: 8px;
                    }
                }
            `}</style>

            <div className='leftContainer responsive-login-container'>
                <div className="main-area bg-dark">
                    <div className="splash-overlay" />
                    <div className="splash-screen animate__bounce infinite">
                        <div className="header_top_message">
                            <span>Commission: 3% ◉ Referral: 2% For All Games No TDS,No GST</span>
                        </div>
                        <figure>
                            <img src={loginss} alt="Background" />
                        </figure>
                    </div>

                    <div className="login-form-container">
                        <div className="logo-container">
                            <img src={loginss} alt="Logo" />
                        </div>

                        <div className="login-title" style={{color:"black"}}>Sign in</div>

                        <div className="input-container">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">+91</div>
                                </div>
                                <input 
                                    className="form-control" 
                                    name="mobile" 
                                    type="tel" 
                                    placeholder="Mobile number" 
                                    value={Phone}
                                    onChange={(e) => { 
                                        setPhone(e.target.value); 
                                        if (e.target.value.length > 10) { 
                                            setError(); 
                                        } 
                                    }} 
                                />
                            </div>
                        </div>

                        {otp && (
                            <div className="input-container">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">OTP</div>
                                    </div>
                                    <input 
                                        className="form-control" 
                                        name="password" 
                                        type="tel" 
                                        placeholder="Enter OTP" 
                                        value={twofactor_code}
                                        onChange={(e) => settwofactor_code(e.target.value)} 
                                    />
                                </div>
                            </div>
                        )}

                        {otp && (
                            <div className="checkbox-container">
                                <input 
                                    className="checkbox-input" 
                                    type="checkbox" 
                                    id="agreeTerms" 
                                    checked={agreeTerms} 
                                    onChange={(e) => setAgreeTerms(e.target.checked)} 
                                />
                                <label className="checkbox-label" htmlFor="agreeTerms">
                                    I agree to the <Link to="/term-condition">Terms & Conditions</Link>
                                </label>
                            </div>
                        )}

                        {!otp && (
                            <button className="login-button" onClick={handleClick}>
                                Get OTP
                            </button>
                        )}

                        {otp && (
                            <button className="login-button" onClick={verifyOtp}>
                                Verify
                            </button>
                        )}
                    </div>

                    <div className="login-footer">
                        By continuing I agree that Ludo Bharat. may store and process my data in accordance with the <Link to="/term-condition" >Terms of Use</Link>, <Link to="/PrivacyPolicy">Privacy Policy</Link> and that I am 18 years or older. I am not playing from
                        Assam, Odisha, Nagaland, Sikkim, Meghalaya, Andhra Pradesh, or Telangana.
                    </div>
                </div>
            </div>
        </>
    )
}
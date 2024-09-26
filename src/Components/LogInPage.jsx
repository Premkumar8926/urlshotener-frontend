import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

const LogInPage = ({ setLogin, setToken }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/signup")
    }

    const handleForgotPasswordClick = () => {
        navigate("/forgotpassword")
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: yup.string()
                .required("Password is required")
        }),
        onSubmit: (values) => {
            setLoading(true);
            axios.post("/login", values).then(res => {
                setLoading(false);
                if (res.data.message === "Password matched") {
                    formik.resetForm();
                    setLogin(true);
                    window.localStorage.setItem("isLoggedIn", true);
                    setToken(res.data.token);
                    window.localStorage.setItem("token", res.data.token);
                    navigate("/home");  // Redirect to dashboard after login

                    toast.success("Login successful", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        transition: Slide
                    });
                } else if (res.data.message === "User not found") {
                    toast.error("User not registered");
                } else if (res.data.message === "User not activated") {
                    toast.error("Account not activated");
                } else {
                    toast.error("Incorrect password");
                }
            }).catch(error => {
                setLoading(false);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Login failed. Please try again later.");
                }
            })
        }
    });

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center bg-color'>
            <div className="outer-container">
                <p className='title'>Let's start</p>
                <p className='text1'>Please login to continue</p>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="input-container">
                        {formik.touched.email && formik.errors.email ? 
                            <div className='error-msg'>{formik.errors.email}</div> : null
                        }
                        <i className='bx bx-envelope'></i>
                        <input
                            type="email"
                            placeholder='Email'
                            {...formik.getFieldProps("email")}
                        />
                    </div>
                    <div className="input-container">
                        {formik.touched.password && formik.errors.password ? 
                            <div className='error-msg'>{formik.errors.password}</div> : null
                        }
                        <i className='bx bx-lock-alt'></i>
                        <input
                            type="password"
                            placeholder='Password'
                            {...formik.getFieldProps("password")}
                        />
                    </div>
                    <button className='custom-btn' type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <p className='d-flex justify-content-center text2'>
                    Don't Have An Account? <span onClick={handleSignUpClick}>Sign Up</span>
                </p>
                <p className='d-flex justify-content-center mt-0 p-0 text2'>
                    <span onClick={handleForgotPasswordClick}>Forgot Password</span>
                </p>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {loading && 
                <div className="loading-container">
                    <ReactLoading type="spinningBubbles" color="#ed7632" />
                </div>
            }
        </div>
    );
}

export default LogInPage;

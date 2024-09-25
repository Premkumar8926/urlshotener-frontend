import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsResgistered] = useState(false);
  const navigate = useNavigate();

  // Function to handle click event for returning to login page
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Set up formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required("Password is required").min(8, "Password should be min 8 characters"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:5000/api/user/register", values); // Correct API URL
        setLoading(false);
        if (res.data.status) {
          formik.resetForm();
          setIsResgistered(true);
          toast.success("User registered successfully. Please check your email for verification.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        } else {
          toast.error(res.data.message || "User already registered", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        }
      } catch (error) {
        setLoading(false);
        toast.error("Registration failed, please try again later", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
    },
  });

  return (
    !isRegistered ?
      (
        <div className='vh-100 d-flex justify-content-center align-items-center bg-color'>
          <div className="outer-container">
            <p className='title'>Let's start</p>
            <p className='text1'>Please sign up or login to continue</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="input-container">
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className='erro-msg'>{formik.errors.firstName}</div>
                ) : null}
                <i class='bx bxs-user'></i>
                <input
                  type="text"
                  placeholder='First name'
                  {...formik.getFieldProps("firstName")}
                />
              </div>
              <div className="input-container">
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className='erro-msg'>{formik.errors.lastName}</div>
                ) : null}
                <i class='bx bxs-user'></i>
                <input
                  type="text"
                  placeholder='Last name'
                  {...formik.getFieldProps("lastName")}
                />
              </div>
              <div className="input-container">
                {formik.touched.email && formik.errors.email ? (
                  <div className='erro-msg'>{formik.errors.email}</div>
                ) : null}
                <i className='bx bx-envelope'></i>
                <input
                  type="email"
                  placeholder='Email'
                  {...formik.getFieldProps("email")}
                />
              </div>
              <div className="input-container">
                {formik.touched.password && formik.errors.password ? (
                  <div className='erro-msg'>{formik.errors.password}</div>
                ) : null}
                <i className='bx bx-lock-alt'></i>
                <input
                  type="password"
                  placeholder='Password'
                  {...formik.getFieldProps("password")}
                />
              </div>
              <button className='custom-btn' type="submit">Sign Up</button>
            </form>
            <p className='d-flex justify-content-center g-2 text2'>
              Already Have An Account? <span onClick={handleLoginClick}>Login</span>
            </p>
          </div>

          {/* Toast container for displaying notifications */}
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

          {loading && (
            <div className="loading-container">
              <ReactLoading type="spinningBubbles" color="#ed7632" />
            </div>
          )}
        </div>
      ) :
      (
        <div className='vh-100 d-flex justify-content-center align-items-center bg-color'>
          <div className="outer-container">
            <p className='title'>Verify your email</p>
            <p className='forgot-password-text'>
              We have sent a verification link to your email. Kindly verify to activate your account.
            </p>
            <hr className='line' />
            <p className='d-flex justify-content-center mt-0 p-0 text2 login'>
              <span onClick={handleLoginClick}>Return to Login page</span>
            </p>
          </div>
        </div>
      )
  );
};

export default SignUpPage;

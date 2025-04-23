import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();  // Step 1: Use form hook to get form instance

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await axios.post('/api/users/register', values);
            message.success('Registration Successful');
            form.resetFields();  // Step 2: Reset form fields after successful registration
            setLoading(false);
            // After successful registration, navigate to the login page
            navigate('/login');  // Redirect to the login page

        } catch (error) {
            setLoading(false);
            // Check if the error has a message to display
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message); // Show specific error message
            } else {
                message.error('Oops! Registration Failed'); // Default error message
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem('moneytracker-user')) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className='register'>
            {loading && <Spinner />}
            <div className="row justify-content-center align-items-center w-100 h-100">
                {/* Lottie Animation */}
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
                            background="transparent"
                            speed="1"
                            loop
                            autoplay
                        ></lottie-player>
                    </div>
                </div>

                {/* Form Section */}
                <div className="col-md-4">
                    <Form layout='vertical' onFinish={onFinish} form={form}> {/* Step 3: Attach form instance */}
                        <h1 className="page-title">Get Started with MONEY TRACKER</h1>
                        <p className="form-intro">One Step Closer to Better Budgeting</p>

                        <Form.Item
                            label="Username"
                            name="name"
                            rules={[
                                { required: true, message: 'Username is a required field' },
                                { min: 3, message: 'Username must be at least 3 characters long' }
                            ]}
                        >
                            <Input placeholder="Choose a username" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Email is a required field' },
                                { type: 'email', message: 'Please enter a valid email address (name@example.com)' }
                            ]}
                        >
                            <Input placeholder="name@example.com" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Password is a required field' },
                                { min: 6, message: 'Password must be at least 6 characters long' }
                            ]}
                        >
                            <Input.Password placeholder="Choose a secure password" />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link className="auth-link" to="/login">Already Registered? Click Here To Login</Link>
                            <button className='primary' type='submit'>REGISTER</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;

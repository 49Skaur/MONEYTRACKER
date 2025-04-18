import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm(); // ✅ Step 1: Use form hook

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', values);
            localStorage.setItem('moneytracker-user', JSON.stringify({ ...response.data, password: '' }));
            message.success('Login successful');
            form.resetFields(); // ✅ Step 2: Clear form after success
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message); // show server message
            } else {
                message.error('Login failed. Please try again.');
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem('moneytracker-user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='login'>
            {loading && <Spinner />}
            <div className="row justify-content-center align-items-center w-100 h-100">
                {/* Form Section */}
                <div className="col-md-4">
                    <Form layout='vertical' onFinish={onFinish} form={form}> {/* ✅ Step 3: Attach form instance */}
                        <h1 className="page-title">MONEY TRACKER Login</h1>
                        <p className="form-intro">One Step Closer to Better Budgeting</p>

                        <Form.Item
                            label='Email'
                            name='email'
                            rules={[
                                { required: true, message: 'Email is required' },
                                { type: 'email', message: 'Enter a valid email address (name@example.com)' }
                            ]}
                        >
                            <Input placeholder="name@example.com" />
                        </Form.Item>

                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[
                                { required: true, message: 'Password is required' },
                                { min: 6, message: 'Password must be at least 6 characters' }
                            ]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link className="auth-link" to="/register">Not Registered Yet? Click Here To Register</Link>
                            <button className='primary' type='submit'>LOGIN</button>
                        </div>
                    </Form>
                </div>

                {/* Lottie Animation */}
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player
                            src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
                            background="transparent"
                            speed="1"
                            loop
                            autoplay
                        ></lottie-player>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

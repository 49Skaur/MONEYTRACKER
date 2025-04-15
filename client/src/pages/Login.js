import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Password from 'antd/es/input/Password';
import Spinner from '../components/Spinner';


function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', values)
            localStorage.setItem('moneytracker-user', JSON.stringify({ ...response.data, password: '' }));
            setLoading(false)
            message.success('Login successful');
            navigate('/')
        }
        catch (error) {
            setLoading(false)
            message.error('Login Failed!');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('moneytracker-user')) {
            navigate("/")
        }
    }, [])

    return (
        <div className='login'>
            {loading && <Spinner />}
            <div className="row justify-content-center align-items-center w-100 h-100">
                {/* Form Section */}
                <div className="col-md-4">
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1 className="page-title">MONEY TRACKER Login</h1>
                        <p className="form-intro">One Step Closer to Better Budgeting</p>

                        <Form.Item label='Email' name='email'>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Password' name='password'>
                            <Input type="password" />
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
                        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
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

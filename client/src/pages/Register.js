import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Register() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(true);
    const onFinish = async (values) => {
        try {
            setLoading(true)
            await axios.post('/api/users/register', values)
            message.success('Registration Successful')
            setLoading(false)
        }
        catch (error) {
            message.error('Oops! Registration Failed')
            setLoading(false)
        }
    }

    useEffect(() => {
            if (localStorage.getItem('moneytracker-user')) {
                navigate("/")
            }
        }, [])
    

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
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1 className="page-title">Get Started with MONEY TRACKER</h1>
                        <p className="form-intro">One Step Closer to Better Budgeting</p>

                        <Form.Item label='Name' name='name'>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Email' name='email'>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Password' name='password'>
                            <Input type="password" />
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

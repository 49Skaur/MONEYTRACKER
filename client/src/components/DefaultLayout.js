import React from 'react';
import '../resources/default-layout.css';
import { Button, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('moneytracker-user'))
  const navigate = useNavigate()
  const items = [
    {
      label: (
        <li onClick={() => {
          localStorage.removeItem('moneytracker-user')
          navigate("/login");
        }}> Logout</li>
      ),
    },

  ];
  return (
    <div className='layout'>
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">MONEY TRACKER</h1>
        </div>
        <div>
          <Dropdown menu={{ items }} placement="bottomLeft" arrow>
            <button className='user-menu-btn'>{user?.name || 'Menu'}</button>
          </Dropdown>
        </div>
      </div>

      <div className="content">
        {props.children} {/* This will render the page content */}
      </div>
    </div>
  );
}

export default DefaultLayout
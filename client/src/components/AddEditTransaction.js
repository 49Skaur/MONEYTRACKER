import React, { useState } from 'react'
import { Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';
import Spinner from "./Spinner";

function AddEditTransaction({ setShowAddEditTransactionModal, showAddEditTransactionModal, selectedItemForEdit, setSelectedItemForEdit,
getTransactions
}) {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("moneytracker-user"))
            setLoading(true);
            if(selectedItemForEdit){
                await axios.post('/api/transactions/edit-transaction', {
                    payload : {
                        ...values, userid: user._id,
                    },
                    transactionId : selectedItemForEdit._id,    
                });
                getTransactions()
                message.success('Transaction Updated Successfully!');
            }
            else{
                await axios.post('/api/transactions/add-transaction', {
                    ...values, userid: user._id,
    
                });
                getTransactions()
                message.success('Transaction Added Successfully!');
            }
            setShowAddEditTransactionModal(false);
            setSelectedItemForEdit(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // Check if the error has a message to display
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message); // Show specific error message
            } else {
                message.error('Oops! Something went wrong!!'); // Default error message
            }
        }
    };
    return (
        <div>
            <Modal
                title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
                visible={showAddEditTransactionModal}
                onCancel={() => setShowAddEditTransactionModal(false)}
                footer={false}
            >
                {loading && <Spinner />}
                <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>
                    <Form.Item label="Amount" name='amount' rules={[{ required: true, message: 'Please enter an amount' },
                    {
                        pattern: /^\d+(\.\d{1,2})?$/,
                        message: 'Please enter a valid number (up to 2 decimal places)',
                    },
                    {
                        validator: (_, value) =>
                            value && parseFloat(value) > 0
                                ? Promise.resolve()
                                : Promise.reject('Amount must be greater than 0'),
                    },

                    ]}>
                        <Input type='text' />
                    </Form.Item>

                    <Form.Item label="Type" name='type' rules={[{ required: true, message: 'Please select a type' }]}
                    >
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Category" name='category'
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select>
                            <Select.OptGroup label="Income">
                                <Select.Option value="salary">Salary</Select.Option>
                                <Select.Option value="freelance">Freelance</Select.Option>
                            </Select.OptGroup>

                            <Select.OptGroup label="Expenses">
                                <Select.Option value="rent">Rent</Select.Option>
                                <Select.Option value="utilities">Utilities</Select.Option>
                                <Select.Option value="food">Food</Select.Option>
                                <Select.Option value="entertainment">Entertainment</Select.Option>
                                <Select.Option value="education">Education</Select.Option>
                                <Select.Option value="medical">Medical</Select.Option>
                                <Select.Option value="travel">Travel</Select.Option>
                            </Select.OptGroup>

                            <Select.OptGroup label="Other">
                                <Select.Option value="other">Other</Select.Option>
                            </Select.OptGroup>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Date" name='date' rules={[{ required: true, message: 'Please select a date' }]}
                    >
                        <Input
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                        />
                    </Form.Item>

                    <Form.Item label="Reference" name='reference' rules={[{ required: true, message: 'Please enter a reference' }]}
                    >
                        <Input type='text' />
                    </Form.Item>

                    <Form.Item label="Description" name='description' rules={[{message: 'Please enter a description' }]}
                    >
                        <Input type='text' />
                    </Form.Item>

                    <div className="d-flex justify-content-end">
                        <button className="primary" type='submit'>SAVE</button>
                    </div>

                </Form>

            </Modal>
        </div>
    )
}

export default AddEditTransaction;



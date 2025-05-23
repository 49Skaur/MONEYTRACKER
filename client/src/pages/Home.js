import React, { useEffect, useState } from 'react';
import { message, Table, Select, DatePicker, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';
import AddEditTransaction from '../components/AddEditTransaction';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from "moment";
import { UnorderedListOutlined, DotChartOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';

const { RangePicker } = DatePicker;

function Home() {
    const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
    const [transactionsData, setTransactionsData] = useState([]);
    const [frequency, setFrequency] = useState('all');
    const [type, setType] = useState('all');
    const [selectedRange, setSelectedRange] = useState([]);
    const [viewType, setViewType] = useState('table')
    const getTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("moneytracker-user"))
            setLoading(true);
            const response = await axios.post('/api/transactions/get-all-transactions', {
                userid: user._id,
                frequency,
                ...(frequency === 'custom' && {
                    selectedRange: [
                        selectedRange[0].toISOString(),
                        selectedRange[1].toISOString()
                    ]
                }),
                type
            });
            setTransactionsData(response.data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error("!Something went wrong!");
        }
    }

    const deleteTransaction = async (record) => {
        try {
            setLoading(true);
            await axios.post('/api/transactions/delete-transaction', {
                transactionId: record._id
            });
            message.success("Transaction Deleted Successfully")
            getTransactions(); // Add this line to refresh the table
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error("Delete - Something went wrong!");
        }
    }

    useEffect(() => {
        if (frequency === 'custom') {
            // Only fetch if both dates are selected
            if (selectedRange.length === 2) {
                getTransactions();
            }
        } else {
            getTransactions();
        }
    }, [frequency, selectedRange, type]);


    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment.utc(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Reference",
            dataIndex: "reference",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                return <div>
                    <EditOutlined onClick={() => {
                        setSelectedItemForEdit(record)
                        setShowAddEditTransactionModal(true)
                    }} />
                    <Popconfirm
                        title="Are you sure you want to delete this transaction?"
                        onConfirm={() => deleteTransaction(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined className='mx-3' />
                    </Popconfirm>

                </div>
            }
        }
    ]

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <div className="filter d-flex justify-content-between align-items-center">
                <div className='d-flex'>
                    <div className='d-flex flex-column'>
                        <h6>Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value="all">All Transactions</Select.Option>
                            <Select.Option value="7">Last 1 Week</Select.Option>
                            <Select.Option value="30">Last 1 Month</Select.Option>
                            <Select.Option value="365">Last 1 Year</Select.Option>
                            <Select.Option value="custom">Custom</Select.Option>
                        </Select>

                        {frequency === 'custom' && (
                            <div className="mt-2">
                                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)}
                                    disabledDate={(current) => current && current > new Date()} />
                                <button
                                    className="clear-range-btn"
                                    onClick={() => setSelectedRange([])}
                                >
                                    Clear Date Range
                                </button>
                            </div>
                        )}
                    </div>
                    <div className='d-flex flex-column mx-5'>
                        <h6>Select Type</h6>
                        <Select value={type} onChange={(value) => setType(value)}>
                            <Select.Option value="all">All</Select.Option>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </div>

                    <div className='d-flex flex-column mx-5'>
                        <button
                            className="clear-filter-btn"
                            onClick={() => {
                                setFrequency('all');
                                setType('all');
                                setSelectedRange([]);
                                message.success("Filters have been reset.");
                            }}
                        >
                            Clear Filters
                        </button>

                    </div>

                </div>
                <div className='d-flex'>
                    <div>
                        <div className='view-switch mx-5'>
                            <UnorderedListOutlined className={`mx-2 ${viewType === 'table' ? 'active-icon' : 'inactive - icon'}`}
                                onClick={() => setViewType('table')} />
                            <DotChartOutlined className={`${viewType === 'analytics' ? 'active-icon' : 'inactive - icon'}`}
                                onClick={() => setViewType('analytics')} />
                        </div>
                    </div>

                    <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}>
                        ADD NEW
                    </button>
                </div>
            </div>
            <br></br>
            <div className="table-analytics">
                {(frequency !== 'custom' || selectedRange.length === 2) ? (
                    viewType === 'table' ? (
                        <div className="table">
                            <Table columns={columns} dataSource={transactionsData} />
                        </div>
                    ) : (
                        <Analytics transactions={transactionsData} />
                    )
                ) : (
                    <div className="text-center text-muted mt-3">
                        Please select a date range to view transactions.
                    </div>
                )}
            </div>

            {/* Correct conditional rendering */}
            {showAddEditTransactionModal && (
                <AddEditTransaction
                    showAddEditTransactionModal={showAddEditTransactionModal}
                    setShowAddEditTransactionModal={setShowAddEditTransactionModal}
                    selectedItemForEdit={selectedItemForEdit}
                    getTransactions={getTransactions}
                    setSelectedItemForEdit={setSelectedItemForEdit}
                />
            )}
        </DefaultLayout>
    );
}

export default Home;
import React from 'react';
import { Progress } from 'antd';
import '../resources/analytics.css'

function Analytics({ transactions }) {
    const totalTransactions = transactions.length
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense')
    const totalIncomeTransactionsPercentage = totalTransactions === 0 ? 0 : (totalIncomeTransactions.length / totalTransactions) * 100;
    const totalExpenseTransactionsPercentage = totalTransactions === 0 ? 0 : (totalExpenseTransactions.length / totalTransactions) * 100;

    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverPercentage = totalTurnover === 0 ? 0 : (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercentage = totalTurnover === 0 ? 0 : (totalExpenseTurnover / totalTurnover) * 100;

    const categories = ['salary', 'freelance', 'rent', 'utilities', 'food', 'entertainment', 'education', 'medical', 'travel', 'other']
    return (
        <div className='analytics'>
            <div className='row'>
                <div className='col-md-4 mt-3'>
                    <div className='transactions-count'>
                        <h4>Total Transactions Count: {totalTransactions}</h4>
                        <hr />
                        <h5>Income : {totalIncomeTransactions.length}</h5>
                        <h5>Expense : {totalExpenseTransactions.length}</h5>

                        <div className='progress-bars'>
                            <Progress
                                className='mx-5'
                                strokeColor='green'
                                type='circle'
                                percent={totalIncomeTransactionsPercentage.toFixed(0)}
                                format={percent => `${percent}%`}
                            />

                            <Progress
                                strokeColor='red'
                                type='circle'
                                percent={totalExpenseTransactionsPercentage.toFixed(0)}
                                format={percent => `${percent}%`}
                            />

                        </div>
                    </div>
                </div>

                <div className='col-md-4 mt-3'>
                    <div className='transactions-count'>
                        <h4>Total Turnover: {totalTurnover}</h4>
                        <hr />
                        <h5>Income : {totalIncomeTurnover}</h5>
                        <h5>Expense : {totalExpenseTurnover}</h5>

                        <div className='progress-bars'>
                            <Progress
                                className='mx-5'
                                strokeColor='green'
                                type='circle'
                                percent={totalIncomeTurnoverPercentage.toFixed(0)}
                                format={percent => `${percent}%`}
                            />

                            <Progress
                                strokeColor='red'
                                type='circle'
                                percent={totalExpenseTurnoverPercentage.toFixed(0)}
                                format={percent => `${percent}%`}
                            />

                        </div>
                    </div>
                </div>

            </div>
            <div className='row mt-5'>
                <div className='col-md-6'>
                    <div className='category-analysis'>
                        <h4>Income - Category Wise</h4>
                        {
                            categories.map((category) => {
                                const amount = transactions.filter(t => t.type == 'income' && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                                return (
                                    amount > 0 && <div className='category-card'>
                                        <h5>{category}</h5>
                                        <Progress
                                            percent={totalIncomeTurnover > 0 ? ((amount / totalIncomeTurnover) * 100).toFixed(0) : 0}
                                            format={percent => `${percent}%`}
                                        />
                                    </div>
                                );


                            })
                        }
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='category-analysis'>
                        <h4>Expense - Category Wise</h4>
                        {
                            categories.map((category) => {
                                const amount = transactions.filter(t => t.type == 'expense' && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                                return (
                                    amount > 0 && <div className='category-card'>
                                        <h5>{category}</h5>
                                        <Progress
                                            percent={totalExpenseTurnover > 0 ? ((amount / totalExpenseTurnover) * 100).toFixed(0) : 0}
                                            format={percent => `${percent}%`}
                                        />
                                    </div>
                                );


                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;

import React, { useEffect, useState, useMemo } from 'react';
import { fetchTransactions } from '../services/apiService';
import { calculateRewardPoints } from '../utils/rewardPointsCalculator';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';


const RewardPointsCalculator = () => {
    // Set up initial states
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch transaction data when the component mounts
    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                // Fetch the transaction data
                const data = await fetchTransactions();
                // Update the transactions state with the fetched data
                setTransactions(data);
                // Set loading state to false since data is fetched
                setLoading(false);
            } catch (error) {
                // Handle error if data fetching fails
                setError('Error fetching transaction data.');
                // Set loading state to false even if there is an error
                setLoading(false);
            }
        };

        fetchTransactionData();
    }, []);

    // Calculate reward points per customer and month
    const calculateRewardPointsPerMonth = useMemo(() => {
        const rewardPointsPerMonth = {};

        transactions.forEach((transaction) => {
            const { customerId, amount, date } = transaction;
            // Calculate reward points for each transaction
            const reward = calculateRewardPoints(amount);
            // Get the month from the transaction date
            const month = new Date(date).toLocaleString('default', { month: 'long' });

            // Initialize the reward points for the customer and month if they don't exist
            if (!rewardPointsPerMonth[customerId]) {
                rewardPointsPerMonth[customerId] = {};
            }

            if (!rewardPointsPerMonth[customerId][month]) {
                rewardPointsPerMonth[customerId][month] = 0;
            }

            // Add the calculated reward points to the corresponding customer and month
            rewardPointsPerMonth[customerId][month] += reward;
        });

        return rewardPointsPerMonth;
    }, [transactions]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorBoundary error={error} />;
    }

    return (
        <div className='flex flex-col h-screen items-center justify-center gap-2'>
            <h2 className='text-3xl'>Reward Points Calculator</h2>
            <div className='overflow-x-auto'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='text-sm'>Customer ID</th>
                            <th className='text-sm'>Month</th>
                            <th className='text-sm'>Reward Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(calculateRewardPointsPerMonth).map(([customerId, pointsPerMonth]) =>
                            Object.entries(pointsPerMonth).map(([month, points]) => (
                                <tr key={`${customerId}-${month}`} className="hover text-center font-medium">
                                    <td >{customerId}</td>
                                    <td>{month}</td>
                                    <td>{points}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RewardPointsCalculator;

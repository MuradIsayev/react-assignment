import { transactionData } from '../transactionData';

export const fetchTransactions = () => {
    return new Promise((resolve) => {
        // Simulate an asynchronous API call
        setTimeout(() => {
            resolve(transactionData);
        }, 1500);
    });
};
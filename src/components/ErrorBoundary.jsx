const ErrorBoundary = ({ error }) => {
    return (
        <div>
            <h2>Reward Points Calculator</h2>
            <div>Error: {error}</div>
        </div>
    );
}

export default ErrorBoundary;
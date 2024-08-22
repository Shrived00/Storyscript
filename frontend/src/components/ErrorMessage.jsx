import React from "react";
import Alert from '@mui/material/Alert';


const ErrorMessage = ({ children }) => {
    return (
        <Alert severity="error" style={{ fontSize: 20 }}>
            <strong>{children}</strong>
        </Alert>
    );
};

export default ErrorMessage;
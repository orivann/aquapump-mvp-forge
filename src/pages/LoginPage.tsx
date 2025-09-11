import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Authenticator>
                {({ signOut, user }) => {
                    if (user) {
                        return <Navigate to="/admin" />;
                    }
                    return <div></div>;
                }}
            </Authenticator>
        </div>
    );
};

export default LoginPage;

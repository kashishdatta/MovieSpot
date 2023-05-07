
import React from 'react'
import { Navigate } from 'react-router-dom'
// import Login from './Login';

// const useAuth = () => {
//     const user = { loggedIn: false };
//     return user && user.loggedIn;
// }


const Protected = (props) => {

    if (!localStorage.getItem('token')) {
        return <Navigate to='/sign-in' />
        // const isAuth = useAuth();
        // return isAuth ? <Outlet /> : <Navigate to="/" />;
    }
    return (
        <>
            {props.children}
        </>
    )

}

export default Protected
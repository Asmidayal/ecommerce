import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader';
import { Navigate } from 'react-router';
function ProtectedRoute({element, isAdminOnly=false}) {
    const{isAuthenticated,loading,user}=useSelector(state=>state.user);
    if(loading){
        return <Loader/>
    }
    if(!isAuthenticated){
        return<Navigate to='/login'/>
    }
    if(isAdminOnly && user.role!=='admin'){
        return <Navigate to='/'/>
    }
    return element
}
export default ProtectedRoute

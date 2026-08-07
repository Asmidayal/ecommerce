import React from 'react'
import '../AdminStyles/UsersList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { Link } from 'react-router'
import {Delete , Edit } from '@mui/icons-material'
import {fetchUsers, removeErrors, clearMessage,deleteUser} from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'


const UsersList = () => {
  const { users, loading, error, message } = useSelector((state) => state.admin);
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);
useEffect(()=>{
if(error){
  toast.error(error,{position :'top-center' ,autoclose:3000})
  dispatch(removeErrors())
}
},[error,dispatch])

const handleDelete = (userId) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    dispatch(deleteUser(userId));
  }
}
useEffect(() => {
  if (error) {
    toast.error(error, { position: 'top-center', autoClose: 3000 });
    dispatch(removeErrors());
  }
  if (message) {
    toast.success(message, { position: 'top-center', autoClose: 3000 });
    dispatch(clearMessage());
    navigate('/admin/dashboard'); // Navigate to the users list page after deletion
  }
}, [dispatch, error,message]);
  return (
    <>
 {loading?(<Loader/>):(  <>
 <Navbar/>
  <PageTitle title='all users'/>
  <div className="usersList-container">
  <h1 className="usersList-title">All Users</h1>
  <div className="usersList-table-container">
    <table className="usersList-table">
  <thead>
    <tr>
      <th>SNo.</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    
 {users.map((user,index)=>(
   <tr key={user._id}>
        <td>{index+1}</td>
         <td>{user.name}</td>
          <td>{user.email}</td>
           <td>{user.role}</td>
            
             <td>
                <Link to={`/admin/user/${user._id}`} className='action-icon edit-icon'><Edit/></Link>
                <button className='action-icon delete-icon' onClick={() => handleDelete(user._id)}><Delete/></button>
             </td>
    </tr>
 ))  
}
  </tbody>
</table>
  </div>
</div>
  <Footer/>
  </>
) }
</>
  )
}

export default UsersList

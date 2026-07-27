import React from 'react'
import '../AdminStyles/UsersList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { Link } from 'react-router'
import {Delete , Edit } from '@mui/icons-material'
import {fetchUsers, removeErrors} from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify'


const UsersList = () => {
  const { users, loading, error } = useSelector((state) => state.admin);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);
useEffect(()=>{
if(error){
  toast.error(error,{position :'top-center' ,autoclose:3000})
  dispatch(removeErrors())
}
},[error,dispatch])

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
                <button className='action-icon delete-icon'><Delete/></button>
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

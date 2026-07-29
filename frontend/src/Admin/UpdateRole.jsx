import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import '../AdminStyles/UpdateRole.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { getSingleUser } from '../features/admin/adminSlice'


const UpdateRole = () => {
    const { userId } = useParams();
const { user, success, loading, error } = useSelector((state) => state.admin);
const dispatch = useDispatch();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  role: ""
});
const{name,email,role}=formData;
useEffect(() => {
  dispatch(getSingleUser(userId));

}, [dispatch])

useEffect(() => {
  if (user) {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    })
  }
}, [user])
  return (
  <>
  <Navbar/>
  <PageTitle title='update role'/>
  <div className='page-wrapper'>
    <div className='update-user-role-container'>
        <h1 >Update User Role</h1>
        <form className='update-user-role-form'>
<div className="form-group">
  <label htmlFor="name">Name</label>
  <input 
    type="text" 
    id="name" 
    name="name" 
    value={name}
    readOnly 
  />
</div>
<div className="form-group">
  <label htmlFor="Email">Email</label>
  <input 
    type="text" 
    id="Email" 
    name="Email" 
    value={email}
     // Pass your state/prop value here
    readOnly 
  />
</div>
<div className="form-group">
  <label htmlFor="Role">Role</label>
  <select id='role' name='role'required value={role}>
<option value=''>Select Category</option>
<option value='user'>User</option>
<option value='admin'>Admin</option>
  </select>
</div>
<button type="submit" className="btn btn-primary">
    Update Role
  </button>
        </form>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default UpdateRole

import React from 'react'
import '../AdminStyles/UsersList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'

const UsersList = () => {
  return (
    <>
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
      <th>CreatedAt</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>1</td>
         <td>Asmi</td>
          <td>asmidayal15@gmail.com</td>
           <td>admin</td>
            <td>25-5-26</td>
             <td>
                <Link to="/admin/user/:userId" className='action-icon edit-icon'><Edit/></Link>
                <button className='action-icon delete-icon'><Delete/></button>
             </td>
    </tr>
  </tbody>
</table>
  </div>
</div>
  <Footer/>
  </>
  )
}

export default UsersList

import React from 'react'
import '../componentStyles/Footer.css'
import {Phone ,Mail, Instagram, Facebook, Twitter} from '@mui/icons-material'
const Footer = () => {
  return (
    <div>
      <footer className='footer'>
      <div className='footer-container'>
        {/*section1*/}
        <div className='footer-section contact'>
            <h3>Contact Us</h3>
            <p><Phone fontSize='small'/> Phone: 9818696064</p>
            <p><Mail fontSize='small'/> Email: asmidayal15@gmail.com</p>
        </div>
        {/*section2*/}
        <div className='footer-section social'>
            <h3>Follow Us</h3>
            <div className='social-links'>
                <a href="" target='_blank'>
                 <Instagram className='social-icon'/>   
                </a>
                <a href="" target='_blank'>
                 <Facebook className='social-icon'/>   
                </a>
                  <a href="" target='_blank'>
                 <Twitter className='social-icon'/>   
                </a>
            </div>
        </div>
        {/*section*/}
        <div className='footer-section about'>
            <h3>About</h3>
            <p>From velvet mattes to high-shine glosses,we create the tools you need to define your own version of beauty</p>
        </div>
       </div>
       <div className='footer-bottom'>
        <p> &copy; Made with Love </p>
       </div>
      </footer>
    </div>
  )
}

export default Footer

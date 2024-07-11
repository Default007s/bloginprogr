import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import { CiYoutube } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoodreadsG } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className='Footer'>
        <div className='LeftFoot'>
        
        <p>Ipsum voluptate et irure dolore quis deserunt commodo adipisicing enim aliquip adipisicing. Sint reprehenderit deserunt irure incididunt irure reprehenderit duis reprehenderit reprehenderit incididunt veniam. Aute est magna et id aute consectetur velit est officia est dolor qui. Do ut duis ad consequat sunt commodo. Quis dolore nisi id occaecat proident aute commodo qui do laborum est. Nisi sunt reprehenderit pariatur esse id labore Lorem.</p>
        <p className='madeBy'>Made by <Link to="">Ahmed Jalal</Link></p>
        </div>
        <div className='RightFoot'>
          <div className='LinkFoot'>
            <Link to="/">Home</Link>
            <Link to="/">Essays</Link>
            <Link to="/">Login</Link>
            <Link to="/">Signup</Link>
          </div>
          <div className='SocialFoot'>
            <Link to="https://www.youtube.com/@_titanslayer_"><p>Youtube</p> <CiYoutube /></Link>
            <Link to="instagram.com/_the_titan_slayer_"><p>Instagram</p> <CiInstagram /></Link>
            <Link to="twitter.com/_titanslayer_"><p>X</p> <FaXTwitter /></Link>
            <Link to="goodreads.com/review/list/104769943?ref=nav_mybooks"><p>Goodreads</p> <FaGoodreadsG /></Link>
          </div>
        </div>
    </div>
  )
}

import React from 'react'
import proj from '../../../Images/proj.webp'
import './HomeInterests.css'
import { motion } from "framer-motion"

export default function HomeInterests() {
  return (
    <div className='HomeInterests'>
          <img src={proj}></img>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1, x: [-300, 0] }}
            transition={{ ease: "easeOut", duration: 1 }} className='interests'>
            <button id='interest1'>Islam</button>
            <button id='interest2'>Theology</button>
            <button id='interest3'>History</button>
            <button id='interest4'>Philosophy</button>
            <button id='interest5'>Mathematics</button>
            <button id='interest6'>Metaphysics</button>
            <button id='interest7'>Courses</button>
          </motion.div>
    </div>
  )
}

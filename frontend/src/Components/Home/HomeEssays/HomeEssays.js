import React, {useEffect, useState} from 'react'
import './HomeEssays.css'

export default function HomeEssays() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchEssays = async()=>{
            await fetch('http://localhost:4000/getEssays').then(res =>{
                res.json().then(posts => {
                    setPosts(posts)
                })
            })
        }
        fetchEssays()
    }, [])
    return (
    <div className='HomeEssays'>
        <h1 className='fromblogh1'>From the Blog</h1>
        <div className='HomeEssaysContainer'>
            <button className='HomeSingularEssay'>
                <h1>On Language & Tradition: Thoughts on Dr Noman Ul Haq’s Shehrazad in Paris</h1>
                <p>March 10, 2024</p>
            </button>
            <button className='HomeSingularEssay'>
                <h1>On Language & Tradition: Thoughts on Dr Noman Ul Haq’s Shehrazad in Paris</h1>
                <p>March 10, 2024</p>
            </button>
            <button className='HomeSingularEssay'>
                <h1>On Language & Tradition: Thoughts on Dr Noman Ul Haq’s Shehrazad in Paris</h1>
                <p>March 10, 2024</p>
            </button>
        </div>
    </div>
  )
}

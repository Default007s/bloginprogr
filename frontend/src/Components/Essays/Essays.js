import React, {useEffect, useState} from 'react'
import './Essays.css'
import {format} from 'date-fns'
import { Link } from 'react-router-dom'
import Select from 'react-select'

const options = [
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'history', label: 'History' },
    { value: 'theology', label: 'Theology' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'metaphysics', label: 'Metaphysics' }
  ]

export default function Essays() {
    const [posts, setPosts] = useState([])
	const [search, setSearch] = useState("");
    const [searchTags, setSearchTags] = useState([])
    let searchTagDataArray = [];
    searchTags.map(tag => {
        searchTagDataArray.push(tag.label)
    })
    let searchTagData = searchTagDataArray.toString()

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
        <div className='Essays'>
            <div className="searchEssays">
                <input onChange={(e)=>{setSearch(e.target.value)}} className='searchEssayInp' placeholder='Search by Title...'/>
                <Select placeholder="Select Tags..." value={searchTags} onChange={choice => {setSearchTags(choice)}} className='selectMultiple' isMulti options={options} />
            </div>
            {
            posts.filter((essay) => essay.tags.includes(searchTagData))
                .filter( essay => essay.title.toLowerCase().includes(search))
                .map(post => {
                    let tagsData = post.tags.split(',')
                    let presentableTagData = ''
                    for (let i = 0; i < tagsData.length; i++) {
                        if(i === tagsData.length - 1){
                            presentableTagData += `${tagsData[i]}`
                        } else{
                            presentableTagData += `${tagsData[i]} | `
                        }
                    }
                    return(
                        <div className='singleEssay'>
                            <div className='singleEssayImg'>
                                <Link to={`/essays/${post._id}`}>
                                    <img src={'http://localhost:4000/'+ post.cover}></img>
                                </Link>
                            </div>
                            <div className='singleEssayTxt'>
                                <p>{presentableTagData}</p>
                                <Link to={`/essays/${post._id}`}><h1>{post.title}</h1></Link>
                                <p>{post.summary}</p>
                                <p>{format(new Date(post.createdAt), 'MMM d, yyyy')}</p>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

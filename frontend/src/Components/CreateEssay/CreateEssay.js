import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import Editor from '../Editor/Editor'
import './CreateEssay.css'
import {useNavigate} from 'react-router-dom'

const options = [
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'history', label: 'History' },
    { value: 'theology', label: 'Theology' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'metaphysics', label: 'Metaphysics' }
]

export default function CreateEssay() {
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const navigate = useNavigate()
    let tagsData = []

    useEffect(()=>{
        fetch('http://localhost:4000/checkUser',{
            method: 'GET',
            credentials: 'include'
        }).then(res => {
            if(!res.ok){
                navigate('/')
            }
        })
    },[])

    const handleSubmit = async (e) => {
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])
        tags.map(tag =>{tagsData.push(tag.label)})
        data.set('tags', tagsData)
        e.preventDefault()
        await fetch('http://localhost:4000/create', {
            method: 'POST',
            body: data,
            credentials: 'include'
        }).then(res => {
            if(res.ok){
                navigate('/essays')
            } else{
                navigate('/')
            }
        })
    }

    return (
        <div className='CreateEssay'>
            <form>
                <input value={title} onChange={e=>setTitle(e.target.value)} type="title" placeholder='Title'/>
                <input value={summary} onChange={e=>setSummary(e.target.value)} type="summary" placeholder='Summary'/>
                <Select value={tags} onChange={choice => {setTags(choice)}} className='selectMultiple' isMulti options={options} />
                <input onChange={e=>setFiles(e.target.files)} type="file" placeholder='File'/>
                <Editor onChange={setContent} value={content}/>
                <button onClick={handleSubmit}>Create Essay</button>
            </form>
        </div>
    )
}

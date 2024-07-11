import React, {useState, useEffect} from 'react'
import './EditEssay.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
import Editor from '../Editor/Editor'

const options = [
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'history', label: 'History' },
    { value: 'theology', label: 'Theology' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'metaphysics', label: 'Metaphysics' }
  ]

export default function EditEssay() {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const navigate = useNavigate()
    let tagsData = []

    useEffect((() => {
        fetch(`http://localhost:4000/essays/${id}`)
        .then(res => {
            res.json().then(postInfo=>{
                setTitle(postInfo.title)
                setTags(postInfo.tags)
                setSummary(postInfo.summary)
                setContent(postInfo.content)
                setFiles(postInfo.files)
            })
        })
    }
    ), [])

    const handleSubmit = (e) => {
        const data = new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        
        data.set('id', id)
        
        if(files?.[0]){
            data.set('file',files?.[0])
        }
        if(tags?.[0]){
            tags.map(tag => {tagsData.push(tag.label)})
            data.set('tags',tagsData)
        }
        e.preventDefault()
        fetch('http://localhost:4000/essay/edit', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        // navigate(`/essays/${id}`)
    }

    return (
        <div className='EditEssay'>
            <form>
                <input value={title} onChange={e=>setTitle(e.target.value)} type="title" placeholder='Title'/>
                <input value={summary} onChange={e=>setSummary(e.target.value)} type="summary" placeholder='Summary'/>
                <Select value={tags} onChange={choice=>{setTags(choice)}} className='selectMultiple' isMulti options={options} />
                <input onChange={e=>setFiles(e.target.files)} type="file" placeholder='File'/>
                <Editor onChange={setContent} value={content}/>
                <button onClick={handleSubmit}>Update Essay</button>
            </form>
        </div>
    )
}

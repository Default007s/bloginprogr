import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Editor.css'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}
const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const options = [
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'history', label: 'History' },
    { value: 'theology', label: 'Theology' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'metaphysics', label: 'Metaphysics' }
]


export default function Editor({value, onChange}) {
  return (
    <div>
    <ReactQuill value={value}
        onChange={onChange} 
        formats={formats} modules={modules}
        placeholder={"Write something here..."}
    /> 
    </div>
  )
}

import React, { useEffect, useState, useContext } from 'react'
import './EssayPage.css'
import { Link, useParams } from 'react-router-dom'
import {format} from 'date-fns'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {UserContext} from "../../UserContext"
import {useNavigate} from 'react-router-dom'

export default function EssayPage() {
    const [postInfo, setPostInfo] = useState()
    const userInfo = useContext(UserContext)
    const [isSuper, setIsSuper] = useState(false)
    const navigate = useNavigate();
    
    const {id} = useParams()
    useEffect(() =>{
        fetch(`http://localhost:4000/essays/${id}`)
        .then(response => {
            response.json().then(postInfo => setPostInfo(postInfo))
        })
    }, [])
    
    useEffect(()=>{
        fetch('http://localhost:4000/checkUser',{
            method: 'GET',
            credentials: 'include'
        }).then(res => {
            if(res.ok){
                setIsSuper(true)
            }
        })
    },[])

    const DeleteEssay = async () => {
        if(isSuper && window.confirm('Are you sure you want to Delete the Essay?')){
            await fetch(`http://localhost:4000/essays/delete/${postInfo._id}`,{
                method: 'DELETE',
                credentials: 'include'
            }).then(res =>{
                if(res.ok){
                    navigate('/essays')
                }
            })
        }
    }

    if(!postInfo) return ''

    else{
        return (
            <div className='EssayPage'>
                <h1 className='essayTitle'>{postInfo.title}</h1>
                <time className='createdAt'>{format(new Date(postInfo.createdAt), 'MMM d, yyyy')}</time>
                
                {isSuper && (
                    <div className='privilegeBtnGroup'>
                        <Link to={`/essays/edit/${postInfo._id}`}>
                            <div className="edit privilegeBtn">
                                    <FaRegEdit />
                                    <p>Edit</p>
                            </div>
                        </Link>
                        <div onClick={DeleteEssay} className="delete privilegeBtn">
                            <MdDelete />
                            <p>Delete</p>
                        </div>
                    </div>
                )}

                <div className="coverDiv">
                    <img className='essayCover' src={`http://localhost:4000/${postInfo.cover}`} alt="" />
                </div>
                <div className="essayText">
                    <div className='essayContent' dangerouslySetInnerHTML={{__html: postInfo.content}}/>
                </div>
            </div>
        )
    }
}

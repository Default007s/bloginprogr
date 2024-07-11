import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
export default function ShowNavFoot({children}) {
    const [show, setShow] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname ==='/login' || location.pathname ==='/register' ) {
            setShow(false);
        }else{
            setShow(true)
        }
    }, [location]);
  return (
    <div>
        {show && children}
    </div>
  )
}

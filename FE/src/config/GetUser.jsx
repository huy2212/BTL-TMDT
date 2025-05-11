import React, { useEffect ,useState} from 'react'

const GetUser = () => {
    const [user,setUser]= useState({})
    const localUser = localStorage.getItem("authorization")
    console.log(localUser)
    return JSON.parse(localUser)
}

export default GetUser
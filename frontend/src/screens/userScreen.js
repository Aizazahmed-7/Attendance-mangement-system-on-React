import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate,useLocation} from 'react-router-dom'
import { Container,Button, Alert } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { success,request,fail,logout,register,failRegister } from "../reducers/userReducer"

const UserScreen = () => {

    
    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,userInfo} =userLogin
     const [user ,setUser] = useState({...userInfo}); 
    const [alreadyMarked ,setAlreadyMarked] = useState(false); 
    console.log(userInfo,user)
    
    let present =0;
    let absent = 0;
    let leave = 0 ;
   



    const dispatch=useDispatch()
    const navigate = useNavigate();

const today= new Date();
const date1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const length = user.attendance.length -1

const markPresent = async (e)=>{
    
    if(length < 0){
      const {data} = await axios.put('/api/users/profile', {_id:user._id,presence:'P'})
      setUser(data)
      dispatch(success(data))
      localStorage.setItem('userInfo',JSON.stringify(data))
    }else{
    if(user.attendance[length].date === date1){
       
             setAlreadyMarked(true)
             window.scrollTo(0, 0);
    }else {
        const {data} = await axios.put('/api/users/profile', {_id:user._id,presence:'P'})
        setUser(data)
        dispatch(success(data))
        localStorage.setItem('userInfo',JSON.stringify(data))
    }
  }
}

const markAbsent = async (e) => {
    if(user.attendance[length].date === date1){
         setAlreadyMarked(true)
         window.scrollTo(0, 0);
    }else {
      
    const {data} = await axios.put('/api/users/profile', {_id:user._id,presence:'A'})
    setUser(data)
    dispatch(success(data))
    localStorage.setItem('userInfo',JSON.stringify(data))}
}


const requestLeave = async () =>{
    const {x} = await axios.put('/api/admin/leave', {_id:user._id,date:date1 })
    
}

user.attendance.forEach(element => {
  if(element.presence==='P'){
      present++;
  }
  if(element.presence==='A'){
      absent++;
  }
  if(element.presence==='L'){
      leave++;
  }
});

  return (<>
    <h1>{user.name} Successfuly logged in</h1>
     {console.log("hello")}
<Container>
  {alreadyMarked && <Alert variant='danger'> Attendace already makred for today </Alert>}
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>presence</th>
     
        </tr>
      </thead>
      <tbody>
      {user.attendance.map((obj,i)=>(
        
        <tr>
          <td>{i+1}</td>
          <td>{obj.date}</td>
          <td>{obj.presence}</td>
          
        </tr>
        
      ))}
        
      </tbody>
    </Table>
</Container>

<Container>
<Table striped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <th>Present</th>
          <th>Absent</th>
          <th>Leaves</th>      
        </tr>
      </thead>
      <tbody>
      
        
        <tr>
          <td>{present}</td>
          <td>{absent}</td>
          <td>{leave}</td>

        </tr>
      </tbody>
    </Table>
</Container>

<Container>
<Button onClick={markPresent} className='mx-5'>mark Present</Button>
<Button onClick={markAbsent} className='mx-5' >mark Absent</Button>
<Button onClick={requestLeave} className='mx-5' >Request leave</Button>
</Container>
    </>
  )
}

export default UserScreen

import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useLocation} from 'react-router-dom'
import {Container,Form,Button,Row,Col,Table} from 'react-bootstrap'
import {AdminLogin,listUser} from '../action/userActions'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { success } from '../reducers/userReducer'
import axios from 'axios'


const AdminPanel = () => {


const dispatch = useDispatch()

const userLogin = useSelector(state=>(state.userLogin))
const {loading,error,userInfo} =userLogin

const  listUser1 = useSelector(state=>(state.listUser))
const {loading2,userList} = listUser1

const navigate = useNavigate();
const location = useLocation();


console.log("re rendered")

useEffect(()=>{
    dispatch(listUser())
 
    console.log("use effect")
},[])


const handelLeave = async (e) => {
    const {data} = await axios.put('http://localhost:5000/api/admin/evaluateLeave',{index:e.target.value,name:e.target.name})
    dispatch(success(data))
    localStorage.setItem('userInfo',JSON.stringify(data))
}


const deleteUser = async (e) => {
console.log(e.target.value)
const {data} = await axios.put('http://localhost:5000/api/admin/delete',{_id:e.target.value})
dispatch(listUser())

}


if(!userList)
return null

  return (<>
  <Row>
    <Col>
    <h1>Admin</h1>
    </Col>
    <Col>
          <Link to={'/creat'}>  
          <Button> Creat new user</Button>
          </Link> 
    </Col>
  </Row>

    <Container>
  
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>details</th>
          <th>delete</th>
     
        </tr>
      </thead>
      <tbody>
      {userList.map((obj,i)=>(
        
        <tr>
          <td>{i+1}</td>
          <td>{obj.name}</td>
          <td><Link to={`/details/${obj._id}`}><Button>Get details</Button></Link></td>
          <td><Button onClick={deleteUser} value={obj._id} >Delete</Button></td> 
        </tr>
        
      ))}
        
      </tbody>
    </Table>
</Container>
<Container>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>Leave for</th>
          <th>Accept/Reject</th>
        </tr>
      </thead>
      <tbody>
      {userInfo.leaves.map((obj,i)=>(
        
        <tr>
          <td>{i+1}</td>
          <td>{obj.user}</td>
          <td>{obj.date}</td>
          <td><Button onClick={handelLeave} value={i} name='Accept' >Accept</Button><Button onClick={handelLeave} name='Reject' value={i} style={{"margin-left":"20px"}} >Reject</Button></td>
        </tr>
        
      ))}
        
      </tbody>
    </Table>
</Container>
    </>)
}

export default AdminPanel
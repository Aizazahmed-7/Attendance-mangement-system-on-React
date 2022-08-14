import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { Container,Button, Alert, Row, Col ,Form} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { getUserProfile } from '../action/userActions'


const AdminUserScreen = () => {

    
    const prams =useParams()
    const userr = useSelector(state=>(state.userr))
    const {loading,error,user} = userr
    const [from , setFrom] = useState(0)
    const [to , setTo] = useState(100)


    console.log("user screen re-rendered")
   
    let present = 0;
    let absent = 0;
    let leave = 0 ;
     
    


const dispatch = useDispatch()
const navigate = useNavigate();
    
useEffect(()=>{
  dispatch(getUserProfile(prams.id))
  console.log(" use effect")
},[])


const ChangeAttendance = async (e) =>{
  const {data} = await axios.put(`http://localhost:5000/api/users/${prams.id}`,{index:e.target.value})    
  dispatch(getUserProfile(prams.id))
}

if(!user)
return null

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

const fromChange = (e) => {
  console.log(e.target.value)
  setFrom(e.target.value)
}


const toChange = (e) => {
  console.log(e.target.value)
  setTo(e.target.value)
}


return (<>

    <h1>{user.name} Successfuly logged in</h1>


<Container>

<Form>
<Row>
<Col>
<Form.Group >
<Form.Label column sm={2}>From : </Form.Label>
<Form.Select onChange={fromChange}>
{user.attendance.map((obj,i)=>(
      <option value={i}> {obj.date} </option>
  
))}
    </Form.Select>
</Form.Group>
</Col>

<Col>
<Form.Group >
<Form.Label column sm={2}> To : </Form.Label>
<Form.Select onChange={toChange} >
{user.attendance.map((obj,i)=>(
      <option value={i}> {obj.date} </option>
  
))}
    </Form.Select>
</Form.Group>
</Col>

</Row>
</Form>

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
        
       i>=from && i<=to ? (<tr>
          <td>{i+1}</td>
          <td>{obj.date}</td>
          <td>{obj.presence}</td>
          <td><Button value={i} onClick={ChangeAttendance} >Change</Button></td>

        </tr>) : null
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
    </>
  )
}

export default AdminUserScreen
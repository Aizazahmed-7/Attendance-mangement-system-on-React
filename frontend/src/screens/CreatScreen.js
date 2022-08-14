import axios from 'axios'
import React, { useState } from 'react'
import { Form ,Button, Alert} from 'react-bootstrap'

const CreatScreen = () => {
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [image , setImage] = useState("")
    const [data , setData] = useState(null)
    const [creadted,setCreated] = useState(false)

    const CreateUser = async (e) => {    
        e.preventDefault()
        console.log(name,email,password)
        try {
            const {data} = await axios.post('http://localhost:5000/api/users/create',{name,email,password,image})
            setCreated(true)
        } catch (error) {
            console.log(error)
            setData(error.response.data.message)
        } 
    } 

    if(data){
        return ( <Alert variant='danger'>{data}</Alert> )
    }
    if(creadted){
        return (<Alert variant='info'>User Created Sucsessfuly</Alert>)
    }

  return (
    <div>
        <Form onSubmit={CreateUser}>

        <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value) }/>
        <Form.Text className="text-muted">
          Enter your name
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value) } />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Image URL" value={image} onChange={(e)=>setImage(e.target.value) }/>
        <Form.Text className="text-muted">
          Enter Image URL
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value) } />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
       
      </Form.Group>
      <Button variant="primary" type="submit" >
        Create user
      </Button>
    </Form>
    </div>
  )
}

export default CreatScreen
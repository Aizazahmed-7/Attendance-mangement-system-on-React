import React from 'react'
import { Navbar,Nav ,Container, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../action/userActions'
import {link, useNavigate} from 'react-router-dom'

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state=>(state.userLogin))
  const {userInfo} =userLogin
  const navigate=useNavigate();
  const logoutHandler=() => {
    dispatch(Logout())
    navigate('/')
    }


  return (
    <>
        <header>


    <Navbar bg="dark"  variant='dark'  expand="lg" collapseOnSelect>
      <Container>
      <LinkContainer to="/">
        <Navbar.Brand>Codify</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
            ):(
              <LinkContainer to="/login">
            <Nav.Link ><i className='fas fa-user'></i> Sign In</Nav.Link>
            </LinkContainer>)}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

        </header>
    </>
  )
}

export default Header
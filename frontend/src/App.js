import './App.css';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import {Container} from 'react-bootstrap'

import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/loginScreen';
import UserScreen from './screens/userScreen';
import AdminLoginScreen from './screens/adminLoginScreen';
import AdminPanel from './screens/adminPanel';
import AdminUserScreen from './screens/adminUserScreen';
import CreatScreen from './screens/CreatScreen';

function App() {
  return (
    <Router>

    <Header></Header>
    
    <main className='py-3' >
   <Container>
    <Routes>
    
   
    <Route path='/'  element={<LoginScreen/>} />
    <Route path='/details/:id'  element={<AdminUserScreen/>} />
    <Route path='/creat'  element={<CreatScreen/>} />
    <Route path='/user'  element={<UserScreen/>} />
    <Route path='/admin'  element={<AdminLoginScreen/>} />
    <Route path='/adminpanel'  element={<AdminPanel/>} />


  
    </Routes>
    </Container>
    </main>
    


    </Router>
  );
}

export default App;

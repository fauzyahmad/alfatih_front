import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './login/Login'
import Register from './register/Register'
import './Auth.css'
import logoImage from '../image/logo.png'
import axios from 'axios'
import bgImage from '../image/auth-img.jpg'

// const baseUrl = ''
export class Auth extends Component {
    constructor(props){
        super(props);
        // If you want to use the reset state function, you need to have a reference to the ValidationForm component
        //If your React < 16.3, check https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
        this.formRef = React.createRef();
        this.state = {
            immediate:true,
            setFocusOnError:true,
        }
    }


    handleSubmitLogin = async (e, formData, inputs) => {
        e.preventDefault();
        // var formData = new FormData();
        // formData.append("email", "rizkhy45@gmail.com");
        // formData.append("password", "123");
        try {
            let login = await axios.post('https://vps.carakde.id/api_alfatih/api/auth/login', formData)
            console.log(login.data)
            localStorage.setItem('access_token', login.data.access_token)
            window.location.href = '/'
        } catch(e) {
            console.log(e)
        }
        // console.log(JSON.stringify(formData, 2))
        // alert(JSON.stringify(formData, null, 2));
    }

    handleSubmitRegister = (e, formData, inputs) => {
        alert(JSON.stringify(formData, null, 2));
        
    }

    handleErrorSubmit = (e,formData, errorInputs) => {
        console.log(e,formData, errorInputs)
    }

  render() {
    return (
      <Router>
        <div className="container-fluid">
            <div className="row">
                <div 
                    className="bgAuth col-md-7 col-lg-8 d-none d-md-block"
                    style={{backgroundImage: `url(${bgImage})`}}>
                </div>
                <div className="colLogin col-md-5 col-lg-4">
                    <div className="mt-5">
                        <div className="text-center">
                            <img alt="Logo" src={logoImage} />
                        </div>
                        <Route path='/login' render={props => (
                            <React.Fragment>
                                <Login onSubmit={this.handleSubmitLogin.bind(this)}
                                    onErrorSubmit={this.handleErrorSubmit.bind(this)}
                                    ref={this.formRef}
                                    immediate={this.state.immediate}
                                    setFocusOnError={this.state.setFocusOnError}
                                />
                            </React.Fragment>
                        )} />
                        <Route path='/register' render={props => (
                            <React.Fragment>
                                <Register onSubmit={this.handleSubmitRegister}
                                    onErrorSubmit={this.handleErrorSubmit}
                                    ref={this.formRef}
                                    immediate={this.state.immediate}
                                    setFocusOnError={this.state.setFocusOnError}
                                />
                            </React.Fragment>
                        )} />
                    </div>
                </div>
            </div>
        </div>
      </Router>
    )
  }
}

export default Auth

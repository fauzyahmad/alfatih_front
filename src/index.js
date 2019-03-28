import React from 'react';
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
// import ReactDOM from 'react-dom';
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import Cluster from './components/webapp/pages/home/Cluster'
import Exam from './components/webapp/pages/exam/Exam'
import Riwayat from './components/webapp/pages/riwayat/Riwayat'
import Home from './components/webapp/WebApp'
// import Header from './components/webapp/layout/Header'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import axios from 'axios'
import Header from './components/webapp/layout/Header';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef();
        this.state = {
            immediate:true,
            setFocusOnError:true,
            isLoggedIn: false,
            user: {}
        }
    }

        handleSubmitLogin = async (e, formData, inputs) => {
            e.preventDefault();
            try {
                let login = await axios.post('https://vps.carakde.id/api_alfatih/api/auth/login', formData)
                // console.log(login.data)
                localStorage.setItem('access_token', login.data.access_token)
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('user', JSON.stringify(login.data))
                this.setState({
                    isLoggedIn: true,
                    user: login.data
                })
                window.location.href = '/'
            } catch(e) {
                console.log(e)
                localStorage.clear()
                //tambahkan sweetalert
            }
        // alert(JSON.stringify(formData, null, 2));
        }

        handleSubmitRegister = (e, formData, inputs) => {
            alert(JSON.stringify(formData, null, 2));
            
        }

        handleErrorSubmit = (e,formData, errorInputs) => {
            console.log(e,formData, errorInputs)
        }

        handleLogOut = () => {
            localStorage.clear()
            this.setState({
                isLoggedIn: false,
                user: {}
            })
            window.location.href = '/login'
        }

        componentWillMount() {
            let isLoggedIn = localStorage.getItem('isLoggedIn')
            let user = localStorage.getItem('user')

            if(isLoggedIn !== null || user !== null) {
                this.setState({
                    isLoggedIn: isLoggedIn,
                    user: JSON.parse(user)
                })
            }
        }

        render() {
            console.log(this.state.isLoggedIn)
            console.log("path name: " + this.props.location.pathname)
            if (
                !this.state.isLoggedIn &&
                this.props.location.pathname !== "/login" &&
                this.props.location.pathname !== "/register"
              ) {
                console.log(
                  "you are not loggedin and are not visiting login or register, so go to login page"
                );
                this.props.history.push("/login");
              }
              if (
                this.state.isLoggedIn &&
                (this.props.location.pathname === "/login" ||
                  this.props.location.pathname === "/register")
              ) {
                console.log(
                  "you are either going to login or register but youre logged in"
                );
          
                this.props.history.push("/");
            }
            return (
                <Switch>
                        <Route 
                            exact path="/"
                            render={props => (
                                <>
                                    <Header 
                                        {...props}
                                        handleLogOut={this.handleLogOut.bind(this)}
                                    />
                                    <Home
                                        {...props}
                                    />
                                </>
                                
                            )}
                        />
                        <Route 
                            path="/login"
                            render={props => (
                                <Login 
                                    {...props}
                                    onSubmit={this.handleSubmitLogin.bind(this)}
                                    onErrorSubmit={this.handleErrorSubmit.bind(this)}
                                    ref={this.formRef}
                                    immediate={this.state.immediate}
                                    setFocusOnError={this.state.setFocusOnError}
                                />
                            )}
                        />
                        <Route 
                            path="/register"
                            render={props => (
                                <Register 
                                    {...props}
                                    onSubmit={this.handleSubmitRegister}
                                    onErrorSubmit={this.handleErrorSubmit}
                                    ref={this.formRef}
                                    immediate={this.state.immediate}
                                    setFocusOnError={this.state.setFocusOnError}
                                />
                            )}
                        />
                        <Route 
                            path="/cluster/:name"
                            render={props => (
                                <>
                                    <Header 
                                        {...props}
                                        handleLogOut={this.handleLogOut.bind(this)}
                                    />
                                    <Cluster {...props} />
                                </>
                            )}
                        />
                        <Route 
                            path="/exam"
                            render={props => (
                                <>
                                    <Header 
                                        {...props}
                                        handleLogOut={this.handleLogOut.bind(this)}
                                    />
                                    <Exam {...props} />
                                </>
                            )}
                        />
                        <Route 
                            path="/riwayat"
                            render={props => (
                                <>
                                    <Header 
                                        {...props}
                                        handleLogOut={this.handleLogOut.bind(this)}
                                    />
                                    <Riwayat {...props} />
                                </>
                            )}
                        />
                    
                </Switch>
            )
        }
}

const AppContainer = withRouter(props => <App {...props} />);


render(
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>,
  
    document.getElementById("root")
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

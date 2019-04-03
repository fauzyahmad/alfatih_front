import React from 'react';
import loadable from '@loadable/component'
import { render } from "react-dom";
import { Modal, Button, ModalBody } from 'reactstrap'
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import loginFailed from './components/image/cancel.svg'
import successRegister from './components/image/verified.svg'

// import App from './App';
// import * as serviceWorker from './serviceWorker';
import axios from 'axios'
// import Header from './components/webapp/layout/Header';

const Login = loadable(() => import('./components/auth/login/Login'))
const Register = loadable(() => import('./components/auth/register/Register'))
const Cluster = loadable(() => import('./components/webapp/pages/home/Cluster'), {
    fallback:
        <div className="loading">
            <div className="loader"></div>
        </div>
})
const Exam = loadable(() => import('./components/webapp/pages/exam/Exam'), {
    fallback:
        <div className="loading">
            <div className="loader"></div>
        </div>
})
const Riwayat = loadable(() => import('./components/webapp/pages/riwayat/Riwayat'))
const Home = loadable(() => import('./components/webapp/WebApp'), {
    fallback:
        <div className="loading">
            <div className="loader"></div>
        </div>
})
const Header = loadable(() => import('./components/webapp/layout/Header'))
class App extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef();
        this.state = {
            immediate:true,
            setFocusOnError:true,
            isLoggedIn: false,
            user: {},
            isLoaded: false,
            modal: false,
            backdrop: 'static'
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

        handleSubmitLogin = async (e, formData, inputs) => {
            e.preventDefault();
            try {
                this.setState({isLoaded: true})
                let login = await axios.post('http://157.230.33.225/api_alfatih/api/auth/login', formData)
                // console.log(login.data)
                localStorage.setItem('access_token', login.data.access_token)
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('user', JSON.stringify(login.data))
                this.setState({
                    isLoggedIn: true,
                    user: login.data
                })
                this.props.history.push('/')
            } catch(e) {
                console.log(e)
                // localStorage.clear()
                this.toggle()
                this.setState({isLoaded: false})
                //tambahkan sweetalert
            }
        // alert(JSON.stringify(formData, null, 2));
        }

        handleSubmitRegister = async (e, formData, inputs) => {
            this.setState({isLoaded: true})
            e.preventDefault();
            try {
                let register = await axios.post('http://157.230.33.225/api_alfatih/api/student/registration', formData)
                console.log(register)
                this.toggle()
                this.setState({isLoaded: false})
            } catch(e) {
                console.log(e)
                this.setState({isLoaded: false})
            }
            // alert(JSON.stringify(formData, null, 2));
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
            window.location = '/login'
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
                                        fallback={
                                            <div className="loading">
                                                <div className="loader"></div>
                                            </div>
                                        }
                                    />
                                </>
                                
                            )}
                        />
                        
                        <Route 
                            path="/login"
                            render={props => (
                                <>
                                <Login 
                                    {...props}
                                    onSubmit={this.handleSubmitLogin.bind(this)}
                                    onErrorSubmit={this.handleErrorSubmit.bind(this)}
                                    ref={this.formRef}
                                    immediate={this.state.immediate}
                                    setFocusOnError={this.state.setFocusOnError}
                                    isLoaded={this.state.isLoaded}
                                />
                                <Modal isOpen={this.state.modal}>
                                    <ModalBody>
                                        <div className="text-center">
                                        <img src={loginFailed} alt="imageBook" className="imgIconAuth" />
                                            <h1>Maaf</h1>
                                            <p className="mt-2 text-muted">Email atau password yang kamu masukkan salah, coba Login kembali</p>
                                            <Button className="mt-3 btn btn-lg btn-primary" color="primary" onClick={this.toggle}>OK</Button>
                                        </div>
                                    </ModalBody>
                                </Modal>
                               </>
                            )}
                        />
                        
                        <Route 
                            path="/register"
                            render={props => (
                                <>
                                    <Register 
                                        {...props}
                                        onSubmit={this.handleSubmitRegister}
                                        onErrorSubmit={this.handleErrorSubmit}
                                        ref={this.formRef}
                                        immediate={this.state.immediate}
                                        setFocusOnError={this.state.setFocusOnError}
                                        isLoaded={this.state.isLoaded}
                                    />
                                    <Modal isOpen={this.state.modal}>
                                        <ModalBody>
                                            <div className="text-center">
                                            <img src={successRegister} alt="imageBook" className="imgIconAuth" />
                                                <h1>Selamat</h1>
                                                <p className="mt-2 text-muted">Akun kamu telah berhasil terdaftar di Sistem kami. Login Untuk Memulai</p>
                                                <Button className="mt-3 btn btn-lg btn-primary" color="primary" onClick={() => {
                                                    this.toggle()
                                                    this.props.history.push('/')
                                                }}>Login</Button>
                                            </div>
                                        </ModalBody>
                                    </Modal>
                                </>
                            )}
                        />
                        <Route 
                            path="/cluster/:id"
                            render={props => (
                                <>
                                    <Header 
                                        {...props}
                                        handleLogOut={this.handleLogOut.bind(this)}
                                    />
                                    <Cluster {...props} 
                                        fallback={
                                            <div className="loading">
                                                <div className="loader"></div>
                                            </div>
                                        }
                                    />
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
                                    <Exam {...props} 
                                        
                                    />
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

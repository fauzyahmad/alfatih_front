import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation'
import bgImage from '../../image/auth-img.jpg'
import logoImage from '../../image/logo.png'
// import 'sweetalert/dist/sweetalert.css';
export class Login extends Component {
  render() {
    return (
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
                        <div className="p-5 mt-2">
                          <h1 style={{color: '#12cc83', fontWeight: '700'}}>Selamat datang</h1>
                          <p>Uji kemampuanmu sebelum mengikuti SBMPTN di sini</p>
                          <ValidationForm 
                              onSubmit={this.props.onSubmit} 
                              onErrorSubmit={this.props.onErrorSubmit}
                              ref={this.props.formRef}
                              immediate={this.props.immediate}
                              setFocusOnError={this.props.setFocusOnError}
                              defaultErrorMessage={{ required: "Please enter something."}}
                              className="mt-4">
                              <div className="form-group">
                                  <TextInput
                                      className="form-control"
                                      type="email"
                                      name="email"
                                      id="email"
                                      placeholder="E-mail..."
                                      required
                                      // successMessage="Looks good!"
                                      errorMessage="Email harus diisi" 
                                  />
                              </div>
                              <div className="form-group">
                                  <TextInput
                                      className="form-control"
                                      type="password"
                                      name="password"
                                      id="password"
                                      required
                                      placeholder="Password..." 
                                      errorMessage="Password harus diisi" 
                                  />
                              </div>
                              <button
                                  className={this.props.isLoaded === false ? "btn btn-lg btn-block btn-primary" : "d-none"}
                                  style={{display: 'table', margin: 'auto'}}>
                                  Masuk
                              </button>
                              <button className={this.props.isLoaded === false ? "d-none" : "btn btn-lg btn-block btn-primary"} 
                              type="button" 
                              disabled style={{display: 'table', margin: 'auto'}}>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                              <p className="mt-5"><small>Kamu belum punya akun? Klik 
                                  <span style={{color: '#67D546'}}>
                                  <Link to='/register'> disini</Link>
                                  </span> untuk mendaftar!</small>
                              </p>
                          </ValidationForm>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default Login

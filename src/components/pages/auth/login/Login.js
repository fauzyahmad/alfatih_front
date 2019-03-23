import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation'

export class Login extends Component {
  render() {
    return (
      <div className="p-5 mt-5">
        <h1>Selamat datang,</h1>
        <p>Silahkan masuk dengan akun anda</p>
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
                className="btn btn-lg btn-block btn-primary"
                style={{display: 'table', margin: 'auto'}}>
                Masuk
            </button>
            <p className="mt-5"><small>Kamu belum punya akun? Klik 
                <span style={{color: '#67D546'}}>
                <Link to='/register'> disini</Link>
                </span> untuk mendaftar!</small>
            </p>
        </ValidationForm>
      </div>
    )
  }
}

export default Login

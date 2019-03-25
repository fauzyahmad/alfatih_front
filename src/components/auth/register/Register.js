import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation'

export class Register extends Component {
  render() {
    return (
      <div>
        <div className="p-5 mt-2">
            <h1>Daftar Akun</h1>
            <p>Masukkan form pendaftaran</p>
            <ValidationForm onSubmit={this.props.onSubmit} 
            onErrorSubmit={this.props.onErrorSubmit}
            ref={this.props.formRef}
            immediate={this.props.immediate}
            setFocusOnError={this.props.setFocusOnError}
            defaultErrorMessage={{ required: "Please enter something."}}
            className="mt-4">
                <div className="form-group">
                    <TextInput
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        required
                        errorMessage="Nama Lengkap harus diisi"
                        placeholder="Nama Lengkap..." 
                    />
                </div>
                <div className="form-group">
                    <TextInput
                        className="form-control"
                        type="text"
                        name="username"
                        id="username"
                        required
                        errorMessage="Username harus diisi"
                        placeholder="Username..." 
                    />
                </div>
                <div className="form-group">
                    <TextInput
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        required
                        errorMessage="Email harus diisi"
                        placeholder="E-mail..." 
                    />
                </div>
                <div className="form-group">
                    <TextInput
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        required
                        errorMessage="Password harus diisi"
                        placeholder="Password..." 
                    />
                </div>
                <button
                    className="btn btn-lg btn-block btn-primary"
                    style={{display: 'table', margin: 'auto'}}>
                    Masuk
                </button>
                <p className="mt-5"><small>Kamu sudah punya akun? Klik 
                    <span style={{color: '#67D546'}}>
                    <Link to='/login'> disini</Link>
                    </span> untuk masuk ke Akunmu!</small>
                </p>
            </ValidationForm>
        </div>
      </div>
    )
  }
}

export default Register

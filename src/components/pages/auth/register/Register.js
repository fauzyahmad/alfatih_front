import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Register extends Component {
  render() {
    return (
      <div>
        <div className="p-5 mt-5">
            <h1>Daftar Akun</h1>
            <p>Masukkan form pendaftaran</p>
            <form className="mt-4">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nama Lengkap..." 
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username..." 
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail..." 
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password..." 
                    />
                </div>
                <button type="submit" 
                    className="btn btn-lg btn-block btn-primary"
                    style={{display: 'table', margin: 'auto'}}>
                    Masuk
                </button>
                <p className="mt-5"><small>Kamu sudah punya akun? Klik 
                    <span style={{color: '#67D546'}}>
                    <Link to='/login'> disini</Link>
                    </span> untuk masuk ke Akunmu!</small>
                </p>
            </form>
        </div>
      </div>
    )
  }
}

export default Register

import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logoImage from '../../image/logo.png'

export class Login extends Component {
  render() {
    return (
      <div className="p-5 mt-5">
        <h1>Selamat datang,</h1>
        <p>Silahkan masuk dengan akun anda</p>
        <form className="mt-4">
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
            <p className="mt-5"><small>Kamu belum punya akun? Klik 
                <span style={{color: '#67D546'}}>
                <Link to='/register'> disini</Link>
                </span> untuk mendaftar!</small>
            </p>
        </form>
      </div>
    )
  }
}

export default Login

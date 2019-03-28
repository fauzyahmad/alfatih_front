import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation'
import Select from 'react-select';
import { Input } from 'reactstrap'
import axios from 'axios';
import makeAnimated from 'react-select/lib/animated';
import bgImage from '../../image/auth-img.jpg'
import logoImage from '../../image/logo.png'
import '../Auth.css'

const options = [
  { value: '1', label: 'Chocolate' },
  { value: '2', label: 'Strawberry' },
  { value: '3', label: 'Vanilla' }
];
const urlSekolah = 'https://jendela.data.kemdikbud.go.id/api/index.php/Csekolah/detailSekolahGET?mst_kode_wilayah=196000&bentuk=sma'
export class Register extends Component {
    state = {
        id_sekolah: '',
        sekolah: ''
    }

    componentDidMount() {
        axios.get(urlSekolah)
        .then(res => {
            console.log(res)
        })
    }
    handleChange = (selectedOption) => {
        // this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        this.setState({id_sekolah: selectedOption.value})
        this.setState({sekolah: selectedOption.label})
    }
  render() {
    return (
      <div>
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
                                <div className="form-group">
                                    <SelectGroup name="cluster_id" id="color"
                                        required errorMessage="Kluster harus dipilih"
                                    >
                                        <option value="">--- Pilih Kluster ---</option>
                                        <option value="1">SAINTEK</option>
                                        <option value="2">SOSHUM</option>
                                    </SelectGroup>                
                                </div>
                                <div className="form-group">
                                    <Input name="birthdate"
                                    type="date"
                                    id="date"
                                    required>
                                    </Input>
                                </div>
                                <div className="form-group">
                                    <Select
                                        // value={selectedOption}
                                        onChange={this.handleChange}
                                        components={makeAnimated()}
                                        options={options}
                                        required
                                        placeholder="Masukkan Nama Sekolah"
                                    />
                                </div>
                                <div className="form-group d-none">
                                    <TextInput
                                        className="form-control"
                                        type="text"
                                        name="id_sekolah"
                                        id="id_sekolah"
                                        value={this.state.id_sekolah}
                                        // required
                                        errorMessage="ID sekolah"
                                        placeholder="ID Sekolah" 
                                    />
                                </div>
                                <div className="form-group d-none">
                                    <TextInput
                                        className="form-control"
                                        type="text"
                                        name="sekolah"
                                        id="sekolah"
                                        value={this.state.sekolah}
                                        // required
                                        errorMessage="Sekolah"
                                        placeholder="Sekolah" 
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
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Register

import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation'
import Select from 'react-select';
import { Input } from 'reactstrap'
import axios from 'axios';
import makeAnimated from 'react-select/lib/animated';
import bgImage from '../../image/auth-img.jpg'
import logoImage from '../../image/logo.png'
// import '../Auth.css'

// const options = [
//   { value: '1', label: 'Chocolate' },
//   { value: '2', label: 'Strawberry' },
//   { value: '3', label: 'Vanilla' }
// ];
// const urlSekolah = 'http://jendela.data.kemdikbud.go.id/api/index.php/Csekolah/detailSekolahGET?mst_kode_wilayah=196000&bentuk=sma'
export class Register extends Component {
    state = {
        id_sekolah: '',
        sekolah: [],
        cities: [],
        nama_sekolah: '',
        kode_kab_kota: '',
        mst_kode_wilayah: '',
        isDisabled: true,
        cluster: [],
        birth_date: '',
        password: '',
        confirmPassword: '',
        passwordError: false,
        type: 'text'
    }

    componentDidMount() {
        // axios.get(urlSekolah)
        // .then(res => {
        //     console.log(res)
        // })
        this.getCities()
        this.getCluster()
    }

    onFocus = () => {
        this.setState({type: 'date'})
    }

    onBlur = () => {
        this.setState({type: 'text'})
    }

    getCities = async () => {
        try {
            let resCities = await axios.get(`https://api.alfatihcollege.com/api/getCityOptions`)
            // console.log(resCities)
            let citiesMap = await resCities.data.cities
            let stateCities = citiesMap.map(cities => ({
                value: cities.kode_wilayah,
                label: cities.nama
            }))
            this.setState({cities: [...stateCities]})
        } catch(e) {
            console.log(e)
        }
    }

    getCluster = async () => {
        try {
            let resCluster = await axios.get(`https://api.alfatihcollege.com/api/cluster`)
            let stateCluster = await resCluster.data.clusters.data
            this.setState({cluster: [...stateCluster]})
        } catch(e) {

        }
    }

    getSchool = async () => {
        try {
            console.log('kode_kab_kota', this.state.kode_kab_kota)
            let resSchools = await axios.get(`https://api.alfatihcollege.com/api/getSchoolOptions?kode_kab_kota=${this.state.kode_kab_kota}`)
            let schoolsMap = await resSchools.data.schools
            let stateSchools = schoolsMap.map(schools => ({
                value: schools.id,
                label: schools.sekolah
            }))
            this.setState({
                sekolah: [...stateSchools],
                isDisabled: false
            })
        } catch(e) {
            console.log(e)
        }
    }

    handleChangeCities = async (selectedOption) => {
        console.log('city yg terpilih', selectedOption)
        let stateKodeKab = await selectedOption.value
        let trimStateKodeKab = await stateKodeKab.trim()
        let resCities = await axios.get(`https://api.alfatihcollege.com/api/getCityOptions`)
        let citiesMap = await resCities.data.cities
        let result = citiesMap.filter(cities => {
            return cities.kode_wilayah === stateKodeKab
        })
        let resultMstKode = await result[0].mst_kode_wilayah
        let trimResultMst = await resultMstKode.trim()
        this.setState({mst_kode_wilayah: trimResultMst})
        this.setState({kode_kab_kota: trimStateKodeKab})
        this.setState({isDisabled: false})
        // console.log('kode_kab_kota state', stateKodeKab)
        this.getSchool()
    }
    handleChangeSchool = async (selectedOption) => {
        // this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        let stateIdSekolah = await selectedOption.value
        let stateNamaSekolah = await selectedOption.label
        this.setState({id_sekolah: stateIdSekolah})
        this.setState({nama_sekolah: stateNamaSekolah})
    }

    checkPassword() {
        if(!this.state.password || this.state.password !== this.state.confirmPassword) {
           this.setState({passwordError:true});
       }
       else {
           this.setState({passwordError:false});
       }
   }

    handleChangePassword(event) {
        const { id, value } = event.target

        this.setState({
            [id]: value
        }, () => {
            if (id === 'password' || id === 'confirmPassword') {
                this.checkPassword()
            }
        })
    }

    handleChangeDate(event) {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
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
                            <h1 style={{color: '#12cc83', fontWeight: '700'}}>Daftar Akun</h1>
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
                                        onChange={(event) => this.handleChangePassword(event)}
                                        errorMessage="Password harus diisi"
                                        placeholder="Password..." 
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        className="form-control"
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        required
                                        onChange={(event) => this.handleChangePassword(event)}
                                        // errorMessage="Ulangi Password harus diisi"
                                        placeholder="Ulangi Password..." 
                                    />
                                    <small style={{color: 'red', marginBottom: '1em'}} 
                                className={this.state.passwordError === true ? '' : 'd-none'}>Password tidak cocok</small>
                                </div>
                                <div className="form-group">
                                    <TextInput
                                        className="form-control"
                                        type="tel"
                                        name="phone_number"
                                        id="phone_number"
                                        required
                                        errorMessage="No. handphone harus diisi"
                                        placeholder="No. Handphone..." 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <Input name="birth_date"
                                        type={this.state.type}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        id="date" 
                                        placeholder="Tanggal Lahir"
                                        value={this.state.birth_date}
                                        onChange={(event) => this.handleChangeDate(event)}
                                        required>
                                    </Input>
                                </div>
                                <div className="form-group d-none">
                                    <TextInput name="birth_date"
                                        type="text"
                                        id="date1" 
                                        placeholder="Tanggal Lahir"
                                        value={this.state.birth_date}
                                        required>
                                    </TextInput>
                                </div>
                                <div className="form-group">
                                    <SelectGroup name="cluster_id" id="cluster_id"
                                        required errorMessage="Kluster harus dipilih"
                                    >
                                        <option value="">-- Pilih Kelompok Ujian --</option>
                                        {this.state.cluster.map(cluster =>
                                            <option key={cluster.id} value={cluster.id}>{cluster.name}</option>
                                        )}
                                    </SelectGroup>                
                                </div>
                                <div className="form-group">
                                    <Select
                                        // value={selectedOption}
                                        onChange={this.handleChangeCities}
                                        components={makeAnimated()}
                                        id="cities"
                                        options={this.state.cities}
                                        required
                                        placeholder="Masukkan Nama Kota"
                                    />
                                </div>
                                <div className="form-group">
                                    <Select
                                        // value={selectedOption}
                                        onChange={this.handleChangeSchool}
                                        components={makeAnimated()}
                                        id="schools"
                                        isDisabled={this.state.isDisabled}
                                        options={this.state.sekolah}
                                        required
                                        placeholder="Masukkan Nama Sekolah"
                                    />
                                </div>
                                <div className="form-group">
                                    <SelectGroup name="num_packets" id="num_packets"
                                        required errorMessage="Kluster harus dipilih"
                                    >
                                        <option value="">-- Pilih Jumlah Paket Soal --</option>
                                        <option value="1">1 Paket</option>
                                        <option value="3">3 Paket</option>
                                        <option value="5">5 Paket</option>
                                    </SelectGroup>                
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
                                        value={this.state.nama_sekolah}
                                        // required
                                        errorMessage="Sekolah"
                                        placeholder="Sekolah" 
                                    />
                                </div>
                                <div className="form-group d-none">
                                    <TextInput
                                        className="form-control"
                                        type="text"
                                        name="kode_kab_kota"
                                        id="kode_kab_kota"
                                        value={this.state.kode_kab_kota}
                                        // required
                                        errorMessage="Sekolah"
                                        placeholder="Kode Kab Kota" 
                                    />
                                </div>
                                <div className="form-group d-none">
                                    <TextInput
                                        className="form-control"
                                        type="text"
                                        name="mst_kode_wilayah"
                                        id="mst_kode_wilayah"
                                        value={this.state.kode_kab_kota}
                                        // required
                                        errorMessage="Sekolah"
                                        placeholder="Kode Kab Kota" 
                                    />
                                </div>
                                <button
                                  className={this.props.isLoaded === true ? "d-none" : "btn btn-lg btn-block btn-primary"}
                                  style={{display: 'table', margin: 'auto'}}>
                                  Daftar
                                </button>
                                <button className={this.props.isLoaded === false ? "d-none" : "btn btn-lg btn-block btn-primary"}
                                    disabled style={{display: 'table', margin: 'auto'}}>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Loading...
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

import React, { Component } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { 
  Container, 
  Row, 
  Col, 
  Card, Modal, ModalBody, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import Panel from './layout/Panel'
import axios from 'axios'
import bookImg from '../image/book.svg'
import './pages/home/Home.css'
import loginFailed from '../image/cancel.svg'
import rocketImg from '../image/rocket-ship.svg'
import announcementImg from '../image/megaphone.svg'
// import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
// import 'sweetalert/dist/sweetalert.css';
// import PropTypes from 'prop-types';
// import Daftar from './pages/daftar/Daftar';
const defaultProps = {
   baseUrl: 'https://api.alfatihcollege.com/api'
}
export class WebApp extends Component {
  constructor(props) {
      super(props)
      this.state = {
          pakets: [],
          show: false,
          alert: null,
          isLoaded: false,
          modal: false,
          modalAnnouncement: false,
          modalPromotion: false,
          backdrop: 'static'
      }
      this.toggle = this.toggle.bind(this);
      this.togglePromotion = this.togglePromotion.bind(this);
      this.toggleAnnouncement = this.toggleAnnouncement.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  togglePromotion() {
    this.setState(prevState => ({
      modalPromotion: !prevState.modal
    }));
  }

  toggleAnnouncement() {
    this.setState(prevState => ({
      modalAnnouncement: !prevState.modal
    }));
  }

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }

  componentDidMount() {
      this.getPacket()
  }

//   componentWillReceiveProps(nextProps) {
//       if(nextProps.match.path === this.props.location.pathname) {
//         console.log(nextProps)
//       this.setState({pakets: []})
//       console.log('isi state receive props', this.state.pakets)
//       }
      
//   }

// componentDidUpdate(prevProps) {
//     console.log(prevProps)
// }

  componentWillUnmount() {
    //   console.log('componenthome, unmount')
      this.setState({pakets: []})
  }

  getPacket = async () => {
    
      try{
        this.setState({isLoaded: true})
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
            'Content-Type': 'application/json'
        }
        let resPacket = await axios.get(`${this.props.baseUrl}/student/packet`, {headers})
        // console.log(resPacket.data.studentPacket)
        this.setState({pakets: resPacket.data.studentPacket})
        this.setState({isLoaded: false})
        if(resPacket.data.studentPacket.length === 0) {
            // console.log(this.state.pakets.length)
            this.toggle()
            // this.setState({isLoaded: false})
        } 
        // else {
        //     this.toggleAnnouncement()
        //     setTimeout(() => { 
        //         localStorage.clear()
        //         window.location.reload() 
        //     }, 5000);
        // }
        console.log(this.state.pakets)
      } catch(e) {
        this.setState({isLoaded: false})
        console.log(e)
      }
      
  }


  getLeaderboard = async () => {
    try{
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
            'Content-Type': 'application/json'
        }
        
        let resLeaderboad = await axios.get(`${this.props.baseUrl}/student/test/
        ${localStorage.getItem('studentTest_id')}/leader_board`, {headers})
        let resData = await resLeaderboad.data
        localStorage.setItem('leaderboard', JSON.stringify(resData))
        // console.log(resData)
        // this.setState({leaderboard: stateRes})
        // this.props.history.push(`/cluster/${localStorage.getItem('studentTest_id')}`)
        window.location = `/#/cluster/${localStorage.getItem('studentTest_id')}`
        // console.log(this.state.leaderboard)
    } catch(e) {
        console.log(e)
    }
}

  render() {
    return (
        <React.Fragment>
          <div id="web-app">
          {/* <SweetAlert
                show={this.state.show}
                success
                title="Maaf"
                text="Kamu belum diapprove di Sistem Kami. Silahkan Masuk kembali lain waktu"
                onConfirm={() => {
                    // this.setState({ show: false })
                    localStorage.clear()
                    // this.props.history.push('/login')
                    window.location.href='/login'
                }}
            /> */}
            
            <Container className="mt-5 pt-5" id="container">
                <div className={this.state.isLoaded === true ? "loading" : "d-none"}>
                    <div className="loader"></div>
                </div>
                <Modal isOpen={this.state.modal}>
                    <ModalBody>
                        <div className="text-center">
                            <img src={loginFailed} alt="imageBook" className="imgIconAuth" />
                            <h1>Maaf</h1>
                            <p className="mt-2 text-muted">Akun kamu belum diverifikasi oleh sistem Kami. Silahkan Login lain waktu</p>
                            <Button className="mt-3 btn btn-lg btn-primary" color="primary" 
                            onClick={() => {
                                localStorage.clear()
                                this.setState({isLoaded: false})
                                window.location.reload();
                            }}>
                            OK
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalAnnouncement}>
                    <ModalBody>
                        <div className="text-center">
                            <img src={announcementImg} alt="imageBook" className="imgIconAuth" />
                            <h1>PENGUMUMAN</h1>
                            <p className="mt-2 text-danger">Tryout Akan dilaksanakan pada Tanggal 10 April 2019 Mulai pukul 06.00 WITA - 23.59 WITA.</p>
                            <p className="text-muted">Login kembali pada saat jadwal Tryout yang telah ditentukan</p>
                            <Button className="mt-3 btn btn-lg btn-primary" color="primary" 
                            onClick={() => {
                                localStorage.clear()
                                this.setState({isLoaded: false})
                                window.location.reload();
                            }}>
                            OK
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalPromotion}>
                    <ModalBody>
                        <div className="text-center">
                            <img src={rocketImg} alt="imageBook" className="imgIconAuth" />
                            <h1>COMING SOON</h1>
                            <p className="mt-2 text-muted">Paket belum tersedia saat ini.</p>
                            <Button className="mt-3 btn btn-lg btn-primary" color="primary" 
                            onClick={() => {
                                this.setState({modalPromotion: false})
                            }}>
                            OK
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
                    <Row>
                        <Col sm="12" className="mb-4">
                            <Row>
                                <Col md="12" className="mb-4">
                                    <h1 className="text-center">
                                        Daftar Paket
                                    </h1>
                                    <p className="text-center">
                                        Pilihan paket yang tersedia
                                    </p>
                                </Col>
                                {this.state.pakets.map(paket => 
                                    <Col md="3" className="mb-3" key={paket.id}>
                                        <Card body>
                                            <div style={{display: 'inherit'}}>
                                                <img src={bookImg} alt="imageBook" className="imgIcon" />
                                                
                                                <div className="content-group display-fill">
                                                    <h5 style={{fontSize: '1.14em'}}>FREE TRYOUT</h5>
                                                    <small style={{color: 'transparent'}}>Berisi soal-soal Saintek</small>
                                                    <Link to="#" 
                                                    id={paket.packet_id}
                                                    name={paket.packet_id}
                                                    onClick={async () => {
                                                        try {
                                                            const headers = {
                                                                'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
                                                                'Content-Type': 'application/json'
                                                            }
                                                            const data = {
                                                                packet_id: paket.packet_id
                                                            }
                                                            this.setState({isLoaded: true})
                                                            let postStudentTest = await axios.post(`${this.props.baseUrl}/student_test`, data, {headers})
                                                            // console.log(postStudentTest.data)
                                                            localStorage.setItem('studentTest_id', postStudentTest.data.studentTest.id)
                                                            this.getLeaderboard()
                                                        } catch(e) {
                                                            console.log(e);
                                                            this.setState({isLoaded: false})
                                                        }
                                                    }}>
                                                    <div className="float-right mt-2" style={{display: '-webkit-inline-box'}}>
                                                        <h5 className="mt-2 mr-2 text-muted">
                                                            Pilih Paket
                                                        </h5>
                                                        <FontAwesomeIcon
                                                        icon={faChevronRight} 
                                                        size="2x" className="mt-1" color="#6c757d"/>
                                                    </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                )}
                                    {/* <Col md="3" className="mb-3">
                                        <Card body>
                                            <div style={{display: 'inherit'}}>
                                                <img src={bookImg} alt="imageBook" className="imgIcon" />
                                                
                                                <div className="content-group display-fill">
                                                    <h5>Tryout Free</h5>
                                                    <small style={{color: 'transparent'}}>Berisi soal-soal Saintek</small>
                                                    <Link to="#" 
                                                    id="paket-2"
                                                    name="paket-2"
                                                   >
                                                    <div className="float-right mt-2" style={{display: '-webkit-inline-box'}}>
                                                        <h5 className="mt-2 mr-2 text-muted">
                                                            Pilih Paket
                                                        </h5>
                                                        <FontAwesomeIcon
                                                        icon={faChevronRight} 
                                                        size="2x" className="mt-1" color="#6c757d"/>
                                                    </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col> */}
                                    <Col md="3" className="mb-3">
                                        <Card body>
                                            <div style={{display: 'inherit'}}>
                                                <img src={bookImg} alt="imageBook" className="imgIcon" />
                                                
                                                <div className="content-group display-fill">
                                                    <h5>1 Paket UTBK</h5>
                                                    <p className="mb-3 text-danger">Rp 19.500</p>
                                                    <Link to="#" 
                                                    id="paket-2"
                                                    name="paket-2"
                                                    onClick={(e) => this.togglePromotion()}
                                                    >
                                                    <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
                                                        <h5 className="mt-2 mr-2 text-muted">
                                                            Beli Paket
                                                        </h5>
                                                        <FontAwesomeIcon
                                                        icon={faChevronRight} 
                                                        size="2x" className="mt-1" color="#6c757d"/>
                                                    </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col md="3" className="mb-3">
                                        <Card body>
                                            <div style={{display: 'inherit'}}>
                                                <img src={bookImg} alt="imageBook" className="imgIcon" />
                                                
                                                <div className="content-group display-fill">
                                                    <h5 className="">5 Paket UTBK</h5>
                                                    <p className="mb-3 text-danger">Rp 95.500</p>
                                                    <Link to="#" 
                                                    id="paket-3"
                                                    name="paket-3"
                                                    onClick={(e) => this.togglePromotion()}
                                                   >
                                                    <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
                                                        <h5 className="mt-2 mr-2 text-muted">
                                                            Beli Paket
                                                        </h5>
                                                        <FontAwesomeIcon
                                                        icon={faChevronRight} 
                                                        size="2x" className="mt-1" color="#6c757d"/>
                                                    </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col md="3" className="mb-3">
                                        <Card body>
                                            <div style={{display: 'inherit'}}>
                                                <img src={bookImg} alt="imageBook" className="imgIcon" />
                                                
                                                <div className="content-group display-fill">
                                                    <h5 style={{fontSize: '1.1em', marginBottom: '.6em'}}>10 Paket UTBK</h5>
                                                    <p className="mb-3 text-danger">Rp 179.500</p>
                                                    <Link to="#" 
                                                    id="paket-4"
                                                    name="paket-4"
                                                    onClick={(e) => this.togglePromotion()}
                                                   >
                                                    <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
                                                        <h5 className="mt-2 mr-2 text-muted">
                                                            Beli Paket
                                                        </h5>
                                                        <FontAwesomeIcon
                                                        icon={faChevronRight} 
                                                        size="2x" className="mt-1" color="#6c757d"/>
                                                    </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                            </Row>
                        </Col>
                        {/* <Col sm="12" md="4" className="d-none">
                            <Panel />
                        </Col> */}
                    </Row>
                </Container>
          </div>    
        </React.Fragment>
    )
  }
}

WebApp.defaultProps = defaultProps;

export default WebApp

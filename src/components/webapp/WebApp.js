import React, { Component } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { 
  Container, 
  Row, 
  Col, 
  Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import Panel from './layout/Panel'
import axios from 'axios'
import bookImg from '../image/book.svg'
import './pages/home/Home.css'
// import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
// import 'sweetalert/dist/sweetalert.css';
// import PropTypes from 'prop-types';
// import Daftar from './pages/daftar/Daftar';
const defaultProps = {
   baseUrl: 'http://157.230.33.225/api_alfatih/api'
}
export class WebApp extends Component {
  constructor(props) {
      super(props)
      this.state = {
          pakets: [],
          show: false,
          isLoaded: false
      }
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

componentDidUpdate(prevProps) {
    console.log(prevProps)
}

  componentWillUnmount() {
      console.log('componenthome, unmount')
      this.setState({pakets: []})
  }

  getPacket = async () => {
    this.setState({isLoaded: true})
      try{
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
            'Content-Type': 'application/json'
        }
        let resPacket = await axios.get(`${this.props.baseUrl}/student/packet`, {headers})
        console.log(resPacket.data.studentPacket)
        this.setState({pakets: resPacket.data.studentPacket})
        this.setState({isLoaded: false})
        if(resPacket.data.studentPacket.length === 0) {
            // console.log(this.state.pakets.length)
            this.setState({show: true})
        }
        console.log(this.state.pakets)
      } catch(e) {
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
        console.log(resData)
        // this.setState({leaderboard: stateRes})
        this.props.history.push(`/cluster/${localStorage.getItem('studentTest_id')}`)
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
                    <Row>
                        <Col sm="12" className="mb-4">
                            <Row>
                                <Col md="12" className="mb-4">
                                    <h1 className="text-center">
                                        Daftar Paket
                                    </h1>
                                    <p className="text-center">
                                        Pilihan paket yang anda punya
                                    </p>
                                </Col>
                                {this.state.pakets.map(paket => 
                                    <Col md="4" className="mb-3" key={paket.id}>
                                        <Card body>
                                            <div style={{display: 'inherit'}}>
                                                <img src={bookImg} alt="imageBook" className="imgIcon" />
                                                
                                                <div className="content-group">
                                                    <h4>{paket.packet.name}</h4>
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
                                                            console.log(postStudentTest.data)
                                                            localStorage.setItem('studentTest_id', postStudentTest.data.studentTest.id)
                                                            // this.setState({studentTest_id: postStudentTest.data.studentTest.id})
                                                            // window.location.href = `/cluster/${paket.packet.id}`
                                                            this.getLeaderboard()
                                                        //    window.location.href = `/cluster/${localStorage.getItem('studentTest_id')}`
                                                        } catch(e) {
                                                            console.log(e);
                                                            this.setState({isLoaded: false})
                                                        }
                                                    }}>
                                                    <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
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

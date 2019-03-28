import React, { Component } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { 
  Container, 
  Row, 
  Col, 
  Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faBook } from '@fortawesome/free-solid-svg-icons'
import Panel from './layout/Panel'
import axios from 'axios'
import PropTypes from 'prop-types';
// import Daftar from './pages/daftar/Daftar';
const defaultProps = {
   baseUrl: 'https://vps.carakde.id/api_alfatih/api'
}
export class WebApp extends Component {
  constructor(props) {
      super(props)
      this.state = {
          pakets: []
      }
  }

  componentDidMount() {
      this.getPacket()
  }

  getPacket = async () => {
      try{
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
            'Content-Type': 'application/json'
        }
        let resPacket = await axios.get(`${this.props.baseUrl}/student/packet`, {headers})
        console.log(resPacket.data.studentPacket)
        this.setState({pakets: resPacket.data.studentPacket})
      } catch(e) {
        console.log(e)
      }
      
  }

//   createStudentTest = async (e) => {
    

//   }
  render() {
    return (
        <React.Fragment>
          <div id="web-app">
            <Container className="mt-5 pt-5" id="container">
                    <Row>
                        <Col sm="12" md="8" className="mb-4">
                            <Row>
                                <Col md="12" className="mb-4">
                                    <h1 className="text-center font-weight-normal">
                                        Daftar Paket
                                    </h1>
                                    <p className="text-center">
                                        Terdapat 10 Paket yang bisa dipilih
                                    </p>
                                </Col>
                                {this.state.pakets.map(paket => 
                                    <Col md="6" className="mb-3" key={paket.id}>
                                        <Card body>
                                            <div style={{display: 'inherit'}}>
                                                <FontAwesomeIcon icon={faBook} 
                                                color="#145dca" size="6x" 
                                                className="mr-3" />
                                                <div className="content-group">
                                                    <h4>{paket.packet.name}</h4>
                                                    <small style={{color: 'transparent'}}>Berisi soal-soal Saintek</small>
                                                    <Link to={`/cluster/${paket.packet.name}`} 
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
                                                            let postStudentTest = await axios.post(`${this.props.baseUrl}/student_test`, data, {headers})
                                                            console.log(postStudentTest.data)
                                                            localStorage.setItem('studentTest_id', postStudentTest.data.studentTest.id)
                                                        } catch(e) {
                                                            console.log(e);
                                                        }
                                                    }}>
                                                    <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
                                                        <h5 className="mt-2 mr-2 text-muted">Pilih Paket</h5>
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
                        <Col sm="12" md="4">
                            <Panel />
                        </Col>
                    </Row>
                </Container>
          </div>    
        </React.Fragment>
    )
  }
}

WebApp.defaultProps = defaultProps;

export default WebApp

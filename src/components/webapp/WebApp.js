import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { 
  Container, 
  Row, 
  Col, 
  Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faBook } from '@fortawesome/free-solid-svg-icons'
import Panel from './layout/Panel'
import Home from './pages/home/Home'
import Exam from './pages/exam/Exam'
import Header from './layout/Header'
import Riwayat from './pages/riwayat/Riwayat';
// import Daftar from './pages/daftar/Daftar';
export class WebApp extends Component {
  constructor(props) {
      super(props)
      this.state = {
          pakets: [
              { id: 1 },
              { id: 2 },
              { id: 3 },
              { id: 4 },
              { id: 5 },
              { id: 6 },
              { id: 7 },
              { id: 8 },
              { id: 9 },
              { id: 10 },
          ]
      }
  }
  render() {
    return (
      <Router>
        <React.Fragment >
          <div id="web-app">
          <Header />
            <Route exact path='/' render={props => (
              <>
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
                                                    <h4>Paket {paket.id}</h4>
                                                    <small style={{color: 'transparent'}}>Berisi soal-soal Saintek</small>
                                                    <Link to="/cluster">
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
              </>
            )} />
            <Route path='/cluster' component={Home} />
            <Route path='/riwayat' component={Riwayat} />
            <Route path='/exam' component={Exam} />
          </div>
          
        </React.Fragment>
      </Router>
     
    )
  }
}

export default WebApp

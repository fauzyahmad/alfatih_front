import React, { Component } from 'react'
import { 
    Container, 
    Row, 
    Col, 
    Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faChevronRight, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Panel from '../../layout/Panel'
import './Home.css'

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Sidebar /> */}
        <Container className="mt-5 pt-5" id="container">
            <Row>
                <Col sm="12" md="8" className="mb-4">
                    <Row>
                        <Col md="12" className="mb-4">
                            <h1 className="text-center font-weight-normal">
                                Kluster SBMPTN
                            </h1>
                            <p className="text-center">
                                Terdapat 2 pilihan untuk Kluster SAINTEK
                            </p>
                        </Col>
                        <Col md="6" className="mb-3">
                            <Card body >
                                <div style={{display: 'inherit'}}>
                                    <FontAwesomeIcon icon={faLightbulb} 
                                    color="#efc738" size="6x" 
                                    className="mr-3" />
                                    <div className="content-group">
                                        <h4>TPA</h4>
                                        <small>Berisi soal-soal Tes Potensi akademik</small>
                                        {/* <div></div> */}
                                        <Link to="/login">
                                        <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
                                            <h5 className="mt-2 mr-2 text-muted">Pilih Soal</h5>
                                            <FontAwesomeIcon
                                            icon={faChevronRight} 
                                            size="2x" className="mt-1" color="#6c757d"/>
                                        </div>
                                        </Link>
                                        
                                    </div>
                                </div>
                                {/* <CardTitle>
                                    <h4>TPA</h4>
                                </CardTitle>
                                <CardText>
                                    Paket Tryout
                                </CardText> */}
                                {/* <Button>Pilih</Button> */}
                            </Card>
                        </Col>
                        <Col md="6" className="mb-3">
                            <Card body>
                            <div style={{display: 'inherit'}}>
                                    <FontAwesomeIcon icon={faChartLine} 
                                    color="#66cdaa" size="6x" 
                                    className="mr-3" />
                                    <div className="content-group">
                                        <h4>SAINTEK</h4>
                                        <small>Berisi soal-soal Saintek</small>
                                        {/* <div></div> */}
                                        <Link to="/login">
                                        <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
                                            <h5 className="mt-2 mr-2 text-muted">Pilih Soal</h5>
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
                <Col sm="12" md="4">
                    <Panel />
                </Col>
            </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Home

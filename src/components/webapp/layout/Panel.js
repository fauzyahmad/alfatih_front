import React, { Component } from 'react'
import {
    Row, 
    Col, 
    } from 'reactstrap'
import './Panel.css'

export class Panel extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="leaderboard">
            <div className="header-board p-3">
                <h5 className="text-center text-white"
                    style={{fontWeight: '700'}}>
                    Leaderboard
                </h5>
                <div className="image-board text-center">
                    <img alt="leaderboard text-center"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkkd8zZVDspnLWtkp88gUWWCMghLRlKaSf_0R_RR_jgRGC3qg"
                    className="rounded-circle" width="100"
                    />
                </div>
                <Row className="mt-3">
                    <Col xs="6">
                        <small className="text-white">Peringkat kamu</small>
                        <h5 className="text-white">2 
                        <small> dari</small><span className="text-warning"> 200</span> </h5>
                    </Col>
                    {/* <Col xs="4" className="text-center">
                        <small>Posisi</small>
                        <p>1st</p>
                    </Col> */}
                    <Col xs="6" className="text-right">
                        <small className="text-white">Total Skor</small>
                        <h5 className="text-white">910</h5>
                    </Col>
                </Row>
            </div>
            <div className="body-board p-3">
                {/* <Row className="mb-2">
                    <Col xs="3">
                        <small className="text-muted">Peringkat</small>
                    </Col>
                    <Col xs="6" className="text-left">
                        <small className="text-muted">Nama</small>
                    </Col>
                    <Col xs="3" className="text-right">
                        <small className="text-muted">Skor</small>
                    </Col>
                </Row> */}
                <Row className="middle-div">
                    <Col xs="2" >
                        <h6 className="middle-div">1</h6>
                    </Col>
                    <Col xs="7" className="text-left">
                        <p className="middle-div">
                            <img alt="leaderboard text-center"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkkd8zZVDspnLWtkp88gUWWCMghLRlKaSf_0R_RR_jgRGC3qg"
                            className="rounded-circle" width="30"
                            /> Andi Ahmad Fauzy
                        </p>
                    </Col>
                    <Col xs="3" className="text-right">
                        <h6 className="middle-div">975</h6>
                    </Col>
                </Row>
                <Row className="middle-div user-bg">
                    <Col xs="2" >
                        <h6 className="middle-div text-white">2</h6>
                    </Col>
                    <Col xs="7" className="text-left">
                        <p className="middle-div text-white">
                            <img alt="leaderboard text-center"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkkd8zZVDspnLWtkp88gUWWCMghLRlKaSf_0R_RR_jgRGC3qg"
                            className="rounded-circle" width="30"
                            /> Andi Mubarak
                        </p>
                    </Col>
                    <Col xs="3" className="text-right">
                        <h6 className="middle-div text-white">910</h6>
                    </Col>
                </Row>
                <Row className="middle-div">
                    <Col xs="2" >
                        <h6 className="middle-div">3</h6>
                    </Col>
                    <Col xs="7" className="text-left">
                        <p className="middle-div">
                            <img alt="leaderboard text-center"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkkd8zZVDspnLWtkp88gUWWCMghLRlKaSf_0R_RR_jgRGC3qg"
                            className="rounded-circle" width="30"
                            /> Sri Muliyanti P.
                        </p>
                    </Col>
                    <Col xs="3" className="text-right">
                        <h6 className="middle-div">875</h6>
                    </Col>
                </Row>
            </div>
        </div> 
      </React.Fragment>
    )
  }
}

export default Panel

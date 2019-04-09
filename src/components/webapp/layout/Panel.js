import React, { Component } from 'react'
import {
    Row, 
    Col, 
    } from 'reactstrap'
import './Panel.css'
import axios from "axios";

const defaultProps = {
  baseUrl: 'https://api.alfatihcollege.com/api'
}

export class Panel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaderboard: ''
        }
    }

    componentWillMount() {
        let leaderStorage = localStorage.getItem(`leaderboard`)
        if(leaderStorage !== null) {
            this.setState({leaderboard: JSON.parse(localStorage.getItem(`leaderboard`))})
            return
        } 
        this.getLeaderboard()
        
    }

    getLeaderboard = async () => {
        try{
            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
                'Content-Type': 'application/json'
            }
            // const url = `https://vps.carakde.id/api_alfatih/api/
            // ${localStorage.getItem('studentTest_id')}/leader_board`
            // console.log(url)
            let resLeaderboad = await axios.get(`${this.props.baseUrl}/student/test/
            ${localStorage.getItem('studentTest_id')}/leader_board`, {headers})
            let stateRes = await resLeaderboad
            localStorage.setItem('leaderboard', JSON.stringify(stateRes))
            this.setState({leaderboard: stateRes})
            // console.log(this.state.leaderboard)
        } catch(e) {

        }
    }
  render() {
    const numLeader = this.state.leaderboard.packetLeaderBoard.length 
    console.log(this)
    return (
      <React.Fragment>
        <div className="leaderboard">
            <div className="header-board p-3">
                <h5 className="text-center text-white"
                    style={{fontWeight: '700'}}>
                    Leaderboard
                </h5>
                <Row className="image-board">
                    <Col xs="4" className="text-left line-height">
                        <small className="text-white text-smalls">Peringkat kamu</small>
                        <h5 className="text-white">{this.state.leaderboard.studentLeaderBoard.rank} 
                        <small> dari</small><span className="text-warning"> {numLeader} </span> </h5>
                    </Col>
                    <Col xs="4" className="text-center">
                        <img alt="leaderboard"
                        src="https://aaccaa.org/wp-content/uploads/2016/11/profile_default.png"
                        className="rounded-circle text-center" width="80"
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    {/* <Col xs="4">
                        <small className="text-white">Peringkat kamu</small>
                        <h5 className="text-white">2 
                        <small> dari</small><span className="text-warning"> 200</span> </h5>
                    </Col> */}
                    {this.state.leaderboard.scores.questionGroupScores.map(scores => 
                        <Col key={scores.id} xs="4" className="text-left">
                            <small className="text-white text-smalls">
                                Skor {scores.student_test_question_group.question_group.category.name}
                            </small>
                            <h5 className="text-white">{scores.score === null ? '0' : scores.score}</h5>
                        </Col>
                    )}
                    
                    {/* <Col xs="4" className="text-left">
                        <small className="text-white text-smalls">
                            Skor {this.state.leaderboard.scores.questionGroupScores[1].student_test_question_group.question_group.category.name}
                        </small>
                        <h5 className="text-white text-center">{this.state.leaderboard.scores.questionGroupScores[1].score === null ? '0' : this.state.leaderboard.scores.questionGroupScores[1].score}</h5>
                    </Col> */}
                    {/* <Col xs="4" className="text-center">
                        <small>Posisi</small>
                        <p>1st</p>
                    </Col> */}
                    <Col xs="4" className="text-right">
                        <small className="text-white text-smalls">Total Skor</small>
                        <h5 className="text-white">{this.state.leaderboard.scores.sumScore}</h5>
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
                {this.state.leaderboard.packetLeaderBoard.map((leader, idx) => 
                    <Row className="middle-div" key={idx}>
                        <Col xs="2" >
                            <h6 className="middle-div">{leader.rank}</h6>
                        </Col>
                        <Col xs="7" className="text-left">
                            <p style={{fontSize: '10px'}} className="middle-div">
                            {leader.name}
                            </p>
                        </Col>
                        <Col xs="3" className="text-right">
                            <h6 className="middle-div">{leader.sumScore === null ? '0' : leader.sumScore}</h6>
                        </Col>
                    </Row>
                )}
            </div>
        </div> 
      </React.Fragment>
    )
  }
}

Panel.defaultProps = defaultProps

export default Panel

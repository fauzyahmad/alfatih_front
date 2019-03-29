import React, { Component } from 'react'
import { 
    Container, 
    Row, 
    Col, 
    Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faChevronRight, faChartLine, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import Panel from '../../layout/Panel'
// import Header from '../../layout/Header'
import SweetAlert from 'react-bootstrap-sweetalert'
import './Home.css'
import axios from "axios";
import PropTypes from 'prop-types';
const defaultProps = {
  baseUrl: 'https://vps.carakde.id/api_alfatih/api'
}
export class Cluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      clusters: [],
      start_date: ''
    };
  }
  
  componentWillMount() {
    this.getStudentTestGroup()
  }

  getStudentTestGroup = () => {
      const headers = {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
          'Content-Type': 'application/json'
      }
      axios.get(
        `${this.props.baseUrl}/student_test/
          ${localStorage.getItem('studentTest_id')}`, {headers})
        .then(res => {
          console.log(res.data)
          this.setState({clusters: res.data.studentTest.student_test_question_groups})
        }).catch(e => {
          console.log(e)
        })
        // console.log(resStudentTestGroup)
  }

  // deleteThisGoal() {
    

    
  // }

  startExam = async () => {
    try {
      const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
        'Content-Type': 'application/json'
      }
      const data = {
        _method:'PUT',
        on_progress:1,
        start_datetime: new Date()
      }
      const url = `https://vps.carakde.id/api_alfatih/api/student/test/answer/
      ${localStorage.getItem('studentTestQuestion')}`
      let resStartExam = await axios.post(url, data, {headers})
      console.log(resStartExam)
    } catch(e) {
      console.log(e)
    }
  }

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }

  // toExam() {
  //   localStorage.setItem('studentTestQuestion')
  // }
  render() {
    const getAlert = (e) => (
      <SweetAlert 
        info
        showCancel
        title="Apakah anda siap untuk mulai Tes?"
        confirmBtnText="Ya, Mulai"
        cancelBtnText="Nanti dulu"
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
        onCancel={() => this.hideAlert()}
        allowOutsideClick={true} 
        onConfirm={() => this.startExam()}
      >
      </SweetAlert>
    );
    return (
      <React.Fragment>
        {/* <Header /> */}
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
                        {this.state.clusters.map(cluster => 
                          <Col md="6" className="mb-3" key={cluster.id}>
                              <Card body >
                                  <div style={{display: 'inherit'}}>
                                      <FontAwesomeIcon icon={cluster.question_group.category.name === 'TKPA' ? faLightbulb : 
                                      (cluster.question_group.category.name === 'SAINTEK' ? faChartLine : faBriefcase)} 
                                      color={cluster.question_group.category.name === 'TKPA' ? '#efc738' : 
                                      (cluster.question_group.category.name === 'SAINTEK' ? '#1cd29e' : '#e83737')} size="6x" 
                                      className="mr-3" />
                                      <div className="content-group">
                                          <h4>{cluster.question_group.category.name}</h4>
                                          <small style={{color: 'transparent'}}>Berisi soal-soal Tes Potensi akademik</small>
                                          {/* <div></div> */}
                                          <Link className={cluster.completed === 1 ? 'disabled': ''} to="#"
                                          onClick={() => {
                                            localStorage.setItem('studentTestQuestion', cluster.id)
                                            
                                            if(cluster.on_progress === 0 && cluster.start_datetime === null) {
                                              this.setState({alert: getAlert()})
                                              return
                                            }
                                          }
                                          }>
                                          <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
                                              <h5 className="mt-2 mr-2 text-muted">{cluster.on_progress === 0 && cluster.start_datetime === null ? 'Pilih Soal' : 'Lanjutkan'}</h5>
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
            {this.state.alert}
        </Container>
      </React.Fragment>
    )
  }
}

Cluster.defaultProps = defaultProps

export default Cluster

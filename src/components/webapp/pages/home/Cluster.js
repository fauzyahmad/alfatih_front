import React, { Component } from 'react'
import { 
    Container, 
    Row, 
    Col, 
    Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import lampImg from '../../../image/lamp.svg'
import chartImg from '../../../image/line-chart.svg'
import caseImg from '../../../image/portfolio.svg'
// import Header from '../../layout/Header'
import SweetAlert from 'react-bootstrap-sweetalert'
import './Home.css'
import axios from "axios";
// import loadable from '@loadable/component'
import Panel from '../../layout/Panel'
// import PropTypes from 'prop-types';
import pMinDelay from 'p-min-delay'

// const Panel = loadable(() => import('../../layout/Panel'))
const defaultProps = {
  baseUrl: 'http://157.230.33.225/api_alfatih/api'
}
export class Cluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      clusters: [],
      start_date: '',
      isLoaded: false
    };
  }
  
  componentDidMount() {
      
      // const value = await pMinDelay(this.getStudentTestGroup(), 1000);
      this.getStudentTestGroup()
      // Executed after minimum 1 second even if `somePromise` fulfills before that
   
    
  }

  componentWillUnmount() {
    console.log('componentcluster, unmount')
    this.setState({clusters: []})
  }

  getStudentTestGroup = async () => {
    this.setState({isLoaded: true})
    try {
      const headers = {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
          'Content-Type': 'application/json'
      }
      let resCluster = await axios.get(`${this.props.baseUrl}/student_test/
          ${localStorage.getItem('studentTest_id')}`, {headers})
      let stateRes = await resCluster.data.studentTest.student_test_question_groups
      this.setState({clusters: stateRes})
      this.setState({isLoaded: false})
    } catch(e) {
      console.log(e)
    }
        // console.log(resStudentTestGroup)
  }

    timeNow() {
      var now = new Date();
      var year = "" + now.getFullYear();
      var month = "" + (now.getMonth() + 1); if (month.length === 1) { month = "0" + month; }
      var day = "" + now.getDate(); if (day.length === 1) { day = "0" + day; }
      var hour = "" + now.getHours(); if (hour.length === 1) { hour = "0" + hour; }
      var minute = "" + now.getMinutes(); if (minute.length === 1) { minute = "0" + minute; }
      var second = "" + now.getSeconds(); if (second.length === 1) { second = "0" + second; }
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }
    
  startExam = async () => {
    try {
    //   var d = new Date();
    //   d = new Date(d.getTime() - 3000000);
    //   var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
    // // console.log(date_format_str);
      const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
        'Content-Type': 'application/json'
      }
      const data = {
        _method:'PUT',
        on_progress:1,
        start_datetime: this.timeNow()
      }
      const url = `http://157.230.33.225/api_alfatih/api/student/test/question_group/
      ${localStorage.getItem('studentTestQuestion')}/update`
      let resStartExam = await axios.post(url, data, {headers})
      console.log(resStartExam)
      this.getExam()
    } catch(e) {
      console.log(e)
    }
  }

  getExam = async () => {
    this.setState({isLoaded: true})
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
      'Content-Type': 'application/json'
    }
    let responseExams = await axios.get(`http://157.230.33.225/api_alfatih/api/student/test/question_group/
    ${localStorage.getItem('studentTestQuestion')}`, {headers})
    let response = responseExams.data.studentTestQuestionGroup
    localStorage.setItem(`exams${localStorage.getItem('studentTestQuestion')}`, JSON.stringify(response))
    console.log(response)
    this.setState({isLoaded: false})
    window.location = '/exam'
    // this.props.history.push('/exam')
    // console.log(response)
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

    const getAlertContinue = (e) => (
      <SweetAlert 
        info
        showCancel
        title="Apakah kamu ingin melanjutkan Soal ini?"
        confirmBtnText="Ya, Lanjutkan"
        cancelBtnText="Nanti dulu"
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
        onCancel={() => this.hideAlert()}
        allowOutsideClick={true} 
        onConfirm={() => this.getExam()}
      >
      </SweetAlert>
    );
    return (
      <React.Fragment>
        {/* <Header /> */}
        <Container className="mt-5 pt-5" id="container">
        <div className={this.state.isLoaded === true ? "loading" : "d-none"}>
            <div className="loader"></div>
        </div>
            <Row>
                <Col sm="12" md="8" className="mb-4">
                    <Row>
                        <Col md="12" className="mb-4">
                            <h1 className="text-center">
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
                                      <img className="imgIcon" alt="icon-kluster" src={cluster.question_group.category.name === 'TKPA' ? lampImg : 
                                      (cluster.question_group.category.name === 'SAINTEK' ? chartImg : caseImg)} 
                                      color={cluster.question_group.category.name === 'TKPA' ? '#efc738' : 
                                      (cluster.question_group.category.name === 'SAINTEK' ? '#1cd29e' : '#e83737')} size="6x" 
                                      />
                                      <div className="content-group">
                                          <h4>{cluster.question_group.category.name}</h4>
                                          <small style={{color: 'transparent'}}>Berisi soal-soal Tes Potensi akademik</small>
                                          {/* <div></div> */}
                                          <Link style={cluster.completed === 1 ? {pointerEvents: 'none'} : {color: '#6c757d !important'}} 
                                          to="#"
                                          className={cluster.completed === 1 ? 'text-transparent' : ''}
                                          onClick={() => {
                                            localStorage.setItem('studentTestQuestion', cluster.id)
                                            if(cluster.on_progress === 0 && cluster.start_datetime === null) {
                                              this.setState({alert: getAlert()})
                                            } else {
                                              this.setState({alert: getAlertContinue()})
                                            }
                                            // this.props.history.push('/exam')
                                            // window.location.href ='/exam'
                                          }
                                          }>
                                          <div className="float-right mt-3" style={{display: '-webkit-inline-box'}}>
                                              <h5 style={cluster.completed === 1 ? {color: 'transparent!important'}: {color: '#6c757d !important'}}
                                              className={cluster.completed === 1 ? 'text-transparent mt-2 mr-2' : 'mt-2 mr-2'}>{cluster.on_progress === 0 && cluster.start_datetime === null ? 'Pilih Soal' : 'Lanjutkan'}</h5>
                                              <FontAwesomeIcon
                                              icon={faChevronRight} 
                                              size="2x" className={cluster.completed === 1 ? 'text-transparent mt-1' : 'mt-1'} 
                                              color={cluster.completed === 1 ? {color: 'transparent!important'}: {color: '#6c757d !important'}}/>
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

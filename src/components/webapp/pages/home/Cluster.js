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
      clusters: []
    };
  }
  
  componentWillMount() {
    this.getStudentTestGroup()
  }

  getStudentTestGroup = async () => {
    try{
      const headers = {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
          'Content-Type': 'application/json'
      }
      let resStudentTestGroup = await axios.get(
        `${this.props.baseUrl}/student_test/
          ${localStorage.getItem('studentTest_id')}`, {headers})
        // console.log(resStudentTestGroup)
        this.setState({clusters: resStudentTestGroup.data.studentTest.student_test_question_groups})
    } catch(e) {
      console.log(e)
    }
  }

  deleteThisGoal() {
    const getAlert = () => (
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
        onConfirm={() => window.location.href="/exam"}
      >
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }
  render() {
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
                                          <Link to="#"
                                          onClick={() => this.deleteThisGoal()}>
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

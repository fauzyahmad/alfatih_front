import React, { Component } from 'react'
// import update from 'immutability-helper'
// import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { 
    Container, 
    Row, 
    Col, Card, Button, CardHeader, CardBody,
    PaginationItem, PaginationLink, Pagination, Modal,
    ModalBody
    } from 'reactstrap'
import parser from 'html-react-parser';
// import Header from '../../layout/Header'
// import Paginations from './Paginations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './Exam.css'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import successRegister from '../../../image/verified.svg'
// import PropTypes from 'prop-types';
// import { throws } from 'assert';
const defaultProps = {
   baseUrl: 'https://api.alfatihcollege.com/api'
}

export class Exam extends Component {
  constructor(props) {
      super(props)
      this.state = {
        exam: '',
        currentPage: 1,
        examPerPage: 1,
        time: '',
        modal: false,
        backdrop: 'static',
        alert: null
      }
      this.handleClick = this.handleClick.bind(this);
      this.toggle = this.toggle.bind(this);
    //   this.countDownTime = this.countDownTime.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.finishExam()
  }

  countDownTime() {
    
    var waktuKerja = this.state.exam.question_group.time_in_minutes
    var matchDate = this.state.exam.start_datetime
    var match = matchDate.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/)
    var startDateTime = new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6])
    
    var durationTime = new Date().getTime() - startDateTime.getTime()
    var countDownTime = (waktuKerja*60000) - durationTime
    countDownTime =  countDownTime / 1000
    function component(x, v) {
        return Math.floor(x / v);
    }
    // Update the count down every 1 second
    try {
        var x = setInterval(async() => {
            // console.log('perhitungan count', count-1)
            // localStorage.setItem(`count`, parseInt(localStorage.getItem(`count`)) - 1);
            countDownTime = countDownTime-1
            console.log('countdown', countDownTime)      
                
            var hours = component(countDownTime,      60 * 60) % 24,
                minutes = component(countDownTime,           60) % 60,
                seconds = component(countDownTime,            1) % 60;
            this.setState({time: `${hours}:${minutes}:${seconds}`})
                
            // If the count down is over, write some text 
            if (countDownTime < -1) {
                clearInterval(x);
                // document.getElementById("demo").innerHTML = "EXPIRED";
                localStorage.removeItem('count')
                console.log('waktu habis')
                this.toggle()
                return
            }
            }, 1000)
          
        } catch(e) {
            console.log(e);
            
    }
  }
  getExams = async () => {
    try{
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
            'Content-Type': 'application/json'
        }
        let responseExams = await axios.get(`https://api.alfatihcollege.com/api/student/test/question_group/
        ${localStorage.getItem('studentTestQuestion')}`, {headers})
          let response = responseExams.data.studentTestQuestionGroup
          this.setState({exam: response})
          localStorage.setItem(`exams${localStorage.getItem('studentTestQuestion')}`, JSON.stringify(response))
        //   console.log(localStorage.getItem('exams'))
        //   console.log(this.state.exam)
    } catch(e) {
        console.log(e)
    }
  }

  finishExam = async () => {
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
        on_progress:0,
        completed: 1
      }
      const url = `https://api.alfatihcollege.com/api/student/test/question_group/
      ${localStorage.getItem('studentTestQuestion')}/update`
      let resStartExam = await axios.post(url, data, {headers})
      console.log(resStartExam)
      localStorage.removeItem(`exams${localStorage.getItem('studentTestQuestion')}`)
    //   this.setState({alert: this.getAlertSubmitted()})

    //   this.getExam()
    } catch(e) {
      console.log(e)
    }
  }

  componentDidMount() {
      // reset page if exam array has changed
    //   this.getExams()
    this.countDownTime(this) 

    
    // this.forceUpdate()
    
  }

  componentWillMount(){
      //   this.countDownTime()
      let examStorage = localStorage.getItem(`exams${localStorage.getItem('studentTestQuestion')}`)
      if(examStorage !== null) {
        this.setState({exam: JSON.parse(examStorage)})
        return
      }
      this.getExams()
      
    // this.setState({exams: 'abc'})
    // console.log('did mount', this.state.exams)
    // this.countDownTime(this)
  }

//   componentWillUnmount() {
//       console.log('unmount exam')
//       this.setState({
//           exam: '',
//           time: ''
//       })
//   }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }

    hideAlert() {
        // console.log('Hiding alert...');
        this.setState({
          alert: null
        });
    }
  
  render() {
    window.onbeforeunload = function (e) {
        var e = e || window.event;
      
        //IE & Firefox
        if (e) {
          e.returnValue = 'Are you sure?';
        }
      
        // For Safari
        return 'Are you sure?';
      };
    const getAlertSubmitted = () => (
        <SweetAlert
            success
            confirmBtnText="Ok"
            confirmBtnBsStyle="success"
            title="Selamat"
            // cancelBtnBsStyle="default"
            onConfirm={() => {
                // this.props.history.push(`/cluster/${localStorage.getItem('studentTest_id')}`)
                window.location = '/#/'
            }}
            // onCancel={this.hideAlert}
            >
            Kamu telah selesai mengerjakan Soal-soal yang ada
        </SweetAlert>
    )

    const getAlertConfirmation = (e) => (
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Ya"
            cancelBtnText="Batalkan"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Sudah Selesai?"
            onConfirm={() => {
                const finishExam = async () => {
                    try {
                   
                      const headers = {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
                        'Content-Type': 'application/json'
                      }
                      const data = {
                        _method:'PUT',
                        on_progress:0,
                        completed: 1
                      }
                      const url = `https://api.alfatihcollege.com/api/student/test/question_group/
                      ${localStorage.getItem('studentTestQuestion')}/update`
                      let resStartExam = await axios.post(url, data, {headers})
                      console.log(resStartExam)
                      localStorage.removeItem(`exams${localStorage.getItem('studentTestQuestion')}`)
                      this.setState({alert: getAlertSubmitted()})
                    //   this.getExam()
                    } catch(e) {
                      console.log(e)
                    }
                  }
                finishExam()
            }}
            onCancel={() => this.hideAlert()}
            >
            Apakah yakin dengan jawaban-jawaban anda?
        </SweetAlert>
    )
    // Set the date we're counting down to
    
    // this.setState({time: `${this.hours}h ${minutes}m ${seconds}`})
    const numExam = this.state.exam.student_test_answers.length
    const { exam, currentPage, examPerPage } = this.state;
    const indexOfLastExam = currentPage * examPerPage;
    const indexOfFirstTodo = indexOfLastExam - examPerPage;
    const currentExam = exam.student_test_answers.slice(indexOfFirstTodo, indexOfLastExam);
    // // console.log(exam)
    // // console.log(JSON.parse(localStorage.getItem('exam')))
    // console.log(exam.student_test_answers)
    console.log(currentExam);

    const renderExams = currentExam.map((exam, idx) => {
        console.log(exam);
        return <Card key={exam.id}>
            <CardHeader>
                <h6 className="float-left">Soal {exam.question.number} dari {numExam}</h6>
                <h6 className="float-right">Waktu: 
                    <span className="text-danger">
                        {' '}{this.state.time}
                    </span>
                </h6>
            </CardHeader>
            <CardBody>
            {/* {exam.question.number}. */}
                <h5>{parser(`${exam.question.text}`)}</h5>
                {exam.question.choices.map(choice => 
                    <div key={choice.id} className="container-choice">
                            <div
                            className={exam.question_choice_id === choice.id ? 
                                'p-3 fade-in question-choices answer choice-width' : 'p-3 question-choices choice-width'}
                            
                            >
                            <FontAwesomeIcon
                                icon={exam.question_choice_id === choice.id ? faCheckCircle : faCircle} 
                                size="2x" 
                                color={exam.question_choice_id === choice.id ? "#1cd39d" : "black"}
                                className={exam.question_choice_id === choice.id ? "fade-in mr-3" : "mr-3"}
                                key={choice.id}
                                id={choice.id} 
                                name={exam.id}
                                onClick={e => {
                                    var studentTestExam = this.state.exam
                                    var studentTestAnswerIdx = this.state.exam.student_test_answers.findIndex(arr =>
                                            arr.id === exam.id
                                        )
                                    var studentTest = this.state.exam.student_test_answers
                                    console.log(studentTest[studentTestAnswerIdx].question_choice_id)
                                    var question_choice_id = studentTest[studentTestAnswerIdx].question_choice_id
                                    var index2 = studentTest[studentTestAnswerIdx].question.choices.findIndex(arr => 
                                        arr.id === choice.id
                                    )
                                    var studentChoice = studentTest[studentTestAnswerIdx].question.choices
                                    console.log(studentChoice[index2].id)
                                    var idChoice = studentChoice[index2].id
                                    // studentTest[studentTestAnswerIdx].checked = true
                                    // false check
                                    if(question_choice_id === idChoice) {
                                        (async () => {
                                            try {
                                                const headers = {
                                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
                                                    'Content-Type': 'application/json'
                                                }
                                                const data = {
                                                    question_choice_id: 0,
                                                    _method:'PUT'
                                                }
                                                const url = `https://api.alfatihcollege.com/api/student/test/answer/${exam.id}`
                                                let falseCheck = await axios.post(url, data, {headers})
                                                
                                                console.log(falseCheck);
                                                console.log(studentTestExam)
                                                // this.getExams() 
                                            } catch(e) {
                                                console.log(e);
                                            }
                                        })()
                                        studentTest[studentTestAnswerIdx].question_choice_id = 0
                                        studentTest[studentTestAnswerIdx].checked = false 
                                        this.setState({exam: studentTestExam})
                                        localStorage.setItem(`exams${localStorage.getItem('studentTestQuestion')}`, JSON.stringify(studentTestExam))
                                        console.log('sama')
                                    } else { // true check
                                        (async () => {
                                            try {
                                                const headers = {
                                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token').toString(),
                                                    'Content-Type': 'application/json'
                                                }
                                                const data = {
                                                    question_choice_id: idChoice,
                                                    _method:'PUT'
                                                }
                                                
                                                const url = `https://api.alfatihcollege.com/api/student/test/answer/${exam.id}`
                                                let trueCheck = await axios.post(url, data, {headers})
                                                console.log(trueCheck);
                                                
                                                console.log(studentTestExam)
                                                
                                            } catch(e) {
                                                console.log(e);
                                            }
                                            
                                        })()
                                        studentTest[studentTestAnswerIdx].checked = true
                                        studentTest[studentTestAnswerIdx].question_choice_id = studentChoice[index2].id
                                        this.setState({exam: studentTestExam})
                                        localStorage.setItem(`exams${localStorage.getItem('studentTestQuestion')}`, JSON.stringify(studentTestExam))
                                        console.log('beda')
                                    }
                                    // console.log(studentTest[studentTestAnswerIdx].checked);
                                    
                                }}
                            />
                            {parser(`${choice.text}`)}
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(exam.student_test_answers.length / examPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers)
    //get last array
    var last =  function(array, n) {
        if (array == null) 
          return void 0;
        if (n == null) 
           return array[array.length - 1];
        return array.slice(Math.max(array.length - n, 0));
        };

    const renderPageNumbers = pageNumbers.map((number, i) => {
        // console.log('check validity', exam.student_test_answers[i])
        return (
            <PaginationItem 
                className={currentPage === number ? 'active' : ''} 
                key={number}>
                <PaginationLink 
                    style={exam.student_test_answers[i].checked === true ? {background : "#18d19f", color: '#fff' } : {background: "white", color: '#007bff'} } 
                    id={number} 
                    onClick={this.handleClick}
                >
                    {number}
                </PaginationLink>
            </PaginationItem>
        )
    })
    
    return (
        this.state.exam ? 
      <React.Fragment>
        {/* <Header /> */}
        <Container className="mt-5 pt-5">
            <Row>
            <Modal isOpen={this.state.modal}>
                <ModalBody>
                    <div className="text-center">
                        <img src={successRegister} alt="imageBook" className="imgIconAuth" />
                        <h1>Waktu Habis</h1>
                        <p className="mt-2 text-muted">Waktu pengerjaan soal telah habis</p>
                        <Button className="mt-3 btn btn-lg btn-primary" color="primary" 
                        onClick={() => {
                            // this.toggle()
                            window.location = '/#/'
                        }}>OK</Button>
                    </div>
                </ModalBody>
            </Modal>
                <Col>
                    {renderExams}
                    <div className="text-center mb-3 mt-3">
                        <Button color="secondary"
                            size="md" className={currentPage === 1 ? 'd-none' : 'mt-2 mb-2'}
                            onClick={() => this.setState({currentPage: currentPage - 1})}>
                            <FontAwesomeIcon icon={faChevronLeft} color="white" size="1x"/> Soal Sebelumnya
                        </Button>{' '}
                        <Button color="primary"
                            size="md" className={currentPage === last(pageNumbers) ? 'd-none' : 'mt-2 mb-2'}
                            onClick={() => this.setState({currentPage: currentPage + 1})}>
                            Soal Selanjutnya <FontAwesomeIcon icon={faChevronRight} color="white" size="1x"/>
                        </Button>
                        <Button color="success"
                            size="md" className={currentPage === last(pageNumbers) ? 'mt-2 mb-2' : 'd-none'}
                            onClick={() => {
                                this.setState({alert: getAlertConfirmation()})
                            }}>
                            Submit <FontAwesomeIcon icon={faCheckCircle} color="white" size="1x"/>
                        </Button> {' '}
                        <Button color="success"
                            size="md" className={currentPage === last(pageNumbers) ? 'd-none' : 'mt-2 mb-2'}
                            onClick={() => {
                                this.setState({alert: getAlertConfirmation()})
                            }}>
                            Submit <FontAwesomeIcon icon={faCheckCircle} color="white" size="1x"/>
                        </Button> {' '}
                    </div>
                    <Pagination size="lg" className="navs">
                        {renderPageNumbers}
                    </Pagination>
                </Col>
            </Row>
            {this.state.alert}
        </Container>
      </React.Fragment>
      : null
    )
  }
}

Exam.defaultProps = defaultProps;

export default Exam

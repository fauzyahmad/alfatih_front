import React, { Component } from 'react'
// import update from 'immutability-helper'
// import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { 
    Container, 
    Row, 
    Col, Card, Button, CardHeader, CardBody,
    PaginationItem, PaginationLink, Pagination
    } from 'reactstrap'
// import Header from '../../layout/Header'
// import Paginations from './Paginations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './Exam.css'
import axios from 'axios'
import PropTypes from 'prop-types';
const defaultProps = {
   baseUrl: 'https://vps.carakde.id/api_alfatih/api'
}

export class Exam extends Component {
  constructor(props) {
      super(props)
      this.state = {
        exam: '',
        currentPage: 1,
        examPerPage: 1,
        time: ''
      }
      this.handleClick = this.handleClick.bind(this);
    //   this.countDownTime = this.countDownTime.bind(this)
  }

  countDownTime() {
    if(localStorage.getItem('time') === null) {
        localStorage.setItem('time', new Date().getTime());
    }

    var timeStorage = parseInt(localStorage.getItem('time'))
    var waktuKerja = this.state.exam.question_group.time_in_minutes
    if(localStorage.getItem('waktu_kerja') === null) {
        localStorage.setItem('waktu_kerja', waktuKerja);
    }
    var countDownDate = new Date(timeStorage + parseInt(localStorage.getItem('waktu_kerja'))*60000);

    // Update the count down every 1 second
    try{
        var x = setInterval(async() => {

            // Get todays date and time
            // waktu server
            var now = new Date().getTime();
                
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
                
            // Time calculations for days, hours, minutes and seconds
            // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            console.log(hours)
        
                
            // Output the result in an element with id="demo"
            // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            // + minutes + "m " + seconds + "s ";
            this.setState({time: `${hours}h ${minutes}m ${seconds}s`})
                
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                // document.getElementById("demo").innerHTML = "EXPIRED";
                localStorage.removeItem('time')
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
        let responseExams = await axios.get(`${this.props.baseUrl}/student/test/question_group/
        ${localStorage.getItem('studentTestQuestion')}`, {headers})
          let response = await responseExams.data.studentTestQuestionGroup
          localStorage.setItem('exams', JSON.stringify(response))
          console.log(localStorage.getItem('exams'))
          this.setState({exam: response})
          console.log(this.state.exam)
    } catch(e) {
        console.log(e)
    }
  }

  componentDidMount() {
      // reset page if exam array has changed
    //   this.getExams()
    this.countDownTime(this)
    
  }

  componentWillMount(){
      //   this.countDownTime()
      let examStorage = localStorage.getItem('exams')
      if(examStorage !== null) {
        this.setState({exam: JSON.parse(examStorage)})
      } else {
        this.getExams()
      }
    // this.setState({exams: 'abc'})
    // console.log('did mount', this.state.exams)
    // this.countDownTime(this)
  }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    onChangeAnswer = (e) => {

    }
    
    
  
  render() {
    console.log(this.state.exam.student_test_answers)
    console.log(this.state.exam)
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

    const renderExams = currentExam.map(exam => {
        console.log(exam);
        return <Card key={exam.id}>
            <CardHeader>
                <h6 className="float-left">Soal  dari {numExam}</h6>
                <h6 className="float-right">Waktu Tersisa: 
                    <span className="text-danger">
                        {' '}{this.state.time}
                    </span>
                </h6>
            </CardHeader>
            <CardBody>
                <h5>{exam.question.text}</h5>
                {exam.question.choices.map(choice => 
                    <div
                        className="p-3" 
                        style={{display: 'flex', alignItems: 'flex-end'}}
                        key={choice.id}
                    >
                        <FontAwesomeIcon
                            icon={exam.question_choice_id === choice.id ? faCheckCircle : faCircle} 
                            size="2x" 
                            color={exam.question_choice_id === choice.id ? "#1cd39d" : "black"}
                            className="mr-3"
                            key={choice.id}
                            id={choice.id} 
                            name={exam.id}
                            onClick={e => {
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
                                            const url = `https://vps.carakde.id/api_alfatih/api/student/test/answer/${exam.id}`
                                            let falseCheck = await axios.post(url, data, {headers})
                                            console.log(falseCheck);
                                            await this.getExams()
                                            studentTest[studentTestAnswerIdx].checked = false  
                                        } catch(e) {
                                            console.log(e);
                                        }
                                    })()
                                    
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
                                            const url = `https://vps.carakde.id/api_alfatih/api/student/test/answer/${exam.id}`
                                            let trueCheck = await axios.post(url, data, {headers})
                                            console.log(trueCheck);
                                            
                                            await this.getExams()
                                            studentTest[studentTestAnswerIdx].checked = true
                                        } catch(e) {
                                            console.log(e);
                                        }
                                    })()
                                    console.log('beda')
                                }
                                // console.log(studentTest[studentTestAnswerIdx].checked);
                                
                            }}
                        />
                        <h6 name={exam.id}>{choice.text}</h6>
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
        console.log('check validity', exam.student_test_answers[i])
        return (
            <PaginationItem 
                className={currentPage === number ? 'active' : ''} 
                key={number}>
                <PaginationLink 
                    style={exam.student_test_answers[i].checked ? {background : "#18d19f", color: '#fff' } : {background: "white", color: '#007bff'} } 
                    id={number} 
                    onClick={this.handleClick}
                >
                    {number}
                </PaginationLink>
            </PaginationItem>
        )
    })
    
    return (
      <React.Fragment>
        {/* <Header /> */}
        <Container className="mt-5 pt-5">
            <Row>
                <Col>
                    {renderExams}
                    <div className="text-center mb-3 mt-3">
                        <Button color="secondary"
                            size="md" className={currentPage === 1 ? 'd-none' : ''}
                            onClick={() => this.setState({currentPage: currentPage - 1})}>
                            <FontAwesomeIcon icon={faChevronLeft} color="white" size="1x"/> Soal Sebelumnya
                        </Button>{' '}
                        <Button color="primary"
                            size="md" className={currentPage === last(pageNumbers) ? 'd-none' : ''}
                            onClick={() => this.setState({currentPage: currentPage + 1})}>
                            Soal Selanjutnya <FontAwesomeIcon icon={faChevronRight} color="white" size="1x"/>
                        </Button>
                        <Button color="success"
                            size="md" className={currentPage === last(pageNumbers) ? '' : 'd-none'}
                            >
                            Submit Jawaban <FontAwesomeIcon icon={faCheckCircle} color="white" size="1x"/>
                        </Button> {' '}
                    </div>
                    <Pagination className="navs">
                        {renderPageNumbers}
                    </Pagination>
                </Col>
            </Row>
        </Container>
      </React.Fragment>
    )
  }
}

Exam.defaultProps = defaultProps;

export default Exam

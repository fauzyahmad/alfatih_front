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


export class Exam extends Component {
  constructor(props) {
      super(props)
      this.state = {
          exam: [
              {
                  id: 1,
                  question: 'Berapakah angka lanjutan dari deret angka berikut : 11 22 24 37 ...',
                  choice: [
                      {
                          id: 20,
                          name: '50',
                          checked: false
                      },
                      {
                          id: 21,
                          name: '51',
                          checked: false
                      },
                      {
                          id: 22,
                          name: '49',
                          checked: false
                      },
                      {
                          id: 23,
                          name: '29',
                          checked: false
                      },
                      {
                          id: 24,
                          name: '39',
                          checked: false
                      }
                  ]
              },
              {
                  id: 2,
                  question: 'Dimana perbedaan ?',
                  choice: [
                      {
                          id: 25,
                          name: '50',
                          checked: false
                      },
                      {
                          id: 26,
                          name: '51',
                          checked: false
                      },
                      {
                          id: 27,
                          name: '49',
                          checked: false
                      },
                      {
                          id: 28,
                          name: '29',
                          checked: false
                      },
                      {
                          id: 29,
                          name: '39',
                          checked: false
                      }
                  ]
              },
              {
                  id: 3,
                  question: 'Bagaimana perbedaan  itu?',
                  choice: [
                      {
                          id: 30,
                          name: '50',
                          checked: false
                      },
                      {
                          id: 31,
                          name: '51',
                          checked: false
                      },
                      {
                          id: 32,
                          name: '49',
                          checked: false
                      },
                      {
                          id: 33,
                          name: '29',
                          checked: false
                      },
                      {
                          id: 34,
                          name: '39',
                          checked: false
                      }
                  ]
              },
              {
                  id: 4,
                  question: 'Mengapa perbedaan antara ini dan itu?',
                  choice: [
                      {
                          id: 35,
                          name: '50',
                          checked: false
                      },
                      {
                          id: 36,
                          name: '51',
                          checked: false
                      },
                      {
                          id: 37,
                          name: '49',
                          checked: false
                      },
                      {
                          id: 38,
                          name: '29',
                          checked: false
                      },
                      {
                          id: 39,
                          name: '39',
                          checked: false
                      }
                  ]
              },
              {
                  id: 5,
                  question: 'Kenapa perbedaan antara ini dan itu?',
                  choice: [
                    {
                        id: 40,
                        name: '50',
                        checked: false
                    },
                    {
                        id: 41,
                        name: '51',
                        checked: false
                    },
                    {
                        id: 42,
                        name: '49',
                        checked: false
                    },
                    {
                        id: 43,
                        name: '29',
                        checked: false
                    },
                    {
                        id: 44,
                        name: '39',
                        checked: false
                    }
                ]
              }
            ],
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
    var countDownDate = new Date(timeStorage + 90*60000);

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
    

  componentDidMount() {
      // reset page if exam array has changed
      let examStorage = localStorage.getItem('exam')
      if(examStorage !== null) {
        this.setState({exam: JSON.parse(examStorage)})
      }
  }

  componentWillMount(){
      //   this.countDownTime()
    this.countDownTime(this)
  }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    onChangeAnswer = (e) => {

    }
    
    
  
  render() {
    // Set the date we're counting down to
    
    // this.setState({time: `${this.hours}h ${minutes}m ${seconds}`})
    const numExam = this.state.exam.length
    const { exam, currentPage, examPerPage } = this.state;
    const indexOfLastExam = currentPage * examPerPage;
    const indexOfFirstTodo = indexOfLastExam - examPerPage;
    const currentExam = exam.slice(indexOfFirstTodo, indexOfLastExam);
    // console.log(exam)
    // console.log(JSON.parse(localStorage.getItem('exam')))
    // console.log(currentExam);

    const renderExams = currentExam.map(exam => {
        return <Card key={exam.id}>
            <CardHeader>
                <h6 className="float-left">Soal {exam.id} dari {numExam}</h6>
                <h6 className="float-right">Waktu Tersisa: 
                    <span className="text-danger">
                        {' '}{this.state.time}
                    </span>
                </h6>
            </CardHeader>
            <CardBody>
                <h5>{exam.question}</h5>
                {exam.choice.map(choice => 
                    <div
                        className={choice.checked ? 'p-3 border-exam' : 'p-3'} 
                        style={{display: 'flex', alignItems: 'flex-end'}}
                        key={choice.id}
                    >
                        <FontAwesomeIcon
                        icon={choice.checked ? faCheckCircle : faCircle} 
                        size="2x" 
                        color={choice.checked ? '#0e9ab3': 'black'}
                        className="mr-3"
                        key={choice.id}
                            id={choice.id} 
                            name={exam.id}
                        onClick={e => {
                        var index = this.state.exam.findIndex(arr => 
                            arr.id === exam.id
                        )
                        var item =  this.state.exam;
                        // console.log(item[index])
                        var index2 = item[index].choice.findIndex(arr => arr.id === choice.id)
                        console.log(index2)

                            if (choice.checked){
                                
                                item[index].checked = false;
                                
                                for (let i in item[index].choice){
                                    item[index].choice[i].checked = false
                                }                                                         
                                // item[index].choice[index2].checked = false
                                // console.log(item[index].choice[index2].name)
                                this.setState({
                                    pageOfItems : item
                                })
                                localStorage.setItem('exam', JSON.stringify(item))
                                return
                            }                                        
                            
                            for (let i in item[index].choice){
                                item[index].choice[i].checked = false
                            }
                                       
                            item[index].checked = true;

                            item[index].choice[index2].checked = true
                            // console.log(item[index].choice[index2].name)
                            this.setState({
                                pageOfItems : item
                            })
                            localStorage.setItem('exam', JSON.stringify(item))
                        }}
                        />
                        <h6 name={exam.id}>{choice.name}</h6>
                    </div>
                )}
            </CardBody>
        </Card>
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(exam.length / examPerPage); i++) {
      pageNumbers.push(i);
    }
    //get last array
    var last =  function(array, n) {
        if (array == null) 
          return void 0;
        if (n == null) 
           return array[array.length - 1];
        return array.slice(Math.max(array.length - n, 0));
        };

    const renderPageNumbers = pageNumbers.map((number, i) => {
        return (
            <PaginationItem 
                className={currentPage === number ? 'active' : ''} 
                key={number}>
                <PaginationLink 
                    style={exam[i].checked ? {background : "#18d19f", color: '#fff' } : {background: "white", color: '#007bff'} } 
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

export default Exam

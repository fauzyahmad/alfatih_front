import React, { Component } from 'react'
import update from 'immutability-helper'
import { 
    Container, 
    Row, 
    Col, Card, Button, CardHeader, CardBody,
    FormGroup, Label, CustomInput
    } from 'reactstrap'
import Paginations from './Paginations'
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
          pageOfItems: []
      }
      this.onChangePage = this.onChangePage.bind(this);
  }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
        // console.log(this.props.pager.currentPage)
    }

    // onChangeAnswer = (examIndex, choiceIndex) => {
    //     const exams = {
    //         exam: update(this.state.exam, {
    //             [examIndex]: {
    //                 choice: {
    //                     0: {
    //                         checked: {$set: true}
    //                     }
    //                 }
    //             }
    //         })
    //     }
    //     console.log(examIndex)

    //     this.setState(exams)
       
    //     // this.state.exam.map((examIndex, idx) => 
    //     //     examIndex.choice.map(choiceIndex => 
    //     //         this.setState({exam: update(this.state.exam, { 1: { choice: { 1: { name: { $set: 'z' } } } } } )})
    //     //     )
    //     // )
    //     // this.setState({
    //     //     exam: this.state.exam.map((exams, indexs) => {
    //     //         let choice;
    //     //         if(indexs === examIndex) {
    //     //             choice = exams.choice.map((choices, index) => {
    //     //                 if(index === choiceIndex) {
    //     //                     return {
    //     //                         ...choices,
    //     //                         checked: true
    //     //                     }
    //     //                 }
    //     //                 return choices
    //     //             })
    //     //             console.log(choice)
    //     //             return {
    //     //                 ...exams,
    //     //                 choice: choice
    //     //             }
    //     //         }
    //     //         return exams
    //     //     })
    //     // })



    // }
    // this.setState({exam: update(this.state.exam, { 0: { choice: { 1: { name: { $set: 'z' } } } } } )})
    // onChangeName = () => {
    //     this.se
    // }
    
  
  render() {
    const numExam = this.state.exam.length
    // const exams = this.state.exam[0].choice[0]
    // console.log(exams)
    // this.updateItem(2, {question: 'abs'})
    // const arrayChoice = []
    // this.state.pageOfItems.map(item => 
    //     // console.log(item.choice) 
    //     // item.choice.map(choice => console.log(choice))
    // )
    return (
      <React.Fragment>
        <Container className="mt-5 pt-5">
            <Row>
                <Col>
                
                        {this.state.pageOfItems.map(item =>
                            // <div key={item.id}>
                            // <h3>{item.question}</h3>
                            // <p>{item.answer[0]}</p>
                            // <p>{item.answer[1]}</p>
                            // <p>{item.answer[2]}</p>
                            // <p>{item.answer[3]}</p>
                            // </div>
                            <Card key={item.id}>
                                <CardHeader>Soal {item.id} dari {numExam}</CardHeader>
                                    <CardBody>
                                        <h5>{item.question}</h5>
                                        <FormGroup>
                                            {/* <Label for="exampleCheckbox">Radios</Label> */}
                                            {item.choice.map(choice =>
                                                <CustomInput type="radio" 
                                                    key={choice.id}
                                                    id={choice.id} 
                                                    name={item.id}
                                                    value={choice.name} defaultChecked={choice.checked}
                                                    className="checkValid" 
                                                    label={choice.name}
                                                    // onChange={this.onChangeAnswer}
                                                />
                                            )}
                                        </FormGroup>
                                    </CardBody>
                                {/* <CardFooter>
                                    
                                </CardFooter> */}
                            </Card>
                        )}
                        <Paginations items={this.state.exam} onChangePage={this.onChangePage} />
                </Col>
            </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Exam

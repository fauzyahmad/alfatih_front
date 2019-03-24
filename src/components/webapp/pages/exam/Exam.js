import React, { Component } from 'react'
import { 
    Container, 
    Row, 
    Col
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
                  question: 'Apakah perbedaan antara ini dan itu?',
                  answer: [
                      'satu', 'dua', 'tiga', 'empat'
                  ]
              },
              {
                  id: 2,
                  question: 'Dimana perbedaan ?',
                  answer: [
                      'satu', 'dua', 'lima', 'empat'
                  ]
              },
              {
                  id: 3,
                  question: 'Bagaimana perbedaan  itu?',
                  answer: [
                      'satu', 'dua', 'tiga', 'empat'
                  ]
              },
              {
                  id: 4,
                  question: 'Mengapa perbedaan antara ini dan itu?',
                  answer: [
                      'satu', 'dua', 'tiga', 'empat'
                  ]
              },
              {
                  id: 5,
                  question: 'Kenapa perbedaan antara ini dan itu?',
                  answer: [
                      'satu', 'dua', 'tiga', 'empat'
                  ]
              },
              {
                  id: 6,
                  question: 'However perbedaan antara ini dan itu?',
                  answer: [
                      'satu', 'dua', 'tiga', 'empat'
                  ]
              },
              {
                  id: 7,
                  question: 'What is perbedaan antara ini dan itu?',
                  answer: [
                      'satu', 'dua', 'tiga', 'empat'
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
    }
  
  render() {
    return (
      <React.Fragment>
        <Container className="mt-5">
            <Row>
                <Col>
                
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>
                            <h3>{item.question}</h3>
                            <p>{item.answer[0]}</p>
                            <p>{item.answer[1]}</p>
                            <p>{item.answer[2]}</p>
                            <p>{item.answer[3]}</p>
                            </div>
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

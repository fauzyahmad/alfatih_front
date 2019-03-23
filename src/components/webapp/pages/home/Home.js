import React, { Component } from 'react'
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    Button, 
    CardTitle, 
    CardText } from 'reactstrap'
import './Home.css'

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Container className="mt-5">
            <Row>
                <Col md="6">
                    <Card body>
                        <CardTitle>
                            <h4>SAINTEK</h4>
                        </CardTitle>
                        <CardText>
                            Paket Tryout
                        </CardText>
                        <Button>Pilih</Button>
                    </Card>
                </Col>
                <Col md="6">
                    <Card body>
                        <CardTitle>
                            <h4>SOSHUM</h4>
                        </CardTitle>
                        <CardText>
                            Paket Tryout
                        </CardText>
                        <Button>PILIH</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Home

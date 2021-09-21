import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { indexListings } from '../../api/listings'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
// import ClickCounter from './ClickCounter'

class IndexListings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: null,
      isLoaded: true
    }
  }

  componentDidMount () {
    axios(apiUrl + '/listings')
      .then(res => {
        this.setState({ items: res.data.listings })
      })
      .catch(console.error)
  }

  render () {
    let listedItems
    const { items } = this.state
    if (!items) {
      listedItems = <Spinner animation='border' />
    } else {
      listedItems = items.map((item) => (
        <Card
          key={item._id}
          className='d-inline-flex p-2'
          style={{
            width: '15rem',
            height: '18rem',
            margin: '10px',
            marginTop: '30px'
          }}>
          <Card.Img
            variant='top'
            style={{ width: '100%', height: '48%' }}
            src={item.image}
          />
          <Card.Body>
            <Link to={'/listings/' + item._id}>
              <Card.Title style={{
                textAlign: 'center',
                borderBottom: '2px solid black',
                paddingBottom: '15px',
                margin: '0 auto'
              }}>{item.title}</Card.Title>
            </Link>
            <ListGroup className='list-group-flush'>
              <ListGroup.Item style={{ color: 'green', fontFamily: 'sans-serif' }}>{item.price}</ListGroup.Item>
              <ListGroup.Item>{item.userEmail}</ListGroup.Item>
            </ListGroup>
            {/* <Button onClick={() => history.push(`/listings/${item._id}`)} variant='primary'>View Item</Button> */}
          </Card.Body>
        </Card>
      ))
    }
    return (
      <>
        <div>{listedItems}</div>
      </>
    )
  }
}

export default withRouter(IndexListings)

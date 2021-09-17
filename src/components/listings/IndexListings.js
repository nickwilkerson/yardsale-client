import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { indexListings } from '../../api/listings'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

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
    // const { history } = this.props
    if (!items) {
      listedItems = <Spinner animation='border' />
    } else {
      listedItems = items.map((item) => (
        <Card
          key={item._id}
          className='d-inline-flex p-2'
          style={{
            width: '18rem',
            margin: '10px'
          }}>
          <Card.Img
            variant='top'
            src='https://c1.wallpaperflare.com/preview/928/415/609/snowboard-winter-winter-sports-sport.jpg'
          />
          <Card.Body>
            <Link to={'/listings/' + item._id}>
              <Card.Title>{item.title}</Card.Title>
            </Link>
            <Card.Text>{item.description}</Card.Text>
            <ListGroup className='list-group-flush'>{item.price}</ListGroup>
            {/* <Button onClick={() => history.push(`/listings/${item._id}`)} variant='primary'>View Item</Button> */}
          </Card.Body>
        </Card>
      ))
    }
    return <div>{listedItems}</div>
  }
}

export default withRouter(IndexListings)

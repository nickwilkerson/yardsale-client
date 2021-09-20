import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import { indexListings } from '../../api/listings'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { deleteListing, indexListings } from '../../api/listings'

class PostedListings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      isLoaded: true
    }
  }

  componentDidMount () {
    indexListings(this.props.user)
      .then((res) => {
        this.setState({ items: res.data.listings })
      })
      .catch(console.error)
  }

  // delete owned listing event handler
  delete = (itemId) => {
    const { user, match, history, msgAlert } = this.props
    deleteListing(itemId, user)
      .then(() => history.push('/'))
      .then(() => history.push(match.url))
      .then(() =>
        msgAlert({
          heading: 'Successfully Deleted Listing',
          message: 'Your post no longer exists.',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Failed to Delete Listing',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      )
      .catch(console.error)
  }

  render () {
    let listedItems
    const { items } = this.state
    const { user, match } = this.props

    // variable for items that user owns
    const filteredItems = items.filter(item => user._id === item.owner)

    if (!items) {
      listedItems = 'Loading...'
    } else if (filteredItems.length >= 1) {
      listedItems = filteredItems.map((item) => (
        <Card
          key={item._id}
          className='d-inline-flex p-2'
          style={{
            width: '18rem',
            margin: '10px',
            marginTop: '30px'
          }}>
          <Card.Img
            variant='top'
            src='https://c1.wallpaperflare.com/preview/928/415/609/snowboard-winter-winter-sports-sport.jpg'
          />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.price}</Card.Text>
            <ListGroup className='list-group-flush'>{item.category}</ListGroup>
          </Card.Body>
          <Link to={{ pathname: `/edit/${match.params.id}`, itemId: item._id }}>
            <Button style={{ width: '100%', marginBottom: '5px' }}>Edit</Button>
          </Link>
          <Button onClick={() => this.delete(item._id)} variant='danger'
            style={{ width: '100%' }}>Delete</Button>
        </Card>
      ))
    } else {
      return <h3>No Posted Listings.</h3>
    }
    return (
      <div>
        {listedItems}
      </div>
    )
  }
}

export default withRouter(PostedListings)

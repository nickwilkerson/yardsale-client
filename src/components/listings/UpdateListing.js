import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
// API request
import { showListing, updateListing } from '../../api/listings'

class UpdateListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: ''
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { location, user } = this.props

    showListing(location.itemId, user)
      .then((res) => this.setState({ item: res.data.item }))
      .catch(console.error)
  }

  handleChange = (event) => {
    const copiedItem = Object.assign(this.state.item)
    copiedItem[event.target.name] = event.target.value
    this.setState({ item: copiedItem })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history, location } = this.props

    updateListing(this.state.item, location.itemId, user)
      .then((res) => history.push('/posted-listings'))
      .then(() =>
        msgAlert({
          heading: 'Listing Successfully Updated',
          message: 'Check it out.',
          variant: 'success'
        })
      )
      .catch((err) => {
        msgAlert({
          heading: 'Failed to Update Listing',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { item } = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className='text-center'>
          <h3>Listing Information</h3>
          <Form.Group controlId='listing-post'>
            <h5 style={{ float: 'left' }}>Title*</h5>
            <Form.Control
              required
              name='title'
              value={item.title}
              placeholder='Title'
              onChange={this.handleChange}
            />
            <h5 style={{ float: 'left' }}>Description*</h5>
            <Form.Control
              as='textarea'
              rows={4}
              required
              name='description'
              value={item.description}
              placeholder='Description'
              onChange={this.handleChange}
            />
            <h5 style={{ float: 'left' }}>Price</h5>
            <Form.Control
              required
              name='price'
              value={item.price}
              placeholder='Price'
              onChange={this.handleChange}
            />
            <h5 style={{ float: 'left' }}>Category*</h5>
            <Form.Control
              required
              name='category'
              value={item.category}
              placeholder='Category'
              onChange={this.handleChange}
            />
            <Button type='submit' variant='outline-dark'>
            Update
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default withRouter(UpdateListing)

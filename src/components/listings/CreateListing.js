import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createListing } from '../../api/listings'

class CreateListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {
        title: '',
        description: '',
        price: '',
        category: ''
      },
      dropdownMonth: 'Month'
    }
  }

  // categories = ['Snowboards', 'Skis', 'Bindings', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  handleChange = (event) => {
    const copiedItem = Object.assign(this.state.item)
    copiedItem[event.target.name] = event.target.value

    this.setState({ item: copiedItem })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, msgAlert, history } = this.props

    createListing(this.state.item, user)
      .then(res => history.push('/listings/' + res.data.item._id))
      .then(() => msgAlert({
        heading: 'List created Successfully',
        message: 'nice work go check out your list',
        variant: 'success'
      }))
      .catch(err => {
        msgAlert({
          heading: 'list creation failed',
          message: 'something went wrong ' + err.message,
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
            Post
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreateListing)

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
// API request
import { showListing, updateListing } from '../../api/listings'
import Dropdown from 'react-bootstrap/dropdown'
const skiImg = 'http://trekbaron.com/wp-content/uploads/2020/10/types-of-skis-Oct202020-1-min.jpg'
const snowboardImg = 'https://c1.wallpaperflare.com/preview/928/415/609/snowboard-winter-winter-sports-sport.jpg'

class UpdateListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: '',
      dropdownCategory: 'Category'
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
    const e = event.target.name

    if (e === 'title' || e === 'description' || e === 'price') {
      copiedItem[event.target.name] = event.target.value
    } else {
      copiedItem.category = event.target.name
      this.setState({ dropdownCategory: this.categories[e] })
    }

    if (copiedItem.category === '0') {
      copiedItem.image = skiImg
    } else if (copiedItem.category === '1') {
      copiedItem.image = snowboardImg
    } else if (copiedItem.category === '2') {
      copiedItem.image = snowboardImg
    }

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

  categories = ['Skis', 'Snowboard', 'Bindings']

  render () {
    const { item } = this.state
    const dropdownJSX = this.categories.map((category) => (
      <Dropdown.Item
        key={category}
        onClick={this.handleChange}
        name={this.categories.indexOf(category)}>
        {category}
      </Dropdown.Item>
    ))
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className='text-center'>
          <h3>Listing Information</h3>
          <Form.Group controlId='listing-post'>
            <h5 style={{ float: 'left' }}>Title</h5>
            <Form.Control
              required
              name='title'
              value={item.title}
              placeholder='Title'
              onChange={this.handleChange}
            />
            <h5 style={{ float: 'left' }}>Description</h5>
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
            {/* <h5 style={{ float: 'left' }}>Category*</h5>
            <Form.Control
              required
              name='category'
              value={item.category}
              placeholder='Category'
              onChange={this.handleChange}
            /> */}
            <h5 style={{ float: 'left' }}>Category</h5>
            <Dropdown style={{ position: 'absolute', marginTop: '30px' }}>
              <Dropdown.Toggle id='dropdown-basic'>
                {this.state.dropdownCategory}
              </Dropdown.Toggle>
              <Dropdown.Menu>{dropdownJSX}</Dropdown.Menu>
            </Dropdown>
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

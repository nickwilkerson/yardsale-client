/* eslint-disable node/handle-callback-err */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showListing } from '../../api/listings'
import Button from 'react-bootstrap/Button'
// import Figure from 'react-bootstrap/Figure'
// import ClickCounter from './ClickCounter'
import Card from 'react-bootstrap/card'

class ShowListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: []
    }
  }

  componentDidMount () {
    const { match, msgAlert } = this.props
    // axios call for single listing
    showListing(match.params.id)
      .then(res => {
        this.setState({ item: res.data.item })
      })
      .catch(err =>
        msgAlert({
          heading: 'Show listing failed',
          message: 'Something went wrong',
          variant: 'danger'
        })
      )
  }

  componentWillUnmount () {
  }

  render () {
    if (this.state.item === null) {
      return 'Loading....'
    }
    // const { owner } = this.state.item
    const { history } = this.props
    const { item } = this.state
    return (
      <>
        <Card
          style={{
            margin: 'auto',
            marginTop: '75px',
            height: '28em',
            width: '60em'
          }}>
          <Card.Header as='h5' style={{ textAlign: 'center' }}>
            {item.title}
          </Card.Header>
          <Card.Img
            style={{ width: '50%', height: '82%', position: 'absolute', marginTop: '2.5em' }}
            src={item.image}
          />
          <Card.Body
            class='d-flex align-items-start justify-content-end'
            style={{
              marginRight: '30%', marginTop: '30px'
            }}>
            <Card.Text style={{ bottomBorder: '2px solid black' }}>
              <h5>Description:</h5>
              <p>{item.description}</p>
              <h5>Price:</h5>
              <p style={{ color: 'green', fontFamily: 'sans-serif' }}>{item.price}</p>
            </Card.Text>
          </Card.Body>
          <Button
            class='align-items-end'
            style={{ position: 'absolute', bottom: 0, width: '100%' }}
            variant='primary'
            onClick={() => history.push('/listings')}>
              Back to Listings
          </Button>
          {/* <ClickCounter /> */}
        </Card>
      </>
    )
  }
}
export default withRouter(ShowListing)

/* eslint-disable node/handle-callback-err */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showListing } from '../../api/listings'
// import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'

class ShowListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { match, msgAlert } = this.props
    console.log('this.props ', match.params.id)
    // axios call for single listing
    showListing(match.params.id)
      .then(res => this.setState({ item: res.data.listing }))
      .catch(err =>
        msgAlert({
          heading: 'Show listing failed',
          message: 'Something went wrong',
          variant: 'danger'
        })
      )
  }

  // destroy = () => {
  //   const { match, user, msgAlert, history } = this.props
  //   // axios call to delete listing
  //   deleteListing(match.params.id, user)
  //   // Redirect to the list index
  //     .then(() => history.push('/lists'))
  //     .then(() =>
  //       msgAlert({
  //         heading: 'List Deleted Successfully',
  //         message: 'Your list no longer exists',
  //         variant: 'success'
  //       })
  //     )
  //     .catch((err) =>
  //       msgAlert({
  //         heading: 'Failed to Delete List',
  //         message: 'Something went wrong: ' + err.message,
  //         variant: 'danger'
  //       })
  //     )
  // }

  render () {
    if (this.state.item === null) {
      return 'Loading....'
    }
    // const { owner } = this.state.item
    // const { user, history, match } = this.props
    // const { item } = this.state

    return (
      <>
        <Figure>
          <Figure.Image
            width={800}
            height={500}
            alt='500x500'
            src='https://c1.wallpaperflare.com/preview/928/415/609/snowboard-winter-winter-sports-sport.jpg'
          />
          <Figure.Caption style={{ position: 'absolute', textAlign: 'right' }}>
            {this.props.description}dafd
          </Figure.Caption>
        </Figure>
      </>
    )
  }
}
export default withRouter(ShowListing)

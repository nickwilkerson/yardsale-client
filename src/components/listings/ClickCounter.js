import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showListing } from '../../api/listings'

class ClickCounter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: [],
      count: 0
    }
  }

  componentDidMount () {
    const { user, match } = this.props
    showListing(match.params.id, user)
      .then((res) => this.setState({ item: res.data.item }))
      .catch(console.error)
  }

  handleClick = () => {
    // Use updater function when new state is derived from old
    this.setState(prev => ({ count: prev.count + 1 }))
  }

  render () {
    return (
      <button className='block' onClick={this.handleClick}>
        <div className='counter'>{this.state.count}</div>
      </button>
    )
  }
}

export default withRouter(ClickCounter)

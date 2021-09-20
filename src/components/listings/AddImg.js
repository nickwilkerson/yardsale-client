import React, { Component } from 'react'
import axios from 'axios'
// import apiConfig from '../../apiConfig'
import { withRouter } from 'react-router'
const FormData = require('form-data')

class AddImg extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFile: null
    }
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = event => {
    const fd = new FormData()
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    axios.post(
      'https://cloud.mongodb.com/v2/614687099a3429156d909ec8#clusters',
      fd
    )
      .then((res) => {
        console.log('res', res)
      })
      .catch(console.error)
  }

  render () {
    return (
      <div className='App'>
        <input type='file' onChange={this.fileSelectedHandler} />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    )
  }
}

export default withRouter(AddImg)

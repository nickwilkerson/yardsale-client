import apiUrl from '../apiConfig'
import axios from 'axios'

// create list request
export const createListing = (data, user) => {
  return axios({
    url: apiUrl + '/post',
    method: 'post',
    data: { item: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// index of all listings
export const indexListings = (user) => {
  return axios({
    url: apiUrl + '/listings',
    method: 'get',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// show one list
export const showListing = (id, user) => {
  console.log('id is: ', id)
  return axios({
    url: apiUrl + '/listings/' + id,
    method: 'get'
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

// delete a list
export const deleteListing = (id, user) => {
  return axios({
    url: apiUrl + '/lists/' + id,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// edit/update list
export const updateList = (listData, id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/lists/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { list: listData }
  })
}

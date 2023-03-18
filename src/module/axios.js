import React from 'react'

import axios from 'axios'
import Config from '../config'

const baseURL = Config.API_URL;

const axiosIns = axios.create({
  baseURL: baseURL,
  auth: {
    username: 'user',
    password: 'password'
  }
})

export default axiosIns;
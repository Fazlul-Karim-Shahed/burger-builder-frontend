import React from 'react'
import Reducer from './Reducer'
import { createStore } from 'redux'

const globalStore = createStore(Reducer)

export default globalStore
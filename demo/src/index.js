import './style.css'

import React from 'react'
import {render} from 'react-dom'

import MaskedInput from '../../src'

const PATTERNS = [
  '1111 1111',
  '111 111',
  '11 11',
  '1 1'
]

const App = React.createClass({
  getInitialState() {
    return {
      card: '',
      expiry: '',
      ccv: '',
      plate: '',
      escaped: '',
      leading: '',
      custom: '',
      changing: '',
      pattern: '1111 1111',
      cardPattern: '1111 1111 1111 1111'
    }
  },

  _onChange(e) {
    const stateChange = {}
    stateChange[e.target.name] = e.target.value
    this.setState(stateChange)
  },

  _changePattern(e) {
    this.setState({pattern: e.target.value})
  },

  _onCardChange(e) {
    if(/^3[47]/.test(e.target.value)) {
      this.setState({cardPattern: "1111 111111 11111"})
    } else {
      this.setState({cardPattern: '1111 1111 1111 1111'})
    }
  },

  render() {
    return <div className="App">
      <MaskedInput mask="+7 (111) 111-11-11"
                   onChange={(e) => {
                    fixContactNumberMask(this.refs.contactNumber.input)
                   }}
                   value="+7 (___) ___-__-__"
                   type="tel"
                   onClick={() => {
                       fixContactNumberMask(this.refs.contactNumber.input)
                   }}
                   onFocus={() => fixContactNumberMask(this.refs.contactNumber.input)}
                   ref={'contactNumber'}/>
    </div>
  }
})

const CustomInput = React.createClass({
  render() {
    return <MaskedInput
      mask="1111-WW-11"
      placeholder="1234-WW-12"
      placeholderChar=" "
      size="11"
      {...this.props}
      formatCharacters={{
        'W': {
          validate(char) { return /\w/.test(char) },
          transform(char) { return char.toUpperCase() }
        }
      }
    }/>
  }
})

export function fixContactNumberMask(input) {
    const CURSOR_POSITION = 4
    const DEFAULT_VALUE = '+7 (___) ___-__-__'
    if (input.value == "" || input.value == DEFAULT_VALUE) {
        input.value = DEFAULT_VALUE
        input.setSelectionRange(CURSOR_POSITION, CURSOR_POSITION)
    }
    if (input.selectionStart < CURSOR_POSITION) {
        input.setSelectionRange(CURSOR_POSITION, CURSOR_POSITION)
    }
}

render(<App/>, document.getElementById('demo'))

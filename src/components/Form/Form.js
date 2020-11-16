import React from 'react'
import { connect } from 'react-redux'
import { clearAllValidationErrors } from '../../actions'

class Form extends React.Component {
  componentDidMount() {
    this.props.clearAllValidationErrors()
  }
  
  componentWillUnmount() {
    this.props.clearAllValidationErrors()
  }

  render() {
    return (
      <form
        className={this.props.className}
        onKeyDown={this.onKeyDown.bind(this)}
        onSubmit={this.props.onSubmit}>
          {this.props.children}
       </form>
    )
  }

  onKeyDown(e) {
    if (e.which === 13) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearAllValidationErrors: () => { dispatch(clearAllValidationErrors()) }
  }
}

export default connect(null, mapDispatchToProps)(Form)
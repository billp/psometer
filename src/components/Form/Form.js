import React from 'react'

export class Form extends React.Component {
  render() {
    return (
      <form
        className={this.props.className}
        onSubmit={this.props.onSubmit}>
          {this.props.children}
       </form>
    )
  }
}
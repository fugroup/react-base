import React, { Component } from 'react'

class Router extends Component {
  state = { current: window.location.pathname }

  constructor (props) {
    super(props)
    this.routes = props.routes

    // Transform routes
    this.transformRoutes()
    window.addEventListener('popstate', this.dispatch)
    window.addEventListener('pushstate', this.dispatch)
  }

  // Transform routes to regexp matchers
  transformRoutes = () => {
    let sub = /\/:([^/]+)/ig
    for (const route of this.routes) {
      const params = []
      const regexp = route.path === '*' ? '.*' :
        route.path.replace(sub, (match, str) => {
          params.push(str)
          return '/([^/]+)'
        })
      route.regexp = new RegExp(`^${regexp}$`, 'ig')
      route.params = params
    }
  }

  dispatch = (event) => {
    event.preventDefault()
    this.setState({ current: window.location.pathname })
  }

  // Match a route and return a view
  match = (path) => {
    for (const route of this.routes) {
      let { regexp, view, params } = route

      if (regexp.test(path)) {
        const props = {}
        regexp.lastIndex = 0

        for (const p of params) {
          let m = regexp.exec(path)
          props[p] = m[1]
        }
        regexp.lastIndex = 0

        return [ view, props ]
      }
    }
    return []
  }

  render () {
    const [ View, props ] = this.match(this.state.current)
    return <React.Fragment><View route={ props }/></React.Fragment>
  }
}

export default Router

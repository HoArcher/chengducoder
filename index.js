import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Router, Route, Link, Switch, NavLink } from 'react-router-dom'
import { LayoutCustomize } from './src/__share'
import Home from './src/home.jsx'
import Welcome from './src/welcome'

import createBrowserHistory from 'history/es/createBrowserHistory'
const history = createBrowserHistory();


import RootRoute from './rootRoute'
const Context = (props) => (
  <LayoutCustomize>
    <Switch>
      {RootRoute.map((route, index) => (
        // 在一个给定的路径下渲染多个 <Route> ，而且每个
        // <Route> 的 component 属性都不相同。
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ))}
    </Switch>
  </LayoutCustomize>
)



render(
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/context" exact component={Context} />
    </Switch>
  </Router>,
  document.getElementById('root')
)



/*

*/
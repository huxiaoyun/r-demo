import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import components from './components';
require('./index.scss');
require('./markdown.scss');

class App extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="header-placeholder">
          <div className="header-title">ONEUI 3.0</div>
          <div className="menu">
            <Link to="/home" className="menu-item">首页</Link>
            <Link to="/bootstrap" className="menu-item">快速入门</Link>
            <Link to="/devguide" className="menu-item">开发指南</Link>
            <Link to="/components/affix" className="menu-item">组件</Link>
          </div>
        </div>
        <div className="nav">
          <div className="nav-children">
            {
              Object.keys(components).map((folderKey) => {
                const itemsInFolder = components[folderKey];
                return (
                  <div>
                    <h3>{folderKey}</h3>
                    <ul className="nav-list">
                      {
                        Object.keys(itemsInFolder).map((key) => {
                          <li key={`component-${folderKey}-${key}`}>
                            <Link className="nav-link" to={`/folderKey.toLowerCase()/key.toLowerCase()`}>
                              <span className="nav-link-en">{key}</span>
                              <span className="nav-link-zh">{key}</span>
                            </Link>
                          </li>
                        })
                      }
                    </ul>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="main">
          <div className="main-container">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

render((
  <HashRouter basename="/">
    <App>
      {
        Object.keys(components).map((folderKey) => {
          const itemsInFolder = components[folderKey];
          return Object.keys(itemsInFolder).map((key) => {
            return (
              <Route
                key={`component-${folderKey}-${key}`}
                path={`/folderKey.toLowerCase()/key.toLowerCase()`}
                component={() => (itemsInFolder[key])}
              />
            );
          });
        }).reduce((prev, curr) => { return prev.concat(curr); }, [])
      }
    </App>
  </HashRouter>
), document.getElementById('main'));

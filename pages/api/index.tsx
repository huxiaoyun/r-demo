import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import components from './components';
require('./index.scss');
require('./markdown.scss');

console.log(components)
class App extends React.Component {
  render() {
    console.log(this.props.children);
    return (
      <div>
        <div className="left-panel">
          <div className="nav-children">
            {
              Object.keys(components).map((folderKey) => {
                const itemsInFolder = components[folderKey];
                console.log(Object.keys(itemsInFolder));
                return (
                  <div key={`folder-${folderKey}`}>
                    <h3>{folderKey}</h3>
                    <ul className="nav-list">
                      {
                        Object.keys(itemsInFolder).map((key) => {
                          return (
                            <li key={`component-${folderKey}-${key}`}>
                              <Link className="nav-link" to={`/${folderKey.toLowerCase()}/${key.toLowerCase()}`}>
                                <span className="nav-link-zh">{key}</span>
                              </Link>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="right-panel">
          <div className="api-container">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

const routes = Object.keys(components).map((folderKey) => {
  const itemsInFolder = components[folderKey];
  return Object.keys(itemsInFolder).map((key) => {
    return (
      <Route
        key={`component-${folderKey}-${key}`}
        path={`/${folderKey.toLowerCase()}/${key.toLowerCase()}`}
        component={itemsInFolder[key]}
      />
    );
  });
}).reduce((prev, curr) => { return prev.concat(curr); }, []);
console.log(routes);

render((
  <HashRouter basename="/">
    <App>{routes}</App>
  </HashRouter>
), document.getElementById('main-content'));

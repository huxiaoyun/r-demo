
require('./index.scss');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon } from '@alife/next';
const CodeMirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
import "@alife/dpl-visist/index.scss";

class App extends React.Component {
  render() {
    const options = {
      theme: 'night',
      mode: 'javascript',
      lineNumbers: false,
      readOnly: true,
      value: `function() { console.log("xx");}`,
    };
    return (<div>
      <div className="left-panel">
        <ul className="nav">
          <li>线性图</li>
          <li>柱状图</li>
        </ul>
      </div>
      <div className="right-panel">
        <div className="case-type">
          <h3>线性图</h3>
        </div>
        <div className="case-list">
          <div className="case-box">
            <div className="case-demo">
              <div>案例</div>
            </div>
            <div className="case-split"></div>
            <div className="case-code">
              <div>
                <Icon type="play" />
                <Icon type="attachment" />
              </div>
              <div>
                <CodeMirror options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>);
  }
}


ReactDOM.render(<App />, document.getElementById('main-content'));

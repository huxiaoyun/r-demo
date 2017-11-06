
require('./index.scss');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon, Tab } from '@alife/next';
const CodeMirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
import { config } from '../../examples/line/example1/simple';
import { data } from '../../examples/line/example1/simple-react';
import "@alife/dpl-visist/index.scss";

const TabPane = Tab.TabPane;

class App extends React.Component {
  componentDidMount() {
    RechartCore.ChartBuilder(config);
  }
  render() {
    const configStr = `RechartCore.ChartBuilder(${JSON.stringify(config, null, 2)});`;
    const reactStr = JSON.stringify(data, null, 2);
    const tabs = [
      {
        tab: 'json',
        key: 0,
        content: (<div className="custom-tab-content">
        <div></div>
        <div>
          <pre data-playground-type="html" data-playground-group="code-example-1">
            {`<div id="example1"></div>`}
          </pre>
          <pre data-playground-type="javascript" data-playground-group="code-example-1">
            {configStr}
          </pre>
        </div>
      </div>)
      },
      { tab: 'react',
        key: 1,
        content: (<div className="custom-tab-content">
        <div></div>
        <div>
          <pre data-playground-type="html" data-playground-group="code-example-1-1">
            {`<div id="example1"></div>`}
          </pre>
          <pre data-playground-type="babel" data-playground-group="code-example-1-1">
            <Chart width={800} height={400} data={config.data} dataDef={config.dataDef}>
              <Line position={['age', 'lower']} />
              <Line position={['age', 'mean']} />
              <Tooltip />
              <Legend />
              <Axis dataKey={'lower'}/>
            </Chart>
          </pre>
        </div>
      </div>)
      },
      {
        tab: 'rax',
        key: 2,
        content: (<div className="custom-tab-content">rax</div>)
      },
      {
        tab: 'vue',
        key: 3,
        content: (<div className="custom-tab-content">vue</div>)
      },
      {
        tab: 'angular',
        key: 4,
        content: (<div className="custom-tab-content">angular</div>)
      },
    ];
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
              <div id="example1"></div>
            </div>
            <div className="case-split"></div>
            <div className="case-code">
              <Tab lazyLoad={false}>
              {
                  tabs.map(item => <TabPane key={item.key} tab={item.tab}>{item.content}</TabPane>)
              }
              </Tab>
              <div className="op">
                <a href="#"
                  data-playground="jsfiddle"
                  data-playground-from-group="code-example-1-1"
                  data-playground-resources="//g.alicdn.com/rda/wisemap/0.2.8/rechart-core.js"
                  data-playground-wrap="d">
                  运行
                </a>
                <a>复制</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>);
  }
}


ReactDOM.render(<App />, document.getElementById('main-content'));

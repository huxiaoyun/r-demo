
require('./index.scss');
const $ = require('jquery');
// const handlebars = require('handlebars');
const codeConfig = require('../../examples/index');

// const caseBoxTpl = require('./caseBox.tpl');

class App {
  constructor() {
    this.attrs = {
      codes: [],
      language: 'json',
    };
  }
  init() {
    // 根据 url 路由转发
    const langReg = new RegExp('(^|&)language=([^&]*)(&|$)');
    const search = window.location.search.substr(1);

    const langResult = search.match(langReg);
    const lang = langResult ? langResult[2] : 'json';
    this.attrs.language = lang;
    Object.keys(codeConfig).forEach((chartType) => {
      const exampleFolders = codeConfig[chartType];
      exampleFolders.forEach((folder) => {
        const code = require(`../../examples/${chartType}/${folder}/${lang}Code.js`);
        this.attrs.codes.push(code);
      });
    });
    this.render();
    this.bindEvent();
  }

  renderNav() {

  }


  renderExample() {

  }

  bindEvent() {
    var _this = this;
    $('.case-box .op .run').click(function() {
      const index = $(this).attr('data-index');

      const data = _this.getJsfiddleData(index);
      const formAttributes = {
          method: 'post',
          action: 'https://jsfiddle.net/api/post/library/pure/',
          target: '_blank',
          id: 'fiddle-form',
          style: 'display: none;'
      }

      const node = document.createElement('textarea');
      const form = document.createElement('form');
      for (const attr in formAttributes) {
          form.setAttribute(attr, formAttributes[attr]);
      }

      for (let name in data) {
          node.name = name;
          node.value = data[name].toString();
          form.appendChild(node.cloneNode());
      }

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    });
  }
  getJsfiddleData(index) {
    const language = this.attrs.language;
    switch(language) {
      case 'json':
        return this.getJsfiddleJsonData(index);
      case 'react':
        return this.getJsfiddleReactData(index);
      case 'rax':
        return;
      case 'vue':
        return;
      case 'angular':
        return;
      default:
        return;
    }
  }

  getJsfiddleReactData(index) {
    const code = this.attrs.codes[index];
    const data = {
      js: `var config = ${code.config};
          ${code.script}
          ReactDOM.render(${code.template},
          document.getElementById('example'));
        `,
        html: `<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>

        <script src="https://huxiaoyun.github.io/r-demo/lib/rechart-core.js"></script>
        <script src="https://huxiaoyun.github.io/r-demo/lib/rechart-react.js"></script>

        <div id="example"></div>`,
        panel_css: 1,
        panel_js: 3
    };

    return data;
  }

  getJsfiddleJsonData(index) {
    const code = this.attrs.codes[index];
    const config = JSON.stringify(code.config, null, 2);
    const data = {
      js: `var config = ${config};
          config.chart.container = 'example';
          RechartCore.ChartBuilder(config);
        `,
        html: `<script src="https://huxiaoyun.github.io/r-demo/lib/rechart-core.js"></script><div id="example"></div>`,
        panel_css: 1,
        panel_js: 3
    };
    return data;
  }

  render() {
    const language = this.attrs.language;
    switch(language) {
      case 'json':
        this.renderJson();
        break;
      case 'react':
        this.renderReact();
        break;
      case 'rax':
        break;
      case 'vue':
        break;
      case 'angular':
        break;
      default:
        return;
    }
  }

  renderJson() {
    this.attrs.codes.forEach((code, index) => {
      const str = JSON.stringify(code.config, null, 2);
      const tpl = `<div class="case-box">
        <div class="case-demo">
          <div id="example${index}"></div>
        </div>
        <div class="case-split"></div>
        <div class="case-code">
          <pre class="case-code-detail" id="code${index}"></pre>
          <div class="op">
            <a class="run" data-index="${index}">运行</a>
            <a>复制</a>
          </div>
        </div>
      </div>`;
      $('.case-list').append(tpl);
      var editor = ace.edit(`code${index}`);
      editor.env.editor.setValue(str, 1);
      editor.env.editor.setReadOnly(true);

      code.config.chart.container = `example${index}`;
      RechartCore.ChartBuilder(code.config);
    });
  }

  renderReact() {
    this.attrs.codes.forEach((code, index) => {
      const scriptCode = `var config = ${code.config};
${code.script}
ReactDOM.render(${code.template}, document.getElementById('example${index}'))`;

      const tpl = `<div class="case-box" id="caseBox${index}">
        <div class="case-demo">
          <div id="example${index}"></div>
        </div>
        <div class="case-split"></div>
        <div class="case-code">
          <pre class="case-code-detail" id="code${index}"></pre>
          <div class="op">
            <a class="run" data-index="${index}">运行</a>
            <a>复制</a>
          </div>
        </div>
      </div>`;
      $('.case-list').append(tpl);
      var editor = ace.edit(`code${index}`);
      editor.env.editor.setValue(scriptCode, 1);
      editor.env.editor.setReadOnly(true);
      $('.case-list').append(`<script type="text/babel">${scriptCode}</script>`);
    });
  }
}


new App().init();

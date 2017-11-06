
require('./index.scss');
var $ = require('jquery');
const code = require('../../examples/line/example1/simple-react.js');

class App {

  renderNav() {

  }


  renderExample() {

  }

  render() {
    $('#example1').append(`<script type="text/babel">${code.code}</script>`);
  }
}


new App().render();

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testRenderer = exports.render = undefined;

var renderToMemory = function () {
  var _ref = _asyncToGenerator(function* (element) {
    var container = (0, _createElement.createElement)('ROOT');

    (0, _renderUtils.validateElement)(element);

    var node = _renderer.WordRenderer.createContainer(container);

    _renderer.WordRenderer.updateContainer(element, node, null);

    var output = yield (0, _parse2.default)(container).toBuffer();
    var stream = new _memoryStreams2.default.WritableStream();

    yield new Promise(function (resolve, reject) {
      output.doc.generate(stream);
      stream.on('finish', function () {
        resolve();
      });
      stream.on('error', function () {
        reject();
      });
    });

    return stream;
  });

  return function renderToMemory(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * This function renders the component
 * @param {Object} element
 */


var render = function () {
  var _ref2 = _asyncToGenerator(function* (element) {
    return renderToMemory(element);
  });

  return function render(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Required for test the components
 */


var _memoryStreams = require('memory-streams');

var _memoryStreams2 = _interopRequireDefault(_memoryStreams);

var _createElement = require('../utils/createElement');

var _renderer = require('./renderer');

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _renderUtils = require('../utils/renderUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function testRenderer(element) {
  var container = (0, _createElement.createElement)('ROOT');
  var node = _renderer.WordRenderer.createContainer(container);

  _renderer.WordRenderer.updateContainer(element, node, null);

  return container;
}

exports.render = render;
exports.testRenderer = testRenderer;
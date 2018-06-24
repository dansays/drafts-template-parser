/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _templateTagParser = __webpack_require__(1);

var parser = new _templateTagParser.TemplateTagParser();

if (parser.ask()) {
  var parts = [{
    name: 'draft',
    value: draft.content
  }, {
    name: 'title',
    value: draft.title
  }, {
    name: 'body',
    value: draft.content.split('\n').slice(1).join('\n')
  }, {
    name: 'selection',
    value: editor.getSelectedText()
  }, {
    name: 'clipboard',
    value: app.getClipboard()
  }];
  parts.forEach(function (part) {
    var parsed = parser.parse(part.value);
    draft.setTemplateTag("parsed_".concat(part.name), parsed.text);
    draft.setTemplateTag("parsed_".concat(part.name, "_html"), parsed.html);
  });
} else {
  context.cancel();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateTagParser = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TemplateTagParser =
/*#__PURE__*/
function () {
  function TemplateTagParser() {
    var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : draft.content;

    _classCallCheck(this, TemplateTagParser);

    this.template = template;
  }

  _createClass(TemplateTagParser, [{
    key: "ask",
    value: function ask() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Template Questions';
      var tags = this.tags;
      if (tags.length == 0) return true;
      var prompt = Prompt.create();
      prompt.title = title;
      tags.forEach(function (tag) {
        return prompt.addTextField(tag, tag, '');
      });
      prompt.addButton('Okay');
      if (!prompt.show()) return false;
      tags.forEach(function (tag) {
        draft.setTemplateTag(tag, prompt.fieldValues[tag]);
        console.log("Setting ".concat(tag, " to ").concat(prompt.fieldValues[tag]));
      });
      return true;
    }
  }, {
    key: "parse",
    value: function parse(str) {
      var text = draft.processTemplate(str);
      var html = MultiMarkdown.create().render(text);
      return {
        text: text,
        html: html
      };
    }
  }, {
    key: "tags",
    get: function get() {
      var reservedTags = ['body', 'clipboard', 'created_latitude', 'created_longitude', 'created', 'date', 'draft_open_url', 'draft', 'latitude', 'longitude', 'modified_latitude', 'modified_longitude', 'modified', 'selection_length', 'selection_start', 'selection', 'time', 'title', 'uuid'];
      var pattern = /\[\[([\w ]+)\]\]/g;
      var tags = new Set();
      var match;

      while (match = pattern.exec(this.template)) {
        tags.add(match[1]);
      }

      return Array.from(tags).filter(function (tag) {
        return !reservedTags.includes(tag);
      });
    }
  }]);

  return TemplateTagParser;
}();

exports.TemplateTagParser = TemplateTagParser;

/***/ })
/******/ ]);
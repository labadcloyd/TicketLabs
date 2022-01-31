"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./api/build-client.js":
/*!*****************************!*\
  !*** ./api/build-client.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ req  })=>{\n    if (true) {\n        // We are on the server\n        return axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',\n            headers: req.headers\n        });\n    } else {}\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGkvYnVpbGQtY2xpZW50LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF5QjtBQUV6QixpRUFBZ0IsRUFBQyxDQUFDQyxHQUFHLEVBQUMsQ0FBQyxHQUFLLENBQUM7SUFDM0IsRUFBRSxFQUFFLElBQTZCLEVBQUUsQ0FBQztRQUNsQyxFQUF1QjtRQUV2QixNQUFNLENBQUNELG1EQUFZLENBQUMsQ0FBQztZQUNuQkcsT0FBTyxFQUNMLENBQWlFO1lBQ25FQyxPQUFPLEVBQUVILEdBQUcsQ0FBQ0csT0FBTztRQUN0QixDQUFDO0lBQ0gsQ0FBQyxNQUFNLEVBS047QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vYXBpL2J1aWxkLWNsaWVudC5qcz9jNmYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh7IHJlcSB9KSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIFdlIGFyZSBvbiB0aGUgc2VydmVyXG5cbiAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcbiAgICAgIGJhc2VVUkw6XG4gICAgICAgICdodHRwOi8vaW5ncmVzcy1uZ2lueC1jb250cm9sbGVyLmluZ3Jlc3Mtbmdpbnguc3ZjLmNsdXN0ZXIubG9jYWwnLFxuICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gV2UgbXVzdCBiZSBvbiB0aGUgYnJvd3NlclxuICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xuICAgICAgYmFzZVVybDogJy8nLFxuICAgIH0pO1xuICB9XG59O1xuIl0sIm5hbWVzIjpbImF4aW9zIiwicmVxIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlcnMiLCJiYXNlVXJsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./api/build-client.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_build_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/build-client */ \"./api/build-client.js\");\n\n\nconst LandingPage = ({ currentUser  })=>{\n    return currentUser ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"You are signed in\"\n    }, void 0, false, {\n        fileName: \"D:\\\\.CODING\\\\Portfolio\\\\OnlineTickets\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"You are NOT signed in\"\n    }, void 0, false, {\n        fileName: \"D:\\\\.CODING\\\\Portfolio\\\\OnlineTickets\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, undefined);\n};\nLandingPage.getInitialProps = async (context)=>{\n    console.log('LANDING PAGE!');\n    const client = (0,_api_build_client__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context);\n    const { data  } = await client.get('/api/users/currentuser');\n    return data;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LandingPage);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE2QztBQUU3QyxLQUFLLENBQUNDLFdBQVcsSUFBSSxDQUFDLENBQUNDLFdBQVcsRUFBQyxDQUFDLEdBQUssQ0FBQztJQUN4QyxNQUFNLENBQUNBLFdBQVcsK0VBQ2ZDLENBQUU7a0JBQUMsQ0FBaUI7Ozs7O2dHQUVwQkEsQ0FBRTtrQkFBQyxDQUFxQjs7Ozs7O0FBRTdCLENBQUM7QUFFREYsV0FBVyxDQUFDRyxlQUFlLFVBQVNDLE9BQU8sR0FBSSxDQUFDO0lBQzlDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFlO0lBQzNCLEtBQUssQ0FBQ0MsTUFBTSxHQUFHUiw2REFBVyxDQUFDSyxPQUFPO0lBQ2xDLEtBQUssQ0FBQyxDQUFDLENBQUNJLElBQUksRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDRCxNQUFNLENBQUNFLEdBQUcsQ0FBQyxDQUF3QjtJQUUxRCxNQUFNLENBQUNELElBQUk7QUFDYixDQUFDO0FBRUQsaUVBQWVSLFdBQVcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL2luZGV4LmpzP2JlZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkQ2xpZW50IGZyb20gJy4uL2FwaS9idWlsZC1jbGllbnQnO1xuXG5jb25zdCBMYW5kaW5nUGFnZSA9ICh7IGN1cnJlbnRVc2VyIH0pID0+IHtcbiAgcmV0dXJuIGN1cnJlbnRVc2VyID8gKFxuICAgIDxoMT5Zb3UgYXJlIHNpZ25lZCBpbjwvaDE+XG4gICkgOiAoXG4gICAgPGgxPllvdSBhcmUgTk9UIHNpZ25lZCBpbjwvaDE+XG4gICk7XG59O1xuXG5MYW5kaW5nUGFnZS5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyBjb250ZXh0ID0+IHtcbiAgY29uc29sZS5sb2coJ0xBTkRJTkcgUEFHRSEnKTtcbiAgY29uc3QgY2xpZW50ID0gYnVpbGRDbGllbnQoY29udGV4dCk7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgY2xpZW50LmdldCgnL2FwaS91c2Vycy9jdXJyZW50dXNlcicpO1xuXG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGFuZGluZ1BhZ2U7XG4iXSwibmFtZXMiOlsiYnVpbGRDbGllbnQiLCJMYW5kaW5nUGFnZSIsImN1cnJlbnRVc2VyIiwiaDEiLCJnZXRJbml0aWFsUHJvcHMiLCJjb250ZXh0IiwiY29uc29sZSIsImxvZyIsImNsaWVudCIsImRhdGEiLCJnZXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();
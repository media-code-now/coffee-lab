/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/next-contentlayer";
exports.ids = ["vendor-chunks/next-contentlayer"];
exports.modules = {

/***/ "(ssr)/./node_modules/next-contentlayer/dist/hooks/useMDXComponent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/next-contentlayer/dist/hooks/useMDXComponent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getMDXComponent: () => (/* binding */ getMDXComponent),\n/* harmony export */   useMDXComponent: () => (/* binding */ useMDXComponent)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-dom.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _jsx_runtime_cjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jsx-runtime.cjs */ \"(ssr)/./node_modules/next-contentlayer/dist/hooks/jsx-runtime.cjs\");\n// NOTE use ESM/CommonJS compat import here until resolved: https://github.com/facebook/react/issues/11503\n\n// NOTE use ESM/CommonJS compat import here until resolved: https://github.com/facebook/react/issues/11503\n\n// @ts-expect-error React version workaround (This CJS workaround can be removed once Contentlayer is only targeting React 18+)\n\nconst getMDXComponent = (code, globals = {}) => {\n    const scope = { React: (react__WEBPACK_IMPORTED_MODULE_0___default()), ReactDOM: (react_dom__WEBPACK_IMPORTED_MODULE_1___default()), _jsx_runtime: _jsx_runtime_cjs__WEBPACK_IMPORTED_MODULE_2__._jsx_runtime, ...globals };\n    const fn = new Function(...Object.keys(scope), code);\n    return fn(...Object.values(scope)).default;\n};\nconst useMDXComponent = (code, globals = {}) => {\n    return react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(() => getMDXComponent(code, globals), [code, globals]);\n};\n//# sourceMappingURL=useMDXComponent.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbmV4dC1jb250ZW50bGF5ZXIvZGlzdC9ob29rcy91c2VNRFhDb21wb25lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQzBCO0FBQzFCO0FBQ2lDO0FBQ2pDO0FBQ2lEO0FBQzFDLDJDQUEyQztBQUNsRCxvQkFBb0IsS0FBSywwREFBVSxrRUFBYztBQUNqRDtBQUNBO0FBQ0E7QUFDTywyQ0FBMkM7QUFDbEQsV0FBVyxvREFBYTtBQUN4QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXVzaHJvb20tY29mZmVlLWxhYi8uL25vZGVfbW9kdWxlcy9uZXh0LWNvbnRlbnRsYXllci9kaXN0L2hvb2tzL3VzZU1EWENvbXBvbmVudC5qcz84NzM2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5PVEUgdXNlIEVTTS9Db21tb25KUyBjb21wYXQgaW1wb3J0IGhlcmUgdW50aWwgcmVzb2x2ZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTE1MDNcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBOT1RFIHVzZSBFU00vQ29tbW9uSlMgY29tcGF0IGltcG9ydCBoZXJlIHVudGlsIHJlc29sdmVkOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzExNTAzXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbi8vIEB0cy1leHBlY3QtZXJyb3IgUmVhY3QgdmVyc2lvbiB3b3JrYXJvdW5kIChUaGlzIENKUyB3b3JrYXJvdW5kIGNhbiBiZSByZW1vdmVkIG9uY2UgQ29udGVudGxheWVyIGlzIG9ubHkgdGFyZ2V0aW5nIFJlYWN0IDE4KylcbmltcG9ydCB7IF9qc3hfcnVudGltZSB9IGZyb20gJy4vanN4LXJ1bnRpbWUuY2pzJztcbmV4cG9ydCBjb25zdCBnZXRNRFhDb21wb25lbnQgPSAoY29kZSwgZ2xvYmFscyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgc2NvcGUgPSB7IFJlYWN0LCBSZWFjdERPTSwgX2pzeF9ydW50aW1lLCAuLi5nbG9iYWxzIH07XG4gICAgY29uc3QgZm4gPSBuZXcgRnVuY3Rpb24oLi4uT2JqZWN0LmtleXMoc2NvcGUpLCBjb2RlKTtcbiAgICByZXR1cm4gZm4oLi4uT2JqZWN0LnZhbHVlcyhzY29wZSkpLmRlZmF1bHQ7XG59O1xuZXhwb3J0IGNvbnN0IHVzZU1EWENvbXBvbmVudCA9IChjb2RlLCBnbG9iYWxzID0ge30pID0+IHtcbiAgICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiBnZXRNRFhDb21wb25lbnQoY29kZSwgZ2xvYmFscyksIFtjb2RlLCBnbG9iYWxzXSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlTURYQ29tcG9uZW50LmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/next-contentlayer/dist/hooks/useMDXComponent.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/next-contentlayer/dist/hooks/jsx-runtime.cjs":
/*!*******************************************************************!*\
  !*** ./node_modules/next-contentlayer/dist/hooks/jsx-runtime.cjs ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const _jsx_runtime = __webpack_require__(/*! react/jsx-runtime */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-runtime.js\")\n\nmodule.exports._jsx_runtime = _jsx_runtime\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbmV4dC1jb250ZW50bGF5ZXIvZGlzdC9ob29rcy9qc3gtcnVudGltZS5janMiLCJtYXBwaW5ncyI6IkFBQUEscUJBQXFCLG1CQUFPLENBQUMsZ0lBQW1COztBQUVoRCwyQkFBMkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tdXNocm9vbS1jb2ZmZWUtbGFiLy4vbm9kZV9tb2R1bGVzL25leHQtY29udGVudGxheWVyL2Rpc3QvaG9va3MvanN4LXJ1bnRpbWUuY2pzPzJkYTkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgX2pzeF9ydW50aW1lID0gcmVxdWlyZSgncmVhY3QvanN4LXJ1bnRpbWUnKVxuXG5tb2R1bGUuZXhwb3J0cy5fanN4X3J1bnRpbWUgPSBfanN4X3J1bnRpbWVcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/next-contentlayer/dist/hooks/jsx-runtime.cjs\n");

/***/ })

};
;
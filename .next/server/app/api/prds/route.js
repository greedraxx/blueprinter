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
exports.id = "app/api/prds/route";
exports.ids = ["app/api/prds/route"];
exports.modules = {

/***/ "(rsc)/./app/api/prds/route.ts":
/*!*******************************!*\
  !*** ./app/api/prds/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// Simple file-based storage for PRDs (in production, use a database like Supabase)\nconst PRDS_DIR = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), \"data\", \"prds\");\n// Ensure data directory exists\nfunction ensureDataDir() {\n    if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(PRDS_DIR)) {\n        fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(PRDS_DIR, {\n            recursive: true\n        });\n    }\n}\n// GET all PRDs\nasync function GET() {\n    try {\n        ensureDataDir();\n        const files = fs__WEBPACK_IMPORTED_MODULE_1___default().readdirSync(PRDS_DIR).filter((file)=>file.endsWith(\".json\"));\n        const prds = files.map((file)=>{\n            const content = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(PRDS_DIR, file), \"utf-8\");\n            return JSON.parse(content);\n        });\n        // Sort by createdAt descending\n        prds.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            prds\n        });\n    } catch (error) {\n        console.error(\"Error fetching PRDs:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch PRDs\"\n        }, {\n            status: 500\n        });\n    }\n}\n// POST save a PRD\nasync function POST(request) {\n    try {\n        ensureDataDir();\n        const prd = await request.json();\n        // Validate required fields\n        if (!prd.id || !prd.title) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"ID and title are required\"\n            }, {\n                status: 400\n            });\n        }\n        // Save PRD to file\n        const filePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(PRDS_DIR, `${prd.id}.json`);\n        fs__WEBPACK_IMPORTED_MODULE_1___default().writeFileSync(filePath, JSON.stringify(prd, null, 2));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            prd\n        });\n    } catch (error) {\n        console.error(\"Error saving PRD:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to save PRD\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3ByZHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF1RDtBQUNwQztBQUNJO0FBRXZCLG1GQUFtRjtBQUNuRixNQUFNRyxXQUFXRCxnREFBUyxDQUFDRyxRQUFRQyxHQUFHLElBQUksUUFBUTtBQUVsRCwrQkFBK0I7QUFDL0IsU0FBU0M7SUFDUCxJQUFJLENBQUNOLG9EQUFhLENBQUNFLFdBQVc7UUFDNUJGLG1EQUFZLENBQUNFLFVBQVU7WUFBRU8sV0FBVztRQUFLO0lBQzNDO0FBQ0Y7QUFFQSxlQUFlO0FBQ1IsZUFBZUM7SUFDcEIsSUFBSTtRQUNGSjtRQUVBLE1BQU1LLFFBQVFYLHFEQUFjLENBQUNFLFVBQVVXLE1BQU0sQ0FBQyxDQUFDQyxPQUFTQSxLQUFLQyxRQUFRLENBQUM7UUFDdEUsTUFBTUMsT0FBT0wsTUFBTU0sR0FBRyxDQUFDLENBQUNIO1lBQ3RCLE1BQU1JLFVBQVVsQixzREFBZSxDQUFDQyxnREFBUyxDQUFDQyxVQUFVWSxPQUFPO1lBQzNELE9BQU9NLEtBQUtDLEtBQUssQ0FBQ0g7UUFDcEI7UUFFQSwrQkFBK0I7UUFDL0JGLEtBQUtNLElBQUksQ0FBQyxDQUFDQyxHQUFHQyxJQUFNLElBQUlDLEtBQUtELEVBQUVFLFNBQVMsRUFBRUMsT0FBTyxLQUFLLElBQUlGLEtBQUtGLEVBQUVHLFNBQVMsRUFBRUMsT0FBTztRQUVuRixPQUFPNUIscURBQVlBLENBQUM2QixJQUFJLENBQUM7WUFBRVo7UUFBSztJQUNsQyxFQUFFLE9BQU9hLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBTzlCLHFEQUFZQSxDQUFDNkIsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBdUIsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDNUU7QUFDRjtBQUVBLGtCQUFrQjtBQUNYLGVBQWVDLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRjNCO1FBRUEsTUFBTTRCLE1BQU0sTUFBTUQsUUFBUUwsSUFBSTtRQUU5QiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDTSxJQUFJQyxFQUFFLElBQUksQ0FBQ0QsSUFBSUUsS0FBSyxFQUFFO1lBQ3pCLE9BQU9yQyxxREFBWUEsQ0FBQzZCLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUE0QixHQUFHO2dCQUFFRSxRQUFRO1lBQUk7UUFDakY7UUFFQSxtQkFBbUI7UUFDbkIsTUFBTU0sV0FBV3BDLGdEQUFTLENBQUNDLFVBQVUsR0FBR2dDLElBQUlDLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDckRuQyx1REFBZ0IsQ0FBQ3FDLFVBQVVqQixLQUFLbUIsU0FBUyxDQUFDTCxLQUFLLE1BQU07UUFFckQsT0FBT25DLHFEQUFZQSxDQUFDNkIsSUFBSSxDQUFDO1lBQUVZLFNBQVM7WUFBTU47UUFBSTtJQUNoRCxFQUFFLE9BQU9MLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHFCQUFxQkE7UUFDbkMsT0FBTzlCLHFEQUFZQSxDQUFDNkIsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBcUIsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDMUU7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2RyYXh4bWFjL0Rlc2t0b3Avd29ya3NwYWNlL2JsdWVwcmludGVyL2FwcC9hcGkvcHJkcy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuXG4vLyBTaW1wbGUgZmlsZS1iYXNlZCBzdG9yYWdlIGZvciBQUkRzIChpbiBwcm9kdWN0aW9uLCB1c2UgYSBkYXRhYmFzZSBsaWtlIFN1cGFiYXNlKVxuY29uc3QgUFJEU19ESVIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJkYXRhXCIsIFwicHJkc1wiKVxuXG4vLyBFbnN1cmUgZGF0YSBkaXJlY3RvcnkgZXhpc3RzXG5mdW5jdGlvbiBlbnN1cmVEYXRhRGlyKCkge1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoUFJEU19ESVIpKSB7XG4gICAgZnMubWtkaXJTeW5jKFBSRFNfRElSLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICB9XG59XG5cbi8vIEdFVCBhbGwgUFJEc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBlbnN1cmVEYXRhRGlyKClcblxuICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoUFJEU19ESVIpLmZpbHRlcigoZmlsZSkgPT4gZmlsZS5lbmRzV2l0aChcIi5qc29uXCIpKVxuICAgIGNvbnN0IHByZHMgPSBmaWxlcy5tYXAoKGZpbGUpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKFBSRFNfRElSLCBmaWxlKSwgXCJ1dGYtOFwiKVxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudClcbiAgICB9KVxuXG4gICAgLy8gU29ydCBieSBjcmVhdGVkQXQgZGVzY2VuZGluZ1xuICAgIHByZHMuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5jcmVhdGVkQXQpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGEuY3JlYXRlZEF0KS5nZXRUaW1lKCkpXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBwcmRzIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIFBSRHM6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBQUkRzXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG5cbi8vIFBPU1Qgc2F2ZSBhIFBSRFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBlbnN1cmVEYXRhRGlyKClcblxuICAgIGNvbnN0IHByZCA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG5cbiAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBmaWVsZHNcbiAgICBpZiAoIXByZC5pZCB8fCAhcHJkLnRpdGxlKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJRCBhbmQgdGl0bGUgYXJlIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIC8vIFNhdmUgUFJEIHRvIGZpbGVcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihQUkRTX0RJUiwgYCR7cHJkLmlkfS5qc29uYClcbiAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCBKU09OLnN0cmluZ2lmeShwcmQsIG51bGwsIDIpKVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJkIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyBQUkQ6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBzYXZlIFBSRFwiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImZzIiwicGF0aCIsIlBSRFNfRElSIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJlbnN1cmVEYXRhRGlyIiwiZXhpc3RzU3luYyIsIm1rZGlyU3luYyIsInJlY3Vyc2l2ZSIsIkdFVCIsImZpbGVzIiwicmVhZGRpclN5bmMiLCJmaWx0ZXIiLCJmaWxlIiwiZW5kc1dpdGgiLCJwcmRzIiwibWFwIiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsIkpTT04iLCJwYXJzZSIsInNvcnQiLCJhIiwiYiIsIkRhdGUiLCJjcmVhdGVkQXQiLCJnZXRUaW1lIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyIsIlBPU1QiLCJyZXF1ZXN0IiwicHJkIiwiaWQiLCJ0aXRsZSIsImZpbGVQYXRoIiwid3JpdGVGaWxlU3luYyIsInN0cmluZ2lmeSIsInN1Y2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/prds/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprds%2Froute&page=%2Fapi%2Fprds%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprds%2Froute.ts&appDir=%2FUsers%2Fdraxxmac%2FDesktop%2Fworkspace%2Fblueprinter%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdraxxmac%2FDesktop%2Fworkspace%2Fblueprinter&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprds%2Froute&page=%2Fapi%2Fprds%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprds%2Froute.ts&appDir=%2FUsers%2Fdraxxmac%2FDesktop%2Fworkspace%2Fblueprinter%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdraxxmac%2FDesktop%2Fworkspace%2Fblueprinter&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_draxxmac_Desktop_workspace_blueprinter_app_api_prds_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/prds/route.ts */ \"(rsc)/./app/api/prds/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/prds/route\",\n        pathname: \"/api/prds\",\n        filename: \"route\",\n        bundlePath: \"app/api/prds/route\"\n    },\n    resolvedPagePath: \"/Users/draxxmac/Desktop/workspace/blueprinter/app/api/prds/route.ts\",\n    nextConfigOutput,\n    userland: _Users_draxxmac_Desktop_workspace_blueprinter_app_api_prds_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcmRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwcmRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcHJkcyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRyYXh4bWFjJTJGRGVza3RvcCUyRndvcmtzcGFjZSUyRmJsdWVwcmludGVyJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmRyYXh4bWFjJTJGRGVza3RvcCUyRndvcmtzcGFjZSUyRmJsdWVwcmludGVyJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNtQjtBQUNoRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2RyYXh4bWFjL0Rlc2t0b3Avd29ya3NwYWNlL2JsdWVwcmludGVyL2FwcC9hcGkvcHJkcy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcHJkcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3ByZHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3ByZHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvZHJheHhtYWMvRGVza3RvcC93b3Jrc3BhY2UvYmx1ZXByaW50ZXIvYXBwL2FwaS9wcmRzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprds%2Froute&page=%2Fapi%2Fprds%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprds%2Froute.ts&appDir=%2FUsers%2Fdraxxmac%2FDesktop%2Fworkspace%2Fblueprinter%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdraxxmac%2FDesktop%2Fworkspace%2Fblueprinter&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprds%2Froute&page=%2Fapi%2Fprds%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprds%2Froute.ts&appDir=%2FUsers%2Fdraxxmac%2FDesktop%2Fworkspace%2Fblueprinter%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdraxxmac%2FDesktop%2Fworkspace%2Fblueprinter&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
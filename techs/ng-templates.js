/**
 * ng-templates
 * ==========
 *
 * Combines `*.tmpl.html` files wrapping them out with `<script type="text/ng-template">` tag and filename as `id`.
 * You should fetch this file and compile it in your app using $compile service before any call to templates occurred.
 *
 * **Опции**
 *
 * * *String* **target** — Output target. Default — `?.tmpl.html`.
 *
 * **Example**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-ng-techs/techs/ng-templates'));
 * ```
 *
 * Use this snippet in project based on `ui-router` to fetch and compile templates.
 *
 * ```javascript
 * angular.module('ngApp')
 *     .run(function($http, $compile, $urlRouter, $rootScope){
 *         // make a chance to load templates before state change
 *         var un = $rootScope.$on('$stateChangeStart', function (event) {
 *             event.preventDefault();
 *         });
 *
 *         // get and compile templates
 *         $http.get('ngapp.tmpl.html')
 *             .then(function(response){
 *                 response.data.length &&
 *                 $compile(response.data);
 *                 // now we can safely set an state
 *                 un();
 *                 $urlRouter.sync();
 *             });
 *     });
 * ```
 */
var path = require('path');

module.exports = require('enb/lib/build-flow').create()
    .name('ng-templates')
    .defineOption('target')
    .target('target', '?.tmpl.html')
    .useFileList(['tmpl.html'])
    .justJoinFiles(function (filename, data) {
        return '<script type="text/ng-template" id="' + filename.split(path.sep).pop() + '">\n' + data + '\n</script>';
    })
    .createTech();

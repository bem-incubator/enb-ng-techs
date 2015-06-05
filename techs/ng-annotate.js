/**
 * ng-annotate
 * ==========
 *
 * Takes js file provided by `source` option and writes annotated result to file provided by `target` option.
 *
 * **Options**
 *
 * * *String* **source** — file-target to annotate.
 * * *String* **target** — file-target to write annotated output.
 *
 * **Example**
 *
 *  ```javascript
 * nodeConfig.addTech(require('enb-ng-techs/techs/ng-annotate'), {
 *     source : '?.pre.js',
 *     target : '?.annotated.js'
 * });
 * ```
 */

var ngAnnotate = require('ng-annotate');
module.exports = require('enb/lib/build-flow').create()
    .name('ng-annotate')
    .defineOption('target')
    .target('target', '?.js')
    .defineRequiredOption('source')
    .useSourceText('source')
    .builder(function (source) {
        return ngAnnotate(source, { add: true }).src;
    })
    .createTech();

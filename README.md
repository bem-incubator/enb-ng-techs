enb-ng-techs
==============

[![NPM version](https://img.shields.io/npm/v/enb-ng-techs.svg?style=flat)](https://www.npmjs.org/package/enb-ng-techs)

Useful ENB technologies to build angular projects.

Installation:
----------

```sh
$ npm install --save-dev enb-ng-techs
```

Techs
----------

 * `ng-annotate` - adds AngularJS dependency injection annotations using [`ng-annotate`](https://github.com/olov/ng-annotate)
 * `ng-templates` - combines `*.tmpl.html` files in single partial which can be loaded and compiled by Angular in runtime

ng-annotate
==========

Takes js file provided by `source` option and writes annotated result to file provided by `target` option.

**Options**

* *String* **source** — file-target to annotate.
* *String* **target** — file-target to write annotated output.

**Example**

```javascript
nodeConfig.addTech(require('enb-ng-techs/techs/ng-annotate'), {
    source : '?.pre.js',
    target : '?.annotated.js'
});
```

ng-templates
==========

Combines `*.tmpl.html` files by deps wrapping them out with `<script type="text/ng-template">` tag and filename as `id`.
You should fetch this file and compile it in your app using $compile service before any call to templates occurred.

**Опции**

* *String* **target** — Output target. Default — `?.tmpl.html`.

**Example**

```javascript
nodeConfig.addTech(require('enb-ng-techs/techs/ng-templates'));
```

Use this snippet in project based on `ui-router` to fetch and compile templates.

```javascript
angular.module('ngApp')
    .run(function($http, $compile, $urlRouter, $rootScope){
        // make a chance to load templates before state change
        var un = $rootScope.$on('$stateChangeStart', function (event) {
            event.preventDefault();
        });

        // get and compile templates
        $http.get('ngapp.tmpl.html')
            .then(function(response){
                response.data.length &&
                $compile(response.data);
                // now we can safely set an state
                un();
                $urlRouter.sync();
            });
    });
```

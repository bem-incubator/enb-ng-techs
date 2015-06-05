var mock = require('mock-fs'),
    MockNode = require('mock-enb/lib/mock-node'),
    ngAnnotate = require('../../techs/ng-annotate');

describe('ng-annotate', function () {
    var bundle;

    afterEach(function () {
        mock.restore();
    });

    it('must apply ng-annotate module', function () {
        mock({
            blocks: {},
            bundle: {
                'bundle.pre.js': 'angular.module("MyMod").controller("MyCtrl", function(dep1, dep2) {});'
            }
        });

        bundle = new MockNode('bundle');

        var reference = 'angular.module("MyMod").controller("MyCtrl", ["dep1", "dep2", function(dep1, dep2) {}]);';

        return bundle.runTechAndGetContent(ngAnnotate, { source: 'bundle.pre.js' })
            .spread(function (content) {
                content.toString().must.be(reference);
            });
    });
});

var EOL = require('os').EOL,
    mock = require('mock-fs'),
    FileList = require('enb/lib/file-list'),
    MockNode = require('mock-enb/lib/mock-node'),
    ngTemplates = require('../../techs/ng-templates');

describe('ng-templates', function () {
    var bundle,
        fileList;

    afterEach(function () {
        mock.restore();
    });

    it('must wrap file content with script tag and use filename as id', function () {
        mock({
            blocks: {
                'block0.tmpl.html': 'Hello0',
                'block1.tmpl.html': 'Hello1'
            },
            bundle: {}
        });

        bundle = new MockNode('bundle');
        fileList = new FileList();

        fileList.loadFromDirSync('blocks');

        bundle.provideTechData('?.files', fileList);

        var reference = [
            '<script type="text/ng-template" id="block0.tmpl.html">',
            'Hello0',
            '</script>',
            '<script type="text/ng-template" id="block1.tmpl.html">',
            'Hello1',
            '</script>'
        ].join(EOL);

        return bundle.runTechAndGetContent(ngTemplates)
            .spread(function (content) {
                content.toString().must.be(reference);
            });
    });
});

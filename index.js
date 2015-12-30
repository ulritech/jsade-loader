/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Luke Ulrich @ulritech
*/
var jade = require('jade');

var jsadeBeginKey = '`//- JSADE\n',
	jsadeEndKey = '\n`';

module.exports = function(source) {
	this.cacheable();

	var jsadeBlocks = findJsadeBlocks(source, this.resource);
	if (jsadeBlocks.length === 0)
		return source;

	var sourceWithHtml = '';
	jsadeBlocks.forEach(function(block) {
		sourceWithHtml += block.sourceBefore + '`' + block.html + '`';
	});
	var lastBlock = jsadeBlocks[jsadeBlocks.length - 1];
	sourceWithHtml += source.substr(lastBlock.jsadeEndPos + jsadeEndKey.length);

	return sourceWithHtml;
};

// --------------------------------------------------------
// Helper functions
function findJsadeBlocks(source, fileName) {
	var result = [];

	var lastSearchPos = 0,
		jsadeBeginPos = source.indexOf(jsadeBeginKey, lastSearchPos),
		hasJsadeBlock = jsadeBeginPos !== -1;
	while (hasJsadeBlock) {
		var jadeTextBeginPos = jsadeBeginPos + jsadeBeginKey.length,
			jsadeEndPos = source.indexOf(jsadeEndKey, jadeTextBeginPos),
			jadeTextLength = jsadeEndPos - jadeTextBeginPos,
			jadeText = source.substr(jadeTextBeginPos, jadeTextLength),
			html = jade.render(jadeText, {filename: fileName}),
			sourceBefore = source.substr(lastSearchPos, jsadeBeginPos - lastSearchPos);

		result.push({
			sourceBefore: sourceBefore,
			jsadeBeginPos: jsadeBeginPos,
			jsadeEndPos: jsadeEndPos,
			jadeText: jadeText,
			html: html
		});

		lastSearchPos = jsadeEndPos + jsadeEndKey.length;
		jsadeBeginPos = source.indexOf(jsadeBeginKey, lastSearchPos);
		hasJsadeBlock = jsadeBeginPos !== -1;
	}

	return result;
}

var DEFAULT_CM_OPTIONS = {
    lineNumbers: true,
    readOnly: false,
    mode: {
        name: 'javascript'
    },
    theme: 'pastel-on-dark',
    extraKeys: {
        'Ctrl-Space': 'autocomplete'
    },
    matchBrackets: true,
    closeBrackets: true,
    closeTag: true,
    continueList: true,
    indentWithTabs: true,
    lineWrapping: true
};

/**
 * CodeMirror
 * @constructor
 */
function CodeMirror() {
    this._cmOptions = DEFAULT_CM_OPTIONS;
}

/**
 * Set option
 * @param key
 * @param value
 */
CodeMirror.prototype.setOption = function(key, value) {
    this._cmOptions[key] = value;
};

/**
 * Get options
 * @returns {{lineNumbers: boolean, readOnly: boolean, mode: {name: string}, theme: string, extraKeys: {Ctrl-Space: string}, matchBrackets: boolean, closeBrackets: boolean, closeTag: boolean, continueList: boolean, indentWithTabs: boolean, lineWrapping: boolean}|*}
 */
CodeMirror.prototype.getOptions = function() {
    return this._cmOptions;
};

module.exports = CodeMirror;

# [Abc Notation](https://abcnotation.com) grammar for highlightjs

[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module.
See the [highlight.js usage](https://github.com/highlightjs/highlight.js#basic-usage) page
for more details.

### Static website or simple usage

Load the module (found in the `dist` directory):

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/highlightjs-abc/dist/abc.min.js"></script>
<script type="text/javascript">
	hljs.highlightAll();
</script>
```

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language
module, then register it with Highlight.js.

```javascript
var hljs = require('highlightjs');
var hljsAbc = require('highlightjs-abc');

hljs.registerLanguage("abc", hljsAbc);
hljs.highlightAll();
```

## Contribution

Contributions are welcome by pull request.

## Links

- The official site for the Highlight.js library is <https://highlightjs.org>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- The Abc Notation Homepage: <https://abcnotation.com>
- The Abc Notation Standard: <https://michaeleskin.com/abctools/abc_standard_v2.1.pdf>
- abc.js Project for rendering Abc notation in webpages: <https://abcjs.net>

## LICENSE

[MIT](./LICENSE)

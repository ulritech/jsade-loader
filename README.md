# jsade-loader
Webpack loader for transforming embedded JADE into HTML

## Motivation
When developing components that utilize both JavaScript and HTML (e.g. a front-end web application), it is sometimes desirable to place both the HTML template and its relevant JavaScript within the same file. The React framework accomplishes this via JSX. Angular provides this capability by embedding the desired HTML as a string. The Angular approach is awkward because writing HTML is painfully tedious compared to Jade.

The jsade-loader transforms inline / embedded Jade inside a JavaScript template string (ES6) to be converted into its corresponding HTML. This webpack loader makes it possible to embed Jade within JavaScript files. Such a capabilitiy is analagous to React's JSX and handy when developing Angular applications where you would like to write Jade in the same file as the directive definition.

## Installation

` npm install jsade-loader --save-dev `

## Usage

This module requires that your JavaScript target supports ES6 template strings. This is supported by TypeScript, Babel, and others.

Inside your JavaScript file, write your Jade as follows:

``` javascript
var template = `//- JSADE
.form-group
	label(for="email") Email
	input.form-control(type="email", id="email")
`;

// When transformed by the webpack loader, your JavaScript will look like:
var template = `<div class="form-group"><label for="email">Email</label><input type="email" id="email" class="form-control"></div>`;
```

It is important to start your Jade template string with the "`//- JSADE\n" and end it with "\n`" or else the loader will not recognize the Jade template and pass the value on directly to downstream loaders.

You can have multiple JSADE blocks as well - just follow the convention defined above.

## Sublime syntax highlighting
Another pain point when writing Jade or string embedded HTML, is the lack of syntax highlighting. To deal with this scenario, I also wrote a syntax definition file for Sublime Text that performs Jade syntax highlighting of jsade-loader compatible template strings.

Two definition files are provided for highlighting the embedded Jade:
- JavaScript-JSade.tmLanguage: highlights Jade within regular JavaScript files (*.jsade)
- TypeScript-JSade.tmLanguage: highlights Jade within TypeScript files (*.tsade)

Save these files in the Packages/User folder (~/Library/Application Support/Sublime Text 3/Packages/User on Mac OS X) and restart Sublime Text.

## Notes
Some [TypeScript](http://www.typescriptlang.org/) loaders such as the [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) do not work as expected out of the box. In particular, the [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) does not respect upstream loader output (such as when chained with the jsade loader). To fix this, simply use the useWebpackText option of [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader).

[ts-loader](https://github.com/TypeStrong/ts-loader) does not have any compatibility issues when chained with this loader.
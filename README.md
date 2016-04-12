# **logger-one**

[![NPM](https://nodei.co/npm/logger-one.png)](https://nodei.co/npm/logger-one/)

#### **A simple but efficient logging middleware for  [express.js](http://expressjs.com/)**


## Installation

```sh
npm install logger-one
```

## API


```js
var loggerOne = require('logger-one')
```

There are two different ways to use logger-one :

*  [Simple Usage](#simple-usage)
* [With options](#with-options)


### Simple Usage

``` js
app.use(loggerOne());
```

### With options


``` js
app.use(loggerOne({
	request:true,
	requestData:{
		headers:false,
		body:true,
		params:true,
		query:true
	},
	response:true,
	responseData:{
		status:true,
		body:true,
		responseTime:false
	}
}));
```

> **Note :**
>
 > - ##### ***looger-one*** middleware must be loaded  only after ***body-parser*** has been used
 >

 > - ##### All the initialisation parameters are optional and by default are set ***true***

> **Version 1.1.3 :**
>
 > - ##### ***Request URL bug fixed*** thanks to   **Nitin Padgotra (<a href="mailto:nitinhitman47@gmail.com">nitinhitman47@gmail.com</a>)**
 >



## AUTHOR

**Tabish Rizvi (<a href="mailto:sayyidtabish@gmail.com">sayyidtabish@gmail.com</a>)**

##LICENSE

**MIT**


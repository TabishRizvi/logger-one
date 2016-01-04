# **logger-one**

[![NPM](https://nodei.co/npm/logger-one.png)](https://nodei.co/npm/logger-one/)

#### **A simple but efficient logging middleware for  [express.js](http://expressjs.com/)**


## Installation

```bashp
npm install logger-one
```

## API
There are two different ways to use logger-one :

*  [Simple Usage](#simple)
* [With options](#options)


### <a id="simple">Simple Usage</a>

Logging levels in `winston` conform to the severity ordering specified by [RFC5424](https://tools.ietf.org/html/rfc5424): _severity of all levels is assumed to be numerically **ascending** from most important to least important._

### Using the Default Logger
The default logger is accessible through the winston module directly. Any method that you could call on an instance of a logger is available on the default logger:
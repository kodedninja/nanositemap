# nanositemap
<a href="https://www.npmjs.com/package/nanositemap">
  <img src="https://img.shields.io/npm/v/nanositemap.svg?style=flat-square" alt="NPM version"/>
</a>

Small sitemap generation utility based on the [official protocol](https://www.sitemaps.org/protocol.html).

## installation
```
npm i nanositemap
```

## example
```javascript
var nanositemap = require('nanositemap')

var sm = nanositemap('https://hex22.org', {
  '/': { lastmod: '2019-07-13', priority: 0.8 },
  '/blog': { lastmod: '2019-05-11', priority: 0.2 },
  '/blog/are-you-the-owner': {}
})

// or simply

var sm = nanositemap('https://hex22.org', ['/', '/blog', '/blog/are-you-the-owner'])

```

## API
### `nanositemap(str, obj|arr) -> str`

Exposes a simple function that returns the full XML string. Firstly, the base url of your site and then an array of strings (urls) or an object with the following format:

```
{
  '/:url': {
    lastmod: string,
    changefreq: string,
    priority: number
  }
}
```

In the object, all attributes are optional and everything else will be filtered out.

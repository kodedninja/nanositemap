var toXML = require('jsontoxml')
var assert = require('assert')

module.exports = nanositemap
module.exports.default = nanositemap

// constants
var XML_VERSION = `<?xml version="1.0" encoding="UTF-8"?>`
var SITEMAP_ATTRS = ['loc', 'lastmod', 'changefreq', 'priority']
var LAYOUT = [
  {
    name: 'urlset',
    attrs: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
    children: []
  }
]

// (str, obj|arr) -> str
function nanositemap (base, links) {
  assert(typeof base === 'string', 'nanositemap: base url must be a string')
  assert(typeof links === 'object', 'nanositemap: links must be an object')

  var childrenObj = []

  if (Array.isArray(links)) {
    childrenObj = links.map(function (key) {
      return url(base, {
        loc: key
      })
    })
  } else {
    childrenObj = Object.keys(links)
      .map(function (key) {
        // move the url to the loc property
        var obj = Object.assign({
          loc: key
        }, links[key])

        return url(base, obj)
      })
  }

  var sitemapObj = Array.from(LAYOUT)
  sitemapObj[0].children = childrenObj

  return (XML_VERSION + toXML(sitemapObj))
}

// (str, str|obj) -> obj
function url (base, link) {
  var children = []

  if (typeof link !== 'string') {
    // ensure that only accepted attributes are present
    var filteredAttrs = {}
    Object.keys(link)
      .filter(key => SITEMAP_ATTRS.indexOf(key) !== -1)
      .map(key => {
        filteredAttrs[key] = link[key]
      })

    // check and prepend loc property
    if (!filteredAttrs.loc) {
      throw new Error('nanositemap: loc property is required for every url')
    } else {
      filteredAttrs.loc = base + filteredAttrs.loc
    }

    children = values(filteredAttrs)
  } else {
    children.push({ name: 'loc', text: base + link })
  }

  return {
    name: 'url',
    children: children
  }
}

// (obj) -> arr
function values (obj) {
  return Object
    .keys(obj)
    .map(function (key) {
      return { name: key, text: obj[key] }
    })
}

var test = require('tape')
var nanositemap = require('.')

var INDEX_AND_BLOG = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://hex22.org/</loc></url><url><loc>https://hex22.org/blog</loc></url></urlset>`

test('arguments are required', function (t) {
  t.plan(3)

  t.throws(nanositemap, 'without arguments')
  t.throws(nanositemap.bind(undefined, '/'), 'without links')
  t.throws(nanositemap.bind(undefined, 5), 'with incorrect base url ')
})

test('with links array', function (t) {
  t.plan(2)

  var sm = nanositemap('https://hex22.org', ['/', '/blog'])

  t.equal(sm.indexOf('https://hex22.org/blog') === -1, false, 'prepends urls with base')
  t.equal(sm, INDEX_AND_BLOG, 'matches xml')
})

test('with simple links object', function (t) {
  t.plan(2)

  var sm = nanositemap('https://hex22.org', { '/': {}, '/blog': {} })

  t.equal(sm.indexOf('https://hex22.org/blog') === -1, false, 'prepends urls with base')
  t.equal(sm, INDEX_AND_BLOG, 'matches xml')
})

test('handles additional attributes', function (t) {
  t.plan(2)

  var sm = nanositemap('https://hex22.org', {
    '/': { priority: 0.8 },
    '/blog': { hello: 'world' }
  })

  t.equal(sm.indexOf('<priority>0.8</priority>') === -1, false, 'adds priority')
  t.equal(sm.indexOf('<hello>world</hello>') === -1, true, 'removes unsupported attributes')
})

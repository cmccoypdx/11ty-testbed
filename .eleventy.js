const fs = require('fs')
const filesize = require('file-size')

module.exports = (eleventyConfig => {
  eleventyConfig.addFilter("filesize", path => { 
    const stat = fs.statSync(path)
    return stat ? filesize(stat.size).human() : ''
  })
  eleventyConfig.addPassthroughCopy("img")
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addShortcode("plusOne", (num) => {
    return num + 1
  })
  eleventyConfig.addShortcode("log", obj => console.log(obj))
  eleventyConfig.addFilter("fileSlug", filename => filename.split('.')[0])
  eleventyConfig.addPairedShortcode("fileSlugPaired", filename => filename.split('.')[0])
  eleventyConfig.addShortcode("compare", function (a, operator, b, opts) {
    let bool
    switch (operator) {
      case '==':
        bool = a == b
        break
      case '===':
        bool = a === b
        break
      case '!=':
        bool = a != b
        break
      case '!==':
        bool = a !== b
        break
      case '>':
        bool = a > b
        break
      case '<':
        bool = a < b
        break
      case '>=':
        bool = a >= b
        break
      case '<=':
        bool = a <= b
        break
      default:
        bool = false
    }
    if (bool) {
      return opts.fn(this)
    } else {
      return opts.inverse(this)
    }
  })
  return {
    dir: {
      layouts: "layouts"
    }
  }
})

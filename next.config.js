const path = require('path')

const nextConfig = {
    images: {
        domains: ["digitalcityseries.com"],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'style')]
    }
}

module.exports = nextConfig

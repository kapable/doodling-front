const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANAYLZE === 'true',
});

module.exports = withBundleAnalyzer({
    compress: true,
    reactStrictMode: true,
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production';
        return {
            ...config,
            mode: prod ? 'production' : "development",
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins: [
                ...config.plugins,
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
            ],
        };
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'scss')],
    },
    images: {
        domains: ['images.doodling.kr']
    }
});
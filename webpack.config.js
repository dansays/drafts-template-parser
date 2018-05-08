const webpack = require('webpack');

const config = {
  entry: {
		'parse-tags': './src/parse-tags.js'
	},
	output: {
		filename: '[name].js',
		path: `${__dirname}/dist`
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
	mode: 'none',
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};

module.exports = config;

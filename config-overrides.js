const { override, addWebpackResolve } = require('customize-cra');
const path = require('path');

module.exports = override(
	addWebpackResolve({
		alias: {
			react: path.resolve(__dirname, 'node_modules/react'),
			'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
			recoil: path.resolve(__dirname, 'src/modules/recoil'),
		},
	})
);

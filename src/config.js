const env = process.env.PRODUCTION ? 'production': 'dev';
const config = {
	dev: {
	api_uri: 'http://localhost:2019',

	},
	production: {

	}
};

export default config[`${env}`];

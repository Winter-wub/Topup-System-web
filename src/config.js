const config = {
	dev: { api_uri: 'http://localhost:2019' },
	product: { api_uri: 'https://pp.10000lan.com/backend' },
};
let env = 'dev';
if (window.location.href !== 'http://localhost:3000/') {
	env = 'product';
}

export default config[env];

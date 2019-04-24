const config = {
	dev: { api_uri: 'http://localhost:2019/backend' },
	product: { api_uri: 'https://pp.10000lan.com/backend' },
};
let env = 'dev';
if (!window.location.href.includes('localhost')) {
	env = 'product';
}

export default config[env];

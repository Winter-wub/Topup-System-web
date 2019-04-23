const config = {
	dev: { api_uri: 'http://localhost:2019' },
	product: { api_uri: 'http://172.96.190.138:2019' },
};
let env = 'dev';
if (window.location.href !== 'http://localhost:3000/') {
	env = 'product';
}

export default config[env];

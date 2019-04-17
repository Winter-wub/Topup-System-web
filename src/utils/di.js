class Di {
	constructor() {
		this.di = {};
	}
	set(depName, dep) {
		this.di[depName] = dep;
	}
	get(depName) {
		return this.di[depName];
	}
}

export default new Di();

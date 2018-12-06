exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['general.js'],
  capabilities: {
	browserName: 'chrome'
//	browserName: 'firefox'
  },
};


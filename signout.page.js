var SignoutPage = function(base_url){
	this.base_url = base_url;
	this.dropdownMenu = element(by.css('a[data-toggle=dropdown]'));
	this.signoutLink = element(by.linkText('Logout'));
	this.signout = function(){
		browser.get(base_url);
		this.dropdownMenu.click();
		this.signoutLink.click();
	};
};

module.exports = SignoutPage;


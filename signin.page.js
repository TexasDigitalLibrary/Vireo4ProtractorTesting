var SigninPage = function(base_url){
	this.base_url = base_url;
   	this.signinLink = element(by.linkText('Login'));
	this.shibButton = element(by.buttonText('Shibboleth Login'));
	//this.welcomeMessage = element(by.tagName('h1'));
	//this.submissionLink = element.all(by.tagName('a')).get(1);

	//Have to do fancy stuff below because of the intermodal.
	//Otherwise we would get an error about the button not being in view.
	this.signin = function(){
    	browser.get(this.base_url);
   		//this.signinLink = element(by.linkText('Login'));
		browser.sleep(1000);
   		this.signinLink.click();

		browser.sleep(1000);
		//this.shibButton = element(by.buttonText('Shibboleth Login'));
		//browser.sleep(1000);
		browser.actions().mouseMove(this.shibButton).perform();
		//browser.sleep(1000);
		browser.executeScript("arguments[0].click();",this.shibButton);
		//browser.sleep(1000);
		console.log("SIGNED IN");
  	};
};
module.exports = SigninPage;


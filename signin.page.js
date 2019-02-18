var SigninPage = function(base_url){
	this.base_url = base_url;
   	this.signinLink = element(by.linkText('Login'));
	this.shibButton = element(by.buttonText('Shibboleth Login'));

	//Have to do fancy stuff below because of the intermodal.
	//Otherwise we would get an error about the button not being in view.
	this.signin = function(){
    	browser.get(this.base_url);
   		this.signinLink = element(by.linkText('Login'));
		browser.sleep(1000);
   		this.signinLink.click();

        browser.sleep(2000);
    	if(browser.params.signin=='account'){
			//Account signin
			var json = require('./signin.json');
   			this.userName = element(by.id('email'));
   			this.userPassword = element(by.id('userPassword'));
			this.userName.click();
       		this.userName.clear().sendKeys(json.email);
        	this.userPassword.click();
        	this.userPassword.clear().sendKeys(json.pwd);
        	browser.sleep(4000);
   			this.signinButton = element(by.buttonText('Login'));
			browser.actions().mouseMove(this.signinButton).perform();
			browser.executeScript("arguments[0].click();",this.signinButton);
			browser.sleep(2000);
		}else{
			//Shibboleth signin
			browser.actions().mouseMove(this.shibButton).perform();
			browser.executeScript("arguments[0].click();",this.shibButton);
			browser.sleep(2000);
		};
		console.log("SIGNED IN");
  	};
};
module.exports = SigninPage;


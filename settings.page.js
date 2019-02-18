var SettingsPage = function(){

	this.dropdownMenu = element.all(by.css('.dropdown'));
	this.menuLinks = element.all(by.css('a[role=menuitem]'));

	this.gotoSettings = function(){
		this.dropdownMenu.click();
    	this.menuLinks.getText().then(function(text){
        	//console.log("MENU ITEM TEXT "+text);
    	});
		this.settings = this.menuLinks.get(4);
		this.settings.click();
		browser.sleep(1000);
		//this.awoMenu = element.all(by.css('.settings-view .ng-scope'));
		this.awoMenu = element.all(by.tagName('vireo-tab'));
    	this.awoMenu.getText().then(function(text){
       		//console.log("AWO TEXT "+text);
    	});
	};

	this.applicationSettings = function(){
		this.submissionAvail = element(by.id('submissionAvailability'));
		this.submissionOpen = element.all(by.css('input[value=Open]'));
		this.submissionClosed = element.all(by.css('input[value=Closed]'));
		this.multSubmissionYes = element.all(by.css('input[value=Yes]'));
		this.multSubmissionNo = element.all(by.css('input[value=No]'));
		this.degreeGrantingSchool = element.all(by.id('grantorValue')).get(1);

		//Click on Submission Availability tab
		this.awoMenu.get(0).click();
		browser.sleep(1000);
		this.submissionAvail.click();	
		browser.sleep(1000);

		//Set 'Submissions are currently:'
		this.submissionClosed.click();
		browser.sleep(1000);
		this.submissionOpen.click();
		browser.sleep(1000);

		//Set 'Multiple Submissions:'
		this.multSubmissionNo.click();
		browser.sleep(1000);
		//this.multSubmissionYes.count().then(function(count){
		//		console.log("COUNT "+count);
		//});
		this.multSubmissionYes.click();
		browser.sleep(1000);
//FSS
		this.degreeGrantingSchool.click();
		this.degreeGrantingSchool.clear().sendKeys("Random Degree Granting School");
		browser.sleep(1000);
		this.degreeGrantingSchool.submit();
	};

	this.organizationSettings = function(){
		this.orgNameInput = element(by.css('input[id=sidebox-organization-name]'));
		this.awoMenu.get(2).click();
		browser.sleep(1000);
		this.orgNameInput.click();
		var orgName = getRandomString(5);
		this.orgNameInput.sendKeys(orgName);
		browser.sleep(1000);
		this.orgNameInput.submit();
		browser.sleep(1000);

		this.instNameInput = element(by.css('input[placeholder="Name of the organization"]'));
		this.instNameInput.click();
		browser.sleep(1000);
		this.instNameInput.clear().sendKeys("MY INSTITUTION");
		browser.sleep(1000);
		//this.instNameInput.submit();

		this.multInstSubmissionYes = element.all(by.css('input[value=Yes]'));
		this.multInstSubmissionYes.count().then(function(count){
			//console.log("COUNT "+count);
		});
		browser.sleep(1000);
		this.multInstSubmissionYes.click();

        this.SaveButton = element.all(by.tagName('button'));
        this.SaveButton.each(function(btn){
            btn.getText().then(function(txt){
                //console.log("FSS TEXT "+txt);
                if(txt == "Save"){
                    btn.click();
                }
            }.bind(btn));
        });
		browser.sleep(1000);

		return orgName;
	};

	getRandomString = function(length){
		var string = '';
		var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (i = 0; i < length; i++) {
            string += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return string;
    }
};

module.exports = SettingsPage;



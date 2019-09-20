var BatchPage = function(base_url){
	this.base_url = base_url;
	this.dropdownMenu = element.all(by.css('.dropdown'));
	this.menuLinks = element.all(by.css('a[role=menuitem]'));


    this.gotoList = function(){
        this.dropdownMenu.click();
        this.menuLinks.getText().then(function(text){
            console.log("MENU ITEM TEXT "+text);
        });
        this.settings = this.menuLinks.get(3);
        this.settings.click();
        browser.sleep(1000);
	}

	this.batchAssignTo = function(){
        browser.get(this.base_url+"/admin/list");
		batchAssignLink = element(by.css('[ng-click="openModal(\'\#batchAssignTo\')"]'));
        browser.sleep(1000);
		browser.actions().mouseMove(batchAssignLink).perform();
        browser.sleep(1000);
		browser.executeScript("arguments[0].click();",batchAssignLink);
        //batchAssignLink.click();
        browser.sleep(2000);

		assignButton = element(by.buttonText('Assign user'));
        assignButton.click();

	}
};
module.exports = BatchPage;



var SigninPage = require('./signin.page');
var SettingsPage = require('./settings.page');
var SubmissionsPage = require('./submissions.page');
var XPage = require('./x.page');
var SignoutPage = require('./signout.page');

  describe('Sign In', function() {
	var base_url = "http://127.0.0.1:9000";
	//var base_url = "https://test-etd.tdl.org";
	if(browser.params.baseurl!=null){
		base_url = browser.params.baseurl;
	}

	var signin = new SigninPage(base_url);
	var settings = new SettingsPage();
	var submissions = new SubmissionsPage(base_url);
	var x = new XPage(base_url);
	var signout = new SignoutPage(base_url);

//SIGN IN
	it('should sign in',function(){
		signin.signin();
        //expect(signin.welcomeMessage.getText()).toContain("Welcome to the Thesis");
        //expect(signin.submissionLink.getText()).toContain("submission");
	});

/****/
	if(browser.params.perform=='settings'){
		//CHANGE SETTINGS
		console.log("OPENSETTINGS TRUE");
		it('should go to settings',function(){
			settings.gotoSettings();
		});
		it('should set application settings',function(){
			settings.applicationSettings();
		});
		it('should set organization settings',function(){
			settings.organizationSettings();
		});
	}else{
		//CREATE SUBMISSION
		it('start/resume submissions',function(){
			submissions.startResumeSubmissions();
			submissions.enterPersonalData();
			submissions.enterLicenseData();
			submissions.enterDocumentData();
			submissions.enterFileData();
			submissions.reviewData();
		});
	};
/****/

//SIGN OUT
	it('should sign out',function(){
		signout.signout();
		browser.sleep(2000);
	});
  });



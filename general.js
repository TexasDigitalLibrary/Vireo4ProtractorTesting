
var SigninPage = require('./signin.page');
var SettingsPage = require('./settings.page');
var SubmissionsPage = require('./submissions.page');
var SignoutPage = require('./signout.page');

  describe('Sign In', function() {
	var base_url = "http://127.0.0.1:8080";
	//var base_url = "http://127.0.0.1:9000";
	//var base_url = "https://test-etd.tdl.org";
	if(browser.params.baseurl!=null){
		base_url = browser.params.baseurl;
	}

	var signin = new SigninPage(base_url);
	var settings = new SettingsPage();
	var submissions = new SubmissionsPage(base_url);
	var signout = new SignoutPage(base_url);

//SIGN IN
	it('should sign in',function(){
		signin.signin();
        //expect(signin.welcomeMessage.getText()).toContain("Welcome to the Thesis");
        //expect(signin.submissionLink.getText()).toContain("submission");
	});

	var orgName = "TEST";
	if(browser.params.orgname){
		orgName = browser.params.orgname;
	}

	if(browser.params.perform=='settings'){
		//CHANGE SETTINGS
		it('should go to settings',function(){
			settings.gotoSettings();
		});
		it('should set application settings',function(){
			settings.applicationSettings();
		});
//FSS
		it('should set organization settings',function(){
			settings.organizationSettings(orgName);
		});
//FSS

	}else if(browser.params.perform=='firstsubmission'){
		//CREATE FIRST SUBMISSION
		it('start/resume submissions',function(){
//FSS
			//var orgName = null;
			//settings.gotoSettings();
			//orgName = settings.organizationSettings();
//NEED A WAY TO GET ONE FROM LIST
//FSS

			submissions.firstSubmissions(orgName);

			submissions.enterPersonalData();
			submissions.enterLicenseData();
			submissions.enterDocumentData();
			submissions.enterFileData();
			submissions.reviewData();
		});

	}else if(browser.params.perform=='submission'){
		//CREATE SUBSEQUENT SUBMISSIONS
		it('start/resume submissions',function(){
//FSS
			//var orgName = null;
			//settings.gotoSettings();
			//orgName = settings.organizationSettings();
//NEED A WAY TO GET ONE FROM LIST
			var orgName = "PPLZI";
//FSS

			submissions.additionalSubmissions(orgName);

			submissions.enterPersonalData();
			submissions.enterLicenseData();
			submissions.enterDocumentData();
			submissions.enterFileData();
			submissions.reviewData();
		});
	};

//SIGN OUT
	it('should sign out',function(){
		signout.signout();
		browser.sleep(2000);
	});
  });



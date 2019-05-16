var SubmissionsPage = function(base_url){
	this.base_url = base_url;
   	this.startYourSubmission = element(by.css('a[href*="submission/new"]'));
   	this.submitForm = element(by.tagName('form[name="newSubmission"]'));
	this.resumeYourSubmission = element(by.css('a[href*="submission/history"]'));
   	this.listOfInstitutions = element.all(by.css('.triptych-panel-entry'));
	var delay_time = 2000;


	this.additionalSubmissions = function(orgName){
		console.log("ADDITIONAL SUB ORG NAME "+orgName);
		var tmpObject = ""; 
   		browser.get(this.base_url);
		this.resumeYourSubmission.isPresent().then(function(present){
			if(present){
				console.log("RESUME SUBMISSION");
				this.resumeYourSubmission = element(by.css('a[href*="submission/history"]'));
        		browser.actions().mouseMove(this.resumeYourSubmission).perform();
		        browser.executeScript("arguments[0].click();",this.resumeYourSubmission);

				var newSubButton = element(by.buttonText('New Submission'));
		        browser.executeScript("arguments[0].click();",newSubButton);
				browser.sleep(delay_time);
				var newStartButton = element(by.buttonText('Start'));
		        browser.executeScript("arguments[0].click();",newStartButton);

				browser.sleep(delay_time);
   				this.listOfInstitutions = element.all(by.css('.triptych-panel-entry'));
				browser.sleep(delay_time);

        		this.listOfInstitutions.each(function(suborg){
					var sp = suborg.all(by.tagName("span"));
					sp.getText().then(function(txt){
						if(txt == orgName){
							suborg.click();
						}
					}.bind(suborg));
				});


				browser.sleep(delay_time);
   				this.submitForm = element(by.tagName('form[name="newSubmission"]'));
   				this.submitForm.all(by.tagName('button')).get(0).click();
			}
		});
		return tmpObject;
	},
    function(err){
        console.log("ERROR");
	};

	this.firstSubmissions = function(orgName){
		console.log("FIRST SUB ORG NAME "+orgName);
		var tmpObject = ""; 
   		browser.get(this.base_url);
		this.startYourSubmission.isPresent().then(function(present){
			if(present){
   				this.startYourSubmission = element(by.css('a[href*="submission/new"]'));
				this.startYourSubmission.click();
   				this.listOfInstitutions = element.all(by.css('.triptych-panel-entry'));
				this.listOfInstitutions.each(function(inst){
					var sp = inst.all(by.tagName("span"));
					sp.getText().then(function(spinst){
            			//console.log("INST "+spinst);
					});
				});
//CHECK TO SEE THERE ARE INSTITUTIONS TO CHOOSE FROM
				this.listOfInstitutions.get(0).click();
   				this.submitForm = element(by.tagName('form[name="newSubmission"]'));
   				this.submitForm.all(by.tagName('button')).get(0).click();
				tmpObject = "new";
			}
		});
		return tmpObject;
	},
    function(err){
        console.log("ERROR");
	};

	this.enterPersonalData = function(){
		//chained promises seem to work - verify later
		this.firstName = element(by.name('first_name'));
		this.firstName.clear().sendKeys(getRandomString(5));
		this.lastName = element(by.name('last_name'));
		var lastName = getRandomString(8);
		this.lastName.clear().sendKeys(lastName);
		this.orcid = element(by.name('local.etdauthor.orcid'));
		this.orcid.clear().sendKeys('1111-2222-3333-4444');
		this.tdSchool = element(by.name('school'));
		this.tdSchool.clear().sendKeys("Old School");
		this.tdCollege = element(by.name('thesis.degree.college'));
		this.tdCollege.clear().sendKeys("Oil and Gas Law");
		this.tdDept = element(by.name('thesis.degree.department'));
		this.tdDept.clear().sendKeys("Chemical Engineering");

//		this.tdDeg = element(by.name('thesis.degree.name'));
//		this.tdDeg.clear().sendKeys("Master of Real Estate");

		this.tdMajor = element(by.name('thesis.degree.major'));
		this.tdMajor.clear().sendKeys("Petroleum Engineering");
		this.tdPhoneForm = element(by.id('permanent_phone'));
		this.tdPhone = this.tdPhoneForm.all(by.tagName('input'));
		this.tdPhone.get(0).clear().sendKeys("(785) 555-1212");
		this.tdAddressForm = element(by.id('permanent_address'));
		this.tdAddress = this.tdAddressForm.all(by.tagName('textarea'));
		this.tdAddress.get(0).clear().sendKeys("123 fake street");
		this.tdEmailForm = element(by.id('permanent_email'));
		this.tdEmail = this.tdEmailForm.all(by.tagName('input'));
		this.tdEmail.get(0).clear().sendKeys(lastName+"@example.com");
		browser.sleep(delay_time);

		this.ContinueButton = element.all(by.tagName('button'));
		this.ContinueButton.each(function(btn){
			btn.getText().then(function(txt){
				if(txt == "Continue to License Agreement"){
					btn.click();
					//console.log("PERSONAL DATA ENTERED");
				}
			}.bind(btn));
		});
		browser.sleep(delay_time);
	};

	this.enterLicenseData = function(){
		//console.log("LICENCE AGREEMENT");

		this.licenceAgreement = element.all(by.tagName('label'));
		this.licenceAgreement.each(function(liag){
			liag.getText().then(function(txt){
				if(txt.startsWith('By checking here')){
					var inp = liag.all(by.tagName('input'));
					inp.each(function(iii){
						iii.isSelected().then(function(issel){
							if(issel){
								//console.log("LIC IS SELECTED");
							}else{
								//console.log("LIC IS NOT SELECTED");
								liag.click();
							}
						}.bind(liag));
					}.bind(liag));
				}
			}.bind(liag));
		});
		this.ContinueButton = element.all(by.tagName('button'));
		this.ContinueButton.each(function(btn){
			btn.getText().then(function(txt){
				if(txt == "Continue to Document Information"){
					btn.click();
					//console.log("LICENSES CHECKED");
				}
			}.bind(btn));
		});
		browser.sleep(delay_time);
	};

	this.enterDocumentData = function(){
		//console.log("DOCUMENT DATA");
		this.titleInput = element(by.name('dc.title'));
		this.titleInput.clear().sendKeys("Stuff I Learned");

		this.tdDegDateForm = element(by.id('dc.date.created'));
		this.tdDegDateInput = this.tdDegDateForm.all(by.tagName('input'));
		this.tdDegDateInput.get(0).click();
		browser.sleep(2*delay_time);
		var tdDegDateTable = element(by.css('table[role="grid"]'));
		var tdDegDateBtn = tdDegDateTable.all(by.tagName('button'));
		tdDegDateBtn.each(function(btn){
			btn.isPresent().then(function(pres){
				if(pres){
				btn.getText().then(function(txt){
					if(txt == "December"){
        				browser.actions().mouseMove(btn).perform();
		       	 		browser.executeScript("arguments[0].click();",btn);
						browser.sleep(delay_time);
					}
				}.bind(btn));
				}
			});
		});
		this.submType = element(by.id('submission_type'));
		this.submTypeDD = this.submType.all(by.css('.dropdown-toggle-button'));
		this.submTypeDD.click();
		browser.sleep(delay_time);
		this.submTypeA = this.submType.all(by.tagName('a'));
		this.submTypeA.each(function(anchor){
			anchor.getText().then(function(txt){
				if(txt == "Dissertation"){
					anchor.click();
				}
			}.bind(anchor));
		});

		this.abstractForm = element(by.id('dc.description.abstract'));
		this.abstractFormTA = this.abstractForm.all(by.tagName('textarea')).get(0);
		this.abstractFormTA.clear().sendKeys("my abstract");

		this.keywordsForm = element(by.id('keywords'));
		this.keywordsFormI = this.keywordsForm.all(by.tagName('input')).get(0);
		this.keywordsFormI.clear().sendKeys("keyword1");

		this.subjectsForm = element(by.id('dc.subject'));
		this.subjectsFormI = this.subjectsForm.all(by.tagName('input'));
		this.subjectsFormI.clear().sendKeys("subject1");


		this.commChair = element(by.id('dc.contributor.advisor'));
		this.commChairDD = this.commChair.all(by.css('.dropdown-toggle-button'));
		this.commChairDD.click();
		browser.sleep(delay_time);
		this.commChairA = this.commChair.all(by.tagName('a'));
		this.commChairA.each(function(anchor){
			anchor.getText().then(function(txt){
				if(txt == "Aggie Jack"){
					anchor.click();
				}
			}.bind(anchor));
		});

		this.nonChair = element(by.id('dc.contributor.committeeMember'));
		var nonChairI = this.nonChair.all(by.tagName('input'));
		nonChairI.each(function(inp){
			//console.log("NON COMM CHAIR INP");
			browser.sleep(delay_time);
		});
		nonChairI.get(0).clear().sendKeys("Eddie Ed Exciting");
		nonChairI.get(0).click();
		nonChairI.get(1).click();
		nonChairI.get(1).clear().sendKeys("eddieexciting@mailinator.com");


		this.defaultEmbargos = element(by.id('default_embargos'));
		this.defaultEmbargosList = this.defaultEmbargos.all(by.tagName('input[type="radio"]'));
		this.defaultEmbargosList.get(1).click();

		this.proquestEmbargos = element(by.id('proquest_embargos'));
		this.proquestEmbargosList = this.proquestEmbargos.all(by.tagName('input[type="radio"]'));
		this.proquestEmbargosList.get(1).click();

		this.ContinueButton = element.all(by.tagName('button'));
		this.ContinueButton.each(function(btn){
			btn.getText().then(function(txt){
				if(txt == "Continue to File Upload"){
					btn.click();
					//console.log("DOCUMENT DATA ENTERED");
				}
			}.bind(btn));
		});
	};


	this.enterFileData = function(){
//		this.fileInputForm = element(by.id('_doctype_primary'));
//		this.dropZone = this.fileInputForm.all(by.tagName('dropzone'));
//		this.dropZone.get(0).click();
//		browser.sleep(10*delay_time);

		//this.fileUp = element('input[type="file"]');
		//var path = require('path');
		//var absPath = path.resolve('/Users/s7728/Desktop/f1040.pdf');
		//this.fileUp.sendKeys(absPath);

		this.ContinueButton = element.all(by.tagName('button'));
		this.ContinueButton.each(function(btn){
			btn.getText().then(function(txt){
				if(txt == "Continue to Review"){
					btn.click();
					//console.log("File Upload COMPLETED");
				}
			}.bind(btn));
		});
	};


	this.reviewData = function(){
		this.ContinueButton = element.all(by.tagName('button'));
		this.ContinueButton.each(function(btn){
			btn.getText().then(function(txt){
				if(txt == "Confirm & Submit"){
					browser.sleep(10*delay_time);
					btn.click();
					//console.log("Review COMPLETED");
				}
			}.bind(btn));
		});
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

module.exports = SubmissionsPage;



var SubmissionsPage = function(base_url){
	this.base_url = base_url;
   	this.startYourSubmission = element(by.css('a[href*="submission/new"]'));
   	this.submitForm = element(by.tagName('form[name="newSubmission"]'));
	this.resumeYourSubmission = element(by.css('a[href*="submission/history"]'));
   	this.listOfInstitutions = element.all(by.css('.triptych-panel-entry'));

//TANGLED CALLBACK MISERY - FIX LATER
	this.startResumeSubmissions = function(){
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
			}else{
				this.resumeYourSubmission = element(by.css('a[href*="submission/history"]'));
				this.resumeYourSubmission.isPresent().then(function(present){
					if(present){
						//console.log("RESUME SUBMISSION");
						this.resumeYourSubmission = element(by.css('a[href*="submission/history"]'));
		        		browser.actions().mouseMove(this.resumeYourSubmission).perform();
				        browser.executeScript("arguments[0].click();",this.resumeYourSubmission);

						var tableBody = element(by.tagName("tbody"));
						var tableRows = tableBody.all(by.tagName("tr"));
						/***
						tableRows.each(function(tr){
							var tableRowCol = tr.all(by.tagName("td"));
							tableRowCol.each(function(trc){
								trc.getText().then(function(trctext){
									console.log("CELL "+trctext);
								});
							});
							//var continueLink = tableBody.all(by.tagName("a"));
							//continueLink.get(0).click();
							browser.sleep(1000);
						});
						***/
						/***/
						var firstRowLinks = tableRows.get(0).all(by.tagName('a'));
						firstRowLinks.each(function(frl){
							frl.getText().then(function(frltext){
								if(frltext == "View"){
									//console.log("THESIS ALREADY SUBMITTED");
   									var newSubmitButtonList = element.all(by.tagName('button'));
									newSubmitButtonList.each(function(btn){
										btn.getText().then(function(btntext){
											//console.log("BTNS "+btntext);
//this can be used for detecting a 'New Submission' button when the only submission in the list is completely submitted
//need to find way to follow a different path in general when the old submission is complete - return a value or set a global?
										});
									});
									browser.sleep(1000);
									process.exit();
								}
							}.bind(frl));
						});
						/***/
					}else{
					}
					//console.log("RESUME SUBMISSION DONE");
				});
				tmpObject = "resume";
			}
		});
		return tmpObject;
	},
    function(err){
        console.log("ERROR");
	};

	this.enterPersonalData = function(){
		/**/
		//chained promises seem to work - verify later
		this.firstName = element(by.name('first_name'));
		this.firstName.clear().sendKeys("Jethro");
		this.lastName = element(by.name('last_name'));
		this.lastName.clear().sendKeys("Bodine");
		this.tdCollege = element(by.name('thesis.degree.college'));
		this.tdCollege.clear().sendKeys("Oil and Gas Law");
		this.tdDept = element(by.name('thesis.degree.department'));
		this.tdDept.clear().sendKeys("Chemical Engineering");

//		this.tdDeg = element(by.name('thesis.degree.name'));
//		this.tdDeg.clear().sendKeys("Master of Real Estate");
/**
        this.tdDegForm = element(by.id('thesis.degree.name'));
        this.tdDegFormButton = this.tdDegForm.all(by.tagName('ul'));
        this.tdDegFormButton.click();
        browser.sleep(15000);
        this.tdDegA = this.tdDeg.all(by.tagName('a'));
        this.tdDegA.each(function(anchor){
            anchor.getText().then(function(txt){
                //console.log("ANCHOR TEXT "+txt);
                if(txt == "Bachelor of Science"){
                    anchor.click();
                }
            }.bind(anchor));
        });
**/


		this.tdMajor = element(by.name('thesis.degree.major'));
		this.tdMajor.clear().sendKeys("Petroleum Engineering");
		this.tdPhoneForm = element(by.id('permanent_phone'));
		this.tdPhone = this.tdPhoneForm.all(by.tagName('input'));
		this.tdPhone.get(0).clear().sendKeys("(785) 555-1212");
		this.tdAddressForm = element(by.id('permanent_address'));//textarea[placeholder="Input Permanent Address"]'));
		this.tdAddress = this.tdAddressForm.all(by.tagName('textarea'));
		this.tdAddress.get(0).clear().sendKeys("123 fake street");
		this.tdEmailForm = element(by.id('permanent_email'));
		this.tdEmail = this.tdEmailForm.all(by.tagName('input'));
		this.tdEmail.get(0).clear().sendKeys("bodine@beverlyhills.com");
		browser.sleep(1000);
		/**/

		this.ContinueButton = element.all(by.tagName('button'));
		this.ContinueButton.each(function(btn){
			btn.getText().then(function(txt){
				if(txt == "Continue to License Agreement"){
					btn.click();
					//console.log("PERSONAL DATA ENTERED");
				}
			}.bind(btn));
		});
		browser.sleep(1000);
	};

	this.enterLicenseData = function(){
		//console.log("LICENCE AGREEMENT");

		/**/
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
		/**/
		this.ContinueButton = element.all(by.tagName('button'));
		this.ContinueButton.each(function(btn){
			btn.getText().then(function(txt){
				if(txt == "Continue to Document Information"){
					btn.click();
					//console.log("LICENSES CHECKED");
				}
			}.bind(btn));
		});
		browser.sleep(1000);
	};

	this.enterDocumentData = function(){
		//console.log("DOCUMENT DATA");
/*****/
		this.titleInput = element(by.name('dc.title'));
		this.titleInput.clear().sendKeys("Stuff I Learned");

		this.tdDegDateForm = element(by.id('dc.date.created'));
		this.tdDegDateInput = this.tdDegDateForm.all(by.tagName('input'));
		this.tdDegDateInput.get(0).click();
		browser.sleep(2000);
		var tdDegDateTable = element(by.css('table[role="grid"]'));
		var tdDegDateBtn = tdDegDateTable.all(by.tagName('button'));
		tdDegDateBtn.each(function(btn){
			btn.isPresent().then(function(pres){
				if(pres){
				btn.getText().then(function(txt){
					if(txt == "December"){
        				browser.actions().mouseMove(btn).perform();
		       	 		browser.executeScript("arguments[0].click();",btn);
						browser.sleep(1000);
					}
				}.bind(btn));
				}
			});
		});
		this.submType = element(by.id('submission_type'));
		this.submTypeDD = this.submType.all(by.css('.dropdown-toggle-button'));
		this.submTypeDD.click();
		browser.sleep(1000);
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
		browser.sleep(1000);
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
			browser.sleep(1000);
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
/*****/

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
/***
		this.fileInputForm = element(by.id('_doctype_primary'));
		this.dropZone = this.fileInputForm.all(by.tagName('dropzone'));
		this.dropZone.get(0).click();
		browser.sleep(10000);
		//this.fileUp = element('input[type="file"]');
		//var path = require('path');
		//var absPath = path.resolve('/Users/s7728/Desktop/f1040.pdf');
		//this.fileUp.sendKeys(absPath);
***/		

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
					browser.sleep(10000);
					btn.click();
					//console.log("Review COMPLETED");
				}
			}.bind(btn));
		});
	};

};

module.exports = SubmissionsPage;


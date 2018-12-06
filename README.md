This project is set up to give a first look at how protractor might be used for testing 


#download protractor

> npm install -g protractor


#load necessary files

> webdriver-manager update


#In one window start the webdriver

> webdriver-manager start


#In another window start a local copy of vireo.

> mvn clean spring-boot:run 
	#Alternately, change the URL in general.page.js to point to another instance.


#Currently protractor is using and has been tested with the chrome browser.  Firefox may also be used.
#This choice is made in conf.js


#In a 3rd window start protractor;
> protractor conf.js

	--params.perform=settings
		#settings: sign in, open vireo for submissions, create a randomly named institution, then sign out
		#default: create a submission

	--params.baseurl=https://test-etd.tdl.org
		#set the base url of the vireo4 service
		#default: http://127.0.0.1:9000


######
#Run Some Tests
The operation below assumes you are testing a vireo4 instance at the default url of http://127.0.0.1:9000.

If the vireo4 instance you are testing is freshly installed and not open for submissions you will first need to invoke;

> protractor conf.js --params.perform=settings


After that, to create a new submission or resume one in progress, invoke without any perform settings;

> protractor conf.js

This will create a new submission or resume one in progress.  If the most recent submission is complete
then the program will exit.

As mentioned at the top of the page, this is intended to demo what a protractor test on vireo4 might look like.
The next work on this project is revising the new vs in progress submission selection, and providing subsequent
actions for when the current submission has been completed.  This is a work in progress.








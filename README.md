This project is set up to give a first look at how protractor might be used for testing 


Download protractor

> npm install -g protractor


Load necessary files

> webdriver-manager update


In one window start the webdriver

> webdriver-manager start


In another window start a local copy of vireo.

> mvn clean spring-boot:run 

	(The current code is set to look to http://127.0.0.1:9000. Use a command line parameter to point elsewhere.)


Currently protractor is using and has been tested with the chrome browser.  Firefox may also be used.  This choice is made in conf.js


In a 3rd window start protractor;
> protractor conf.js

	--params.perform=settings
		#settings: sign in, open vireo for submissions, create a randomly named institution, then sign out
		#default: create a submission

	--params.baseurl=https://test-etd.tdl.org
		#set the base url of the vireo4 service
		#default: http://127.0.0.1:9000


RUN TESTS

The operation below assumes you are testing a vireo4 instance at the default url of http://127.0.0.1:9000.

If the vireo4 instance you are testing is freshly installed and not open for submissions you will first need to invoke;

> protractor conf.js --params.perform=settings


After that, to create a new submission or resume one in progress, invoke without any perform settings;

> protractor conf.js

This will create a new submission or resume one in progress.  Currently all actions needed for completing a submission
are performed except file upload.

If the most recent submission is complete then the program will exit.

As mentioned above, this is intended to demo what a protractor test on vireo4 might look like and is a work in progress.
The next work on this project is to automate file upload, revise the new vs in progress submission selection
and provide subsequent actions for when the current submission has been completed.  Additionally there are 'expect' assertions
to be added in select places.
 











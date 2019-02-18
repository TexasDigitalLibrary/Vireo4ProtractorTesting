This project is set up to give a first look at how protractor might be used for testing.  It is very rough and a work in progress. 

## Setup ##
Download protractor

```
  npm install -g protractor
```


Clone this repository into a local directory

```
	git clone
```


Update and start the webdriver in one terminal.

```
  webdriver-manager update
  webdriver-manager start
```


Open another terminal window to run protractor.


Currently protractor is using and has been tested with the chrome browser.
Firefox may also be used.  This choice is made in conf.js

## Use ##

Basic usage

```
  protractor conf.js
```


Parameters to add:


### Vireo4 Hosted URL ###

```
	--params.baseurl=https://test-etd.tdl.org
		#set the base url of the vireo4 service
		#default: http://127.0.0.1:9000
```

### Sign In ###
```
	--params.signin=account
		#this will trigger a search for a file called *account.json* in the current directory
		this file should have an email and pwd attributes, for example;
	{
		"email":"[your_email_address]",
		"pwd":"[your_vireo4_password_for_that_account]"
	}
```

```
	--params.signin=shib
		#uses the test shibboleth account - this is the default
```


### Actions to perform ###

```
	--params.perform=settings
		#settings: sign in, open vireo for submissions, create a randomly named institution, then sign out
		#default: create a submission

	--params.perform=submission
		#settings: sign in, open vireo for submissions, create a randomly named institution, then sign out
		#default: create a submission
```



## Examples ##

The operation below assumes you are testing a vireo4 instance at the default url of http://127.0.0.1:9000.

If the vireo4 instance you are testing is freshly installed and not open for submissions you will first need to invoke;

> protractor conf.js --params.perform=settings


After that, to create a new submission or resume one in progress, invoke without any perform settings;

> protractor conf.js --params.perform=submission

This will create a new submission or resume one in progress.  Currently all actions needed for completing a submission
are performed except degreee selection and file upload.

If the most recent submission is complete then the program will exit.

 











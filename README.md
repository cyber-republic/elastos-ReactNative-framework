# Elastos-ReactNative-Framework
Parallel to the Trinity Browser, this is the Elastos DApp framework implementation on React Native.

## How to Set Up Environment
```shell
$ npm i
$ react-native link
```

## How to Run Local Docker Instance
```shell
$ npm run dep:start
```

## How to Build DApp Files
There are 2 demo DApp files in `/dapp` folder.
* `$ npm run build:dapp -- --name test` to build test dapp.
* Move all of `/build/ios` files to `/remote` folder.

## How to Run iOS App
* Go to `/ios` folder.
* Run `$ pod install`.
* Open `/ios/ELASTOS_RN_FRAMEWORK.xcworkspace` with XCode.
* Check your local IP address with `$ ifconfig`.
* Change `DAPP_SERVER_URL` under `/src/config/index.js` to your local IP address. Default port is 3000 by docker instance setting.

## How to start contributing to the project
* [Read process workflow](doc/process_workflow.md)
* Create a new github issue for every code change that is required - bug, feature, enhancement, etc. Also use appropriate label and attach the milestone to go along with it
* Create a new branch to work on the above github issue
* Make your change and push to your branch and then submit a PR to be merged into master if everything looks right
* Make a note of this commit on the github issue 
* Close the github issue
* Repeat this process for every single code change you decide to do. This is to ensure maximum transparency and also to make it easier to keep track of what everyone is working on. This way, two people are not working on the same thing. We also need github issues that will be used in conjunction with the amount of contribution you make along with the time spent in order to pay out your ELA rewards every 2 weeks

## Useful Links
* [Code structure](./doc/structure.md)
* [Requirements](./doc/requirements.md)
* [TODO list](./doc/todo.md)




## Getting Started with Mac OS X

Elastos React Native Framework requires certain package to be installed and configured to operate. If you're starting out for the first time, please follow these steps to help you get started.

* Required: XCode 9.4 or newer, Command Line Tools, CocoPods, Homebrew, Docker, Node, Watchman, React Native Client.

1. Download and install XCode from the Apple App Store.

2. Install Command Line Tools. Open Terminal, type (copy and paste) the following and press enter:
```shell
xcode-select --install
```

3. Install CocoPods. In Terminal, type (copy and paste) the following and press enter:
```shell
sudo gem install cocoapods
```      

4. Install Homebrew. In Terminal, type (copy and paste) the following and press enter:
```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

5a. Install Docker. Open your web browser and go to the URL:
```shell
https://store.docker.com/editions/community/docker-ce-desktop-mac
```

5b. Create an account on to login to the website, download and follow the installation instructions on the download website. Once you have completed installation, login and run it.

6. Install Node. In Terminal, type (copy and paste) the following and press enter:
```shell
brew install node
```

7. Install Watchman, a tool by Facebook for watching changes in the filesystem. In Terminal, type (copy and paste) the following and press enter:
```shell
brew install watchman
```

8. Install React Native Client. In Terminal, type (copy and paste) the following and press enter:
```shell
npm install -g react-native-cli
```

9. On the XCode menu, click on Source Control and select Clone.. from the dropdown menu.

10a. Enter the repository URL:
```shell
https://github.com/cyber-republic/elastos-ReactNative-framework.git
```

10b. Click the Clone button and select the destination you want to clone the Elastos React Native Framework to and click the Clone button.

11. In Terminal, change your working directory to the location you cloned the Elastos React Native Framework.

12a. Setup the environment with NativeBase by typing (copy and paste) the following into Terminal and pressing enter:
```shell
npm i
```

12b. If you need, follow the instructions by typing (copy and paste), npm audit fix, into Terminal to fix any issues.

13. Lets link this to React Native by typing (copy and paste) the following into Terminal and press enter:
```shell
react-native link
```

14. We need to locate your systems IP address so in Terminal type (copy and paste) the following and press enter to locate it:
```shell
ifconfig
```
15a. Open the /elastos-ReactNative-framework/src/config/src/config/index.js file in Finder by right clicking and selecting open with TextEdit.

15b. Change the DAPP_SERVER_URL to your local IP address, save and close the file.

16. Run the local docker instance. In Terminal, type (copy and paste) the following and press enter:
```shell
npm run dep:start
```

17. Install CocoPods. In Terminal, change your working directory to /elastos-ReactNative-framework/ios. Type (copy and paste) the following and press enter:
```shell
pod install
```

18. Open /elastos-ReactNative-framework/ios/ELASTOS_RN_FRAMEWORK.xcworkspace with XCode. Build and Run.

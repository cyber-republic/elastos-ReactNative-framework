# Section 1: Project Overview

## High Level Goal:
Build a customized React Native framework that supports the following  Elastos services: Elastos Carrier and Elastos Wallet Core services.

## Project Description:
Elastos already provides support for building decentralized applications using Javascript Ionic framework and these apps run inside Trinity(a fork of chromium with a lot of customization) browser. 

In contrast, Elastos would like to support building of decentralized applications using Javascript React Native framework which in turn run natively on android and ios devices. As such, the React Native framework needs to be customized so that it disables applications from directly accessing the internet. The http/https need to be disabled in the framework layer and all communications need to be done using elastos carrier instead. 

There is also a need to support various other elastos services such as features for interacting with the elastos wallet core services such as payment functions, DID(Decentralized ID) services, token sidechain services, etc and as such, appropriate javascript <-> C++ bridges need to be built to support React Native applications access to those services.

## Skills Required(one or more of the following):
- Java
- Objective C/Swift
- C++
- Writing Javascript <-> C++ bridge for React Native
- Developing React Native native modules
- Familiar with the underlying React Native Framework and architecture
- Developing React Native applications 

## Goals of the Project(Alpha):
- Create a react native npm package for Elastos Carrier(Core Services + Session Services)
- Create a react native npm package for Elastos Wallet Core Services(includes Elastos DID services)
- Create one sample DApp utilizing react-native-elastos-carrier
- Create one sample DApp utilizing react-native-elastos-wallet-core 
- Write tests for different Elastos APIs for Elastos Carrier and Elastos Wallet Core Services
- Proper documentation for the project, how to interact with different elastos services, how to run sample DApps on both android and ios, API references, etc 

## Goals of the Project(Beta):
- Disable http/https from the framework layer so apps built using this framework have no direct access to the internet and have to rely on elastos carrier for any and all communication
- Allow developers to build Elastos decentralized apps directly utilizing the framework repository instead of individual npm packages for each services. This can be used to run certain tests such as validating apps do have http/https disabled, etc 
- Automate the creation of development framework environment, build process, unit and integration tests, continuous integration, etc

# Section 2: Project Analysis

## Why the need for this project when we already have Trinity browser?
The core team is currently working on building the Trinity browser and will continue to do so. Trinity browser is a fork of chromium with elastos runtime features built in for process isolation, network isolation and digital assets rights, protection and management. 

In other words, Trinity is a browser like google chrome and developers are able to build their applications using Javascript Ionic framework that can run inside Trinity browser. This means that regular Ionic applications cannot run inside Trinity browser and instead, developers will have to use Trinity framework provided by the core team to build an Ionic app with .epk extension(short for elastos package) that can then be imported into trinity browser. This ensures that the applications targetted for Trinity have http/https disabled and are only allowed access to limited set of APIs which in turn helps in protecting and isolating applications when they’re run.

Because Trinity is a browser that can be installed on numerous devices such as android, ios, mac, windows and the applications built for it use WebView, the apps targeted for Trinity are true cross platform apps and can run on top of anything however, they’re also slow because they are not native apps. All the applications are run inside a webview which means they don’t have the native feel that the regular android or ios apps have to them. 

With that in mind, the React Native project was started. React Native framework allows developers to build applications using javascript but instead, they’re targeted for native devices such as android and ios so they’re more performant. These apps are not run inside a browser and instead run directly on the device and hence, they can interact with native UIs more directly, thereby leading to a more optimized user experience.

There is a need for the react native project because this means developers are not confined to using Ionic framework or Trinity browser to run their applications. Instead, this opens yet another door that developers can utilize by building a react native application interacting with different elastos services. This leads to more diversity in the number of frameworks where Elastos services are supported.

## Disable http/https from the framework layer
Similar to Trinity browser, the goal of this project is to also disable http/https from the framework layer so applications built using react native framework have no direct access to the internet. This is to ensure complete sandbox isolation for each application to protect both the application and the users who use the application. Because http/https cannot be called from any applications built using React Native framework, they’ll need to utilize elastos carrier for any and all communication to the outside world.

# Section 3: Alpha Release

## Trinity project v React Native project(alpha)

## Purpose of Alpha Release
The goal of the alpha release is to show an MVP(Minimum Viable Product) that showcases being able to interacting with various elastos services from within react native application. 

The Alpha release will not have http/https disabled at the framework layer and instead is left for beta release. The alpha release will let developers to build hybrid elastos apps utilizing two packages - one for elastos carrier and one for elastos wallet features.

## NPM package for Elastos Carrier
A package called “react-native-elastos-carrier” will be released to the public that lets developers download it onto their developer environment. Using this package, developers gain access to various features offered by elastos carrier such as utilizing the carrier network for direct peer to peer communication between any two devices or users in the network. This is a standalone npm package and thus acts as a React Native SDK for Elastos Carrier that can be used to build hybrid elastos applications. In these applications, developers are still able to interact with http/https freely while also being able to interact with carrier APIs for the peer to peer communication.

## NPM package for Elastos Wallet Core Services
A package called “react-native-elastos-wallet-core” will be released to the public that lets developers download it onto their developer environment. 

Using this package, developers gain access to various features offered by elastos wallet functionality such as connecting to the elastos blockchain for payment functions, or interacting with DID(Decentralized ID) sidechain service, etc. 

This is a standalone npm package and thus acts as a React Native SDK for Elastos Wallet that can be used to build hybrid elastos applications. In these applications, developers are still able to interact with http/https freely while also being able to interact with APIs for communication with the elastos blockchain(main chain + sidechains).

We will be focusing on SPV wallets as we're dealing with react native and our apps will only run on android and ios. As such, we gotta use spv.cpp library instead of c library.

## Sample Decentralized Chat Application using Elastos Carrier
As part of the Alpha release, a sample decentralized chat application shall be built that uses “react-native-elastos-carrier” to interact with other users by chatting, adding new friends and sending files.

## Sample Elastos Wallet Application using Elastos Wallet Core Services
As part of the Alpha release, a sample wallet application shall be built that uses “react-native-elastos-wallet-core” to interact with the elastos blockchain to set up a basic wallet, payment features and also being able to get unique DIDs by interacting with the elastos DID sidechain service.

## Documentation for developers working on the framework project(Setting up the environment, building the bridges, API references, etc)
Full documentation shall be provided for developers who want to contribute to the React Native project. Some of the documentation that will be included are the following:
- Setting up an environment for each github repo “elastos-carrier” and “elastos-wallet-core”
- How to build a bridge to access different Elastos services such as carrier and wallet. Separate documentation for android carrier, ios carrier, android wallet and ios wallet
- API references on what functionalities and features are available for both carrier and wallet

## Documentation for DApp developers utilizing the built packages
Full documentation shall be provided for DApp developers who want to start building applications utilizing “react-native-elastos-carrier” or “react-native-elastos-wallet-core” npm packages. Some of the documentation that will be included are the following:
- A “hello world” example using one of the APIs of elastos carrier and elastos wallet and then running it on both android and ios
- A real demo application showcasing various functionalities for both elastos carrier and elastos wallet and then running it on both android ios

# Section 4: Beta Release

## Trinity Browser v React Native Browser(Beta)

		Fig: Trinity Browser and how Elastos DApp runs inside
    Fig: React Native Browser and how Elastos DApp runs inside 

## DApp Structure in Trinity v React Native

	Fig: How DApps work in Trinity browser
	Fig: How DApps work in React Native Browser

## Purpose of Beta release
The goal of Beta release is to combine everything that was worked on during alpha release and then improve upon it in order to build a customized react native application.

Http/https will be disabled so apps are restricted from connecting to the internet directly while also providing developers a build environment where they can build different components that act as a standalone sub-app that runs in its own process.Similar to how websites within chrome browser or apps within trinity browser run in their own process to achieve process isolation, network isolation and digital assets protection. 

## Customized React Native framework to build DApps on with http/https disabled
The react native framework shall be modified to disable http/https and developers will be provided a framework similar to trinity framework with easy to use build tools to develop their own “mini app” that can be imported into the main react native browser app. 

Mini applications running inside this react native browser app will need to use elastos carrier to communicate to the outside world or use the provided set of APIs to connect to the blockchain network for numerous wallet interfaces, etc.

Using framework to build apps instead of using individual npm packages
Individual npm packages can be used to build a hybrid elastos application that still has access to http/https layer. 

However, as part of the beta release for this project, a complete build environment shall be provided where developers can develop and build “mini app” that produce an “.repk”(short for react native elastos package file). Each of these “.repk” can be imported onto the main react native browser app whereby the app checks the signature of the app along with its DID and the user’s DID against the blockchain to make sure the user does indeed own the application to begin with. 

A complete customized react native framework environment shall be provided in the form of a github repository(github.com/cyber-republic/elastos-ReactNative-framework) that will provide relevant documentation and developer tools to automatically start building “mini apps”.

## Set up a development environment with everything preconfigured
The developer environment shall be created with the help of some famous tools such as docker and pre-configured binaries and/or configurations to ease the onboarding of new developers who want to build “mini apps” for React Native Elastos Browser. As such, we will need the help of a seasoned devops engineer who is well versed in setting up entire build environments along with being able to provide developers a “one-button” way to set up a complete developer environment.

## Set up an automated build process with unit and integration tests along with continuous integration tools
The Elastos React Native framework github repository will need to have lots of continuous integration tools integrated into it such as TravisCI and other build tools along with running and validating appropriate unit and integration tests.

Any time a developer pushes a PR(Pull Request) to the master branch, it should trigger an automated build process that sets up a docker environment, runs unit tests, integration tests, sanity tests and then helps in building a complete new release for the framework layer. Additional checks and tools should also be provided so any time a dapp developer wants to create a “mini app”, there should be appropriate tools to validate the app and then store the DID of the application to the testnet of the blockchain along with the number of tokens issued for each application. This helps in creating scarcity for each “mini app” that gets deployed to Elastos React Native browser app. 

The project owner shall work with third parties such as testbeds in universities to do stress testing along with testing all the vulnerabilities of the framework and also to make sure the application does act as a complete sandbox environment that it claims to be.

## How will the Beta Release look like?

## Documentation
Full documentation shall be provided for developers who want to contribute to the React Native framework project along with full documentation for DApp developers who want to build “mini apps” for the React Native Browser app. Some of the documentation that will be included are the following:
- Setting up a complete developer environment for developers who want to contribute to the main Elastos React Native Browser application
- Setting up a complete developer environment for DApp developers who want to build “mini apps” for the Elastos React Native Browser application
- How to build a bridge to access different Elastos services such as carrier and wallet. Separate documentation for android carrier, ios carrier, android wallet and ios wallet
- API references on what functionalities and features are available for all the services that are offered by the framework such as carrier, wallet, DID, token, Hive, etc
- A “hello world” example showcasing a basic use case scenario of how a DApp developer can build a “.repk” file from scratch all the way to production and deployment

## Sample DApps utilizing the framework
Some of the basic applications can be built to showcase some use cases of using the framework to build mini apps such as:
- A simple wallet app that integrates main chain token(ELA), DID sidechain token, support for generating tokens utilizing token sidechain, and also support for some third party sidechain tokens if necessary
- A decentralized telegram built on elastos carrier that uses DID for logins and that also acts a blog app where people can share news on their personal space similar to facebook or wechat
- Combine DID and ETH smart contracts to enable a simple voting application that automatically rewards the voters based on certain conditions and criteria

## Prototype of how React Native application works

- User clicks on main RN Browser app from the home screen on android/iOS
- User logs in using their DID or signs up for a new DID
- User is taken to their main browser screen that contains icons of different mini apps that come pre-built with the browser app
- User proceeds to open up any mini app from within the browser


- User is on the home page of RN Browser app- 
- User clicks on “Import a mini app” button
- User can either search for a mini app using the app’s DID or can also directly import it from their local device
- The new mini app is installed on the home page of RN Browser app

## Complete Workflow of How React Native Browser App works
- User downloads the app called “RN Browser App” from app store on android or iOS and installs it
- User opens “RN Browser App” from their home screen and is taken to the home page of the app
- On the home page, the user needs to first sign in to the app using their DID credentials. If it’s the first time, user needs to create a new DID. This is akin to creating your account on other apps and platforms online and signing in to the app
- Once the user logs in, if it’s the first time, the user needs to go through the process of creating their wallet. This is a requirement because the funds from the wallet will be automatically deducted whenever a user performs some action that is of monetary value
- On the home page, the user can see the wallet mini app. There is also a button called “Import a new mini app” that user can click to start downloading other mini apps that are stored on a distributed storage system like IPFS or maybe on the local device
- Each mini app should run in its own separate process and should be completely isolated from different mini applications. This can likely be achieved via the use of external libraries such as https://github.com/joltup/react-native-threads 
- This is a React Native application which means this will run differently compared to Trinity application that is a full on browser application such as chrome that automatically comes pre-packaged with process isolation between different apps. As such, relevant steps need to be determined to make this happen from within a react native application as well
- Each mini app runs in its own process. The main React Native Browser Application also needs to constantly monitor mini apps that are running inside the app to make sure they’re not doing anything malicious. The browser itself needs to perform all the checks such as making sure to disable http/https, checking the ownership of the mini app from the blockchain and making sure to manage different mini apps efficiently

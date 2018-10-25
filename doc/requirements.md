## Requirements

### High-Level Requirements
- Since we have a C++ SDK to work with, we can write plugins for wallet, carrier and DID in react native and flutter frameworks 
- Can force react native app without http. This needs to be improved still however
- The same thing applies for any kind of framework we decide to use in the future
- React Native plugin development: https://facebook.github.io/react-native/docs/native-modules-ios 

### Alpha Version Deliverables(End of November)
- High Priority: Write a plugin for react native(for ios) for interacting with elastos carrier
- High Priority: Write a plugin for react native(for android) for interacting with wallet SDK
- High Priority: Write a plugin for react native(for android) for interacting with DID sidechain
- Create sample DApps based on the above 3 plugins to showcase them in action
- Write tests for every new feature or functionality added
- Write the documentation along with the APIs available
- Write a plugin for react native(for android) for interacting with elastos carrier
- Write a plugin for react native(for ios) for interacting with wallet SDK
- Write a plugin for react native(for ios) for interacting with DID sidechain

### Beta Version Ideas/Deliverables
- Medium Priority: RN framework needs to disable http/https and only allow traffic via elastos carrier. At first, we may allow http/https but the final version should have it completely disabled same as trinity browser 
- Low Priority: End user should be able to install a React Native app from the internet. When user clicks this app, the react native framework then is used to load the dapp automatically
- Low Priority: In order to check the rights and authorization of a DApp, RN framework can check the hash of the DApp. The framework can reject the loading of the DApp if the hash does not match the original hash that's recorded in the blockchain
- Create a separate app same as Trinity browser but for React Native app browser that can be downloaded from app store
- Once inside this app, users can import react native apps from their local device or from their cloud drive
- Each app should have process isolation, network isolation and run in their own runtime environment
- The react native browser cannot load apps if the hash of these apps do not match the hash on the blockchain
- There are only a limited number of API calls available from this react native framework. This will create a virtual machine of sorts same as how Trinity browser works
- When a DApp is imported, the DApp should also check and validate React Native framework and make sure it hasn't been tinkered with. And in turn, React Native framework checks the DApp to make sure its hash matches that on the blockchain
- DApp can call RT's CAR components features
- Put in continuous integration and automated builds
- Create npm package that developers can download to easily integrate elastos services(carrier, wallet and DID) onto their React Native app development

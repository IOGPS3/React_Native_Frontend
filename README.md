# React_Native_Frontend

## Prerequisites
Before you begin, ensure you have the following software installed on your machine:

- Node.js (v18.x.x or higher) [node -v]
- npm (v9.x.x or higher) [npm -v]
- React (v18.2.0 or higher)
- React Native (v0.71.3 or higher)
- Android Studio, Xcode or Expo go [IOS, Android] (for running the application on a simulator or a device)

## Installation

1. Clone the repository:
``` bash
git clone https://github.com/IOGPS3/React_Native_Frontend.git
```

2. Navigate to the project folder:
```bash
cd React_Native_Frontend
```

3. Install the project dependencies:
```
npm install
```



4. Run the application on simulator or device

Install the [Expo Go](https://expo.dev/client) app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo Go app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the default iOS Camera app.

- For IOS 
```bash
npm run ios
```

- For Android(currently not working)
```bash
npm run android
```

- For all
```bash
npm start
```


## Troubleshooting
If you run into tmpl errors do the following
```
npm install tmpl
```

## Coworker search feature
### Using the Coworker Search Feature
This application includes a search feature to easily find and locate specific coworkers. 
Here are the steps to use this feature:

1. From the home screen, tap on the hamburger menu icon.
2. Select the 'Search Coworker' option.
3. In the search field, enter the full name or any part of the name of the coworker you are searching for.
4. The application will display a list of coworkers whose names match your search criteria. You can scroll through this list to find the coworker you are looking for.
5. Tap on a coworker's name to view more detailed information about them, such as their meeting status and location.

### How it works
The 'Search Coworker' feature is implemented in a dedicated component located at components/SearchCoworker/SearchCoworker.js.

This component is integrated into the main application through App.js. 
The SearchCoworker.js file uses the @react-navigation/stack to manage the coworker list and the details view.

When the list of coworkers is displayed, a user can select an individual coworker. 
This triggers the EmployeeDetails.js screen to be loaded on top of the list, displaying detailed information about the selected coworker.
# FitLog – Workout Menu App

Welcome to **FitLog**, your lifestyle-focused workout logging app!  
This project helps you record and manage your daily training routines with a clean and motivating UI.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## 📎 Additional Resources

> 📌 The following design documents are written in Japanese. 
- [Japanese README](README.ja.md) 
- [External Design (Japanese)](docs/WorkoutMenuApp_外部設計.md)
- [Internal Design (Japanese)](docs/WorkoutMenuApp_内部設計.md)
> English summaries will be added in future updates.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## 🔒 npm audit report (2025/08/24)

### Summary
- 9 vulnerabilities detected (6 high, 3 moderate)
- Most issues are related to development-only packages (e.g. `react-scripts`, `webpack-dev-server`)
- Fixing all issues requires `npm audit fix --force`, which installs `react-scripts@0.0.0` — a breaking change

### Decision
We decided **not to apply `--force` fixes** at this stage to avoid breaking the development environment.  
Instead, we will continue development and consider migrating to Vite or another modern build tool in the future.

### References
- [GHSA-rp65-9cf3-c2jxr](https://github.com/advisories/GHSA-rp65-9cf3-c2jxr) — nth-check vulnerability
- [GHSA-7fh5-64p2-3v2j](https://github.com/advisories/GHSA-7fh5-64p2-3v2j) — PostCSS parsing error


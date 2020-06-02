## Covid19Monitor-India

[![Powered by Vercel](./powered-by-vercel.svg)](https://vercel.com?utm_source=pulakchakraborty)

![homepage](https://github.com/pulakchakraborty/c19-india-map/blob/master/public/homepage.png)

Covid19Monitor is a map-based responsive web-application built using React to monitor and visualize the spread of the novel Covid19 virus in India and across the world. The application has an interactive dashboard which provides a latest and historical summary of the confirmed, recovered and deceased cases in India on a state-level and also across the world. The dashboard also includes area, line and bar charts to visualize the historical data on cumulative and daily basis. An interactive map shows the impact of Coronavirus on a grographical level.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Inspiration

This project was inspired by [this article](https://dev.to/alemesa/how-to-create-a-covid-19-map-with-mapbox-and-react-3jgf) on [DEV](https://dev.to).

## Prerequisites

The set-up of this project is fairly simple and consists the following steps.

### Locally

1. Clone this repository to your local machine.
2. Set-up a [Mapbox account](https://www.mapbox.com/?utm_source=pchakraborty) and get your access token from the account dashboard.
3. Create a `.env` file in your project root directory and paste the following line.
```bash
REACT_APP_MAPBOXGL_ACCESS_TOKEN=your_access_token_from_mapbox_dashboard
```
4. Run `yarn && yarn start`.
5. Push your code to Github.
6. Import your project to [vercel](https://vercel.com?utm_source=pulakchakraborty) and add `REACT_APP_MAPBOXGL_ACCESS_TOKEN` as your environment variable and paste the access token you received from Mapbox.

With every push to the master branch of your Github repository, the codebase would be deployed to Vercel.

## Built With

### Tools and Services

- [Create React App](https://github.com/facebook/create-react-app)
- [Mapbox](https://www.mapbox.com/?utm_source=pchakraborty)
- [Axios](https://github.com/axios/axios)
- [Recharts](https://github.com/recharts/recharts)
- [React Table](https://github.com/tannerlinsley/react-table)
- [Styled Components](https://styled-components.com)
- [Vercel](https://vercel.com?utm_source=pulakchakraborty)

### APIs

- [Covid19 REST API for India data](https://github.com/amodm/api-covid19-in)
- [Covid19 REST API for Global data](https://docs.corona.lmao-xd.wtf/version-2)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

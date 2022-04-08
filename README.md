# hello-weather

## Introduction
The app was created using [OpenWeather Api](https://openweathermap.org/api). Here you can look for und find weather for one day or fo the whole week in city you wish.

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Difficulties 
For calling forecast we need city name as a parameter. [Current weather data](https://openweathermap.org/current) accept it as and there is no problems with calling that. But [Daily Forecast 16 Days](https://openweathermap.org/forecast16) that we use for calling week forecast accept only latitude and longitude parametres. Obviously users don't know these parametres, so for showing week forcast we needed at first to make reques for current forecast, save latitude and longitude in store and only then make reques for calling our week forecast.

It's not a good practice for capacity to make two requests (daily and weekly forecasts) always, so we added a condition ``` isCurrent``` that is true be default. If user has only tab with daily forecast open, there will be made only one request. If he open tab with weekly forecast, only then the both requests will be made.






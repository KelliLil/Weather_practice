# Weather Data

Whenever you encounter a `---`, it's a good time to do a **commit**. You can do this by running `git add .` and `git commit -m "your message"`. Feel free to commit even more often than that.

`touch db.json`. This is the file that will hold our data.

```json
{
  "weather": [
    {
      "dateTime": "2020-10-19T20:39:00+00:00",
      "phrase": "Cloudy",
      "iconCode": 7,
      "hasPrecipitation": false,
      "isDayTime": true,
      "temperature": {
        "value": 12.4,
        "unit": "C",
        "unitType": 17
      },
      "realFeelTemperature": {
        "value": 13.7,
        "unit": "C",
        "unitType": 17
      },
      "realFeelTemperatureShade": {
        "value": 13.7,
        "unit": "C",
        "unitType": 17
      },
      "relativeHumidity": 87,
      "dewPoint": {
        "value": 10.3,
        "unit": "C",
        "unitType": 17
      },
      "wind": {
        "direction": {
          "degrees": 23.0,
          "localizedDescription": "NNE"
        },
        "speed": {
          "value": 4.5,
          "unit": "km/h",
          "unitType": 7
        }
      },
      "windGust": {
        "speed": {
          "value": 9.0,
          "unit": "km/h",
          "unitType": 7
        }
      },
      "uvIndex": 1,
      "uvIndexPhrase": "Low",
      "visibility": {
        "value": 9.7,
        "unit": "km",
        "unitType": 6
      },
      "obstructionsToVisibility": "",
      "cloudCover": 100,
      "ceiling": {
        "value": 1494.0,
        "unit": "m",
        "unitType": 5
      },
      "pressure": {
        "value": 1021.2,
        "unit": "mb",
        "unitType": 14
      },
      "pressureTendency": {
        "localizedDescription": "Steady",
        "code": "S"
      },
      "past24HourTemperatureDeparture": {
        "value": -2.1,
        "unit": "C",
        "unitType": 17
      },
      "apparentTemperature": {
        "value": 15.0,
        "unit": "C",
        "unitType": 17
      },
      "windChillTemperature": {
        "value": 12.2,
        "unit": "C",
        "unitType": 17
      },
      "wetBulbTemperature": {
        "value": 11.3,
        "unit": "C",
        "unitType": 17
      },
      "precipitationSummary": {
        "pastHour": {
          "value": 0.0,
          "unit": "mm",
          "unitType": 3
        },
        "past3Hours": {
          "value": 0.0,
          "unit": "mm",
          "unitType": 3
        },
        "past6Hours": {
          "value": 0.0,
          "unit": "mm",
          "unitType": 3
        },
        "past9Hours": {
          "value": 0.0,
          "unit": "mm",
          "unitType": 3
        },
        "past12Hours": {
          "value": 0.0,
          "unit": "mm",
          "unitType": 3
        },
        "past18Hours": {
          "value": 0.0,
          "unit": "mm",
          "unitType": 3
        },
        "past24Hours": {
          "value": 0.4,
          "unit": "mm",
          "unitType": 3
        }
      },
      "temperatureSummary": {
        "past6Hours": {
          "minimum": {
            "value": 12.2,
            "unit": "C",
            "unitType": 17
          },
          "maximum": {
            "value": 14.0,
            "unit": "C",
            "unitType": 17
          }
        },
        "past12Hours": {
          "minimum": {
            "value": 12.2,
            "unit": "C",
            "unitType": 17
          },
          "maximum": {
            "value": 14.0,
            "unit": "C",
            "unitType": 17
          }
        },
        "past24Hours": {
          "minimum": {
            "value": 12.2,
            "unit": "C",
            "unitType": 17
          },
          "maximum": {
            "value": 15.6,
            "unit": "C",
            "unitType": 17
          }
        }
      }
    }
  ]
}
```

Install [`json-server`](https://www.npmjs.com/package/json-server) by doing `npm i json-server` from the terminal.
Add a script to `package.json`: `"db": "json-server --watch db.json"`. This will enable a script to run the server, which you can run from the terminal: `npm run db`.

Note that `db.json` is intentionally ignored by git via `.gitignore`.

---

`npm install dayjs`. This is a library that will help us with dates.

---

Set up an `api.service.js` in the `app`. This module's job will be to `getWeatherData`. Export out a default object with a `getWeatherData` method.

This time, instead of using Node's `fetch`, we will use `got`. `got` is a wrapper around `fetch` that makes it easier to use. Install it with `npm i got`.

Now, you can use just 1️⃣ line of code in that `getWeatherData` method. It will be: `return got(BASE_URL).json()`. This will return a promise that resolves to the data. Note that `BASE_URL` will refer to a global variable in that module: `const BASE_URL = 'http://localhost:3000/weather'`.

The main difference here is that with `got` we don't have the 2-step process to first get the response and then get the data from the response. We can just get the data directly. 🤓 And, you don't need to mark the method with `async` because `got` returns a promise and we don't need to explicitly `await` it. Instead the consumer of this api (in `app/index.js`) will `await` it. And, provided your Node is up to date, you can use a **top-level `await`**.

Before moving forward, you should consult the docs on each of these:

1. [`got`](https://github.com/sindresorhus/got/blob/main/documentation/quick-start.md)
1. [Top-level `await`](https://v8.dev/features/top-level-await)

---

Create: `components/WeatherCard.js`. This is of course going to be a **function component** (not React/JSX, just JS here). It will receive `weatherData` as a parameter/prop. It will return a `<time>` with a readable date. For this, it's time to use `dayjs` that you installed earlier. Be sure to import it at the top of the file. See [this page from the docs](https://day.js.org/docs/en/display/format) for more clues 🧩 on how to use it.

---

Create a `utils.js` file in `app`.

We'll need a function: `convertC2F`. It will take a `celsius` parameter and return the equivalent in Fahrenheit. It will be a simple calculation: `return celsius * 1.8 + 32`.

---

Create another function: `convertKMPerHourToMPH`. It will take a `kmPerHour` parameter and return the equivalent in miles per hour. It will be a simple calculation: `return kmPerHour * 0.621371`.

---

Create another function: `convertMMToInches`. It will take a `mm` parameter and return the equivalent in inches. It will be a simple calculation: `return mm * 0.0393701`.

---

Now, flush out your `WeatherCard` component. Import the functions from your `utils`. Use them to build out the card with some of the data. For one thing, you can wrap this in a `section`, and then use a `ul` with some `li`s. You can use the `dayjs` library to get the date and time. You can use the `convertC2F` function to convert the temperature to Fahrenheit. You can use the `convertKMPerHourToMPH` function to convert the wind speed to miles per hour. You can use the `convertMMToInches` function to convert the precipitation to inches.

From `app/index.js`, import and use the `WeatherCard` by sending in the data from the `api.service.js`. Then, `log` the output. It should be some readable HTML.

---

Copy/paste that HTML from the terminal and paste it into the [Tailwind playground](https://play.tailwindcss.com/). Add some Tailwind classes to make it look nice. You can use the [Tailwind docs](https://tailwindcss.com/docs) to help you.

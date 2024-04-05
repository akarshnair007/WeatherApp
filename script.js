const apiKey = "38f0e35d5a02dc6afdbdd8f26622a723";
const accessKey = "DtzxPRZlE3T6AqPIz1qmDNSvSqpaqyqnD2tWhEhH-qs";

const freepikApiKey =
  "I11jVco4JzBXw0b8ov57APNpRcUBwTHm3Ug14iszRXmVxCbZTxIm8Gkn";

const cities = ["delhi", "kolkata", "bengaluru", "mumbai"];

const fetchTemperatureForCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  const data = await response.json();
  return {
    city: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
  };
};

const fetchTemperatureForCities = async () => {
  const temperatureData = [];
  for (const city of cities) {
    const tempData = await fetchTemperatureForCity(city);
    temperatureData.push(tempData);
    updateCityTemperatureUI(city, tempData); // Update UI for each city
  }
};

const updateCityTemperatureUI = (city, data) => {
  const tempElement = document.querySelector(`.${city}Temp`);
  const feelsElement = document.querySelector(`.${city}Feels`);
  const maxTempElement = document.querySelector(`.${city}Max`);
  const minTempElement = document.querySelector(`.${city}Min`);

  tempElement.textContent = `${data.temperature}°C`;
  feelsElement.textContent = `${data.feelsLike}°C`;
  maxTempElement.textContent = `${data.maxTemp}°C`;
  minTempElement.textContent = `${data.minTemp}°C`;
};

const defaultCity = "kochi"; // Default city for weather

let cityName = defaultCity; // Initialize cityName with default city

console.log("Default city:", defaultCity); // Log default city

let timeInterval; // Define time interval variable

window.onload = async () => {
  document.getElementById("city").value = defaultCity; // Set input field value to default city
  fetchTemperatureForCities();

  clickhandle(); // Call clickhandle function when the page loads
};

const clickhandle = async () => {
  cityName = city.value || defaultCity; // Use default city if user input is empty
  console.log("Selected city:", cityName); // Log selected city

  //for background
  const res1 = await fetch(
    `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${cityName}`
  );

  res1.json().then((data) => {
    // Randomly select an image from the array
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const selectedImage = data.results[randomIndex].urls.full;

    // Set the selected image as the background image of the main tag
    document.getElementById(
      "main"
    ).style.backgroundImage = `url('${selectedImage}')`;
  });

  const res2 = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
  );
  res2.json().then((data) => {
    console.log(data);
    let clouds = data.weather.forEach((item) => {
      cloud_name = item.main;
      weatherImg = item.icon;
      cloudId = item.id;
      var iconurl = "http://openweathermap.org/img/w/" + weatherImg + ".png";
      document.getElementById("weatherImg").src = iconurl;
    });
    console.log(cloudId);
    const existingVideo = document.getElementById("backgroundVideo");
    if (existingVideo) {
      existingVideo.remove();
    }

    // Determine which video to add based on weather conditions
    let videoSrc;
    if (cloudId >= 200 && cloudId <= 232) {
      videoSrc = "/videos/thunderstorm.mp4";
    } else if (cloudId >= 300 && cloudId <= 321) {
      videoSrc = "/videos/shower rain.mp4";
    } else if (cloudId >= 500 && cloudId <= 531) {
      videoSrc = "/videos/rain.mp4";
    } else if (cloudId >= 600 && cloudId <= 622) {
      videoSrc = "/videos/snow.mp4";
    } else if (cloudId >= 701 && cloudId <= 781) {
      videoSrc = "/videos/mist.mp4";
    } else if (cloudId == 800) {
      videoSrc = "/videos/clear_sky.mp4";
    } else {
      videoSrc = "/videos/broken clouds.mp4";
    }

    // Create a new video element with the selected video source
    const video = document.createElement("video");
    video.id = "backgroundVideo";
    video.src = videoSrc;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.borderRadius = "10px";
    video.style.opacity = "0.4";

    // Append the video element to the main container
    const midBottomContainer = document.querySelector("body");
    midBottomContainer.appendChild(video);
    // For sunrise
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunrisehours = sunrise.getHours();
    const sunriseMin = sunrise.getMinutes();
    const sunriseSec = sunrise.getSeconds();
    const sunriseAmPm = sunrisehours >= 12 ? "PM" : "AM";
    const sunriseformattedHours = sunrisehours % 12 || 12;

    // For sunset
    const sunset = new Date(data.sys.sunset * 1000);
    const sunsethours = sunset.getHours();
    const sunsetMin = sunset.getMinutes();
    const sunsetSec = sunset.getSeconds();
    const sunsetAmPm = sunsethours >= 12 ? "PM" : "AM";
    const sunsetformattedHours = sunsethours % 12 || 12;

    const lat = data.coord.lat;
    const lon = data.coord.lon;
    document.querySelector(".temp").innerHTML = data.main.temp;
    document.querySelector(".cityName").innerHTML = data.name;
    document.querySelector(".feels").innerHTML = data.main.feels_like;
    document.querySelector(".cloud").innerHTML = cloud_name;
    document.querySelector(".latitude").innerHTML = lat;
    document.querySelector(".longitude").innerHTML = lon;
    document.querySelector(".country").innerHTML = data.sys.country;
    document.querySelector(
      ".sunrise"
    ).innerHTML = `${sunriseformattedHours}:${sunriseMin}:${sunriseSec} ${sunriseAmPm}`;
    document.querySelector(
      ".sunset"
    ).innerHTML = `${sunsetformattedHours}:${sunsetMin}:${sunsetSec} ${sunsetAmPm}`;
  });
  gsap.from(".leftPart,.mid_bottom,.rightPart", {
    duration: 1.3,
    delay: 0.3,
    opacity: 0,
    stagger: 0.2,
    scale: 0.1,
  });
  gsap.from(".time,.coord,.lat,.lon,.cont,.rise,.set", {
    duration: 0.7,
    delay: 1.6,
    opacity: 0,
    stagger: 0.2,
    scale: 0.1,
  });

  const updateTime = async () => {
    // Fetch world time
    const resWorldTime = await fetch(
      `https://api.api-ninjas.com/v1/worldtime?city=${cityName}`,
      {
        headers: {
          "X-Api-Key": "gPkSXOC76R1NotejohR9FQ==fgebg80qpB7cBLw8",
          "Content-Type": "application/json",
        },
      }
    );
    const worldTimeData = await resWorldTime.json();
    const hours = worldTimeData.hour;
    const min = worldTimeData.minute;
    const sec = worldTimeData.second;
    const AmPm = hours >= 12 ? "PM" : "AM";

    document.querySelector(
      ".time"
    ).innerHTML = `${hours}:${min}:${sec} ${AmPm}`;
  };

  // Call updateTime immediately to initialize the time
  updateTime();

  // Set interval to update time every second

  setInterval(updateTime, 1000);

  //for 5 days
  const res3 = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
  );

  res3.json().then((data) => {
    // Filter the data to get only 5-day forecast
    const fiveDayForecast = data.list.filter((item, index) => index % 8 === 0);

    // Group forecast data by day of the week
    const forecastByDay = {};
    fiveDayForecast.forEach((item) => {
      const date = new Date(item.dt * 1000); // Convert timestamp to date object
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" }); // Get day of the week
      if (!forecastByDay[dayOfWeek]) {
        forecastByDay[dayOfWeek] = [];
      }
      forecastByDay[dayOfWeek].push(item);
    });

    // Select the container where you want to display the forecast data
    const forecastContainer = document.querySelector(".allWeeks");

    // Clear existing content
    forecastContainer.innerHTML = "";

    // Loop through each day of the week and create HTML elements to display the forecast
    Object.keys(forecastByDay).forEach((dayOfWeek, index) => {
      const dayForecast = forecastByDay[dayOfWeek][0]; // Assuming only one forecast per day

      // Create HTML elements
      const liElement = document.createElement("li");
      const weekNameElement = document.createElement("h3");
      const tempElement = document.createElement("h4");

      // Set content and attributes
      weekNameElement.textContent = `${dayOfWeek} :`;
      tempElement.textContent = `${dayForecast.main.temp}°C`; // Assuming temperature is available in the forecast

      // Append elements to the list item
      liElement.appendChild(weekNameElement);
      liElement.appendChild(tempElement);

      // Add classes
      liElement.classList.add("mt-2");
      liElement.classList.add("boundary");

      // Append list item to the forecast container
      forecastContainer.appendChild(liElement);
    });

    gsap.from(".boundary", {
      duration: 0.7,
      delay: 1.6,
      opacity: 0,
      stagger: 0.2,
      scale: 0.1,
    });
  });
};

import axios from "axios";

import { env }
from "../config/env";

export const getWeather =
async (
  destination: string
) => {

const response =
await axios.get(
"https://api.openweathermap.org/data/2.5/weather",
{
params:{
q: destination,
appid:
env.OPENWEATHER_API_KEY,
units:"metric"
}
}
);

return response.data;
};
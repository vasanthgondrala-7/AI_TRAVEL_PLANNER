import {
  getWeather
}
from "./weather.service";

export const generatePackingList =
async (
destination:string,
itinerary:any[]
) => {

const weather =
await getWeather(
destination
);

const packing:any[] = [

{
name:"Passport",
category:
"Crucial Travel Documents",
checked:false
},

{
name:
"Travel Insurance",
category:
"Crucial Travel Documents",
checked:false
}

];

const temp =
weather.main.temp;

const climate =
weather.weather[0]
.main
.toLowerCase();

if(temp > 30){

packing.push({
name:"Sunscreen",
category:
"Climate Wear",
checked:false
});

}

if(
climate.includes("rain")
){

packing.push({
name:"Umbrella",
category:
"Climate Wear",
checked:false
});

}

const text =
JSON.stringify(
itinerary
).toLowerCase();

if(
text.includes("hiking")
){

packing.push({
name:
"Hiking Boots",
category:
"Activity-Specific Equipment",
checked:false
});

}

if(
text.includes("beach")
){

packing.push({
name:
"Swimwear",
category:
"Activity-Specific Equipment",
checked:false
});

}

return packing;

};
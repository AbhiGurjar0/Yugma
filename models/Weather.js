import mongoose from "mongoose";
const weatherData = new mongoose.Schema({
    data: String,

});
let Weather = mongoose.model('Weather', weatherData);
export default Weather

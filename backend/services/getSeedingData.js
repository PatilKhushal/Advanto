const { default: axios } = require("axios");

require("dotenv").config();
const API_URL = process.env.API_URL;

const getSeedingData = async () => 
{
    const { data } = await axios.get(API_URL);
    return data;
}

module.exports = {
    getSeedingData
}
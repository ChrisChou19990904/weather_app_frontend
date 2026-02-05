// src/api/weatherApi.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Vite Proxy 會處理這個
});

export const weatherService = {
    getWeatherByCity(city) {
        // 這裡只需要 /weather/，合起來就是 /api/weather/Taipei
        return api.get(`/weather/${city}`);
    }
};
import axios from 'axios';

// 判斷目前是開發環境還是正式環境
// import.meta.env.PROD 會在 npm run build 時自動變為 true
const API_BASE_URL = import.meta.env.PROD
    ? 'https://weather-app-6uoo.onrender.com' // 🌟 貼上你在 Render 拿到的網址
    : ''; // 🏠 本地開發時維持空白，讓它走 Vite Proxy 的 /api

const api = axios.create({
    baseURL: API_BASE_URL + '/api', // 統一加上 /api 前綴
    timeout: 60000,
});

export const weatherService = {
    getWeatherByCity(city) {
        return api.get(`/weather/${city}`);
    },
    // 順便把獲取歷史紀錄的方法也封裝進來，方便 Store 呼叫
    getHistory() {
        return api.get('/history');
    }
};
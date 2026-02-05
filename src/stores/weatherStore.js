import axios from 'axios';
import { defineStore } from 'pinia';
import { weatherService } from '../api/weatherApi';

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        currentWeather: null,
        history: [],
        isLoading: false,
        error: null,
    }),
    actions: {
        async fetchWeather(city) {
            this.isLoading = true;
            this.error = null;
            try {
                // ✅ 正確：使用封裝好的 service
                const response = await weatherService.getWeatherByCity(city);
                this.currentWeather = response.data;
                await this.fetchHistory();
            } catch (err) {
                this.error = '無法取得氣象資料，請檢查後端是否啟動';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        async fetchHistory() {
            try {
                // ❌ 錯誤：axios.get('/api/history') 會連到 GitHub
                // ✅ 修正：使用 weatherService，它才會連到 Render
                const response = await weatherService.getHistory();

                console.log("這次拿到的陣列資料:", response.data);
                this.history = response.data;
            } catch (err) {
                console.error('抓取歷史失敗', err);
            }
        }
    }
});
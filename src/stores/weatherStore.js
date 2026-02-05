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
        // 1. 補回漏掉的搜尋邏輯
        async fetchWeather(city) {
            this.isLoading = true;
            this.error = null;
            try {
                // 這裡呼叫 api/weatherApi.js 封裝好的方法
                const response = await weatherService.getWeatherByCity(city);
                this.currentWeather = response.data;

                // 搜尋成功後，自動更新下方的歷史紀錄
                await this.fetchHistory();
            } catch (err) {
                this.error = '無法取得氣象資料，請檢查後端是否啟動';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        // 2. 獲取歷史紀錄
        async fetchHistory() {
            try {
                // 注意：這裡直接用 axios 呼叫，路徑對齊後端的 /api/history
                const response = await axios.get('/api/history');
                console.log("這次拿到的陣列資料:", response.data);
                this.history = response.data;
            } catch (err) {
                console.error('抓取歷史失敗', err);
            }
        }
    }
});
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
                const response = await weatherService.getHistory();
                const rawData = response.data;

                // 1. 利用 Map 進行去重：Key 是城市名稱，Value 是該筆資料物件
                // 先按 ID 升冪排，這樣後面的「新 ID」就會覆蓋掉前面的「舊 ID」
                const uniqueMap = new Map();
                rawData.sort((a, b) => a.id - b.id).forEach(item => {
                    uniqueMap.set(item.cityName, item);
                });

                // 2. 將 Map 轉回陣列，並按 ID 降冪排序（最新 ID 在前）
                this.history = Array.from(uniqueMap.values())
                    .sort((a, b) => b.id - a.id);

                console.log("去重並排序後的歷史紀錄:", this.history);
            } catch (err) {
                console.error('抓取歷史失敗', err);
            }
        }
    }
});
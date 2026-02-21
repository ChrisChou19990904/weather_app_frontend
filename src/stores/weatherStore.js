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
            try {
                // Step 1: 先獲取天氣資料 (這會觸發後端的 searchHistoryRepository.save)
                const response = await weatherService.getWeatherByCity(city);
                this.currentWeather = response.data;

                // Step 2: 這裡加上一個極短的延遲 (可選，確保資料庫已寫入完成)
                // await new Promise(resolve => setTimeout(resolve, 100));

                // Step 3: 確定搜尋成功後，才呼叫抓取歷史
                await this.fetchHistory();
            } catch (err) {
                console.error('搜尋失敗:', err);
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
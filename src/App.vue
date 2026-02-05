<template>
  <div class="weather-container">
    <h1>Vue3 x Spring Boot 天氣預報</h1>
    <!--<pre style="text-align: left; background: #000; color: #0f0; padding: 10px;">
  DEBUG - 歷史陣列長度: {{ weatherStore.history.length }}
  DEBUG - 原始資料內容: {{ JSON.stringify(weatherStore.history, null, 2) }}
</pre>-->
    <div class="search-box">
      <input
          v-model="cityInput"
          placeholder="輸入城市的'英文'名稱 (例如: London)"
          @keyup.enter="handleSearch"
      />
      <button @click="handleSearch" :disabled="weatherStore.isLoading">
        {{ weatherStore.isLoading ? '搜尋中...' : '搜尋' }}
      </button>
    </div>

    <div v-if="weatherStore.history.length > 0" class="history-list">
      <div class="history-header">
        <span>最近搜尋：</span>
        <small class="disclaimer">（紀錄僅供本次體驗，伺服器重啟後將自動清空）</small>
      </div>
      <button
          v-for="item in weatherStore.history"
          :key="item.id"
          @click="quickSearch(item.cityName)"
          class="history-tag"
      >
        {{ item.cityName }}
      </button>
    </div>

    <div v-if="weatherStore.currentWeather" class="weather-card">
      <div class="card-header">
        <h2>{{ weatherStore.currentWeather.cityName }}</h2>
        <span class="time">{{ weatherStore.currentWeather.observationTime }}</span>
      </div>

      <div class="card-body">
        <img :src="weatherStore.currentWeather.iconUrl" alt="weather-icon" />
        <div class="temp">{{ weatherStore.currentWeather.tempC }}°C</div>
        <div class="condition">{{ weatherStore.currentWeather.conditionText }}</div>
      </div>

      <div class="card-footer">
        <span>濕度: {{ weatherStore.currentWeather.humidity }}%</span>
      </div>
    </div>
    <div class="weather-container">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue'; // 確保路徑正確
import {onMounted, ref} from 'vue';
import { useWeatherStore } from './stores/weatherStore';

const weatherStore = useWeatherStore();
const cityInput = ref('');

const handleSearch = () => {
  if (cityInput.value.trim()) {
    weatherStore.fetchWeather(cityInput.value);
  }
};
const quickSearch = (city) => {
  cityInput.value = city; // 把點擊的城市填入輸入框
  weatherStore.fetchWeather(city).then(() => {
    weatherStore.fetchHistory(); // 搜尋完後更新歷史清單
  });
};

onMounted(() => {
  weatherStore.fetchHistory(); // 初始載入歷史紀錄
});
</script>

<style scoped>
/* 基礎容器 */
.weather-container {
  max-width: 450px;
  margin: 60px auto;
  padding: 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f4f8;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

/* 標題 */
h1 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
}

/* 搜尋框設計 */
.search-box {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.search-box input {
  width: 65%;
  padding: 12px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 8px 0 0 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-box input:focus {
  border-color: #42b883;
}

.search-box button {
  padding: 12px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.search-box button:hover {
  background-color: #33a06f;
}

/* 歷史紀錄標籤 (移除原本的紅黃測試色) */
.history-list {
  margin: 15px 0 25px 0;
  padding: 10px;
  text-align: left;
}

.history-list span {
  font-size: 0.85rem;
  color: #909399;
  display: block;
  margin-bottom: 8px;
}

.history-tag {
  display: inline-block;
  margin: 4px;
  padding: 6px 14px;
  background-color: #ffffff;
  color: #42b883;
  border: 1px solid #42b883;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.history-tag:hover {
  background-color: #42b883;
  color: white;
  transform: translateY(-1px);
}

/* 天氣卡片 */
.weather-card {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(79, 172, 254, 0.4);
}

.temp {
  font-size: 4rem;
  font-weight: 800;
  margin: 10px 0;
}

.condition {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.card-footer {
  margin-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.3);
  padding-top: 15px;
  font-size: 0.9rem;
}
.history-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.disclaimer {
  font-size: 0.75rem;
  color: #a8abb2;
  font-style: italic;
}
</style>

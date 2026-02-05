<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-profile">
        <img src="../assets/my-avatar.jpg" alt="Developer Avatar" class="avatar" />
        <div class="profile-info">
          <h3>開發者：周彥廷 (Chris Chou)</h3>
          <p>Full-Stack Developer | Spring Boot & Vue3 實戰</p>
        </div>
      </div>

      <div class="footer-links">
        <a href="https://foreign-languages-book.vercel.app" target="_blank" class="project-link">
          📚 查看我的另一個作品：外語學習書城
        </a>
      </div>

      <div class="footer-copyright">
        <p>&copy; {{ currentYear }} Chris Chou. All Rights Reserved.</p>
        <p>本專案採用 H2 In-Memory 資料庫，重啟後搜尋紀錄將自動重置</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.main-footer {
  /* 背景改為跟天氣 App 底部呼應的淡灰色或白色 */
  background-color: #ffffff;
  color: #2c3e50;
  padding: 40px 20px;
  margin-top: 60px;
  border-top: 1px solid #e2e8f0;
  border-radius: 20px 20px 0 0; /* 讓頂部有一點圓角感 */
}

.footer-content {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
}

.footer-profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 5px;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #42b883; /* 使用與搜尋按鈕一致的綠色 */
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.profile-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 700;
}

.profile-info p {
  margin: 5px 0 0;
  font-size: 0.85rem;
  color: #64748b;
}

.footer-links {
  margin: 10px 0;
}

.project-link {
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.project-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.footer-copyright {
  border-top: 1px solid #f1f5f9;
  padding-top: 15px;
  width: 100%;
  font-size: 0.8rem;
  color: #94a3b8;
  line-height: 1.6;
}

/* 響應式：手機版 */
@media (max-width: 480px) {
  .footer-profile {
    flex-direction: column;
    gap: 10px;
  }

  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
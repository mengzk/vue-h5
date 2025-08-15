<template>
  <ResponsiveLayout 
    title="CRM Shop"
    :show-bottom-nav="isMobile"
  >
    <!-- 导航菜单 -->
    <template #navigation>
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/products" class="nav-link">产品</router-link>
      <router-link to="/about" class="nav-link">关于</router-link>
    </template>

    <!-- 主要内容 -->
    <div class="page-content">
      <div class="row">
        <div 
          class="col col-mobile-12 col-tablet-8 col-desktop-8"
        >
          <h2>主要内容区域</h2>
          <p>这是一个响应式的页面布局示例</p>
          
          <!-- 响应式显示不同内容 -->
          <div class="device-info">
            <p>当前设备类型：{{ deviceType }}</p>
            <p>屏幕尺寸：{{ screenSize.width }} x {{ screenSize.height }}</p>
          </div>

          <!-- 响应式按钮组 -->
          <div class="button-group">
            <button class="btn btn-primary">主要操作</button>
            <button class="btn">次要操作</button>
            <button class="btn show-desktop">桌面端专用</button>
          </div>
        </div>
        
        <div 
          class="col col-mobile-12 col-tablet-4 col-desktop-4 hidden-mobile"
        >
          <h3>侧边栏</h3>
          <p>这个侧边栏在移动端会隐藏</p>
        </div>
      </div>
    </div>

    <!-- 底部导航（仅移动端） -->
    <template #bottom-navigation>
      <router-link to="/" class="nav-item">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">首页</span>
      </router-link>
      <router-link to="/products" class="nav-item">
        <span class="nav-icon">📦</span>
        <span class="nav-text">产品</span>
      </router-link>
      <router-link to="/profile" class="nav-item">
        <span class="nav-icon">👤</span>
        <span class="nav-text">我的</span>
      </router-link>
    </template>

    <!-- 底部信息 -->
    <template #footer>
      <p>&copy; 2025 CRM Shop. 专为 H5 和 Web 端优化</p>
    </template>
  </ResponsiveLayout>
</template>

<script>
import ResponsiveLayout from '../components/ResponsiveLayout.vue'
import { useResponsive } from '../hooks/hooks'

export default {
  name: 'ResponsiveDemo',
  components: {
    ResponsiveLayout
  },
  setup() {
    const { deviceType, screenSize, isMobile, isTablet, isDesktop } = useResponsive()

    return {
      deviceType,
      screenSize,
      isMobile,
      isTablet,
      isDesktop
    }
  }
}
</script>

<style scoped>
.nav-link {
  color: var(--text-color);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 4px;
  transition: background-color 0.2s;
  display: block;
  margin-bottom: var(--spacing-sm);
}

.nav-link:hover {
  background-color: var(--bg-color);
}

.nav-link.router-link-active {
  background-color: var(--primary-color);
  color: white;
}

.page-content {
  padding: var(--spacing-md) 0;
}

.device-info {
  background: var(--bg-color);
  padding: var(--spacing-md);
  border-radius: 8px;
  margin: var(--spacing-md) 0;
}

.button-group {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin: var(--spacing-md) 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  padding: var(--spacing-xs);
}

.nav-icon {
  font-size: var(--font-lg);
  margin-bottom: var(--spacing-xs);
}

.nav-text {
  font-size: var(--font-xs);
}

.nav-item.router-link-active {
  color: var(--primary-color);
}

/* 响应式样式调整 */
@media (min-width: 768px) {
  .nav-link {
    display: inline-block;
    margin-bottom: 0;
    margin-right: var(--spacing-md);
  }
  
  .button-group {
    justify-content: flex-start;
  }
}
</style>

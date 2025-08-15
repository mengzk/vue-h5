<template>
  <div class="responsive-layout">
    <!-- 头部 -->
    <header class="header" :class="headerClass">
      <div class="container">
        <h1 class="logo">{{ title }}</h1>
        
        <!-- 桌面端导航 -->
        <nav v-if="!isMobile" class="nav-desktop">
          <slot name="navigation" />
        </nav>
      </div>
    </header>

    <!-- 移动端菜单 -->
    <div 
      v-if="isMobile" 
      class="mobile-menu"
      :class="{ 'mobile-menu--open': mobileMenuOpen }"
    >
      <slot name="navigation" />
    </div>

    <!-- 主要内容区域 -->
    <main class="main-content" :class="mainClass">
      <div class="container">
        <slot />
      </div>
    </main>
    <!-- 移动端底部导航 -->
    <nav v-if="isMobile && showBottomNav" class="nav-mobile">
      <slot name="bottom-navigation" />
    </nav>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useResponsive } from '../hooks/useResponsive'

export default {
  name: 'ResponsiveLayout',
  props: {
    title: {
      type: String,
      default: 'App'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showBottomNav: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isMobile, isTablet, isDesktop } = useResponsive()
    const mobileMenuOpen = ref(false)

    const headerClass = computed(() => ({
      'header--mobile': isMobile.value,
      'header--tablet': isTablet.value,
      'header--desktop': isDesktop.value
    }))

    const mainClass = computed(() => ({
      'main--mobile': isMobile.value,
      'main--tablet': isTablet.value,
      'main--desktop': isDesktop.value
    }))

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    return {
      isMobile,
      isTablet,
      isDesktop,
      mobileMenuOpen,
      headerClass,
      mainClass,
      toggleMobileMenu
    }
  }
}
</script>

<style scoped>
.responsive-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.header {
  background: #fff;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  font-size: var(--font-xl);
  font-weight: bold;
  margin: 0;
  color: var(--primary-color);
}

.menu-toggle {
  background: none;
  border: none;
  font-size: var(--font-xl);
  cursor: pointer;
  padding: var(--spacing-sm);
}

.nav-desktop {
  display: flex;
  gap: var(--spacing-lg);
}

/* 移动端菜单 */
.mobile-menu {
  position: fixed;
  top: 60px;
  left: -100%;
  width: 80%;
  height: calc(100vh - 60px);
  background: red;
  border-right: 1px solid var(--border-color);
  transition: left 0.3s ease;
  z-index: 99;
  padding: var(--spacing-md);
}

.mobile-menu--open {
  left: 0;
}

/* 主要内容 */
.main-content {
  flex: 1;
  padding: var(--spacing-md) 0;
}

.main--mobile {
  padding-bottom: calc(var(--spacing-md) + 60px); /* 为底部导航预留空间 */
}

/* 底部 */
.footer {
  background: #f8f8f8;
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-md) 0;
  text-align: center;
}

/* 移动端底部导航 */
.nav-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-sm) 0;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px !important;
}

/* 响应式调整 */
@media (min-width: 768px) {
  .header .container {
    height: 50px;
  }
  
  .main-content {
    padding: var(--spacing-xl) 0;
  }
}

@media (min-width: 1024px) {
  .main-content {
    padding: var(--spacing-xxl) 0;
  }
}
</style>

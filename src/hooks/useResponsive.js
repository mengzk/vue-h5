/**
 * Vue 响应式设备检测
 */
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { getDeviceType, createMediaQueryListener, DeviceType } from '../utils/responsive'

export function useResponsive() {
  const deviceType = ref(DeviceType.DESKTOP)
  const screenSize = reactive({
    width: 0,
    height: 0
  })

  const isMobile = computed(() => deviceType.value === DeviceType.MOBILE)
  const isTablet = computed(() => deviceType.value === DeviceType.TABLET)
  const isDesktop = computed(() => deviceType.value === DeviceType.DESKTOP)

  let cleanup = null

  const updateScreenSize = () => {
    screenSize.width = window.innerWidth
    screenSize.height = window.innerHeight
  }

  const handleDeviceChange = (newDeviceType) => {
    deviceType.value = newDeviceType
  }

  onMounted(() => {
    // 初始化设备类型
    deviceType.value = getDeviceType()
    
    // 初始化屏幕尺寸
    updateScreenSize()
    
    // 监听设备类型变化
    cleanup = createMediaQueryListener(handleDeviceChange)
    
    // 监听窗口大小变化
    window.addEventListener('resize', updateScreenSize)
    window.addEventListener('orientationchange', updateScreenSize)
  })

  onUnmounted(() => {
    if (cleanup) {
      cleanup()
    }
    window.removeEventListener('resize', updateScreenSize)
    window.removeEventListener('orientationchange', updateScreenSize)
  })

  return {
    deviceType,
    screenSize,
    isMobile,
    isTablet,
    isDesktop
  }
}

/**
 * 响应式断点 Composable
 */
export function useBreakpoints() {
  const breakpoints = reactive({
    xs: false,  // < 576px
    sm: false,  // >= 576px and < 768px
    md: false,  // >= 768px and < 992px
    lg: false,  // >= 992px and < 1200px
    xl: false,  // >= 1200px
  })

  const updateBreakpoints = () => {
    const width = window.innerWidth
    breakpoints.xs = width < 576
    breakpoints.sm = width >= 576 && width < 768
    breakpoints.md = width >= 768 && width < 992
    breakpoints.lg = width >= 992 && width < 1200
    breakpoints.xl = width >= 1200
  }

  onMounted(() => {
    updateBreakpoints()
    window.addEventListener('resize', updateBreakpoints)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoints)
  })

  return {
    breakpoints,
    // 便捷方法
    isXS: computed(() => breakpoints.xs),
    isSM: computed(() => breakpoints.sm),
    isMD: computed(() => breakpoints.md),
    isLG: computed(() => breakpoints.lg),
    isXL: computed(() => breakpoints.xl),
    // 组合判断
    isMobile: computed(() => breakpoints.xs || breakpoints.sm),
    isTablet: computed(() => breakpoints.md),
    isDesktop: computed(() => breakpoints.lg || breakpoints.xl)
  }
}

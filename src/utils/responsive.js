/**
 * 响应式适配工具
 * 支持 H5 和 Web 端的响应式布局
 */

// 设备类型枚举
export const DeviceType = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop",
};

// 断点配置
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
};

/**
 * 获取当前设备类型
 */
export function getDeviceType() {
  const width = window.innerWidth;

  if (width < breakpoints.mobile) {
    return DeviceType.MOBILE;
  } else if (width < breakpoints.tablet) {
    return DeviceType.TABLET;
  } else {
    return DeviceType.DESKTOP;
  }
}

/**
 * 判断是否为移动设备
 */
export function isMobile() {
  return getDeviceType() === DeviceType.MOBILE;
}

/**
 * 判断是否为平板设备
 */
export function isTablet() {
  return getDeviceType() === DeviceType.TABLET;
}

/**
 * 判断是否为桌面设备
 */
export function isDesktop() {
  return getDeviceType() === DeviceType.DESKTOP;
}

/**
 * 媒体查询监听器
 */
export function createMediaQueryListener(callback) {
  const mediaQueries = {
    mobile: window.matchMedia(`(max-width: ${breakpoints.mobile - 1}px)`),
    tablet: window.matchMedia(
      `(min-width: ${breakpoints.mobile}px) and (max-width: ${
        breakpoints.tablet - 1
      }px)`
    ),
    desktop: window.matchMedia(`(min-width: ${breakpoints.tablet}px)`),
  };

  const handleChange = () => {
    const deviceType = getDeviceType();
    callback(deviceType);
  };

  // 监听媒体查询变化
  Object.values(mediaQueries).forEach((mq) => {
    mq.addEventListener("change", handleChange);
  });

  // 返回清理函数
  return () => {
    Object.values(mediaQueries).forEach((mq) => {
      mq.removeEventListener("change", handleChange);
    });
  };
}

/**
 * 设置根字体大小（用于 rem 适配）
 */
export function setRootFontSize() {
  const deviceType = getDeviceType();
  const baseSize = 16; // 基础字体大小

  let scale = 1;
  if (deviceType === DeviceType.MOBILE) {
    // 移动端：基于设计稿宽度计算
    const designWidth = 375; // 设计稿宽度
    scale = window.innerWidth / designWidth;
    scale = Math.min(scale, 1.2); // 限制最大缩放
  } else if (deviceType === DeviceType.TABLET) {
    scale = 1.1;
  } else {
    scale = 1;
  }

  document.documentElement.style.fontSize = `${baseSize * scale}px`;
}

/**
 * 初始化响应式适配
 */
function initResponsive() {
  // 设置初始字体大小
  setRootFontSize();

  // 监听窗口大小变化
  window.addEventListener("resize", setRootFontSize);

  // 监听设备方向变化
  window.addEventListener("orientationchange", () => {
    setTimeout(setRootFontSize, 100);
  });

  // 添加设备类型类名到 body
  const updateBodyClass = () => {
    const deviceType = getDeviceType();
    document.body.className = document.body.className.replace(
      /device-\w+/g,
      ""
    );
    document.body.classList.add(`device-${deviceType}`);
  };

  updateBodyClass();
  window.addEventListener("resize", updateBodyClass);
}

// 初始化响应式适配
initResponsive();

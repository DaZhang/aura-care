export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/test/index',
    'pages/test/result',
    'pages/product/detail',
    'pages/customize/index',
    'pages/profile/index',
    'pages/profile/orders',
    'pages/profile/records',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '东方养生·华烨尚医',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F5F5F5',
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1D3A4C',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabbar/home.png',
        selectedIconPath: './assets/tabbar/home-active.png',
      },
      {
        pagePath: 'pages/test/index',
        text: '体质测试',
        iconPath: './assets/tabbar/test.png',
        selectedIconPath: './assets/tabbar/test-active.png',
      },
      {
        pagePath: 'pages/customize/index',
        text: '定制',
        iconPath: './assets/tabbar/customize.png',
        selectedIconPath: './assets/tabbar/customize-active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: './assets/tabbar/user.png',
        selectedIconPath: './assets/tabbar/user-active.png',
      },
    ],
  },
})

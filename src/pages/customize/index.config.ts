export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '个性化定制',
      navigationBarBackgroundColor: '#F7F4ED',
    })
  : {
      navigationBarTitleText: '个性化定制',
      navigationBarBackgroundColor: '#F7F4ED',
    }

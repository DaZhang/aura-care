export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '个性化定制',
    })
  : {
      navigationBarTitleText: '个性化定制',
    }

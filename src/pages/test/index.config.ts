export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '体质测试',
      navigationBarBackgroundColor: '#F5F5F5',
    })
  : {
      navigationBarTitleText: '体质测试',
      navigationBarBackgroundColor: '#F5F5F5',
    }

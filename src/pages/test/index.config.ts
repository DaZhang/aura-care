export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '体质测试',
      navigationBarBackgroundColor: '#F7F4ED',
    })
  : {
      navigationBarTitleText: '体质测试',
      navigationBarBackgroundColor: '#F7F4ED',
    }

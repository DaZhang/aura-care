export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '测试结果',
      navigationBarBackgroundColor: '#F7F4ED',
    })
  : {
      navigationBarTitleText: '测试结果',
      navigationBarBackgroundColor: '#F7F4ED',
    }

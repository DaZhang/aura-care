export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '测试结果',
      navigationBarBackgroundColor: '#F5F5F5',
    })
  : {
      navigationBarTitleText: '测试结果',
      navigationBarBackgroundColor: '#F5F5F5',
    }

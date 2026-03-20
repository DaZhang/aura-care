export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '消息中心',
    })
  : { navigationBarTitleText: '消息中心' }

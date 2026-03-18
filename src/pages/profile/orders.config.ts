export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '我的订单',
      navigationBarBackgroundColor: '#F7F4ED',
    })
  : {
      navigationBarTitleText: '我的订单',
      navigationBarBackgroundColor: '#F7F4ED',
    }

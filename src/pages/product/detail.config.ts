export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '商品详情',
      navigationBarBackgroundColor: '#F7F4ED',
    })
  : {
      navigationBarTitleText: '商品详情',
      navigationBarBackgroundColor: '#F7F4ED',
    }

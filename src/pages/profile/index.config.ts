export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '我的',
      navigationBarBackgroundColor: '#1D3A4C',
      navigationBarTextStyle: 'white',
    })
  : {
      navigationBarTitleText: '我的',
      navigationBarBackgroundColor: '#1D3A4C',
      navigationBarTextStyle: 'white',
    }

export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '东方养生·华烨尚医',
      navigationBarBackgroundColor: '#1D3A4C',
      navigationBarTextStyle: 'white',
    })
  : {
      navigationBarTitleText: '东方养生·华烨尚医',
      navigationBarBackgroundColor: '#1D3A4C',
      navigationBarTextStyle: 'white',
    }

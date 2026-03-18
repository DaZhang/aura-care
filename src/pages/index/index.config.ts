export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '东方养生·华烨尚医',
      navigationBarBackgroundColor: '#F7F4ED',
      navigationBarTextStyle: 'black',
    })
  : {
      navigationBarTitleText: '东方养生·华烨尚医',
      navigationBarBackgroundColor: '#F7F4ED',
      navigationBarTextStyle: 'black',
    }

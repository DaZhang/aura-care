export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '我的',
      navigationBarBackgroundColor: '#F7F4ED',
      navigationBarTextStyle: 'black',
    })
  : {
      navigationBarTitleText: '我的',
      navigationBarBackgroundColor: '#F7F4ED',
      navigationBarTextStyle: 'black',
    }

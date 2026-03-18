export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '养生档案',
      navigationBarBackgroundColor: '#F7F4ED',
    })
  : {
      navigationBarTitleText: '养生档案',
      navigationBarBackgroundColor: '#F7F4ED',
    }

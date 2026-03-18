export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '养生档案',
    })
  : {
      navigationBarTitleText: '养生档案',
    }

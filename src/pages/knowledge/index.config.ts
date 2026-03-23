export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '养生知识' })
  : { navigationBarTitleText: '养生知识' }

Page({
  data: {
    query: ''
  },
  onTextChange(e){
    this.setData({ query: e.detail.value });
  },
  onTapTranslate(){
    const { query } = this.data;
    const app = getApp();
    app.request()
    .config('loading', 1)
    .get('https://api.lsong.org/translate')
    .query({ text: query })
    .end()
    .then(res => res.data)
    .then(res => this.setData(res));
  }
});
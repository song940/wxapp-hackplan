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
    .get(`https://api.lsong.org/translate?text=${encodeURIComponent(query)}`)
    .end()
    .then(res => res.data)
    .then(res => this.setData(res));
  }
});
Page({
  onLoad(){
    const app = getApp();
    app.invoke('getClipboardData')
    .then(res => res.data)
    .then(url => {
      if(/^https?:/.test(url)){
        this.setData({ url });
      }
    });
  },
  onInput(e){
    this.setData({ url: e.detail.value });
  },
  onTapShort(){
    const { alias, url } = this.data;
    const app = getApp();
    app.request()
    .post('https://api.lsong.me/tinyurl')
    .send({ alias, url })
    .end()
    .then(res => res.data)
    .then(({ alias }) => {
      app
      .invoke('setClipboardData', { 
        data:  `http://go.lsong.org/${alias}`
      })
      .then(() => this.setData({ alias }));
      
    })
  }
});
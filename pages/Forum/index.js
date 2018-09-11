Page({
  onLoad(){
    const app = getApp();
    app
    .request()
    .get('http://forum.lsong.org/topics')
    .end()
    .then(res => res.data)
    .then(topics => {
      this.setData({ topics });
    });
  }
});
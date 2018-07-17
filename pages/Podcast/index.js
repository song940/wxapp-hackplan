Page({
  onLoad(){
    const app = getApp();
    app.request()
    .get('https://blog.lsong.org/feed.xml')
    .end()
    .then(res => res.data)
    .then(res => console.log(res))
  }
});
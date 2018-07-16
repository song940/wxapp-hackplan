Page({
  onLoad({ level = 'A' }){
    const app = getApp();
    app.request()
    .get(`https://lsong.org/~lsong/HAM/${level}.json`)
    .end()
    .then(res => res.data)
    .then(questions => {
      this.setData({ questions });
    })
  }
});
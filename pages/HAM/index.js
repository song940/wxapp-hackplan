Page({
  onLoad({ level = 'A' }){
    const app = getApp();
    app.request()
    .get(`https://lsong.org/~lsong/HAM/${level}.json`)
    .config('loading', true)
    .end()
    .then(res => res.data)
    .then(questions => {
      this.setData({ questions });
    })
  }
});
Page({
  onLoad(){
    const app = getApp();
    app.request()
    .get('https://lsong.org/~lsong/HAM/A.json')
    .end()
    .then(res => res.data)
    .then(questions => {
      this.setData({ questions: questions });
    })
  }
});
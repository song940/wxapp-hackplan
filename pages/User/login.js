Page({
  onLoad(){
    this.app = getApp();
  },
  onLogin(e){
    const { username, password } = e.detail.value;
    console.log(username, password);
    this.app
    .request()
    .post('http://my.lsong.org/login')
    .send({ username, password })
    .end()
    .then(res => console.log(res));
  }
});
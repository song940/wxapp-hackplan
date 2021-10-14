Page({
  onLoad({ level = 'A' }) {
    const app = getApp();
    app.request()
      .get(`https://lsong.org/HAM/${level}.json`)
      .config('loading', true)
      .end()
      .then(res => res.data)
      .then(questions => questions.map(question => {
        question.options = [].map.call('ABCD', (option, i) => {
          const text = question[option];
          return { text, correct: i === 0 };
        }).sort(() => Math.random() - .5);
        return question;
      })).then(questions => this.setData({ questions }));
  }
});
Component({
  data: {},
  properties: {
    question: Object
  },
  ready(){
    const { question } = this.data;
    question.options = [].map.call('ABCD', (option, i) => {
      const text = question[option];
      return { text, correct: i === 0 };
    }).sort(() => Math.random() - .5);
    this.setData({ question });
  },
  methods: {
    onTapOption(e){
      const { question } = this.data;
      const { option } = e.target.dataset;
      if(question.answer) return;
      question.answer = option;
      question.options.forEach(opt => {
        if(opt.correct){
          opt.style = 'correct';
        }
        if(opt.text == option.text){
          opt.style = opt.correct ? 'correct' : 'wrong';
        }
      });
      this.setData({ question });
    }
  }
});
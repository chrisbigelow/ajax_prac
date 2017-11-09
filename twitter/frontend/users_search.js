const APIUtil = require('./api_util');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.input = $('input.user-search');
    this.ul = this.$el.parent();
    this.handleInput();
  }
  
  handleInput() {
    //event 
    this.input.keyup((event) => {
      APIUtil.searchUsers(event.currentTarget.value).then((result) => this.renderResults(result));
    })
    
  
  }

  renderResults(result) {
    //result is a js object
    $('ul.users').children().remove();
    
    result.forEach((index, user) => {
      console.log(user);
      const userID = $(user).data('user-id');
      // debugger;
      const userLI = $(`<li><a href='/users/${userID}'>${userID}</a></li>`)
      $('ul.users').append(userLI);
    })
  }

}

module.exports = UsersSearch;





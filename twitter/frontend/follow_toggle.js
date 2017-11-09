class FollowToggle {
  constructor(el) { //el is the data attribute from the html form
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.handleClick();
  }
  
  render() {
    if (this.followState === 'unfollowed') {
      // console.log('follow!')
      this.$el.text('Follow!');
    } else {
      // console.log('unfollow!')
      this.$el.text('Unfollow!');
    }
    this.$el.prop('disabled', false);
  }
  
  handleClick() {
    
    let ajaxMethod;
    let state;
    
    this.$el.click((event) => {  
    
      event.preventDefault();
      
      this.$el.prop('disabled', true);
      
      if (this.followState === 'unfollowed') {
        ajaxMethod = "POST";
        state = "followed";
      } else {
        ajaxMethod = "DELETE";
        state = "unfollowed";
      }
  
      
        $.ajax({
          url: `/users/${this.userId}/follow`,
          method: ajaxMethod,
          dataType: 'JSON',
          success: () => {
            this.followState = state;
            this.render();
          }
          
        });

    });
  }
  
  
  
  
  
  
  
}

module.exports = FollowToggle;
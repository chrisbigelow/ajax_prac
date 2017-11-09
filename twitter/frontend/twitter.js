const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');


$(document).ready(function() {
  
  $('button.follow-toggle').each(function(index, button) {
    const followToggle = new FollowToggle(button);
    // console.log(followToggle);
  });
  
  $('nav.users-search').each(function(index, user) {
    const userSearch = new UsersSearch(user);
  });
  
  
});
const APIUtil =  {
  
  searchUsers: (queryVal) => {
    return $.ajax({
      url: '/users/search',
      method: 'GET',
      dataType: 'JSON',
      data: queryVal
      
    })
  }
};

module.exports = APIUtil;
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(2);


$(document).ready(function() {
  
  $('button.follow-toggle').each(function(index, button) {
    const followToggle = new FollowToggle(button);
    // console.log(followToggle);
  });
  
  $('nav.users-search').each(function(index, user) {
    const userSearch = new UsersSearch(user);
  });
  
  
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(3);

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






/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
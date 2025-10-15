(function (global) {

  var dc = {};

  var homeHtml = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var categoriesTitleHtml = "snippets/menu-categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}' with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {

    // STEP 0: Load the home snippet page
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML,
      true);
  });

  // STEP 1: Build and show home HTML with random category
  function buildAndShowHomeHTML(categories) {
    // Load home snippet page
    $ajaxUtils.sendGetRequest(homeHtml, function (homeHtmlContent) {

      // STEP 2: Choose a random category short_name
      var randomCategoryShortName = chooseRandomCategory(categories);

      // STEP 3: Substitute {{randomCategoryShortName}} with real short_name
      var homeHtmlToInsertIntoMainPage =
        insertProperty(homeHtmlContent, "randomCategoryShortName", "'" + randomCategoryShortName + "'");

      // STEP 4: Insert the produced HTML into main page
      insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
    }, false);
  }

  // Given array of category objects, returns a random category short_name
  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  }

  global.$dc = dc;

})(window);

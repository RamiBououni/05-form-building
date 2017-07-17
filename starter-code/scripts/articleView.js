'use strict';

var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      }, 200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

articleView.initNewArticlePage = function() {
  // TODO: Make the tabs work. Right now, you're seeing all the tab content (items with a class of tab-content) on the page at once. The section with the id of "write" should show when the "write" tab is clicked; it is also the default and should be shown on page load. The section with the id of "articles" should show when the "preview" tab is clicked.
  // DONE estimate: 5 min, actual: 2 min
  $('.tab').show();
  // TODO: Hide the article-export section on page load
  // DONE estimate: 5 min, actual: 2 min
  $('#article-export').hide();
  $('#article-json').on('focus', function() {
    this.select();
  });

  // TODO: Add an event handler to update the preview and the article-export field if any inputs change.
  $('input').on('change', function(){
    // $('#articles').append('<p>hello</p>');
    var myTitle = $('.myTitle').val();
    console.log(myTitle);
    $('#articles').append(myTitle);

    var myBody = $('.myBody').val();
    $('#articles').append(myBody);

    var myAuthor = $('.myAuthor').val();
    $('#articles').append(myAuthor);

    var myUrl = $('.myUrl').val();
    $('#articles').append(myUrl);

    var myCategory = $('.myCategory').val();
    $('#articles').append(myCategory);


    // var previewArticle = new Article(previewArticle);
    // console.log(previewArticle);
    // previewArticle.title = $('.myTitle').val();
    // previewArticle.body = $('.myBody').val();
    // previewArticle.author = $('.myAuthor').val();
    // previewArticle.authorUrl = $('.myUrl').val();
    // previewArticle.category = $('.myCategory').val();
    // previewArticle.create();
    // previewArticle.templateRender();

  });
}
// this is the function that generates the preview and shows the export field
articleView.create = function(element) {
  // TODO: Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  // DONE estimated: 5min, actual: 2min
  var article;
  $('#articles').empty();
  // TODO: Instantiate an article based on what's in the form fields:
  // DONE estimate: 20min, actual: 10min
  article = new Article({
    author: element.author,
    authorUrl: element.authorUrl,
    title: element.title,
    category: element.category,
    body: element.body,
    publishedOn: element.publishedOn
  });

  // $('#articles').append(article.toHtml());

  // TODO: Use our interface to the Handblebars template to put the article preview into the DOM:
  Article.prototype.templateRender = function(element){
    var template = $('article-template').html();
    var compiled = Handlebars.compile(template);
    $(element).append(compiled(this));
  }

  // TODO: The new articles we create will be shown as JSON in an element in our article-export section. From there, we can copy/paste the JSON into our source data file.
  // Set up this "export" functionality. When data is inputted into the form, that data should be converted to stringified JSON. Then, display that JSON in the element inside the article-export section. The article-export section was hidden on page load; make sure to show it as soon as data is entered in the form.

};


articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};

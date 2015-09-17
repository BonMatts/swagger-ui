'use strict';

SwaggerUi.Views.SignatureView = Backbone.View.extend({
  events: {
    'click a.description-link'       : 'switchToDescription',
    'click a.snippet-link'           : 'switchToSnippet',
    'click a.hypermedia-link'           : 'switchToHypermedia',
    'mousedown .snippet'          : 'snippetToTextArea'
  },

  initialize: function () {

  },

  render: function(){

    $(this.el).html(Handlebars.templates.signature(this.model));

    this.switchToSnippet();

    this.isParam = this.model.isParam;

    if (this.isParam) {
      $('.notice', $(this.el)).text('Click to set as parameter value');
    }
    //console.log('==============');
    //console.log(this.model.links);
    if(this.model.links){
      console.log(this.model.links.definition['x-links']);
    }
    console.log(this.model.test);
    return this;
  },

  // handler for show signature
  switchToDescription: function(e){
    if (e) { e.preventDefault(); }

    $('.snippet', $(this.el)).hide();
    $('.description', $(this.el)).show();
    $('.hypermedia', $(this.el)).hide();
    $('.description-link', $(this.el)).addClass('selected');
    $('.snippet-link', $(this.el)).removeClass('selected');
    $('.hypermedia-link', $(this.el)).removeClass('selected');
  },

  // handler for show signature
  switchToHypermedia: function(e){
    if (e) { e.preventDefault(); }

    $('.snippet', $(this.el)).hide();
    $('.description', $(this.el)).hide();
    $('.hypermedia', $(this.el)).show();
    $('.hypermedia-link', $(this.el)).addClass('selected');
    $('.description-link', $(this.el)).removeClass('selected');
    $('.snippet-link', $(this.el)).removeClass('selected');
  },

  // handler for show sample
  switchToSnippet: function(e){
    if (e) { e.preventDefault(); }

    $('.description', $(this.el)).hide();
    $('.snippet', $(this.el)).show();
    $('.hypermedia', $(this.el)).hide();
    $('.snippet-link', $(this.el)).addClass('selected');
    $('.description-link', $(this.el)).removeClass('selected');
    $('.hypermedia-link', $(this.el)).removeClass('selected');
  },

  // handler for snippet to text area
  snippetToTextArea: function(e) {
    if (this.isParam) {
      if (e) { e.preventDefault(); }

      var textArea = $('textarea', $(this.el.parentNode.parentNode.parentNode));

      // Fix for bug in IE 10/11 which causes placeholder text to be copied to "value"
      if ($.trim(textArea.val()) === '' || textArea.prop('placeholder') === textArea.val()) {
        textArea.val(this.model.sampleJSON);
      }
    }
  }

});

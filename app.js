$(document).ready(function () {
  page.init();
});

var page = {
  url: 'http://tiy-fee-rest.herokuapp.com/collections/thoughts',
  init: function(){
    page.styling();
    page.events();
  },

  styling: function(){
    page.getThought();
  },

  events: function(){
    $('form').on('submit', page.createThought);
    $('.thoughts').on('click', '.delete', page.deleteEventThought)
  },

  deleteEventThought: function(event){
    event.preventDefault();
    var thoughtId = $(this).closest('.yourThought').data('thoughtid');
    console.log(thoughtId)
      $(this).parent('.yourThought').remove();
      page.deleteThought(thoughtId);
  },

  createThought: function(event){
    event.preventDefault();
    var newThought = {
      thought: $('input[name="thought"]').val()
    };
    $('input[type="text"]').val('');
    $.ajax({
      url: page.url,
      method: 'POST',
      data: newThought,
      success: function(response){
        console.log(response);
        $('.thoughts').html('');
        page.getThought();
      }
    });
  },

  getThought: function(){
    $.ajax({
      url: page.url,
      method: 'GET',
      success: function(thoughtsArray){
        _.each(thoughtsArray, function(el){
          $('.thoughts').append("<article class='yourThought' data-thoughtid='"
          + el._id
          + "'>"
          + "<h3>"
          + el.thought
          + "</h3>"
          + "<button class = 'delete'> Delete"
          + "</button>"
          + "</article>"
        )}
      )}
    });
  },



  deleteThought: function(thoughtId){
    $.ajax({
      url: page.url + '/' + thoughtId,
      method: 'DELETE',
      success: function(response){
        console.log(response)
      }
    })
  }

}

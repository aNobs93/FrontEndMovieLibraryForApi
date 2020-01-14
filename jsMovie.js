var $Title = $('#Title');
var $Genre = $('#Genre');
var $Director = $('#Director');
var $moviesList = $('#movies');
var movieTemplate = $('#movie-template').html();
var movieTemplate = ""+"<tr>"+ 
 "<td class='left'><h4><span class='noedit Title'>{{Title}}</span><input class='edit Title'/></h4></td>" +
 "<td><h4><span class='noedit Genre'>{{Genre}}</span><input class='edit Genre'/></h4></td>" + 
 "<td><h4><span class='noedit Director'>{{Director}}</span><input class='edit Director'/></h4></td>" +
 "<td><h4><button data-id='{{MovieId}}' class ='remove'>X</button></h4></td>" +
 "<td><h4><button data-id='{{MovieId}}' class ='editMovie', 'noedit'>Edit</button></h4></td>" +
 "<td><h4><button class ='saveEdit edit'>Save</button></h4></td>" +
 "<td><h4><button class ='cancelEdit edit'>Cancel</button></h4></td>" +
 "</tr>";
function addMovie(movie){
    $moviesList.append(Mustache.render(movieTemplate, movie));
    // $moviesList.append('<tr><td class="left"><h4>' + movie.Title + '</h4></td><td><h4>' + movie.Genre + '</h4></td><td><h4>' + movie.Director + '</h4></td>')
}
$(function(){   
     $.ajax({
         type: 'Get',
         url: 'https://localhost:44352/Api/Movie',
         success: function(movies){
             console.log('success', movies);
                $.each(movies, function(i, movie) {
                    addMovie(movie);
                });
         },
         error: function(){
             alert('error loading orders');
         }        
     });

     $('#add-movie').on('click', function(){
        var movie = {
            Title: $Title.val(),
            Genre: $Genre.val(),
            Director: $Director.val()
        };
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44352/Api/Movie',
            data: movie,
            success: function(newMovie){
                addMovie(newMovie);
            },
            error: function(){
                alert('error saving order');
            }
        });
    });

    $moviesList.delegate('.remove', 'click', function(){
        var $tr = $(this).closest('tr');
        var self = this;

        $.ajax({
            type: 'DELETE',
            url: 'https://localhost:44352/Api/Movie/' + $(this).attr('data-id'),
            success: function(){
                $tr.fadeOut(300, function(){
                    $(this).remove();
                });
            }
        });
    });

    $orders.delegate('.editMovie', 'click', function(){
        var $tr = $(this).attr('data-id')
        $tr.find('input.title').val($tr.find('span.title').html());
        $tr.find('input.genre').val($tr.find('span.genre').html());
        $tr.find('input.director').val($tr.find('span.director').html());
        $tr.addClass('edit');
    })

});
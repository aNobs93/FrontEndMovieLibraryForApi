var $Title = $('#Title');
var $Genre = $('#Genre');
var $Director = $('#Director');
var $moviesList = $('#movies');
function addMovie(movie){
    $moviesList.append('<tr><td class="left"><h4>' + movie.Title + '</h4></td><td><h4>' + movie.Genre + '</h4></td><td><h4>' + movie.Director + '</h4></td>')
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

 });
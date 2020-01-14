 $(function(){
     var $moviesList = $('#movies');

     $.ajax({
         type: 'Get',
         url: 'https://localhost:44352/Api/Movie',
         success: function(movies){
             console.log('success', movies);
                $.each(movies, function(i, movie) {
                $moviesList.append('<tr><td class="left"><h4>' + movie.Title + '</h4></td><td><h4>' + movie.Genre + '</h4></td><td><h4>' + movie.Director + '</h4></td>')
                });
         }
     });
 });
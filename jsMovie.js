$(function(){
    $.ajax({
        type: 'Get',
        url: 'https://localhost:44352/Api/Movie',
        success: function(data){
            console.log('success', data);
        }
    });
});
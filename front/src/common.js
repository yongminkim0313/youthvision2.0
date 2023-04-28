exports.getDate = function(){
    var today = new Date();
    var year    = today.getFullYear();
    var month   = ('0' + (today.getMonth() + 1)).slice(-2);
    var day     = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;
    return dateString
}


exports.getDateTime = function(){
    var today = new Date();

    var year    = today.getFullYear();
    var month   = ('0' + (today.getMonth() + 1)).slice(-2);
    var day     = ('0' + today.getDate()).slice(-2);

    var hours   = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);

    var dateString = year + '-' + month  + '-' + day;
    var timeString = hours + ':' + minutes  + ':' + seconds;

    return dateString+' '+timeString;

}

exports.getAddDate =function(b){
    var d = new Date();
    d.setDate(d.getDate()+b);

    var year    = d.getFullYear();
    var month   = ('0' + (d.getMonth() + 1)).slice(-2);
    var day     = ('0' + d.getDate()).slice(-2);

    var dateString = year + '-' + month  + '-' + day;
    
    return dateString
}
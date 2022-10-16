
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

var getCookies = function(req){
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        return values;
    }
    return null;
}

exports.getCookies = function(req){
    return getCookies(req);
}
exports.getPrmanentCookie = function(req){
    var values = getCookies(req);
    if(values.prmanent_cookie) return values.prmanent_cookie;
    return null;
}
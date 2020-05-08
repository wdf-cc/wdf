export var getSearch = function (keyword:string):string{
    var search:string = window.location.search;
    var regExp:RegExp = new RegExp(`${keyword}=`);
    var result:string = search.split("&").filter(v=>regExp.test(v))[0].replace(regExp,"").replace(/\?/,"");
    console.log(result);
    return result;
 }
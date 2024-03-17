const request=require('request');

function geturl(url,funname,path){
    request(url,function(error,response,body){
        if(error){
            console.log(error);
        }
        else{
            funname(body,path);
        }
    });
}
module.exports=geturl;
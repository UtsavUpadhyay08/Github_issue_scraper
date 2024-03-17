const cheerio=require('cheerio');
const request=require('request');
const path=require('path')
const fs=require('fs');

const dir=path.join(__dirname,"topics");
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const url="https://github.com/topics";
geturl(url,extractlink,dir);

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

function extractlink(body,dir){
    let $=cheerio.load(body);
    let arr=$(".py-4.border-bottom.d-flex.flex-justify-between .no-underline.flex-grow-0");
    for(let i=0;i<arr.length;i++){
        let link=$(arr[i]).attr("href");
        link="https://github.com"+link;
        let new_dir=link.split('/')[4];
        let new_path=path.join(dir,new_dir);
        if(!fs.existsSync(new_path)){
            fs.mkdirSync(new_path);
        }
        geturl(link,repolink,new_path);
    }
    
}
function repolink(body,dirpath){
    let $=cheerio.load(body);
    let arr=$(".px-3 .d-flex.flex-justify-between.flex-items-start.flex-wrap.gap-2.my-3 .d-flex.flex-1 .f3.color-fg-muted.text-normal.lh-condensed .Link.text-bold.wb-break-word");
    for(let i=0;i<arr.length;i++){
        let link=$(arr[i]).attr("href");
        let new_dir=link.split('/')[2];
        new_dir=new_dir+".json";
        let new_path=path.join(dirpath,new_dir);
        link="https://github.com"+link+"/issues";
        geturl(link,allissues,new_path);
    }
}

function allissues(body,filepath){
    let $=cheerio.load(body);
    let arr=$(".js-navigation-container.js-active-navigation-container .Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row .d-flex.Box-row--drag-hide.position-relative .flex-auto.min-width-0.p-2.pr-3.pr-md-2 .Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let obj=[];
    for(let i=0;i<arr.length;i++){
        let link=$(arr[i]).attr("href");
        link="https://github.com"+link;
        obj.push(link);
    }
    obj=JSON.stringify(obj);
    fs.writeFileSync(filepath,obj);
}
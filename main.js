const cheerio=require('cheerio');
const path=require('path')
const fs=require('fs');

const geturl=require('./util')
const allissues=require('./issues')

const dir=path.join(__dirname,"topics");
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const url="https://github.com/topics";
geturl(url,extractlink,dir);

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
        let new_path=path.join(dirpath,new_dir);
        link="https://github.com"+link+"/issues";
        geturl(link,allissues,new_path);
    }
}

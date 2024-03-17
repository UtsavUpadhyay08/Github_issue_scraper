const cheerio=require('cheerio');
const fs=require('fs');
const pdfkit=require('pdfkit');

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
    //filepath=filepath+".json";                          //To save files in json format
    // fs.writeFileSync(filepath,obj);

    filepath=filepath+".pdf";                             //To save files in pdf format
    let pdfdoc=new pdfkit();
    pdfdoc.pipe(fs.createWriteStream(filepath));
    pdfdoc.text(obj);
    pdfdoc.end();
}

module.exports=allissues;
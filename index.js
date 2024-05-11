const axios=require('axios');
const fs =require('fs');
const cheerio = require('cheerio')
const xlsx = require('xlsx');

// Create a new workbook
const workbook = xlsx.utils.book_new();

const pagedata= async()=>{
    const url = 'https://apna.co/jobs/jobs-in-hyderabad';
    const {data} =  await axios.get(url);
    // fs.writeFileSync('rawdata.txt', data);    // comment it because exract the data api is working , but some of html element not extracting from api " today assign deadline" the missing tag copied and pasted.
}
pagedata();

const readfile = fs.readFileSync('rawdata.txt',{encoding:'utf-8'});
const $ =cheerio.load(readfile);
const exeldata =[['Job', 'Company', 'Location&Salary','Worktime']]
const listofitems = $('div[data-testid]');
    listofitems.each((i,e)=>{
        const job = $(e).find('div.w-full.flex-1 a').text();
        const company = $(e).find('div.JobListCardstyles__JobCompany-ffng7u-8.gguURM').text();
        const location = $(e).find('.flex.items-center.gap-1>p').text();
        const worktime =$(e).find('.m-0.whitespace-nowrap.text-xs').text();
        exeldata.push([job,company,location,worktime]);
    })
    
const sheet = xlsx.utils.aoa_to_sheet(exeldata);
xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1');
xlsx.writeFile(workbook, 'output.xlsx');
console.log('XLSX file created successfully!');
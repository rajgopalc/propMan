
/*
 * GET home page.
 */
var fs = require('fs'),
    path = require('path');
    
exports.showPropertyFilePaths = function(req,res){
    resObj = [];
    countOfFile = 0;
    ppty_file_path = fs.readFileSync("public/configuration/config.txt");
    ppty_file_path_array = String(ppty_file_path).split(",");
    console.log("Property file path val:" + ppty_file_path_array);
    ppty_file_path_array.forEach(function(ppty_file_path){
        if(ppty_file_path !== "" || ppty_file_path !== undefined){
            var list = fs.readdirSync(ppty_file_path);
             for(var i = 0; i<list.length; i++){
                    if(path.extname(list[i]) === ".properties"){
                            countOfFile = countOfFile + 1;
                            console.log("Count of file :: " + countOfFile);
                            resObj.push({"File":ppty_file_path+list[i],"Id":countOfFile});                    
                    }
             }
        }
    });
    
    res.send(resObj);
    
}

exports.showPropertyFile = function(req,res){
    res.render('showPropertyFiles');
}
   
exports.readFile = function(req,res){
    fs.readFile(req.params.filename,{encoding:"utf-8"},function(err,data){
        if(!err){
                console.log("File is :"+req.params.filename);
                console.log("Contents below :");
                console.log(data);
                res.send(data);
        }
        else{
            console.log(err);
        }
    });   
}

exports.commitFile = function(req,res){
    fs.writeFile(req.body.filename, req.body.data, {encoding:"utf-8"},function(err){
        if(!err){
            console.log("Its saved!!");
            res.send("Success");
        }
       else{
            res.send("Failure");
       }
    });

}
var holder;
function getID(){
    var http = require("https");
    var options = {
        "method": "GET",
        "hostname": "hacker-news.firebaseio.com",
        "port": null,
        "path": "/v0/maxitem.json?print=pretty",
        "headers": {}
      };
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
        var req = http.request(options, function (res) {
            var chunks = [];
            
            res.on("data", function (chunk) {
                chunks.push(chunk);
                });
                
                res.on("end", function () {
                    var body = Buffer.concat(chunks);
                    resolve(body.toString());
                });
            });

            req.end();
        } catch (err) {
            reject(err);
        }
    }, 1000);
    });
}


function getStory(id){
    var http = require("https");
    var body = "";
var path = "/v0/item/" + id.toString().trim() + ".json?print=pretty";
var options = {
  "method": "GET",
  "hostname": "hacker-news.firebaseio.com",
  "port": null,
  "path": path,
  "headers": {}
};

return new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
    var req = http.request(options, function (res) {
        var chunks = [];
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
            });
            
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    } catch (err) {
        reject(err);
    }
}, 1000);
});
};

async function run() {
    var id = await getID();
    if(holder != id){
        var json = await getStory(id);
        data = JSON.parse(json);
        if(data != null){
            console.log(data.type);
            if(data.url != undefined && data.url != undefined && data.type == "story"){
                console.log(data.title);
                console.log(data.url);
                console.log("-------------");
            }
    }
        holder = id;
    }
    setTimeout(run, 10);
    
};

run();

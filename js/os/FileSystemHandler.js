var fs = require('fs');


function testFileCreation(fileName) {

    var content = "Hello World";
    fs.writeFile(fileName, content, function (err) {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }

        alert("The file has been succesfully saved");
    });
}

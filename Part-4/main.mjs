import AWS from 'aws-sdk';
import { StringDecoder} from 'string_decoder';
import * as fs from "fs";


AWS.config.update({region: 'us-east-1'});
let s3 = new AWS.S3({apiVersion: '2006-03-01'});



//Input code
 console.log(`${process.argv[0]}`);
 console.log(`${process.argv[1]}`);
 console.log(`${process.argv[2]}`);
 console.log(`${process.argv[3]}`);

 //Display source and destination of user input

 let source=process.argv[2];
console.log(`Source: ${source}`);
let Destination=process.argv[3];
console.log(`Destination: ${Destination}`);

//retrieves an object for an S3 bucket. lab6-part3-kd-images
var params = {
  Bucket: 'lab6-part3-kd-images', 
  Key: "happyface.txt"
 };

 s3.getObject(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
  
   /*
    data = {
      AcceptRanges: "bytes", 
      ContentLength: 3191, 
      ContentType: "image/jpeg", 
      ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
      LastModified: 'date', 
      Metadata: {
      }, 
      TagCount: 2, 
      VersionId: "null"
   };
*/

   const decoder=new StringDecoder('utf8');
   let objectContents=decoder.write(data.Body);
   fs.writeFileSync( process.argv[3], objectContents, decoder );
  

 });







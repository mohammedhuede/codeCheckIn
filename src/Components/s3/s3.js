import aws_config from "../../aws-exports";
import { getCurrentUsername } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "aws-amplify";
//  Uploads file to S3 under protected bucket using logged in user credentials

export const uploadFile = async (file, level= "public") => {
  const bucket = aws_config.Storage.AWSS3.bucket;
  const region = aws_config.Storage.AWSS3.region;
  let key = "";
  if(level === "public") {
    key = `${await getCurrentUsername()}/${uuidv4()}-${file.name}`;
  } else {
    key = `${uuidv4()}-${file.name}`;
  }
  
  try {
    const response = await Storage.put(key, file, {
      contentType: file.type,
      level: level,
      region,
    });
    return `https://${bucket}.s3.${region}.amazonaws.com/${level}/${encodeURIComponent(key)}`;
  } catch (e) {
    // TODO: add behavior for errors
    console.log("S3 upload failed. Error is " + e);
    return "";
  }
};
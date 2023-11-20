// returns logged in user's sub attribute (globally unique user Id)

import { Auth } from "aws-amplify";

export async function getCurrentUsername() {
    const user = await Auth.currentAuthenticatedUser();
    if (!user) {
        //TODO: we should never see this.
        throw Error("Can not fetch user prior to authentication. Log In to view the user details");
    }
    return user.getUsername();
}

export const resizeImage = async (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            let width = image.width;
            let height = image.height;

            if (width <= maxWidth && height <= maxHeight) {
                resolve(file);
            }
            let newWidth;
            let newHeight;

            if (width > height) {
                newHeight = height * (maxWidth / width);
                newWidth = maxWidth;
            } else {
                newWidth = width * (maxHeight / height);
                newHeight = maxHeight;
            }

            let canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;

            let context = canvas.getContext("2d");

            context.drawImage(image, 0, 0, newWidth, newHeight);
            canvas.toBlob((blob) => {
                resolve(new File([blob], file.name, { type: "image/jpeg" }));
            }, file.type);
        };
        image.onerror = reject;
    });
};

export const getFileNameFromAwsResponse = (url) => {
    let str = decodeURIComponent(url).split("?")[0]
            let strArr= str.split('/')
            let strArrLastPos = strArr.length - 1
            let str2Arr = strArr[strArrLastPos].split('-')
            let str2ArrLastPos = strArr[strArrLastPos].split('-').length - 1
            return str2Arr[str2ArrLastPos]
}
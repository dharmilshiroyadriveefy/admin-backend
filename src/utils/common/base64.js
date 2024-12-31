
async function convertImageToBase64(fileBuffer,mimeType){
    try{
        const base64Img= fileBuffer.toString("base64");
        return `data:${mimeType};base64,${base64Img}`;
    }catch(error){
        throw new Error(`Error while converting image to base64: ${error.message}`);
    }
}

module.exports = {convertImageToBase64};
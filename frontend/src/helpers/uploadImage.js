const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`


const uploadImage = async (image) => {
    // first convert image in formData
    const formData = new FormData();
    formData.append("file", image)
    formData.append("upload_preset", "mern_product");

    const res = await fetch(url, {
        method: "post",
        body: formData
    })

    const result = await res.json();
    return result;
}

export default uploadImage;
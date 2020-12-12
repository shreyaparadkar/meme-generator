import axios from 'axios';

const generateMeme = async (texts, id) => {

    var bodyFormData = new FormData();
    bodyFormData.append('template_id',id)
    bodyFormData.append('username',"")
    bodyFormData.append('password', "")
    for (const i in texts) {
        if (texts[i]) {
            bodyFormData.append(i,texts[i])
        }
    }
    return await axios.post('https://api.imgflip.com/caption_image',
        bodyFormData,
        {
        headers: {
            "Content-Type": "multipart/form-data"
        }}
    )
}

export default generateMeme;
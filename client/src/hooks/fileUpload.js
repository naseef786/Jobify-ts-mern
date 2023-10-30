import apiClient from '../axios/apiClient'

export const handleFileUpload = async (uploadfile) => {
    const formData = new FormData
    formData.append('file',uploadfile);
    formData.append('uplaod_preset','jobify');

    try {
        const response = await apiClient.post('htpps://api.cloudinary.com/v1_1/ddwlmqrde/image/upload/',formData)
        return response.data.secure_url;

    } catch (error) {
        console.log(error);
    }
}
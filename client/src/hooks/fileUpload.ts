import axios from "axios";

export const handleFileUpload = async (uploadFile: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('upload_preset', 'jobify');
    formData.append('cloud_name', 'ddwlmqrde')
    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/ddwlmqrde/image/upload', formData);
        return response.data.secure_url;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

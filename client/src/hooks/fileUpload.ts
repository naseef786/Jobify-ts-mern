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



export const updateURL = ({
    pageNum,query,cmpLoc,sort,navigate,jType,exp,location
}:any)=>{
const params = new URLSearchParams();
if(pageNum && pageNum > 1){ params.set('page',pageNum)}
if(query){ params.set('search',query)}
if(cmpLoc){ params.set('location',cmpLoc)}
if(sort){ params.set('sort',sort)}
// if(navigate){ params.set('navigate',navigate)}
if(jType){ params.set('jType',jType)}
if(exp){ params.set('exp',exp)}

const newURL =  `http://localhost:4000/admin/companies`;
return newURL
}

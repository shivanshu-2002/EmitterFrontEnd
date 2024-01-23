import axios from "axios";
// const mainUrl = 'http://localhost:3000/api/v1'
const mainUrl = 'https://weary-pike-sandals.cyclic.app/api/v1' //for Production


export const apiCall = async (url,body) => {
    try {
       const {data} = await axios.post(
             `${mainUrl}${url}`,
           body,
           { withCredentials: true }
        );
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const apiCallGet = async (url) => {
    try {
       const {data} = await axios.get(
             `${mainUrl}${url}`, { withCredentials: true }
        );
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
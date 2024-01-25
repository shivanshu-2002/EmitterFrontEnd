import axios from "axios";
const mainUrl = 'https://weary-pike-sandals.cyclic.app/api/v1' //for Production
// const mainUrl = 'http://localhost:3000/api/v1'


const getToken = async () => {
    return await localStorage.getItem("token")
}

export const apiCall = async (url, body, cookie) => {
    try {
        const token = await getToken();
        let headers = {};
        if (token!=null) {
            headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.replace(/"/g, "")}` // Remove double quotes
            };
        } else {
            headers = {
                "Content-Type": "application/json",
            };
        }

        const { data } = await axios.post(
            `${mainUrl}${url}`,
            body,
            { headers }
        );
        console.log(url)
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const apiCallGet = async (url) => {
    try {
        const token = await getToken();
        let headers = {};
        if (token!=null) {
            headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.replace(/"/g, "")}` // Remove double quotes
            };
        } else {
            headers = {
                "Content-Type": "application/json",
            };
        }

        const { data } = await axios.get(
            `${mainUrl}${url}`, { headers }
        );

        return data;
    } catch (err) {
        console.error(err);
        return err;
    }
};

import {config} from "src/common/config";
import { CreateTableAction} from "./Actions";



export const createTable = (action: CreateTableAction):Promise<any> => {
    return postData("/api/v0.1/games/riichi", action);
};

const postData = (url = ``, data: CreateTableAction):Promise<any> => {
    // Default options are marked with *
    return fetch(config.baseUrl + url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json())
        .then(js => {
            console.log("Http <<", js)
            return js;
        }) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
};

class Fetch {
    objToParas(obj) {
        let i = 0, arr = [];
        for (let item in obj) { 
            arr[i] = [item, obj[item]];
            i++;
        }
        return new URLSearchParams(arr).toString();
    }

    get(url) {
        return fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => {
            return res.text();
        });
    }

    post(url, dataObj) {
        var that = this;
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: that.objToParas(dataObj)
        })
        .then((res) => {
            return res.text();
        });
    }
}

export default Fetch;
















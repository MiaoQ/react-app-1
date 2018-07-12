class Fetch {
    objToParas(obj) {
        let paraStr = '';
        for (let item in obj) {
            if (obj[item] instanceof Object) {
                obj[item] = JSON.stringify(obj[item]);
            }
            paraStr += item + '=' + encodeURIComponent(obj[item]) + '&';
        }
        return paraStr.substring(0, paraStr.length-1);
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
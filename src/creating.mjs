import setText, { appendText, test } from "./results.mjs";

// export function timeout() {

//     const wait = new Promise(resolve => {
//             setTimeout(() => {
//                 resolve("Here is the result")
//             }, 1500);
//     });

//     wait.then(text => {
//         setText(text);
//         test(text);
//         console.log(`This is the result received from promise: ${text}`);
//     })
// }

export function timeout() {

    const wait = new Promise(resolve => {
        const exchangeRate = { usd: 17, gbp: 20 };

        setTimeout(() => {
            resolve(exchangeRate);
        }, 1500);
    });

    wait.then(({gbp}) => {
        setText(gbp);
        console.log(`The rate for gbp is: ${gbp}`);
    });
}

export function interval() {
}

export function clearIntervalChain() {
}

export function xhr() {

    let request = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/2");
        xhr.onload = () => {
            if(xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.statusText);
                console.log(`Error: ${xhr.statusText}`);
            }
        };
        xhr.send();
    });

    request.then(({firstName}) => {
        setText(firstName);
    }).catch(error => setText(error));

}

export function allPromises() {
    const categories = axios.get("http://localhost:3000/itemCategories");
    const statuses = axios.get("http://localhost:3000/orderStatuses");
    const userTypes = axios.get("http://localhost:3000/userTypes");

    Promise.all([categories, statuses, userTypes])
        .then(([cats, stats, types]) => {
            setText("Here are the results: ");
            appendText(JSON.stringify(cats));
            appendText(JSON.stringify(stats));
            appendText(JSON.stringify(types));
        });
}

export function allSettled() {
}

export function race() {
}

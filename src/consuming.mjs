import setText, { appendText, showWaiting, hideWaiting } from './results.mjs';

export function get() {
    axios.get("http://localhost:3000/orders/1")
        .then(({ data }) => {
            return { ...data, range: 15 };
        }).then(({ range }) => setText(range));

    // axios.get("http://localhost:3000/orders/1")
    // .then((result) => {
    //     console.log(`Result from Axios:  ${result}`);
    //     return { ...result.data, range: 15 };
    // }).then(({ range }) => setText(range));
}

export function getCatch() {
    axios.get("http://localhost:3000/orders/123")
        .then(({ data }) => {
            setText(JSON.stringify(data));
        })
        .catch(err => setText(err));
}

export function chain() {
    axios.get("http://localhost:3000/orders/1")
        .then(({ data }) => { return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`); })
        .then(({ data }) => setText(`City: ${data.city}`));
}

export function chainCatch() {
    axios.get("http://localhost:3000/orders/1")
        .then(({ data }) => {
            axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
            throw new Error("This is an error..");
        })
        .catch(err => {
            setText(err);
            throw new Error("This is the second error...");
        })
        .then(({ data }) => setText(`City: ${data.me.city}`))
        .catch(err => setText(err));
}
export function final() {
    showWaiting();
    axios.get("http://localhost:3000/orders/1")
        .then(({ data }) => {
            return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
        })
        .then(({ data }) => {
            setText(`City: ${data.city}`);
            // throw new Error("Hello I'm the error HAAAA");
        })
        .catch(err =>
            setText(err))
        .finally(() => {
            setTimeout(() => {
                hideWaiting();
            }, 1500);

            appendText("---- Finally Done!!!");
        });

}
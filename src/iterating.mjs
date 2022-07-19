import setText, { appendText } from './results.mjs';

export async function get() {
    await testGet().then((data) => {
        setText("HEREEEEEEE" + JSON.stringify(data));
    });

    const { data } = await axios.get("http://localhost:3000/orders/1");
    console.log("Text is set..");
    setText(JSON.stringify(data));
    test();
}

export async function testGet() {
    const wait = new Promise((resolve, rejected) => {
        const { data } = axios.get("http://localhost:3000/orders/2");
        setTimeout(() => {
            console.log("Test is executed..");
            resolve(data);
        }, 1500);
    });

    return wait;
}

export async function asyncSetText(text) {
    setText(text);
}

export function getCatch() {
}

export async function chain() {
    const {data} = await axios.get("http://localhost:3000/orders/1");
    const { data: address } = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    setText(`City: ${JSON.stringify(address.city)}`);
}

export function concurrent() {
}

export function parallel() {
}

function test() {
    console.log("After text is set..");
}

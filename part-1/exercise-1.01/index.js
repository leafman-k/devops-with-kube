const stringGenerator = (length)=> {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charLength = chars.length;

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }

    return result;
}
const randomString = stringGenerator(20);
const printToConsole = () => {
    const dateTime = new Date().toISOString();
    console.log(`${dateTime}: ${randomString}`);
}
setInterval(printToConsole, 5000);
const generateToken=() => Math.random().toString(32) + Date.now().toString(32);
export default generateToken;
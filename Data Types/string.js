import client from "../client.js";
async function init(){
    //Get and Set
    await client.set("user:2","ABC");
    const getVal = await client.get("user:2");
    console.log("Result of set = ",getVal);
    const result = await client.get('user:1');
    console.log("Result = ",result);
    //Expire
    // await client.expire("user:2",10);
    // const expireVal = await client.get("user:3");
    // console.log("Expiry Value in 10 seconds = ",expireVal);
    
}
init();
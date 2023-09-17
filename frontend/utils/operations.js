import { tezos } from "./tezos";

export const addProduct = async (productID, productName, description) => {
    try {
        const contractInstance = await tezos.wallet.at("KT1KAUbe1gsdw5BeVQfgjh9xZFrHrKVs8ApD");
        const op = await contractInstance.methods.add_product(
            description, productID, productName
        ).send();
        await op.confirmation();
    } catch (err) {
        throw err;
    }
};

export const updateProduct = async (latitude, longitude, productID, statusDescription, time) => {
    console.log(latitude, longitude, productID, statusDescription, time);
    console.log(typeof latitude);
    try {
        const contractInstance = await tezos.wallet.at("KT1KAUbe1gsdw5BeVQfgjh9xZFrHrKVs8ApD");
        const op = await contractInstance.methods.update_status(latitude,longitude,productID,statusDescription,time.toString()).send();
        await op.confirmation();
    } catch (err) {
        throw err;
    }
};

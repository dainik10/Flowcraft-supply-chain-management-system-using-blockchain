import { BeaconWallet } from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet({
  name: "FlowCraft",
  preferredNetwork: "Sepolia Faucet",
});

export const connectWallet = async () => {
  await wallet.requestPermissions({ network: { type: "sepolia-faucet" } });
};

export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.address;
  } else {
    return "";
  }
};

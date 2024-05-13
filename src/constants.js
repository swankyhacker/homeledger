export const chain = {
  ownerPrivateKey:
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  depositFee: 0.2,
  propertyCheckerContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  propertyNFTContract: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
  auctionManagerContract: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  bidStakePercent: 0.1,
  auctionStake: 0.2,
  transactionFields: (tx, propertyId, user) => {
    return {
      data: tx.data,
      from: tx.from,
      hash: tx.hash,
      nonce: tx.nonce,
      r: tx.r ? tx.r : null,
      s: tx.s ? tx.s : null,
      to: tx.to,
      propertyId,
      user,
      timestamp: Date.now(),
    };
  },
};

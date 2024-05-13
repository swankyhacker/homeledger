module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    await deploy("AuctionManager", {
      from: deployer,
      args: [],
      log: true,
    });
    console.log("Contract AuctionManager has been deployed by", deployer);
  };
  module.exports.tags = ["AuctionManager"];
  
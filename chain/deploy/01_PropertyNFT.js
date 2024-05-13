module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    await deploy("PropertyNFT", {
      from: deployer,
      args: [],
      log: true,
    });
    console.log("Contract PropertyNFT has been deployed by", deployer);
  };
  module.exports.tags = ["PropertyNFT"];
  
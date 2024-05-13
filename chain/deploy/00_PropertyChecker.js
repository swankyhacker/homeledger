module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("PropertyChecker", {
    from: deployer,
    args: [],
    log: true,
  });
  console.log("Contract PropertyChecker has been deployed by", deployer);
};
module.exports.tags = ["PropertyChecker"];

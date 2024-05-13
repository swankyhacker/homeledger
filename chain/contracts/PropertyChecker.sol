// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyChecker {
    mapping(string => address payable) propertyToAddress;
    mapping(string => uint256) propertyToStake;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }
    function depositStake(string memory _property) public payable {
        propertyToAddress[_property] = payable(msg.sender);
        propertyToStake[_property] += msg.value;
    }

    function returnStake(string memory _property) public returns (address) {
        require(msg.sender == owner, "You are not the owner");
        propertyToAddress[_property].transfer(propertyToStake[_property]);
        propertyToStake[_property] = 0;
        return propertyToAddress[_property];
    }

    function confiscateStake(string memory _property) public {
        require(msg.sender == owner, "You are not the owner");
        owner.transfer(propertyToStake[_property]);
        propertyToStake[_property] = 0;
    }

    function getStakeAmount(
        string memory _property
    ) public view returns (uint256) {
        return propertyToStake[_property];
    }
}

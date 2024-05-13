// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuctionManager {
    struct Auction {
        string propertyId;
        bool isAuctionActive;
        mapping(address => uint256) addressToBid;
        mapping(address => uint256) addressToStake;
    }
    string propertyId;
    mapping(string => Auction) propertyToAuction;

    function addAuction(
        string memory _auctionId,
        string memory _propertyId
    ) public payable {
        Auction storage auction = propertyToAuction[_auctionId];
        auction.propertyId = _propertyId;
        auction.isAuctionActive = true;
        auction.addressToStake[msg.sender] += msg.value;
    }

    function stopAuction(string memory _auctionId) public {
        Auction storage auction = propertyToAuction[_auctionId];
        auction.isAuctionActive = false;
    }

    function addBid(string memory _auctionId, uint256 _value) public payable {
        Auction storage auction = propertyToAuction[_auctionId];
        auction.addressToBid[msg.sender] = _value;
        auction.addressToStake[msg.sender] = msg.value;
    }

    function updateBid(
        string memory _auctionId,
        uint256 _value
    ) public payable {
        Auction storage auction = propertyToAuction[_auctionId];
        require(
            auction.addressToBid[msg.sender] > 0,
            "You do not have an existing bid"
        );
        auction.addressToBid[msg.sender] = _value;
        auction.addressToStake[msg.sender] += msg.value;
    }

    function removeBid(string memory _auctionId) public {
        Auction storage auction = propertyToAuction[_auctionId];
        require(
            auction.addressToBid[msg.sender] > 0,
            "You do not have an existing bid"
        );
        returnStake(_auctionId, payable(msg.sender));
        auction.addressToBid[msg.sender] = 0;
    }

    function returnStake(
        string memory _auctionId,
        address payable _bidder
    ) public {
        Auction storage auction = propertyToAuction[_auctionId];
        require(
            auction.addressToBid[msg.sender] > 0,
            "You do not have an existing bid"
        );
        _bidder.transfer(auction.addressToStake[_bidder]);
        auction.addressToStake[_bidder] = 0;
    }

    function isAuctionActive(
        string memory _auctionId
    ) public view returns (bool) {
        Auction storage auction = propertyToAuction[_auctionId];
        return auction.isAuctionActive;
    }

    function auctionProperty(
        string memory _auctionId
    ) public view returns (string memory) {
        Auction storage auction = propertyToAuction[_auctionId];
        return auction.propertyId;
    }

    function getBid(string memory _auctionId) public view returns (uint256) {
        Auction storage auction = propertyToAuction[_auctionId];
        return auction.addressToBid[msg.sender];
    }
}

export default [
  "function addAuction(string memory _auctionId, string memory _propertyId) public payable",
  "function stopAuction(string memory _auctionId) public",
  "function addBid(string memory _auctionId, uint256 _value) public payable",
  "function updateBid(string memory _auctionId, uint256 _value) public payable",
  "function removeBid(string memory _auctionId) public",
  "function returnStake(string memory _auctionId, address payable _bidder) public",
  "function isAuctionActive(string memory _auctionId) public view returns (bool)",
  "function auctionProperty(string memory _auctionId) public view returns (string memory)",
  "function getBid(string memory _auctionId) public view returns (uint256)",
];

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PropertyNFT is ERC721URIStorage {
    uint256 tokenId = 0;
    mapping(string => uint256) propertyIdToTokenId;

    constructor() ERC721("HomeLedger", "HOME") {}

    function mintProperty(
        string memory _propertyId,
        string memory tokenURI
    ) public returns (uint256) {
        tokenId = tokenId += 1;
        propertyIdToTokenId[_propertyId] = tokenId;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    function ownerOfNFT(
        string memory _propertyId
    ) public view returns (address) {
        return ownerOf(propertyIdToTokenId[_propertyId]);
    }

    function getTokenId(
        string memory _propertyId
    ) public view returns (uint256) {
        return (propertyIdToTokenId[_propertyId]);
    }
}

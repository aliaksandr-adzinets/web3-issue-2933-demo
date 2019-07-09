pragma solidity ^0.5.10;

contract ERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    function transferFrom(address from, address to, uint256 tokenId) public {
        emit Transfer(from, to, tokenId);
    }
}

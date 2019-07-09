pragma solidity ^0.5.10;

contract ERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        emit Transfer(from, to, value);
        return true;
    }
}

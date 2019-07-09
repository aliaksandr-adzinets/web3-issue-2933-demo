pragma solidity ^0.5.10;

import "./ERC20.sol";
import "./ERC721.sol";

contract Main {
    event MainTransfer(address indexed _addrMain, address indexed _addrERC20, address indexed _addrERC721);
    address addrERC20;
    address addrERC721;
    constructor(address _addrERC20, address _addrERC721) public {
        addrERC20 = _addrERC20;
        addrERC721 = _addrERC721;
    }
    function transfer() public {
        emit MainTransfer(address(this), addrERC20, addrERC721);
        ERC20(addrERC20).transferFrom(addrERC20, address(this), 100000);
        ERC721(addrERC721).transferFrom(addrERC721, address(this), 777);
    }
}

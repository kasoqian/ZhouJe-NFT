// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "erc721a/contracts/ERC721A.sol";

contract ZhouJie is ERC721A {
    address PROXYADDRESS;
    address OWNER;

    string BASEURI;

    constructor(string memory baseURI) ERC721A("Zhou Jie", "ZJ") {
        OWNER = msg.sender;
        BASEURI = baseURI;
    }

    function mint(uint amount) external onlyOwner {
        _mint(owner(), amount);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length != 0
                ? string(abi.encodePacked(baseURI, _toString(tokenId), ".json"))
                : "";
    }

    function deleteContract() external onlyOwner {
        selfdestruct(payable(msg.sender));
    }

    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId, false);
    }

    function burnAll() external onlyOwner {
        for (uint index = 0; index < _nextTokenId(); index++) {
            _burn(index, false);
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return BASEURI;
    }

    function owner() public view virtual returns (address) {
        return OWNER;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        BASEURI = baseURI;
    }

    function setOwner(address _owner) external onlyOwner {
        OWNER = _owner;
    }

    function setProxyAddress(address proxyAddress) external onlyOwner {
        PROXYADDRESS = proxyAddress;
    }

    function contractURI() public view returns (string memory) {
        return
            "https://raw.githubusercontent.com/kasoqian/ZhouJe-NFT/main/contract/main.json";
    }

    fallback() external payable onlyOwner {
        (bool success, bytes memory res) = PROXYADDRESS.delegatecall(msg.data);
        res;
        assembly {
            let ptr := mload(0x40)
            returndatacopy(ptr, 0, returndatasize())
            switch success
            case 0 {
                revert(ptr, returndatasize())
            }
            default {
                return(ptr, returndatasize())
            }
        }
    }

    modifier onlyOwner() {
        require(msg.sender == OWNER, "Not owner!");
        _;
    }
}

// 0x2556f31C1b66407bFcD1012D841a02677627775F

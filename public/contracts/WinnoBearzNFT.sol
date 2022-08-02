// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract ContextMixin {
    function msgSender()
        internal
        view
        returns (address payable sender)
    {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            sender = payable(msg.sender);
        }
        return sender;
    }
}

contract WinnoBearzNFT is ERC721A, ContextMixin, Ownable {
    using SafeMath for uint256;

    uint256 public mintPrice;
    uint256 public mintDate;
    uint256 public maxSupply;
    uint256 public maxPerTransaction;
    uint256 public maxPerWallet;
    uint256 public currentGiveAway;
    uint256 public maxGiveAway;
    string internal baseTokenUri;
    uint256 internal numberPicked;
    address internal devWallet;
    address internal artistWallet;

    event PermanentURI(string _value, uint256 indexed _id);

    constructor(address _devWallet, address _artistWallet, string memory _baseTokenUri) payable ERC721A("WinnoBearz NFT", "WBZ") {
        mintPrice = 75 ether;
        mintDate = 1653004800;
        maxSupply = 5_555;
        maxPerTransaction = 30;
        maxPerWallet = 150;
        currentGiveAway = 0;
        maxGiveAway = 300;
        numberPicked = 0;
        devWallet = _devWallet;
        artistWallet = _artistWallet;
        baseTokenUri = _baseTokenUri;
    }
     
    function _startTokenId() internal pure override returns (uint256) 
    {
       
        return 1;
    }
    
    function contractURI() public view returns (string memory) {
        return bytes(_baseURI()).length != 0 ? string(abi.encodePacked(_baseURI(), "_contract.json")) : '';
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenUri;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        string memory baseURI = _baseURI();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json")) : '';
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function setArtistWallet(address payable _withdrawWallet) external onlyOwner {
        artistWallet = _withdrawWallet;
    }

    function setDevWallet(address payable _withdrawWallet) external onlyOwner {
        devWallet = _withdrawWallet;
    }

    function withdraw() external onlyOwner {
        require( totalSupply() > 0, "Minting a NFT first!");
        (,address _randomAddress) = pickRandomHolder();
        uint256 _amountRandomHolder = address(this).balance.mul(5).div(100);
        (bool success, ) = _randomAddress.call{value: _amountRandomHolder}('');
        require(success, 'withdraw radom holder failed!');
        numberPicked++;

        uint256 _amountWithdraw =  address(this).balance.mul(45).div(100);
        (success, ) = devWallet.call{value: _amountWithdraw}('');
        require(success, 'withdraw dev failed!');
        (success, ) = artistWallet.call{value: address(this).balance}('');
        require(success, 'withdraw artist failed!');
    }

    function mint(uint256 _quantity) public payable {
        require(block.timestamp >= mintDate, 'before mint date!');
        require(msg.value == _quantity * mintPrice, 'wrong mint value!');
        require(_quantity <= maxPerTransaction, 'exceed max mint!');
        require(balanceOf(msg.sender) + _quantity <= maxPerWallet, 'exceed max wallet!');
        require(totalSupply() + _quantity <= maxSupply, 'sold out!');
        uint i= totalSupply();
        uint z= totalSupply() + _quantity;
        _safeMint(msg.sender, _quantity);
        while( i < z ){
            emit PermanentURI(tokenURI(i+1), i+1);
            i++;
        }
    }

    function giveAway(address reciever, uint256 _quantity) public onlyOwner {
        require(block.timestamp >= mintDate, 'before mint date!');
        require(reciever != address(0), 'address 0!');
        require(currentGiveAway + _quantity <= maxGiveAway, 'sold out!');
        _safeMint(reciever, _quantity);
        currentGiveAway += _quantity;
    }

    function pickRandomHolder() private view returns (uint, address) {
        uint randomId = uint(keccak256(abi.encodePacked(numberPicked, block.timestamp, totalSupply()*8, msg.sender)))%totalSupply();
        return (randomId, address(ownerOf(randomId)));
    }

/**
   * Override isApprovedForAll to auto-approve OS's proxy contract
   */
   
    function isApprovedForAll(
        address _owner,
        address _operator
    ) public override view returns (bool isOperator) {
        if (_operator == address(0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101)) {
            return true;
        }
        
        return ERC721A.isApprovedForAll(_owner, _operator);
    }

    function _msgSender()
        internal
        override
        view
        returns (address sender)
    {
        return ContextMixin.msgSender();
    }
    
}


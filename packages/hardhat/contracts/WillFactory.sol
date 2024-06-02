// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Will.sol";

contract WillFactory {
	mapping(address => address) public wills;

	event WillCreated(address indexed owner, address willContract);

	function createWill() public {
		require(
			wills[msg.sender] == address(0),
			"Will already exists for this address"
		);
		Will newWill = new Will(msg.sender);
		wills[msg.sender] = address(newWill);
		emit WillCreated(msg.sender, address(newWill));
	}

	function getWillAddress(address _owner) public view returns (address) {
		return wills[_owner];
	}
}

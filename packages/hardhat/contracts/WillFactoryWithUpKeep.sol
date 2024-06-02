// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { LinkTokenInterface } from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "./Will.sol";

struct RegistrationParams {
	string name;
	bytes encryptedEmail;
	address upkeepContract;
	uint32 gasLimit;
	address adminAddress;
	uint8 triggerType;
	bytes checkData;
	bytes triggerConfig;
	bytes offchainConfig;
	uint96 amount;
}

interface AutomationRegistrarInterface {
	function registerUpkeep(
		RegistrationParams calldata requestParams
	) external returns (uint256);
}

contract WillFactory {
	mapping(address => address) public wills;
	LinkTokenInterface public immutable i_link;
	AutomationRegistrarInterface public immutable i_registrar;

	event WillCreated(address indexed owner, address willContract);
	event UpkeepRegistered(address indexed willContract, uint256 upkeepId);

	constructor(
		LinkTokenInterface link,
		AutomationRegistrarInterface registrar
	) {
		i_link = link;
		i_registrar = registrar;
	}

	function createWill() public {
		require(
			wills[msg.sender] == address(0),
			"Will already exists for this address"
		);
		Will newWill = new Will(msg.sender);
		wills[msg.sender] = address(newWill);
		emit WillCreated(msg.sender, address(newWill));

		// Register the newWill contract with Chainlink Automation
		bytes memory checkData = abi.encode(newWill);
		RegistrationParams memory upKeepParams = RegistrationParams({
			name: "Will Upkeep",
			encryptedEmail: bytes(0x0), // no email
			upkeepContract: address(newWill),
			gasLimit: 15000,
			adminAddress: msg.sender,
			triggerType: 2, // LINK
			checkData: checkData,
			triggerConfig: bytes(0x0),
			offchainConfig: bytes(0x0),
		});
		uint256 upkeepId = registerAndPredictID(upKeepParams);

		emit UpkeepRegistered(address(newWill), upkeepId);
	}

	function registerAndPredictID(RegistrationParams memory params) public returns(uint256) {
		// LINK must be approved for transfer - this can be done every time or once
		// with an infinite approval
		i_link.approve(address(i_registrar), params.amount);
		uint256 upkeepID = i_registrar.registerUpkeep(params);
		if (upkeepID != 0) {
			// DEV - Use the upkeepID however you see fit
			return upkeepID;
		} else {
			revert("auto-approve disabled");
		}
	}

	function getWillAddress(address _owner) public view returns (address) {
		return wills[_owner];
	}
}

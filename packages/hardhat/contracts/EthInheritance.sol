// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract EthInheritance is AutomationCompatibleInterface {
    address public owner;
    mapping(address => uint256) public beneficiaries;
    address[] public beneficiaryAddresses;
    uint256 public lockTime;
    bool public fundsLocked;
    bool public distributed;

    event BeneficiaryAdded(address beneficiary, uint256 amount);
    event FundsLocked(uint256 lockTime);
    event FundsReleased();

    constructor() {
        owner = msg.sender;
        fundsLocked = false;
        distributed = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function addBeneficiary(address _beneficiary, uint256 _amount) external onlyOwner {
        //require(!fundsLocked, "Funds are already locked");
        if (beneficiaries[_beneficiary] == 0) {
            beneficiaryAddresses.push(_beneficiary);
        }
        beneficiaries[_beneficiary] = _amount;
        emit BeneficiaryAdded(_beneficiary, _amount);
    }

    function lockFunds(uint256 _lockTime) external onlyOwner {
        require(address(this).balance > 0, "No funds to lock");
        lockTime = _lockTime;
        fundsLocked = true;
        emit FundsLocked(_lockTime);
    }

    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory) {
        upkeepNeeded = (block.timestamp >= lockTime && fundsLocked && !distributed);
    }

    function performUpkeep(bytes calldata) external override {
        require(block.timestamp >= lockTime, "Lock time not reached");
        require(fundsLocked, "Funds are not locked");
        require(!distributed, "Funds already distributed");

        for (uint256 i = 0; i < beneficiaryAddresses.length; i++) {
            address beneficiary = beneficiaryAddresses[i];
            uint256 amount = beneficiaries[beneficiary];
            if (amount > 0) {
                payable(beneficiary).transfer(amount);
                beneficiaries[beneficiary] = 0; // Reset the beneficiary's amount after transfer
            }
        }
        distributed = true;
        emit FundsReleased();
    }

    function getBeneficiaries() public view returns (address[] memory, uint256[] memory) {
        uint256 length = beneficiaryAddresses.length;
        uint256[] memory values = new uint256[](length);

        for (uint256 i = 0; i < beneficiaryAddresses.length; i++) {
            address beneficiary = beneficiaryAddresses[i];
            uint256 amount = beneficiaries[beneficiary];
            values[i] = amount;
        }

        return (beneficiaryAddresses, values);
    }

    function getBlockTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}
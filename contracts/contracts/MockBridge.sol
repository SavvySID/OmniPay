// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRouterReceiverLike {
    function receiveUSDT(address recipient, uint256 amount) external;
}

// Minimal mock bridge identical in behavior to MockAxelarBridge for this MVP
contract MockBridge {
    address public receiver;

    event CrossChainMessageSent(uint16 indexed destChainId, bytes payload);

    constructor(address _receiver) {
        receiver = _receiver;
    }

    function setReceiver(address _receiver) external {
        receiver = _receiver;
    }

    function sendCrossChainMessage(uint16 destChainId, bytes calldata payload) external payable {
        emit CrossChainMessageSent(destChainId, payload);
        (address recipient, uint256 amount) = abi.decode(payload, (address, uint256));
        IRouterReceiverLike(receiver).receiveUSDT(recipient, amount);
    }
}



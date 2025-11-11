// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

interface IRouterReceiverLike {
    function receiveUSDT(address recipient, uint256 amount) external;
}

// Simple mock bridge used for local/testnet simulation.
// It immediately calls the destination router's receive method on the same chain for demo purposes.
contract MockAxelarBridge {
    // In a real bridge, mapping of chainId => router address on destination would be used.
    // For simplicity, store a single receiver address (e.g., the same chain deployment for mock flow).
    address public receiver;

    event CrossChainMessageSent(uint32 indexed destChainId, bytes payload);

    constructor(address _receiver) {
        receiver = _receiver;
    }

    function setReceiver(address _receiver) external {
        receiver = _receiver;
    }

    function sendCrossChainMessage(uint32 destChainId, bytes calldata payload) external payable {
        emit CrossChainMessageSent(destChainId, payload);

        // Decode and immediately forward for demo
        (address recipient, uint256 amount) = abi.decode(payload, (address, uint256));
        IRouterReceiverLike(receiver).receiveUSDT(recipient, amount);
    }
}



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

interface IBridge {
    function sendCrossChainMessage(
        uint32 destChainId,
        bytes calldata payload
    ) external payable;
}

contract OmniPayRouter {
    address public usdt;
    address public bridge;

    event CrossChainUSDTInitiated(address indexed sender, uint256 amount, uint32 destChainId, address indexed recipient);
    event USDTReceived(address indexed recipient, uint256 amount);

    constructor(address _usdt, address _bridge) {
        usdt = _usdt;
        bridge = _bridge;
    }

    function sendCrossChainUSDT(
        uint256 amount,
        uint32 destChainId,
        address recipient
    ) external payable {
        require(usdt != address(0), "USDT not configured");
        require(bridge != address(0), "Bridge not configured");
        require(amount > 0, "Amount must be > 0");
        IERC20(usdt).transferFrom(msg.sender, address(this), amount);

        bytes memory payload = abi.encode(recipient, amount);
        IBridge(bridge).sendCrossChainMessage(destChainId, payload);
        emit CrossChainUSDTInitiated(msg.sender, amount, destChainId, recipient);
    }

    // In production, this would have access control (only bridge).
    function receiveUSDT(address recipient, uint256 amount) external {
        require(msg.sender == bridge, "Only bridge");
        IERC20(usdt).transfer(recipient, amount);
        emit USDTReceived(recipient, amount);
    }
}



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBridge {
    function sendCrossChainMessage(
        uint16 destChainId,
        bytes calldata payload
    ) external payable;
}



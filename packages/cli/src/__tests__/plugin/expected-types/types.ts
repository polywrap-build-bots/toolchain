// @ts-noCheck
import * as Types from "./";

import {
  Client,
  InvokeApiResult
} from "@web3api/core-js";

export type UInt = number;
export type UInt8 = number;
export type UInt16 = number;
export type UInt32 = number;
export type Int = number;
export type Int8 = number;
export type Int16 = number;
export type Int32 = number;
export type Bytes = Uint8Array;
export type BigInt = string;
export type String = string;
export type Boolean = boolean;

export interface Object {
  u: UInt;
  array: Array<Boolean>;
  bytes?: Bytes | undefined;
}

/// Imported Objects START ///

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Connection {
  node?: String | undefined;
  networkNameOrChainId?: String | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxOverrides {
  gasLimit?: BigInt | undefined;
  gasPrice?: BigInt | undefined;
  value?: BigInt | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_StaticTxResult {
  result: String;
  error: Boolean;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxRequest {
  to?: String | undefined;
  from?: String | undefined;
  nonce?: UInt32 | undefined;
  gasLimit?: BigInt | undefined;
  gasPrice?: BigInt | undefined;
  data?: String | undefined;
  value?: BigInt | undefined;
  chainId?: UInt32 | undefined;
  type?: UInt32 | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxReceipt {
  to: String;
  from: String;
  contractAddress: String;
  transactionIndex: UInt32;
  root?: String | undefined;
  gasUsed: BigInt;
  logsBloom: String;
  transactionHash: String;
  logs: Array<Types.Ethereum_Log>;
  blockNumber: BigInt;
  blockHash: String;
  confirmations: UInt32;
  cumulativeGasUsed: BigInt;
  effectiveGasPrice: BigInt;
  byzantium: Boolean;
  type: UInt32;
  status?: UInt32 | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Log {
  blockNumber: BigInt;
  blockHash: String;
  transactionIndex: UInt32;
  removed: Boolean;
  address: String;
  data: String;
  topics: Array<String>;
  transactionHash: String;
  logIndex: UInt32;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_EventNotification {
  data: String;
  address: String;
  log: Types.Ethereum_Log;
}

/// Imported Objects END ///

/// Imported Queries START ///

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_callContractView extends Record<string, unknown> {
  address: String;
  method: String;
  args?: Array<String> | undefined;
  connection?: Types.Ethereum_Connection | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_callContractStatic extends Record<string, unknown> {
  address: String;
  method: String;
  args?: Array<String> | undefined;
  connection?: Types.Ethereum_Connection | undefined;
  txOverrides?: Types.Ethereum_TxOverrides | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_encodeParams extends Record<string, unknown> {
  types: Array<String>;
  values: Array<String>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerAddress extends Record<string, unknown> {
  connection?: Types.Ethereum_Connection | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerBalance extends Record<string, unknown> {
  blockTag?: BigInt | undefined;
  connection?: Types.Ethereum_Connection | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerTransactionCount extends Record<string, unknown> {
  blockTag?: BigInt | undefined;
  connection?: Types.Ethereum_Connection | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getGasPrice extends Record<string, unknown> {
  connection?: Types.Ethereum_Connection | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_estimateTransactionGas extends Record<string, unknown> {
  tx: Types.Ethereum_TxRequest;
  connection?: Types.Ethereum_Connection | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_estimateContractCallGas extends Record<string, unknown> {
  address: String;
  method: String;
  args?: Array<String> | undefined;
  connection?: Types.Ethereum_Connection | undefined;
  txOverrides?: Types.Ethereum_TxOverrides | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_checkAddress extends Record<string, unknown> {
  address: String;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_toWei extends Record<string, unknown> {
  eth: String;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_toEth extends Record<string, unknown> {
  wei: BigInt;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_awaitTransaction extends Record<string, unknown> {
  txHash: String;
  confirmations: UInt32;
  timeout: UInt32;
  connection?: Types.Ethereum_Connection | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_waitForEvent extends Record<string, unknown> {
  address: String;
  event: String;
  args?: Array<String> | undefined;
  timeout?: UInt32 | undefined;
  connection?: Types.Ethereum_Connection | undefined;
}

/* URI: "ens/ethereum.web3api.eth" */
export const Ethereum_Query = {
  callContractView: async (
    input: Ethereum_Query_Input_callContractView,
    client: Client
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "callContractView",
      input
    });
  },

  callContractStatic: async (
    input: Ethereum_Query_Input_callContractStatic,
    client: Client
  ): Promise<InvokeApiResult<Types.Ethereum_StaticTxResult>> => {
    return client.invoke<Types.Ethereum_StaticTxResult>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "callContractStatic",
      input
    });
  },

  encodeParams: async (
    input: Ethereum_Query_Input_encodeParams,
    client: Client
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "encodeParams",
      input
    });
  },

  getSignerAddress: async (
    input: Ethereum_Query_Input_getSignerAddress,
    client: Client
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "getSignerAddress",
      input
    });
  },

  getSignerBalance: async (
    input: Ethereum_Query_Input_getSignerBalance,
    client: Client
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "getSignerBalance",
      input
    });
  },

  getSignerTransactionCount: async (
    input: Ethereum_Query_Input_getSignerTransactionCount,
    client: Client
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "getSignerTransactionCount",
      input
    });
  },

  getGasPrice: async (
    input: Ethereum_Query_Input_getGasPrice,
    client: Client
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "getGasPrice",
      input
    });
  },

  estimateTransactionGas: async (
    input: Ethereum_Query_Input_estimateTransactionGas,
    client: Client
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "estimateTransactionGas",
      input
    });
  },

  estimateContractCallGas: async (
    input: Ethereum_Query_Input_estimateContractCallGas,
    client: Client
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "estimateContractCallGas",
      input
    });
  },

  checkAddress: async (
    input: Ethereum_Query_Input_checkAddress,
    client: Client
  ): Promise<InvokeApiResult<Boolean>> => {
    return client.invoke<Boolean>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "checkAddress",
      input
    });
  },

  toWei: async (
    input: Ethereum_Query_Input_toWei,
    client: Client
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "toWei",
      input
    });
  },

  toEth: async (
    input: Ethereum_Query_Input_toEth,
    client: Client
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "toEth",
      input
    });
  },

  awaitTransaction: async (
    input: Ethereum_Query_Input_awaitTransaction,
    client: Client
  ): Promise<InvokeApiResult<Types.Ethereum_TxReceipt>> => {
    return client.invoke<Types.Ethereum_TxReceipt>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "awaitTransaction",
      input
    });
  },

  waitForEvent: async (
    input: Ethereum_Query_Input_waitForEvent,
    client: Client
  ): Promise<InvokeApiResult<Types.Ethereum_EventNotification>> => {
    return client.invoke<Types.Ethereum_EventNotification>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "waitForEvent",
      input
    });
  }
}

/// Imported Queries END ///

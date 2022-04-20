/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

// @ts-ignore
import * as Types from "./";

// @ts-ignore
import { Client, InvokeApiResult } from "@web3api/core-js";

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
export type Json = string;
export type String = string;
export type Boolean = boolean;

/// Imported Objects START ///

/* URI: "ens/uri-resolver.core.web3api.eth" */
export interface UriResolver_MaybeUriOrManifest {
  uri?: string | null;
  manifest?: string | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Connection {
  node?: string | null;
  networkNameOrChainId?: string | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxOverrides {
  gasLimit?: BigInt | null;
  gasPrice?: BigInt | null;
  value?: BigInt | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_StaticTxResult {
  result: string;
  error: boolean;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxRequest {
  to?: string | null;
  from?: string | null;
  nonce?: UInt32 | null;
  gasLimit?: BigInt | null;
  gasPrice?: BigInt | null;
  data?: string | null;
  value?: BigInt | null;
  chainId?: BigInt | null;
  type?: UInt32 | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: UInt32;
  root?: string | null;
  gasUsed: BigInt;
  logsBloom: string;
  transactionHash: string;
  logs: Array<Types.Ethereum_Log>;
  blockNumber: BigInt;
  blockHash: string;
  confirmations: UInt32;
  cumulativeGasUsed: BigInt;
  effectiveGasPrice: BigInt;
  byzantium: boolean;
  type: UInt32;
  status?: UInt32 | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Log {
  blockNumber: BigInt;
  blockHash: string;
  transactionIndex: UInt32;
  removed: boolean;
  address: string;
  data: string;
  topics: Array<string>;
  transactionHash: string;
  logIndex: UInt32;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_EventNotification {
  data: string;
  address: string;
  log: Types.Ethereum_Log;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Network {
  name: string;
  chainId: BigInt;
  ensAddress?: string | null;
}

/// Imported Objects END ///

/// Imported Queries START ///

/* URI: "ens/uri-resolver.core.web3api.eth" */
interface UriResolver_Query_Input_tryResolveUri
  extends Record<string, unknown> {
  authority: string;
  path: string;
}

/* URI: "ens/uri-resolver.core.web3api.eth" */
interface UriResolver_Query_Input_getFile extends Record<string, unknown> {
  path: string;
}

/* URI: "ens/uri-resolver.core.web3api.eth" */
export const UriResolver_Query = {
  tryResolveUri: async (
    input: UriResolver_Query_Input_tryResolveUri,
    client: Client
  ): Promise<InvokeApiResult<Types.UriResolver_MaybeUriOrManifest | null>> => {
    return client.invoke<Types.UriResolver_MaybeUriOrManifest | null>({
      uri: "ens/uri-resolver.core.web3api.eth",
      module: "query",
      method: "tryResolveUri",
      input,
    });
  },

  getFile: async (
    input: UriResolver_Query_Input_getFile,
    client: Client
  ): Promise<InvokeApiResult<Bytes | null>> => {
    return client.invoke<Bytes | null>({
      uri: "ens/uri-resolver.core.web3api.eth",
      module: "query",
      method: "getFile",
      input,
    });
  },
};

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_callContractView
  extends Record<string, unknown> {
  address: string;
  method: string;
  args?: Array<string> | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_callContractStatic
  extends Record<string, unknown> {
  address: string;
  method: string;
  args?: Array<string> | null;
  connection?: Types.Ethereum_Connection | null;
  txOverrides?: Types.Ethereum_TxOverrides | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getBalance extends Record<string, unknown> {
  address: string;
  blockTag?: BigInt | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_encodeParams extends Record<string, unknown> {
  types: Array<string>;
  values: Array<string>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_encodeFunction extends Record<string, unknown> {
  method: string;
  args?: Array<string> | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_solidityPack extends Record<string, unknown> {
  types: Array<string>;
  values: Array<string>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_solidityKeccak256
  extends Record<string, unknown> {
  types: Array<string>;
  values: Array<string>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_soliditySha256 extends Record<string, unknown> {
  types: Array<string>;
  values: Array<string>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerAddress
  extends Record<string, unknown> {
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerBalance
  extends Record<string, unknown> {
  blockTag?: BigInt | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerTransactionCount
  extends Record<string, unknown> {
  blockTag?: BigInt | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getGasPrice extends Record<string, unknown> {
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_estimateTransactionGas
  extends Record<string, unknown> {
  tx: Types.Ethereum_TxRequest;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_estimateContractCallGas
  extends Record<string, unknown> {
  address: string;
  method: string;
  args?: Array<string> | null;
  connection?: Types.Ethereum_Connection | null;
  txOverrides?: Types.Ethereum_TxOverrides | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_checkAddress extends Record<string, unknown> {
  address: string;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_toWei extends Record<string, unknown> {
  eth: string;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_toEth extends Record<string, unknown> {
  wei: BigInt;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_awaitTransaction
  extends Record<string, unknown> {
  txHash: string;
  confirmations: UInt32;
  timeout: UInt32;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_waitForEvent extends Record<string, unknown> {
  address: string;
  event: string;
  args?: Array<string> | null;
  timeout?: UInt32 | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getNetwork extends Record<string, unknown> {
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export const Ethereum_Query = {
  callContractView: async (
    input: Ethereum_Query_Input_callContractView,
    client: Client
  ): Promise<InvokeApiResult<string>> => {
    return client.invoke<string>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "callContractView",
      input,
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
      input,
    });
  },

  getBalance: async (
    input: Ethereum_Query_Input_getBalance,
    client: Client
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "getBalance",
      input,
    });
  },

  encodeParams: async (
    input: Ethereum_Query_Input_encodeParams,
    client: Client
  ): Promise<InvokeApiResult<string>> => {
    return client.invoke<string>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "encodeParams",
      input,
    });
  },

  encodeFunction: async (
    input: Ethereum_Query_Input_encodeFunction,
    client: Client
  ): Promise<InvokeApiResult<string>> => {
    return client.invoke<string>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "encodeFunction",
      input,
    });
  },

  solidityPack: async (
    input: Ethereum_Query_Input_solidityPack,
    client: Client
  ): Promise<InvokeApiResult<string>> => {
    return client.invoke<string>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "solidityPack",
      input,
    });
  },

  solidityKeccak256: async (
    input: Ethereum_Query_Input_solidityKeccak256,
    client: Client
  ): Promise<InvokeApiResult<string>> => {
    return client.invoke<string>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "solidityKeccak256",
      input,
    });
  },

  soliditySha256: async (
    input: Ethereum_Query_Input_soliditySha256,
    client: Client
  ): Promise<InvokeApiResult<string>> => {
    return client.invoke<string>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "soliditySha256",
      input,
    });
  },

  getSignerAddress: async (
    input: Ethereum_Query_Input_getSignerAddress,
    client: Client
  ): Promise<InvokeApiResult<string>> => {
    return client.invoke<string>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "getSignerAddress",
      input,
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
      input,
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
      input,
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
      input,
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
      input,
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
      input,
    });
  },

  checkAddress: async (
    input: Ethereum_Query_Input_checkAddress,
    client: Client
  ): Promise<InvokeApiResult<boolean>> => {
    return client.invoke<boolean>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "checkAddress",
      input,
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
      input,
    });
  },

  toEth: async (
    input: Ethereum_Query_Input_toEth,
    client: Client
  ): Promise<InvokeApiResult<string>> => {
    return client.invoke<string>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "toEth",
      input,
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
      input,
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
      input,
    });
  },

  getNetwork: async (
    input: Ethereum_Query_Input_getNetwork,
    client: Client
  ): Promise<InvokeApiResult<Types.Ethereum_Network>> => {
    return client.invoke<Types.Ethereum_Network>({
      uri: "ens/ethereum.web3api.eth",
      module: "query",
      method: "getNetwork",
      input,
    });
  },
};

/// Imported Queries END ///
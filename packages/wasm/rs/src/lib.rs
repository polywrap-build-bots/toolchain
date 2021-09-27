//! Polywrap Rust/WASM Runtime Library

#![no_std]

extern crate alloc;

pub mod abort;
pub mod big_int;
pub mod invoke;
pub mod json;
pub mod memory;
pub mod msgpack;
pub mod subinvoke;

pub use big_int::BigInt;
pub use invoke::InvokeArgs;
pub use json::JSON;
pub use msgpack::{Context, Read, ReadDecoder, Write, WriteEncoder, WriteSizer};
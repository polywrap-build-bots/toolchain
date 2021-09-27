use alloc::{boxed::Box, string::String, vec::Vec};
use polywrap_wasm_rs::{
    Context,
    Read,
    ReadDecoder,
    Write,
    WriteEncoder,
    WriteSizer,
};

use crate::TestImportObject;

#[derive(Clone, Debug)]
pub struct InputImportedMethod {
    pub str: String,
    pub object: Box<TestImportObject>,
    pub object_array: Vec<Box<TestImportObject>>,
}

pub fn serialize_imported_method_args(input: &InputImportedMethod) -> Vec<u8> {
    let mut sizer_context = Context::new();
    sizer_context.description = "Serializing (sizing) imported query-type: imported_method";
    let mut sizer = WriteSizer::new(sizer_context);
    write_imported_method_args(input, &mut sizer);
    let buffer: Vec<u8> = Vec::with_capacity(sizer.get_length() as usize);
    let mut encoder_context = Context::new();
    encoder_context.description = "Serializing (encoding) imported query-type: imported_method";
    let mut encoder = WriteEncoder::new(&buffer, encoder_context);
    write_imported_method_args(input, &mut encoder);
    buffer
}

pub fn write_imported_method_args<W: Write>(input: &InputImportedMethod, writer: &mut W) {
    writer.write_map_length(3);
    writer.context().push("str", "String", "writing property");
    writer.write_str("str");
    writer.write_string(&input.str);
    writer.context().pop();
    writer.context().push("object", "Box<TestImportObject>", "writing property");
    writer.write_str("object");
    TestImportObject::write(&input.object, writer);
    writer.context().pop();
    writer.context().push("object_array", "Vec<Box<TestImportObject>>", "writing property");
    writer.write_str("object_array");
    writer.write_array(&input.object_array, |writer: &mut W, item| {
        TestImportObject::write(item, writer);
    });
    writer.context().pop();
}

pub fn deserialize_imported_method_result(input: &[u8]) -> Option<Box<TestImportObject>> {
    let mut context = Context::new();
    context.description = "Deserializing imported query-type: imported_method";
    let mut reader = ReadDecoder::new(input, context);
    reader.context().push("imported_method", "Option<Box<TestImportObject>>", "reading function output");
    let mut object: Option<Box<TestImportObject>> = None;
    if !reader.is_next_nil() {
        object = Some(Box::new(TestImportObject::read(reader)));
    }
    let res = object;
    reader.context().pop();
    res
}

#[derive(Clone, Debug)]
pub struct InputAnotherMethod {
    pub arg: Vec<String>,
}

pub fn serialize_another_method_args(input: &InputAnotherMethod) -> Vec<u8> {
    let mut sizer_context = Context::new();
    sizer_context.description = "Serializing (sizing) imported query-type: another_method";
    let mut sizer = WriteSizer::new(sizer_context);
    write_another_method_args(input, &mut sizer);
    let buffer: Vec<u8> = Vec::with_capacity(sizer.get_length() as usize);
    let mut encoder_context = Context::new();
    encoder_context.description = "Serializing (encoding) imported query-type: another_method";
    let mut encoder = WriteEncoder::new(&buffer, encoder_context);
    write_another_method_args(input, &mut encoder);
    buffer
}

pub fn write_another_method_args<W: Write>(input: &InputAnotherMethod, writer: &mut W) {
    writer.write_map_length(1);
    writer.context().push("arg", "Vec<String>", "writing property");
    writer.write_str("arg");
    writer.write_array(&input.arg, |writer: &mut W, item| {
        writer.write_string(*item);
    });
    writer.context().pop();
}

pub fn deserialize_another_method_result(input: &[u8]) -> i32 {
    let mut context = Context::new();
    context.description = "Deserializing imported query-type: another_method";
    let mut reader = ReadDecoder::new(input, context);
    reader.context().push("another_method", "i32", "reading function output");
    let res = reader.read_i32().unwrap();
    reader.context().pop();
    res
}
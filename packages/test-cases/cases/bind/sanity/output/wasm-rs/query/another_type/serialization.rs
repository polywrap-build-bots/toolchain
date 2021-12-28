use std::convert::TryFrom;
use polywrap_wasm_rs::{
    BigInt,
    Context,
    Read,
    ReadDecoder,
    Write,
    WriteEncoder,
    WriteSizer,
    JSON
};
use crate::AnotherType;

use crate::CustomType;

pub fn serialize_another_type(input: &AnotherType) -> Vec<u8> {
    let mut sizer_context = Context::new();
    sizer_context.description = "Serializing (sizing) object-type: AnotherType".to_string();
    let mut sizer = WriteSizer::new(sizer_context);
    write_another_type(input, &mut sizer);
    let mut buffer: Vec<u8> = Vec::with_capacity(sizer.get_length() as usize);
    buffer.resize(sizer.get_length() as usize, 0);
    let mut encoder_context = Context::new();
    encoder_context.description = "Serializing (encoding) object-type: AnotherType".to_string();
    let mut encoder = WriteEncoder::new(&buffer, encoder_context);
    write_another_type(input, &mut encoder);
    encoder.get_buffer()
}

pub fn write_another_type<W: Write>(input: &AnotherType, writer: &mut W) {
    writer.write_map_length(2);
    writer.context().push("prop", "Option<String>", "writing property");
    writer.write_str("prop");
    writer.write_nullable_string(&input.prop);
    writer.context().pop();
    writer.context().push("circular", "Option<CustomType>", "writing property");
    writer.write_str("circular");
    if input.circular.is_some() {
        CustomType::write(input.circular.as_ref().as_ref().unwrap(), writer);
    } else {
        writer.write_nil();
    }
    writer.context().pop();
}

pub fn deserialize_another_type(input: &[u8]) -> AnotherType {
    let mut context = Context::new();
    context.description = "Deserializing object-type: AnotherType".to_string();
    let mut reader = ReadDecoder::new(input, context);
    read_another_type(&mut reader).expect("Failed to deserialize AnotherType")
}

pub fn read_another_type<R: Read>(reader: &mut R) -> Result<AnotherType, String> {
    let mut num_of_fields = reader.read_map_length().unwrap();

    let mut _prop: Option<String> = None;
    let mut _circular: Option<CustomType> = None;

    while num_of_fields > 0 {
        num_of_fields -= 1;
        let field = reader.read_string().unwrap();

        match field.as_str() {
            "prop" => {
                reader.context().push(&field, "Option<String>", "type found, reading property");
                _prop = reader.read_nullable_string();
                reader.context().pop();
            }
            "circular" => {
                reader.context().push(&field, "Option<CustomType>", "type found, reading property");
                let mut object: Option<CustomType> = None;
                if !reader.is_next_nil() {
                    object = Some(CustomType::read(reader));
                }
                _circular = object;
                reader.context().pop();
            }
            _ => {}
        }
    }

    Ok(AnotherType {
        prop: _prop,
        circular: _circular,
    })
}
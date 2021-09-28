pub mod wrapped;
pub use wrapped::{
    mutation_method_wrapped,
    object_method_wrapped,
};
pub mod serialization;
pub use serialization::{
    deserialize_mutation_method_args,
    deserialize_object_method_args,
    serialize_mutation_method_result,
    serialize_object_method_result,
    InputMutationMethod,
    InputObjectMethod,
};
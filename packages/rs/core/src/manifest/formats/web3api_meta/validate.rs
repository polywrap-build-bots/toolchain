use std::collections::HashMap;
use std::fs;

use super::AnyMetaManifest;
use valico::json_schema;

type MetaManifestSchemas = HashMap<&'static str, serde_json::Value>;

fn generate_schemas() -> MetaManifestSchemas {
    let schema_0_0_1_prealpha_1_path =
        "../../../../../../packages/manifest-schemas/formats/web3api.meta/0.0.1-prealpha.1.json";

    let schema_0_0_1_prealpha_1: serde_json::Value =
        serde_json::from_str(&fs::read_to_string(schema_0_0_1_prealpha_1_path).unwrap()).unwrap();

    let mut schemas: MetaManifestSchemas = HashMap::new();

    let _ = schemas.insert("0.0.1-prealpha.1", schema_0_0_1_prealpha_1);
    schemas
}

pub fn validate_meta_manifest(
    manifest: &AnyMetaManifest,
    ext_schema: Option<serde_json::Value>,
) -> Result<(), String> {
    let manifest_format = AnyMetaManifest::get_manifest_format(manifest);
    let schemas = generate_schemas();
    let schema = schemas.get(manifest_format.as_str());
    if schema.is_none() {
        return Err(format!(
            "Unrecognized MetaManifest schema format {}\nmanifest: {:#?}",
            manifest_format, manifest
        ));
    }

    let mut scope = json_schema::Scope::new();
    let manifest_schema = match manifest {
        AnyMetaManifest::MetaManifest001Prealpha1(one) => {
            serde_json::json!(one)
        }
    };
    let scoped_schema = scope
        .compile_and_return(schema.unwrap().to_owned(), true)
        .ok()
        .expect("Validation errors encountered while sanitizing MetaManifest format");
    if !scoped_schema.validate(&manifest_schema.clone()).is_valid() {
        return Err("Got an invalid schema".to_string());
    }

    if ext_schema.is_some() {
        let scoped_schema = scope
            .compile_and_return(ext_schema.unwrap().to_owned(), true)
            .ok()
            .expect("Validation errors encountered while sanitizing ext schema");
        if !scoped_schema.validate(&manifest_schema).is_valid() {
            return Err("Invalid ext schema".to_string());
        }
    }

    Ok(())
}

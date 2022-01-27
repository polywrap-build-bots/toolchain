use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[link(wasm_import_module = "w3")]
extern "C" {
    /// Get Abort Arguments
    #[wasm_bindgen(js_name = __w3_abort)]
    pub fn __w3_abort(
        msg_ptr: u32,
        msg_len: u32,
        file_ptr: u32,
        file_len: u32,
        line: u32,
        column: u32,
    );
}

/// Helper for aborting
pub fn w3_abort_setup() {
    std::panic::set_hook(Box::new(|panic_info| {
        let message = match panic_info.payload().downcast_ref::<&str>() {
            Some(msg) => format!("{}", &msg),
            None => format!("unknown error"),
        };
        let msg_len = message.len() as u32;
        let location = panic_info.location();
        let file = match location {
            Some(location) => location.file(),
            None => "unknown file",
        };
        let file_len = file.len() as u32;
        let line = match location {
            Some(location) => location.line(),
            None => 0,
        };
        let column = match location {
            Some(location) => location.column(),
            None => 0,
        };
        __w3_abort(
            message.as_ptr() as u32,
            msg_len,
            file.as_ptr() as u32,
            file_len,
            line,
            column,
        );
    }))
}
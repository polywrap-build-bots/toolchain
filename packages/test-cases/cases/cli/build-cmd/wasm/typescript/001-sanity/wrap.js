function e(r,t=!0){if(void 0===r)return t?"undefined":void 0;if(null===r)return t?"null":void 0;if(Array.isArray(r))return r.map((r=>e(r,!1))).filter((e=>void 0!==e));if(r instanceof Error)return{message:r.message};if("function"==typeof r)return t?"function":void 0;if("object"!=typeof r)return r;for(let t in r){let n=e(r[t],!1);void 0===n?delete r[t]:r[t]=n}return r}e(function(){"use strict";class e{}class r extends e{method(e){return"Method called"}}return(new r)[__wrap_method](__wrap_args)}());
let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    }
}

let WASM_VECTOR_LEN = 0;

const ArrayStatsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_arraystats_free(ptr >>> 0, 1));

export class ArrayStats {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ArrayStats.prototype);
        obj.__wbg_ptr = ptr;
        ArrayStatsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ArrayStatsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_arraystats_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get mean() {
        const ret = wasm.__wbg_get_arraystats_mean(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set mean(arg0) {
        wasm.__wbg_set_arraystats_mean(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get median() {
        const ret = wasm.__wbg_get_arraystats_median(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set median(arg0) {
        wasm.__wbg_set_arraystats_median(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get std_dev() {
        const ret = wasm.__wbg_get_arraystats_std_dev(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set std_dev(arg0) {
        wasm.__wbg_set_arraystats_std_dev(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get min() {
        const ret = wasm.__wbg_get_arraystats_min(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set min(arg0) {
        wasm.__wbg_set_arraystats_min(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get max() {
        const ret = wasm.__wbg_get_arraystats_max(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set max(arg0) {
        wasm.__wbg_set_arraystats_max(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) ArrayStats.prototype[Symbol.dispose] = ArrayStats.prototype.free;

/**
 * @param {Float64Array} arr
 * @returns {ArrayStats}
 */
export function array_statistics(arr) {
    const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.array_statistics(ptr0, len0);
    return ArrayStats.__wrap(ret);
}

/**
 * @param {string} input
 * @returns {string}
 */
export function base64_encode(input) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.base64_encode(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {Float64Array} arr
 * @param {number} target
 * @returns {number}
 */
export function binary_search(arr, target) {
    const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.binary_search(ptr0, len0, target);
    return ret;
}

/**
 * @param {string} s
 * @returns {string}
 */
export function compress_string(s) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.compress_string(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {number} base
 * @param {number} exp
 * @returns {number}
 */
export function fast_power(base, exp) {
    const ret = wasm.fast_power(base, exp);
    return ret;
}

/**
 * @param {number} n
 * @returns {bigint}
 */
export function fibonacci(n) {
    const ret = wasm.fibonacci(n);
    return BigInt.asUintN(64, ret);
}

/**
 * @param {bigint} a
 * @param {bigint} b
 * @returns {bigint}
 */
export function gcd(a, b) {
    const ret = wasm.gcd(a, b);
    return BigInt.asUintN(64, ret);
}

/**
 * @param {Uint8Array} data
 * @returns {Uint8Array}
 */
export function grayscale_image(data) {
    const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.grayscale_image(ptr0, len0);
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}

/**
 * @param {bigint} n
 * @returns {boolean}
 */
export function is_prime(n) {
    const ret = wasm.is_prime(n);
    return ret !== 0;
}

/**
 * @param {bigint} a
 * @param {bigint} b
 * @returns {bigint}
 */
export function lcm(a, b) {
    const ret = wasm.lcm(a, b);
    return BigInt.asUintN(64, ret);
}

/**
 * @param {string} s1
 * @param {string} s2
 * @returns {number}
 */
export function levenshtein_distance(s1, s2) {
    const ptr0 = passStringToWasm0(s1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(s2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.levenshtein_distance(ptr0, len0, ptr1, len1);
    return ret >>> 0;
}

export function main() {
    wasm.main();
}

/**
 * @param {Float64Array} a
 * @param {number} a_rows
 * @param {number} a_cols
 * @param {Float64Array} b
 * @param {number} b_cols
 * @returns {Float64Array}
 */
export function matrix_multiply(a, a_rows, a_cols, b, b_cols) {
    const ptr0 = passArrayF64ToWasm0(a, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF64ToWasm0(b, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.matrix_multiply(ptr0, len0, a_rows, a_cols, ptr1, len1, b_cols);
    var v3 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v3;
}

/**
 * @param {Float64Array} arr
 * @param {number} window
 * @returns {Float64Array}
 */
export function moving_average(arr, window) {
    const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.moving_average(ptr0, len0, window);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {number} rows
 * @returns {Float64Array}
 */
export function pascal_triangle(rows) {
    const ret = wasm.pascal_triangle(rows);
    var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v1;
}

/**
 * @param {Float64Array} arr
 * @returns {Float64Array}
 */
export function quick_sort(arr) {
    const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.quick_sort(ptr0, len0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {string} s
 * @returns {string}
 */
export function reverse_string(s) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reverse_string(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {string} input
 * @returns {string}
 */
export function simple_hash(input) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.simple_hash(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {string} text1
 * @param {string} text2
 * @returns {number}
 */
export function text_similarity(text1, text2) {
    const ptr0 = passStringToWasm0(text1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(text2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.text_similarity(ptr0, len0, ptr1, len1);
    return ret;
}

/**
 * @param {Float64Array} arr
 * @returns {Float64Array}
 */
export function unique_array(arr) {
    const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.unique_array(ptr0, len0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {string} s
 * @returns {boolean}
 */
export function validate_json(s) {
    const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.validate_json(ptr0, len0);
    return ret !== 0;
}

export function __wbg___wbindgen_throw_dd24417ed36fc46e(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_externrefs;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
};

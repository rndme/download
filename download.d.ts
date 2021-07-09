declare function download (
  data:(
    string | Blob | ArrayBuffer |
    Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array |
    Int32Array | Uint32Array | Float32Array | Float64Array |
    BigInt64Array | BigUint64Array
  ),
  strFileName?:string,
  strMimeType?:string
);
export default download;

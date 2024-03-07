(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rosbag"] = factory();
	else
		root["rosbag"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/node/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BagReader.js":
/*!**************************!*\
  !*** ./src/BagReader.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BagReader; });
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _nmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nmerge */ "./src/nmerge.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./record */ "./src/record.js");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




const HEADER_READAHEAD = 4096;
const HEADER_OFFSET = 13; // BagReader is a lower level interface for reading specific sections & chunks
// from a rosbag file - generally it is consumed through the Bag class, but
// can be useful to use directly for efficiently accessing raw pieces from
// within the bag

class BagReader {
  constructor(filelike) {
    _defineProperty(this, "_lastReadResult", void 0);

    _defineProperty(this, "_file", void 0);

    _defineProperty(this, "_lastChunkInfo", void 0);

    this._file = filelike;
    this._lastChunkInfo = undefined;
  }

  verifyBagHeader(callback, next) {
    this._file.read(0, HEADER_OFFSET, (error, buffer) => {
      if (error || !buffer) {
        return callback(error || new Error("Missing both error and buffer"));
      }

      if (this._file.size() < HEADER_OFFSET) {
        return callback(new Error("Missing file header."));
      }

      if (buffer.toString() !== "#ROSBAG V2.0\n") {
        return callback(new Error("Cannot identify bag format."));
      }

      next();
    });
  } // reads the header block from the rosbag file
  // generally you call this first
  // because you need the header information to call readConnectionsAndChunkInfo


  readHeader(callback) {
    this.verifyBagHeader(callback, () => {
      return this._file.read(HEADER_OFFSET, HEADER_READAHEAD, (error, buffer) => {
        if (error || !buffer) {
          return callback(error || new Error("Missing both error and buffer"));
        }

        const read = buffer.length;

        if (read < 8) {
          return callback(new Error(`Record at position ${HEADER_OFFSET} is truncated.`));
        }

        const headerLength = buffer.readInt32LE(0);

        if (read < headerLength + 8) {
          return callback(new Error(`Record at position ${HEADER_OFFSET} header too large: ${headerLength}.`));
        }

        try {
          const header = this.readRecordFromBuffer(buffer, HEADER_OFFSET, _record__WEBPACK_IMPORTED_MODULE_2__["BagHeader"]);
          return callback(null, header);
        } catch (e) {
          return callback(new Error(`Could not read header from rosbag file buffer - ${e.message}`));
        }
      });
    });
  } // promisified version of readHeader


  readHeaderAsync() {
    return new Promise((resolve, reject) => this.readHeader((err, header) => err || !header ? reject(err) : resolve(header)));
  } // reads connection and chunk information from the bag
  // you'll generally call this after reading the header so you can get
  // connection metadata and chunkInfos which allow you to seek to individual
  // chunks & read them


  readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, callback) {
    this._file.read(fileOffset, this._file.size() - fileOffset, (err, buffer) => {
      if (err || !buffer) {
        return callback(err || new Error("Missing both error and buffer"));
      }

      if (connectionCount === 0) {
        return callback(null, {
          connections: [],
          chunkInfos: []
        });
      }

      const connections = this.readRecordsFromBuffer(buffer, connectionCount, fileOffset, _record__WEBPACK_IMPORTED_MODULE_2__["Connection"]);
      const connectionBlockLength = connections[connectionCount - 1].end - connections[0].offset;
      const chunkInfos = this.readRecordsFromBuffer(buffer.slice(connectionBlockLength), chunkCount, fileOffset + connectionBlockLength, _record__WEBPACK_IMPORTED_MODULE_2__["ChunkInfo"]);

      if (chunkCount > 0) {
        for (let i = 0; i < chunkCount - 1; i++) {
          chunkInfos[i].nextChunk = chunkInfos[i + 1];
        }

        chunkInfos[chunkCount - 1].nextChunk = null;
      }

      return callback(null, {
        connections,
        chunkInfos
      });
    });
  } // promisified version of readConnectionsAndChunkInfo


  readConnectionsAndChunkInfoAsync(fileOffset, connectionCount, chunkCount) {
    return new Promise((resolve, reject) => {
      this.readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, (err, result) => err || !result ? reject(err) : resolve(result));
    });
  } // read individual raw messages from the bag at a given chunk
  // filters to a specific set of connection ids, start time, & end time
  // generally the records will be of type MessageData


  readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, callback) {
    const start = startTime || {
      sec: 0,
      nsec: 0
    };
    const end = endTime || {
      sec: Number.MAX_VALUE,
      nsec: Number.MAX_VALUE
    };
    const conns = connections || chunkInfo.connections.map(connection => {
      return connection.conn;
    });
    this.readChunk(chunkInfo, decompress, (error, result) => {
      if (error || !result) {
        return callback(error || new Error("Missing both error and result"));
      }

      const chunk = result.chunk;
      const indices = {};
      result.indices.forEach(index => {
        indices[index.conn] = index;
      });
      const presentConnections = conns.filter(conn => {
        return indices[conn] !== undefined;
      });
      const iterables = presentConnections.map(conn => {
        // $FlowFixMe https://github.com/facebook/flow/issues/1163
        return indices[conn].indices[Symbol.iterator]();
      });
      const iter = Object(_nmerge__WEBPACK_IMPORTED_MODULE_1__["default"])((a, b) => _TimeUtil__WEBPACK_IMPORTED_MODULE_3__["compare"](a.time, b.time), ...iterables);
      const entries = [];
      let item = iter.next();

      while (!item.done) {
        const {
          value
        } = item;
        item = iter.next();

        if (!value || _TimeUtil__WEBPACK_IMPORTED_MODULE_3__["isGreaterThan"](start, value.time)) {
          continue;
        }

        if (_TimeUtil__WEBPACK_IMPORTED_MODULE_3__["isGreaterThan"](value.time, end)) {
          break;
        }

        entries.push(value);
      }

      const messages = entries.map(entry => {
        return this.readRecordFromBuffer(chunk.data.slice(entry.offset), chunk.dataOffset, _record__WEBPACK_IMPORTED_MODULE_2__["MessageData"]);
      });
      return callback(null, messages);
    });
  } // promisified version of readChunkMessages


  readChunkMessagesAsync(chunkInfo, connections, startTime, endTime, decompress) {
    return new Promise((resolve, reject) => {
      this.readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, (err, messages) => err || !messages ? reject(err) : resolve(messages));
    });
  } // reads a single chunk record && its index records given a chunkInfo


  readChunk(chunkInfo, decompress, callback) {
    // if we're reading the same chunk a second time return the cached version
    // to avoid doing decompression on the same chunk multiple times which is
    // expensive
    if (chunkInfo === this._lastChunkInfo && this._lastReadResult) {
      // always callback async, even if we have the result
      // https://oren.github.io/blog/zalgo.html
      const lastReadResult = this._lastReadResult;
      return setImmediate(() => callback(null, lastReadResult));
    }

    const {
      nextChunk
    } = chunkInfo;
    const readLength = nextChunk ? nextChunk.chunkPosition - chunkInfo.chunkPosition : this._file.size() - chunkInfo.chunkPosition;

    this._file.read(chunkInfo.chunkPosition, readLength, (err, buffer) => {
      if (err || !buffer) {
        return callback(err || new Error("Missing both error and buffer"));
      }

      const chunk = this.readRecordFromBuffer(buffer, chunkInfo.chunkPosition, _record__WEBPACK_IMPORTED_MODULE_2__["Chunk"]);
      const {
        compression
      } = chunk;

      if (compression !== "none") {
        const decompressFn = decompress[compression];

        if (!decompressFn) {
          return callback(new Error(`Unsupported compression type ${chunk.compression}`));
        }

        const result = decompressFn(chunk.data, chunk.size);
        chunk.data = result;
      }

      const indices = this.readRecordsFromBuffer(buffer.slice(chunk.length), chunkInfo.count, chunkInfo.chunkPosition + chunk.length, _record__WEBPACK_IMPORTED_MODULE_2__["IndexData"]);
      this._lastChunkInfo = chunkInfo;
      this._lastReadResult = {
        chunk,
        indices
      };
      return callback(null, this._lastReadResult);
    });
  } // reads count records from a buffer starting at fileOffset


  readRecordsFromBuffer(buffer, count, fileOffset, cls) {
    const records = [];
    let bufferOffset = 0;

    for (let i = 0; i < count; i++) {
      const record = this.readRecordFromBuffer(buffer.slice(bufferOffset), fileOffset + bufferOffset, cls);
      bufferOffset += record.end - record.offset;
      records.push(record);
    }

    return records;
  } // read an individual record from a buffer


  readRecordFromBuffer(buffer, fileOffset, cls) {
    const headerLength = buffer.readInt32LE(0);
    const record = Object(_header__WEBPACK_IMPORTED_MODULE_0__["parseHeader"])(buffer.slice(4, 4 + headerLength), cls);
    const dataOffset = 4 + headerLength + 4;
    const dataLength = buffer.readInt32LE(4 + headerLength);
    const data = buffer.slice(dataOffset, dataOffset + dataLength);
    record.parseData(data);
    record.offset = fileOffset;
    record.dataOffset = record.offset + 4 + headerLength + 4;
    record.end = record.dataOffset + dataLength;
    record.length = record.end - record.offset;
    return record;
  }

}

/***/ }),

/***/ "./src/MessageReader.js":
/*!******************************!*\
  !*** ./src/MessageReader.js ***!
  \******************************/
/*! exports provided: MessageReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return MessageReader; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "int53");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




// this has hard-coded buffer reading functions for each
// of the standard message types http://docs.ros.org/api/std_msgs/html/index-msg.html
// eventually custom types decompose into these standard types
class StandardTypeReader {
  constructor(buffer) {
    _defineProperty(this, "buffer", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "view", void 0);

    _defineProperty(this, "_decoder", void 0);

    _defineProperty(this, "_decoderStatus", "NOT_INITIALIZED");

    this.buffer = buffer;
    this.offset = 0;
    this.view = new DataView(buffer.buffer, buffer.byteOffset);
  }

  _intializeTextDecoder() {
    if (typeof global.TextDecoder === "undefined") {
      this._decoderStatus = "NOT_AVAILABLE";
      return;
    }

    try {
      this._decoder = new global.TextDecoder("ascii");
      this._decoderStatus = "INITIALIZED";
    } catch (e) {
      // Swallow the error if we don't support ascii encoding.
      this._decoderStatus = "NOT_AVAILABLE";
    }
  }

  json() {
    const resultString = this.string();

    try {
      return JSON.parse(resultString);
    } catch (_unused) {
      return `Could not parse ${resultString}`;
    }
  }

  string() {
    const len = this.int32();
    const codePoints = new Uint8Array(this.buffer.buffer, this.buffer.byteOffset + this.offset, len);
    this.offset += len; // if the string is relatively short we can use apply, but longer strings can benefit from the speed of TextDecoder.

    if (codePoints.length < 1000) {
      return String.fromCharCode.apply(null, codePoints);
    } // Use TextDecoder if it is available and supports the "ascii" encoding.


    if (this._decoderStatus === "NOT_INITIALIZED") {
      this._intializeTextDecoder();
    }

    if (this._decoder) {
      return this._decoder.decode(codePoints);
    } // Otherwise, use string concatentation.


    let data = "";

    for (let i = 0; i < len; i++) {
      data += String.fromCharCode(codePoints[i]);
    }

    return data;
  }

  bool() {
    return this.uint8() !== 0;
  }

  int8() {
    return this.view.getInt8(this.offset++);
  }

  uint8() {
    return this.view.getUint8(this.offset++);
  }

  typedArray(len, arrayType) {
    const arrayLength = len == null ? this.uint32() : len;
    const data = new arrayType(this.view.buffer, this.offset + this.view.byteOffset, arrayLength);
    this.offset += arrayLength;
    return data;
  }

  int16() {
    const result = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return result;
  }

  uint16() {
    const result = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return result;
  }

  int32() {
    const result = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return result;
  }

  uint32() {
    const result = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return result;
  }

  float32() {
    const result = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return result;
  }

  float64() {
    const result = this.view.getFloat64(this.offset, true);
    this.offset += 8;
    return result;
  }

  int64() {
    const offset = this.offset;
    this.offset += 8;
    return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readInt64LE(this.buffer, offset);
  }

  uint64() {
    const offset = this.offset;
    this.offset += 8;
    return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readUInt64LE(this.buffer, offset);
  }

  time() {
    const offset = this.offset;
    this.offset += 8;
    return Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(this.buffer, offset);
  }

  duration() {
    const offset = this.offset;
    this.offset += 8;
    return Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(this.buffer, offset);
  }

}

const findTypeByName = (types, name = "") => {
  let foundName = ""; // track name separately in a non-null variable to appease Flow

  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;

    if (typeName.endsWith(nameEnd)) {
      foundName = typeName;
      return true;
    }

    return false;
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}.`);
  }

  return { ...matches[0],
    name: foundName
  };
};

const friendlyName = name => name.replace(/\//g, "_");

const createParser = (types, freeze) => {
  const unnamedTypes = types.filter(type => !type.name);

  if (unnamedTypes.length !== 1) {
    throw new Error("multiple unnamed types");
  }

  const [unnamedType] = unnamedTypes;
  const namedTypes = types.filter(type => !!type.name);

  const constructorBody = type => {
    const readerLines = [];
    type.definitions.forEach(def => {
      if (def.isConstant) {
        return;
      }

      if (def.isArray) {
        if (def.type === "uint8" || def.type === "int8") {
          const arrayType = def.type === "uint8" ? "Uint8Array" : "Int8Array";
          readerLines.push(`this.${def.name} = reader.typedArray(${String(def.arrayLength)}, ${arrayType});`);
          return;
        }

        const lenField = `length_${def.name}`; // set a variable pointing to the parsed fixed array length
        // or read the byte indicating the dynamic length

        readerLines.push(`var ${lenField} = ${def.arrayLength ? def.arrayLength : "reader.uint32();"}`); // only allocate an array if there is a length - skips empty allocations

        const arrayName = `this.${def.name}`; // allocate the new array to a fixed length since we know it ahead of time

        readerLines.push(`${arrayName} = new Array(${lenField})`); // start the for-loop

        readerLines.push(`for (var i = 0; i < ${lenField}; i++) {`); // if the sub type is complex we need to allocate it and parse its values

        if (def.isComplex) {
          const defType = findTypeByName(types, def.type); // recursively call the constructor for the sub-type

          readerLines.push(`  ${arrayName}[i] = new Record.${friendlyName(defType.name)}(reader);`);
        } else {
          // if the subtype is not complex its a simple low-level reader operation
          readerLines.push(`  ${arrayName}[i] = reader.${def.type}();`);
        }

        readerLines.push("}"); // close the for-loop
      } else if (def.isComplex) {
        const defType = findTypeByName(types, def.type);
        readerLines.push(`this.${def.name} = new Record.${friendlyName(defType.name)}(reader);`);
      } else {
        readerLines.push(`this.${def.name} = reader.${def.type}();`);
      }
    });

    if (freeze) {
      readerLines.push("Object.freeze(this);");
    }

    return readerLines.join("\n    ");
  };

  let js = `
  var Record = function (reader) {
    ${constructorBody(unnamedType)}
  };\n`;
  namedTypes.forEach(t => {
    js += `
  Record.${friendlyName(t.name)} = function(reader) {
    ${constructorBody(t)}
  };\n`;
  });
  js += `
  return function read(reader) {
    return new Record(reader);
  };`;

  let _read;

  try {
    _read = eval(`(function buildReader() { ${js} })()`);
  } catch (e) {
    console.error("error building parser:", js); // eslint-disable-line no-console

    throw e;
  }

  return function (buffer) {
    const reader = new StandardTypeReader(buffer);
    return _read(reader);
  };
};

class MessageReader {
  // takes an object message definition and returns
  // a message reader which can be used to read messages based
  // on the message definition
  constructor(definitions, options = {}) {
    _defineProperty(this, "reader", void 0);

    let parsedDefinitions = definitions;

    if (typeof parsedDefinitions === "string") {
      // eslint-disable-next-line no-console
      console.warn("Passing string message defintions to MessageReader is deprecated. Instead call `parseMessageDefinition` on it and pass in the resulting parsed message definition object.");
      parsedDefinitions = Object(_parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__["parseMessageDefinition"])(parsedDefinitions);
    }

    this.reader = createParser(parsedDefinitions, !!options.freeze);
  }

  readMessage(buffer) {
    return this.reader(buffer);
  }

}

/***/ }),

/***/ "./src/MessageWriter.js":
/*!******************************!*\
  !*** ./src/MessageWriter.js ***!
  \******************************/
/*! exports provided: MessageWriter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageWriter", function() { return MessageWriter; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "int53");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.


// write a Time object to a buffer.
function writeTime(time, buffer, offset) {
  buffer.writeUInt32LE(time.sec, offset);
  buffer.writeUInt32LE(time.nsec, offset + 4);
}

class StandardTypeOffsetCalculator {
  constructor() {
    _defineProperty(this, "offset", 0);
  }

  // Returns the current offset and increments the next offset by `byteCount`.
  _incrementAndReturn(byteCount) {
    const offset = this.offset;
    this.offset += byteCount;
    return offset;
  } // These are not actually used in the StandardTypeWriter, so they must be kept in sync with those implementations.


  json(value) {
    return this.string(JSON.stringify(value));
  } // The following are used in the StandardTypeWriter.


  string(value) {
    // int32 length
    const length = 4 + value.length;
    return this._incrementAndReturn(length);
  }

  bool() {
    return this.uint8();
  }

  int8() {
    return this._incrementAndReturn(1);
  }

  uint8() {
    return this._incrementAndReturn(1);
  }

  int16() {
    return this._incrementAndReturn(2);
  }

  uint16() {
    return this._incrementAndReturn(2);
  }

  int32() {
    return this._incrementAndReturn(4);
  }

  uint32() {
    return this._incrementAndReturn(4);
  }

  float32() {
    return this._incrementAndReturn(4);
  }

  float64() {
    return this._incrementAndReturn(8);
  }

  int64() {
    return this._incrementAndReturn(8);
  }

  uint64() {
    return this._incrementAndReturn(8);
  }

  time() {
    return this._incrementAndReturn(8);
  }

  duration() {
    return this._incrementAndReturn(8);
  }

} // this has hard-coded buffer writing functions for each
// of the standard message types http://docs.ros.org/api/std_msgs/html/index-msg.html
// eventually custom types decompose into these standard types


class StandardTypeWriter {
  constructor(buffer) {
    _defineProperty(this, "buffer", void 0);

    _defineProperty(this, "view", void 0);

    _defineProperty(this, "offsetCalculator", void 0);

    this.buffer = buffer;
    this.view = new DataView(buffer.buffer, buffer.byteOffset);
    this.offsetCalculator = new StandardTypeOffsetCalculator();
  }

  json(value) {
    this.string(JSON.stringify(value));
  }

  string(value) {
    const stringOffset = this.offsetCalculator.string(value);
    this.view.setInt32(stringOffset, value.length, true);
    this.buffer.write(value, stringOffset + 4, value.length, "ascii");
  }

  bool(value) {
    this.uint8(value ? 1 : 0);
  }

  int8(value) {
    this.view.setInt8(this.offsetCalculator.int8(), value);
  }

  uint8(value) {
    this.view.setUint8(this.offsetCalculator.uint8(), value);
  }

  int16(value) {
    this.view.setInt16(this.offsetCalculator.int16(), value, true);
  }

  uint16(value) {
    this.view.setUint16(this.offsetCalculator.uint16(), value, true);
  }

  int32(value) {
    this.view.setInt32(this.offsetCalculator.int32(), value, true);
  }

  uint32(value) {
    this.view.setUint32(this.offsetCalculator.uint32(), value, true);
  }

  float32(value) {
    this.view.setFloat32(this.offsetCalculator.float32(), value, true);
  }

  float64(value) {
    this.view.setFloat64(this.offsetCalculator.float64(), value, true);
  }

  int64(value) {
    int53__WEBPACK_IMPORTED_MODULE_0___default.a.writeInt64LE(value, this.buffer, this.offsetCalculator.int64());
  }

  uint64(value) {
    int53__WEBPACK_IMPORTED_MODULE_0___default.a.writeUInt64LE(value, this.buffer, this.offsetCalculator.uint64());
  }

  time(time) {
    writeTime(time, this.buffer, this.offsetCalculator.time());
  }

  duration(time) {
    writeTime(time, this.buffer, this.offsetCalculator.time());
  }

}

const findTypeByName = (types, name = "") => {
  let foundName = ""; // track name separately in a non-null variable to appease Flow

  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;

    if (typeName.endsWith(nameEnd)) {
      foundName = typeName;
      return true;
    }

    return false;
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}.`);
  }

  return { ...matches[0],
    name: foundName
  };
};

const friendlyName = name => name.replace(/\//g, "_");

function createWriterAndSizeCalculator(types) {
  const unnamedTypes = types.filter(type => !type.name);

  if (unnamedTypes.length !== 1) {
    throw new Error("multiple unnamed types");
  }

  const [unnamedType] = unnamedTypes;
  const namedTypes = types.filter(type => !!type.name);

  const constructorBody = (type, argName) => {
    const lines = [];
    type.definitions.forEach(def => {
      if (def.isConstant) {
        return;
      } // Accesses the field we are currently writing. Pulled out for easy reuse.


      const accessMessageField = `message["${def.name}"]`;

      if (def.isArray) {
        const lenField = `length_${def.name}`; // set a variable pointing to the parsed fixed array length
        // or write the byte indicating the dynamic length

        if (def.arrayLength) {
          lines.push(`var ${lenField} = ${def.arrayLength};`);
        } else {
          lines.push(`var ${lenField} = ${accessMessageField}.length;`);
          lines.push(`${argName}.uint32(${lenField});`);
        } // start the for-loop


        lines.push(`for (var i = 0; i < ${lenField}; i++) {`); // if the sub type is complex we need to allocate it and parse its values

        if (def.isComplex) {
          const defType = findTypeByName(types, def.type); // recursively call the function for the sub-type

          lines.push(`  ${friendlyName(defType.name)}(${argName}, ${accessMessageField}[i]);`);
        } else {
          // if the subtype is not complex its a simple low-level operation
          lines.push(`  ${argName}.${def.type}(${accessMessageField}[i]);`);
        }

        lines.push("}"); // close the for-loop
      } else if (def.isComplex) {
        const defType = findTypeByName(types, def.type);
        lines.push(`${friendlyName(defType.name)}(${argName}, ${accessMessageField});`);
      } else {
        // Call primitives directly.
        lines.push(`${argName}.${def.type}(${accessMessageField});`);
      }
    });
    return lines.join("\n    ");
  };

  let writerJs = "";
  let calculateSizeJs = "";
  namedTypes.forEach(t => {
    writerJs += `
  function ${friendlyName(t.name)}(writer, message) {
    ${constructorBody(t, "writer")}
  };\n`;
    calculateSizeJs += `
  function ${friendlyName(t.name)}(offsetCalculator, message) {
    ${constructorBody(t, "offsetCalculator")}
  };\n`;
  });
  writerJs += `
  return function write(writer, message) {
    ${constructorBody(unnamedType, "writer")}
    return writer.buffer;
  };`;
  calculateSizeJs += `
  return function calculateSize(offsetCalculator, message) {
    ${constructorBody(unnamedType, "offsetCalculator")}
    return offsetCalculator.offset;
  };`;

  let _write;

  let _calculateSize;

  try {
    _write = eval(`(function buildWriter() { ${writerJs} })()`);
  } catch (e) {
    console.error("error building writer:", writerJs); // eslint-disable-line no-console

    throw e;
  }

  try {
    _calculateSize = eval(`(function buildSizeCalculator() { ${calculateSizeJs} })()`);
  } catch (e) {
    console.error("error building size calculator:", calculateSizeJs); // eslint-disable-line no-console

    throw e;
  }

  return {
    writer: function (message, buffer) {
      const writer = new StandardTypeWriter(buffer);
      return _write(writer, message);
    },

    bufferSizeCalculator(message) {
      const offsetCalculator = new StandardTypeOffsetCalculator();
      return _calculateSize(offsetCalculator, message);
    }

  };
}

class MessageWriter {
  // takes an object string message definition and returns
  // a message writer which can be used to write messages based
  // on the message definition
  constructor(definitions) {
    _defineProperty(this, "writer", void 0);

    _defineProperty(this, "bufferSizeCalculator", void 0);

    const {
      writer,
      bufferSizeCalculator
    } = createWriterAndSizeCalculator(definitions);
    this.writer = writer;
    this.bufferSizeCalculator = bufferSizeCalculator;
  } // Calculates the buffer size needed to write this message in bytes.


  calculateBufferSize(message) {
    return this.bufferSizeCalculator(message);
  } // bufferToWrite is optional - if it is not provided, a buffer will be generated.


  writeMessage(message, bufferToWrite) {
    let buffer = bufferToWrite;

    if (!buffer) {
      const bufferSize = this.calculateBufferSize(message);
      buffer = Buffer.allocUnsafe(bufferSize);
    }

    return this.writer(message, buffer);
  }

}

/***/ }),

/***/ "./src/ReadResult.js":
/*!***************************!*\
  !*** ./src/ReadResult.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReadResult; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// represents a result passed to the callback from the high-level call:
// bag.readMessages({ opts: any }, callback: (ReadResult) => void) => Promise<void>
class ReadResult {
  constructor(topic, message, timestamp, data, chunkOffset, totalChunks, freeze) {
    _defineProperty(this, "topic", void 0);

    _defineProperty(this, "message", void 0);

    _defineProperty(this, "timestamp", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "chunkOffset", void 0);

    _defineProperty(this, "totalChunks", void 0);

    // string: the topic the message was on
    this.topic = topic; // any: the parsed body of the message based on connection.messageDefinition

    this.message = message; // time: the timestamp of the message

    this.timestamp = timestamp; // buffer: raw buffer data of the message

    this.data = data; // the offset of the currently read chunk

    this.chunkOffset = chunkOffset; // the total number of chunks in the read operation

    this.totalChunks = totalChunks;

    if (freeze) {
      Object.freeze(timestamp);
      Object.freeze(this);
    }
  }

}

/***/ }),

/***/ "./src/TimeUtil.js":
/*!*************************!*\
  !*** ./src/TimeUtil.js ***!
  \*************************/
/*! exports provided: fromDate, toDate, compare, isLessThan, isGreaterThan, areSame, add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromDate", function() { return fromDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDate", function() { return toDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compare", function() { return compare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLessThan", function() { return isLessThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGreaterThan", function() { return isGreaterThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areSame", function() { return areSame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
function fromDate(date) {
  const sec = Math.floor(date.getTime() / 1000);
  const nsec = date.getMilliseconds() * 1e6;
  return {
    sec,
    nsec
  };
}
function toDate(time) {
  return new Date(time.sec * 1e3 + time.nsec / 1e6);
} // compare two times, returning a negative value if the right is greater
// or a positive value if the left is greater or 0 if the times are equal
// useful to supply to Array.prototype.sort

function compare(left, right) {
  const secDiff = left.sec - right.sec;
  return secDiff || left.nsec - right.nsec;
} // returns true if the left time is less than the right time, otherwise false

function isLessThan(left, right) {
  return this.compare(left, right) < 0;
} // returns true if the left time is greater than the right time, otherwise false

function isGreaterThan(left, right) {
  return this.compare(left, right) > 0;
} // returns true if both times have the same number of seconds and nanoseconds

function areSame(left, right) {
  return left.sec === right.sec && left.nsec === right.nsec;
}

function toString(time) {
  return `{${time.sec}, ${time.nsec}}`;
} // computes the sum of two times or durations and returns a new time
// throws an exception if the resulting time is negative


function add(left, right) {
  const durationNanos = left.nsec + right.nsec;
  const secsFromNanos = Math.floor(durationNanos / 1e9);
  const newSecs = left.sec + right.sec + secsFromNanos;
  const remainingDurationNanos = durationNanos % 1e9; // use Math.abs here to prevent -0 when there is exactly 1 second of negative nanoseconds passed in

  const newNanos = Math.abs(Math.sign(remainingDurationNanos) === -1 ? 1e9 + remainingDurationNanos : remainingDurationNanos);
  const result = {
    sec: newSecs,
    nsec: newNanos
  };

  if (result.sec < 0 || result.nsec < 0) {
    throw new Error(`Invalid time: ${toString(result)} produced from TimeUtil.add(${toString(left)}, ${toString(right)}})`);
  }

  return result;
}

/***/ }),

/***/ "./src/bag.js":
/*!********************!*\
  !*** ./src/bag.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bag; });
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.js");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
/* harmony import */ var _ReadResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReadResult */ "./src/ReadResult.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./record */ "./src/record.js");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.






// the high level rosbag interface
// create a new bag by calling:
// `const bag = await Bag.open('./path-to-file.bag')` in node or
// `const bag = await Bag.open(files[0])` in the browser
//
// after that you can consume messages by calling
// `await bag.readMessages({ topics: ['/foo'] },
//    (result) => console.log(result.topic, result.message))`
class Bag {
  // you can optionally create a bag manually passing in a bagReader instance
  constructor(bagReader) {
    _defineProperty(this, "reader", void 0);

    _defineProperty(this, "header", void 0);

    _defineProperty(this, "connections", void 0);

    _defineProperty(this, "chunkInfos", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "endTime", void 0);

    this.reader = bagReader;
  } // eslint-disable-next-line no-unused-vars


  // if the bag is manually created with the constructor, you must call `await open()` on the bag
  // generally this is called for you if you're using `const bag = await Bag.open()`
  async open() {
    this.header = await this.reader.readHeaderAsync();
    const {
      connectionCount,
      chunkCount,
      indexPosition
    } = this.header;
    const result = await this.reader.readConnectionsAndChunkInfoAsync(indexPosition, connectionCount, chunkCount);
    this.connections = {};
    result.connections.forEach(connection => {
      this.connections[connection.conn] = connection;
    });
    this.chunkInfos = result.chunkInfos;

    if (chunkCount > 0) {
      this.startTime = this.chunkInfos[0].startTime;
      this.endTime = this.chunkInfos[chunkCount - 1].endTime;
    }
  }

  async readMessages(opts, callback) {
    const connections = this.connections;
    const startTime = opts.startTime || {
      sec: 0,
      nsec: 0
    };
    const endTime = opts.endTime || {
      sec: Number.MAX_VALUE,
      nsec: Number.MAX_VALUE
    };
    const topics = opts.topics || Object.keys(connections).map(id => {
      return connections[id].topic;
    });
    const filteredConnections = Object.keys(connections).filter(id => {
      return topics.indexOf(connections[id].topic) !== -1;
    }).map(id => +id);
    const {
      decompress = {}
    } = opts; // filter chunks to those which fall within the time range we're attempting to read

    const chunkInfos = this.chunkInfos.filter(info => {
      return _TimeUtil__WEBPACK_IMPORTED_MODULE_4__["compare"](info.startTime, endTime) <= 0 && _TimeUtil__WEBPACK_IMPORTED_MODULE_4__["compare"](startTime, info.endTime) <= 0;
    });

    function parseMsg(msg, chunkOffset) {
      const connection = connections[msg.conn];
      const {
        topic
      } = connection;
      const {
        data,
        time: timestamp
      } = msg;
      let message = null;

      if (!opts.noParse) {
        // lazily create a reader for this connection if it doesn't exist
        connection.reader = connection.reader || new _MessageReader__WEBPACK_IMPORTED_MODULE_1__["MessageReader"](Object(_parseMessageDefinition__WEBPACK_IMPORTED_MODULE_5__["parseMessageDefinition"])(connection.messageDefinition), {
          freeze: opts.freeze
        });
        message = connection.reader.readMessage(data);
      }

      return new _ReadResult__WEBPACK_IMPORTED_MODULE_2__["default"](topic, message, timestamp, data, chunkOffset, chunkInfos.length, opts.freeze);
    }

    for (let i = 0; i < chunkInfos.length; i++) {
      const info = chunkInfos[i];
      const messages = await this.reader.readChunkMessagesAsync(info, filteredConnections, startTime, endTime, decompress);
      messages.forEach(msg => callback(parseMsg(msg, i)));
    }
  }

}

_defineProperty(Bag, "open", file => {
  throw new Error("This method should have been overridden based on the environment. Make sure you are correctly importing the node or web version of Bag.");
});

/***/ }),

/***/ "./src/fields.js":
/*!***********************!*\
  !*** ./src/fields.js ***!
  \***********************/
/*! exports provided: extractFields, extractTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFields", function() { return extractFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractTime", function() { return extractTime; });
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// reads through a buffer and extracts { [key: string]: value: string }
// pairs - the buffer is expected to have length prefixed utf8 strings
// with a '=' separating the key and value
const EQUALS_CHARCODE = "=".charCodeAt(0);
function extractFields(buffer) {
  if (buffer.length < 4) {
    throw new Error("Header fields are truncated.");
  }

  let i = 0;
  const fields = {};

  while (i < buffer.length) {
    const length = buffer.readInt32LE(i);
    i += 4;

    if (i + length > buffer.length) {
      throw new Error("Header fields are corrupt.");
    } // Passing a number into "indexOf" explicitly to avoid Buffer polyfill
    // slow path. See issue #87.


    const field = buffer.slice(i, i + length);
    const index = field.indexOf(EQUALS_CHARCODE);

    if (index === -1) {
      throw new Error("Header field is missing equals sign.");
    }

    fields[field.slice(0, index).toString()] = field.slice(index + 1);
    i += length;
  }

  return fields;
} // reads a Time object out of a buffer at the given offset

function extractTime(buffer, offset) {
  const sec = buffer.readUInt32LE(offset);
  const nsec = buffer.readUInt32LE(offset + 4);
  return {
    sec,
    nsec
  };
}

/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/*! exports provided: parseHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHeader", function() { return parseHeader; });
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./record */ "./src/record.js");
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.

 // given a buffer parses out the record within the buffer
// based on the opcode type bit

function parseHeader(buffer, cls) {
  const fields = Object(_fields__WEBPACK_IMPORTED_MODULE_0__["extractFields"])(buffer);

  if (fields.op === undefined) {
    throw new Error("Header is missing 'op' field.");
  }

  const opcode = fields.op.readUInt8(0);

  if (opcode !== cls.opcode) {
    throw new Error(`Expected ${cls.name} (${cls.opcode}) but found ${opcode}`);
  }

  return new cls(fields);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _TimeUtil__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bag */ "./src/bag.js");
/* empty/unused harmony star reexport *//* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.js");
/* empty/unused harmony star reexport *//* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _MessageReader__WEBPACK_IMPORTED_MODULE_3__["MessageReader"]; });

/* harmony import */ var _MessageWriter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MessageWriter */ "./src/MessageWriter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageWriter", function() { return _MessageWriter__WEBPACK_IMPORTED_MODULE_4__["MessageWriter"]; });

/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_5__["rosPrimitiveTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_5__["parseMessageDefinition"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_6__) if(["TimeUtil","default","MessageReader","MessageWriter","rosPrimitiveTypes","parseMessageDefinition","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractFields", function() { return _fields__WEBPACK_IMPORTED_MODULE_7__["extractFields"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractTime", function() { return _fields__WEBPACK_IMPORTED_MODULE_7__["extractTime"]; });

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.










/***/ }),

/***/ "./src/nmerge.js":
/*!***********************!*\
  !*** ./src/nmerge.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! heap */ "heap");
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(heap__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.


function nmerge(key, ...iterables) {
  const heap = new heap__WEBPACK_IMPORTED_MODULE_0___default.a((a, b) => {
    return key(a.value, b.value);
  });

  for (let i = 0; i < iterables.length; i++) {
    const {
      value,
      done
    } = iterables[i].next();

    if (!done) {
      heap.push({
        i,
        value
      });
    }
  }

  return {
    next: () => {
      if (heap.empty()) {
        return {
          done: true
        };
      }

      const {
        i
      } = heap.front();
      const next = iterables[i].next();

      if (next.done) {
        return {
          value: heap.pop().value,
          done: false
        };
      }

      return {
        value: heap.replace({
          i,
          value: next.value
        }).value,
        done: false
      };
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (nmerge);

/***/ }),

/***/ "./src/node/index.js":
/*!***************************!*\
  !*** ./src/node/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "buffer");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ "./src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["TimeUtil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["MessageReader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageWriter", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["MessageWriter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["parseMessageDefinition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["rosPrimitiveTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractFields", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["extractFields"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractTime", function() { return _index__WEBPACK_IMPORTED_MODULE_2__["extractTime"]; });

/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../bag */ "./src/bag.js");
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BagReader */ "./src/BagReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BagReader", function() { return _BagReader__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_5__) if(["Reader","TimeUtil","BagReader","MessageReader","MessageWriter","open","parseMessageDefinition","rosPrimitiveTypes","extractFields","extractTime","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_5__[key]; }) }(__WEBPACK_IMPORT_KEY__));
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




 // reader using nodejs fs api

class Reader {
  constructor(filename) {
    _defineProperty(this, "_filename", void 0);

    _defineProperty(this, "_fd", void 0);

    _defineProperty(this, "_size", void 0);

    _defineProperty(this, "_buffer", void 0);

    this._filename = filename;
    this._fd = undefined;
    this._size = 0;
    this._buffer = buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"].allocUnsafe(0);
  } // open a file for reading


  _open(cb) {
    fs__WEBPACK_IMPORTED_MODULE_1__["stat"](this._filename, (error, stat) => {
      if (error) {
        return cb(error);
      }

      return fs__WEBPACK_IMPORTED_MODULE_1__["open"](this._filename, "r", (err, fd) => {
        if (err) {
          return cb(err);
        }

        this._fd = fd;
        this._size = stat.size;
        return cb(null);
      });
    });
  }

  close(cb) {
    if (this._fd != null) {
      fs__WEBPACK_IMPORTED_MODULE_1__["close"](this._fd, cb);
    }
  } // read length (bytes) starting from offset (bytes)
  // callback(err, buffer)


  read(offset, length, cb) {
    if (this._fd == null) {
      return this._open(err => {
        return err ? cb(err) : this.read(offset, length, cb);
      });
    }

    if (length > this._buffer.byteLength) {
      this._buffer = buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"].alloc(length);
    }

    return fs__WEBPACK_IMPORTED_MODULE_1__["read"](this._fd, this._buffer, 0, length, offset, (err, bytes, buff) => {
      return err ? cb(err) : cb(null, buff);
    });
  } // return the size of the file


  size() {
    return this._size;
  }

}

const open = async filename => {
  if (typeof filename !== "string") {
    throw new Error("Expected filename to be a string. Make sure you are correctly importing the node or web version of Bag.");
  }

  const bag = new _bag__WEBPACK_IMPORTED_MODULE_3__["default"](new _BagReader__WEBPACK_IMPORTED_MODULE_4__["default"](new Reader(filename)));
  await bag.open();
  return bag;
};

_bag__WEBPACK_IMPORTED_MODULE_3__["default"].open = open;


/* harmony default export */ __webpack_exports__["default"] = (_bag__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ }),

/***/ "./src/parseMessageDefinition.js":
/*!***************************************!*\
  !*** ./src/parseMessageDefinition.js ***!
  \***************************************/
/*! exports provided: rosPrimitiveTypes, parseMessageDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return rosPrimitiveTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return parseMessageDefinition; });
// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// Set of built-in ros types. See http://wiki.ros.org/msg#Field_Types
const rosPrimitiveTypes = new Set(["string", "bool", "int8", "uint8", "int16", "uint16", "int32", "uint32", "float32", "float64", "int64", "uint64", "time", "duration", "json"]);

function normalizeType(type) {
  // Normalize deprecated aliases.
  let normalizedType = type;

  if (type === "char") {
    normalizedType = "uint8";
  }

  if (type === "byte") {
    normalizedType = "int8";
  }

  return normalizedType;
} // represents a single line in a message definition type
// e.g. 'string name' 'CustomType[] foo' 'string[3] names'


function newArrayDefinition(type, name, arrayLength) {
  const normalizedType = normalizeType(type);
  return {
    type: normalizedType,
    name,
    isArray: true,
    arrayLength: arrayLength === null ? undefined : arrayLength,
    isComplex: !rosPrimitiveTypes.has(normalizedType)
  };
}

function newDefinition(type, name) {
  const normalizedType = normalizeType(type);
  return {
    type: normalizedType,
    name,
    isArray: false,
    isComplex: !rosPrimitiveTypes.has(normalizedType)
  };
}

const buildType = lines => {
  const definitions = [];
  let complexTypeName;
  lines.forEach(({
    isJson,
    line
  }) => {
    // remove comments and extra whitespace from each line
    const splits = line.replace(/#.*/gi, "").split(" ").filter(word => word);

    if (!splits[1]) {
      return;
    } // consume comments


    const type = splits[0].trim();
    const name = splits[1].trim();

    if (type === "MSG:") {
      complexTypeName = name;
    } else if (name.indexOf("=") > -1 || splits.indexOf("=") > -1) {
      // constant type parsing
      const matches = line.match(/(\S+)\s*=\s*(.*)\s*/);

      if (!matches) {
        throw new Error("Malformed line: " + line);
      }

      let value = matches[2];

      if (type !== "string") {
        // handle special case of python bool values
        value = value.replace(/True/gi, "true");
        value = value.replace(/False/gi, "false");

        try {
          value = JSON.parse(value.replace(/\s*#.*/g, ""));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(`Error in this constant definition: ${line}`);
          throw error;
        }

        if (type === "bool") {
          value = Boolean(value);
        }
      }

      if (type.includes("int") && value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
        // eslint-disable-next-line no-console
        console.warn(`Found integer constant outside safe integer range: ${line}`);
      }

      definitions.push({
        type: normalizeType(type),
        name: matches[1],
        isConstant: true,
        value
      });
    } else if (type.indexOf("]") === type.length - 1) {
      // array type parsing
      const typeSplits = type.split("[");
      const baseType = typeSplits[0];
      const len = typeSplits[1].replace("]", "");
      definitions.push(newArrayDefinition(baseType, name, len ? parseInt(len, 10) : undefined));
    } else {
      definitions.push(newDefinition(isJson ? "json" : type, name));
    }
  });
  return {
    name: complexTypeName,
    definitions
  };
};

const findTypeByName = (types, name) => {
  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;
    return typeName.endsWith(nameEnd);
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
  }

  return matches[0];
}; // Given a raw message definition string, parse it into an object representation.
// Example return value:
// [{
//   name: undefined,
//   definitions: [
//     {
//       arrayLength: undefined,
//       isArray: false,
//       isComplex: false,
//       name: "name",
//       type: "string",
//     }, ...
//   ],
// }, ... ]
//
// See unit tests for more examples.


function parseMessageDefinition(messageDefinition) {
  // read all the lines and remove empties
  const allLines = messageDefinition.split("\n").map(line => line.trim()).filter(line => line);
  let definitionLines = [];
  const types = [];
  let nextDefinitionIsJson = false; // group lines into individual definitions

  allLines.forEach(line => {
    // ignore comment lines unless they start with #pragma rosbag_parse_json
    if (line.startsWith("#")) {
      if (line.startsWith("#pragma rosbag_parse_json")) {
        nextDefinitionIsJson = true;
      }

      return;
    } // definitions are split by equal signs


    if (line.startsWith("==")) {
      nextDefinitionIsJson = false;
      types.push(buildType(definitionLines));
      definitionLines = [];
    } else {
      definitionLines.push({
        isJson: nextDefinitionIsJson,
        line
      });
      nextDefinitionIsJson = false;
    }
  });
  types.push(buildType(definitionLines)); // Fix up complex type names

  types.forEach(({
    definitions
  }) => {
    definitions.forEach(definition => {
      if (definition.isComplex) {
        const foundName = findTypeByName(types, definition.type).name;

        if (foundName === undefined) {
          throw new Error(`Missing type definition for ${definition.type}`);
        }

        definition.type = foundName;
      }
    });
  });
  return types;
}

/***/ }),

/***/ "./src/record.js":
/*!***********************!*\
  !*** ./src/record.js ***!
  \***********************/
/*! exports provided: Record, BagHeader, Chunk, Connection, MessageData, IndexData, ChunkInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Record", function() { return Record; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BagHeader", function() { return BagHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chunk", function() { return Chunk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageData", function() { return MessageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexData", function() { return IndexData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChunkInfo", function() { return ChunkInfo; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "int53");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




const readUInt64LE = buffer => {
  return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readUInt64LE(buffer, 0);
};

class Record {
  constructor(_fields) {
    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "dataOffset", void 0);

    _defineProperty(this, "end", void 0);

    _defineProperty(this, "length", void 0);
  }

  parseData(_buffer) {}

}
class BagHeader extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "indexPosition", void 0);

    _defineProperty(this, "connectionCount", void 0);

    _defineProperty(this, "chunkCount", void 0);

    this.indexPosition = readUInt64LE(fields.index_pos);
    this.connectionCount = fields.conn_count.readInt32LE(0);
    this.chunkCount = fields.chunk_count.readInt32LE(0);
  }

}

_defineProperty(BagHeader, "opcode", 3);

class Chunk extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "compression", void 0);

    _defineProperty(this, "size", void 0);

    _defineProperty(this, "data", void 0);

    this.compression = fields.compression.toString();
    this.size = fields.size.readUInt32LE(0);
  }

  parseData(buffer) {
    this.data = buffer;
  }

}

_defineProperty(Chunk, "opcode", 5);

const getField = (fields, key) => {
  if (fields[key] === undefined) {
    throw new Error(`Connection header is missing ${key}.`);
  }

  return fields[key].toString();
};

class Connection extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "topic", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "md5sum", void 0);

    _defineProperty(this, "messageDefinition", void 0);

    _defineProperty(this, "callerid", void 0);

    _defineProperty(this, "latching", void 0);

    _defineProperty(this, "reader", void 0);

    this.conn = fields.conn.readUInt32LE(0);
    this.topic = fields.topic.toString();
    this.type = undefined;
    this.md5sum = undefined;
    this.messageDefinition = "";
  }

  parseData(buffer) {
    const fields = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractFields"])(buffer);
    this.type = getField(fields, "type");
    this.md5sum = getField(fields, "md5sum");
    this.messageDefinition = getField(fields, "message_definition");

    if (fields.callerid !== undefined) {
      this.callerid = fields.callerid.toString();
    }

    if (fields.latching !== undefined) {
      this.latching = fields.latching.toString() === "1";
    }
  }

}

_defineProperty(Connection, "opcode", 7);

class MessageData extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "data", void 0);

    this.conn = fields.conn.readUInt32LE(0);
    this.time = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.time, 0);
  }

  parseData(buffer) {
    this.data = buffer;
  }

}

_defineProperty(MessageData, "opcode", 2);

class IndexData extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "ver", void 0);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "indices", void 0);

    this.ver = fields.ver.readUInt32LE(0);
    this.conn = fields.conn.readUInt32LE(0);
    this.count = fields.count.readUInt32LE(0);
  }

  parseData(buffer) {
    this.indices = [];

    for (let i = 0; i < this.count; i++) {
      this.indices.push({
        time: Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(buffer, i * 12),
        offset: buffer.readUInt32LE(i * 12 + 8)
      });
    }
  }

}

_defineProperty(IndexData, "opcode", 4);

class ChunkInfo extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "ver", void 0);

    _defineProperty(this, "chunkPosition", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "endTime", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "connections", void 0);

    _defineProperty(this, "nextChunk", void 0);

    this.ver = fields.ver.readUInt32LE(0);
    this.chunkPosition = readUInt64LE(fields.chunk_pos);
    this.startTime = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.start_time, 0);
    this.endTime = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.end_time, 0);
    this.count = fields.count.readUInt32LE(0);
  }

  parseData(buffer) {
    this.connections = [];

    for (let i = 0; i < this.count; i++) {
      this.connections.push({
        conn: buffer.readUInt32LE(i * 8),
        count: buffer.readUInt32LE(i * 8 + 4)
      });
    }
  }

}

_defineProperty(ChunkInfo, "opcode", 6);

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "heap":
/*!***********************!*\
  !*** external "heap" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("heap");

/***/ }),

/***/ "int53":
/*!************************!*\
  !*** external "int53" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("int53");

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3NiYWcvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Jvc2JhZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvQmFnUmVhZGVyLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9NZXNzYWdlUmVhZGVyLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9NZXNzYWdlV3JpdGVyLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9SZWFkUmVzdWx0LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9UaW1lVXRpbC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvYmFnLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9maWVsZHMuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL25tZXJnZS5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvbm9kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvcGFyc2VNZXNzYWdlRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvcmVjb3JkLmpzIiwid2VicGFjazovL3Jvc2JhZy9leHRlcm5hbCBcImJ1ZmZlclwiIiwid2VicGFjazovL3Jvc2JhZy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vcm9zYmFnL2V4dGVybmFsIFwiaGVhcFwiIiwid2VicGFjazovL3Jvc2JhZy9leHRlcm5hbCBcImludDUzXCIiXSwibmFtZXMiOlsiSEVBREVSX1JFQURBSEVBRCIsIkhFQURFUl9PRkZTRVQiLCJCYWdSZWFkZXIiLCJjb25zdHJ1Y3RvciIsImZpbGVsaWtlIiwiX2ZpbGUiLCJfbGFzdENodW5rSW5mbyIsInVuZGVmaW5lZCIsInZlcmlmeUJhZ0hlYWRlciIsImNhbGxiYWNrIiwibmV4dCIsInJlYWQiLCJlcnJvciIsImJ1ZmZlciIsIkVycm9yIiwic2l6ZSIsInRvU3RyaW5nIiwicmVhZEhlYWRlciIsImxlbmd0aCIsImhlYWRlckxlbmd0aCIsInJlYWRJbnQzMkxFIiwiaGVhZGVyIiwicmVhZFJlY29yZEZyb21CdWZmZXIiLCJCYWdIZWFkZXIiLCJlIiwibWVzc2FnZSIsInJlYWRIZWFkZXJBc3luYyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyIiwicmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvIiwiZmlsZU9mZnNldCIsImNvbm5lY3Rpb25Db3VudCIsImNodW5rQ291bnQiLCJjb25uZWN0aW9ucyIsImNodW5rSW5mb3MiLCJyZWFkUmVjb3Jkc0Zyb21CdWZmZXIiLCJDb25uZWN0aW9uIiwiY29ubmVjdGlvbkJsb2NrTGVuZ3RoIiwiZW5kIiwib2Zmc2V0Iiwic2xpY2UiLCJDaHVua0luZm8iLCJpIiwibmV4dENodW5rIiwicmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvQXN5bmMiLCJyZXN1bHQiLCJyZWFkQ2h1bmtNZXNzYWdlcyIsImNodW5rSW5mbyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkZWNvbXByZXNzIiwic3RhcnQiLCJzZWMiLCJuc2VjIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiY29ubnMiLCJtYXAiLCJjb25uZWN0aW9uIiwiY29ubiIsInJlYWRDaHVuayIsImNodW5rIiwiaW5kaWNlcyIsImZvckVhY2giLCJpbmRleCIsInByZXNlbnRDb25uZWN0aW9ucyIsImZpbHRlciIsIml0ZXJhYmxlcyIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiaXRlciIsIm5tZXJnZSIsImEiLCJiIiwiVGltZVV0aWwiLCJ0aW1lIiwiZW50cmllcyIsIml0ZW0iLCJkb25lIiwidmFsdWUiLCJwdXNoIiwibWVzc2FnZXMiLCJlbnRyeSIsImRhdGEiLCJkYXRhT2Zmc2V0IiwiTWVzc2FnZURhdGEiLCJyZWFkQ2h1bmtNZXNzYWdlc0FzeW5jIiwiX2xhc3RSZWFkUmVzdWx0IiwibGFzdFJlYWRSZXN1bHQiLCJzZXRJbW1lZGlhdGUiLCJyZWFkTGVuZ3RoIiwiY2h1bmtQb3NpdGlvbiIsIkNodW5rIiwiY29tcHJlc3Npb24iLCJkZWNvbXByZXNzRm4iLCJjb3VudCIsIkluZGV4RGF0YSIsImNscyIsInJlY29yZHMiLCJidWZmZXJPZmZzZXQiLCJyZWNvcmQiLCJwYXJzZUhlYWRlciIsImRhdGFMZW5ndGgiLCJwYXJzZURhdGEiLCJTdGFuZGFyZFR5cGVSZWFkZXIiLCJ2aWV3IiwiRGF0YVZpZXciLCJieXRlT2Zmc2V0IiwiX2ludGlhbGl6ZVRleHREZWNvZGVyIiwiZ2xvYmFsIiwiVGV4dERlY29kZXIiLCJfZGVjb2RlclN0YXR1cyIsIl9kZWNvZGVyIiwianNvbiIsInJlc3VsdFN0cmluZyIsInN0cmluZyIsIkpTT04iLCJwYXJzZSIsImxlbiIsImludDMyIiwiY29kZVBvaW50cyIsIlVpbnQ4QXJyYXkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhcHBseSIsImRlY29kZSIsImJvb2wiLCJ1aW50OCIsImludDgiLCJnZXRJbnQ4IiwiZ2V0VWludDgiLCJ0eXBlZEFycmF5IiwiYXJyYXlUeXBlIiwiYXJyYXlMZW5ndGgiLCJ1aW50MzIiLCJpbnQxNiIsImdldEludDE2IiwidWludDE2IiwiZ2V0VWludDE2IiwiZ2V0SW50MzIiLCJnZXRVaW50MzIiLCJmbG9hdDMyIiwiZ2V0RmxvYXQzMiIsImZsb2F0NjQiLCJnZXRGbG9hdDY0IiwiaW50NjQiLCJpbnQ1MyIsInJlYWRJbnQ2NExFIiwidWludDY0IiwicmVhZFVJbnQ2NExFIiwiZXh0cmFjdFRpbWUiLCJkdXJhdGlvbiIsImZpbmRUeXBlQnlOYW1lIiwidHlwZXMiLCJuYW1lIiwiZm91bmROYW1lIiwibWF0Y2hlcyIsInR5cGUiLCJ0eXBlTmFtZSIsIm5hbWVFbmQiLCJpbmRleE9mIiwiZW5kc1dpdGgiLCJmcmllbmRseU5hbWUiLCJyZXBsYWNlIiwiY3JlYXRlUGFyc2VyIiwiZnJlZXplIiwidW5uYW1lZFR5cGVzIiwidW5uYW1lZFR5cGUiLCJuYW1lZFR5cGVzIiwiY29uc3RydWN0b3JCb2R5IiwicmVhZGVyTGluZXMiLCJkZWZpbml0aW9ucyIsImRlZiIsImlzQ29uc3RhbnQiLCJpc0FycmF5IiwibGVuRmllbGQiLCJhcnJheU5hbWUiLCJpc0NvbXBsZXgiLCJkZWZUeXBlIiwiam9pbiIsImpzIiwidCIsIl9yZWFkIiwiZXZhbCIsImNvbnNvbGUiLCJyZWFkZXIiLCJNZXNzYWdlUmVhZGVyIiwib3B0aW9ucyIsInBhcnNlZERlZmluaXRpb25zIiwid2FybiIsInBhcnNlTWVzc2FnZURlZmluaXRpb24iLCJyZWFkTWVzc2FnZSIsIndyaXRlVGltZSIsIndyaXRlVUludDMyTEUiLCJTdGFuZGFyZFR5cGVPZmZzZXRDYWxjdWxhdG9yIiwiX2luY3JlbWVudEFuZFJldHVybiIsImJ5dGVDb3VudCIsInN0cmluZ2lmeSIsIlN0YW5kYXJkVHlwZVdyaXRlciIsIm9mZnNldENhbGN1bGF0b3IiLCJzdHJpbmdPZmZzZXQiLCJzZXRJbnQzMiIsIndyaXRlIiwic2V0SW50OCIsInNldFVpbnQ4Iiwic2V0SW50MTYiLCJzZXRVaW50MTYiLCJzZXRVaW50MzIiLCJzZXRGbG9hdDMyIiwic2V0RmxvYXQ2NCIsIndyaXRlSW50NjRMRSIsIndyaXRlVUludDY0TEUiLCJjcmVhdGVXcml0ZXJBbmRTaXplQ2FsY3VsYXRvciIsImFyZ05hbWUiLCJsaW5lcyIsImFjY2Vzc01lc3NhZ2VGaWVsZCIsIndyaXRlckpzIiwiY2FsY3VsYXRlU2l6ZUpzIiwiX3dyaXRlIiwiX2NhbGN1bGF0ZVNpemUiLCJ3cml0ZXIiLCJidWZmZXJTaXplQ2FsY3VsYXRvciIsIk1lc3NhZ2VXcml0ZXIiLCJjYWxjdWxhdGVCdWZmZXJTaXplIiwid3JpdGVNZXNzYWdlIiwiYnVmZmVyVG9Xcml0ZSIsImJ1ZmZlclNpemUiLCJCdWZmZXIiLCJhbGxvY1Vuc2FmZSIsIlJlYWRSZXN1bHQiLCJ0b3BpYyIsInRpbWVzdGFtcCIsImNodW5rT2Zmc2V0IiwidG90YWxDaHVua3MiLCJPYmplY3QiLCJmcm9tRGF0ZSIsImRhdGUiLCJNYXRoIiwiZmxvb3IiLCJnZXRUaW1lIiwiZ2V0TWlsbGlzZWNvbmRzIiwidG9EYXRlIiwiRGF0ZSIsImNvbXBhcmUiLCJsZWZ0IiwicmlnaHQiLCJzZWNEaWZmIiwiaXNMZXNzVGhhbiIsImlzR3JlYXRlclRoYW4iLCJhcmVTYW1lIiwiYWRkIiwiZHVyYXRpb25OYW5vcyIsInNlY3NGcm9tTmFub3MiLCJuZXdTZWNzIiwicmVtYWluaW5nRHVyYXRpb25OYW5vcyIsIm5ld05hbm9zIiwiYWJzIiwic2lnbiIsIkJhZyIsImJhZ1JlYWRlciIsIm9wZW4iLCJpbmRleFBvc2l0aW9uIiwicmVhZE1lc3NhZ2VzIiwib3B0cyIsInRvcGljcyIsImtleXMiLCJpZCIsImZpbHRlcmVkQ29ubmVjdGlvbnMiLCJpbmZvIiwicGFyc2VNc2ciLCJtc2ciLCJub1BhcnNlIiwibWVzc2FnZURlZmluaXRpb24iLCJmaWxlIiwiRVFVQUxTX0NIQVJDT0RFIiwiY2hhckNvZGVBdCIsImV4dHJhY3RGaWVsZHMiLCJmaWVsZHMiLCJmaWVsZCIsInJlYWRVSW50MzJMRSIsIm9wIiwib3Bjb2RlIiwicmVhZFVJbnQ4Iiwia2V5IiwiaGVhcCIsIkhlYXAiLCJlbXB0eSIsImZyb250IiwicG9wIiwiUmVhZGVyIiwiZmlsZW5hbWUiLCJfZmlsZW5hbWUiLCJfZmQiLCJfc2l6ZSIsIl9idWZmZXIiLCJfb3BlbiIsImNiIiwiZnMiLCJzdGF0IiwiZmQiLCJjbG9zZSIsImJ5dGVMZW5ndGgiLCJhbGxvYyIsImJ5dGVzIiwiYnVmZiIsImJhZyIsInJvc1ByaW1pdGl2ZVR5cGVzIiwiU2V0Iiwibm9ybWFsaXplVHlwZSIsIm5vcm1hbGl6ZWRUeXBlIiwibmV3QXJyYXlEZWZpbml0aW9uIiwiaGFzIiwibmV3RGVmaW5pdGlvbiIsImJ1aWxkVHlwZSIsImNvbXBsZXhUeXBlTmFtZSIsImlzSnNvbiIsImxpbmUiLCJzcGxpdHMiLCJzcGxpdCIsIndvcmQiLCJ0cmltIiwibWF0Y2giLCJCb29sZWFuIiwiaW5jbHVkZXMiLCJNQVhfU0FGRV9JTlRFR0VSIiwiTUlOX1NBRkVfSU5URUdFUiIsInR5cGVTcGxpdHMiLCJiYXNlVHlwZSIsInBhcnNlSW50IiwiYWxsTGluZXMiLCJkZWZpbml0aW9uTGluZXMiLCJuZXh0RGVmaW5pdGlvbklzSnNvbiIsInN0YXJ0c1dpdGgiLCJkZWZpbml0aW9uIiwiUmVjb3JkIiwiX2ZpZWxkcyIsImluZGV4X3BvcyIsImNvbm5fY291bnQiLCJjaHVua19jb3VudCIsImdldEZpZWxkIiwibWQ1c3VtIiwiY2FsbGVyaWQiLCJsYXRjaGluZyIsInZlciIsImNodW5rX3BvcyIsInN0YXJ0X3RpbWUiLCJlbmRfdGltZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtB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O0FBRmEsT0FBdEI7QUFJRDtBQUNGOztBQTNCbUM7O2dCQUF6QkQsUyxZQUNLLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSmxCLG1DOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicm9zYmFnXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInJvc2JhZ1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9ub2RlL2luZGV4LmpzXCIpO1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBUaW1lLCBDYWxsYmFjaywgRmlsZWxpa2UgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5pbXBvcnQgeyBwYXJzZUhlYWRlciB9IGZyb20gXCIuL2hlYWRlclwiO1xuaW1wb3J0IG5tZXJnZSBmcm9tIFwiLi9ubWVyZ2VcIjtcbmltcG9ydCB7IFJlY29yZCwgQmFnSGVhZGVyLCBDaHVuaywgQ2h1bmtJbmZvLCBDb25uZWN0aW9uLCBJbmRleERhdGEsIE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vcmVjb3JkXCI7XG5pbXBvcnQgKiBhcyBUaW1lVXRpbCBmcm9tIFwiLi9UaW1lVXRpbFwiO1xuXG5pbnRlcmZhY2UgQ2h1bmtSZWFkUmVzdWx0IHtcbiAgY2h1bms6IENodW5rO1xuICBpbmRpY2VzOiBJbmRleERhdGFbXTtcbn1cblxuZXhwb3J0IHR5cGUgRGVjb21wcmVzcyA9IHtcbiAgW2NvbXByZXNzaW9uOiBzdHJpbmddOiAoYnVmZmVyOiBCdWZmZXIsIHNpemU6IG51bWJlcikgPT4gQnVmZmVyLFxufTtcblxuY29uc3QgSEVBREVSX1JFQURBSEVBRCA9IDQwOTY7XG5jb25zdCBIRUFERVJfT0ZGU0VUID0gMTM7XG5cbi8vIEJhZ1JlYWRlciBpcyBhIGxvd2VyIGxldmVsIGludGVyZmFjZSBmb3IgcmVhZGluZyBzcGVjaWZpYyBzZWN0aW9ucyAmIGNodW5rc1xuLy8gZnJvbSBhIHJvc2JhZyBmaWxlIC0gZ2VuZXJhbGx5IGl0IGlzIGNvbnN1bWVkIHRocm91Z2ggdGhlIEJhZyBjbGFzcywgYnV0XG4vLyBjYW4gYmUgdXNlZnVsIHRvIHVzZSBkaXJlY3RseSBmb3IgZWZmaWNpZW50bHkgYWNjZXNzaW5nIHJhdyBwaWVjZXMgZnJvbVxuLy8gd2l0aGluIHRoZSBiYWdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhZ1JlYWRlciB7XG4gIF9sYXN0UmVhZFJlc3VsdDogQ2h1bmtSZWFkUmVzdWx0O1xuICBfZmlsZTogRmlsZWxpa2U7XG4gIF9sYXN0Q2h1bmtJbmZvOiA/Q2h1bmtJbmZvO1xuXG4gIGNvbnN0cnVjdG9yKGZpbGVsaWtlOiBGaWxlbGlrZSkge1xuICAgIHRoaXMuX2ZpbGUgPSBmaWxlbGlrZTtcbiAgICB0aGlzLl9sYXN0Q2h1bmtJbmZvID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmVyaWZ5QmFnSGVhZGVyKGNhbGxiYWNrOiBDYWxsYmFjazxCYWdIZWFkZXI+LCBuZXh0OiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fZmlsZS5yZWFkKDAsIEhFQURFUl9PRkZTRVQsIChlcnJvcjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnJvciB8fCAhYnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9maWxlLnNpemUoKSA8IEhFQURFUl9PRkZTRVQpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIk1pc3NpbmcgZmlsZSBoZWFkZXIuXCIpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1ZmZlci50b1N0cmluZygpICE9PSBcIiNST1NCQUcgVjIuMFxcblwiKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJDYW5ub3QgaWRlbnRpZnkgYmFnIGZvcm1hdC5cIikpO1xuICAgICAgfVxuICAgICAgbmV4dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVhZHMgdGhlIGhlYWRlciBibG9jayBmcm9tIHRoZSByb3NiYWcgZmlsZVxuICAvLyBnZW5lcmFsbHkgeW91IGNhbGwgdGhpcyBmaXJzdFxuICAvLyBiZWNhdXNlIHlvdSBuZWVkIHRoZSBoZWFkZXIgaW5mb3JtYXRpb24gdG8gY2FsbCByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9cbiAgcmVhZEhlYWRlcihjYWxsYmFjazogQ2FsbGJhY2s8QmFnSGVhZGVyPikge1xuICAgIHRoaXMudmVyaWZ5QmFnSGVhZGVyKGNhbGxiYWNrLCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fZmlsZS5yZWFkKEhFQURFUl9PRkZTRVQsIEhFQURFUl9SRUFEQUhFQUQsIChlcnJvcjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcbiAgICAgICAgaWYgKGVycm9yIHx8ICFidWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCBidWZmZXJcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVhZCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIGlmIChyZWFkIDwgOCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoYFJlY29yZCBhdCBwb3NpdGlvbiAke0hFQURFUl9PRkZTRVR9IGlzIHRydW5jYXRlZC5gKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoZWFkZXJMZW5ndGggPSBidWZmZXIucmVhZEludDMyTEUoMCk7XG4gICAgICAgIGlmIChyZWFkIDwgaGVhZGVyTGVuZ3RoICsgOCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoYFJlY29yZCBhdCBwb3NpdGlvbiAke0hFQURFUl9PRkZTRVR9IGhlYWRlciB0b28gbGFyZ2U6ICR7aGVhZGVyTGVuZ3RofS5gKSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGJ1ZmZlciwgSEVBREVSX09GRlNFVCwgQmFnSGVhZGVyKTtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgaGVhZGVyKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoYENvdWxkIG5vdCByZWFkIGhlYWRlciBmcm9tIHJvc2JhZyBmaWxlIGJ1ZmZlciAtICR7ZS5tZXNzYWdlfWApKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBwcm9taXNpZmllZCB2ZXJzaW9uIG9mIHJlYWRIZWFkZXJcbiAgcmVhZEhlYWRlckFzeW5jKCk6IFByb21pc2U8QmFnSGVhZGVyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICB0aGlzLnJlYWRIZWFkZXIoKGVycjogRXJyb3IgfCBudWxsLCBoZWFkZXI/OiBCYWdIZWFkZXIpID0+IChlcnIgfHwgIWhlYWRlciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZShoZWFkZXIpKSlcbiAgICApO1xuICB9XG5cbiAgLy8gcmVhZHMgY29ubmVjdGlvbiBhbmQgY2h1bmsgaW5mb3JtYXRpb24gZnJvbSB0aGUgYmFnXG4gIC8vIHlvdSdsbCBnZW5lcmFsbHkgY2FsbCB0aGlzIGFmdGVyIHJlYWRpbmcgdGhlIGhlYWRlciBzbyB5b3UgY2FuIGdldFxuICAvLyBjb25uZWN0aW9uIG1ldGFkYXRhIGFuZCBjaHVua0luZm9zIHdoaWNoIGFsbG93IHlvdSB0byBzZWVrIHRvIGluZGl2aWR1YWxcbiAgLy8gY2h1bmtzICYgcmVhZCB0aGVtXG4gIHJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mbyhcbiAgICBmaWxlT2Zmc2V0OiBudW1iZXIsXG4gICAgY29ubmVjdGlvbkNvdW50OiBudW1iZXIsXG4gICAgY2h1bmtDb3VudDogbnVtYmVyLFxuICAgIGNhbGxiYWNrOiBDYWxsYmFjazx7IGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10sIGNodW5rSW5mb3M6IENodW5rSW5mb1tdIH0+XG4gICkge1xuICAgIHRoaXMuX2ZpbGUucmVhZChmaWxlT2Zmc2V0LCB0aGlzLl9maWxlLnNpemUoKSAtIGZpbGVPZmZzZXQsIChlcnI6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XG4gICAgICBpZiAoZXJyIHx8ICFidWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25uZWN0aW9uQ291bnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHsgY29ubmVjdGlvbnM6IFtdLCBjaHVua0luZm9zOiBbXSB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29ubmVjdGlvbnMgPSB0aGlzLnJlYWRSZWNvcmRzRnJvbUJ1ZmZlcihidWZmZXIsIGNvbm5lY3Rpb25Db3VudCwgZmlsZU9mZnNldCwgQ29ubmVjdGlvbik7XG4gICAgICBjb25zdCBjb25uZWN0aW9uQmxvY2tMZW5ndGggPSBjb25uZWN0aW9uc1tjb25uZWN0aW9uQ291bnQgLSAxXS5lbmQgLSBjb25uZWN0aW9uc1swXS5vZmZzZXQ7XG4gICAgICBjb25zdCBjaHVua0luZm9zID0gdGhpcy5yZWFkUmVjb3Jkc0Zyb21CdWZmZXIoXG4gICAgICAgIGJ1ZmZlci5zbGljZShjb25uZWN0aW9uQmxvY2tMZW5ndGgpLFxuICAgICAgICBjaHVua0NvdW50LFxuICAgICAgICBmaWxlT2Zmc2V0ICsgY29ubmVjdGlvbkJsb2NrTGVuZ3RoLFxuICAgICAgICBDaHVua0luZm9cbiAgICAgICk7XG5cbiAgICAgIGlmIChjaHVua0NvdW50ID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICBjaHVua0luZm9zW2ldLm5leHRDaHVuayA9IGNodW5rSW5mb3NbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIGNodW5rSW5mb3NbY2h1bmtDb3VudCAtIDFdLm5leHRDaHVuayA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7IGNvbm5lY3Rpb25zLCBjaHVua0luZm9zIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcHJvbWlzaWZpZWQgdmVyc2lvbiBvZiByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9cbiAgcmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvQXN5bmMoXG4gICAgZmlsZU9mZnNldDogbnVtYmVyLFxuICAgIGNvbm5lY3Rpb25Db3VudDogbnVtYmVyLFxuICAgIGNodW5rQ291bnQ6IG51bWJlclxuICApOiBQcm9taXNlPHsgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSwgY2h1bmtJbmZvczogQ2h1bmtJbmZvW10gfT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mbyhcbiAgICAgICAgZmlsZU9mZnNldCxcbiAgICAgICAgY29ubmVjdGlvbkNvdW50LFxuICAgICAgICBjaHVua0NvdW50LFxuICAgICAgICAoZXJyOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IHsgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSwgY2h1bmtJbmZvczogQ2h1bmtJbmZvW10gfSkgPT5cbiAgICAgICAgICBlcnIgfHwgIXJlc3VsdCA/IHJlamVjdChlcnIpIDogcmVzb2x2ZShyZXN1bHQpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVhZCBpbmRpdmlkdWFsIHJhdyBtZXNzYWdlcyBmcm9tIHRoZSBiYWcgYXQgYSBnaXZlbiBjaHVua1xuICAvLyBmaWx0ZXJzIHRvIGEgc3BlY2lmaWMgc2V0IG9mIGNvbm5lY3Rpb24gaWRzLCBzdGFydCB0aW1lLCAmIGVuZCB0aW1lXG4gIC8vIGdlbmVyYWxseSB0aGUgcmVjb3JkcyB3aWxsIGJlIG9mIHR5cGUgTWVzc2FnZURhdGFcbiAgcmVhZENodW5rTWVzc2FnZXMoXG4gICAgY2h1bmtJbmZvOiBDaHVua0luZm8sXG4gICAgY29ubmVjdGlvbnM6IG51bWJlcltdLFxuICAgIHN0YXJ0VGltZTogVGltZSB8IG51bGwsXG4gICAgZW5kVGltZTogVGltZSB8IG51bGwsXG4gICAgZGVjb21wcmVzczogRGVjb21wcmVzcyxcbiAgICBjYWxsYmFjazogQ2FsbGJhY2s8TWVzc2FnZURhdGFbXT5cbiAgKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBzdGFydFRpbWUgfHwgeyBzZWM6IDAsIG5zZWM6IDAgfTtcbiAgICBjb25zdCBlbmQgPSBlbmRUaW1lIHx8IHsgc2VjOiBOdW1iZXIuTUFYX1ZBTFVFLCBuc2VjOiBOdW1iZXIuTUFYX1ZBTFVFIH07XG4gICAgY29uc3QgY29ubnMgPVxuICAgICAgY29ubmVjdGlvbnMgfHxcbiAgICAgIGNodW5rSW5mby5jb25uZWN0aW9ucy5tYXAoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uY29ubjtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5yZWFkQ2h1bmsoY2h1bmtJbmZvLCBkZWNvbXByZXNzLCAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogQ2h1bmtSZWFkUmVzdWx0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IgfHwgIXJlc3VsdCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCByZXN1bHRcIikpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaHVuayA9IHJlc3VsdC5jaHVuaztcbiAgICAgIGNvbnN0IGluZGljZXM6IHsgW2Nvbm46IG51bWJlcl06IEluZGV4RGF0YSB9ID0ge307XG4gICAgICByZXN1bHQuaW5kaWNlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgICBpbmRpY2VzW2luZGV4LmNvbm5dID0gaW5kZXg7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHByZXNlbnRDb25uZWN0aW9ucyA9IGNvbm5zLmZpbHRlcigoY29ubikgPT4ge1xuICAgICAgICByZXR1cm4gaW5kaWNlc1tjb25uXSAhPT0gdW5kZWZpbmVkO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBpdGVyYWJsZXMgPSBwcmVzZW50Q29ubmVjdGlvbnMubWFwKChjb25uKSA9PiB7XG4gICAgICAgIC8vICRGbG93Rml4TWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzExNjNcbiAgICAgICAgcmV0dXJuIGluZGljZXNbY29ubl0uaW5kaWNlc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGl0ZXIgPSBubWVyZ2UoKGEsIGIpID0+IFRpbWVVdGlsLmNvbXBhcmUoYS50aW1lLCBiLnRpbWUpLCAuLi5pdGVyYWJsZXMpO1xuXG4gICAgICBjb25zdCBlbnRyaWVzID0gW107XG4gICAgICBsZXQgaXRlbSA9IGl0ZXIubmV4dCgpO1xuICAgICAgd2hpbGUgKCFpdGVtLmRvbmUpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gaXRlbTtcbiAgICAgICAgaXRlbSA9IGl0ZXIubmV4dCgpO1xuICAgICAgICBpZiAoIXZhbHVlIHx8IFRpbWVVdGlsLmlzR3JlYXRlclRoYW4oc3RhcnQsIHZhbHVlLnRpbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFRpbWVVdGlsLmlzR3JlYXRlclRoYW4odmFsdWUudGltZSwgZW5kKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVudHJpZXMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gZW50cmllcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGNodW5rLmRhdGEuc2xpY2UoZW50cnkub2Zmc2V0KSwgY2h1bmsuZGF0YU9mZnNldCwgTWVzc2FnZURhdGEpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBtZXNzYWdlcyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBwcm9taXNpZmllZCB2ZXJzaW9uIG9mIHJlYWRDaHVua01lc3NhZ2VzXG4gIHJlYWRDaHVua01lc3NhZ2VzQXN5bmMoXG4gICAgY2h1bmtJbmZvOiBDaHVua0luZm8sXG4gICAgY29ubmVjdGlvbnM6IG51bWJlcltdLFxuICAgIHN0YXJ0VGltZTogVGltZSxcbiAgICBlbmRUaW1lOiBUaW1lLFxuICAgIGRlY29tcHJlc3M6IERlY29tcHJlc3NcbiAgKTogUHJvbWlzZTxNZXNzYWdlRGF0YVtdPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucmVhZENodW5rTWVzc2FnZXMoXG4gICAgICAgIGNodW5rSW5mbyxcbiAgICAgICAgY29ubmVjdGlvbnMsXG4gICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgZW5kVGltZSxcbiAgICAgICAgZGVjb21wcmVzcyxcbiAgICAgICAgKGVycjogRXJyb3IgfCBudWxsLCBtZXNzYWdlcz86IE1lc3NhZ2VEYXRhW10pID0+IChlcnIgfHwgIW1lc3NhZ2VzID8gcmVqZWN0KGVycikgOiByZXNvbHZlKG1lc3NhZ2VzKSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZWFkcyBhIHNpbmdsZSBjaHVuayByZWNvcmQgJiYgaXRzIGluZGV4IHJlY29yZHMgZ2l2ZW4gYSBjaHVua0luZm9cbiAgcmVhZENodW5rKGNodW5rSW5mbzogQ2h1bmtJbmZvLCBkZWNvbXByZXNzOiBEZWNvbXByZXNzLCBjYWxsYmFjazogQ2FsbGJhY2s8Q2h1bmtSZWFkUmVzdWx0Pikge1xuICAgIC8vIGlmIHdlJ3JlIHJlYWRpbmcgdGhlIHNhbWUgY2h1bmsgYSBzZWNvbmQgdGltZSByZXR1cm4gdGhlIGNhY2hlZCB2ZXJzaW9uXG4gICAgLy8gdG8gYXZvaWQgZG9pbmcgZGVjb21wcmVzc2lvbiBvbiB0aGUgc2FtZSBjaHVuayBtdWx0aXBsZSB0aW1lcyB3aGljaCBpc1xuICAgIC8vIGV4cGVuc2l2ZVxuICAgIGlmIChjaHVua0luZm8gPT09IHRoaXMuX2xhc3RDaHVua0luZm8gJiYgdGhpcy5fbGFzdFJlYWRSZXN1bHQpIHtcbiAgICAgIC8vIGFsd2F5cyBjYWxsYmFjayBhc3luYywgZXZlbiBpZiB3ZSBoYXZlIHRoZSByZXN1bHRcbiAgICAgIC8vIGh0dHBzOi8vb3Jlbi5naXRodWIuaW8vYmxvZy96YWxnby5odG1sXG4gICAgICBjb25zdCBsYXN0UmVhZFJlc3VsdCA9IHRoaXMuX2xhc3RSZWFkUmVzdWx0O1xuICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZSgoKSA9PiBjYWxsYmFjayhudWxsLCBsYXN0UmVhZFJlc3VsdCkpO1xuICAgIH1cbiAgICBjb25zdCB7IG5leHRDaHVuayB9ID0gY2h1bmtJbmZvO1xuXG4gICAgY29uc3QgcmVhZExlbmd0aCA9IG5leHRDaHVua1xuICAgICAgPyBuZXh0Q2h1bmsuY2h1bmtQb3NpdGlvbiAtIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uXG4gICAgICA6IHRoaXMuX2ZpbGUuc2l6ZSgpIC0gY2h1bmtJbmZvLmNodW5rUG9zaXRpb247XG5cbiAgICB0aGlzLl9maWxlLnJlYWQoY2h1bmtJbmZvLmNodW5rUG9zaXRpb24sIHJlYWRMZW5ndGgsIChlcnI6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XG4gICAgICBpZiAoZXJyIHx8ICFidWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yZWFkUmVjb3JkRnJvbUJ1ZmZlcihidWZmZXIsIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uLCBDaHVuayk7XG4gICAgICBjb25zdCB7IGNvbXByZXNzaW9uIH0gPSBjaHVuaztcbiAgICAgIGlmIChjb21wcmVzc2lvbiAhPT0gXCJub25lXCIpIHtcbiAgICAgICAgY29uc3QgZGVjb21wcmVzc0ZuID0gZGVjb21wcmVzc1tjb21wcmVzc2lvbl07XG4gICAgICAgIGlmICghZGVjb21wcmVzc0ZuKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgY29tcHJlc3Npb24gdHlwZSAke2NodW5rLmNvbXByZXNzaW9ufWApKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBkZWNvbXByZXNzRm4oY2h1bmsuZGF0YSwgY2h1bmsuc2l6ZSk7XG4gICAgICAgIGNodW5rLmRhdGEgPSByZXN1bHQ7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmRpY2VzID0gdGhpcy5yZWFkUmVjb3Jkc0Zyb21CdWZmZXIoXG4gICAgICAgIGJ1ZmZlci5zbGljZShjaHVuay5sZW5ndGgpLFxuICAgICAgICBjaHVua0luZm8uY291bnQsXG4gICAgICAgIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uICsgY2h1bmsubGVuZ3RoLFxuICAgICAgICBJbmRleERhdGFcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX2xhc3RDaHVua0luZm8gPSBjaHVua0luZm87XG4gICAgICB0aGlzLl9sYXN0UmVhZFJlc3VsdCA9IHsgY2h1bmssIGluZGljZXMgfTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB0aGlzLl9sYXN0UmVhZFJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZWFkcyBjb3VudCByZWNvcmRzIGZyb20gYSBidWZmZXIgc3RhcnRpbmcgYXQgZmlsZU9mZnNldFxuICByZWFkUmVjb3Jkc0Zyb21CdWZmZXI8VDogUmVjb3JkPihcbiAgICBidWZmZXI6IEJ1ZmZlcixcbiAgICBjb3VudDogbnVtYmVyLFxuICAgIGZpbGVPZmZzZXQ6IG51bWJlcixcbiAgICBjbHM6IENsYXNzPFQ+ICYgeyBvcGNvZGU6IG51bWJlciB9XG4gICk6IFRbXSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBidWZmZXJPZmZzZXQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5yZWFkUmVjb3JkRnJvbUJ1ZmZlcihidWZmZXIuc2xpY2UoYnVmZmVyT2Zmc2V0KSwgZmlsZU9mZnNldCArIGJ1ZmZlck9mZnNldCwgY2xzKTtcbiAgICAgIGJ1ZmZlck9mZnNldCArPSByZWNvcmQuZW5kIC0gcmVjb3JkLm9mZnNldDtcbiAgICAgIHJlY29yZHMucHVzaChyZWNvcmQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVjb3JkcztcbiAgfVxuXG4gIC8vIHJlYWQgYW4gaW5kaXZpZHVhbCByZWNvcmQgZnJvbSBhIGJ1ZmZlclxuICByZWFkUmVjb3JkRnJvbUJ1ZmZlcjxUOiBSZWNvcmQ+KGJ1ZmZlcjogQnVmZmVyLCBmaWxlT2Zmc2V0OiBudW1iZXIsIGNsczogQ2xhc3M8VD4gJiB7IG9wY29kZTogbnVtYmVyIH0pOiBUIHtcbiAgICBjb25zdCBoZWFkZXJMZW5ndGggPSBidWZmZXIucmVhZEludDMyTEUoMCk7XG4gICAgY29uc3QgcmVjb3JkID0gcGFyc2VIZWFkZXIoYnVmZmVyLnNsaWNlKDQsIDQgKyBoZWFkZXJMZW5ndGgpLCBjbHMpO1xuXG4gICAgY29uc3QgZGF0YU9mZnNldCA9IDQgKyBoZWFkZXJMZW5ndGggKyA0O1xuICAgIGNvbnN0IGRhdGFMZW5ndGggPSBidWZmZXIucmVhZEludDMyTEUoNCArIGhlYWRlckxlbmd0aCk7XG4gICAgY29uc3QgZGF0YSA9IGJ1ZmZlci5zbGljZShkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgZGF0YUxlbmd0aCk7XG5cbiAgICByZWNvcmQucGFyc2VEYXRhKGRhdGEpO1xuXG4gICAgcmVjb3JkLm9mZnNldCA9IGZpbGVPZmZzZXQ7XG4gICAgcmVjb3JkLmRhdGFPZmZzZXQgPSByZWNvcmQub2Zmc2V0ICsgNCArIGhlYWRlckxlbmd0aCArIDQ7XG4gICAgcmVjb3JkLmVuZCA9IHJlY29yZC5kYXRhT2Zmc2V0ICsgZGF0YUxlbmd0aDtcbiAgICByZWNvcmQubGVuZ3RoID0gcmVjb3JkLmVuZCAtIHJlY29yZC5vZmZzZXQ7XG5cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgaW50NTMgZnJvbSBcImludDUzXCI7XG5pbXBvcnQgeyBleHRyYWN0VGltZSB9IGZyb20gXCIuL2ZpZWxkc1wiO1xuaW1wb3J0IHR5cGUgeyBSb3NNc2dEZWZpbml0aW9uLCBOYW1lZFJvc01zZ0RlZmluaXRpb24gfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgcGFyc2VNZXNzYWdlRGVmaW5pdGlvbiB9IGZyb20gXCIuL3BhcnNlTWVzc2FnZURlZmluaXRpb25cIjtcblxudHlwZSBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSAoXG4gIGJ1ZmZlcjogQXJyYXlCdWZmZXIsXG4gIGJ5dGVPZmZzZXQ6IG51bWJlcixcbiAgbGVuZ3RoOiBudW1iZXJcbikgPT5cbiAgfCBJbnQ4QXJyYXlcbiAgfCBVaW50OEFycmF5XG4gIHwgSW50MTZBcnJheVxuICB8IFVpbnQxNkFycmF5XG4gIHwgSW50MzJBcnJheVxuICB8IFVpbnQzMkFycmF5XG4gIHwgVWludDhDbGFtcGVkQXJyYXlcbiAgfCBGbG9hdDMyQXJyYXlcbiAgfCBGbG9hdDY0QXJyYXk7XG5cbi8vIHRoaXMgaGFzIGhhcmQtY29kZWQgYnVmZmVyIHJlYWRpbmcgZnVuY3Rpb25zIGZvciBlYWNoXG4vLyBvZiB0aGUgc3RhbmRhcmQgbWVzc2FnZSB0eXBlcyBodHRwOi8vZG9jcy5yb3Mub3JnL2FwaS9zdGRfbXNncy9odG1sL2luZGV4LW1zZy5odG1sXG4vLyBldmVudHVhbGx5IGN1c3RvbSB0eXBlcyBkZWNvbXBvc2UgaW50byB0aGVzZSBzdGFuZGFyZCB0eXBlc1xuY2xhc3MgU3RhbmRhcmRUeXBlUmVhZGVyIHtcbiAgYnVmZmVyOiBCdWZmZXI7XG4gIG9mZnNldDogbnVtYmVyO1xuICB2aWV3OiBEYXRhVmlldztcbiAgX2RlY29kZXI6ID9UZXh0RGVjb2RlcjtcbiAgX2RlY29kZXJTdGF0dXM6IFwiTk9UX0lOSVRJQUxJWkVEXCIgfCBcIklOSVRJQUxJWkVEXCIgfCBcIk5PVF9BVkFJTEFCTEVcIiA9IFwiTk9UX0lOSVRJQUxJWkVEXCI7XG5cbiAgY29uc3RydWN0b3IoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgdGhpcy52aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0KTtcbiAgfVxuXG4gIF9pbnRpYWxpemVUZXh0RGVjb2RlcigpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbC5UZXh0RGVjb2RlciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5fZGVjb2RlclN0YXR1cyA9IFwiTk9UX0FWQUlMQUJMRVwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLl9kZWNvZGVyID0gbmV3IGdsb2JhbC5UZXh0RGVjb2RlcihcImFzY2lpXCIpO1xuICAgICAgdGhpcy5fZGVjb2RlclN0YXR1cyA9IFwiSU5JVElBTElaRURcIjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBTd2FsbG93IHRoZSBlcnJvciBpZiB3ZSBkb24ndCBzdXBwb3J0IGFzY2lpIGVuY29kaW5nLlxuICAgICAgdGhpcy5fZGVjb2RlclN0YXR1cyA9IFwiTk9UX0FWQUlMQUJMRVwiO1xuICAgIH1cbiAgfVxuXG4gIGpzb24oKTogbWl4ZWQge1xuICAgIGNvbnN0IHJlc3VsdFN0cmluZyA9IHRoaXMuc3RyaW5nKCk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3VsdFN0cmluZyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gYENvdWxkIG5vdCBwYXJzZSAke3Jlc3VsdFN0cmluZ31gO1xuICAgIH1cbiAgfVxuXG4gIHN0cmluZygpIHtcbiAgICBjb25zdCBsZW4gPSB0aGlzLmludDMyKCk7XG4gICAgY29uc3QgY29kZVBvaW50cyA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLmJ1ZmZlciwgdGhpcy5idWZmZXIuYnl0ZU9mZnNldCArIHRoaXMub2Zmc2V0LCBsZW4pO1xuICAgIHRoaXMub2Zmc2V0ICs9IGxlbjtcblxuICAgIC8vIGlmIHRoZSBzdHJpbmcgaXMgcmVsYXRpdmVseSBzaG9ydCB3ZSBjYW4gdXNlIGFwcGx5LCBidXQgbG9uZ2VyIHN0cmluZ3MgY2FuIGJlbmVmaXQgZnJvbSB0aGUgc3BlZWQgb2YgVGV4dERlY29kZXIuXG4gICAgaWYgKGNvZGVQb2ludHMubGVuZ3RoIDwgMTAwMCkge1xuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVBvaW50cyk7XG4gICAgfVxuXG4gICAgLy8gVXNlIFRleHREZWNvZGVyIGlmIGl0IGlzIGF2YWlsYWJsZSBhbmQgc3VwcG9ydHMgdGhlIFwiYXNjaWlcIiBlbmNvZGluZy5cbiAgICBpZiAodGhpcy5fZGVjb2RlclN0YXR1cyA9PT0gXCJOT1RfSU5JVElBTElaRURcIikge1xuICAgICAgdGhpcy5faW50aWFsaXplVGV4dERlY29kZXIoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2RlY29kZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWNvZGVyLmRlY29kZShjb2RlUG9pbnRzKTtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIHVzZSBzdHJpbmcgY29uY2F0ZW50YXRpb24uXG4gICAgbGV0IGRhdGEgPSBcIlwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGRhdGEgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlUG9pbnRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBib29sKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQ4KCkgIT09IDA7XG4gIH1cblxuICBpbnQ4KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCsrKTtcbiAgfVxuXG4gIHVpbnQ4KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0VWludDgodGhpcy5vZmZzZXQrKyk7XG4gIH1cblxuICB0eXBlZEFycmF5KGxlbjogP251bWJlciwgYXJyYXlUeXBlOiBUeXBlZEFycmF5Q29uc3RydWN0b3IpIHtcbiAgICBjb25zdCBhcnJheUxlbmd0aCA9IGxlbiA9PSBudWxsID8gdGhpcy51aW50MzIoKSA6IGxlbjtcbiAgICBjb25zdCBkYXRhID0gbmV3IGFycmF5VHlwZSh0aGlzLnZpZXcuYnVmZmVyLCB0aGlzLm9mZnNldCArIHRoaXMudmlldy5ieXRlT2Zmc2V0LCBhcnJheUxlbmd0aCk7XG4gICAgdGhpcy5vZmZzZXQgKz0gYXJyYXlMZW5ndGg7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGludDE2KCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRJbnQxNih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdWludDE2KCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRVaW50MTYodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGludDMyKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRJbnQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdWludDMyKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRVaW50MzIodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZsb2F0MzIoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldEZsb2F0MzIodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZsb2F0NjQoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldEZsb2F0NjQodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGludDY0KCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIGludDUzLnJlYWRJbnQ2NExFKHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgdWludDY0KCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIGludDUzLnJlYWRVSW50NjRMRSh0aGlzLmJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxuXG4gIHRpbWUoKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gZXh0cmFjdFRpbWUodGhpcy5idWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICBkdXJhdGlvbigpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiBleHRyYWN0VGltZSh0aGlzLmJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxufVxuXG5jb25zdCBmaW5kVHlwZUJ5TmFtZSA9ICh0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdLCBuYW1lID0gXCJcIik6IE5hbWVkUm9zTXNnRGVmaW5pdGlvbiA9PiB7XG4gIGxldCBmb3VuZE5hbWUgPSBcIlwiOyAvLyB0cmFjayBuYW1lIHNlcGFyYXRlbHkgaW4gYSBub24tbnVsbCB2YXJpYWJsZSB0byBhcHBlYXNlIEZsb3dcbiAgY29uc3QgbWF0Y2hlcyA9IHR5cGVzLmZpbHRlcigodHlwZSkgPT4ge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gdHlwZS5uYW1lIHx8IFwiXCI7XG4gICAgLy8gaWYgdGhlIHNlYXJjaCBpcyBlbXB0eSwgcmV0dXJuIHVubmFtZWQgdHlwZXNcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiAhdHlwZU5hbWU7XG4gICAgfVxuICAgIC8vIHJldHVybiBpZiB0aGUgc2VhcmNoIGlzIGluIHRoZSB0eXBlIG5hbWVcbiAgICAvLyBvciBtYXRjaGVzIGV4YWN0bHkgaWYgYSBmdWxseS1xdWFsaWZpZWQgbmFtZSBtYXRjaCBpcyBwYXNzZWQgdG8gdXNcbiAgICBjb25zdCBuYW1lRW5kID0gbmFtZS5pbmRleE9mKFwiL1wiKSA+IC0xID8gbmFtZSA6IGAvJHtuYW1lfWA7XG4gICAgaWYgKHR5cGVOYW1lLmVuZHNXaXRoKG5hbWVFbmQpKSB7XG4gICAgICBmb3VuZE5hbWUgPSB0eXBlTmFtZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICBpZiAobWF0Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIDEgdG9wIGxldmVsIHR5cGUgZGVmaW5pdGlvbiBmb3IgJyR7bmFtZX0nIGJ1dCBmb3VuZCAke21hdGNoZXMubGVuZ3RofS5gKTtcbiAgfVxuICByZXR1cm4geyAuLi5tYXRjaGVzWzBdLCBuYW1lOiBmb3VuZE5hbWUgfTtcbn07XG5cbmNvbnN0IGZyaWVuZGx5TmFtZSA9IChuYW1lOiBzdHJpbmcpID0+IG5hbWUucmVwbGFjZSgvXFwvL2csIFwiX1wiKTtcblxuY29uc3QgY3JlYXRlUGFyc2VyID0gKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10sIGZyZWV6ZTogYm9vbGVhbikgPT4ge1xuICBjb25zdCB1bm5hbWVkVHlwZXMgPSB0eXBlcy5maWx0ZXIoKHR5cGUpID0+ICF0eXBlLm5hbWUpO1xuICBpZiAodW5uYW1lZFR5cGVzLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm11bHRpcGxlIHVubmFtZWQgdHlwZXNcIik7XG4gIH1cblxuICBjb25zdCBbdW5uYW1lZFR5cGVdID0gdW5uYW1lZFR5cGVzO1xuXG4gIGNvbnN0IG5hbWVkVHlwZXM6IE5hbWVkUm9zTXNnRGVmaW5pdGlvbltdID0gKHR5cGVzLmZpbHRlcigodHlwZSkgPT4gISF0eXBlLm5hbWUpOiBhbnlbXSk7XG5cbiAgY29uc3QgY29uc3RydWN0b3JCb2R5ID0gKHR5cGU6IFJvc01zZ0RlZmluaXRpb24gfCBOYW1lZFJvc01zZ0RlZmluaXRpb24pID0+IHtcbiAgICBjb25zdCByZWFkZXJMaW5lczogc3RyaW5nW10gPSBbXTtcbiAgICB0eXBlLmRlZmluaXRpb25zLmZvckVhY2goKGRlZikgPT4ge1xuICAgICAgaWYgKGRlZi5pc0NvbnN0YW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChkZWYuaXNBcnJheSkge1xuICAgICAgICBpZiAoZGVmLnR5cGUgPT09IFwidWludDhcIiB8fCBkZWYudHlwZSA9PT0gXCJpbnQ4XCIpIHtcbiAgICAgICAgICBjb25zdCBhcnJheVR5cGUgPSBkZWYudHlwZSA9PT0gXCJ1aW50OFwiID8gXCJVaW50OEFycmF5XCIgOiBcIkludDhBcnJheVwiO1xuICAgICAgICAgIHJlYWRlckxpbmVzLnB1c2goYHRoaXMuJHtkZWYubmFtZX0gPSByZWFkZXIudHlwZWRBcnJheSgke1N0cmluZyhkZWYuYXJyYXlMZW5ndGgpfSwgJHthcnJheVR5cGV9KTtgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsZW5GaWVsZCA9IGBsZW5ndGhfJHtkZWYubmFtZX1gO1xuICAgICAgICAvLyBzZXQgYSB2YXJpYWJsZSBwb2ludGluZyB0byB0aGUgcGFyc2VkIGZpeGVkIGFycmF5IGxlbmd0aFxuICAgICAgICAvLyBvciByZWFkIHRoZSBieXRlIGluZGljYXRpbmcgdGhlIGR5bmFtaWMgbGVuZ3RoXG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goYHZhciAke2xlbkZpZWxkfSA9ICR7ZGVmLmFycmF5TGVuZ3RoID8gZGVmLmFycmF5TGVuZ3RoIDogXCJyZWFkZXIudWludDMyKCk7XCJ9YCk7XG5cbiAgICAgICAgLy8gb25seSBhbGxvY2F0ZSBhbiBhcnJheSBpZiB0aGVyZSBpcyBhIGxlbmd0aCAtIHNraXBzIGVtcHR5IGFsbG9jYXRpb25zXG4gICAgICAgIGNvbnN0IGFycmF5TmFtZSA9IGB0aGlzLiR7ZGVmLm5hbWV9YDtcblxuICAgICAgICAvLyBhbGxvY2F0ZSB0aGUgbmV3IGFycmF5IHRvIGEgZml4ZWQgbGVuZ3RoIHNpbmNlIHdlIGtub3cgaXQgYWhlYWQgb2YgdGltZVxuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAke2FycmF5TmFtZX0gPSBuZXcgQXJyYXkoJHtsZW5GaWVsZH0pYCk7XG4gICAgICAgIC8vIHN0YXJ0IHRoZSBmb3ItbG9vcFxuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGBmb3IgKHZhciBpID0gMDsgaSA8ICR7bGVuRmllbGR9OyBpKyspIHtgKTtcbiAgICAgICAgLy8gaWYgdGhlIHN1YiB0eXBlIGlzIGNvbXBsZXggd2UgbmVlZCB0byBhbGxvY2F0ZSBpdCBhbmQgcGFyc2UgaXRzIHZhbHVlc1xuICAgICAgICBpZiAoZGVmLmlzQ29tcGxleCkge1xuICAgICAgICAgIGNvbnN0IGRlZlR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmLnR5cGUpO1xuICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNhbGwgdGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgc3ViLXR5cGVcbiAgICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAgICR7YXJyYXlOYW1lfVtpXSA9IG5ldyBSZWNvcmQuJHtmcmllbmRseU5hbWUoZGVmVHlwZS5uYW1lKX0ocmVhZGVyKTtgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiB0aGUgc3VidHlwZSBpcyBub3QgY29tcGxleCBpdHMgYSBzaW1wbGUgbG93LWxldmVsIHJlYWRlciBvcGVyYXRpb25cbiAgICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAgICR7YXJyYXlOYW1lfVtpXSA9IHJlYWRlci4ke2RlZi50eXBlfSgpO2ApO1xuICAgICAgICB9XG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goXCJ9XCIpOyAvLyBjbG9zZSB0aGUgZm9yLWxvb3BcbiAgICAgIH0gZWxzZSBpZiAoZGVmLmlzQ29tcGxleCkge1xuICAgICAgICBjb25zdCBkZWZUeXBlID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZi50eXBlKTtcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgdGhpcy4ke2RlZi5uYW1lfSA9IG5ldyBSZWNvcmQuJHtmcmllbmRseU5hbWUoZGVmVHlwZS5uYW1lKX0ocmVhZGVyKTtgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goYHRoaXMuJHtkZWYubmFtZX0gPSByZWFkZXIuJHtkZWYudHlwZX0oKTtgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZnJlZXplKSB7XG4gICAgICByZWFkZXJMaW5lcy5wdXNoKFwiT2JqZWN0LmZyZWV6ZSh0aGlzKTtcIik7XG4gICAgfVxuICAgIHJldHVybiByZWFkZXJMaW5lcy5qb2luKFwiXFxuICAgIFwiKTtcbiAgfTtcblxuICBsZXQganMgPSBgXG4gIHZhciBSZWNvcmQgPSBmdW5jdGlvbiAocmVhZGVyKSB7XG4gICAgJHtjb25zdHJ1Y3RvckJvZHkodW5uYW1lZFR5cGUpfVxuICB9O1xcbmA7XG5cbiAgbmFtZWRUeXBlcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAganMgKz0gYFxuICBSZWNvcmQuJHtmcmllbmRseU5hbWUodC5uYW1lKX0gPSBmdW5jdGlvbihyZWFkZXIpIHtcbiAgICAke2NvbnN0cnVjdG9yQm9keSh0KX1cbiAgfTtcXG5gO1xuICB9KTtcblxuICBqcyArPSBgXG4gIHJldHVybiBmdW5jdGlvbiByZWFkKHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUmVjb3JkKHJlYWRlcik7XG4gIH07YDtcblxuICBsZXQgX3JlYWQ6IChyZWFkZXI6IFN0YW5kYXJkVHlwZVJlYWRlcikgPT4gYW55O1xuICB0cnkge1xuICAgIF9yZWFkID0gZXZhbChgKGZ1bmN0aW9uIGJ1aWxkUmVhZGVyKCkgeyAke2pzfSB9KSgpYCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiZXJyb3IgYnVpbGRpbmcgcGFyc2VyOlwiLCBqcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHRocm93IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oYnVmZmVyOiBCdWZmZXIpIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgU3RhbmRhcmRUeXBlUmVhZGVyKGJ1ZmZlcik7XG4gICAgcmV0dXJuIF9yZWFkKHJlYWRlcik7XG4gIH07XG59O1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVJlYWRlciB7XG4gIHJlYWRlcjogKGJ1ZmZlcjogQnVmZmVyKSA9PiBhbnk7XG5cbiAgLy8gdGFrZXMgYW4gb2JqZWN0IG1lc3NhZ2UgZGVmaW5pdGlvbiBhbmQgcmV0dXJuc1xuICAvLyBhIG1lc3NhZ2UgcmVhZGVyIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHJlYWQgbWVzc2FnZXMgYmFzZWRcbiAgLy8gb24gdGhlIG1lc3NhZ2UgZGVmaW5pdGlvblxuICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uczogUm9zTXNnRGVmaW5pdGlvbltdLCBvcHRpb25zOiB7IGZyZWV6ZT86ID9ib29sZWFuIH0gPSB7fSkge1xuICAgIGxldCBwYXJzZWREZWZpbml0aW9ucyA9IGRlZmluaXRpb25zO1xuICAgIGlmICh0eXBlb2YgcGFyc2VkRGVmaW5pdGlvbnMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiUGFzc2luZyBzdHJpbmcgbWVzc2FnZSBkZWZpbnRpb25zIHRvIE1lc3NhZ2VSZWFkZXIgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCBjYWxsIGBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uYCBvbiBpdCBhbmQgcGFzcyBpbiB0aGUgcmVzdWx0aW5nIHBhcnNlZCBtZXNzYWdlIGRlZmluaXRpb24gb2JqZWN0LlwiXG4gICAgICApO1xuICAgICAgcGFyc2VkRGVmaW5pdGlvbnMgPSBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uKHBhcnNlZERlZmluaXRpb25zKTtcbiAgICB9XG4gICAgdGhpcy5yZWFkZXIgPSBjcmVhdGVQYXJzZXIocGFyc2VkRGVmaW5pdGlvbnMsICEhb3B0aW9ucy5mcmVlemUpO1xuICB9XG5cbiAgcmVhZE1lc3NhZ2UoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkZXIoYnVmZmVyKTtcbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IGludDUzIGZyb20gXCJpbnQ1M1wiO1xuaW1wb3J0IHR5cGUgeyBUaW1lLCBSb3NNc2dEZWZpbml0aW9uLCBOYW1lZFJvc01zZ0RlZmluaXRpb24gfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vLyB3cml0ZSBhIFRpbWUgb2JqZWN0IHRvIGEgYnVmZmVyLlxuZnVuY3Rpb24gd3JpdGVUaW1lKHRpbWU6IFRpbWUsIGJ1ZmZlcjogQnVmZmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICBidWZmZXIud3JpdGVVSW50MzJMRSh0aW1lLnNlYywgb2Zmc2V0KTtcbiAgYnVmZmVyLndyaXRlVUludDMyTEUodGltZS5uc2VjLCBvZmZzZXQgKyA0KTtcbn1cblxuY2xhc3MgU3RhbmRhcmRUeXBlT2Zmc2V0Q2FsY3VsYXRvciB7XG4gIG9mZnNldCA9IDA7XG5cbiAgLy8gUmV0dXJucyB0aGUgY3VycmVudCBvZmZzZXQgYW5kIGluY3JlbWVudHMgdGhlIG5leHQgb2Zmc2V0IGJ5IGBieXRlQ291bnRgLlxuICBfaW5jcmVtZW50QW5kUmV0dXJuKGJ5dGVDb3VudDogbnVtYmVyKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5vZmZzZXQgKz0gYnl0ZUNvdW50O1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICAvLyBUaGVzZSBhcmUgbm90IGFjdHVhbGx5IHVzZWQgaW4gdGhlIFN0YW5kYXJkVHlwZVdyaXRlciwgc28gdGhleSBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRob3NlIGltcGxlbWVudGF0aW9ucy5cbiAganNvbih2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICAvLyBUaGUgZm9sbG93aW5nIGFyZSB1c2VkIGluIHRoZSBTdGFuZGFyZFR5cGVXcml0ZXIuXG4gIHN0cmluZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gaW50MzIgbGVuZ3RoXG4gICAgY29uc3QgbGVuZ3RoID0gNCArIHZhbHVlLmxlbmd0aDtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKGxlbmd0aCk7XG4gIH1cblxuICBib29sKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQ4KCk7XG4gIH1cblxuICBpbnQ4KCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oMSk7XG4gIH1cblxuICB1aW50OCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDEpO1xuICB9XG5cbiAgaW50MTYoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY3JlbWVudEFuZFJldHVybigyKTtcbiAgfVxuXG4gIHVpbnQxNigpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDIpO1xuICB9XG5cbiAgaW50MzIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY3JlbWVudEFuZFJldHVybig0KTtcbiAgfVxuXG4gIHVpbnQzMigpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDQpO1xuICB9XG5cbiAgZmxvYXQzMigpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDQpO1xuICB9XG5cbiAgZmxvYXQ2NCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDgpO1xuICB9XG5cbiAgaW50NjQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY3JlbWVudEFuZFJldHVybig4KTtcbiAgfVxuXG4gIHVpbnQ2NCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDgpO1xuICB9XG5cbiAgdGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDgpO1xuICB9XG5cbiAgZHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY3JlbWVudEFuZFJldHVybig4KTtcbiAgfVxufVxuXG4vLyB0aGlzIGhhcyBoYXJkLWNvZGVkIGJ1ZmZlciB3cml0aW5nIGZ1bmN0aW9ucyBmb3IgZWFjaFxuLy8gb2YgdGhlIHN0YW5kYXJkIG1lc3NhZ2UgdHlwZXMgaHR0cDovL2RvY3Mucm9zLm9yZy9hcGkvc3RkX21zZ3MvaHRtbC9pbmRleC1tc2cuaHRtbFxuLy8gZXZlbnR1YWxseSBjdXN0b20gdHlwZXMgZGVjb21wb3NlIGludG8gdGhlc2Ugc3RhbmRhcmQgdHlwZXNcbmNsYXNzIFN0YW5kYXJkVHlwZVdyaXRlciB7XG4gIGJ1ZmZlcjogQnVmZmVyO1xuICB2aWV3OiBEYXRhVmlldztcbiAgb2Zmc2V0Q2FsY3VsYXRvcjogU3RhbmRhcmRUeXBlT2Zmc2V0Q2FsY3VsYXRvcjtcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgIHRoaXMudmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIuYnVmZmVyLCBidWZmZXIuYnl0ZU9mZnNldCk7XG4gICAgdGhpcy5vZmZzZXRDYWxjdWxhdG9yID0gbmV3IFN0YW5kYXJkVHlwZU9mZnNldENhbGN1bGF0b3IoKTtcbiAgfVxuXG4gIGpzb24odmFsdWU6IGFueSkge1xuICAgIHRoaXMuc3RyaW5nKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICBzdHJpbmcodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IHN0cmluZ09mZnNldCA9IHRoaXMub2Zmc2V0Q2FsY3VsYXRvci5zdHJpbmcodmFsdWUpO1xuICAgIHRoaXMudmlldy5zZXRJbnQzMihzdHJpbmdPZmZzZXQsIHZhbHVlLmxlbmd0aCwgdHJ1ZSk7XG4gICAgdGhpcy5idWZmZXIud3JpdGUodmFsdWUsIHN0cmluZ09mZnNldCArIDQsIHZhbHVlLmxlbmd0aCwgXCJhc2NpaVwiKTtcbiAgfVxuXG4gIGJvb2wodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnVpbnQ4KHZhbHVlID8gMSA6IDApO1xuICB9XG5cbiAgaW50OCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy52aWV3LnNldEludDgodGhpcy5vZmZzZXRDYWxjdWxhdG9yLmludDgoKSwgdmFsdWUpO1xuICB9XG5cbiAgdWludDgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudmlldy5zZXRVaW50OCh0aGlzLm9mZnNldENhbGN1bGF0b3IudWludDgoKSwgdmFsdWUpO1xuICB9XG5cbiAgaW50MTYodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudmlldy5zZXRJbnQxNih0aGlzLm9mZnNldENhbGN1bGF0b3IuaW50MTYoKSwgdmFsdWUsIHRydWUpO1xuICB9XG5cbiAgdWludDE2KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnZpZXcuc2V0VWludDE2KHRoaXMub2Zmc2V0Q2FsY3VsYXRvci51aW50MTYoKSwgdmFsdWUsIHRydWUpO1xuICB9XG5cbiAgaW50MzIodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudmlldy5zZXRJbnQzMih0aGlzLm9mZnNldENhbGN1bGF0b3IuaW50MzIoKSwgdmFsdWUsIHRydWUpO1xuICB9XG5cbiAgdWludDMyKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnZpZXcuc2V0VWludDMyKHRoaXMub2Zmc2V0Q2FsY3VsYXRvci51aW50MzIoKSwgdmFsdWUsIHRydWUpO1xuICB9XG5cbiAgZmxvYXQzMih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy52aWV3LnNldEZsb2F0MzIodGhpcy5vZmZzZXRDYWxjdWxhdG9yLmZsb2F0MzIoKSwgdmFsdWUsIHRydWUpO1xuICB9XG5cbiAgZmxvYXQ2NCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy52aWV3LnNldEZsb2F0NjQodGhpcy5vZmZzZXRDYWxjdWxhdG9yLmZsb2F0NjQoKSwgdmFsdWUsIHRydWUpO1xuICB9XG5cbiAgaW50NjQodmFsdWU6IG51bWJlcikge1xuICAgIGludDUzLndyaXRlSW50NjRMRSh2YWx1ZSwgdGhpcy5idWZmZXIsIHRoaXMub2Zmc2V0Q2FsY3VsYXRvci5pbnQ2NCgpKTtcbiAgfVxuXG4gIHVpbnQ2NCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaW50NTMud3JpdGVVSW50NjRMRSh2YWx1ZSwgdGhpcy5idWZmZXIsIHRoaXMub2Zmc2V0Q2FsY3VsYXRvci51aW50NjQoKSk7XG4gIH1cblxuICB0aW1lKHRpbWU6IFRpbWUpIHtcbiAgICB3cml0ZVRpbWUodGltZSwgdGhpcy5idWZmZXIsIHRoaXMub2Zmc2V0Q2FsY3VsYXRvci50aW1lKCkpO1xuICB9XG5cbiAgZHVyYXRpb24odGltZTogVGltZSkge1xuICAgIHdyaXRlVGltZSh0aW1lLCB0aGlzLmJ1ZmZlciwgdGhpcy5vZmZzZXRDYWxjdWxhdG9yLnRpbWUoKSk7XG4gIH1cbn1cblxuY29uc3QgZmluZFR5cGVCeU5hbWUgPSAodHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSwgbmFtZSA9IFwiXCIpOiBOYW1lZFJvc01zZ0RlZmluaXRpb24gPT4ge1xuICBsZXQgZm91bmROYW1lID0gXCJcIjsgLy8gdHJhY2sgbmFtZSBzZXBhcmF0ZWx5IGluIGEgbm9uLW51bGwgdmFyaWFibGUgdG8gYXBwZWFzZSBGbG93XG4gIGNvbnN0IG1hdGNoZXMgPSB0eXBlcy5maWx0ZXIoKHR5cGUpID0+IHtcbiAgICBjb25zdCB0eXBlTmFtZSA9IHR5cGUubmFtZSB8fCBcIlwiO1xuICAgIC8vIGlmIHRoZSBzZWFyY2ggaXMgZW1wdHksIHJldHVybiB1bm5hbWVkIHR5cGVzXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gIXR5cGVOYW1lO1xuICAgIH1cbiAgICAvLyByZXR1cm4gaWYgdGhlIHNlYXJjaCBpcyBpbiB0aGUgdHlwZSBuYW1lXG4gICAgLy8gb3IgbWF0Y2hlcyBleGFjdGx5IGlmIGEgZnVsbHktcXVhbGlmaWVkIG5hbWUgbWF0Y2ggaXMgcGFzc2VkIHRvIHVzXG4gICAgY29uc3QgbmFtZUVuZCA9IG5hbWUuaW5kZXhPZihcIi9cIikgPiAtMSA/IG5hbWUgOiBgLyR7bmFtZX1gO1xuICAgIGlmICh0eXBlTmFtZS5lbmRzV2l0aChuYW1lRW5kKSkge1xuICAgICAgZm91bmROYW1lID0gdHlwZU5hbWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAxIHRvcCBsZXZlbCB0eXBlIGRlZmluaXRpb24gZm9yICcke25hbWV9JyBidXQgZm91bmQgJHttYXRjaGVzLmxlbmd0aH0uYCk7XG4gIH1cbiAgcmV0dXJuIHsgLi4ubWF0Y2hlc1swXSwgbmFtZTogZm91bmROYW1lIH07XG59O1xuXG5jb25zdCBmcmllbmRseU5hbWUgPSAobmFtZTogc3RyaW5nKSA9PiBuYW1lLnJlcGxhY2UoL1xcLy9nLCBcIl9cIik7XG50eXBlIFdyaXRlckFuZFNpemVDYWxjdWxhdG9yID0ge3xcbiAgd3JpdGVyOiAobWVzc2FnZTogYW55LCBidWZmZXJUb1dyaXRlOiBCdWZmZXIpID0+IEJ1ZmZlcixcbiAgYnVmZmVyU2l6ZUNhbGN1bGF0b3I6IChtZXNzYWdlOiBhbnkpID0+IG51bWJlcixcbnx9O1xuXG5mdW5jdGlvbiBjcmVhdGVXcml0ZXJBbmRTaXplQ2FsY3VsYXRvcih0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdKTogV3JpdGVyQW5kU2l6ZUNhbGN1bGF0b3Ige1xuICBjb25zdCB1bm5hbWVkVHlwZXMgPSB0eXBlcy5maWx0ZXIoKHR5cGUpID0+ICF0eXBlLm5hbWUpO1xuICBpZiAodW5uYW1lZFR5cGVzLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm11bHRpcGxlIHVubmFtZWQgdHlwZXNcIik7XG4gIH1cblxuICBjb25zdCBbdW5uYW1lZFR5cGVdID0gdW5uYW1lZFR5cGVzO1xuXG4gIGNvbnN0IG5hbWVkVHlwZXM6IE5hbWVkUm9zTXNnRGVmaW5pdGlvbltdID0gKHR5cGVzLmZpbHRlcigodHlwZSkgPT4gISF0eXBlLm5hbWUpOiBhbnlbXSk7XG5cbiAgY29uc3QgY29uc3RydWN0b3JCb2R5ID0gKHR5cGU6IFJvc01zZ0RlZmluaXRpb24gfCBOYW1lZFJvc01zZ0RlZmluaXRpb24sIGFyZ05hbWU6IFwib2Zmc2V0Q2FsY3VsYXRvclwiIHwgXCJ3cml0ZXJcIikgPT4ge1xuICAgIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHR5cGUuZGVmaW5pdGlvbnMuZm9yRWFjaCgoZGVmKSA9PiB7XG4gICAgICBpZiAoZGVmLmlzQ29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBBY2Nlc3NlcyB0aGUgZmllbGQgd2UgYXJlIGN1cnJlbnRseSB3cml0aW5nLiBQdWxsZWQgb3V0IGZvciBlYXN5IHJldXNlLlxuICAgICAgY29uc3QgYWNjZXNzTWVzc2FnZUZpZWxkID0gYG1lc3NhZ2VbXCIke2RlZi5uYW1lfVwiXWA7XG4gICAgICBpZiAoZGVmLmlzQXJyYXkpIHtcbiAgICAgICAgY29uc3QgbGVuRmllbGQgPSBgbGVuZ3RoXyR7ZGVmLm5hbWV9YDtcbiAgICAgICAgLy8gc2V0IGEgdmFyaWFibGUgcG9pbnRpbmcgdG8gdGhlIHBhcnNlZCBmaXhlZCBhcnJheSBsZW5ndGhcbiAgICAgICAgLy8gb3Igd3JpdGUgdGhlIGJ5dGUgaW5kaWNhdGluZyB0aGUgZHluYW1pYyBsZW5ndGhcbiAgICAgICAgaWYgKGRlZi5hcnJheUxlbmd0aCkge1xuICAgICAgICAgIGxpbmVzLnB1c2goYHZhciAke2xlbkZpZWxkfSA9ICR7ZGVmLmFycmF5TGVuZ3RofTtgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaW5lcy5wdXNoKGB2YXIgJHtsZW5GaWVsZH0gPSAke2FjY2Vzc01lc3NhZ2VGaWVsZH0ubGVuZ3RoO2ApO1xuICAgICAgICAgIGxpbmVzLnB1c2goYCR7YXJnTmFtZX0udWludDMyKCR7bGVuRmllbGR9KTtgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXJ0IHRoZSBmb3ItbG9vcFxuICAgICAgICBsaW5lcy5wdXNoKGBmb3IgKHZhciBpID0gMDsgaSA8ICR7bGVuRmllbGR9OyBpKyspIHtgKTtcbiAgICAgICAgLy8gaWYgdGhlIHN1YiB0eXBlIGlzIGNvbXBsZXggd2UgbmVlZCB0byBhbGxvY2F0ZSBpdCBhbmQgcGFyc2UgaXRzIHZhbHVlc1xuICAgICAgICBpZiAoZGVmLmlzQ29tcGxleCkge1xuICAgICAgICAgIGNvbnN0IGRlZlR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmLnR5cGUpO1xuICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNhbGwgdGhlIGZ1bmN0aW9uIGZvciB0aGUgc3ViLXR5cGVcbiAgICAgICAgICBsaW5lcy5wdXNoKGAgICR7ZnJpZW5kbHlOYW1lKGRlZlR5cGUubmFtZSl9KCR7YXJnTmFtZX0sICR7YWNjZXNzTWVzc2FnZUZpZWxkfVtpXSk7YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHN1YnR5cGUgaXMgbm90IGNvbXBsZXggaXRzIGEgc2ltcGxlIGxvdy1sZXZlbCBvcGVyYXRpb25cbiAgICAgICAgICBsaW5lcy5wdXNoKGAgICR7YXJnTmFtZX0uJHtkZWYudHlwZX0oJHthY2Nlc3NNZXNzYWdlRmllbGR9W2ldKTtgKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5lcy5wdXNoKFwifVwiKTsgLy8gY2xvc2UgdGhlIGZvci1sb29wXG4gICAgICB9IGVsc2UgaWYgKGRlZi5pc0NvbXBsZXgpIHtcbiAgICAgICAgY29uc3QgZGVmVHlwZSA9IGZpbmRUeXBlQnlOYW1lKHR5cGVzLCBkZWYudHlwZSk7XG4gICAgICAgIGxpbmVzLnB1c2goYCR7ZnJpZW5kbHlOYW1lKGRlZlR5cGUubmFtZSl9KCR7YXJnTmFtZX0sICR7YWNjZXNzTWVzc2FnZUZpZWxkfSk7YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDYWxsIHByaW1pdGl2ZXMgZGlyZWN0bHkuXG4gICAgICAgIGxpbmVzLnB1c2goYCR7YXJnTmFtZX0uJHtkZWYudHlwZX0oJHthY2Nlc3NNZXNzYWdlRmllbGR9KTtgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbGluZXMuam9pbihcIlxcbiAgICBcIik7XG4gIH07XG5cbiAgbGV0IHdyaXRlckpzID0gXCJcIjtcbiAgbGV0IGNhbGN1bGF0ZVNpemVKcyA9IFwiXCI7XG5cbiAgbmFtZWRUeXBlcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgd3JpdGVySnMgKz0gYFxuICBmdW5jdGlvbiAke2ZyaWVuZGx5TmFtZSh0Lm5hbWUpfSh3cml0ZXIsIG1lc3NhZ2UpIHtcbiAgICAke2NvbnN0cnVjdG9yQm9keSh0LCBcIndyaXRlclwiKX1cbiAgfTtcXG5gO1xuICAgIGNhbGN1bGF0ZVNpemVKcyArPSBgXG4gIGZ1bmN0aW9uICR7ZnJpZW5kbHlOYW1lKHQubmFtZSl9KG9mZnNldENhbGN1bGF0b3IsIG1lc3NhZ2UpIHtcbiAgICAke2NvbnN0cnVjdG9yQm9keSh0LCBcIm9mZnNldENhbGN1bGF0b3JcIil9XG4gIH07XFxuYDtcbiAgfSk7XG5cbiAgd3JpdGVySnMgKz0gYFxuICByZXR1cm4gZnVuY3Rpb24gd3JpdGUod3JpdGVyLCBtZXNzYWdlKSB7XG4gICAgJHtjb25zdHJ1Y3RvckJvZHkodW5uYW1lZFR5cGUsIFwid3JpdGVyXCIpfVxuICAgIHJldHVybiB3cml0ZXIuYnVmZmVyO1xuICB9O2A7XG4gIGNhbGN1bGF0ZVNpemVKcyArPSBgXG4gIHJldHVybiBmdW5jdGlvbiBjYWxjdWxhdGVTaXplKG9mZnNldENhbGN1bGF0b3IsIG1lc3NhZ2UpIHtcbiAgICAke2NvbnN0cnVjdG9yQm9keSh1bm5hbWVkVHlwZSwgXCJvZmZzZXRDYWxjdWxhdG9yXCIpfVxuICAgIHJldHVybiBvZmZzZXRDYWxjdWxhdG9yLm9mZnNldDtcbiAgfTtgO1xuXG4gIGxldCBfd3JpdGU6ICh3cml0ZXI6IFN0YW5kYXJkVHlwZVdyaXRlciwgbWVzc2FnZTogYW55KSA9PiBCdWZmZXI7XG4gIGxldCBfY2FsY3VsYXRlU2l6ZTogKG9mZnNldENhbGN1bGF0b3I6IFN0YW5kYXJkVHlwZU9mZnNldENhbGN1bGF0b3IsIG1lc3NhZ2U6IGFueSkgPT4gbnVtYmVyO1xuICB0cnkge1xuICAgIF93cml0ZSA9IGV2YWwoYChmdW5jdGlvbiBidWlsZFdyaXRlcigpIHsgJHt3cml0ZXJKc30gfSkoKWApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcImVycm9yIGJ1aWxkaW5nIHdyaXRlcjpcIiwgd3JpdGVySnMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB0aHJvdyBlO1xuICB9XG4gIHRyeSB7XG4gICAgX2NhbGN1bGF0ZVNpemUgPSBldmFsKGAoZnVuY3Rpb24gYnVpbGRTaXplQ2FsY3VsYXRvcigpIHsgJHtjYWxjdWxhdGVTaXplSnN9IH0pKClgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvciBidWlsZGluZyBzaXplIGNhbGN1bGF0b3I6XCIsIGNhbGN1bGF0ZVNpemVKcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHRocm93IGU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdyaXRlcjogZnVuY3Rpb24obWVzc2FnZTogYW55LCBidWZmZXI6IEJ1ZmZlcik6IEJ1ZmZlciB7XG4gICAgICBjb25zdCB3cml0ZXIgPSBuZXcgU3RhbmRhcmRUeXBlV3JpdGVyKGJ1ZmZlcik7XG4gICAgICByZXR1cm4gX3dyaXRlKHdyaXRlciwgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBidWZmZXJTaXplQ2FsY3VsYXRvcihtZXNzYWdlOiBhbnkpOiBudW1iZXIge1xuICAgICAgY29uc3Qgb2Zmc2V0Q2FsY3VsYXRvciA9IG5ldyBTdGFuZGFyZFR5cGVPZmZzZXRDYWxjdWxhdG9yKCk7XG4gICAgICByZXR1cm4gX2NhbGN1bGF0ZVNpemUob2Zmc2V0Q2FsY3VsYXRvciwgbWVzc2FnZSk7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VXcml0ZXIge1xuICB3cml0ZXI6IChtZXNzYWdlOiBhbnksIGJ1ZmZlclRvV3JpdGU6IEJ1ZmZlcikgPT4gQnVmZmVyO1xuICBidWZmZXJTaXplQ2FsY3VsYXRvcjogKG1lc3NhZ2U6IGFueSkgPT4gbnVtYmVyO1xuXG4gIC8vIHRha2VzIGFuIG9iamVjdCBzdHJpbmcgbWVzc2FnZSBkZWZpbml0aW9uIGFuZCByZXR1cm5zXG4gIC8vIGEgbWVzc2FnZSB3cml0ZXIgd2hpY2ggY2FuIGJlIHVzZWQgdG8gd3JpdGUgbWVzc2FnZXMgYmFzZWRcbiAgLy8gb24gdGhlIG1lc3NhZ2UgZGVmaW5pdGlvblxuICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uczogUm9zTXNnRGVmaW5pdGlvbltdKSB7XG4gICAgY29uc3QgeyB3cml0ZXIsIGJ1ZmZlclNpemVDYWxjdWxhdG9yIH0gPSBjcmVhdGVXcml0ZXJBbmRTaXplQ2FsY3VsYXRvcihkZWZpbml0aW9ucyk7XG4gICAgdGhpcy53cml0ZXIgPSB3cml0ZXI7XG4gICAgdGhpcy5idWZmZXJTaXplQ2FsY3VsYXRvciA9IGJ1ZmZlclNpemVDYWxjdWxhdG9yO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgYnVmZmVyIHNpemUgbmVlZGVkIHRvIHdyaXRlIHRoaXMgbWVzc2FnZSBpbiBieXRlcy5cbiAgY2FsY3VsYXRlQnVmZmVyU2l6ZShtZXNzYWdlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXJTaXplQ2FsY3VsYXRvcihtZXNzYWdlKTtcbiAgfVxuXG4gIC8vIGJ1ZmZlclRvV3JpdGUgaXMgb3B0aW9uYWwgLSBpZiBpdCBpcyBub3QgcHJvdmlkZWQsIGEgYnVmZmVyIHdpbGwgYmUgZ2VuZXJhdGVkLlxuICB3cml0ZU1lc3NhZ2UobWVzc2FnZTogYW55LCBidWZmZXJUb1dyaXRlPzogQnVmZmVyKSB7XG4gICAgbGV0IGJ1ZmZlciA9IGJ1ZmZlclRvV3JpdGU7XG4gICAgaWYgKCFidWZmZXIpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSB0aGlzLmNhbGN1bGF0ZUJ1ZmZlclNpemUobWVzc2FnZSk7XG4gICAgICBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUoYnVmZmVyU2l6ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndyaXRlcihtZXNzYWdlLCBidWZmZXIpO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vLyByZXByZXNlbnRzIGEgcmVzdWx0IHBhc3NlZCB0byB0aGUgY2FsbGJhY2sgZnJvbSB0aGUgaGlnaC1sZXZlbCBjYWxsOlxuLy8gYmFnLnJlYWRNZXNzYWdlcyh7IG9wdHM6IGFueSB9LCBjYWxsYmFjazogKFJlYWRSZXN1bHQpID0+IHZvaWQpID0+IFByb21pc2U8dm9pZD5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWRSZXN1bHQ8VD4ge1xuICB0b3BpYzogc3RyaW5nO1xuICBtZXNzYWdlOiBUO1xuICB0aW1lc3RhbXA6IFRpbWU7XG4gIGRhdGE6IEJ1ZmZlcjtcbiAgY2h1bmtPZmZzZXQ6IG51bWJlcjtcbiAgdG90YWxDaHVua3M6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB0b3BpYzogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IFQsXG4gICAgdGltZXN0YW1wOiBUaW1lLFxuICAgIGRhdGE6IEJ1ZmZlcixcbiAgICBjaHVua09mZnNldDogbnVtYmVyLFxuICAgIHRvdGFsQ2h1bmtzOiBudW1iZXIsXG4gICAgZnJlZXplPzogP2Jvb2xlYW5cbiAgKSB7XG4gICAgLy8gc3RyaW5nOiB0aGUgdG9waWMgdGhlIG1lc3NhZ2Ugd2FzIG9uXG4gICAgdGhpcy50b3BpYyA9IHRvcGljO1xuXG4gICAgLy8gYW55OiB0aGUgcGFyc2VkIGJvZHkgb2YgdGhlIG1lc3NhZ2UgYmFzZWQgb24gY29ubmVjdGlvbi5tZXNzYWdlRGVmaW5pdGlvblxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAvLyB0aW1lOiB0aGUgdGltZXN0YW1wIG9mIHRoZSBtZXNzYWdlXG4gICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG5cbiAgICAvLyBidWZmZXI6IHJhdyBidWZmZXIgZGF0YSBvZiB0aGUgbWVzc2FnZVxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAvLyB0aGUgb2Zmc2V0IG9mIHRoZSBjdXJyZW50bHkgcmVhZCBjaHVua1xuICAgIHRoaXMuY2h1bmtPZmZzZXQgPSBjaHVua09mZnNldDtcblxuICAgIC8vIHRoZSB0b3RhbCBudW1iZXIgb2YgY2h1bmtzIGluIHRoZSByZWFkIG9wZXJhdGlvblxuICAgIHRoaXMudG90YWxDaHVua3MgPSB0b3RhbENodW5rcztcblxuICAgIGlmIChmcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUodGltZXN0YW1wKTtcbiAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbURhdGUoZGF0ZTogRGF0ZSkge1xuICBjb25zdCBzZWMgPSBNYXRoLmZsb29yKGRhdGUuZ2V0VGltZSgpIC8gMTAwMCk7XG4gIGNvbnN0IG5zZWMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpICogMWU2O1xuICByZXR1cm4geyBzZWMsIG5zZWMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZSh0aW1lOiBUaW1lKSB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lLnNlYyAqIDFlMyArIHRpbWUubnNlYyAvIDFlNik7XG59XG5cbi8vIGNvbXBhcmUgdHdvIHRpbWVzLCByZXR1cm5pbmcgYSBuZWdhdGl2ZSB2YWx1ZSBpZiB0aGUgcmlnaHQgaXMgZ3JlYXRlclxuLy8gb3IgYSBwb3NpdGl2ZSB2YWx1ZSBpZiB0aGUgbGVmdCBpcyBncmVhdGVyIG9yIDAgaWYgdGhlIHRpbWVzIGFyZSBlcXVhbFxuLy8gdXNlZnVsIHRvIHN1cHBseSB0byBBcnJheS5wcm90b3R5cGUuc29ydFxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmUobGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgY29uc3Qgc2VjRGlmZiA9IGxlZnQuc2VjIC0gcmlnaHQuc2VjO1xuICByZXR1cm4gc2VjRGlmZiB8fCBsZWZ0Lm5zZWMgLSByaWdodC5uc2VjO1xufVxuXG4vLyByZXR1cm5zIHRydWUgaWYgdGhlIGxlZnQgdGltZSBpcyBsZXNzIHRoYW4gdGhlIHJpZ2h0IHRpbWUsIG90aGVyd2lzZSBmYWxzZVxuZXhwb3J0IGZ1bmN0aW9uIGlzTGVzc1RoYW4obGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgcmV0dXJuIHRoaXMuY29tcGFyZShsZWZ0LCByaWdodCkgPCAwO1xufVxuXG4vLyByZXR1cm5zIHRydWUgaWYgdGhlIGxlZnQgdGltZSBpcyBncmVhdGVyIHRoYW4gdGhlIHJpZ2h0IHRpbWUsIG90aGVyd2lzZSBmYWxzZVxuZXhwb3J0IGZ1bmN0aW9uIGlzR3JlYXRlclRoYW4obGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgcmV0dXJuIHRoaXMuY29tcGFyZShsZWZ0LCByaWdodCkgPiAwO1xufVxuXG4vLyByZXR1cm5zIHRydWUgaWYgYm90aCB0aW1lcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBzZWNvbmRzIGFuZCBuYW5vc2Vjb25kc1xuZXhwb3J0IGZ1bmN0aW9uIGFyZVNhbWUobGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgcmV0dXJuIGxlZnQuc2VjID09PSByaWdodC5zZWMgJiYgbGVmdC5uc2VjID09PSByaWdodC5uc2VjO1xufVxuXG5mdW5jdGlvbiB0b1N0cmluZyh0aW1lOiBUaW1lKSB7XG4gIHJldHVybiBgeyR7dGltZS5zZWN9LCAke3RpbWUubnNlY319YDtcbn1cblxuLy8gY29tcHV0ZXMgdGhlIHN1bSBvZiB0d28gdGltZXMgb3IgZHVyYXRpb25zIGFuZCByZXR1cm5zIGEgbmV3IHRpbWVcbi8vIHRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHJlc3VsdGluZyB0aW1lIGlzIG5lZ2F0aXZlXG5leHBvcnQgZnVuY3Rpb24gYWRkKGxlZnQ6IFRpbWUsIHJpZ2h0OiBUaW1lKSB7XG4gIGNvbnN0IGR1cmF0aW9uTmFub3MgPSBsZWZ0Lm5zZWMgKyByaWdodC5uc2VjO1xuICBjb25zdCBzZWNzRnJvbU5hbm9zID0gTWF0aC5mbG9vcihkdXJhdGlvbk5hbm9zIC8gMWU5KTtcbiAgY29uc3QgbmV3U2VjcyA9IGxlZnQuc2VjICsgcmlnaHQuc2VjICsgc2Vjc0Zyb21OYW5vcztcbiAgY29uc3QgcmVtYWluaW5nRHVyYXRpb25OYW5vcyA9IGR1cmF0aW9uTmFub3MgJSAxZTk7XG4gIC8vIHVzZSBNYXRoLmFicyBoZXJlIHRvIHByZXZlbnQgLTAgd2hlbiB0aGVyZSBpcyBleGFjdGx5IDEgc2Vjb25kIG9mIG5lZ2F0aXZlIG5hbm9zZWNvbmRzIHBhc3NlZCBpblxuICBjb25zdCBuZXdOYW5vcyA9IE1hdGguYWJzKFxuICAgIE1hdGguc2lnbihyZW1haW5pbmdEdXJhdGlvbk5hbm9zKSA9PT0gLTEgPyAxZTkgKyByZW1haW5pbmdEdXJhdGlvbk5hbm9zIDogcmVtYWluaW5nRHVyYXRpb25OYW5vc1xuICApO1xuICBjb25zdCByZXN1bHQgPSB7IHNlYzogbmV3U2VjcywgbnNlYzogbmV3TmFub3MgfTtcbiAgaWYgKHJlc3VsdC5zZWMgPCAwIHx8IHJlc3VsdC5uc2VjIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBJbnZhbGlkIHRpbWU6ICR7dG9TdHJpbmcocmVzdWx0KX0gcHJvZHVjZWQgZnJvbSBUaW1lVXRpbC5hZGQoJHt0b1N0cmluZyhsZWZ0KX0sICR7dG9TdHJpbmcocmlnaHQpfX0pYFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCBCYWdSZWFkZXIsIHsgdHlwZSBEZWNvbXByZXNzIH0gZnJvbSBcIi4vQmFnUmVhZGVyXCI7XG5pbXBvcnQgeyBNZXNzYWdlUmVhZGVyIH0gZnJvbSBcIi4vTWVzc2FnZVJlYWRlclwiO1xuaW1wb3J0IFJlYWRSZXN1bHQgZnJvbSBcIi4vUmVhZFJlc3VsdFwiO1xuaW1wb3J0IHsgQmFnSGVhZGVyLCBDaHVua0luZm8sIENvbm5lY3Rpb24sIE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vcmVjb3JkXCI7XG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0ICogYXMgVGltZVV0aWwgZnJvbSBcIi4vVGltZVV0aWxcIjtcbmltcG9ydCB7IHBhcnNlTWVzc2FnZURlZmluaXRpb24gfSBmcm9tIFwiLi9wYXJzZU1lc3NhZ2VEZWZpbml0aW9uXCI7XG5cbmV4cG9ydCB0eXBlIFJlYWRPcHRpb25zID0ge3xcbiAgZGVjb21wcmVzcz86IERlY29tcHJlc3MsXG4gIG5vUGFyc2U/OiBib29sZWFuLFxuICB0b3BpY3M/OiBzdHJpbmdbXSxcbiAgc3RhcnRUaW1lPzogVGltZSxcbiAgZW5kVGltZT86IFRpbWUsXG4gIGZyZWV6ZT86ID9ib29sZWFuLFxufH07XG5cbi8vIHRoZSBoaWdoIGxldmVsIHJvc2JhZyBpbnRlcmZhY2Vcbi8vIGNyZWF0ZSBhIG5ldyBiYWcgYnkgY2FsbGluZzpcbi8vIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbignLi9wYXRoLXRvLWZpbGUuYmFnJylgIGluIG5vZGUgb3Jcbi8vIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbihmaWxlc1swXSlgIGluIHRoZSBicm93c2VyXG4vL1xuLy8gYWZ0ZXIgdGhhdCB5b3UgY2FuIGNvbnN1bWUgbWVzc2FnZXMgYnkgY2FsbGluZ1xuLy8gYGF3YWl0IGJhZy5yZWFkTWVzc2FnZXMoeyB0b3BpY3M6IFsnL2ZvbyddIH0sXG4vLyAgICAocmVzdWx0KSA9PiBjb25zb2xlLmxvZyhyZXN1bHQudG9waWMsIHJlc3VsdC5tZXNzYWdlKSlgXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWcge1xuICByZWFkZXI6IEJhZ1JlYWRlcjtcbiAgaGVhZGVyOiBCYWdIZWFkZXI7XG4gIGNvbm5lY3Rpb25zOiB7IFtjb25uOiBudW1iZXJdOiBDb25uZWN0aW9uIH07XG4gIGNodW5rSW5mb3M6IENodW5rSW5mb1tdO1xuICBzdGFydFRpbWU6ID9UaW1lO1xuICBlbmRUaW1lOiA/VGltZTtcblxuICAvLyB5b3UgY2FuIG9wdGlvbmFsbHkgY3JlYXRlIGEgYmFnIG1hbnVhbGx5IHBhc3NpbmcgaW4gYSBiYWdSZWFkZXIgaW5zdGFuY2VcbiAgY29uc3RydWN0b3IoYmFnUmVhZGVyOiBCYWdSZWFkZXIpIHtcbiAgICB0aGlzLnJlYWRlciA9IGJhZ1JlYWRlcjtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBzdGF0aWMgb3BlbiA9IChmaWxlOiBGaWxlIHwgc3RyaW5nKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJUaGlzIG1ldGhvZCBzaG91bGQgaGF2ZSBiZWVuIG92ZXJyaWRkZW4gYmFzZWQgb24gdGhlIGVudmlyb25tZW50LiBNYWtlIHN1cmUgeW91IGFyZSBjb3JyZWN0bHkgaW1wb3J0aW5nIHRoZSBub2RlIG9yIHdlYiB2ZXJzaW9uIG9mIEJhZy5cIlxuICAgICk7XG4gIH07XG5cbiAgLy8gaWYgdGhlIGJhZyBpcyBtYW51YWxseSBjcmVhdGVkIHdpdGggdGhlIGNvbnN0cnVjdG9yLCB5b3UgbXVzdCBjYWxsIGBhd2FpdCBvcGVuKClgIG9uIHRoZSBiYWdcbiAgLy8gZ2VuZXJhbGx5IHRoaXMgaXMgY2FsbGVkIGZvciB5b3UgaWYgeW91J3JlIHVzaW5nIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbigpYFxuICBhc3luYyBvcGVuKCkge1xuICAgIHRoaXMuaGVhZGVyID0gYXdhaXQgdGhpcy5yZWFkZXIucmVhZEhlYWRlckFzeW5jKCk7XG4gICAgY29uc3QgeyBjb25uZWN0aW9uQ291bnQsIGNodW5rQ291bnQsIGluZGV4UG9zaXRpb24gfSA9IHRoaXMuaGVhZGVyO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZWFkZXIucmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvQXN5bmMoaW5kZXhQb3NpdGlvbiwgY29ubmVjdGlvbkNvdW50LCBjaHVua0NvdW50KTtcblxuICAgIHRoaXMuY29ubmVjdGlvbnMgPSB7fTtcblxuICAgIHJlc3VsdC5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zW2Nvbm5lY3Rpb24uY29ubl0gPSBjb25uZWN0aW9uO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jaHVua0luZm9zID0gcmVzdWx0LmNodW5rSW5mb3M7XG5cbiAgICBpZiAoY2h1bmtDb3VudCA+IDApIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5jaHVua0luZm9zWzBdLnN0YXJ0VGltZTtcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuY2h1bmtJbmZvc1tjaHVua0NvdW50IC0gMV0uZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZWFkTWVzc2FnZXMob3B0czogUmVhZE9wdGlvbnMsIGNhbGxiYWNrOiAobXNnOiBSZWFkUmVzdWx0PGFueT4pID0+IHZvaWQpIHtcbiAgICBjb25zdCBjb25uZWN0aW9ucyA9IHRoaXMuY29ubmVjdGlvbnM7XG5cbiAgICBjb25zdCBzdGFydFRpbWUgPSBvcHRzLnN0YXJ0VGltZSB8fCB7IHNlYzogMCwgbnNlYzogMCB9O1xuICAgIGNvbnN0IGVuZFRpbWUgPSBvcHRzLmVuZFRpbWUgfHwgeyBzZWM6IE51bWJlci5NQVhfVkFMVUUsIG5zZWM6IE51bWJlci5NQVhfVkFMVUUgfTtcbiAgICBjb25zdCB0b3BpY3MgPVxuICAgICAgb3B0cy50b3BpY3MgfHxcbiAgICAgIE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKS5tYXAoKGlkOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb25zW2lkXS50b3BpYztcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZmlsdGVyZWRDb25uZWN0aW9ucyA9IE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKVxuICAgICAgLmZpbHRlcigoaWQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gdG9waWNzLmluZGV4T2YoY29ubmVjdGlvbnNbaWRdLnRvcGljKSAhPT0gLTE7XG4gICAgICB9KVxuICAgICAgLm1hcCgoaWQpID0+ICtpZCk7XG5cbiAgICBjb25zdCB7IGRlY29tcHJlc3MgPSB7fSB9ID0gb3B0cztcblxuICAgIC8vIGZpbHRlciBjaHVua3MgdG8gdGhvc2Ugd2hpY2ggZmFsbCB3aXRoaW4gdGhlIHRpbWUgcmFuZ2Ugd2UncmUgYXR0ZW1wdGluZyB0byByZWFkXG4gICAgY29uc3QgY2h1bmtJbmZvcyA9IHRoaXMuY2h1bmtJbmZvcy5maWx0ZXIoKGluZm8pID0+IHtcbiAgICAgIHJldHVybiBUaW1lVXRpbC5jb21wYXJlKGluZm8uc3RhcnRUaW1lLCBlbmRUaW1lKSA8PSAwICYmIFRpbWVVdGlsLmNvbXBhcmUoc3RhcnRUaW1lLCBpbmZvLmVuZFRpbWUpIDw9IDA7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBwYXJzZU1zZyhtc2c6IE1lc3NhZ2VEYXRhLCBjaHVua09mZnNldDogbnVtYmVyKTogUmVhZFJlc3VsdDxhbnk+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBjb25uZWN0aW9uc1ttc2cuY29ubl07XG4gICAgICBjb25zdCB7IHRvcGljIH0gPSBjb25uZWN0aW9uO1xuICAgICAgY29uc3QgeyBkYXRhLCB0aW1lOiB0aW1lc3RhbXAgfSA9IG1zZztcbiAgICAgIGxldCBtZXNzYWdlID0gbnVsbDtcbiAgICAgIGlmICghb3B0cy5ub1BhcnNlKSB7XG4gICAgICAgIC8vIGxhemlseSBjcmVhdGUgYSByZWFkZXIgZm9yIHRoaXMgY29ubmVjdGlvbiBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgICAgIGNvbm5lY3Rpb24ucmVhZGVyID1cbiAgICAgICAgICBjb25uZWN0aW9uLnJlYWRlciB8fFxuICAgICAgICAgIG5ldyBNZXNzYWdlUmVhZGVyKHBhcnNlTWVzc2FnZURlZmluaXRpb24oY29ubmVjdGlvbi5tZXNzYWdlRGVmaW5pdGlvbiksIHsgZnJlZXplOiBvcHRzLmZyZWV6ZSB9KTtcbiAgICAgICAgbWVzc2FnZSA9IGNvbm5lY3Rpb24ucmVhZGVyLnJlYWRNZXNzYWdlKGRhdGEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzdWx0KHRvcGljLCBtZXNzYWdlLCB0aW1lc3RhbXAsIGRhdGEsIGNodW5rT2Zmc2V0LCBjaHVua0luZm9zLmxlbmd0aCwgb3B0cy5mcmVlemUpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5mbyA9IGNodW5rSW5mb3NbaV07XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHRoaXMucmVhZGVyLnJlYWRDaHVua01lc3NhZ2VzQXN5bmMoXG4gICAgICAgIGluZm8sXG4gICAgICAgIGZpbHRlcmVkQ29ubmVjdGlvbnMsXG4gICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgZW5kVGltZSxcbiAgICAgICAgZGVjb21wcmVzc1xuICAgICAgKTtcbiAgICAgIG1lc3NhZ2VzLmZvckVhY2goKG1zZykgPT4gY2FsbGJhY2socGFyc2VNc2cobXNnLCBpKSkpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBUaW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLy8gcmVhZHMgdGhyb3VnaCBhIGJ1ZmZlciBhbmQgZXh0cmFjdHMgeyBba2V5OiBzdHJpbmddOiB2YWx1ZTogc3RyaW5nIH1cbi8vIHBhaXJzIC0gdGhlIGJ1ZmZlciBpcyBleHBlY3RlZCB0byBoYXZlIGxlbmd0aCBwcmVmaXhlZCB1dGY4IHN0cmluZ3Ncbi8vIHdpdGggYSAnPScgc2VwYXJhdGluZyB0aGUga2V5IGFuZCB2YWx1ZVxuY29uc3QgRVFVQUxTX0NIQVJDT0RFID0gXCI9XCIuY2hhckNvZGVBdCgwKTtcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RmllbGRzKGJ1ZmZlcjogQnVmZmVyKSB7XG4gIGlmIChidWZmZXIubGVuZ3RoIDwgNCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlciBmaWVsZHMgYXJlIHRydW5jYXRlZC5cIik7XG4gIH1cblxuICBsZXQgaSA9IDA7XG4gIGNvbnN0IGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSA9IHt9O1xuXG4gIHdoaWxlIChpIDwgYnVmZmVyLmxlbmd0aCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRShpKTtcbiAgICBpICs9IDQ7XG5cbiAgICBpZiAoaSArIGxlbmd0aCA+IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlciBmaWVsZHMgYXJlIGNvcnJ1cHQuXCIpO1xuICAgIH1cblxuICAgIC8vIFBhc3NpbmcgYSBudW1iZXIgaW50byBcImluZGV4T2ZcIiBleHBsaWNpdGx5IHRvIGF2b2lkIEJ1ZmZlciBwb2x5ZmlsbFxuICAgIC8vIHNsb3cgcGF0aC4gU2VlIGlzc3VlICM4Ny5cbiAgICBjb25zdCBmaWVsZCA9IGJ1ZmZlci5zbGljZShpLCBpICsgbGVuZ3RoKTtcbiAgICBjb25zdCBpbmRleCA9IGZpZWxkLmluZGV4T2YoRVFVQUxTX0NIQVJDT0RFKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXIgZmllbGQgaXMgbWlzc2luZyBlcXVhbHMgc2lnbi5cIik7XG4gICAgfVxuXG4gICAgZmllbGRzW2ZpZWxkLnNsaWNlKDAsIGluZGV4KS50b1N0cmluZygpXSA9IGZpZWxkLnNsaWNlKGluZGV4ICsgMSk7XG4gICAgaSArPSBsZW5ndGg7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vLyByZWFkcyBhIFRpbWUgb2JqZWN0IG91dCBvZiBhIGJ1ZmZlciBhdCB0aGUgZ2l2ZW4gb2Zmc2V0XG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFRpbWUoYnVmZmVyOiBCdWZmZXIsIG9mZnNldDogbnVtYmVyKTogVGltZSB7XG4gIGNvbnN0IHNlYyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0KTtcbiAgY29uc3QgbnNlYyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0ICsgNCk7XG4gIHJldHVybiB7IHNlYywgbnNlYyB9O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHsgZXh0cmFjdEZpZWxkcyB9IGZyb20gXCIuL2ZpZWxkc1wiO1xuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSBcIi4vcmVjb3JkXCI7XG5cbi8vIGdpdmVuIGEgYnVmZmVyIHBhcnNlcyBvdXQgdGhlIHJlY29yZCB3aXRoaW4gdGhlIGJ1ZmZlclxuLy8gYmFzZWQgb24gdGhlIG9wY29kZSB0eXBlIGJpdFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSGVhZGVyPFQ6IFJlY29yZD4oYnVmZmVyOiBCdWZmZXIsIGNsczogQ2xhc3M8VD4gJiB7IG9wY29kZTogbnVtYmVyIH0pOiBUIHtcbiAgY29uc3QgZmllbGRzID0gZXh0cmFjdEZpZWxkcyhidWZmZXIpO1xuICBpZiAoZmllbGRzLm9wID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXIgaXMgbWlzc2luZyAnb3AnIGZpZWxkLlwiKTtcbiAgfVxuICBjb25zdCBvcGNvZGUgPSBmaWVsZHMub3AucmVhZFVJbnQ4KDApO1xuICBpZiAob3Bjb2RlICE9PSBjbHMub3Bjb2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAke2Nscy5uYW1lfSAoJHtjbHMub3Bjb2RlfSkgYnV0IGZvdW5kICR7b3Bjb2RlfWApO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBjbHMoZmllbGRzKTtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCAqIGFzIFRpbWVVdGlsIGZyb20gXCIuL1RpbWVVdGlsXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL2JhZ1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vQmFnUmVhZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9NZXNzYWdlUmVhZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9NZXNzYWdlV3JpdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9wYXJzZU1lc3NhZ2VEZWZpbml0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vZmllbGRzXCI7XG5leHBvcnQgeyBUaW1lVXRpbCB9O1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IEhlYXAgZnJvbSBcImhlYXBcIjtcblxuZnVuY3Rpb24gbm1lcmdlPFQ+KGtleTogKGE6IFQsIGI6IFQpID0+IG51bWJlciwgLi4uaXRlcmFibGVzOiBBcnJheTxJdGVyYXRvcjxUPj4pIHtcbiAgY29uc3QgaGVhcDogSGVhcDx7IGk6IG51bWJlciwgdmFsdWU6IFQgfT4gPSBuZXcgSGVhcCgoYSwgYikgPT4ge1xuICAgIHJldHVybiBrZXkoYS52YWx1ZSwgYi52YWx1ZSk7XG4gIH0pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGl0ZXJhYmxlc1tpXS5uZXh0KCk7XG4gICAgaWYgKCFkb25lKSB7XG4gICAgICBoZWFwLnB1c2goeyBpLCB2YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5leHQ6ICgpID0+IHtcbiAgICAgIGlmIChoZWFwLmVtcHR5KCkpIHtcbiAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgfVxuICAgICAgY29uc3QgeyBpIH0gPSBoZWFwLmZyb250KCk7XG4gICAgICBjb25zdCBuZXh0ID0gaXRlcmFibGVzW2ldLm5leHQoKTtcbiAgICAgIGlmIChuZXh0LmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGhlYXAucG9wKCkudmFsdWUsIGRvbmU6IGZhbHNlIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyB2YWx1ZTogaGVhcC5yZXBsYWNlKHsgaSwgdmFsdWU6IG5leHQudmFsdWUgfSkudmFsdWUsIGRvbmU6IGZhbHNlIH07XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbm1lcmdlO1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQge1xuICBNZXNzYWdlUmVhZGVyLFxuICBNZXNzYWdlV3JpdGVyLFxuICBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uLFxuICByb3NQcmltaXRpdmVUeXBlcyxcbiAgVGltZVV0aWwsXG4gIGV4dHJhY3RGaWVsZHMsXG4gIGV4dHJhY3RUaW1lLFxufSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCB0eXBlIHsgQ2FsbGJhY2sgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCBCYWcgZnJvbSBcIi4uL2JhZ1wiO1xuaW1wb3J0IEJhZ1JlYWRlciBmcm9tIFwiLi4vQmFnUmVhZGVyXCI7XG5cbi8vIHJlYWRlciB1c2luZyBub2RlanMgZnMgYXBpXG5leHBvcnQgY2xhc3MgUmVhZGVyIHtcbiAgX2ZpbGVuYW1lOiBzdHJpbmc7XG4gIF9mZDogP251bWJlcjtcbiAgX3NpemU6IG51bWJlcjtcbiAgX2J1ZmZlcjogQnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgIHRoaXMuX2ZkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3NpemUgPSAwO1xuICAgIHRoaXMuX2J1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKTtcbiAgfVxuXG4gIC8vIG9wZW4gYSBmaWxlIGZvciByZWFkaW5nXG4gIF9vcGVuKGNiOiAoZXJyb3I6ID9FcnJvcikgPT4gdm9pZCk6IHZvaWQge1xuICAgIGZzLnN0YXQodGhpcy5fZmlsZW5hbWUsIChlcnJvciwgc3RhdCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBjYihlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmcy5vcGVuKHRoaXMuX2ZpbGVuYW1lLCBcInJcIiwgKGVyciwgZmQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmQgPSBmZDtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHN0YXQuc2l6ZTtcbiAgICAgICAgcmV0dXJuIGNiKG51bGwpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZShjYjogKGVycm9yOiA/RXJyb3IpID0+IHZvaWQpIHtcbiAgICBpZiAodGhpcy5fZmQgIT0gbnVsbCkge1xuICAgICAgZnMuY2xvc2UodGhpcy5fZmQsIGNiKTtcbiAgICB9XG4gIH1cblxuICAvLyByZWFkIGxlbmd0aCAoYnl0ZXMpIHN0YXJ0aW5nIGZyb20gb2Zmc2V0IChieXRlcylcbiAgLy8gY2FsbGJhY2soZXJyLCBidWZmZXIpXG4gIHJlYWQob2Zmc2V0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBjYjogQ2FsbGJhY2s8QnVmZmVyPik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3BlbigoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiBlcnIgPyBjYihlcnIpIDogdGhpcy5yZWFkKG9mZnNldCwgbGVuZ3RoLCBjYik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGxlbmd0aCA+IHRoaXMuX2J1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICB0aGlzLl9idWZmZXIgPSBCdWZmZXIuYWxsb2MobGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZzLnJlYWQodGhpcy5fZmQsIHRoaXMuX2J1ZmZlciwgMCwgbGVuZ3RoLCBvZmZzZXQsIChlcnIsIGJ5dGVzLCBidWZmKSA9PiB7XG4gICAgICByZXR1cm4gZXJyID8gY2IoZXJyKSA6IGNiKG51bGwsIGJ1ZmYpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmV0dXJuIHRoZSBzaXplIG9mIHRoZSBmaWxlXG4gIHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cbn1cblxuY29uc3Qgb3BlbiA9IGFzeW5jIChmaWxlbmFtZTogRmlsZSB8IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGZpbGVuYW1lICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJFeHBlY3RlZCBmaWxlbmFtZSB0byBiZSBhIHN0cmluZy4gTWFrZSBzdXJlIHlvdSBhcmUgY29ycmVjdGx5IGltcG9ydGluZyB0aGUgbm9kZSBvciB3ZWIgdmVyc2lvbiBvZiBCYWcuXCJcbiAgICApO1xuICB9XG4gIGNvbnN0IGJhZyA9IG5ldyBCYWcobmV3IEJhZ1JlYWRlcihuZXcgUmVhZGVyKGZpbGVuYW1lKSkpO1xuICBhd2FpdCBiYWcub3BlbigpO1xuICByZXR1cm4gYmFnO1xufTtcbkJhZy5vcGVuID0gb3BlbjtcblxuZXhwb3J0ICogZnJvbSBcIi4uL3R5cGVzXCI7XG5leHBvcnQge1xuICBUaW1lVXRpbCxcbiAgQmFnUmVhZGVyLFxuICBNZXNzYWdlUmVhZGVyLFxuICBNZXNzYWdlV3JpdGVyLFxuICBvcGVuLFxuICBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uLFxuICByb3NQcmltaXRpdmVUeXBlcyxcbiAgZXh0cmFjdEZpZWxkcyxcbiAgZXh0cmFjdFRpbWUsXG59O1xuZXhwb3J0IGRlZmF1bHQgQmFnO1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBSb3NNc2dGaWVsZCwgUm9zTXNnRGVmaW5pdGlvbiB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8vIFNldCBvZiBidWlsdC1pbiByb3MgdHlwZXMuIFNlZSBodHRwOi8vd2lraS5yb3Mub3JnL21zZyNGaWVsZF9UeXBlc1xuZXhwb3J0IGNvbnN0IHJvc1ByaW1pdGl2ZVR5cGVzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoW1xuICBcInN0cmluZ1wiLFxuICBcImJvb2xcIixcbiAgXCJpbnQ4XCIsXG4gIFwidWludDhcIixcbiAgXCJpbnQxNlwiLFxuICBcInVpbnQxNlwiLFxuICBcImludDMyXCIsXG4gIFwidWludDMyXCIsXG4gIFwiZmxvYXQzMlwiLFxuICBcImZsb2F0NjRcIixcbiAgXCJpbnQ2NFwiLFxuICBcInVpbnQ2NFwiLFxuICBcInRpbWVcIixcbiAgXCJkdXJhdGlvblwiLFxuICBcImpzb25cIixcbl0pO1xuXG5mdW5jdGlvbiBub3JtYWxpemVUeXBlKHR5cGU6IHN0cmluZykge1xuICAvLyBOb3JtYWxpemUgZGVwcmVjYXRlZCBhbGlhc2VzLlxuICBsZXQgbm9ybWFsaXplZFR5cGUgPSB0eXBlO1xuICBpZiAodHlwZSA9PT0gXCJjaGFyXCIpIHtcbiAgICBub3JtYWxpemVkVHlwZSA9IFwidWludDhcIjtcbiAgfVxuICBpZiAodHlwZSA9PT0gXCJieXRlXCIpIHtcbiAgICBub3JtYWxpemVkVHlwZSA9IFwiaW50OFwiO1xuICB9XG4gIHJldHVybiBub3JtYWxpemVkVHlwZTtcbn1cblxuLy8gcmVwcmVzZW50cyBhIHNpbmdsZSBsaW5lIGluIGEgbWVzc2FnZSBkZWZpbml0aW9uIHR5cGVcbi8vIGUuZy4gJ3N0cmluZyBuYW1lJyAnQ3VzdG9tVHlwZVtdIGZvbycgJ3N0cmluZ1szXSBuYW1lcydcbmZ1bmN0aW9uIG5ld0FycmF5RGVmaW5pdGlvbih0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYXJyYXlMZW5ndGg6ID9udW1iZXIpOiBSb3NNc2dGaWVsZCB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUeXBlID0gbm9ybWFsaXplVHlwZSh0eXBlKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBub3JtYWxpemVkVHlwZSxcbiAgICBuYW1lLFxuICAgIGlzQXJyYXk6IHRydWUsXG4gICAgYXJyYXlMZW5ndGg6IGFycmF5TGVuZ3RoID09PSBudWxsID8gdW5kZWZpbmVkIDogYXJyYXlMZW5ndGgsXG4gICAgaXNDb21wbGV4OiAhcm9zUHJpbWl0aXZlVHlwZXMuaGFzKG5vcm1hbGl6ZWRUeXBlKSxcbiAgfTtcbn1cbmZ1bmN0aW9uIG5ld0RlZmluaXRpb24odHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBSb3NNc2dGaWVsZCB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUeXBlID0gbm9ybWFsaXplVHlwZSh0eXBlKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBub3JtYWxpemVkVHlwZSxcbiAgICBuYW1lLFxuICAgIGlzQXJyYXk6IGZhbHNlLFxuICAgIGlzQ29tcGxleDogIXJvc1ByaW1pdGl2ZVR5cGVzLmhhcyhub3JtYWxpemVkVHlwZSksXG4gIH07XG59XG5cbmNvbnN0IGJ1aWxkVHlwZSA9IChsaW5lczogeyBpc0pzb246IGJvb2xlYW4sIGxpbmU6IHN0cmluZyB9W10pOiBSb3NNc2dEZWZpbml0aW9uID0+IHtcbiAgY29uc3QgZGVmaW5pdGlvbnM6IFJvc01zZ0ZpZWxkW10gPSBbXTtcbiAgbGV0IGNvbXBsZXhUeXBlTmFtZTogP3N0cmluZztcbiAgbGluZXMuZm9yRWFjaCgoeyBpc0pzb24sIGxpbmUgfSkgPT4ge1xuICAgIC8vIHJlbW92ZSBjb21tZW50cyBhbmQgZXh0cmEgd2hpdGVzcGFjZSBmcm9tIGVhY2ggbGluZVxuICAgIGNvbnN0IHNwbGl0cyA9IGxpbmVcbiAgICAgIC5yZXBsYWNlKC8jLiovZ2ksIFwiXCIpXG4gICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAuZmlsdGVyKCh3b3JkKSA9PiB3b3JkKTtcbiAgICBpZiAoIXNwbGl0c1sxXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBjb25zdW1lIGNvbW1lbnRzXG4gICAgY29uc3QgdHlwZSA9IHNwbGl0c1swXS50cmltKCk7XG4gICAgY29uc3QgbmFtZSA9IHNwbGl0c1sxXS50cmltKCk7XG4gICAgaWYgKHR5cGUgPT09IFwiTVNHOlwiKSB7XG4gICAgICBjb21wbGV4VHlwZU5hbWUgPSBuYW1lO1xuICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiPVwiKSA+IC0xIHx8IHNwbGl0cy5pbmRleE9mKFwiPVwiKSA+IC0xKSB7XG4gICAgICAvLyBjb25zdGFudCB0eXBlIHBhcnNpbmdcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBsaW5lLm1hdGNoKC8oXFxTKylcXHMqPVxccyooLiopXFxzKi8pO1xuICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hbGZvcm1lZCBsaW5lOiBcIiArIGxpbmUpO1xuICAgICAgfVxuICAgICAgbGV0IHZhbHVlOiBhbnkgPSBtYXRjaGVzWzJdO1xuICAgICAgaWYgKHR5cGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgLy8gaGFuZGxlIHNwZWNpYWwgY2FzZSBvZiBweXRob24gYm9vbCB2YWx1ZXNcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9UcnVlL2dpLCBcInRydWVcIik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvRmFsc2UvZ2ksIFwiZmFsc2VcIik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xccyojLiovZywgXCJcIikpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvciBpbiB0aGlzIGNvbnN0YW50IGRlZmluaXRpb246ICR7bGluZX1gKTtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gXCJib29sXCIpIHtcbiAgICAgICAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoKHR5cGUuaW5jbHVkZXMoXCJpbnRcIikgJiYgdmFsdWUgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikgfHwgdmFsdWUgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUikge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oYEZvdW5kIGludGVnZXIgY29uc3RhbnQgb3V0c2lkZSBzYWZlIGludGVnZXIgcmFuZ2U6ICR7bGluZX1gKTtcbiAgICAgIH1cbiAgICAgIGRlZmluaXRpb25zLnB1c2goe1xuICAgICAgICB0eXBlOiBub3JtYWxpemVUeXBlKHR5cGUpLFxuICAgICAgICBuYW1lOiBtYXRjaGVzWzFdLFxuICAgICAgICBpc0NvbnN0YW50OiB0cnVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZS5pbmRleE9mKFwiXVwiKSA9PT0gdHlwZS5sZW5ndGggLSAxKSB7XG4gICAgICAvLyBhcnJheSB0eXBlIHBhcnNpbmdcbiAgICAgIGNvbnN0IHR5cGVTcGxpdHMgPSB0eXBlLnNwbGl0KFwiW1wiKTtcbiAgICAgIGNvbnN0IGJhc2VUeXBlID0gdHlwZVNwbGl0c1swXTtcbiAgICAgIGNvbnN0IGxlbiA9IHR5cGVTcGxpdHNbMV0ucmVwbGFjZShcIl1cIiwgXCJcIik7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKG5ld0FycmF5RGVmaW5pdGlvbihiYXNlVHlwZSwgbmFtZSwgbGVuID8gcGFyc2VJbnQobGVuLCAxMCkgOiB1bmRlZmluZWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5pdGlvbnMucHVzaChuZXdEZWZpbml0aW9uKGlzSnNvbiA/IFwianNvblwiIDogdHlwZSwgbmFtZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB7IG5hbWU6IGNvbXBsZXhUeXBlTmFtZSwgZGVmaW5pdGlvbnMgfTtcbn07XG5cbmNvbnN0IGZpbmRUeXBlQnlOYW1lID0gKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10sIG5hbWU6IHN0cmluZyk6IFJvc01zZ0RlZmluaXRpb24gPT4ge1xuICBjb25zdCBtYXRjaGVzID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiB7XG4gICAgY29uc3QgdHlwZU5hbWUgPSB0eXBlLm5hbWUgfHwgXCJcIjtcbiAgICAvLyBpZiB0aGUgc2VhcmNoIGlzIGVtcHR5LCByZXR1cm4gdW5uYW1lZCB0eXBlc1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICF0eXBlTmFtZTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGlmIHRoZSBzZWFyY2ggaXMgaW4gdGhlIHR5cGUgbmFtZVxuICAgIC8vIG9yIG1hdGNoZXMgZXhhY3RseSBpZiBhIGZ1bGx5LXF1YWxpZmllZCBuYW1lIG1hdGNoIGlzIHBhc3NlZCB0byB1c1xuICAgIGNvbnN0IG5hbWVFbmQgPSBuYW1lLmluZGV4T2YoXCIvXCIpID4gLTEgPyBuYW1lIDogYC8ke25hbWV9YDtcbiAgICByZXR1cm4gdHlwZU5hbWUuZW5kc1dpdGgobmFtZUVuZCk7XG4gIH0pO1xuICBpZiAobWF0Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIDEgdG9wIGxldmVsIHR5cGUgZGVmaW5pdGlvbiBmb3IgJyR7bmFtZX0nIGJ1dCBmb3VuZCAke21hdGNoZXMubGVuZ3RofWApO1xuICB9XG4gIHJldHVybiBtYXRjaGVzWzBdO1xufTtcblxuLy8gR2l2ZW4gYSByYXcgbWVzc2FnZSBkZWZpbml0aW9uIHN0cmluZywgcGFyc2UgaXQgaW50byBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24uXG4vLyBFeGFtcGxlIHJldHVybiB2YWx1ZTpcbi8vIFt7XG4vLyAgIG5hbWU6IHVuZGVmaW5lZCxcbi8vICAgZGVmaW5pdGlvbnM6IFtcbi8vICAgICB7XG4vLyAgICAgICBhcnJheUxlbmd0aDogdW5kZWZpbmVkLFxuLy8gICAgICAgaXNBcnJheTogZmFsc2UsXG4vLyAgICAgICBpc0NvbXBsZXg6IGZhbHNlLFxuLy8gICAgICAgbmFtZTogXCJuYW1lXCIsXG4vLyAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuLy8gICAgIH0sIC4uLlxuLy8gICBdLFxuLy8gfSwgLi4uIF1cbi8vXG4vLyBTZWUgdW5pdCB0ZXN0cyBmb3IgbW9yZSBleGFtcGxlcy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uKG1lc3NhZ2VEZWZpbml0aW9uOiBzdHJpbmcpIHtcbiAgLy8gcmVhZCBhbGwgdGhlIGxpbmVzIGFuZCByZW1vdmUgZW1wdGllc1xuICBjb25zdCBhbGxMaW5lcyA9IG1lc3NhZ2VEZWZpbml0aW9uXG4gICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgLm1hcCgobGluZSkgPT4gbGluZS50cmltKCkpXG4gICAgLmZpbHRlcigobGluZSkgPT4gbGluZSk7XG5cbiAgbGV0IGRlZmluaXRpb25MaW5lczogeyBpc0pzb246IGJvb2xlYW4sIGxpbmU6IHN0cmluZyB9W10gPSBbXTtcbiAgY29uc3QgdHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSA9IFtdO1xuICBsZXQgbmV4dERlZmluaXRpb25Jc0pzb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gZ3JvdXAgbGluZXMgaW50byBpbmRpdmlkdWFsIGRlZmluaXRpb25zXG4gIGFsbExpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAvLyBpZ25vcmUgY29tbWVudCBsaW5lcyB1bmxlc3MgdGhleSBzdGFydCB3aXRoICNwcmFnbWEgcm9zYmFnX3BhcnNlX2pzb25cbiAgICBpZiAobGluZS5zdGFydHNXaXRoKFwiI1wiKSkge1xuICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aChcIiNwcmFnbWEgcm9zYmFnX3BhcnNlX2pzb25cIikpIHtcbiAgICAgICAgbmV4dERlZmluaXRpb25Jc0pzb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGRlZmluaXRpb25zIGFyZSBzcGxpdCBieSBlcXVhbCBzaWduc1xuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCI9PVwiKSkge1xuICAgICAgbmV4dERlZmluaXRpb25Jc0pzb24gPSBmYWxzZTtcbiAgICAgIHR5cGVzLnB1c2goYnVpbGRUeXBlKGRlZmluaXRpb25MaW5lcykpO1xuICAgICAgZGVmaW5pdGlvbkxpbmVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmluaXRpb25MaW5lcy5wdXNoKHsgaXNKc29uOiBuZXh0RGVmaW5pdGlvbklzSnNvbiwgbGluZSB9KTtcbiAgICAgIG5leHREZWZpbml0aW9uSXNKc29uID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgdHlwZXMucHVzaChidWlsZFR5cGUoZGVmaW5pdGlvbkxpbmVzKSk7XG5cbiAgLy8gRml4IHVwIGNvbXBsZXggdHlwZSBuYW1lc1xuICB0eXBlcy5mb3JFYWNoKCh7IGRlZmluaXRpb25zIH0pID0+IHtcbiAgICBkZWZpbml0aW9ucy5mb3JFYWNoKChkZWZpbml0aW9uKSA9PiB7XG4gICAgICBpZiAoZGVmaW5pdGlvbi5pc0NvbXBsZXgpIHtcbiAgICAgICAgY29uc3QgZm91bmROYW1lID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZmluaXRpb24udHlwZSkubmFtZTtcbiAgICAgICAgaWYgKGZvdW5kTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIHR5cGUgZGVmaW5pdGlvbiBmb3IgJHtkZWZpbml0aW9uLnR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmaW5pdGlvbi50eXBlID0gZm91bmROYW1lO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gdHlwZXM7XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgaW50NTMgZnJvbSBcImludDUzXCI7XG5cbmltcG9ydCB7IGV4dHJhY3RGaWVsZHMsIGV4dHJhY3RUaW1lIH0gZnJvbSBcIi4vZmllbGRzXCI7XG5pbXBvcnQgeyBNZXNzYWdlUmVhZGVyIH0gZnJvbSBcIi4vTWVzc2FnZVJlYWRlclwiO1xuaW1wb3J0IHR5cGUgeyBUaW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgcmVhZFVJbnQ2NExFID0gKGJ1ZmZlcjogQnVmZmVyKSA9PiB7XG4gIHJldHVybiBpbnQ1My5yZWFkVUludDY0TEUoYnVmZmVyLCAwKTtcbn07XG5cbmV4cG9ydCBjbGFzcyBSZWNvcmQge1xuICBvZmZzZXQ6IG51bWJlcjtcbiAgZGF0YU9mZnNldDogbnVtYmVyO1xuICBlbmQ6IG51bWJlcjtcbiAgbGVuZ3RoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoX2ZpZWxkczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge31cblxuICBwYXJzZURhdGEoX2J1ZmZlcjogQnVmZmVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgQmFnSGVhZGVyIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDM7XG4gIGluZGV4UG9zaXRpb246IG51bWJlcjtcbiAgY29ubmVjdGlvbkNvdW50OiBudW1iZXI7XG4gIGNodW5rQ291bnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMuaW5kZXhQb3NpdGlvbiA9IHJlYWRVSW50NjRMRShmaWVsZHMuaW5kZXhfcG9zKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25Db3VudCA9IGZpZWxkcy5jb25uX2NvdW50LnJlYWRJbnQzMkxFKDApO1xuICAgIHRoaXMuY2h1bmtDb3VudCA9IGZpZWxkcy5jaHVua19jb3VudC5yZWFkSW50MzJMRSgwKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2h1bmsgZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gNTtcbiAgY29tcHJlc3Npb246IHN0cmluZztcbiAgc2l6ZTogbnVtYmVyO1xuICBkYXRhOiBCdWZmZXI7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLmNvbXByZXNzaW9uID0gZmllbGRzLmNvbXByZXNzaW9uLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5zaXplID0gZmllbGRzLnNpemUucmVhZFVJbnQzMkxFKDApO1xuICB9XG5cbiAgcGFyc2VEYXRhKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5kYXRhID0gYnVmZmVyO1xuICB9XG59XG5cbmNvbnN0IGdldEZpZWxkID0gKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSwga2V5OiBzdHJpbmcpID0+IHtcbiAgaWYgKGZpZWxkc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvbm5lY3Rpb24gaGVhZGVyIGlzIG1pc3NpbmcgJHtrZXl9LmApO1xuICB9XG4gIHJldHVybiBmaWVsZHNba2V5XS50b1N0cmluZygpO1xufTtcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24gZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gNztcbiAgY29ubjogbnVtYmVyO1xuICB0b3BpYzogc3RyaW5nO1xuICB0eXBlOiA/c3RyaW5nO1xuICBtZDVzdW06ID9zdHJpbmc7XG4gIG1lc3NhZ2VEZWZpbml0aW9uOiBzdHJpbmc7XG4gIGNhbGxlcmlkOiA/c3RyaW5nO1xuICBsYXRjaGluZzogP2Jvb2xlYW47XG4gIHJlYWRlcjogP01lc3NhZ2VSZWFkZXI7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLmNvbm4gPSBmaWVsZHMuY29ubi5yZWFkVUludDMyTEUoMCk7XG4gICAgdGhpcy50b3BpYyA9IGZpZWxkcy50b3BpYy50b1N0cmluZygpO1xuICAgIHRoaXMudHlwZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1kNXN1bSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1lc3NhZ2VEZWZpbml0aW9uID0gXCJcIjtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIGNvbnN0IGZpZWxkcyA9IGV4dHJhY3RGaWVsZHMoYnVmZmVyKTtcbiAgICB0aGlzLnR5cGUgPSBnZXRGaWVsZChmaWVsZHMsIFwidHlwZVwiKTtcbiAgICB0aGlzLm1kNXN1bSA9IGdldEZpZWxkKGZpZWxkcywgXCJtZDVzdW1cIik7XG4gICAgdGhpcy5tZXNzYWdlRGVmaW5pdGlvbiA9IGdldEZpZWxkKGZpZWxkcywgXCJtZXNzYWdlX2RlZmluaXRpb25cIik7XG4gICAgaWYgKGZpZWxkcy5jYWxsZXJpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNhbGxlcmlkID0gZmllbGRzLmNhbGxlcmlkLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChmaWVsZHMubGF0Y2hpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5sYXRjaGluZyA9IGZpZWxkcy5sYXRjaGluZy50b1N0cmluZygpID09PSBcIjFcIjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDI7XG4gIGNvbm46IG51bWJlcjtcbiAgdGltZTogVGltZTtcbiAgZGF0YTogQnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy5jb25uID0gZmllbGRzLmNvbm4ucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMudGltZSA9IGV4dHJhY3RUaW1lKGZpZWxkcy50aW1lLCAwKTtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuZGF0YSA9IGJ1ZmZlcjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5kZXhEYXRhIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDQ7XG4gIHZlcjogbnVtYmVyO1xuICBjb25uOiBudW1iZXI7XG4gIGNvdW50OiBudW1iZXI7XG4gIGluZGljZXM6IEFycmF5PHsgdGltZTogVGltZSwgb2Zmc2V0OiBudW1iZXIgfT47XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLnZlciA9IGZpZWxkcy52ZXIucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMuY29ubiA9IGZpZWxkcy5jb25uLnJlYWRVSW50MzJMRSgwKTtcbiAgICB0aGlzLmNvdW50ID0gZmllbGRzLmNvdW50LnJlYWRVSW50MzJMRSgwKTtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuaW5kaWNlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLmluZGljZXMucHVzaCh7XG4gICAgICAgIHRpbWU6IGV4dHJhY3RUaW1lKGJ1ZmZlciwgaSAqIDEyKSxcbiAgICAgICAgb2Zmc2V0OiBidWZmZXIucmVhZFVJbnQzMkxFKGkgKiAxMiArIDgpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDaHVua0luZm8gZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gNjtcbiAgdmVyOiBudW1iZXI7XG4gIGNodW5rUG9zaXRpb246IG51bWJlcjtcbiAgc3RhcnRUaW1lOiBUaW1lO1xuICBlbmRUaW1lOiBUaW1lO1xuICBjb3VudDogbnVtYmVyO1xuICBjb25uZWN0aW9uczogQXJyYXk8eyBjb25uOiBudW1iZXIsIGNvdW50OiBudW1iZXIgfT47XG4gIG5leHRDaHVuazogP0NodW5rSW5mbztcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMudmVyID0gZmllbGRzLnZlci5yZWFkVUludDMyTEUoMCk7XG4gICAgdGhpcy5jaHVua1Bvc2l0aW9uID0gcmVhZFVJbnQ2NExFKGZpZWxkcy5jaHVua19wb3MpO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gZXh0cmFjdFRpbWUoZmllbGRzLnN0YXJ0X3RpbWUsIDApO1xuICAgIHRoaXMuZW5kVGltZSA9IGV4dHJhY3RUaW1lKGZpZWxkcy5lbmRfdGltZSwgMCk7XG4gICAgdGhpcy5jb3VudCA9IGZpZWxkcy5jb3VudC5yZWFkVUludDMyTEUoMCk7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMucHVzaCh7XG4gICAgICAgIGNvbm46IGJ1ZmZlci5yZWFkVUludDMyTEUoaSAqIDgpLFxuICAgICAgICBjb3VudDogYnVmZmVyLnJlYWRVSW50MzJMRShpICogOCArIDQpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJidWZmZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVhcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpbnQ1M1wiKTsiXSwic291cmNlUm9vdCI6IiJ9
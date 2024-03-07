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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/web/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/heap/index.js":
/*!************************************!*\
  !*** ./node_modules/heap/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/heap */ "./node_modules/heap/lib/heap.js");


/***/ }),

/***/ "./node_modules/heap/lib/heap.js":
/*!***************************************!*\
  !*** ./node_modules/heap/lib/heap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (true) {
      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(this, function() {
    return Heap;
  });

}).call(this);


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/int53/index.js":
/*!*************************************!*\
  !*** ./node_modules/int53/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var int53 = {}

var MAX_UINT32 = 0x00000000FFFFFFFF
var MAX_INT53 =  0x001FFFFFFFFFFFFF

function assert (test, message) {
	if(!test) throw new Error(message)
}

function onesComplement(number) {
	number = ~number
	if (number < 0) {
		number = (number & 0x7FFFFFFF) + 0x80000000
	}
	return number
}

function uintHighLow(number) {
	assert(number > -1 && number <= MAX_INT53, "number out of range")
	assert(Math.floor(number) === number, "number must be an integer")
	var high = 0
	var signbit = number & 0xFFFFFFFF
	var low = signbit < 0 ? (number & 0x7FFFFFFF) + 0x80000000 : signbit
	if (number > MAX_UINT32) {
		high = (number - low) / (MAX_UINT32 + 1)
	}
	return [high, low]
}

function intHighLow(number) {
	if (number > -1) {
		return uintHighLow(number)
	}
	var hl = uintHighLow(-number)
	var high = onesComplement(hl[0])
	var low = onesComplement(hl[1])
	if (low === MAX_UINT32) {
		high += 1
		low = 0
	}
	else {
		low += 1
	}
	return [high, low]
}

function toDouble(high, low, signed) {
	if (signed && (high & 0x80000000) !== 0) {
		high = onesComplement(high)
		low = onesComplement(low)
		assert(high < 0x00200000, "number too small")
		return -((high * (MAX_UINT32 + 1)) + low + 1)
	}
	else { //positive
		assert(high < 0x00200000, "number too large")
		return (high * (MAX_UINT32 + 1)) + low
	}
}

int53.readInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	return toDouble(high, low, true)
}

int53.readInt64LE = function (buffer, offset) {
	offset = offset || 0
	var low = buffer.readUInt32LE(offset)
	var high = buffer.readUInt32LE(offset + 4)
	return toDouble(high, low, true)
}

int53.readUInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	return toDouble(high, low, false)
}

int53.readUInt64LE = function (buffer, offset) {
	offset = offset || 0
	var low = buffer.readUInt32LE(offset)
	var high = buffer.readUInt32LE(offset + 4)
	return toDouble(high, low, false)
}

int53.writeInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = intHighLow(number)
	buffer.writeUInt32BE(hl[0], offset)
	buffer.writeUInt32BE(hl[1], offset + 4)
}

int53.writeInt64LE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = intHighLow(number)
	buffer.writeUInt32LE(hl[1], offset)
	buffer.writeUInt32LE(hl[0], offset + 4)
}

int53.writeUInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = uintHighLow(number)
	buffer.writeUInt32BE(hl[0], offset)
	buffer.writeUInt32BE(hl[1], offset + 4)
}

int53.writeUInt64LE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = uintHighLow(number)
	buffer.writeUInt32LE(hl[1], offset)
	buffer.writeUInt32LE(hl[0], offset + 4)
}

module.exports = int53


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/buffer/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/buffer/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/BagReader.js":
/*!**************************!*\
  !*** ./src/BagReader.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BagReader; });
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./src/MessageReader.js":
/*!******************************!*\
  !*** ./src/MessageReader.js ***!
  \******************************/
/*! exports provided: MessageReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return MessageReader; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/MessageWriter.js":
/*!******************************!*\
  !*** ./src/MessageWriter.js ***!
  \******************************/
/*! exports provided: MessageWriter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageWriter", function() { return MessageWriter; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/node-libs-browser/node_modules/buffer/index.js */ "./node_modules/node-libs-browser/node_modules/buffer/index.js").Buffer))

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
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! heap */ "./node_modules/heap/index.js");
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
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
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

/***/ "./src/web/index.js":
/*!**************************!*\
  !*** ./src/web/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "./node_modules/node-libs-browser/node_modules/buffer/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["TimeUtil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["MessageReader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageWriter", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["MessageWriter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["parseMessageDefinition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["rosPrimitiveTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractFields", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["extractFields"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractTime", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["extractTime"]; });

/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bag */ "./src/bag.js");
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BagReader */ "./src/BagReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BagReader", function() { return _BagReader__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_4__) if(["Reader","TimeUtil","BagReader","MessageReader","MessageWriter","open","parseMessageDefinition","rosPrimitiveTypes","extractFields","extractTime","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.



 // browser reader for Blob|File objects

class Reader {
  constructor(blob) {
    _defineProperty(this, "_blob", void 0);

    _defineProperty(this, "_size", void 0);

    this._blob = blob;
    this._size = blob.size;
  } // read length (bytes) starting from offset (bytes)
  // callback(err, buffer)


  read(offset, length, cb) {
    const reader = new FileReader();

    reader.onload = function () {
      // $FlowFixMe - flow doesn't allow null
      reader.onload = null; // $FlowFixMe - flow doesn't allow null

      reader.onerror = null;
      setImmediate(cb, null, buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"].from(reader.result));
    };

    reader.onerror = function () {
      // $FlowFixMe - flow doesn't allow null
      reader.onload = null; // $FlowFixMe - flow doesn't allow null

      reader.onerror = null;
      setImmediate(cb, new Error(reader.error));
    };

    reader.readAsArrayBuffer(this._blob.slice(offset, offset + length));
  } // return the size of the file


  size() {
    return this._size;
  }

}

const open = async file => {
  if (!(file instanceof Blob)) {
    throw new Error("Expected file to be a File or Blob. Make sure you are correctly importing the node or web version of Bag.");
  }

  const bag = new _bag__WEBPACK_IMPORTED_MODULE_2__["default"](new _BagReader__WEBPACK_IMPORTED_MODULE_3__["default"](new Reader(file)));
  await bag.open();
  return bag;
};

_bag__WEBPACK_IMPORTED_MODULE_2__["default"].open = open;


/* harmony default export */ __webpack_exports__["default"] = (_bag__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3NiYWcvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Jvc2JhZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9oZWFwL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9oZWFwL2xpYi9oZWFwLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9pbnQ1My9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovL3Jvc2JhZy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL0JhZ1JlYWRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvTWVzc2FnZVJlYWRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvTWVzc2FnZVdyaXRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvUmVhZFJlc3VsdC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvVGltZVV0aWwuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2JhZy5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvZmllbGRzLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9ubWVyZ2UuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL3BhcnNlTWVzc2FnZURlZmluaXRpb24uanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL3JlY29yZC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvd2ViL2luZGV4LmpzIl0sIm5hbWVzIjpbIkhFQURFUl9SRUFEQUhFQUQiLCJIRUFERVJfT0ZGU0VUIiwiQmFnUmVhZGVyIiwiY29uc3RydWN0b3IiLCJmaWxlbGlrZSIsIl9maWxlIiwiX2xhc3RDaHVua0luZm8iLCJ1bmRlZmluZWQiLCJ2ZXJpZnlCYWdIZWFkZXIiLCJjYWxsYmFjayIsIm5leHQiLCJyZWFkIiwiZXJyb3IiLCJidWZmZXIiLCJFcnJvciIsInNpemUiLCJ0b1N0cmluZyIsInJlYWRIZWFkZXIiLCJsZW5ndGgiLCJoZWFkZXJMZW5ndGgiLCJyZWFkSW50MzJMRSIsImhlYWRlciIsInJlYWRSZWNvcmRGcm9tQnVmZmVyIiwiQmFnSGVhZGVyIiwiZSIsIm1lc3NhZ2UiLCJyZWFkSGVhZGVyQXN5bmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsInJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mbyIsImZpbGVPZmZzZXQiLCJjb25uZWN0aW9uQ291bnQiLCJjaHVua0NvdW50IiwiY29ubmVjdGlvbnMiLCJjaHVua0luZm9zIiwicmVhZFJlY29yZHNGcm9tQnVmZmVyIiwiQ29ubmVjdGlvbiIsImNvbm5lY3Rpb25CbG9ja0xlbmd0aCIsImVuZCIsIm9mZnNldCIsInNsaWNlIiwiQ2h1bmtJbmZvIiwiaSIsIm5leHRDaHVuayIsInJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mb0FzeW5jIiwicmVzdWx0IiwicmVhZENodW5rTWVzc2FnZXMiLCJjaHVua0luZm8iLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZGVjb21wcmVzcyIsInN0YXJ0Iiwic2VjIiwibnNlYyIsIk51bWJlciIsIk1BWF9WQUxVRSIsImNvbm5zIiwibWFwIiwiY29ubmVjdGlvbiIsImNvbm4iLCJyZWFkQ2h1bmsiLCJjaHVuayIsImluZGljZXMiLCJmb3JFYWNoIiwiaW5kZXgiLCJwcmVzZW50Q29ubmVjdGlvbnMiLCJmaWx0ZXIiLCJpdGVyYWJsZXMiLCJTeW1ib2wiLCJpdGVyYXRvciIsIml0ZXIiLCJubWVyZ2UiLCJhIiwiYiIsIlRpbWVVdGlsIiwidGltZSIsImVudHJpZXMiLCJpdGVtIiwiZG9uZSIsInZhbHVlIiwicHVzaCIsIm1lc3NhZ2VzIiwiZW50cnkiLCJkYXRhIiwiZGF0YU9mZnNldCIsIk1lc3NhZ2VEYXRhIiwicmVhZENodW5rTWVzc2FnZXNBc3luYyIsIl9sYXN0UmVhZFJlc3VsdCIsImxhc3RSZWFkUmVzdWx0Iiwic2V0SW1tZWRpYXRlIiwicmVhZExlbmd0aCIsImNodW5rUG9zaXRpb24iLCJDaHVuayIsImNvbXByZXNzaW9uIiwiZGVjb21wcmVzc0ZuIiwiY291bnQiLCJJbmRleERhdGEiLCJjbHMiLCJyZWNvcmRzIiwiYnVmZmVyT2Zmc2V0IiwicmVjb3JkIiwicGFyc2VIZWFkZXIiLCJkYXRhTGVuZ3RoIiwicGFyc2VEYXRhIiwiU3RhbmRhcmRUeXBlUmVhZGVyIiwidmlldyIsIkRhdGFWaWV3IiwiYnl0ZU9mZnNldCIsIl9pbnRpYWxpemVUZXh0RGVjb2RlciIsImdsb2JhbCIsIlRleHREZWNvZGVyIiwiX2RlY29kZXJTdGF0dXMiLCJfZGVjb2RlciIsImpzb24iLCJyZXN1bHRTdHJpbmciLCJzdHJpbmciLCJKU09OIiwicGFyc2UiLCJsZW4iLCJpbnQzMiIsImNvZGVQb2ludHMiLCJVaW50OEFycmF5IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYXBwbHkiLCJkZWNvZGUiLCJib29sIiwidWludDgiLCJpbnQ4IiwiZ2V0SW50OCIsImdldFVpbnQ4IiwidHlwZWRBcnJheSIsImFycmF5VHlwZSIsImFycmF5TGVuZ3RoIiwidWludDMyIiwiaW50MTYiLCJnZXRJbnQxNiIsInVpbnQxNiIsImdldFVpbnQxNiIsImdldEludDMyIiwiZ2V0VWludDMyIiwiZmxvYXQzMiIsImdldEZsb2F0MzIiLCJmbG9hdDY0IiwiZ2V0RmxvYXQ2NCIsImludDY0IiwiaW50NTMiLCJyZWFkSW50NjRMRSIsInVpbnQ2NCIsInJlYWRVSW50NjRMRSIsImV4dHJhY3RUaW1lIiwiZHVyYXRpb24iLCJmaW5kVHlwZUJ5TmFtZSIsInR5cGVzIiwibmFtZSIsImZvdW5kTmFtZSIsIm1hdGNoZXMiLCJ0eXBlIiwidHlwZU5hbWUiLCJuYW1lRW5kIiwiaW5kZXhPZiIsImVuZHNXaXRoIiwiZnJpZW5kbHlOYW1lIiwicmVwbGFjZSIsImNyZWF0ZVBhcnNlciIsImZyZWV6ZSIsInVubmFtZWRUeXBlcyIsInVubmFtZWRUeXBlIiwibmFtZWRUeXBlcyIsImNvbnN0cnVjdG9yQm9keSIsInJlYWRlckxpbmVzIiwiZGVmaW5pdGlvbnMiLCJkZWYiLCJpc0NvbnN0YW50IiwiaXNBcnJheSIsImxlbkZpZWxkIiwiYXJyYXlOYW1lIiwiaXNDb21wbGV4IiwiZGVmVHlwZSIsImpvaW4iLCJqcyIsInQiLCJfcmVhZCIsImV2YWwiLCJjb25zb2xlIiwicmVhZGVyIiwiTWVzc2FnZVJlYWRlciIsIm9wdGlvbnMiLCJwYXJzZWREZWZpbml0aW9ucyIsIndhcm4iLCJwYXJzZU1lc3NhZ2VEZWZpbml0aW9uIiwicmVhZE1lc3NhZ2UiLCJ3cml0ZVRpbWUiLCJ3cml0ZVVJbnQzMkxFIiwiU3RhbmRhcmRUeXBlT2Zmc2V0Q2FsY3VsYXRvciIsIl9pbmNyZW1lbnRBbmRSZXR1cm4iLCJieXRlQ291bnQiLCJzdHJpbmdpZnkiLCJTdGFuZGFyZFR5cGVXcml0ZXIiLCJvZmZzZXRDYWxjdWxhdG9yIiwic3RyaW5nT2Zmc2V0Iiwic2V0SW50MzIiLCJ3cml0ZSIsInNldEludDgiLCJzZXRVaW50OCIsInNldEludDE2Iiwic2V0VWludDE2Iiwic2V0VWludDMyIiwic2V0RmxvYXQzMiIsInNldEZsb2F0NjQiLCJ3cml0ZUludDY0TEUiLCJ3cml0ZVVJbnQ2NExFIiwiY3JlYXRlV3JpdGVyQW5kU2l6ZUNhbGN1bGF0b3IiLCJhcmdOYW1lIiwibGluZXMiLCJhY2Nlc3NNZXNzYWdlRmllbGQiLCJ3cml0ZXJKcyIsImNhbGN1bGF0ZVNpemVKcyIsIl93cml0ZSIsIl9jYWxjdWxhdGVTaXplIiwid3JpdGVyIiwiYnVmZmVyU2l6ZUNhbGN1bGF0b3IiLCJNZXNzYWdlV3JpdGVyIiwiY2FsY3VsYXRlQnVmZmVyU2l6ZSIsIndyaXRlTWVzc2FnZSIsImJ1ZmZlclRvV3JpdGUiLCJidWZmZXJTaXplIiwiQnVmZmVyIiwiYWxsb2NVbnNhZmUiLCJSZWFkUmVzdWx0IiwidG9waWMiLCJ0aW1lc3RhbXAiLCJjaHVua09mZnNldCIsInRvdGFsQ2h1bmtzIiwiT2JqZWN0IiwiZnJvbURhdGUiLCJkYXRlIiwiTWF0aCIsImZsb29yIiwiZ2V0VGltZSIsImdldE1pbGxpc2Vjb25kcyIsInRvRGF0ZSIsIkRhdGUiLCJjb21wYXJlIiwibGVmdCIsInJpZ2h0Iiwic2VjRGlmZiIsImlzTGVzc1RoYW4iLCJpc0dyZWF0ZXJUaGFuIiwiYXJlU2FtZSIsImFkZCIsImR1cmF0aW9uTmFub3MiLCJzZWNzRnJvbU5hbm9zIiwibmV3U2VjcyIsInJlbWFpbmluZ0R1cmF0aW9uTmFub3MiLCJuZXdOYW5vcyIsImFicyIsInNpZ24iLCJCYWciLCJiYWdSZWFkZXIiLCJvcGVuIiwiaW5kZXhQb3NpdGlvbiIsInJlYWRNZXNzYWdlcyIsIm9wdHMiLCJ0b3BpY3MiLCJrZXlzIiwiaWQiLCJmaWx0ZXJlZENvbm5lY3Rpb25zIiwiaW5mbyIsInBhcnNlTXNnIiwibXNnIiwibm9QYXJzZSIsIm1lc3NhZ2VEZWZpbml0aW9uIiwiZmlsZSIsIkVRVUFMU19DSEFSQ09ERSIsImNoYXJDb2RlQXQiLCJleHRyYWN0RmllbGRzIiwiZmllbGRzIiwiZmllbGQiLCJyZWFkVUludDMyTEUiLCJvcCIsIm9wY29kZSIsInJlYWRVSW50OCIsImtleSIsImhlYXAiLCJIZWFwIiwiZW1wdHkiLCJmcm9udCIsInBvcCIsInJvc1ByaW1pdGl2ZVR5cGVzIiwiU2V0Iiwibm9ybWFsaXplVHlwZSIsIm5vcm1hbGl6ZWRUeXBlIiwibmV3QXJyYXlEZWZpbml0aW9uIiwiaGFzIiwibmV3RGVmaW5pdGlvbiIsImJ1aWxkVHlwZSIsImNvbXBsZXhUeXBlTmFtZSIsImlzSnNvbiIsImxpbmUiLCJzcGxpdHMiLCJzcGxpdCIsIndvcmQiLCJ0cmltIiwibWF0Y2giLCJCb29sZWFuIiwiaW5jbHVkZXMiLCJNQVhfU0FGRV9JTlRFR0VSIiwiTUlOX1NBRkVfSU5URUdFUiIsInR5cGVTcGxpdHMiLCJiYXNlVHlwZSIsInBhcnNlSW50IiwiYWxsTGluZXMiLCJkZWZpbml0aW9uTGluZXMiLCJuZXh0RGVmaW5pdGlvbklzSnNvbiIsInN0YXJ0c1dpdGgiLCJkZWZpbml0aW9uIiwiUmVjb3JkIiwiX2ZpZWxkcyIsIl9idWZmZXIiLCJpbmRleF9wb3MiLCJjb25uX2NvdW50IiwiY2h1bmtfY291bnQiLCJnZXRGaWVsZCIsIm1kNXN1bSIsImNhbGxlcmlkIiwibGF0Y2hpbmciLCJ2ZXIiLCJjaHVua19wb3MiLCJzdGFydF90aW1lIiwiZW5kX3RpbWUiLCJSZWFkZXIiLCJibG9iIiwiX2Jsb2IiLCJfc2l6ZSIsImNiIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsIm9uZXJyb3IiLCJmcm9tIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJCbG9iIiwiYmFnIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxtQ0FBbUMsMEJBQTBCLG9CQUFvQjtBQUN2STtBQUNBLEtBQUs7QUFDTDtBQUNBLHFDQUFxQyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsV0FBVztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFdBQVc7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxzQ0FBc0M7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FB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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzV2REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFD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RixHQUFQO0FBQ0QsQ0FURDs7QUFVQXBGLDRDQUFHLENBQUNFLElBQUosR0FBV0EsSUFBWDtBQUVBO0FBQ0E7QUFXZUYsMkdBQWYsRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInJvc2JhZ1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJyb3NiYWdcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvd2ViL2luZGV4LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayhcbiAgICAgIHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aClcbiAgICApKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2hlYXAnKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS44LjBcbihmdW5jdGlvbigpIHtcbiAgdmFyIEhlYXAsIGRlZmF1bHRDbXAsIGZsb29yLCBoZWFwaWZ5LCBoZWFwcG9wLCBoZWFwcHVzaCwgaGVhcHB1c2hwb3AsIGhlYXByZXBsYWNlLCBpbnNvcnQsIG1pbiwgbmxhcmdlc3QsIG5zbWFsbGVzdCwgdXBkYXRlSXRlbSwgX3NpZnRkb3duLCBfc2lmdHVwO1xuXG4gIGZsb29yID0gTWF0aC5mbG9vciwgbWluID0gTWF0aC5taW47XG5cblxuICAvKlxuICBEZWZhdWx0IGNvbXBhcmlzb24gZnVuY3Rpb24gdG8gYmUgdXNlZFxuICAgKi9cblxuICBkZWZhdWx0Q21wID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIGlmICh4IDwgeSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBpZiAoeCA+IHkpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcblxuXG4gIC8qXG4gIEluc2VydCBpdGVtIHggaW4gbGlzdCBhLCBhbmQga2VlcCBpdCBzb3J0ZWQgYXNzdW1pbmcgYSBpcyBzb3J0ZWQuXG4gIFxuICBJZiB4IGlzIGFscmVhZHkgaW4gYSwgaW5zZXJ0IGl0IHRvIHRoZSByaWdodCBvZiB0aGUgcmlnaHRtb3N0IHguXG4gIFxuICBPcHRpb25hbCBhcmdzIGxvIChkZWZhdWx0IDApIGFuZCBoaSAoZGVmYXVsdCBhLmxlbmd0aCkgYm91bmQgdGhlIHNsaWNlXG4gIG9mIGEgdG8gYmUgc2VhcmNoZWQuXG4gICAqL1xuXG4gIGluc29ydCA9IGZ1bmN0aW9uKGEsIHgsIGxvLCBoaSwgY21wKSB7XG4gICAgdmFyIG1pZDtcbiAgICBpZiAobG8gPT0gbnVsbCkge1xuICAgICAgbG8gPSAwO1xuICAgIH1cbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGlmIChsbyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbG8gbXVzdCBiZSBub24tbmVnYXRpdmUnKTtcbiAgICB9XG4gICAgaWYgKGhpID09IG51bGwpIHtcbiAgICAgIGhpID0gYS5sZW5ndGg7XG4gICAgfVxuICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICBtaWQgPSBmbG9vcigobG8gKyBoaSkgLyAyKTtcbiAgICAgIGlmIChjbXAoeCwgYVttaWRdKSA8IDApIHtcbiAgICAgICAgaGkgPSBtaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsbyA9IG1pZCArIDE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoW10uc3BsaWNlLmFwcGx5KGEsIFtsbywgbG8gLSBsb10uY29uY2F0KHgpKSwgeCk7XG4gIH07XG5cblxuICAvKlxuICBQdXNoIGl0ZW0gb250byBoZWFwLCBtYWludGFpbmluZyB0aGUgaGVhcCBpbnZhcmlhbnQuXG4gICAqL1xuXG4gIGhlYXBwdXNoID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGNtcCkge1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICByZXR1cm4gX3NpZnRkb3duKGFycmF5LCAwLCBhcnJheS5sZW5ndGggLSAxLCBjbXApO1xuICB9O1xuXG5cbiAgLypcbiAgUG9wIHRoZSBzbWFsbGVzdCBpdGVtIG9mZiB0aGUgaGVhcCwgbWFpbnRhaW5pbmcgdGhlIGhlYXAgaW52YXJpYW50LlxuICAgKi9cblxuICBoZWFwcG9wID0gZnVuY3Rpb24oYXJyYXksIGNtcCkge1xuICAgIHZhciBsYXN0ZWx0LCByZXR1cm5pdGVtO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgbGFzdGVsdCA9IGFycmF5LnBvcCgpO1xuICAgIGlmIChhcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybml0ZW0gPSBhcnJheVswXTtcbiAgICAgIGFycmF5WzBdID0gbGFzdGVsdDtcbiAgICAgIF9zaWZ0dXAoYXJyYXksIDAsIGNtcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybml0ZW0gPSBsYXN0ZWx0O1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuaXRlbTtcbiAgfTtcblxuXG4gIC8qXG4gIFBvcCBhbmQgcmV0dXJuIHRoZSBjdXJyZW50IHNtYWxsZXN0IHZhbHVlLCBhbmQgYWRkIHRoZSBuZXcgaXRlbS5cbiAgXG4gIFRoaXMgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBoZWFwcG9wKCkgZm9sbG93ZWQgYnkgaGVhcHB1c2goKSwgYW5kIGNhbiBiZVxuICBtb3JlIGFwcHJvcHJpYXRlIHdoZW4gdXNpbmcgYSBmaXhlZCBzaXplIGhlYXAuIE5vdGUgdGhhdCB0aGUgdmFsdWVcbiAgcmV0dXJuZWQgbWF5IGJlIGxhcmdlciB0aGFuIGl0ZW0hIFRoYXQgY29uc3RyYWlucyByZWFzb25hYmxlIHVzZSBvZlxuICB0aGlzIHJvdXRpbmUgdW5sZXNzIHdyaXR0ZW4gYXMgcGFydCBvZiBhIGNvbmRpdGlvbmFsIHJlcGxhY2VtZW50OlxuICAgICAgaWYgaXRlbSA+IGFycmF5WzBdXG4gICAgICAgIGl0ZW0gPSBoZWFwcmVwbGFjZShhcnJheSwgaXRlbSlcbiAgICovXG5cbiAgaGVhcHJlcGxhY2UgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgY21wKSB7XG4gICAgdmFyIHJldHVybml0ZW07XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICByZXR1cm5pdGVtID0gYXJyYXlbMF07XG4gICAgYXJyYXlbMF0gPSBpdGVtO1xuICAgIF9zaWZ0dXAoYXJyYXksIDAsIGNtcCk7XG4gICAgcmV0dXJuIHJldHVybml0ZW07XG4gIH07XG5cblxuICAvKlxuICBGYXN0IHZlcnNpb24gb2YgYSBoZWFwcHVzaCBmb2xsb3dlZCBieSBhIGhlYXBwb3AuXG4gICAqL1xuXG4gIGhlYXBwdXNocG9wID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGNtcCkge1xuICAgIHZhciBfcmVmO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgaWYgKGFycmF5Lmxlbmd0aCAmJiBjbXAoYXJyYXlbMF0sIGl0ZW0pIDwgMCkge1xuICAgICAgX3JlZiA9IFthcnJheVswXSwgaXRlbV0sIGl0ZW0gPSBfcmVmWzBdLCBhcnJheVswXSA9IF9yZWZbMV07XG4gICAgICBfc2lmdHVwKGFycmF5LCAwLCBjbXApO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbTtcbiAgfTtcblxuXG4gIC8qXG4gIFRyYW5zZm9ybSBsaXN0IGludG8gYSBoZWFwLCBpbi1wbGFjZSwgaW4gTyhhcnJheS5sZW5ndGgpIHRpbWUuXG4gICAqL1xuXG4gIGhlYXBpZnkgPSBmdW5jdGlvbihhcnJheSwgY21wKSB7XG4gICAgdmFyIGksIF9pLCBfaiwgX2xlbiwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzLCBfcmVzdWx0czE7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBfcmVmMSA9IChmdW5jdGlvbigpIHtcbiAgICAgIF9yZXN1bHRzMSA9IFtdO1xuICAgICAgZm9yICh2YXIgX2ogPSAwLCBfcmVmID0gZmxvb3IoYXJyYXkubGVuZ3RoIC8gMik7IDAgPD0gX3JlZiA/IF9qIDwgX3JlZiA6IF9qID4gX3JlZjsgMCA8PSBfcmVmID8gX2orKyA6IF9qLS0peyBfcmVzdWx0czEucHVzaChfaik7IH1cbiAgICAgIHJldHVybiBfcmVzdWx0czE7XG4gICAgfSkuYXBwbHkodGhpcykucmV2ZXJzZSgpO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgaSA9IF9yZWYxW19pXTtcbiAgICAgIF9yZXN1bHRzLnB1c2goX3NpZnR1cChhcnJheSwgaSwgY21wKSk7XG4gICAgfVxuICAgIHJldHVybiBfcmVzdWx0cztcbiAgfTtcblxuXG4gIC8qXG4gIFVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGdpdmVuIGl0ZW0gaW4gdGhlIGhlYXAuXG4gIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBldmVyeSB0aW1lIHRoZSBpdGVtIGlzIGJlaW5nIG1vZGlmaWVkLlxuICAgKi9cblxuICB1cGRhdGVJdGVtID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGNtcCkge1xuICAgIHZhciBwb3M7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBwb3MgPSBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIF9zaWZ0ZG93bihhcnJheSwgMCwgcG9zLCBjbXApO1xuICAgIHJldHVybiBfc2lmdHVwKGFycmF5LCBwb3MsIGNtcCk7XG4gIH07XG5cblxuICAvKlxuICBGaW5kIHRoZSBuIGxhcmdlc3QgZWxlbWVudHMgaW4gYSBkYXRhc2V0LlxuICAgKi9cblxuICBubGFyZ2VzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBjbXApIHtcbiAgICB2YXIgZWxlbSwgcmVzdWx0LCBfaSwgX2xlbiwgX3JlZjtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIHJlc3VsdCA9IGFycmF5LnNsaWNlKDAsIG4pO1xuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGVhcGlmeShyZXN1bHQsIGNtcCk7XG4gICAgX3JlZiA9IGFycmF5LnNsaWNlKG4pO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgZWxlbSA9IF9yZWZbX2ldO1xuICAgICAgaGVhcHB1c2hwb3AocmVzdWx0LCBlbGVtLCBjbXApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoY21wKS5yZXZlcnNlKCk7XG4gIH07XG5cblxuICAvKlxuICBGaW5kIHRoZSBuIHNtYWxsZXN0IGVsZW1lbnRzIGluIGEgZGF0YXNldC5cbiAgICovXG5cbiAgbnNtYWxsZXN0ID0gZnVuY3Rpb24oYXJyYXksIG4sIGNtcCkge1xuICAgIHZhciBlbGVtLCBpLCBsb3MsIHJlc3VsdCwgX2ksIF9qLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHM7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBpZiAobiAqIDEwIDw9IGFycmF5Lmxlbmd0aCkge1xuICAgICAgcmVzdWx0ID0gYXJyYXkuc2xpY2UoMCwgbikuc29ydChjbXApO1xuICAgICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICBsb3MgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgICAgX3JlZiA9IGFycmF5LnNsaWNlKG4pO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGVsZW0gPSBfcmVmW19pXTtcbiAgICAgICAgaWYgKGNtcChlbGVtLCBsb3MpIDwgMCkge1xuICAgICAgICAgIGluc29ydChyZXN1bHQsIGVsZW0sIDAsIG51bGwsIGNtcCk7XG4gICAgICAgICAgcmVzdWx0LnBvcCgpO1xuICAgICAgICAgIGxvcyA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhlYXBpZnkoYXJyYXksIGNtcCk7XG4gICAgX3Jlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSBfaiA9IDAsIF9yZWYxID0gbWluKG4sIGFycmF5Lmxlbmd0aCk7IDAgPD0gX3JlZjEgPyBfaiA8IF9yZWYxIDogX2ogPiBfcmVmMTsgaSA9IDAgPD0gX3JlZjEgPyArK19qIDogLS1faikge1xuICAgICAgX3Jlc3VsdHMucHVzaChoZWFwcG9wKGFycmF5LCBjbXApKTtcbiAgICB9XG4gICAgcmV0dXJuIF9yZXN1bHRzO1xuICB9O1xuXG4gIF9zaWZ0ZG93biA9IGZ1bmN0aW9uKGFycmF5LCBzdGFydHBvcywgcG9zLCBjbXApIHtcbiAgICB2YXIgbmV3aXRlbSwgcGFyZW50LCBwYXJlbnRwb3M7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBuZXdpdGVtID0gYXJyYXlbcG9zXTtcbiAgICB3aGlsZSAocG9zID4gc3RhcnRwb3MpIHtcbiAgICAgIHBhcmVudHBvcyA9IChwb3MgLSAxKSA+PiAxO1xuICAgICAgcGFyZW50ID0gYXJyYXlbcGFyZW50cG9zXTtcbiAgICAgIGlmIChjbXAobmV3aXRlbSwgcGFyZW50KSA8IDApIHtcbiAgICAgICAgYXJyYXlbcG9zXSA9IHBhcmVudDtcbiAgICAgICAgcG9zID0gcGFyZW50cG9zO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlbcG9zXSA9IG5ld2l0ZW07XG4gIH07XG5cbiAgX3NpZnR1cCA9IGZ1bmN0aW9uKGFycmF5LCBwb3MsIGNtcCkge1xuICAgIHZhciBjaGlsZHBvcywgZW5kcG9zLCBuZXdpdGVtLCByaWdodHBvcywgc3RhcnRwb3M7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBlbmRwb3MgPSBhcnJheS5sZW5ndGg7XG4gICAgc3RhcnRwb3MgPSBwb3M7XG4gICAgbmV3aXRlbSA9IGFycmF5W3Bvc107XG4gICAgY2hpbGRwb3MgPSAyICogcG9zICsgMTtcbiAgICB3aGlsZSAoY2hpbGRwb3MgPCBlbmRwb3MpIHtcbiAgICAgIHJpZ2h0cG9zID0gY2hpbGRwb3MgKyAxO1xuICAgICAgaWYgKHJpZ2h0cG9zIDwgZW5kcG9zICYmICEoY21wKGFycmF5W2NoaWxkcG9zXSwgYXJyYXlbcmlnaHRwb3NdKSA8IDApKSB7XG4gICAgICAgIGNoaWxkcG9zID0gcmlnaHRwb3M7XG4gICAgICB9XG4gICAgICBhcnJheVtwb3NdID0gYXJyYXlbY2hpbGRwb3NdO1xuICAgICAgcG9zID0gY2hpbGRwb3M7XG4gICAgICBjaGlsZHBvcyA9IDIgKiBwb3MgKyAxO1xuICAgIH1cbiAgICBhcnJheVtwb3NdID0gbmV3aXRlbTtcbiAgICByZXR1cm4gX3NpZnRkb3duKGFycmF5LCBzdGFydHBvcywgcG9zLCBjbXApO1xuICB9O1xuXG4gIEhlYXAgPSAoZnVuY3Rpb24oKSB7XG4gICAgSGVhcC5wdXNoID0gaGVhcHB1c2g7XG5cbiAgICBIZWFwLnBvcCA9IGhlYXBwb3A7XG5cbiAgICBIZWFwLnJlcGxhY2UgPSBoZWFwcmVwbGFjZTtcblxuICAgIEhlYXAucHVzaHBvcCA9IGhlYXBwdXNocG9wO1xuXG4gICAgSGVhcC5oZWFwaWZ5ID0gaGVhcGlmeTtcblxuICAgIEhlYXAudXBkYXRlSXRlbSA9IHVwZGF0ZUl0ZW07XG5cbiAgICBIZWFwLm5sYXJnZXN0ID0gbmxhcmdlc3Q7XG5cbiAgICBIZWFwLm5zbWFsbGVzdCA9IG5zbWFsbGVzdDtcblxuICAgIGZ1bmN0aW9uIEhlYXAoY21wKSB7XG4gICAgICB0aGlzLmNtcCA9IGNtcCAhPSBudWxsID8gY21wIDogZGVmYXVsdENtcDtcbiAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9XG5cbiAgICBIZWFwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGhlYXBwdXNoKHRoaXMubm9kZXMsIHgsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaGVhcHBvcCh0aGlzLm5vZGVzLCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzWzBdO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzLmluZGV4T2YoeCkgIT09IC0xO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGhlYXByZXBsYWNlKHRoaXMubm9kZXMsIHgsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUucHVzaHBvcCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBoZWFwcHVzaHBvcCh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmhlYXBpZnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBoZWFwaWZ5KHRoaXMubm9kZXMsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUudXBkYXRlSXRlbSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB1cGRhdGVJdGVtKHRoaXMubm9kZXMsIHgsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzID0gW107XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlcy5sZW5ndGggPT09IDA7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoZWFwO1xuICAgICAgaGVhcCA9IG5ldyBIZWFwKCk7XG4gICAgICBoZWFwLm5vZGVzID0gdGhpcy5ub2Rlcy5zbGljZSgwKTtcbiAgICAgIHJldHVybiBoZWFwO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlcy5zbGljZSgwKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuaW5zZXJ0ID0gSGVhcC5wcm90b3R5cGUucHVzaDtcblxuICAgIEhlYXAucHJvdG90eXBlLnRvcCA9IEhlYXAucHJvdG90eXBlLnBlZWs7XG5cbiAgICBIZWFwLnByb3RvdHlwZS5mcm9udCA9IEhlYXAucHJvdG90eXBlLnBlZWs7XG5cbiAgICBIZWFwLnByb3RvdHlwZS5oYXMgPSBIZWFwLnByb3RvdHlwZS5jb250YWlucztcblxuICAgIEhlYXAucHJvdG90eXBlLmNvcHkgPSBIZWFwLnByb3RvdHlwZS5jbG9uZTtcblxuICAgIHJldHVybiBIZWFwO1xuXG4gIH0pKCk7XG5cbiAgKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICByZXR1cm4gZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcm9vdC5IZWFwID0gZmFjdG9yeSgpO1xuICAgIH1cbiAgfSkodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEhlYXA7XG4gIH0pO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwidmFyIGludDUzID0ge31cblxudmFyIE1BWF9VSU5UMzIgPSAweDAwMDAwMDAwRkZGRkZGRkZcbnZhciBNQVhfSU5UNTMgPSAgMHgwMDFGRkZGRkZGRkZGRkZGXG5cbmZ1bmN0aW9uIGFzc2VydCAodGVzdCwgbWVzc2FnZSkge1xuXHRpZighdGVzdCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG59XG5cbmZ1bmN0aW9uIG9uZXNDb21wbGVtZW50KG51bWJlcikge1xuXHRudW1iZXIgPSB+bnVtYmVyXG5cdGlmIChudW1iZXIgPCAwKSB7XG5cdFx0bnVtYmVyID0gKG51bWJlciAmIDB4N0ZGRkZGRkYpICsgMHg4MDAwMDAwMFxuXHR9XG5cdHJldHVybiBudW1iZXJcbn1cblxuZnVuY3Rpb24gdWludEhpZ2hMb3cobnVtYmVyKSB7XG5cdGFzc2VydChudW1iZXIgPiAtMSAmJiBudW1iZXIgPD0gTUFYX0lOVDUzLCBcIm51bWJlciBvdXQgb2YgcmFuZ2VcIilcblx0YXNzZXJ0KE1hdGguZmxvb3IobnVtYmVyKSA9PT0gbnVtYmVyLCBcIm51bWJlciBtdXN0IGJlIGFuIGludGVnZXJcIilcblx0dmFyIGhpZ2ggPSAwXG5cdHZhciBzaWduYml0ID0gbnVtYmVyICYgMHhGRkZGRkZGRlxuXHR2YXIgbG93ID0gc2lnbmJpdCA8IDAgPyAobnVtYmVyICYgMHg3RkZGRkZGRikgKyAweDgwMDAwMDAwIDogc2lnbmJpdFxuXHRpZiAobnVtYmVyID4gTUFYX1VJTlQzMikge1xuXHRcdGhpZ2ggPSAobnVtYmVyIC0gbG93KSAvIChNQVhfVUlOVDMyICsgMSlcblx0fVxuXHRyZXR1cm4gW2hpZ2gsIGxvd11cbn1cblxuZnVuY3Rpb24gaW50SGlnaExvdyhudW1iZXIpIHtcblx0aWYgKG51bWJlciA+IC0xKSB7XG5cdFx0cmV0dXJuIHVpbnRIaWdoTG93KG51bWJlcilcblx0fVxuXHR2YXIgaGwgPSB1aW50SGlnaExvdygtbnVtYmVyKVxuXHR2YXIgaGlnaCA9IG9uZXNDb21wbGVtZW50KGhsWzBdKVxuXHR2YXIgbG93ID0gb25lc0NvbXBsZW1lbnQoaGxbMV0pXG5cdGlmIChsb3cgPT09IE1BWF9VSU5UMzIpIHtcblx0XHRoaWdoICs9IDFcblx0XHRsb3cgPSAwXG5cdH1cblx0ZWxzZSB7XG5cdFx0bG93ICs9IDFcblx0fVxuXHRyZXR1cm4gW2hpZ2gsIGxvd11cbn1cblxuZnVuY3Rpb24gdG9Eb3VibGUoaGlnaCwgbG93LCBzaWduZWQpIHtcblx0aWYgKHNpZ25lZCAmJiAoaGlnaCAmIDB4ODAwMDAwMDApICE9PSAwKSB7XG5cdFx0aGlnaCA9IG9uZXNDb21wbGVtZW50KGhpZ2gpXG5cdFx0bG93ID0gb25lc0NvbXBsZW1lbnQobG93KVxuXHRcdGFzc2VydChoaWdoIDwgMHgwMDIwMDAwMCwgXCJudW1iZXIgdG9vIHNtYWxsXCIpXG5cdFx0cmV0dXJuIC0oKGhpZ2ggKiAoTUFYX1VJTlQzMiArIDEpKSArIGxvdyArIDEpXG5cdH1cblx0ZWxzZSB7IC8vcG9zaXRpdmVcblx0XHRhc3NlcnQoaGlnaCA8IDB4MDAyMDAwMDAsIFwibnVtYmVyIHRvbyBsYXJnZVwiKVxuXHRcdHJldHVybiAoaGlnaCAqIChNQVhfVUlOVDMyICsgMSkpICsgbG93XG5cdH1cbn1cblxuaW50NTMucmVhZEludDY0QkUgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhpZ2ggPSBidWZmZXIucmVhZFVJbnQzMkJFKG9mZnNldClcblx0dmFyIGxvdyA9IGJ1ZmZlci5yZWFkVUludDMyQkUob2Zmc2V0ICsgNClcblx0cmV0dXJuIHRvRG91YmxlKGhpZ2gsIGxvdywgdHJ1ZSlcbn1cblxuaW50NTMucmVhZEludDY0TEUgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGxvdyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0KVxuXHR2YXIgaGlnaCA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0ICsgNClcblx0cmV0dXJuIHRvRG91YmxlKGhpZ2gsIGxvdywgdHJ1ZSlcbn1cblxuaW50NTMucmVhZFVJbnQ2NEJFID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0KSB7XG5cdG9mZnNldCA9IG9mZnNldCB8fCAwXG5cdHZhciBoaWdoID0gYnVmZmVyLnJlYWRVSW50MzJCRShvZmZzZXQpXG5cdHZhciBsb3cgPSBidWZmZXIucmVhZFVJbnQzMkJFKG9mZnNldCArIDQpXG5cdHJldHVybiB0b0RvdWJsZShoaWdoLCBsb3csIGZhbHNlKVxufVxuXG5pbnQ1My5yZWFkVUludDY0TEUgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGxvdyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0KVxuXHR2YXIgaGlnaCA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0ICsgNClcblx0cmV0dXJuIHRvRG91YmxlKGhpZ2gsIGxvdywgZmFsc2UpXG59XG5cbmludDUzLndyaXRlSW50NjRCRSA9IGZ1bmN0aW9uIChudW1iZXIsIGJ1ZmZlciwgb2Zmc2V0KSB7XG5cdG9mZnNldCA9IG9mZnNldCB8fCAwXG5cdHZhciBobCA9IGludEhpZ2hMb3cobnVtYmVyKVxuXHRidWZmZXIud3JpdGVVSW50MzJCRShobFswXSwgb2Zmc2V0KVxuXHRidWZmZXIud3JpdGVVSW50MzJCRShobFsxXSwgb2Zmc2V0ICsgNClcbn1cblxuaW50NTMud3JpdGVJbnQ2NExFID0gZnVuY3Rpb24gKG51bWJlciwgYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhsID0gaW50SGlnaExvdyhudW1iZXIpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkxFKGhsWzFdLCBvZmZzZXQpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkxFKGhsWzBdLCBvZmZzZXQgKyA0KVxufVxuXG5pbnQ1My53cml0ZVVJbnQ2NEJFID0gZnVuY3Rpb24gKG51bWJlciwgYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhsID0gdWludEhpZ2hMb3cobnVtYmVyKVxuXHRidWZmZXIud3JpdGVVSW50MzJCRShobFswXSwgb2Zmc2V0KVxuXHRidWZmZXIud3JpdGVVSW50MzJCRShobFsxXSwgb2Zmc2V0ICsgNClcbn1cblxuaW50NTMud3JpdGVVSW50NjRMRSA9IGZ1bmN0aW9uIChudW1iZXIsIGJ1ZmZlciwgb2Zmc2V0KSB7XG5cdG9mZnNldCA9IG9mZnNldCB8fCAwXG5cdHZhciBobCA9IHVpbnRIaWdoTG93KG51bWJlcilcblx0YnVmZmVyLndyaXRlVUludDMyTEUoaGxbMV0sIG9mZnNldClcblx0YnVmZmVyLndyaXRlVUludDMyTEUoaGxbMF0sIG9mZnNldCArIDQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW50NTNcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaCAoZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IFRpbWUsIENhbGxiYWNrLCBGaWxlbGlrZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCB7IHBhcnNlSGVhZGVyIH0gZnJvbSBcIi4vaGVhZGVyXCI7XG5pbXBvcnQgbm1lcmdlIGZyb20gXCIuL25tZXJnZVwiO1xuaW1wb3J0IHsgUmVjb3JkLCBCYWdIZWFkZXIsIENodW5rLCBDaHVua0luZm8sIENvbm5lY3Rpb24sIEluZGV4RGF0YSwgTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9yZWNvcmRcIjtcbmltcG9ydCAqIGFzIFRpbWVVdGlsIGZyb20gXCIuL1RpbWVVdGlsXCI7XG5cbmludGVyZmFjZSBDaHVua1JlYWRSZXN1bHQge1xuICBjaHVuazogQ2h1bms7XG4gIGluZGljZXM6IEluZGV4RGF0YVtdO1xufVxuXG5leHBvcnQgdHlwZSBEZWNvbXByZXNzID0ge1xuICBbY29tcHJlc3Npb246IHN0cmluZ106IChidWZmZXI6IEJ1ZmZlciwgc2l6ZTogbnVtYmVyKSA9PiBCdWZmZXIsXG59O1xuXG5jb25zdCBIRUFERVJfUkVBREFIRUFEID0gNDA5NjtcbmNvbnN0IEhFQURFUl9PRkZTRVQgPSAxMztcblxuLy8gQmFnUmVhZGVyIGlzIGEgbG93ZXIgbGV2ZWwgaW50ZXJmYWNlIGZvciByZWFkaW5nIHNwZWNpZmljIHNlY3Rpb25zICYgY2h1bmtzXG4vLyBmcm9tIGEgcm9zYmFnIGZpbGUgLSBnZW5lcmFsbHkgaXQgaXMgY29uc3VtZWQgdGhyb3VnaCB0aGUgQmFnIGNsYXNzLCBidXRcbi8vIGNhbiBiZSB1c2VmdWwgdG8gdXNlIGRpcmVjdGx5IGZvciBlZmZpY2llbnRseSBhY2Nlc3NpbmcgcmF3IHBpZWNlcyBmcm9tXG4vLyB3aXRoaW4gdGhlIGJhZ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFnUmVhZGVyIHtcbiAgX2xhc3RSZWFkUmVzdWx0OiBDaHVua1JlYWRSZXN1bHQ7XG4gIF9maWxlOiBGaWxlbGlrZTtcbiAgX2xhc3RDaHVua0luZm86ID9DaHVua0luZm87XG5cbiAgY29uc3RydWN0b3IoZmlsZWxpa2U6IEZpbGVsaWtlKSB7XG4gICAgdGhpcy5fZmlsZSA9IGZpbGVsaWtlO1xuICAgIHRoaXMuX2xhc3RDaHVua0luZm8gPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2ZXJpZnlCYWdIZWFkZXIoY2FsbGJhY2s6IENhbGxiYWNrPEJhZ0hlYWRlcj4sIG5leHQ6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9maWxlLnJlYWQoMCwgSEVBREVSX09GRlNFVCwgKGVycm9yOiBFcnJvciB8IG51bGwsIGJ1ZmZlcj86IEJ1ZmZlcikgPT4ge1xuICAgICAgaWYgKGVycm9yIHx8ICFidWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2ZpbGUuc2l6ZSgpIDwgSEVBREVSX09GRlNFVCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiTWlzc2luZyBmaWxlIGhlYWRlci5cIikpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVmZmVyLnRvU3RyaW5nKCkgIT09IFwiI1JPU0JBRyBWMi4wXFxuXCIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIkNhbm5vdCBpZGVudGlmeSBiYWcgZm9ybWF0LlwiKSk7XG4gICAgICB9XG4gICAgICBuZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZWFkcyB0aGUgaGVhZGVyIGJsb2NrIGZyb20gdGhlIHJvc2JhZyBmaWxlXG4gIC8vIGdlbmVyYWxseSB5b3UgY2FsbCB0aGlzIGZpcnN0XG4gIC8vIGJlY2F1c2UgeW91IG5lZWQgdGhlIGhlYWRlciBpbmZvcm1hdGlvbiB0byBjYWxsIHJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mb1xuICByZWFkSGVhZGVyKGNhbGxiYWNrOiBDYWxsYmFjazxCYWdIZWFkZXI+KSB7XG4gICAgdGhpcy52ZXJpZnlCYWdIZWFkZXIoY2FsbGJhY2ssICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9maWxlLnJlYWQoSEVBREVSX09GRlNFVCwgSEVBREVSX1JFQURBSEVBRCwgKGVycm9yOiBFcnJvciB8IG51bGwsIGJ1ZmZlcj86IEJ1ZmZlcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgfHwgIWJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZWFkID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgaWYgKHJlYWQgPCA4KSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihgUmVjb3JkIGF0IHBvc2l0aW9uICR7SEVBREVSX09GRlNFVH0gaXMgdHJ1bmNhdGVkLmApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSgwKTtcbiAgICAgICAgaWYgKHJlYWQgPCBoZWFkZXJMZW5ndGggKyA4KSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihgUmVjb3JkIGF0IHBvc2l0aW9uICR7SEVBREVSX09GRlNFVH0gaGVhZGVyIHRvbyBsYXJnZTogJHtoZWFkZXJMZW5ndGh9LmApKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMucmVhZFJlY29yZEZyb21CdWZmZXIoYnVmZmVyLCBIRUFERVJfT0ZGU0VULCBCYWdIZWFkZXIpO1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBoZWFkZXIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihgQ291bGQgbm90IHJlYWQgaGVhZGVyIGZyb20gcm9zYmFnIGZpbGUgYnVmZmVyIC0gJHtlLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHByb21pc2lmaWVkIHZlcnNpb24gb2YgcmVhZEhlYWRlclxuICByZWFkSGVhZGVyQXN5bmMoKTogUHJvbWlzZTxCYWdIZWFkZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHRoaXMucmVhZEhlYWRlcigoZXJyOiBFcnJvciB8IG51bGwsIGhlYWRlcj86IEJhZ0hlYWRlcikgPT4gKGVyciB8fCAhaGVhZGVyID8gcmVqZWN0KGVycikgOiByZXNvbHZlKGhlYWRlcikpKVxuICAgICk7XG4gIH1cblxuICAvLyByZWFkcyBjb25uZWN0aW9uIGFuZCBjaHVuayBpbmZvcm1hdGlvbiBmcm9tIHRoZSBiYWdcbiAgLy8geW91J2xsIGdlbmVyYWxseSBjYWxsIHRoaXMgYWZ0ZXIgcmVhZGluZyB0aGUgaGVhZGVyIHNvIHlvdSBjYW4gZ2V0XG4gIC8vIGNvbm5lY3Rpb24gbWV0YWRhdGEgYW5kIGNodW5rSW5mb3Mgd2hpY2ggYWxsb3cgeW91IHRvIHNlZWsgdG8gaW5kaXZpZHVhbFxuICAvLyBjaHVua3MgJiByZWFkIHRoZW1cbiAgcmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvKFxuICAgIGZpbGVPZmZzZXQ6IG51bWJlcixcbiAgICBjb25uZWN0aW9uQ291bnQ6IG51bWJlcixcbiAgICBjaHVua0NvdW50OiBudW1iZXIsXG4gICAgY2FsbGJhY2s6IENhbGxiYWNrPHsgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSwgY2h1bmtJbmZvczogQ2h1bmtJbmZvW10gfT5cbiAgKSB7XG4gICAgdGhpcy5fZmlsZS5yZWFkKGZpbGVPZmZzZXQsIHRoaXMuX2ZpbGUuc2l6ZSgpIC0gZmlsZU9mZnNldCwgKGVycjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIgfHwgIWJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbm5lY3Rpb25Db3VudCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgeyBjb25uZWN0aW9uczogW10sIGNodW5rSW5mb3M6IFtdIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25uZWN0aW9ucyA9IHRoaXMucmVhZFJlY29yZHNGcm9tQnVmZmVyKGJ1ZmZlciwgY29ubmVjdGlvbkNvdW50LCBmaWxlT2Zmc2V0LCBDb25uZWN0aW9uKTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb25CbG9ja0xlbmd0aCA9IGNvbm5lY3Rpb25zW2Nvbm5lY3Rpb25Db3VudCAtIDFdLmVuZCAtIGNvbm5lY3Rpb25zWzBdLm9mZnNldDtcbiAgICAgIGNvbnN0IGNodW5rSW5mb3MgPSB0aGlzLnJlYWRSZWNvcmRzRnJvbUJ1ZmZlcihcbiAgICAgICAgYnVmZmVyLnNsaWNlKGNvbm5lY3Rpb25CbG9ja0xlbmd0aCksXG4gICAgICAgIGNodW5rQ291bnQsXG4gICAgICAgIGZpbGVPZmZzZXQgKyBjb25uZWN0aW9uQmxvY2tMZW5ndGgsXG4gICAgICAgIENodW5rSW5mb1xuICAgICAgKTtcblxuICAgICAgaWYgKGNodW5rQ291bnQgPiAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtDb3VudCAtIDE7IGkrKykge1xuICAgICAgICAgIGNodW5rSW5mb3NbaV0ubmV4dENodW5rID0gY2h1bmtJbmZvc1tpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgY2h1bmtJbmZvc1tjaHVua0NvdW50IC0gMV0ubmV4dENodW5rID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHsgY29ubmVjdGlvbnMsIGNodW5rSW5mb3MgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBwcm9taXNpZmllZCB2ZXJzaW9uIG9mIHJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mb1xuICByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9Bc3luYyhcbiAgICBmaWxlT2Zmc2V0OiBudW1iZXIsXG4gICAgY29ubmVjdGlvbkNvdW50OiBudW1iZXIsXG4gICAgY2h1bmtDb3VudDogbnVtYmVyXG4gICk6IFByb21pc2U8eyBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdLCBjaHVua0luZm9zOiBDaHVua0luZm9bXSB9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvKFxuICAgICAgICBmaWxlT2Zmc2V0LFxuICAgICAgICBjb25uZWN0aW9uQ291bnQsXG4gICAgICAgIGNodW5rQ291bnQsXG4gICAgICAgIChlcnI6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogeyBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdLCBjaHVua0luZm9zOiBDaHVua0luZm9bXSB9KSA9PlxuICAgICAgICAgIGVyciB8fCAhcmVzdWx0ID8gcmVqZWN0KGVycikgOiByZXNvbHZlKHJlc3VsdClcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZWFkIGluZGl2aWR1YWwgcmF3IG1lc3NhZ2VzIGZyb20gdGhlIGJhZyBhdCBhIGdpdmVuIGNodW5rXG4gIC8vIGZpbHRlcnMgdG8gYSBzcGVjaWZpYyBzZXQgb2YgY29ubmVjdGlvbiBpZHMsIHN0YXJ0IHRpbWUsICYgZW5kIHRpbWVcbiAgLy8gZ2VuZXJhbGx5IHRoZSByZWNvcmRzIHdpbGwgYmUgb2YgdHlwZSBNZXNzYWdlRGF0YVxuICByZWFkQ2h1bmtNZXNzYWdlcyhcbiAgICBjaHVua0luZm86IENodW5rSW5mbyxcbiAgICBjb25uZWN0aW9uczogbnVtYmVyW10sXG4gICAgc3RhcnRUaW1lOiBUaW1lIHwgbnVsbCxcbiAgICBlbmRUaW1lOiBUaW1lIHwgbnVsbCxcbiAgICBkZWNvbXByZXNzOiBEZWNvbXByZXNzLFxuICAgIGNhbGxiYWNrOiBDYWxsYmFjazxNZXNzYWdlRGF0YVtdPlxuICApIHtcbiAgICBjb25zdCBzdGFydCA9IHN0YXJ0VGltZSB8fCB7IHNlYzogMCwgbnNlYzogMCB9O1xuICAgIGNvbnN0IGVuZCA9IGVuZFRpbWUgfHwgeyBzZWM6IE51bWJlci5NQVhfVkFMVUUsIG5zZWM6IE51bWJlci5NQVhfVkFMVUUgfTtcbiAgICBjb25zdCBjb25ucyA9XG4gICAgICBjb25uZWN0aW9ucyB8fFxuICAgICAgY2h1bmtJbmZvLmNvbm5lY3Rpb25zLm1hcCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5jb25uO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnJlYWRDaHVuayhjaHVua0luZm8sIGRlY29tcHJlc3MsIChlcnJvcjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiBDaHVua1JlYWRSZXN1bHQpID0+IHtcbiAgICAgIGlmIChlcnJvciB8fCAhcmVzdWx0KSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIHJlc3VsdFwiKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNodW5rID0gcmVzdWx0LmNodW5rO1xuICAgICAgY29uc3QgaW5kaWNlczogeyBbY29ubjogbnVtYmVyXTogSW5kZXhEYXRhIH0gPSB7fTtcbiAgICAgIHJlc3VsdC5pbmRpY2VzLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICAgIGluZGljZXNbaW5kZXguY29ubl0gPSBpbmRleDtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcHJlc2VudENvbm5lY3Rpb25zID0gY29ubnMuZmlsdGVyKChjb25uKSA9PiB7XG4gICAgICAgIHJldHVybiBpbmRpY2VzW2Nvbm5dICE9PSB1bmRlZmluZWQ7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGl0ZXJhYmxlcyA9IHByZXNlbnRDb25uZWN0aW9ucy5tYXAoKGNvbm4pID0+IHtcbiAgICAgICAgLy8gJEZsb3dGaXhNZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMTE2M1xuICAgICAgICByZXR1cm4gaW5kaWNlc1tjb25uXS5pbmRpY2VzW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaXRlciA9IG5tZXJnZSgoYSwgYikgPT4gVGltZVV0aWwuY29tcGFyZShhLnRpbWUsIGIudGltZSksIC4uLml0ZXJhYmxlcyk7XG5cbiAgICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgICAgIGxldCBpdGVtID0gaXRlci5uZXh0KCk7XG4gICAgICB3aGlsZSAoIWl0ZW0uZG9uZSkge1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBpdGVtO1xuICAgICAgICBpdGVtID0gaXRlci5uZXh0KCk7XG4gICAgICAgIGlmICghdmFsdWUgfHwgVGltZVV0aWwuaXNHcmVhdGVyVGhhbihzdGFydCwgdmFsdWUudGltZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVGltZVV0aWwuaXNHcmVhdGVyVGhhbih2YWx1ZS50aW1lLCBlbmQpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZW50cmllcy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFJlY29yZEZyb21CdWZmZXIoY2h1bmsuZGF0YS5zbGljZShlbnRyeS5vZmZzZXQpLCBjaHVuay5kYXRhT2Zmc2V0LCBNZXNzYWdlRGF0YSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG1lc3NhZ2VzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHByb21pc2lmaWVkIHZlcnNpb24gb2YgcmVhZENodW5rTWVzc2FnZXNcbiAgcmVhZENodW5rTWVzc2FnZXNBc3luYyhcbiAgICBjaHVua0luZm86IENodW5rSW5mbyxcbiAgICBjb25uZWN0aW9uczogbnVtYmVyW10sXG4gICAgc3RhcnRUaW1lOiBUaW1lLFxuICAgIGVuZFRpbWU6IFRpbWUsXG4gICAgZGVjb21wcmVzczogRGVjb21wcmVzc1xuICApOiBQcm9taXNlPE1lc3NhZ2VEYXRhW10+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZWFkQ2h1bmtNZXNzYWdlcyhcbiAgICAgICAgY2h1bmtJbmZvLFxuICAgICAgICBjb25uZWN0aW9ucyxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBlbmRUaW1lLFxuICAgICAgICBkZWNvbXByZXNzLFxuICAgICAgICAoZXJyOiBFcnJvciB8IG51bGwsIG1lc3NhZ2VzPzogTWVzc2FnZURhdGFbXSkgPT4gKGVyciB8fCAhbWVzc2FnZXMgPyByZWplY3QoZXJyKSA6IHJlc29sdmUobWVzc2FnZXMpKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWRzIGEgc2luZ2xlIGNodW5rIHJlY29yZCAmJiBpdHMgaW5kZXggcmVjb3JkcyBnaXZlbiBhIGNodW5rSW5mb1xuICByZWFkQ2h1bmsoY2h1bmtJbmZvOiBDaHVua0luZm8sIGRlY29tcHJlc3M6IERlY29tcHJlc3MsIGNhbGxiYWNrOiBDYWxsYmFjazxDaHVua1JlYWRSZXN1bHQ+KSB7XG4gICAgLy8gaWYgd2UncmUgcmVhZGluZyB0aGUgc2FtZSBjaHVuayBhIHNlY29uZCB0aW1lIHJldHVybiB0aGUgY2FjaGVkIHZlcnNpb25cbiAgICAvLyB0byBhdm9pZCBkb2luZyBkZWNvbXByZXNzaW9uIG9uIHRoZSBzYW1lIGNodW5rIG11bHRpcGxlIHRpbWVzIHdoaWNoIGlzXG4gICAgLy8gZXhwZW5zaXZlXG4gICAgaWYgKGNodW5rSW5mbyA9PT0gdGhpcy5fbGFzdENodW5rSW5mbyAmJiB0aGlzLl9sYXN0UmVhZFJlc3VsdCkge1xuICAgICAgLy8gYWx3YXlzIGNhbGxiYWNrIGFzeW5jLCBldmVuIGlmIHdlIGhhdmUgdGhlIHJlc3VsdFxuICAgICAgLy8gaHR0cHM6Ly9vcmVuLmdpdGh1Yi5pby9ibG9nL3phbGdvLmh0bWxcbiAgICAgIGNvbnN0IGxhc3RSZWFkUmVzdWx0ID0gdGhpcy5fbGFzdFJlYWRSZXN1bHQ7XG4gICAgICByZXR1cm4gc2V0SW1tZWRpYXRlKCgpID0+IGNhbGxiYWNrKG51bGwsIGxhc3RSZWFkUmVzdWx0KSk7XG4gICAgfVxuICAgIGNvbnN0IHsgbmV4dENodW5rIH0gPSBjaHVua0luZm87XG5cbiAgICBjb25zdCByZWFkTGVuZ3RoID0gbmV4dENodW5rXG4gICAgICA/IG5leHRDaHVuay5jaHVua1Bvc2l0aW9uIC0gY2h1bmtJbmZvLmNodW5rUG9zaXRpb25cbiAgICAgIDogdGhpcy5fZmlsZS5zaXplKCkgLSBjaHVua0luZm8uY2h1bmtQb3NpdGlvbjtcblxuICAgIHRoaXMuX2ZpbGUucmVhZChjaHVua0luZm8uY2h1bmtQb3NpdGlvbiwgcmVhZExlbmd0aCwgKGVycjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIgfHwgIWJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGJ1ZmZlciwgY2h1bmtJbmZvLmNodW5rUG9zaXRpb24sIENodW5rKTtcbiAgICAgIGNvbnN0IHsgY29tcHJlc3Npb24gfSA9IGNodW5rO1xuICAgICAgaWYgKGNvbXByZXNzaW9uICE9PSBcIm5vbmVcIikge1xuICAgICAgICBjb25zdCBkZWNvbXByZXNzRm4gPSBkZWNvbXByZXNzW2NvbXByZXNzaW9uXTtcbiAgICAgICAgaWYgKCFkZWNvbXByZXNzRm4pIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKGBVbnN1cHBvcnRlZCBjb21wcmVzc2lvbiB0eXBlICR7Y2h1bmsuY29tcHJlc3Npb259YCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRlY29tcHJlc3NGbihjaHVuay5kYXRhLCBjaHVuay5zaXplKTtcbiAgICAgICAgY2h1bmsuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZGljZXMgPSB0aGlzLnJlYWRSZWNvcmRzRnJvbUJ1ZmZlcihcbiAgICAgICAgYnVmZmVyLnNsaWNlKGNodW5rLmxlbmd0aCksXG4gICAgICAgIGNodW5rSW5mby5jb3VudCxcbiAgICAgICAgY2h1bmtJbmZvLmNodW5rUG9zaXRpb24gKyBjaHVuay5sZW5ndGgsXG4gICAgICAgIEluZGV4RGF0YVxuICAgICAgKTtcblxuICAgICAgdGhpcy5fbGFzdENodW5rSW5mbyA9IGNodW5rSW5mbztcbiAgICAgIHRoaXMuX2xhc3RSZWFkUmVzdWx0ID0geyBjaHVuaywgaW5kaWNlcyB9O1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHRoaXMuX2xhc3RSZWFkUmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWRzIGNvdW50IHJlY29yZHMgZnJvbSBhIGJ1ZmZlciBzdGFydGluZyBhdCBmaWxlT2Zmc2V0XG4gIHJlYWRSZWNvcmRzRnJvbUJ1ZmZlcjxUOiBSZWNvcmQ+KFxuICAgIGJ1ZmZlcjogQnVmZmVyLFxuICAgIGNvdW50OiBudW1iZXIsXG4gICAgZmlsZU9mZnNldDogbnVtYmVyLFxuICAgIGNsczogQ2xhc3M8VD4gJiB7IG9wY29kZTogbnVtYmVyIH1cbiAgKTogVFtdIHtcbiAgICBjb25zdCByZWNvcmRzID0gW107XG4gICAgbGV0IGJ1ZmZlck9mZnNldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCByZWNvcmQgPSB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGJ1ZmZlci5zbGljZShidWZmZXJPZmZzZXQpLCBmaWxlT2Zmc2V0ICsgYnVmZmVyT2Zmc2V0LCBjbHMpO1xuICAgICAgYnVmZmVyT2Zmc2V0ICs9IHJlY29yZC5lbmQgLSByZWNvcmQub2Zmc2V0O1xuICAgICAgcmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgfVxuICAgIHJldHVybiByZWNvcmRzO1xuICB9XG5cbiAgLy8gcmVhZCBhbiBpbmRpdmlkdWFsIHJlY29yZCBmcm9tIGEgYnVmZmVyXG4gIHJlYWRSZWNvcmRGcm9tQnVmZmVyPFQ6IFJlY29yZD4oYnVmZmVyOiBCdWZmZXIsIGZpbGVPZmZzZXQ6IG51bWJlciwgY2xzOiBDbGFzczxUPiAmIHsgb3Bjb2RlOiBudW1iZXIgfSk6IFQge1xuICAgIGNvbnN0IGhlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSgwKTtcbiAgICBjb25zdCByZWNvcmQgPSBwYXJzZUhlYWRlcihidWZmZXIuc2xpY2UoNCwgNCArIGhlYWRlckxlbmd0aCksIGNscyk7XG5cbiAgICBjb25zdCBkYXRhT2Zmc2V0ID0gNCArIGhlYWRlckxlbmd0aCArIDQ7XG4gICAgY29uc3QgZGF0YUxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSg0ICsgaGVhZGVyTGVuZ3RoKTtcbiAgICBjb25zdCBkYXRhID0gYnVmZmVyLnNsaWNlKGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhTGVuZ3RoKTtcblxuICAgIHJlY29yZC5wYXJzZURhdGEoZGF0YSk7XG5cbiAgICByZWNvcmQub2Zmc2V0ID0gZmlsZU9mZnNldDtcbiAgICByZWNvcmQuZGF0YU9mZnNldCA9IHJlY29yZC5vZmZzZXQgKyA0ICsgaGVhZGVyTGVuZ3RoICsgNDtcbiAgICByZWNvcmQuZW5kID0gcmVjb3JkLmRhdGFPZmZzZXQgKyBkYXRhTGVuZ3RoO1xuICAgIHJlY29yZC5sZW5ndGggPSByZWNvcmQuZW5kIC0gcmVjb3JkLm9mZnNldDtcblxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCBpbnQ1MyBmcm9tIFwiaW50NTNcIjtcbmltcG9ydCB7IGV4dHJhY3RUaW1lIH0gZnJvbSBcIi4vZmllbGRzXCI7XG5pbXBvcnQgdHlwZSB7IFJvc01zZ0RlZmluaXRpb24sIE5hbWVkUm9zTXNnRGVmaW5pdGlvbiB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uIH0gZnJvbSBcIi4vcGFyc2VNZXNzYWdlRGVmaW5pdGlvblwiO1xuXG50eXBlIFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IChcbiAgYnVmZmVyOiBBcnJheUJ1ZmZlcixcbiAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICBsZW5ndGg6IG51bWJlclxuKSA9PlxuICB8IEludDhBcnJheVxuICB8IFVpbnQ4QXJyYXlcbiAgfCBJbnQxNkFycmF5XG4gIHwgVWludDE2QXJyYXlcbiAgfCBJbnQzMkFycmF5XG4gIHwgVWludDMyQXJyYXlcbiAgfCBVaW50OENsYW1wZWRBcnJheVxuICB8IEZsb2F0MzJBcnJheVxuICB8IEZsb2F0NjRBcnJheTtcblxuLy8gdGhpcyBoYXMgaGFyZC1jb2RlZCBidWZmZXIgcmVhZGluZyBmdW5jdGlvbnMgZm9yIGVhY2hcbi8vIG9mIHRoZSBzdGFuZGFyZCBtZXNzYWdlIHR5cGVzIGh0dHA6Ly9kb2NzLnJvcy5vcmcvYXBpL3N0ZF9tc2dzL2h0bWwvaW5kZXgtbXNnLmh0bWxcbi8vIGV2ZW50dWFsbHkgY3VzdG9tIHR5cGVzIGRlY29tcG9zZSBpbnRvIHRoZXNlIHN0YW5kYXJkIHR5cGVzXG5jbGFzcyBTdGFuZGFyZFR5cGVSZWFkZXIge1xuICBidWZmZXI6IEJ1ZmZlcjtcbiAgb2Zmc2V0OiBudW1iZXI7XG4gIHZpZXc6IERhdGFWaWV3O1xuICBfZGVjb2RlcjogP1RleHREZWNvZGVyO1xuICBfZGVjb2RlclN0YXR1czogXCJOT1RfSU5JVElBTElaRURcIiB8IFwiSU5JVElBTElaRURcIiB8IFwiTk9UX0FWQUlMQUJMRVwiID0gXCJOT1RfSU5JVElBTElaRURcIjtcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICB0aGlzLnZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLmJ1ZmZlciwgYnVmZmVyLmJ5dGVPZmZzZXQpO1xuICB9XG5cbiAgX2ludGlhbGl6ZVRleHREZWNvZGVyKCkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsLlRleHREZWNvZGVyID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLl9kZWNvZGVyU3RhdHVzID0gXCJOT1RfQVZBSUxBQkxFXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2RlY29kZXIgPSBuZXcgZ2xvYmFsLlRleHREZWNvZGVyKFwiYXNjaWlcIik7XG4gICAgICB0aGlzLl9kZWNvZGVyU3RhdHVzID0gXCJJTklUSUFMSVpFRFwiO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFN3YWxsb3cgdGhlIGVycm9yIGlmIHdlIGRvbid0IHN1cHBvcnQgYXNjaWkgZW5jb2RpbmcuXG4gICAgICB0aGlzLl9kZWNvZGVyU3RhdHVzID0gXCJOT1RfQVZBSUxBQkxFXCI7XG4gICAgfVxuICB9XG5cbiAganNvbigpOiBtaXhlZCB7XG4gICAgY29uc3QgcmVzdWx0U3RyaW5nID0gdGhpcy5zdHJpbmcoKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzdWx0U3RyaW5nKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBgQ291bGQgbm90IHBhcnNlICR7cmVzdWx0U3RyaW5nfWA7XG4gICAgfVxuICB9XG5cbiAgc3RyaW5nKCkge1xuICAgIGNvbnN0IGxlbiA9IHRoaXMuaW50MzIoKTtcbiAgICBjb25zdCBjb2RlUG9pbnRzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIuYnVmZmVyLCB0aGlzLmJ1ZmZlci5ieXRlT2Zmc2V0ICsgdGhpcy5vZmZzZXQsIGxlbik7XG4gICAgdGhpcy5vZmZzZXQgKz0gbGVuO1xuXG4gICAgLy8gaWYgdGhlIHN0cmluZyBpcyByZWxhdGl2ZWx5IHNob3J0IHdlIGNhbiB1c2UgYXBwbHksIGJ1dCBsb25nZXIgc3RyaW5ncyBjYW4gYmVuZWZpdCBmcm9tIHRoZSBzcGVlZCBvZiBUZXh0RGVjb2Rlci5cbiAgICBpZiAoY29kZVBvaW50cy5sZW5ndGggPCAxMDAwKSB7XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlUG9pbnRzKTtcbiAgICB9XG5cbiAgICAvLyBVc2UgVGV4dERlY29kZXIgaWYgaXQgaXMgYXZhaWxhYmxlIGFuZCBzdXBwb3J0cyB0aGUgXCJhc2NpaVwiIGVuY29kaW5nLlxuICAgIGlmICh0aGlzLl9kZWNvZGVyU3RhdHVzID09PSBcIk5PVF9JTklUSUFMSVpFRFwiKSB7XG4gICAgICB0aGlzLl9pbnRpYWxpemVUZXh0RGVjb2RlcigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZGVjb2Rlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX2RlY29kZXIuZGVjb2RlKGNvZGVQb2ludHMpO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgdXNlIHN0cmluZyBjb25jYXRlbnRhdGlvbi5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgZGF0YSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGJvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDgoKSAhPT0gMDtcbiAgfVxuXG4gIGludDgoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRJbnQ4KHRoaXMub2Zmc2V0KyspO1xuICB9XG5cbiAgdWludDgoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRVaW50OCh0aGlzLm9mZnNldCsrKTtcbiAgfVxuXG4gIHR5cGVkQXJyYXkobGVuOiA/bnVtYmVyLCBhcnJheVR5cGU6IFR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgIGNvbnN0IGFycmF5TGVuZ3RoID0gbGVuID09IG51bGwgPyB0aGlzLnVpbnQzMigpIDogbGVuO1xuICAgIGNvbnN0IGRhdGEgPSBuZXcgYXJyYXlUeXBlKHRoaXMudmlldy5idWZmZXIsIHRoaXMub2Zmc2V0ICsgdGhpcy52aWV3LmJ5dGVPZmZzZXQsIGFycmF5TGVuZ3RoKTtcbiAgICB0aGlzLm9mZnNldCArPSBhcnJheUxlbmd0aDtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgaW50MTYoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldEludDE2KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB1aW50MTYoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaW50MzIoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldEludDMyKHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB1aW50MzIoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZmxvYXQzMigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0RmxvYXQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZmxvYXQ2NCgpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0RmxvYXQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaW50NjQoKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gaW50NTMucmVhZEludDY0TEUodGhpcy5idWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICB1aW50NjQoKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gaW50NTMucmVhZFVJbnQ2NExFKHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgdGltZSgpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiBleHRyYWN0VGltZSh0aGlzLmJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxuXG4gIGR1cmF0aW9uKCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIGV4dHJhY3RUaW1lKHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICB9XG59XG5cbmNvbnN0IGZpbmRUeXBlQnlOYW1lID0gKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10sIG5hbWUgPSBcIlwiKTogTmFtZWRSb3NNc2dEZWZpbml0aW9uID0+IHtcbiAgbGV0IGZvdW5kTmFtZSA9IFwiXCI7IC8vIHRyYWNrIG5hbWUgc2VwYXJhdGVseSBpbiBhIG5vbi1udWxsIHZhcmlhYmxlIHRvIGFwcGVhc2UgRmxvd1xuICBjb25zdCBtYXRjaGVzID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiB7XG4gICAgY29uc3QgdHlwZU5hbWUgPSB0eXBlLm5hbWUgfHwgXCJcIjtcbiAgICAvLyBpZiB0aGUgc2VhcmNoIGlzIGVtcHR5LCByZXR1cm4gdW5uYW1lZCB0eXBlc1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICF0eXBlTmFtZTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGlmIHRoZSBzZWFyY2ggaXMgaW4gdGhlIHR5cGUgbmFtZVxuICAgIC8vIG9yIG1hdGNoZXMgZXhhY3RseSBpZiBhIGZ1bGx5LXF1YWxpZmllZCBuYW1lIG1hdGNoIGlzIHBhc3NlZCB0byB1c1xuICAgIGNvbnN0IG5hbWVFbmQgPSBuYW1lLmluZGV4T2YoXCIvXCIpID4gLTEgPyBuYW1lIDogYC8ke25hbWV9YDtcbiAgICBpZiAodHlwZU5hbWUuZW5kc1dpdGgobmFtZUVuZCkpIHtcbiAgICAgIGZvdW5kTmFtZSA9IHR5cGVOYW1lO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG4gIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgMSB0b3AgbGV2ZWwgdHlwZSBkZWZpbml0aW9uIGZvciAnJHtuYW1lfScgYnV0IGZvdW5kICR7bWF0Y2hlcy5sZW5ndGh9LmApO1xuICB9XG4gIHJldHVybiB7IC4uLm1hdGNoZXNbMF0sIG5hbWU6IGZvdW5kTmFtZSB9O1xufTtcblxuY29uc3QgZnJpZW5kbHlOYW1lID0gKG5hbWU6IHN0cmluZykgPT4gbmFtZS5yZXBsYWNlKC9cXC8vZywgXCJfXCIpO1xuXG5jb25zdCBjcmVhdGVQYXJzZXIgPSAodHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSwgZnJlZXplOiBib29sZWFuKSA9PiB7XG4gIGNvbnN0IHVubmFtZWRUeXBlcyA9IHR5cGVzLmZpbHRlcigodHlwZSkgPT4gIXR5cGUubmFtZSk7XG4gIGlmICh1bm5hbWVkVHlwZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgdW5uYW1lZCB0eXBlc1wiKTtcbiAgfVxuXG4gIGNvbnN0IFt1bm5hbWVkVHlwZV0gPSB1bm5hbWVkVHlwZXM7XG5cbiAgY29uc3QgbmFtZWRUeXBlczogTmFtZWRSb3NNc2dEZWZpbml0aW9uW10gPSAodHlwZXMuZmlsdGVyKCh0eXBlKSA9PiAhIXR5cGUubmFtZSk6IGFueVtdKTtcblxuICBjb25zdCBjb25zdHJ1Y3RvckJvZHkgPSAodHlwZTogUm9zTXNnRGVmaW5pdGlvbiB8IE5hbWVkUm9zTXNnRGVmaW5pdGlvbikgPT4ge1xuICAgIGNvbnN0IHJlYWRlckxpbmVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHR5cGUuZGVmaW5pdGlvbnMuZm9yRWFjaCgoZGVmKSA9PiB7XG4gICAgICBpZiAoZGVmLmlzQ29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRlZi5pc0FycmF5KSB7XG4gICAgICAgIGlmIChkZWYudHlwZSA9PT0gXCJ1aW50OFwiIHx8IGRlZi50eXBlID09PSBcImludDhcIikge1xuICAgICAgICAgIGNvbnN0IGFycmF5VHlwZSA9IGRlZi50eXBlID09PSBcInVpbnQ4XCIgPyBcIlVpbnQ4QXJyYXlcIiA6IFwiSW50OEFycmF5XCI7XG4gICAgICAgICAgcmVhZGVyTGluZXMucHVzaChgdGhpcy4ke2RlZi5uYW1lfSA9IHJlYWRlci50eXBlZEFycmF5KCR7U3RyaW5nKGRlZi5hcnJheUxlbmd0aCl9LCAke2FycmF5VHlwZX0pO2ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxlbkZpZWxkID0gYGxlbmd0aF8ke2RlZi5uYW1lfWA7XG4gICAgICAgIC8vIHNldCBhIHZhcmlhYmxlIHBvaW50aW5nIHRvIHRoZSBwYXJzZWQgZml4ZWQgYXJyYXkgbGVuZ3RoXG4gICAgICAgIC8vIG9yIHJlYWQgdGhlIGJ5dGUgaW5kaWNhdGluZyB0aGUgZHluYW1pYyBsZW5ndGhcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgdmFyICR7bGVuRmllbGR9ID0gJHtkZWYuYXJyYXlMZW5ndGggPyBkZWYuYXJyYXlMZW5ndGggOiBcInJlYWRlci51aW50MzIoKTtcIn1gKTtcblxuICAgICAgICAvLyBvbmx5IGFsbG9jYXRlIGFuIGFycmF5IGlmIHRoZXJlIGlzIGEgbGVuZ3RoIC0gc2tpcHMgZW1wdHkgYWxsb2NhdGlvbnNcbiAgICAgICAgY29uc3QgYXJyYXlOYW1lID0gYHRoaXMuJHtkZWYubmFtZX1gO1xuXG4gICAgICAgIC8vIGFsbG9jYXRlIHRoZSBuZXcgYXJyYXkgdG8gYSBmaXhlZCBsZW5ndGggc2luY2Ugd2Uga25vdyBpdCBhaGVhZCBvZiB0aW1lXG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goYCR7YXJyYXlOYW1lfSA9IG5ldyBBcnJheSgke2xlbkZpZWxkfSlgKTtcbiAgICAgICAgLy8gc3RhcnQgdGhlIGZvci1sb29wXG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goYGZvciAodmFyIGkgPSAwOyBpIDwgJHtsZW5GaWVsZH07IGkrKykge2ApO1xuICAgICAgICAvLyBpZiB0aGUgc3ViIHR5cGUgaXMgY29tcGxleCB3ZSBuZWVkIHRvIGFsbG9jYXRlIGl0IGFuZCBwYXJzZSBpdHMgdmFsdWVzXG4gICAgICAgIGlmIChkZWYuaXNDb21wbGV4KSB7XG4gICAgICAgICAgY29uc3QgZGVmVHlwZSA9IGZpbmRUeXBlQnlOYW1lKHR5cGVzLCBkZWYudHlwZSk7XG4gICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY2FsbCB0aGUgY29uc3RydWN0b3IgZm9yIHRoZSBzdWItdHlwZVxuICAgICAgICAgIHJlYWRlckxpbmVzLnB1c2goYCAgJHthcnJheU5hbWV9W2ldID0gbmV3IFJlY29yZC4ke2ZyaWVuZGx5TmFtZShkZWZUeXBlLm5hbWUpfShyZWFkZXIpO2ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIHRoZSBzdWJ0eXBlIGlzIG5vdCBjb21wbGV4IGl0cyBhIHNpbXBsZSBsb3ctbGV2ZWwgcmVhZGVyIG9wZXJhdGlvblxuICAgICAgICAgIHJlYWRlckxpbmVzLnB1c2goYCAgJHthcnJheU5hbWV9W2ldID0gcmVhZGVyLiR7ZGVmLnR5cGV9KCk7YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChcIn1cIik7IC8vIGNsb3NlIHRoZSBmb3ItbG9vcFxuICAgICAgfSBlbHNlIGlmIChkZWYuaXNDb21wbGV4KSB7XG4gICAgICAgIGNvbnN0IGRlZlR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmLnR5cGUpO1xuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGB0aGlzLiR7ZGVmLm5hbWV9ID0gbmV3IFJlY29yZC4ke2ZyaWVuZGx5TmFtZShkZWZUeXBlLm5hbWUpfShyZWFkZXIpO2ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgdGhpcy4ke2RlZi5uYW1lfSA9IHJlYWRlci4ke2RlZi50eXBlfSgpO2ApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChmcmVlemUpIHtcbiAgICAgIHJlYWRlckxpbmVzLnB1c2goXCJPYmplY3QuZnJlZXplKHRoaXMpO1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlYWRlckxpbmVzLmpvaW4oXCJcXG4gICAgXCIpO1xuICB9O1xuXG4gIGxldCBqcyA9IGBcbiAgdmFyIFJlY29yZCA9IGZ1bmN0aW9uIChyZWFkZXIpIHtcbiAgICAke2NvbnN0cnVjdG9yQm9keSh1bm5hbWVkVHlwZSl9XG4gIH07XFxuYDtcblxuICBuYW1lZFR5cGVzLmZvckVhY2goKHQpID0+IHtcbiAgICBqcyArPSBgXG4gIFJlY29yZC4ke2ZyaWVuZGx5TmFtZSh0Lm5hbWUpfSA9IGZ1bmN0aW9uKHJlYWRlcikge1xuICAgICR7Y29uc3RydWN0b3JCb2R5KHQpfVxuICB9O1xcbmA7XG4gIH0pO1xuXG4gIGpzICs9IGBcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlYWQocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBSZWNvcmQocmVhZGVyKTtcbiAgfTtgO1xuXG4gIGxldCBfcmVhZDogKHJlYWRlcjogU3RhbmRhcmRUeXBlUmVhZGVyKSA9PiBhbnk7XG4gIHRyeSB7XG4gICAgX3JlYWQgPSBldmFsKGAoZnVuY3Rpb24gYnVpbGRSZWFkZXIoKSB7ICR7anN9IH0pKClgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvciBidWlsZGluZyBwYXJzZXI6XCIsIGpzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihidWZmZXI6IEJ1ZmZlcikge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBTdGFuZGFyZFR5cGVSZWFkZXIoYnVmZmVyKTtcbiAgICByZXR1cm4gX3JlYWQocmVhZGVyKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUmVhZGVyIHtcbiAgcmVhZGVyOiAoYnVmZmVyOiBCdWZmZXIpID0+IGFueTtcblxuICAvLyB0YWtlcyBhbiBvYmplY3QgbWVzc2FnZSBkZWZpbml0aW9uIGFuZCByZXR1cm5zXG4gIC8vIGEgbWVzc2FnZSByZWFkZXIgd2hpY2ggY2FuIGJlIHVzZWQgdG8gcmVhZCBtZXNzYWdlcyBiYXNlZFxuICAvLyBvbiB0aGUgbWVzc2FnZSBkZWZpbml0aW9uXG4gIGNvbnN0cnVjdG9yKGRlZmluaXRpb25zOiBSb3NNc2dEZWZpbml0aW9uW10sIG9wdGlvbnM6IHsgZnJlZXplPzogP2Jvb2xlYW4gfSA9IHt9KSB7XG4gICAgbGV0IHBhcnNlZERlZmluaXRpb25zID0gZGVmaW5pdGlvbnM7XG4gICAgaWYgKHR5cGVvZiBwYXJzZWREZWZpbml0aW9ucyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJQYXNzaW5nIHN0cmluZyBtZXNzYWdlIGRlZmludGlvbnMgdG8gTWVzc2FnZVJlYWRlciBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkIGNhbGwgYHBhcnNlTWVzc2FnZURlZmluaXRpb25gIG9uIGl0IGFuZCBwYXNzIGluIHRoZSByZXN1bHRpbmcgcGFyc2VkIG1lc3NhZ2UgZGVmaW5pdGlvbiBvYmplY3QuXCJcbiAgICAgICk7XG4gICAgICBwYXJzZWREZWZpbml0aW9ucyA9IHBhcnNlTWVzc2FnZURlZmluaXRpb24ocGFyc2VkRGVmaW5pdGlvbnMpO1xuICAgIH1cbiAgICB0aGlzLnJlYWRlciA9IGNyZWF0ZVBhcnNlcihwYXJzZWREZWZpbml0aW9ucywgISFvcHRpb25zLmZyZWV6ZSk7XG4gIH1cblxuICByZWFkTWVzc2FnZShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHJldHVybiB0aGlzLnJlYWRlcihidWZmZXIpO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgaW50NTMgZnJvbSBcImludDUzXCI7XG5pbXBvcnQgdHlwZSB7IFRpbWUsIFJvc01zZ0RlZmluaXRpb24sIE5hbWVkUm9zTXNnRGVmaW5pdGlvbiB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8vIHdyaXRlIGEgVGltZSBvYmplY3QgdG8gYSBidWZmZXIuXG5mdW5jdGlvbiB3cml0ZVRpbWUodGltZTogVGltZSwgYnVmZmVyOiBCdWZmZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIGJ1ZmZlci53cml0ZVVJbnQzMkxFKHRpbWUuc2VjLCBvZmZzZXQpO1xuICBidWZmZXIud3JpdGVVSW50MzJMRSh0aW1lLm5zZWMsIG9mZnNldCArIDQpO1xufVxuXG5jbGFzcyBTdGFuZGFyZFR5cGVPZmZzZXRDYWxjdWxhdG9yIHtcbiAgb2Zmc2V0ID0gMDtcblxuICAvLyBSZXR1cm5zIHRoZSBjdXJyZW50IG9mZnNldCBhbmQgaW5jcmVtZW50cyB0aGUgbmV4dCBvZmZzZXQgYnkgYGJ5dGVDb3VudGAuXG4gIF9pbmNyZW1lbnRBbmRSZXR1cm4oYnl0ZUNvdW50OiBudW1iZXIpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLm9mZnNldCArPSBieXRlQ291bnQ7XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIC8vIFRoZXNlIGFyZSBub3QgYWN0dWFsbHkgdXNlZCBpbiB0aGUgU3RhbmRhcmRUeXBlV3JpdGVyLCBzbyB0aGV5IG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhvc2UgaW1wbGVtZW50YXRpb25zLlxuICBqc29uKHZhbHVlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmcoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG4gIC8vIFRoZSBmb2xsb3dpbmcgYXJlIHVzZWQgaW4gdGhlIFN0YW5kYXJkVHlwZVdyaXRlci5cbiAgc3RyaW5nKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBpbnQzMiBsZW5ndGhcbiAgICBjb25zdCBsZW5ndGggPSA0ICsgdmFsdWUubGVuZ3RoO1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4obGVuZ3RoKTtcbiAgfVxuXG4gIGJvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDgoKTtcbiAgfVxuXG4gIGludDgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luY3JlbWVudEFuZFJldHVybigxKTtcbiAgfVxuXG4gIHVpbnQ4KCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oMSk7XG4gIH1cblxuICBpbnQxNigpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDIpO1xuICB9XG5cbiAgdWludDE2KCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oMik7XG4gIH1cblxuICBpbnQzMigpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDQpO1xuICB9XG5cbiAgdWludDMyKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oNCk7XG4gIH1cblxuICBmbG9hdDMyKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oNCk7XG4gIH1cblxuICBmbG9hdDY0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oOCk7XG4gIH1cblxuICBpbnQ2NCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDgpO1xuICB9XG5cbiAgdWludDY0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oOCk7XG4gIH1cblxuICB0aW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmNyZW1lbnRBbmRSZXR1cm4oOCk7XG4gIH1cblxuICBkdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50QW5kUmV0dXJuKDgpO1xuICB9XG59XG5cbi8vIHRoaXMgaGFzIGhhcmQtY29kZWQgYnVmZmVyIHdyaXRpbmcgZnVuY3Rpb25zIGZvciBlYWNoXG4vLyBvZiB0aGUgc3RhbmRhcmQgbWVzc2FnZSB0eXBlcyBodHRwOi8vZG9jcy5yb3Mub3JnL2FwaS9zdGRfbXNncy9odG1sL2luZGV4LW1zZy5odG1sXG4vLyBldmVudHVhbGx5IGN1c3RvbSB0eXBlcyBkZWNvbXBvc2UgaW50byB0aGVzZSBzdGFuZGFyZCB0eXBlc1xuY2xhc3MgU3RhbmRhcmRUeXBlV3JpdGVyIHtcbiAgYnVmZmVyOiBCdWZmZXI7XG4gIHZpZXc6IERhdGFWaWV3O1xuICBvZmZzZXRDYWxjdWxhdG9yOiBTdGFuZGFyZFR5cGVPZmZzZXRDYWxjdWxhdG9yO1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy52aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0KTtcbiAgICB0aGlzLm9mZnNldENhbGN1bGF0b3IgPSBuZXcgU3RhbmRhcmRUeXBlT2Zmc2V0Q2FsY3VsYXRvcigpO1xuICB9XG5cbiAganNvbih2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5zdHJpbmcoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG4gIHN0cmluZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc3RyaW5nT2Zmc2V0ID0gdGhpcy5vZmZzZXRDYWxjdWxhdG9yLnN0cmluZyh2YWx1ZSk7XG4gICAgdGhpcy52aWV3LnNldEludDMyKHN0cmluZ09mZnNldCwgdmFsdWUubGVuZ3RoLCB0cnVlKTtcbiAgICB0aGlzLmJ1ZmZlci53cml0ZSh2YWx1ZSwgc3RyaW5nT2Zmc2V0ICsgNCwgdmFsdWUubGVuZ3RoLCBcImFzY2lpXCIpO1xuICB9XG5cbiAgYm9vbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMudWludDgodmFsdWUgPyAxIDogMCk7XG4gIH1cblxuICBpbnQ4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnZpZXcuc2V0SW50OCh0aGlzLm9mZnNldENhbGN1bGF0b3IuaW50OCgpLCB2YWx1ZSk7XG4gIH1cblxuICB1aW50OCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy52aWV3LnNldFVpbnQ4KHRoaXMub2Zmc2V0Q2FsY3VsYXRvci51aW50OCgpLCB2YWx1ZSk7XG4gIH1cblxuICBpbnQxNih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy52aWV3LnNldEludDE2KHRoaXMub2Zmc2V0Q2FsY3VsYXRvci5pbnQxNigpLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cblxuICB1aW50MTYodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudmlldy5zZXRVaW50MTYodGhpcy5vZmZzZXRDYWxjdWxhdG9yLnVpbnQxNigpLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cblxuICBpbnQzMih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy52aWV3LnNldEludDMyKHRoaXMub2Zmc2V0Q2FsY3VsYXRvci5pbnQzMigpLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cblxuICB1aW50MzIodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudmlldy5zZXRVaW50MzIodGhpcy5vZmZzZXRDYWxjdWxhdG9yLnVpbnQzMigpLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cblxuICBmbG9hdDMyKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnZpZXcuc2V0RmxvYXQzMih0aGlzLm9mZnNldENhbGN1bGF0b3IuZmxvYXQzMigpLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cblxuICBmbG9hdDY0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnZpZXcuc2V0RmxvYXQ2NCh0aGlzLm9mZnNldENhbGN1bGF0b3IuZmxvYXQ2NCgpLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cblxuICBpbnQ2NCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaW50NTMud3JpdGVJbnQ2NExFKHZhbHVlLCB0aGlzLmJ1ZmZlciwgdGhpcy5vZmZzZXRDYWxjdWxhdG9yLmludDY0KCkpO1xuICB9XG5cbiAgdWludDY0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpbnQ1My53cml0ZVVJbnQ2NExFKHZhbHVlLCB0aGlzLmJ1ZmZlciwgdGhpcy5vZmZzZXRDYWxjdWxhdG9yLnVpbnQ2NCgpKTtcbiAgfVxuXG4gIHRpbWUodGltZTogVGltZSkge1xuICAgIHdyaXRlVGltZSh0aW1lLCB0aGlzLmJ1ZmZlciwgdGhpcy5vZmZzZXRDYWxjdWxhdG9yLnRpbWUoKSk7XG4gIH1cblxuICBkdXJhdGlvbih0aW1lOiBUaW1lKSB7XG4gICAgd3JpdGVUaW1lKHRpbWUsIHRoaXMuYnVmZmVyLCB0aGlzLm9mZnNldENhbGN1bGF0b3IudGltZSgpKTtcbiAgfVxufVxuXG5jb25zdCBmaW5kVHlwZUJ5TmFtZSA9ICh0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdLCBuYW1lID0gXCJcIik6IE5hbWVkUm9zTXNnRGVmaW5pdGlvbiA9PiB7XG4gIGxldCBmb3VuZE5hbWUgPSBcIlwiOyAvLyB0cmFjayBuYW1lIHNlcGFyYXRlbHkgaW4gYSBub24tbnVsbCB2YXJpYWJsZSB0byBhcHBlYXNlIEZsb3dcbiAgY29uc3QgbWF0Y2hlcyA9IHR5cGVzLmZpbHRlcigodHlwZSkgPT4ge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gdHlwZS5uYW1lIHx8IFwiXCI7XG4gICAgLy8gaWYgdGhlIHNlYXJjaCBpcyBlbXB0eSwgcmV0dXJuIHVubmFtZWQgdHlwZXNcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiAhdHlwZU5hbWU7XG4gICAgfVxuICAgIC8vIHJldHVybiBpZiB0aGUgc2VhcmNoIGlzIGluIHRoZSB0eXBlIG5hbWVcbiAgICAvLyBvciBtYXRjaGVzIGV4YWN0bHkgaWYgYSBmdWxseS1xdWFsaWZpZWQgbmFtZSBtYXRjaCBpcyBwYXNzZWQgdG8gdXNcbiAgICBjb25zdCBuYW1lRW5kID0gbmFtZS5pbmRleE9mKFwiL1wiKSA+IC0xID8gbmFtZSA6IGAvJHtuYW1lfWA7XG4gICAgaWYgKHR5cGVOYW1lLmVuZHNXaXRoKG5hbWVFbmQpKSB7XG4gICAgICBmb3VuZE5hbWUgPSB0eXBlTmFtZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICBpZiAobWF0Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIDEgdG9wIGxldmVsIHR5cGUgZGVmaW5pdGlvbiBmb3IgJyR7bmFtZX0nIGJ1dCBmb3VuZCAke21hdGNoZXMubGVuZ3RofS5gKTtcbiAgfVxuICByZXR1cm4geyAuLi5tYXRjaGVzWzBdLCBuYW1lOiBmb3VuZE5hbWUgfTtcbn07XG5cbmNvbnN0IGZyaWVuZGx5TmFtZSA9IChuYW1lOiBzdHJpbmcpID0+IG5hbWUucmVwbGFjZSgvXFwvL2csIFwiX1wiKTtcbnR5cGUgV3JpdGVyQW5kU2l6ZUNhbGN1bGF0b3IgPSB7fFxuICB3cml0ZXI6IChtZXNzYWdlOiBhbnksIGJ1ZmZlclRvV3JpdGU6IEJ1ZmZlcikgPT4gQnVmZmVyLFxuICBidWZmZXJTaXplQ2FsY3VsYXRvcjogKG1lc3NhZ2U6IGFueSkgPT4gbnVtYmVyLFxufH07XG5cbmZ1bmN0aW9uIGNyZWF0ZVdyaXRlckFuZFNpemVDYWxjdWxhdG9yKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10pOiBXcml0ZXJBbmRTaXplQ2FsY3VsYXRvciB7XG4gIGNvbnN0IHVubmFtZWRUeXBlcyA9IHR5cGVzLmZpbHRlcigodHlwZSkgPT4gIXR5cGUubmFtZSk7XG4gIGlmICh1bm5hbWVkVHlwZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgdW5uYW1lZCB0eXBlc1wiKTtcbiAgfVxuXG4gIGNvbnN0IFt1bm5hbWVkVHlwZV0gPSB1bm5hbWVkVHlwZXM7XG5cbiAgY29uc3QgbmFtZWRUeXBlczogTmFtZWRSb3NNc2dEZWZpbml0aW9uW10gPSAodHlwZXMuZmlsdGVyKCh0eXBlKSA9PiAhIXR5cGUubmFtZSk6IGFueVtdKTtcblxuICBjb25zdCBjb25zdHJ1Y3RvckJvZHkgPSAodHlwZTogUm9zTXNnRGVmaW5pdGlvbiB8IE5hbWVkUm9zTXNnRGVmaW5pdGlvbiwgYXJnTmFtZTogXCJvZmZzZXRDYWxjdWxhdG9yXCIgfCBcIndyaXRlclwiKSA9PiB7XG4gICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG4gICAgdHlwZS5kZWZpbml0aW9ucy5mb3JFYWNoKChkZWYpID0+IHtcbiAgICAgIGlmIChkZWYuaXNDb25zdGFudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEFjY2Vzc2VzIHRoZSBmaWVsZCB3ZSBhcmUgY3VycmVudGx5IHdyaXRpbmcuIFB1bGxlZCBvdXQgZm9yIGVhc3kgcmV1c2UuXG4gICAgICBjb25zdCBhY2Nlc3NNZXNzYWdlRmllbGQgPSBgbWVzc2FnZVtcIiR7ZGVmLm5hbWV9XCJdYDtcbiAgICAgIGlmIChkZWYuaXNBcnJheSkge1xuICAgICAgICBjb25zdCBsZW5GaWVsZCA9IGBsZW5ndGhfJHtkZWYubmFtZX1gO1xuICAgICAgICAvLyBzZXQgYSB2YXJpYWJsZSBwb2ludGluZyB0byB0aGUgcGFyc2VkIGZpeGVkIGFycmF5IGxlbmd0aFxuICAgICAgICAvLyBvciB3cml0ZSB0aGUgYnl0ZSBpbmRpY2F0aW5nIHRoZSBkeW5hbWljIGxlbmd0aFxuICAgICAgICBpZiAoZGVmLmFycmF5TGVuZ3RoKSB7XG4gICAgICAgICAgbGluZXMucHVzaChgdmFyICR7bGVuRmllbGR9ID0gJHtkZWYuYXJyYXlMZW5ndGh9O2ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpbmVzLnB1c2goYHZhciAke2xlbkZpZWxkfSA9ICR7YWNjZXNzTWVzc2FnZUZpZWxkfS5sZW5ndGg7YCk7XG4gICAgICAgICAgbGluZXMucHVzaChgJHthcmdOYW1lfS51aW50MzIoJHtsZW5GaWVsZH0pO2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhcnQgdGhlIGZvci1sb29wXG4gICAgICAgIGxpbmVzLnB1c2goYGZvciAodmFyIGkgPSAwOyBpIDwgJHtsZW5GaWVsZH07IGkrKykge2ApO1xuICAgICAgICAvLyBpZiB0aGUgc3ViIHR5cGUgaXMgY29tcGxleCB3ZSBuZWVkIHRvIGFsbG9jYXRlIGl0IGFuZCBwYXJzZSBpdHMgdmFsdWVzXG4gICAgICAgIGlmIChkZWYuaXNDb21wbGV4KSB7XG4gICAgICAgICAgY29uc3QgZGVmVHlwZSA9IGZpbmRUeXBlQnlOYW1lKHR5cGVzLCBkZWYudHlwZSk7XG4gICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY2FsbCB0aGUgZnVuY3Rpb24gZm9yIHRoZSBzdWItdHlwZVxuICAgICAgICAgIGxpbmVzLnB1c2goYCAgJHtmcmllbmRseU5hbWUoZGVmVHlwZS5uYW1lKX0oJHthcmdOYW1lfSwgJHthY2Nlc3NNZXNzYWdlRmllbGR9W2ldKTtgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiB0aGUgc3VidHlwZSBpcyBub3QgY29tcGxleCBpdHMgYSBzaW1wbGUgbG93LWxldmVsIG9wZXJhdGlvblxuICAgICAgICAgIGxpbmVzLnB1c2goYCAgJHthcmdOYW1lfS4ke2RlZi50eXBlfSgke2FjY2Vzc01lc3NhZ2VGaWVsZH1baV0pO2ApO1xuICAgICAgICB9XG4gICAgICAgIGxpbmVzLnB1c2goXCJ9XCIpOyAvLyBjbG9zZSB0aGUgZm9yLWxvb3BcbiAgICAgIH0gZWxzZSBpZiAoZGVmLmlzQ29tcGxleCkge1xuICAgICAgICBjb25zdCBkZWZUeXBlID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZi50eXBlKTtcbiAgICAgICAgbGluZXMucHVzaChgJHtmcmllbmRseU5hbWUoZGVmVHlwZS5uYW1lKX0oJHthcmdOYW1lfSwgJHthY2Nlc3NNZXNzYWdlRmllbGR9KTtgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENhbGwgcHJpbWl0aXZlcyBkaXJlY3RseS5cbiAgICAgICAgbGluZXMucHVzaChgJHthcmdOYW1lfS4ke2RlZi50eXBlfSgke2FjY2Vzc01lc3NhZ2VGaWVsZH0pO2ApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBsaW5lcy5qb2luKFwiXFxuICAgIFwiKTtcbiAgfTtcblxuICBsZXQgd3JpdGVySnMgPSBcIlwiO1xuICBsZXQgY2FsY3VsYXRlU2l6ZUpzID0gXCJcIjtcblxuICBuYW1lZFR5cGVzLmZvckVhY2goKHQpID0+IHtcbiAgICB3cml0ZXJKcyArPSBgXG4gIGZ1bmN0aW9uICR7ZnJpZW5kbHlOYW1lKHQubmFtZSl9KHdyaXRlciwgbWVzc2FnZSkge1xuICAgICR7Y29uc3RydWN0b3JCb2R5KHQsIFwid3JpdGVyXCIpfVxuICB9O1xcbmA7XG4gICAgY2FsY3VsYXRlU2l6ZUpzICs9IGBcbiAgZnVuY3Rpb24gJHtmcmllbmRseU5hbWUodC5uYW1lKX0ob2Zmc2V0Q2FsY3VsYXRvciwgbWVzc2FnZSkge1xuICAgICR7Y29uc3RydWN0b3JCb2R5KHQsIFwib2Zmc2V0Q2FsY3VsYXRvclwiKX1cbiAgfTtcXG5gO1xuICB9KTtcblxuICB3cml0ZXJKcyArPSBgXG4gIHJldHVybiBmdW5jdGlvbiB3cml0ZSh3cml0ZXIsIG1lc3NhZ2UpIHtcbiAgICAke2NvbnN0cnVjdG9yQm9keSh1bm5hbWVkVHlwZSwgXCJ3cml0ZXJcIil9XG4gICAgcmV0dXJuIHdyaXRlci5idWZmZXI7XG4gIH07YDtcbiAgY2FsY3VsYXRlU2l6ZUpzICs9IGBcbiAgcmV0dXJuIGZ1bmN0aW9uIGNhbGN1bGF0ZVNpemUob2Zmc2V0Q2FsY3VsYXRvciwgbWVzc2FnZSkge1xuICAgICR7Y29uc3RydWN0b3JCb2R5KHVubmFtZWRUeXBlLCBcIm9mZnNldENhbGN1bGF0b3JcIil9XG4gICAgcmV0dXJuIG9mZnNldENhbGN1bGF0b3Iub2Zmc2V0O1xuICB9O2A7XG5cbiAgbGV0IF93cml0ZTogKHdyaXRlcjogU3RhbmRhcmRUeXBlV3JpdGVyLCBtZXNzYWdlOiBhbnkpID0+IEJ1ZmZlcjtcbiAgbGV0IF9jYWxjdWxhdGVTaXplOiAob2Zmc2V0Q2FsY3VsYXRvcjogU3RhbmRhcmRUeXBlT2Zmc2V0Q2FsY3VsYXRvciwgbWVzc2FnZTogYW55KSA9PiBudW1iZXI7XG4gIHRyeSB7XG4gICAgX3dyaXRlID0gZXZhbChgKGZ1bmN0aW9uIGJ1aWxkV3JpdGVyKCkgeyAke3dyaXRlckpzfSB9KSgpYCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiZXJyb3IgYnVpbGRpbmcgd3JpdGVyOlwiLCB3cml0ZXJKcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHRocm93IGU7XG4gIH1cbiAgdHJ5IHtcbiAgICBfY2FsY3VsYXRlU2l6ZSA9IGV2YWwoYChmdW5jdGlvbiBidWlsZFNpemVDYWxjdWxhdG9yKCkgeyAke2NhbGN1bGF0ZVNpemVKc30gfSkoKWApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcImVycm9yIGJ1aWxkaW5nIHNpemUgY2FsY3VsYXRvcjpcIiwgY2FsY3VsYXRlU2l6ZUpzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd3JpdGVyOiBmdW5jdGlvbihtZXNzYWdlOiBhbnksIGJ1ZmZlcjogQnVmZmVyKTogQnVmZmVyIHtcbiAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBTdGFuZGFyZFR5cGVXcml0ZXIoYnVmZmVyKTtcbiAgICAgIHJldHVybiBfd3JpdGUod3JpdGVyLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIGJ1ZmZlclNpemVDYWxjdWxhdG9yKG1lc3NhZ2U6IGFueSk6IG51bWJlciB7XG4gICAgICBjb25zdCBvZmZzZXRDYWxjdWxhdG9yID0gbmV3IFN0YW5kYXJkVHlwZU9mZnNldENhbGN1bGF0b3IoKTtcbiAgICAgIHJldHVybiBfY2FsY3VsYXRlU2l6ZShvZmZzZXRDYWxjdWxhdG9yLCBtZXNzYWdlKTtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVdyaXRlciB7XG4gIHdyaXRlcjogKG1lc3NhZ2U6IGFueSwgYnVmZmVyVG9Xcml0ZTogQnVmZmVyKSA9PiBCdWZmZXI7XG4gIGJ1ZmZlclNpemVDYWxjdWxhdG9yOiAobWVzc2FnZTogYW55KSA9PiBudW1iZXI7XG5cbiAgLy8gdGFrZXMgYW4gb2JqZWN0IHN0cmluZyBtZXNzYWdlIGRlZmluaXRpb24gYW5kIHJldHVybnNcbiAgLy8gYSBtZXNzYWdlIHdyaXRlciB3aGljaCBjYW4gYmUgdXNlZCB0byB3cml0ZSBtZXNzYWdlcyBiYXNlZFxuICAvLyBvbiB0aGUgbWVzc2FnZSBkZWZpbml0aW9uXG4gIGNvbnN0cnVjdG9yKGRlZmluaXRpb25zOiBSb3NNc2dEZWZpbml0aW9uW10pIHtcbiAgICBjb25zdCB7IHdyaXRlciwgYnVmZmVyU2l6ZUNhbGN1bGF0b3IgfSA9IGNyZWF0ZVdyaXRlckFuZFNpemVDYWxjdWxhdG9yKGRlZmluaXRpb25zKTtcbiAgICB0aGlzLndyaXRlciA9IHdyaXRlcjtcbiAgICB0aGlzLmJ1ZmZlclNpemVDYWxjdWxhdG9yID0gYnVmZmVyU2l6ZUNhbGN1bGF0b3I7XG4gIH1cblxuICAvLyBDYWxjdWxhdGVzIHRoZSBidWZmZXIgc2l6ZSBuZWVkZWQgdG8gd3JpdGUgdGhpcyBtZXNzYWdlIGluIGJ5dGVzLlxuICBjYWxjdWxhdGVCdWZmZXJTaXplKG1lc3NhZ2U6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmJ1ZmZlclNpemVDYWxjdWxhdG9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgLy8gYnVmZmVyVG9Xcml0ZSBpcyBvcHRpb25hbCAtIGlmIGl0IGlzIG5vdCBwcm92aWRlZCwgYSBidWZmZXIgd2lsbCBiZSBnZW5lcmF0ZWQuXG4gIHdyaXRlTWVzc2FnZShtZXNzYWdlOiBhbnksIGJ1ZmZlclRvV3JpdGU/OiBCdWZmZXIpIHtcbiAgICBsZXQgYnVmZmVyID0gYnVmZmVyVG9Xcml0ZTtcbiAgICBpZiAoIWJ1ZmZlcikge1xuICAgICAgY29uc3QgYnVmZmVyU2l6ZSA9IHRoaXMuY2FsY3VsYXRlQnVmZmVyU2l6ZShtZXNzYWdlKTtcbiAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShidWZmZXJTaXplKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud3JpdGVyKG1lc3NhZ2UsIGJ1ZmZlcik7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8vIHJlcHJlc2VudHMgYSByZXN1bHQgcGFzc2VkIHRvIHRoZSBjYWxsYmFjayBmcm9tIHRoZSBoaWdoLWxldmVsIGNhbGw6XG4vLyBiYWcucmVhZE1lc3NhZ2VzKHsgb3B0czogYW55IH0sIGNhbGxiYWNrOiAoUmVhZFJlc3VsdCkgPT4gdm9pZCkgPT4gUHJvbWlzZTx2b2lkPlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhZFJlc3VsdDxUPiB7XG4gIHRvcGljOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IFQ7XG4gIHRpbWVzdGFtcDogVGltZTtcbiAgZGF0YTogQnVmZmVyO1xuICBjaHVua09mZnNldDogbnVtYmVyO1xuICB0b3RhbENodW5rczogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRvcGljOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogVCxcbiAgICB0aW1lc3RhbXA6IFRpbWUsXG4gICAgZGF0YTogQnVmZmVyLFxuICAgIGNodW5rT2Zmc2V0OiBudW1iZXIsXG4gICAgdG90YWxDaHVua3M6IG51bWJlcixcbiAgICBmcmVlemU/OiA/Ym9vbGVhblxuICApIHtcbiAgICAvLyBzdHJpbmc6IHRoZSB0b3BpYyB0aGUgbWVzc2FnZSB3YXMgb25cbiAgICB0aGlzLnRvcGljID0gdG9waWM7XG5cbiAgICAvLyBhbnk6IHRoZSBwYXJzZWQgYm9keSBvZiB0aGUgbWVzc2FnZSBiYXNlZCBvbiBjb25uZWN0aW9uLm1lc3NhZ2VEZWZpbml0aW9uXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblxuICAgIC8vIHRpbWU6IHRoZSB0aW1lc3RhbXAgb2YgdGhlIG1lc3NhZ2VcbiAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcblxuICAgIC8vIGJ1ZmZlcjogcmF3IGJ1ZmZlciBkYXRhIG9mIHRoZSBtZXNzYWdlXG4gICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgIC8vIHRoZSBvZmZzZXQgb2YgdGhlIGN1cnJlbnRseSByZWFkIGNodW5rXG4gICAgdGhpcy5jaHVua09mZnNldCA9IGNodW5rT2Zmc2V0O1xuXG4gICAgLy8gdGhlIHRvdGFsIG51bWJlciBvZiBjaHVua3MgaW4gdGhlIHJlYWQgb3BlcmF0aW9uXG4gICAgdGhpcy50b3RhbENodW5rcyA9IHRvdGFsQ2h1bmtzO1xuXG4gICAgaWYgKGZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZSh0aW1lc3RhbXApO1xuICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRGF0ZShkYXRlOiBEYXRlKSB7XG4gIGNvbnN0IHNlYyA9IE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgY29uc3QgbnNlYyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgKiAxZTY7XG4gIHJldHVybiB7IHNlYywgbnNlYyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKHRpbWU6IFRpbWUpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWUuc2VjICogMWUzICsgdGltZS5uc2VjIC8gMWU2KTtcbn1cblxuLy8gY29tcGFyZSB0d28gdGltZXMsIHJldHVybmluZyBhIG5lZ2F0aXZlIHZhbHVlIGlmIHRoZSByaWdodCBpcyBncmVhdGVyXG4vLyBvciBhIHBvc2l0aXZlIHZhbHVlIGlmIHRoZSBsZWZ0IGlzIGdyZWF0ZXIgb3IgMCBpZiB0aGUgdGltZXMgYXJlIGVxdWFsXG4vLyB1c2VmdWwgdG8gc3VwcGx5IHRvIEFycmF5LnByb3RvdHlwZS5zb3J0XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZShsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICBjb25zdCBzZWNEaWZmID0gbGVmdC5zZWMgLSByaWdodC5zZWM7XG4gIHJldHVybiBzZWNEaWZmIHx8IGxlZnQubnNlYyAtIHJpZ2h0Lm5zZWM7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgbGVmdCB0aW1lIGlzIGxlc3MgdGhhbiB0aGUgcmlnaHQgdGltZSwgb3RoZXJ3aXNlIGZhbHNlXG5leHBvcnQgZnVuY3Rpb24gaXNMZXNzVGhhbihsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gdGhpcy5jb21wYXJlKGxlZnQsIHJpZ2h0KSA8IDA7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgbGVmdCB0aW1lIGlzIGdyZWF0ZXIgdGhhbiB0aGUgcmlnaHQgdGltZSwgb3RoZXJ3aXNlIGZhbHNlXG5leHBvcnQgZnVuY3Rpb24gaXNHcmVhdGVyVGhhbihsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gdGhpcy5jb21wYXJlKGxlZnQsIHJpZ2h0KSA+IDA7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiBib3RoIHRpbWVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHNlY29uZHMgYW5kIG5hbm9zZWNvbmRzXG5leHBvcnQgZnVuY3Rpb24gYXJlU2FtZShsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gbGVmdC5zZWMgPT09IHJpZ2h0LnNlYyAmJiBsZWZ0Lm5zZWMgPT09IHJpZ2h0Lm5zZWM7XG59XG5cbmZ1bmN0aW9uIHRvU3RyaW5nKHRpbWU6IFRpbWUpIHtcbiAgcmV0dXJuIGB7JHt0aW1lLnNlY30sICR7dGltZS5uc2VjfX1gO1xufVxuXG4vLyBjb21wdXRlcyB0aGUgc3VtIG9mIHR3byB0aW1lcyBvciBkdXJhdGlvbnMgYW5kIHJldHVybnMgYSBuZXcgdGltZVxuLy8gdGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcmVzdWx0aW5nIHRpbWUgaXMgbmVnYXRpdmVcbmV4cG9ydCBmdW5jdGlvbiBhZGQobGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb25OYW5vcyA9IGxlZnQubnNlYyArIHJpZ2h0Lm5zZWM7XG4gIGNvbnN0IHNlY3NGcm9tTmFub3MgPSBNYXRoLmZsb29yKGR1cmF0aW9uTmFub3MgLyAxZTkpO1xuICBjb25zdCBuZXdTZWNzID0gbGVmdC5zZWMgKyByaWdodC5zZWMgKyBzZWNzRnJvbU5hbm9zO1xuICBjb25zdCByZW1haW5pbmdEdXJhdGlvbk5hbm9zID0gZHVyYXRpb25OYW5vcyAlIDFlOTtcbiAgLy8gdXNlIE1hdGguYWJzIGhlcmUgdG8gcHJldmVudCAtMCB3aGVuIHRoZXJlIGlzIGV4YWN0bHkgMSBzZWNvbmQgb2YgbmVnYXRpdmUgbmFub3NlY29uZHMgcGFzc2VkIGluXG4gIGNvbnN0IG5ld05hbm9zID0gTWF0aC5hYnMoXG4gICAgTWF0aC5zaWduKHJlbWFpbmluZ0R1cmF0aW9uTmFub3MpID09PSAtMSA/IDFlOSArIHJlbWFpbmluZ0R1cmF0aW9uTmFub3MgOiByZW1haW5pbmdEdXJhdGlvbk5hbm9zXG4gICk7XG4gIGNvbnN0IHJlc3VsdCA9IHsgc2VjOiBuZXdTZWNzLCBuc2VjOiBuZXdOYW5vcyB9O1xuICBpZiAocmVzdWx0LnNlYyA8IDAgfHwgcmVzdWx0Lm5zZWMgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEludmFsaWQgdGltZTogJHt0b1N0cmluZyhyZXN1bHQpfSBwcm9kdWNlZCBmcm9tIFRpbWVVdGlsLmFkZCgke3RvU3RyaW5nKGxlZnQpfSwgJHt0b1N0cmluZyhyaWdodCl9fSlgXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IEJhZ1JlYWRlciwgeyB0eXBlIERlY29tcHJlc3MgfSBmcm9tIFwiLi9CYWdSZWFkZXJcIjtcbmltcG9ydCB7IE1lc3NhZ2VSZWFkZXIgfSBmcm9tIFwiLi9NZXNzYWdlUmVhZGVyXCI7XG5pbXBvcnQgUmVhZFJlc3VsdCBmcm9tIFwiLi9SZWFkUmVzdWx0XCI7XG5pbXBvcnQgeyBCYWdIZWFkZXIsIENodW5rSW5mbywgQ29ubmVjdGlvbiwgTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9yZWNvcmRcIjtcbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgKiBhcyBUaW1lVXRpbCBmcm9tIFwiLi9UaW1lVXRpbFwiO1xuaW1wb3J0IHsgcGFyc2VNZXNzYWdlRGVmaW5pdGlvbiB9IGZyb20gXCIuL3BhcnNlTWVzc2FnZURlZmluaXRpb25cIjtcblxuZXhwb3J0IHR5cGUgUmVhZE9wdGlvbnMgPSB7fFxuICBkZWNvbXByZXNzPzogRGVjb21wcmVzcyxcbiAgbm9QYXJzZT86IGJvb2xlYW4sXG4gIHRvcGljcz86IHN0cmluZ1tdLFxuICBzdGFydFRpbWU/OiBUaW1lLFxuICBlbmRUaW1lPzogVGltZSxcbiAgZnJlZXplPzogP2Jvb2xlYW4sXG58fTtcblxuLy8gdGhlIGhpZ2ggbGV2ZWwgcm9zYmFnIGludGVyZmFjZVxuLy8gY3JlYXRlIGEgbmV3IGJhZyBieSBjYWxsaW5nOlxuLy8gYGNvbnN0IGJhZyA9IGF3YWl0IEJhZy5vcGVuKCcuL3BhdGgtdG8tZmlsZS5iYWcnKWAgaW4gbm9kZSBvclxuLy8gYGNvbnN0IGJhZyA9IGF3YWl0IEJhZy5vcGVuKGZpbGVzWzBdKWAgaW4gdGhlIGJyb3dzZXJcbi8vXG4vLyBhZnRlciB0aGF0IHlvdSBjYW4gY29uc3VtZSBtZXNzYWdlcyBieSBjYWxsaW5nXG4vLyBgYXdhaXQgYmFnLnJlYWRNZXNzYWdlcyh7IHRvcGljczogWycvZm9vJ10gfSxcbi8vICAgIChyZXN1bHQpID0+IGNvbnNvbGUubG9nKHJlc3VsdC50b3BpYywgcmVzdWx0Lm1lc3NhZ2UpKWBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhZyB7XG4gIHJlYWRlcjogQmFnUmVhZGVyO1xuICBoZWFkZXI6IEJhZ0hlYWRlcjtcbiAgY29ubmVjdGlvbnM6IHsgW2Nvbm46IG51bWJlcl06IENvbm5lY3Rpb24gfTtcbiAgY2h1bmtJbmZvczogQ2h1bmtJbmZvW107XG4gIHN0YXJ0VGltZTogP1RpbWU7XG4gIGVuZFRpbWU6ID9UaW1lO1xuXG4gIC8vIHlvdSBjYW4gb3B0aW9uYWxseSBjcmVhdGUgYSBiYWcgbWFudWFsbHkgcGFzc2luZyBpbiBhIGJhZ1JlYWRlciBpbnN0YW5jZVxuICBjb25zdHJ1Y3RvcihiYWdSZWFkZXI6IEJhZ1JlYWRlcikge1xuICAgIHRoaXMucmVhZGVyID0gYmFnUmVhZGVyO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIHN0YXRpYyBvcGVuID0gKGZpbGU6IEZpbGUgfCBzdHJpbmcpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIlRoaXMgbWV0aG9kIHNob3VsZCBoYXZlIGJlZW4gb3ZlcnJpZGRlbiBiYXNlZCBvbiB0aGUgZW52aXJvbm1lbnQuIE1ha2Ugc3VyZSB5b3UgYXJlIGNvcnJlY3RseSBpbXBvcnRpbmcgdGhlIG5vZGUgb3Igd2ViIHZlcnNpb24gb2YgQmFnLlwiXG4gICAgKTtcbiAgfTtcblxuICAvLyBpZiB0aGUgYmFnIGlzIG1hbnVhbGx5IGNyZWF0ZWQgd2l0aCB0aGUgY29uc3RydWN0b3IsIHlvdSBtdXN0IGNhbGwgYGF3YWl0IG9wZW4oKWAgb24gdGhlIGJhZ1xuICAvLyBnZW5lcmFsbHkgdGhpcyBpcyBjYWxsZWQgZm9yIHlvdSBpZiB5b3UncmUgdXNpbmcgYGNvbnN0IGJhZyA9IGF3YWl0IEJhZy5vcGVuKClgXG4gIGFzeW5jIG9wZW4oKSB7XG4gICAgdGhpcy5oZWFkZXIgPSBhd2FpdCB0aGlzLnJlYWRlci5yZWFkSGVhZGVyQXN5bmMoKTtcbiAgICBjb25zdCB7IGNvbm5lY3Rpb25Db3VudCwgY2h1bmtDb3VudCwgaW5kZXhQb3NpdGlvbiB9ID0gdGhpcy5oZWFkZXI7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlYWRlci5yZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9Bc3luYyhpbmRleFBvc2l0aW9uLCBjb25uZWN0aW9uQ291bnQsIGNodW5rQ291bnQpO1xuXG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IHt9O1xuXG4gICAgcmVzdWx0LmNvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbnNbY29ubmVjdGlvbi5jb25uXSA9IGNvbm5lY3Rpb247XG4gICAgfSk7XG5cbiAgICB0aGlzLmNodW5rSW5mb3MgPSByZXN1bHQuY2h1bmtJbmZvcztcblxuICAgIGlmIChjaHVua0NvdW50ID4gMCkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmNodW5rSW5mb3NbMF0uc3RhcnRUaW1lO1xuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5jaHVua0luZm9zW2NodW5rQ291bnQgLSAxXS5lbmRUaW1lO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlYWRNZXNzYWdlcyhvcHRzOiBSZWFkT3B0aW9ucywgY2FsbGJhY2s6IChtc2c6IFJlYWRSZXN1bHQ8YW55PikgPT4gdm9pZCkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gdGhpcy5jb25uZWN0aW9ucztcblxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IG9wdHMuc3RhcnRUaW1lIHx8IHsgc2VjOiAwLCBuc2VjOiAwIH07XG4gICAgY29uc3QgZW5kVGltZSA9IG9wdHMuZW5kVGltZSB8fCB7IHNlYzogTnVtYmVyLk1BWF9WQUxVRSwgbnNlYzogTnVtYmVyLk1BWF9WQUxVRSB9O1xuICAgIGNvbnN0IHRvcGljcyA9XG4gICAgICBvcHRzLnRvcGljcyB8fFxuICAgICAgT2JqZWN0LmtleXMoY29ubmVjdGlvbnMpLm1hcCgoaWQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbnNbaWRdLnRvcGljO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBmaWx0ZXJlZENvbm5lY3Rpb25zID0gT2JqZWN0LmtleXMoY29ubmVjdGlvbnMpXG4gICAgICAuZmlsdGVyKChpZDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiB0b3BpY3MuaW5kZXhPZihjb25uZWN0aW9uc1tpZF0udG9waWMpICE9PSAtMTtcbiAgICAgIH0pXG4gICAgICAubWFwKChpZCkgPT4gK2lkKTtcblxuICAgIGNvbnN0IHsgZGVjb21wcmVzcyA9IHt9IH0gPSBvcHRzO1xuXG4gICAgLy8gZmlsdGVyIGNodW5rcyB0byB0aG9zZSB3aGljaCBmYWxsIHdpdGhpbiB0aGUgdGltZSByYW5nZSB3ZSdyZSBhdHRlbXB0aW5nIHRvIHJlYWRcbiAgICBjb25zdCBjaHVua0luZm9zID0gdGhpcy5jaHVua0luZm9zLmZpbHRlcigoaW5mbykgPT4ge1xuICAgICAgcmV0dXJuIFRpbWVVdGlsLmNvbXBhcmUoaW5mby5zdGFydFRpbWUsIGVuZFRpbWUpIDw9IDAgJiYgVGltZVV0aWwuY29tcGFyZShzdGFydFRpbWUsIGluZm8uZW5kVGltZSkgPD0gMDtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlTXNnKG1zZzogTWVzc2FnZURhdGEsIGNodW5rT2Zmc2V0OiBudW1iZXIpOiBSZWFkUmVzdWx0PGFueT4ge1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IGNvbm5lY3Rpb25zW21zZy5jb25uXTtcbiAgICAgIGNvbnN0IHsgdG9waWMgfSA9IGNvbm5lY3Rpb247XG4gICAgICBjb25zdCB7IGRhdGEsIHRpbWU6IHRpbWVzdGFtcCB9ID0gbXNnO1xuICAgICAgbGV0IG1lc3NhZ2UgPSBudWxsO1xuICAgICAgaWYgKCFvcHRzLm5vUGFyc2UpIHtcbiAgICAgICAgLy8gbGF6aWx5IGNyZWF0ZSBhIHJlYWRlciBmb3IgdGhpcyBjb25uZWN0aW9uIGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgY29ubmVjdGlvbi5yZWFkZXIgPVxuICAgICAgICAgIGNvbm5lY3Rpb24ucmVhZGVyIHx8XG4gICAgICAgICAgbmV3IE1lc3NhZ2VSZWFkZXIocGFyc2VNZXNzYWdlRGVmaW5pdGlvbihjb25uZWN0aW9uLm1lc3NhZ2VEZWZpbml0aW9uKSwgeyBmcmVlemU6IG9wdHMuZnJlZXplIH0pO1xuICAgICAgICBtZXNzYWdlID0gY29ubmVjdGlvbi5yZWFkZXIucmVhZE1lc3NhZ2UoZGF0YSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFJlYWRSZXN1bHQodG9waWMsIG1lc3NhZ2UsIHRpbWVzdGFtcCwgZGF0YSwgY2h1bmtPZmZzZXQsIGNodW5rSW5mb3MubGVuZ3RoLCBvcHRzLmZyZWV6ZSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua0luZm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbmZvID0gY2h1bmtJbmZvc1tpXTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgdGhpcy5yZWFkZXIucmVhZENodW5rTWVzc2FnZXNBc3luYyhcbiAgICAgICAgaW5mbyxcbiAgICAgICAgZmlsdGVyZWRDb25uZWN0aW9ucyxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBlbmRUaW1lLFxuICAgICAgICBkZWNvbXByZXNzXG4gICAgICApO1xuICAgICAgbWVzc2FnZXMuZm9yRWFjaCgobXNnKSA9PiBjYWxsYmFjayhwYXJzZU1zZyhtc2csIGkpKSk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vLyByZWFkcyB0aHJvdWdoIGEgYnVmZmVyIGFuZCBleHRyYWN0cyB7IFtrZXk6IHN0cmluZ106IHZhbHVlOiBzdHJpbmcgfVxuLy8gcGFpcnMgLSB0aGUgYnVmZmVyIGlzIGV4cGVjdGVkIHRvIGhhdmUgbGVuZ3RoIHByZWZpeGVkIHV0Zjggc3RyaW5nc1xuLy8gd2l0aCBhICc9JyBzZXBhcmF0aW5nIHRoZSBrZXkgYW5kIHZhbHVlXG5jb25zdCBFUVVBTFNfQ0hBUkNPREUgPSBcIj1cIi5jaGFyQ29kZUF0KDApO1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RGaWVsZHMoYnVmZmVyOiBCdWZmZXIpIHtcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPCA0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkcyBhcmUgdHJ1bmNhdGVkLlwiKTtcbiAgfVxuXG4gIGxldCBpID0gMDtcbiAgY29uc3QgZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9ID0ge307XG5cbiAgd2hpbGUgKGkgPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLnJlYWRJbnQzMkxFKGkpO1xuICAgIGkgKz0gNDtcblxuICAgIGlmIChpICsgbGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkcyBhcmUgY29ycnVwdC5cIik7XG4gICAgfVxuXG4gICAgLy8gUGFzc2luZyBhIG51bWJlciBpbnRvIFwiaW5kZXhPZlwiIGV4cGxpY2l0bHkgdG8gYXZvaWQgQnVmZmVyIHBvbHlmaWxsXG4gICAgLy8gc2xvdyBwYXRoLiBTZWUgaXNzdWUgIzg3LlxuICAgIGNvbnN0IGZpZWxkID0gYnVmZmVyLnNsaWNlKGksIGkgKyBsZW5ndGgpO1xuICAgIGNvbnN0IGluZGV4ID0gZmllbGQuaW5kZXhPZihFUVVBTFNfQ0hBUkNPREUpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlciBmaWVsZCBpcyBtaXNzaW5nIGVxdWFscyBzaWduLlwiKTtcbiAgICB9XG5cbiAgICBmaWVsZHNbZmllbGQuc2xpY2UoMCwgaW5kZXgpLnRvU3RyaW5nKCldID0gZmllbGQuc2xpY2UoaW5kZXggKyAxKTtcbiAgICBpICs9IGxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBmaWVsZHM7XG59XG5cbi8vIHJlYWRzIGEgVGltZSBvYmplY3Qgb3V0IG9mIGEgYnVmZmVyIGF0IHRoZSBnaXZlbiBvZmZzZXRcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0VGltZShidWZmZXI6IEJ1ZmZlciwgb2Zmc2V0OiBudW1iZXIpOiBUaW1lIHtcbiAgY29uc3Qgc2VjID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQpO1xuICBjb25zdCBuc2VjID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQgKyA0KTtcbiAgcmV0dXJuIHsgc2VjLCBuc2VjIH07XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBleHRyYWN0RmllbGRzIH0gZnJvbSBcIi4vZmllbGRzXCI7XG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tIFwiLi9yZWNvcmRcIjtcblxuLy8gZ2l2ZW4gYSBidWZmZXIgcGFyc2VzIG91dCB0aGUgcmVjb3JkIHdpdGhpbiB0aGUgYnVmZmVyXG4vLyBiYXNlZCBvbiB0aGUgb3Bjb2RlIHR5cGUgYml0XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIZWFkZXI8VDogUmVjb3JkPihidWZmZXI6IEJ1ZmZlciwgY2xzOiBDbGFzczxUPiAmIHsgb3Bjb2RlOiBudW1iZXIgfSk6IFQge1xuICBjb25zdCBmaWVsZHMgPSBleHRyYWN0RmllbGRzKGJ1ZmZlcik7XG4gIGlmIChmaWVsZHMub3AgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlciBpcyBtaXNzaW5nICdvcCcgZmllbGQuXCIpO1xuICB9XG4gIGNvbnN0IG9wY29kZSA9IGZpZWxkcy5vcC5yZWFkVUludDgoMCk7XG4gIGlmIChvcGNvZGUgIT09IGNscy5vcGNvZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkICR7Y2xzLm5hbWV9ICgke2Nscy5vcGNvZGV9KSBidXQgZm91bmQgJHtvcGNvZGV9YCk7XG4gIH1cblxuICByZXR1cm4gbmV3IGNscyhmaWVsZHMpO1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0ICogYXMgVGltZVV0aWwgZnJvbSBcIi4vVGltZVV0aWxcIjtcblxuZXhwb3J0ICogZnJvbSBcIi4vYmFnXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9CYWdSZWFkZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL01lc3NhZ2VSZWFkZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL01lc3NhZ2VXcml0ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3BhcnNlTWVzc2FnZURlZmluaXRpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9maWVsZHNcIjtcbmV4cG9ydCB7IFRpbWVVdGlsIH07XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgSGVhcCBmcm9tIFwiaGVhcFwiO1xuXG5mdW5jdGlvbiBubWVyZ2U8VD4oa2V5OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyLCAuLi5pdGVyYWJsZXM6IEFycmF5PEl0ZXJhdG9yPFQ+Pikge1xuICBjb25zdCBoZWFwOiBIZWFwPHsgaTogbnVtYmVyLCB2YWx1ZTogVCB9PiA9IG5ldyBIZWFwKChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIGtleShhLnZhbHVlLCBiLnZhbHVlKTtcbiAgfSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0gaXRlcmFibGVzW2ldLm5leHQoKTtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGhlYXAucHVzaCh7IGksIHZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmV4dDogKCkgPT4ge1xuICAgICAgaWYgKGhlYXAuZW1wdHkoKSkge1xuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICB9XG4gICAgICBjb25zdCB7IGkgfSA9IGhlYXAuZnJvbnQoKTtcbiAgICAgIGNvbnN0IG5leHQgPSBpdGVyYWJsZXNbaV0ubmV4dCgpO1xuICAgICAgaWYgKG5leHQuZG9uZSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogaGVhcC5wb3AoKS52YWx1ZSwgZG9uZTogZmFsc2UgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHZhbHVlOiBoZWFwLnJlcGxhY2UoeyBpLCB2YWx1ZTogbmV4dC52YWx1ZSB9KS52YWx1ZSwgZG9uZTogZmFsc2UgfTtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBubWVyZ2U7XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IFJvc01zZ0ZpZWxkLCBSb3NNc2dEZWZpbml0aW9uIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLy8gU2V0IG9mIGJ1aWx0LWluIHJvcyB0eXBlcy4gU2VlIGh0dHA6Ly93aWtpLnJvcy5vcmcvbXNnI0ZpZWxkX1R5cGVzXG5leHBvcnQgY29uc3Qgcm9zUHJpbWl0aXZlVHlwZXM6IFNldDxzdHJpbmc+ID0gbmV3IFNldChbXG4gIFwic3RyaW5nXCIsXG4gIFwiYm9vbFwiLFxuICBcImludDhcIixcbiAgXCJ1aW50OFwiLFxuICBcImludDE2XCIsXG4gIFwidWludDE2XCIsXG4gIFwiaW50MzJcIixcbiAgXCJ1aW50MzJcIixcbiAgXCJmbG9hdDMyXCIsXG4gIFwiZmxvYXQ2NFwiLFxuICBcImludDY0XCIsXG4gIFwidWludDY0XCIsXG4gIFwidGltZVwiLFxuICBcImR1cmF0aW9uXCIsXG4gIFwianNvblwiLFxuXSk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVR5cGUodHlwZTogc3RyaW5nKSB7XG4gIC8vIE5vcm1hbGl6ZSBkZXByZWNhdGVkIGFsaWFzZXMuXG4gIGxldCBub3JtYWxpemVkVHlwZSA9IHR5cGU7XG4gIGlmICh0eXBlID09PSBcImNoYXJcIikge1xuICAgIG5vcm1hbGl6ZWRUeXBlID0gXCJ1aW50OFwiO1xuICB9XG4gIGlmICh0eXBlID09PSBcImJ5dGVcIikge1xuICAgIG5vcm1hbGl6ZWRUeXBlID0gXCJpbnQ4XCI7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZWRUeXBlO1xufVxuXG4vLyByZXByZXNlbnRzIGEgc2luZ2xlIGxpbmUgaW4gYSBtZXNzYWdlIGRlZmluaXRpb24gdHlwZVxuLy8gZS5nLiAnc3RyaW5nIG5hbWUnICdDdXN0b21UeXBlW10gZm9vJyAnc3RyaW5nWzNdIG5hbWVzJ1xuZnVuY3Rpb24gbmV3QXJyYXlEZWZpbml0aW9uKHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBhcnJheUxlbmd0aDogP251bWJlcik6IFJvc01zZ0ZpZWxkIHtcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBub3JtYWxpemVUeXBlKHR5cGUpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLFxuICAgIG5hbWUsXG4gICAgaXNBcnJheTogdHJ1ZSxcbiAgICBhcnJheUxlbmd0aDogYXJyYXlMZW5ndGggPT09IG51bGwgPyB1bmRlZmluZWQgOiBhcnJheUxlbmd0aCxcbiAgICBpc0NvbXBsZXg6ICFyb3NQcmltaXRpdmVUeXBlcy5oYXMobm9ybWFsaXplZFR5cGUpLFxuICB9O1xufVxuZnVuY3Rpb24gbmV3RGVmaW5pdGlvbih0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFJvc01zZ0ZpZWxkIHtcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBub3JtYWxpemVUeXBlKHR5cGUpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLFxuICAgIG5hbWUsXG4gICAgaXNBcnJheTogZmFsc2UsXG4gICAgaXNDb21wbGV4OiAhcm9zUHJpbWl0aXZlVHlwZXMuaGFzKG5vcm1hbGl6ZWRUeXBlKSxcbiAgfTtcbn1cblxuY29uc3QgYnVpbGRUeXBlID0gKGxpbmVzOiB7IGlzSnNvbjogYm9vbGVhbiwgbGluZTogc3RyaW5nIH1bXSk6IFJvc01zZ0RlZmluaXRpb24gPT4ge1xuICBjb25zdCBkZWZpbml0aW9uczogUm9zTXNnRmllbGRbXSA9IFtdO1xuICBsZXQgY29tcGxleFR5cGVOYW1lOiA/c3RyaW5nO1xuICBsaW5lcy5mb3JFYWNoKCh7IGlzSnNvbiwgbGluZSB9KSA9PiB7XG4gICAgLy8gcmVtb3ZlIGNvbW1lbnRzIGFuZCBleHRyYSB3aGl0ZXNwYWNlIGZyb20gZWFjaCBsaW5lXG4gICAgY29uc3Qgc3BsaXRzID0gbGluZVxuICAgICAgLnJlcGxhY2UoLyMuKi9naSwgXCJcIilcbiAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgIC5maWx0ZXIoKHdvcmQpID0+IHdvcmQpO1xuICAgIGlmICghc3BsaXRzWzFdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNvbnN1bWUgY29tbWVudHNcbiAgICBjb25zdCB0eXBlID0gc3BsaXRzWzBdLnRyaW0oKTtcbiAgICBjb25zdCBuYW1lID0gc3BsaXRzWzFdLnRyaW0oKTtcbiAgICBpZiAodHlwZSA9PT0gXCJNU0c6XCIpIHtcbiAgICAgIGNvbXBsZXhUeXBlTmFtZSA9IG5hbWU7XG4gICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YoXCI9XCIpID4gLTEgfHwgc3BsaXRzLmluZGV4T2YoXCI9XCIpID4gLTEpIHtcbiAgICAgIC8vIGNvbnN0YW50IHR5cGUgcGFyc2luZ1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IGxpbmUubWF0Y2goLyhcXFMrKVxccyo9XFxzKiguKilcXHMqLyk7XG4gICAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFsZm9ybWVkIGxpbmU6IFwiICsgbGluZSk7XG4gICAgICB9XG4gICAgICBsZXQgdmFsdWU6IGFueSA9IG1hdGNoZXNbMl07XG4gICAgICBpZiAodHlwZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAvLyBoYW5kbGUgc3BlY2lhbCBjYXNlIG9mIHB5dGhvbiBib29sIHZhbHVlc1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1RydWUvZ2ksIFwidHJ1ZVwiKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9GYWxzZS9naSwgXCJmYWxzZVwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFxzKiMuKi9nLCBcIlwiKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm9yIGluIHRoaXMgY29uc3RhbnQgZGVmaW5pdGlvbjogJHtsaW5lfWApO1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSBcImJvb2xcIikge1xuICAgICAgICAgIHZhbHVlID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICgodHlwZS5pbmNsdWRlcyhcImludFwiKSAmJiB2YWx1ZSA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB8fCB2YWx1ZSA8IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihgRm91bmQgaW50ZWdlciBjb25zdGFudCBvdXRzaWRlIHNhZmUgaW50ZWdlciByYW5nZTogJHtsaW5lfWApO1xuICAgICAgfVxuICAgICAgZGVmaW5pdGlvbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IG5vcm1hbGl6ZVR5cGUodHlwZSksXG4gICAgICAgIG5hbWU6IG1hdGNoZXNbMV0sXG4gICAgICAgIGlzQ29uc3RhbnQ6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlLmluZGV4T2YoXCJdXCIpID09PSB0eXBlLmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIGFycmF5IHR5cGUgcGFyc2luZ1xuICAgICAgY29uc3QgdHlwZVNwbGl0cyA9IHR5cGUuc3BsaXQoXCJbXCIpO1xuICAgICAgY29uc3QgYmFzZVR5cGUgPSB0eXBlU3BsaXRzWzBdO1xuICAgICAgY29uc3QgbGVuID0gdHlwZVNwbGl0c1sxXS5yZXBsYWNlKFwiXVwiLCBcIlwiKTtcbiAgICAgIGRlZmluaXRpb25zLnB1c2gobmV3QXJyYXlEZWZpbml0aW9uKGJhc2VUeXBlLCBuYW1lLCBsZW4gPyBwYXJzZUludChsZW4sIDEwKSA6IHVuZGVmaW5lZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKG5ld0RlZmluaXRpb24oaXNKc29uID8gXCJqc29uXCIgOiB0eXBlLCBuYW1lKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHsgbmFtZTogY29tcGxleFR5cGVOYW1lLCBkZWZpbml0aW9ucyB9O1xufTtcblxuY29uc3QgZmluZFR5cGVCeU5hbWUgPSAodHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSwgbmFtZTogc3RyaW5nKTogUm9zTXNnRGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IG1hdGNoZXMgPSB0eXBlcy5maWx0ZXIoKHR5cGUpID0+IHtcbiAgICBjb25zdCB0eXBlTmFtZSA9IHR5cGUubmFtZSB8fCBcIlwiO1xuICAgIC8vIGlmIHRoZSBzZWFyY2ggaXMgZW1wdHksIHJldHVybiB1bm5hbWVkIHR5cGVzXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gIXR5cGVOYW1lO1xuICAgIH1cbiAgICAvLyByZXR1cm4gaWYgdGhlIHNlYXJjaCBpcyBpbiB0aGUgdHlwZSBuYW1lXG4gICAgLy8gb3IgbWF0Y2hlcyBleGFjdGx5IGlmIGEgZnVsbHktcXVhbGlmaWVkIG5hbWUgbWF0Y2ggaXMgcGFzc2VkIHRvIHVzXG4gICAgY29uc3QgbmFtZUVuZCA9IG5hbWUuaW5kZXhPZihcIi9cIikgPiAtMSA/IG5hbWUgOiBgLyR7bmFtZX1gO1xuICAgIHJldHVybiB0eXBlTmFtZS5lbmRzV2l0aChuYW1lRW5kKTtcbiAgfSk7XG4gIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgMSB0b3AgbGV2ZWwgdHlwZSBkZWZpbml0aW9uIGZvciAnJHtuYW1lfScgYnV0IGZvdW5kICR7bWF0Y2hlcy5sZW5ndGh9YCk7XG4gIH1cbiAgcmV0dXJuIG1hdGNoZXNbMF07XG59O1xuXG4vLyBHaXZlbiBhIHJhdyBtZXNzYWdlIGRlZmluaXRpb24gc3RyaW5nLCBwYXJzZSBpdCBpbnRvIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbi5cbi8vIEV4YW1wbGUgcmV0dXJuIHZhbHVlOlxuLy8gW3tcbi8vICAgbmFtZTogdW5kZWZpbmVkLFxuLy8gICBkZWZpbml0aW9uczogW1xuLy8gICAgIHtcbi8vICAgICAgIGFycmF5TGVuZ3RoOiB1bmRlZmluZWQsXG4vLyAgICAgICBpc0FycmF5OiBmYWxzZSxcbi8vICAgICAgIGlzQ29tcGxleDogZmFsc2UsXG4vLyAgICAgICBuYW1lOiBcIm5hbWVcIixcbi8vICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4vLyAgICAgfSwgLi4uXG4vLyAgIF0sXG4vLyB9LCAuLi4gXVxuLy9cbi8vIFNlZSB1bml0IHRlc3RzIGZvciBtb3JlIGV4YW1wbGVzLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTWVzc2FnZURlZmluaXRpb24obWVzc2FnZURlZmluaXRpb246IHN0cmluZykge1xuICAvLyByZWFkIGFsbCB0aGUgbGluZXMgYW5kIHJlbW92ZSBlbXB0aWVzXG4gIGNvbnN0IGFsbExpbmVzID0gbWVzc2FnZURlZmluaXRpb25cbiAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAubWFwKChsaW5lKSA9PiBsaW5lLnRyaW0oKSlcbiAgICAuZmlsdGVyKChsaW5lKSA9PiBsaW5lKTtcblxuICBsZXQgZGVmaW5pdGlvbkxpbmVzOiB7IGlzSnNvbjogYm9vbGVhbiwgbGluZTogc3RyaW5nIH1bXSA9IFtdO1xuICBjb25zdCB0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdID0gW107XG4gIGxldCBuZXh0RGVmaW5pdGlvbklzSnNvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBncm91cCBsaW5lcyBpbnRvIGluZGl2aWR1YWwgZGVmaW5pdGlvbnNcbiAgYWxsTGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgIC8vIGlnbm9yZSBjb21tZW50IGxpbmVzIHVubGVzcyB0aGV5IHN0YXJ0IHdpdGggI3ByYWdtYSByb3NiYWdfcGFyc2VfanNvblxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCIjXCIpKSB7XG4gICAgICBpZiAobGluZS5zdGFydHNXaXRoKFwiI3ByYWdtYSByb3NiYWdfcGFyc2VfanNvblwiKSkge1xuICAgICAgICBuZXh0RGVmaW5pdGlvbklzSnNvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZGVmaW5pdGlvbnMgYXJlIHNwbGl0IGJ5IGVxdWFsIHNpZ25zXG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aChcIj09XCIpKSB7XG4gICAgICBuZXh0RGVmaW5pdGlvbklzSnNvbiA9IGZhbHNlO1xuICAgICAgdHlwZXMucHVzaChidWlsZFR5cGUoZGVmaW5pdGlvbkxpbmVzKSk7XG4gICAgICBkZWZpbml0aW9uTGluZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5pdGlvbkxpbmVzLnB1c2goeyBpc0pzb246IG5leHREZWZpbml0aW9uSXNKc29uLCBsaW5lIH0pO1xuICAgICAgbmV4dERlZmluaXRpb25Jc0pzb24gPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICB0eXBlcy5wdXNoKGJ1aWxkVHlwZShkZWZpbml0aW9uTGluZXMpKTtcblxuICAvLyBGaXggdXAgY29tcGxleCB0eXBlIG5hbWVzXG4gIHR5cGVzLmZvckVhY2goKHsgZGVmaW5pdGlvbnMgfSkgPT4ge1xuICAgIGRlZmluaXRpb25zLmZvckVhY2goKGRlZmluaXRpb24pID0+IHtcbiAgICAgIGlmIChkZWZpbml0aW9uLmlzQ29tcGxleCkge1xuICAgICAgICBjb25zdCBmb3VuZE5hbWUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmaW5pdGlvbi50eXBlKS5uYW1lO1xuICAgICAgICBpZiAoZm91bmROYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgdHlwZSBkZWZpbml0aW9uIGZvciAke2RlZmluaXRpb24udHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZpbml0aW9uLnR5cGUgPSBmb3VuZE5hbWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiB0eXBlcztcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCBpbnQ1MyBmcm9tIFwiaW50NTNcIjtcblxuaW1wb3J0IHsgZXh0cmFjdEZpZWxkcywgZXh0cmFjdFRpbWUgfSBmcm9tIFwiLi9maWVsZHNcIjtcbmltcG9ydCB7IE1lc3NhZ2VSZWFkZXIgfSBmcm9tIFwiLi9NZXNzYWdlUmVhZGVyXCI7XG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCByZWFkVUludDY0TEUgPSAoYnVmZmVyOiBCdWZmZXIpID0+IHtcbiAgcmV0dXJuIGludDUzLnJlYWRVSW50NjRMRShidWZmZXIsIDApO1xufTtcblxuZXhwb3J0IGNsYXNzIFJlY29yZCB7XG4gIG9mZnNldDogbnVtYmVyO1xuICBkYXRhT2Zmc2V0OiBudW1iZXI7XG4gIGVuZDogbnVtYmVyO1xuICBsZW5ndGg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihfZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7fVxuXG4gIHBhcnNlRGF0YShfYnVmZmVyOiBCdWZmZXIpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBCYWdIZWFkZXIgZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gMztcbiAgaW5kZXhQb3NpdGlvbjogbnVtYmVyO1xuICBjb25uZWN0aW9uQ291bnQ6IG51bWJlcjtcbiAgY2h1bmtDb3VudDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy5pbmRleFBvc2l0aW9uID0gcmVhZFVJbnQ2NExFKGZpZWxkcy5pbmRleF9wb3MpO1xuICAgIHRoaXMuY29ubmVjdGlvbkNvdW50ID0gZmllbGRzLmNvbm5fY291bnQucmVhZEludDMyTEUoMCk7XG4gICAgdGhpcy5jaHVua0NvdW50ID0gZmllbGRzLmNodW5rX2NvdW50LnJlYWRJbnQzMkxFKDApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDaHVuayBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSA1O1xuICBjb21wcmVzc2lvbjogc3RyaW5nO1xuICBzaXplOiBudW1iZXI7XG4gIGRhdGE6IEJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMuY29tcHJlc3Npb24gPSBmaWVsZHMuY29tcHJlc3Npb24udG9TdHJpbmcoKTtcbiAgICB0aGlzLnNpemUgPSBmaWVsZHMuc2l6ZS5yZWFkVUludDMyTEUoMCk7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICB0aGlzLmRhdGEgPSBidWZmZXI7XG4gIH1cbn1cblxuY29uc3QgZ2V0RmllbGQgPSAoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9LCBrZXk6IHN0cmluZykgPT4ge1xuICBpZiAoZmllbGRzW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ29ubmVjdGlvbiBoZWFkZXIgaXMgbWlzc2luZyAke2tleX0uYCk7XG4gIH1cbiAgcmV0dXJuIGZpZWxkc1trZXldLnRvU3RyaW5nKCk7XG59O1xuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbiBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSA3O1xuICBjb25uOiBudW1iZXI7XG4gIHRvcGljOiBzdHJpbmc7XG4gIHR5cGU6ID9zdHJpbmc7XG4gIG1kNXN1bTogP3N0cmluZztcbiAgbWVzc2FnZURlZmluaXRpb246IHN0cmluZztcbiAgY2FsbGVyaWQ6ID9zdHJpbmc7XG4gIGxhdGNoaW5nOiA/Ym9vbGVhbjtcbiAgcmVhZGVyOiA/TWVzc2FnZVJlYWRlcjtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMuY29ubiA9IGZpZWxkcy5jb25uLnJlYWRVSW50MzJMRSgwKTtcbiAgICB0aGlzLnRvcGljID0gZmllbGRzLnRvcGljLnRvU3RyaW5nKCk7XG4gICAgdGhpcy50eXBlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubWQ1c3VtID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubWVzc2FnZURlZmluaXRpb24gPSBcIlwiO1xuICB9XG5cbiAgcGFyc2VEYXRhKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgY29uc3QgZmllbGRzID0gZXh0cmFjdEZpZWxkcyhidWZmZXIpO1xuICAgIHRoaXMudHlwZSA9IGdldEZpZWxkKGZpZWxkcywgXCJ0eXBlXCIpO1xuICAgIHRoaXMubWQ1c3VtID0gZ2V0RmllbGQoZmllbGRzLCBcIm1kNXN1bVwiKTtcbiAgICB0aGlzLm1lc3NhZ2VEZWZpbml0aW9uID0gZ2V0RmllbGQoZmllbGRzLCBcIm1lc3NhZ2VfZGVmaW5pdGlvblwiKTtcbiAgICBpZiAoZmllbGRzLmNhbGxlcmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY2FsbGVyaWQgPSBmaWVsZHMuY2FsbGVyaWQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkcy5sYXRjaGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmxhdGNoaW5nID0gZmllbGRzLmxhdGNoaW5nLnRvU3RyaW5nKCkgPT09IFwiMVwiO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZURhdGEgZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gMjtcbiAgY29ubjogbnVtYmVyO1xuICB0aW1lOiBUaW1lO1xuICBkYXRhOiBCdWZmZXI7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLmNvbm4gPSBmaWVsZHMuY29ubi5yZWFkVUludDMyTEUoMCk7XG4gICAgdGhpcy50aW1lID0gZXh0cmFjdFRpbWUoZmllbGRzLnRpbWUsIDApO1xuICB9XG5cbiAgcGFyc2VEYXRhKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5kYXRhID0gYnVmZmVyO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbmRleERhdGEgZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gNDtcbiAgdmVyOiBudW1iZXI7XG4gIGNvbm46IG51bWJlcjtcbiAgY291bnQ6IG51bWJlcjtcbiAgaW5kaWNlczogQXJyYXk8eyB0aW1lOiBUaW1lLCBvZmZzZXQ6IG51bWJlciB9PjtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMudmVyID0gZmllbGRzLnZlci5yZWFkVUludDMyTEUoMCk7XG4gICAgdGhpcy5jb25uID0gZmllbGRzLmNvbm4ucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMuY291bnQgPSBmaWVsZHMuY291bnQucmVhZFVJbnQzMkxFKDApO1xuICB9XG5cbiAgcGFyc2VEYXRhKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5pbmRpY2VzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMuaW5kaWNlcy5wdXNoKHtcbiAgICAgICAgdGltZTogZXh0cmFjdFRpbWUoYnVmZmVyLCBpICogMTIpLFxuICAgICAgICBvZmZzZXQ6IGJ1ZmZlci5yZWFkVUludDMyTEUoaSAqIDEyICsgOCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENodW5rSW5mbyBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSA2O1xuICB2ZXI6IG51bWJlcjtcbiAgY2h1bmtQb3NpdGlvbjogbnVtYmVyO1xuICBzdGFydFRpbWU6IFRpbWU7XG4gIGVuZFRpbWU6IFRpbWU7XG4gIGNvdW50OiBudW1iZXI7XG4gIGNvbm5lY3Rpb25zOiBBcnJheTx7IGNvbm46IG51bWJlciwgY291bnQ6IG51bWJlciB9PjtcbiAgbmV4dENodW5rOiA/Q2h1bmtJbmZvO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy52ZXIgPSBmaWVsZHMudmVyLnJlYWRVSW50MzJMRSgwKTtcbiAgICB0aGlzLmNodW5rUG9zaXRpb24gPSByZWFkVUludDY0TEUoZmllbGRzLmNodW5rX3Bvcyk7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBleHRyYWN0VGltZShmaWVsZHMuc3RhcnRfdGltZSwgMCk7XG4gICAgdGhpcy5lbmRUaW1lID0gZXh0cmFjdFRpbWUoZmllbGRzLmVuZF90aW1lLCAwKTtcbiAgICB0aGlzLmNvdW50ID0gZmllbGRzLmNvdW50LnJlYWRVSW50MzJMRSgwKTtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuY29ubmVjdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY291bnQ7IGkrKykge1xuICAgICAgdGhpcy5jb25uZWN0aW9ucy5wdXNoKHtcbiAgICAgICAgY29ubjogYnVmZmVyLnJlYWRVSW50MzJMRShpICogOCksXG4gICAgICAgIGNvdW50OiBidWZmZXIucmVhZFVJbnQzMkxFKGkgKiA4ICsgNCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCJidWZmZXJcIjtcbmltcG9ydCB7XG4gIE1lc3NhZ2VSZWFkZXIsXG4gIE1lc3NhZ2VXcml0ZXIsXG4gIHBhcnNlTWVzc2FnZURlZmluaXRpb24sXG4gIHJvc1ByaW1pdGl2ZVR5cGVzLFxuICBUaW1lVXRpbCxcbiAgZXh0cmFjdEZpZWxkcyxcbiAgZXh0cmFjdFRpbWUsXG59IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHsgdHlwZSBDYWxsYmFjayB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IEJhZyBmcm9tIFwiLi4vYmFnXCI7XG5pbXBvcnQgQmFnUmVhZGVyIGZyb20gXCIuLi9CYWdSZWFkZXJcIjtcblxuLy8gYnJvd3NlciByZWFkZXIgZm9yIEJsb2J8RmlsZSBvYmplY3RzXG5leHBvcnQgY2xhc3MgUmVhZGVyIHtcbiAgX2Jsb2I6IEJsb2I7XG4gIF9zaXplOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYmxvYjogQmxvYikge1xuICAgIHRoaXMuX2Jsb2IgPSBibG9iO1xuICAgIHRoaXMuX3NpemUgPSBibG9iLnNpemU7XG4gIH1cblxuICAvLyByZWFkIGxlbmd0aCAoYnl0ZXMpIHN0YXJ0aW5nIGZyb20gb2Zmc2V0IChieXRlcylcbiAgLy8gY2FsbGJhY2soZXJyLCBidWZmZXIpXG4gIHJlYWQob2Zmc2V0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBjYjogQ2FsbGJhY2s8QnVmZmVyPikge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gJEZsb3dGaXhNZSAtIGZsb3cgZG9lc24ndCBhbGxvdyBudWxsXG4gICAgICByZWFkZXIub25sb2FkID0gbnVsbDtcbiAgICAgIC8vICRGbG93Rml4TWUgLSBmbG93IGRvZXNuJ3QgYWxsb3cgbnVsbFxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgc2V0SW1tZWRpYXRlKGNiLCBudWxsLCBCdWZmZXIuZnJvbShyZWFkZXIucmVzdWx0KSk7XG4gICAgfTtcbiAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gJEZsb3dGaXhNZSAtIGZsb3cgZG9lc24ndCBhbGxvdyBudWxsXG4gICAgICByZWFkZXIub25sb2FkID0gbnVsbDtcbiAgICAgIC8vICRGbG93Rml4TWUgLSBmbG93IGRvZXNuJ3QgYWxsb3cgbnVsbFxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBudWxsO1xuICAgICAgc2V0SW1tZWRpYXRlKGNiLCBuZXcgRXJyb3IocmVhZGVyLmVycm9yKSk7XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIodGhpcy5fYmxvYi5zbGljZShvZmZzZXQsIG9mZnNldCArIGxlbmd0aCkpO1xuICB9XG5cbiAgLy8gcmV0dXJuIHRoZSBzaXplIG9mIHRoZSBmaWxlXG4gIHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cbn1cblxuY29uc3Qgb3BlbiA9IGFzeW5jIChmaWxlOiBGaWxlIHwgc3RyaW5nKSA9PiB7XG4gIGlmICghKGZpbGUgaW5zdGFuY2VvZiBCbG9iKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiRXhwZWN0ZWQgZmlsZSB0byBiZSBhIEZpbGUgb3IgQmxvYi4gTWFrZSBzdXJlIHlvdSBhcmUgY29ycmVjdGx5IGltcG9ydGluZyB0aGUgbm9kZSBvciB3ZWIgdmVyc2lvbiBvZiBCYWcuXCJcbiAgICApO1xuICB9XG4gIGNvbnN0IGJhZyA9IG5ldyBCYWcobmV3IEJhZ1JlYWRlcihuZXcgUmVhZGVyKGZpbGUpKSk7XG4gIGF3YWl0IGJhZy5vcGVuKCk7XG4gIHJldHVybiBiYWc7XG59O1xuQmFnLm9wZW4gPSBvcGVuO1xuXG5leHBvcnQgKiBmcm9tIFwiLi4vdHlwZXNcIjtcbmV4cG9ydCB7XG4gIFRpbWVVdGlsLFxuICBCYWdSZWFkZXIsXG4gIE1lc3NhZ2VSZWFkZXIsXG4gIE1lc3NhZ2VXcml0ZXIsXG4gIG9wZW4sXG4gIHBhcnNlTWVzc2FnZURlZmluaXRpb24sXG4gIHJvc1ByaW1pdGl2ZVR5cGVzLFxuICBleHRyYWN0RmllbGRzLFxuICBleHRyYWN0VGltZSxcbn07XG5leHBvcnQgZGVmYXVsdCBCYWc7XG4iXSwic291cmNlUm9vdCI6IiJ9
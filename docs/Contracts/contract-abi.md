# Contract ABI

Contract ABI is a representation of a StarkNet contract's interface. It is formatted as a JSON and describes the functions, structs and events which are defined in the contract.

You can get the contract's ABI by compiling:

```bash
starknet-compile contract.cairo \
    --output contract_compiled.json \
    --abi contract_abi.json
```

The following is an example contract ABI:

```json
[
  {
    "members": [
      {
        "name": "x",
        "offset": 0,
        "type": "felt"
      },
      {
        "name": "y",
        "offset": 1,
        "type": "felt"
      }
    ],
    "name": "Point",
    "size": 2,
    "type": "struct"
  },
  {
    "members": [
      {
        "name": "x",
        "offset": 0,
        "type": "felt"
      },
      {
        "name": "p",
        "offset": 1,
        "type": "Point"
      }
    ],
    "name": "Test",
    "size": 3,
    "type": "struct"
  },
  {
    "data": [
      {
        "name": "a",
        "type": "felt"
      },
      {
        "name": "b",
        "type": "felt"
      }
    ],
    "keys": [],
    "name": "status_update",
    "type": "event"
  },
  {
    "inputs": [
      {
        "name": "a_len",
        "type": "felt"
      },
      {
        "name": "a",
        "type": "felt*"
      }
    ],
    "name": "constructor",
    "outputs": [],
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "name": "user",
        "type": "felt"
      }
    ],
    "name": "extend_range",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "points_len",
        "type": "felt"
      },
      {
        "name": "points",
        "type": "(felt, Point, Point)*"
      }
    ],
    "name": "input_arrays",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "nested_len",
        "type": "felt"
      },
      {
        "name": "nested",
        "type": "Test*"
      }
    ],
    "name": "input_nested_arrays",
    "outputs": [
      {
        "name": "res",
        "type": "felt"
      }
    ],
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "array_len",
        "type": "felt"
      },
      {
        "name": "array",
        "type": "felt*"
      }
    ],
    "name": "output_arrays",
    "outputs": [
      {
        "name": "array_len",
        "type": "felt"
      },
      {
        "name": "array",
        "type": "felt*"
      }
    ],
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "points",
        "type": "(Point, Point)"
      }
    ],
    "name": "input_output_struct",
    "outputs": [
      {
        "name": "res",
        "type": "Point"
      }
    ],
    "type": "function"
  }
]
```

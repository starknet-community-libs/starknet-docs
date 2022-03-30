# Fee Mechanism

In this section, we will review StarkNet 0.8.0 fee mechanism.

:::info
We will work closely with the developer community to tweak and develop the fee mechanism as StarkNet evolves.
In order to allow backward compatibility, fees will be optional until 0.9.0.
:::

## Introduction

Users can specify the maximum fee that they are willing to pay for a transaction via the `max_fee` [field](../Blocks/transactions#max_fee).

The only limitation on the sequencer (enforced by the StarkNet OS) is that the actual fee charged is bounded by `max_fee`, but for now, StarkWare’s sequencer will only charge the fee required to cover the proof cost (potentially less than the max fee).

Presently, the sequencer only takes into account L1 costs involving proof submission. There are two components affecting the L1 footprint of a transaction:

- [computational complexity](./fee-mechanism#computation): the heavier the transaction, the larger its portion in the proof verification cost
- [on chain data](./fee-mechanism#on-chain-data): L1 calldata cost originating from [data availability](../DataAvailabilty/on-chain-data) or L2→L1 messages.

## Fee Units

The fee is denominated in ETH (this may change in future versions). Each transaction is associated with a gas estimate (explained below), and combining this with the gas price yields the estimated fee.

## How much fee is charged? High-level overview

### Computation

Let’s analyze the correct metric for measuring transaction complexity. For simplicity, we will ignore Cairo’s builtins for the sake of the explanation, then see later how to refer to them.

#### Without builtins

Recall that a Cairo program execution yields an execution trace. When proving a StarkNet block, we aggregate all the transactions appearing in that block to the execution trace.

StarkNet’s prover can provide proofs for execution traces, up to some maximal length $L$ (Derived from the specs of the proving machine and the desired proof latency). Tracking the execution trace length associated with each transaction is simple.
Each assertion over field elements (such as verifying addition/multiplication over the field) requires the same, constant number of trace cells (this is where our “no-builtins” assumption kicks in! Obviously Pedersen occupies more trace cells than addition). Therefore, in a world without builtins, the fee of the transaction is correlated with $\text{TraceCells}[tx]/L$.

#### Adding builtins

The Cairo execution trace is separated – and each builtin has its own slot. We have to mind this slot allocation when determining the fee.

Let’s go over a concrete example first. For example, imagine the following trace that the prover will occupy:

| (up to) 500,000,000 Cairo Steps | (up to) 20,000,000 Pedersen hashes | (up to) 4,000,000 signature verifications | (up to) 10,000,000 range checks |
| ------------------------------- | ---------------------------------- | ----------------------------------------- | ------------------------------- |

The proof will be closed and sent to L1 when any of these components becomes full. It’s important to realize that the division to builtins must be predetermined! We can’t decide on the fly to have proof with 20,000,001 Pedersen and nothing else.

Suppose, for example, that a transaction uses 10,000 Cairo steps and 500 Pedersen hashes. We can squeeze at most 40,000 such transactions into our hypothetical trace (20,000,000/500). Therefore, its gas price will be correlated with 1/40,000 the cost of submitting proof. Notice we completely ignored the number of Cairo steps this transaction performance estimation, as it is not the limiting factor (since 500,000,000/10,000 > 20,000,000/500). With this example in mind, we can now formulate the exact fee associated with L2 computation.

#### General Case

For each transaction, the sequencer calculates a vector `CairoResourceUsage` holding:

- Number of Cairo steps
- Number of applications of each Cairo builtin (e.g., five range checks and two Pedersens)

The sequencer crosses this information with the `CairoResourceFeeWeights` vector. For each resource type (step or a specific builtin application), `CairoResourceFeeWeights` has an entry that specifies the relative gas cost of that component in the proof. Going back to the above example, if the cost of submitting a proof with 20,000,000 Pedersen hashes is roughly 5m gas, then the weight of the Pedersen builtin is 0.25 gas per application (5,000,000/20,000,000). The sequencer has a pre-defined weights vector, in accordance with the proof parameters.

The sequencer will charge only according to the limiting factor! Therefore the fee is correlated with:

$$
\max_k[\text{CairoResourceUsage}_k \cdot \text{CairoResourceFeeWeights}_k]
$$

Where $k$ here enumerates the Cairo resource components, namely: number of steps and built-ins used.

The weights in 0.8.0 are:

| Cairo step    | ECDSA                | range check         | bitwise              | Pedersen            |
| ------------- | -------------------- | ------------------- | -------------------- | ------------------- |
| 0.05 gas/step | 25.6 gas/application | 0.4 gas/application | 12.8 gas/application | 0.4 gas/application |

### On Chain Data

The on-chain data associated with a transaction is composed of two parts

- storage updates
- l2→l1 messages

#### Storage Updates

Whenever a transaction updates a key at the storage of some contract, the following 32 byte words reach L1 as calldata:

- contract_address
- number of updated keys in that contract
- key to update
- new value

For more information, see the exact [format](../DataAvailabilty/on-chain-data#format).

Let $c_w$ denote the L1 calldata cost of a 32 byte word, measured in gas. With 16 gas per byte we have $c_w=16\cdot 32=512$.
Consequently, the assosiated storage update fee for a transaction updating $n$ unique contracts and $m$ unique keys is:

$$
\text{gas\_price}\cdot c_w\cdot\underbrace{(2n+2m)}_{\text{number of words}}
$$

:::tip

Note that there are many possible improvements to the above pessimistic estimation that will be gradually presented in future versions of StarkNet. For example, if different transactions within the same block update the same storage cell, there is no need to charge both of them (only the latest value reaches L1). In the future, StarkNet may include a refund mechanism for such cases.

:::

#### L2→L1 Messages

When a transaction which raises the `sent_message_to_l1` syscall is included in a state update, the following data reaches L1:

- l2 sender address
- l1 destination address
- payload size
- payload (list of field elements)

Consequently, the fee associated with a single l2→l1 message is:

$$
\text{gas\_price}\cdot c_w\cdot(3+\text{payload\_size})
$$

### Overall Fee

The fee for a transaction with:

- Cairo usage represented by the vector $v$ (the entries of $v$ correspond to the number of steps and number of applications per builtin)
- $n$ unique contract updates
- $m$ unique key updates
- $t$ messages with payload sizes $q_1,...,q_t$

is given by:

$$
F = \text{gas\_price}\cdot\left(\max_k v_k w_k + 2c_w(n+m) + 3t + \sum\limits_{i=1}^t q_i\right)
$$

where $w$ is the weights vector discussed above and $c_w$ is the calldata cost (in gas) per 32 byte word.

## When is the fee charged?

The fee is charged atomically with the transaction execution on L2. The StarkNet OS injects a transfer of the fee-related ERC-20, with an amount equal to the fee paid, sender equals to the transaction submitter, and the sequencer as a receiver.

Note that fees are not yet enforced at the time of writing (that is, the sequencer may include a transaction without the “max fee” field).

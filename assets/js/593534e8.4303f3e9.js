"use strict";(self.webpackChunkstarknet_docs=self.webpackChunkstarknet_docs||[]).push([[783],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=s(n),h=r,f=p["".concat(l,".").concat(h)]||p[h]||d[h]||c;return n?a.createElement(f,o(o({ref:t},u),{},{components:n})):a.createElement(f,o({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,o=new Array(c);o[0]=p;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var s=2;s<c;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6859:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return u},default:function(){return p}});var a=n(7462),r=n(3366),c=(n(7294),n(3905)),o=["components"],i={},l="Transaction Lifecycle",s={unversionedId:"Blocks/transaction-life-cycle",id:"Blocks/transaction-life-cycle",title:"Transaction Lifecycle",description:"The following are the possible statuses of a transaction from the moment it's sent by the user to the moment it's validated by L1.",source:"@site/docs/Blocks/transaction-life-cycle.md",sourceDirName:"Blocks",slug:"/Blocks/transaction-life-cycle",permalink:"/docs/Blocks/transaction-life-cycle",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/Blocks/transaction-life-cycle.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Block structure",permalink:"/docs/Blocks/header"},next:{title:"Transaction structure",permalink:"/docs/Blocks/transactions"}},u=[{value:"Transaction status",id:"transaction-status",children:[{value:"NOT_RECEIVED",id:"not_received",children:[],level:3},{value:"RECEIVED",id:"received",children:[],level:3},{value:"PENDING",id:"pending",children:[],level:3},{value:"REJECTED",id:"rejected",children:[],level:3},{value:"ACCEPTED_ON_L2",id:"accepted_on_l2",children:[],level:3},{value:"ACCEPTED_ON_L1",id:"accepted_on_l1",children:[],level:3}],level:2},{value:"The pending block",id:"the-pending-block",children:[],level:2},{value:"Transaction receipt",id:"transaction-receipt",children:[],level:2}],d={toc:u};function p(e){var t=e.components,n=(0,r.Z)(e,o);return(0,c.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"transaction-lifecycle"},"Transaction Lifecycle"),(0,c.kt)("p",null,"The following are the possible statuses of a transaction from the moment it's sent by the user to the moment it's validated by L1."),(0,c.kt)("h2",{id:"transaction-status"},"Transaction status"),(0,c.kt)("h3",{id:"not_received"},"NOT_RECEIVED"),(0,c.kt)("p",null,"Transaction is not yet known to the sequencer"),(0,c.kt)("h3",{id:"received"},"RECEIVED"),(0,c.kt)("p",null,"Transaction was received by the sequencer.\nTransaction will now either execute successfully or be rejected."),(0,c.kt)("h3",{id:"pending"},"PENDING"),(0,c.kt)("p",null,"Transaction executed successfully and entered the ",(0,c.kt)("a",{parentName:"p",href:"/docs/Blocks/transaction-life-cycle#the-pending-block"},"pending block"),"."),(0,c.kt)("h3",{id:"rejected"},"REJECTED"),(0,c.kt)("p",null,"Transaction executed unsuccessfully and thus was skipped (applies both to a pending and an actual created block).\nPossible reasons for transaction rejection:"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"An assertion failed during the execution of the transaction (in StarkNet, unlike in Ethereum, transaction executions do not always succeed)."),(0,c.kt)("li",{parentName:"ul"},"The block may be rejected on L1, thus changing the transaction status to ",(0,c.kt)("inlineCode",{parentName:"li"},"REJECTED"))),(0,c.kt)("h3",{id:"accepted_on_l2"},"ACCEPTED_ON_L2"),(0,c.kt)("p",null,"Transaction passed validation and entered an actual created block on L2."),(0,c.kt)("h3",{id:"accepted_on_l1"},"ACCEPTED_ON_L1"),(0,c.kt)("p",null,"Transaction was accepted on-chain."),(0,c.kt)("h2",{id:"the-pending-block"},"The pending block"),(0,c.kt)("p",null,"Today, StarkNet supports querying the new block before its construction is complete. This feature improves the responsiveness of the system prior to the decentralization phase, but will probably become obsolete once the system is decentralized, as full nodes will only propagate finalized blocks through the network."),(0,c.kt)("p",null,"During the construction of the block, as it is accumulating new transactions, the block\u2019s status is PENDING. While PENDING, new transactions are dynamically added to the block. Once the sequencer decides to \u201cclose\u201d the block, it becomes ",(0,c.kt)("inlineCode",{parentName:"p"},"ACCEPTED_ON_L2")," and its hash is computed."),(0,c.kt)("p",null,"The following example is a query for the pending mainnet block:"),(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://alpha-mainnet.starknet.io/feeder_gateway/get_block?blockNumber=pending"},"https://alpha-mainnet.starknet.io/feeder_gateway/get_block?blockNumber=pending")),(0,c.kt)("p",null,"See the CLI section on how to call the gateway with respect to the pending block."),(0,c.kt)("h2",{id:"transaction-receipt"},"Transaction receipt"),(0,c.kt)("p",null,"The transaction receipt contains basic transaction details (block identifiers and the index within the block),\na summary of the execution resources used by the transaction, the events emitted, a list of messages sent to L1,\nand a consumed L1 message (in case the transaction invokes an L1 handler). The following is an example of a receipt:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "execution_resources": {\n    "builtin_instance_counter": {\n      "pedersen_builtin": 0,\n      "range_check_builtin": 0,\n      "bitwise_builtin": 0,\n      "output_builtin": 0,\n      "ecdsa_builtin": 0,\n      "ec_op_builtin": 0\n    },\n    "n_steps": 178,\n    "n_memory_holes": 0\n  },\n  "block_number": 6807,\n  "transaction_index": 0,\n  "transaction_hash": "0x3f187b7522320f1c87271772fedd6ad119f62595e2d9208824367463df94a5d",\n  "status": "PENDING",\n  "block_hash": "0x23173d4e2d5c0ecc1376b8dbe345c028aa424048c67f68812a9a83873a2d87f",\n  "l2_to_l1_messages": [],\n  "events": [\n    {\n      "data": ["0", "4321"],\n      "from_address": "0x14acf3b7e92f97adee4d5359a7de3d673582f0ce03d33879cdbdbf03ec7fa5d",\n      "keys": [\n        "1744303484486821561902174603220722448499782664094942993128426674277214273437"\n      ]\n    }\n  ]\n}\n')))}p.isMDXComponent=!0}}]);
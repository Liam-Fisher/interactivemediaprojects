/* 
rnbo message protocols:

data structures in rnbo (such as the scala format)
are all lists of integers

implementing data strucures in rnbo thus requires specific formatting
 */


// ignoring rnbo internal data structures for now, only focusing on the message format that can be sent via inports

// could do this fr with proxies
/* 
class FixedUint8Array extends Uint8Array {
    constructor(...args: number[]) {
        super(args);
    }
} 

let u: FixedUint8Array = new FixedUint8Array(1,2,3,4,5,6,7,8,9,10);
*/

// 


type Int = number; // 32 bit integer
type float = number; // 64 bit float


type Index = Int; // index into a list
type Size = Int; // size of a list
type Dimensions = Int[]; // dimensions of a matrix
type NumberParameter = Int|float; // number parameter
type IntegerParameter = Int; // number parameter
type EnumParameter = Int; // enum parameter

type ParameterRange<T extends number> = [start: T, end: T]; // range of integers

type Target<T> = T; // target of a pointer

type list<T extends number> = T[]; // list of integers


// message type:


// parameter Types
type Enum<T extends number> = Index; // enum type
     

type frequency = float; // frequency in Hz 


// object types

interface Nextable<T> {


} 


    // data flows

    // browser event -> inport 
interface Inport<T extends list<number>> {
    // inport is a function that takes a list of integers
    // and returns a list of integers
    (event: list<number>): T;
}

type EncodedEvent = [typecode: number, ...data: number[]];


// data structures
 // Tree, Graph (with cycles), List, Map, Set, Stack, Queue, Heap, Array, Matrix, Vector, Tensor, Graph, Tree, Trie, Linked List, Doubly Linked List, Circular Linked List, Skip List, Hash Table, Binary Search Tree, AVL Tree, Red-Black Tree, B-Tree, Splay Tree, Segment Tree, Binary Indexed Tree, Fenwick Tree, Suffix Tree, Suffix Array, K-D Tree, Disjoint Set, Bloom Filter, Min Heap, Max Heap, Priority Queue, Deque, Do



// format is , values 


type SizedObject<T extends float|Int>  = [size: Size, ...entries: T[]]; // object with a size

type ObjectGraph<T extends float|Int> = [rows: Size, ...values: T[]]; // graph with cycles

type Graph<T extends float|Int> = [entries: Size, ...values: T[]]; // graph with cycles


type GraphEntry<T extends float|Int> = [index: Index, value: T, ...values: T[]]; // graph with nodes


type MultiGraph<T extends float|Int> = [rows: Size, ...values: T[]]; // graph with cycles and multiple arrows between nodes



let g: Graph<Int> = [2,2,2,2,2] as EncodedEvent;


type childCount = Int;
type value = number;

type TreeNode<Val extends number> = [[childCount: Int, ...childLengths: Int[]]|[value: Val], ...TreeNode<Val>[]][];
type setMessage = [index: Index, ...values: value[]]; // set values at index


const jsTree = [[1, 2, 3], [[4, 5], [6, 7]], [8, 9, 10]];
const rnboTree = [1, 3, 2, 2, 4, 5, 2, 6, 7, 3, 8, 9, 10];
function traverseTree(...msg_data: number[]) {
    let depth = 0;
    let value: number;
    let childCount: number;
    let childLengths: number[];
    let code: 0|1|2 = 0;// 0: getting count or value, 1: getting child lengths, 2: getting children
    while(msg_data.length>1) {
        if(code === 0) {
            if(msg_data.length === 1) {
                return msg_data.shift();
            }
            childCount = msg_data.shift()!;
            continue;
        }
        else if(code === 1) {
            


        }
        else {

        }

        let data = msg_data.shift();
        yield [depth, value, childCount, childLengths] = msg_data.splice(0, 4);

    }
    return msg_data.shift();
} 
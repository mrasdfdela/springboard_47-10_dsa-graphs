class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let v of vertexArray) this.addVertex(v);
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let v of vertex.adjacent){
      v.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // iterative solution
    // let toVisitStack = [start];
    // let seen = new Set(toVisitStack);
    // let seenValues = [];

    // while(toVisitStack.length) {
    //   let currNode = toVisitStack.pop();
    //   seenValues.push(currNode.value);
    //   for (let adj of currNode.adjacent){
    //     if (!seen.has(adj)) {
    //       toVisitStack.push(adj);
    //       seen.add(adj);
    //     }
    //   }
    // }
    // return seenValues;
    
    // recursive solution
    let seenValues = [];
    function _dfsRecursive(node,seen){
      seenValues.push(node.value);
      for (let adj of node.adjacent) {
        if (!seen.has(adj)) {
          seen.add(adj);
          _dfsRecursive(adj,seen);
        }
      }
    }
    _dfsRecursive(start,new Set([start]));
    return seenValues;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    let seenValues = [];

    while (toVisitQueue.length) {
      let currNode = toVisitQueue.shift();
      seenValues.push(currNode.value);
      
      for (let adj of currNode.adjacent) {
        if (!seen.has(adj)) {
          toVisitQueue.push(adj);
          seen.add(adj);
        }
      }
    }
    return seenValues;
  }
}

module.exports = {Graph, Node}
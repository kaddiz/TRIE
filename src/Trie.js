export default class Trie {
  constructor() {
    this.root = new TrieNode()
  }
  addWord(word) {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      let index = node.children.indexOf(word[i])
      if (index > -1) {
        node = node.children[index]
      } else {
        let newNode = new TrieNode(word[i])
        node.children.push(newNode)
        node = newNode
      }
      if (i + 1 === word.length) node.flag = true
    }
  }
}

class TrieNode {
  constructor(symbol = '\0') {
    this.symbol = symbol
    this.sibling = []
    this.children = []
    this.flag = false
  }
}

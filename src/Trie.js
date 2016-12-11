class Trie {
  constructor() {
    this.root = new TrieNode()
  }
  addWord(word) {
    word = word.toLowerCase()
    let node = this.root, index = -1

    for (let i = 0; i < word.length; i++) {
      let child = this.getChild(node, word[i])
      if (child) node = child
      else {
        let newNode = new TrieNode(word[i])
        node.children.push(newNode)
        node = newNode
      }
      if (i + 1 === word.length) node.flag = true
    }
  }

  search(word) {
    word = word.toLowerCase()
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      let child = this.getChild(node, word[i])
      if (child) node = child
      else return false
    }
    return node
  }

  remove(word) {
    let isExist = this.search(word)
    let nodes = []
    if (isExist) {
      let node = isExist
      if (node.children.length > 0) {
        node.flag = false
        return
      } else {
        word = word.toLowerCase()
        node = this.root
        let flag = true
        for (let i = 0; i < word.length; i++) {
          let child = this.getChild(node, word[i])
          if (child) {
            if (child.children.length < 2) {
              nodes.push(child)
              let index = -1
              for (let j = 0; j < node.children.length; j++) {
                if (child.symbol === node.children[j].symbol) index = j
              }
              node.children.splice(index, 1)
            }
            node = child
          }
        }
      }
    }
    console.log(nodes)
  }

  getChild(root, char) {
    if (root) {
      for (let i = 0; i < root.children.length; i++) {
        if (root.children[i].symbol == char) {
          return root.children[i]
        }
      }
    } else return null
  }

  output(node, level) {
    let words = []
    let word = ''
    let spaces = ''
    for (let i = 0; i < node.children.length; i++) {
      while (spaces.length != level) {
        spaces += ' '
      }
      word += node.children[i].symbol
      console.log(spaces + node.children[i].symbol)
      word += this.output(node.children[i], level + 1)
    }
    // console.info(word)
    return word
  }
}

class TrieNode {
  constructor(symbol = '\0') {
    this.symbol = symbol
    this.children = []
    this.flag = false
  }
}

// const words = [
//   "Собака", "Овца", "Свинья", "Коза", "Корова", "Зебу", "Кошка", "Курица",
//   "Морская свинка", "Осел", "Утка", "Водяной буйвол", "Лошадь", "Верблюд",
//   "Шелкопряд тутовый", "Голубь", "Гусь", "Як", "Лама", "Альпака", "Цесарка",
//   "Фретка", "Мышь", "Бантенг", "Гаял", "Индейка", "Кролик", "Канарейка",
//   "Крыса", "Лиса", "Ёж", "Зяблик", "Гуппи", "Попугай"
// ]

const words = [
  "Коза", "Кошка", "Курица", "Корова", "Кролик", "Канарейка", "Крыса"
]

// const words = [
//   "Футбол", "Футболка", "Футбольный мяч"
// ]

let trie = new Trie()

for (let word of words) {
  trie.addWord(word)
}

trie.output(trie.root, 0)

trie.remove("кошка")
trie.remove("канарейка")
trie.remove("коза")
trie.remove("футболка")

trie.output(trie.root, 0)

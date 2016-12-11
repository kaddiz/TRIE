import React        from 'react'
import { Link }     from 'react-router'
import Trie         from '../../Trie'
import './MainPage.scss'

export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trie: new Trie()
    }
  }

  render() {
    return (
      <div class='main-page'>
        <div>
          <label for="animal">
            <h2>Какое Ваше любимое домашнее животное?</h2>
          </label>
          <div class='animal-input'>
            <input type="text" name="animal" id="animal" list="animal_list" />
            <datalist id="animal_list">
              <option>Кот</option>
              <option>Собака</option>
            </datalist>
          </div>
        </div>
      </div>
    );
  }
}

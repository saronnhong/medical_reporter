import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Reports from './components/Reports';
import './App.css';
import { BOOKS } from "./books/books";


class App extends Component {
  state = {
    library: [],
    search: '',
    searchResults: BOOKS,
    excludedWords: '',
    isSearchOptionsDisplay: false,
    isDisplayTxtFile: false,
    idToPass: 0,
    isDisplayTable: true,
    tags: {
      goodreport: [1,2,3,4],
      conditionpresent: [0, 4]
    }
  }
  componentDidMount() {
    this.createDictionary()
  }

  createDictionary = () => {
    let tempState = [];
    for (let i = 0; i < BOOKS.length; i++) {
      let fileContents = BOOKS[i].location;
      let fileId = BOOKS[i].id;
      let test = fileContents.toLowerCase().replace(/[^A-Za-z' ;]/g, "").split(' ');

      let hash = {};
      for (let j = 0; j < test.length; j++) {
        if (!hash[test[j]]) {
          hash[test[j]] = 1;
        } else {
          hash[test[j]]++;
        }
      }
      let currentStorage = { dictionary: hash, id: fileId, location: fileContents }
      tempState.push(currentStorage);
    }
    this.setState({ library: tempState });
  }
  searchBooks = () => {
    const { library } = this.state;
    const { search } = this.state;
    const { excludedWords } = this.state;

    let searchItems = search.toLowerCase().split(' ');
    let excludedItems = excludedWords.toLowerCase().split(' ');
    let searchResultsItems = [];
    for (let book in library) {
      let wordChecker = true;
      for (let k = 0; k < searchItems.length; k++) {
        if (!library[book].dictionary[searchItems[k]]) {
          wordChecker = false;
        }
      }
      if (excludedWords.length > 0) {
        for (let l = 0; l < excludedItems.length; l++) {
          if (library[book].dictionary[excludedItems[l]]) {
            wordChecker = false;
          }
        }
      }
      if (wordChecker === true) {
        searchResultsItems.push(library[book]);
      }
    }
    this.setState({ ...this.state, searchResults: searchResultsItems, isDisplayTable: true, isDisplayTxtFile: false }, () => console.log(this.state.searchResults));
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.searchBooks();
    }
  }

  onClickBookRow = (book) => {
    this.setState({ ...this.state, isDisplayTxtFile: true, idToPass: book.id, isDisplayTable: false })
  }

  onClickSearchDropDown = () => {
    this.setState({ isSearchOptionsDisplay: !this.state.isSearchOptionsDisplay })
  }
  onChangeSearchInput = (e) => {
    this.setState({ search: e.target.value })
  }
  onChangeExcludeInput = (e) => {
    this.setState({ excludedWords: e.target.value })
  }

  displayTagResult = item => {
    const { tags } = this.state;
    let tempState=[];
    let currentTag = tags[item];
    for(let book in BOOKS){
      for(let i=0; i<currentTag.length; i++){
        if(BOOKS[book].id === currentTag[i]){
          tempState.push(BOOKS[book]);
        }
      }
    }
    console.log(tempState);
    this.setState({ ...this.state, searchResults: tempState, isDisplayTable: true, isDisplayTxtFile: false }, ()=> console.log(this.state.searchResults));
  }

  displayInbox = () => {
    this.setState({ ...this.state, searchResults: BOOKS, isDisplayTable: true, isDisplayTxtFile: false });
  }

  addTag = (item, id) => {
    const { tags } = this.state;
    let currentTag = tags[item];
    if(!currentTag.includes(id)){
      currentTag.push(id)
    }
    this.setState({ ...this.state, tags: {...tags, item: currentTag}});
  }
  removeTag = (item, id) => {
    const { tags } = this.state;
    let currentTag = tags[item];
    let newArr=[];
    if(currentTag.includes(id)){
      newArr= currentTag.filter(word => word !== id)
    }
    if(item === "goodreport"){
      this.setState({...this.state, tags: {...tags, "goodreport": newArr}});
    }else if(item === "conditionpresent"){
      this.setState({...this.state, tags: {...tags, "conditionpresent": newArr}});
    }
    
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-2" style={{ marginTop: "150px", padding: '20px' }}>
              <div className="row">
                <div className="tags" onClick={()=> this.displayInbox()}><i class="fas fa-envelope-open-text"></i> Inbox</div>
                <div className="tags" onClick={()=> this.displayTagResult("goodreport")}><i class="fas fa-hashtag"></i>goodreport</div>
                <div className="tags" onClick={()=> this.displayTagResult("conditionpresent")}><i class="fas fa-hashtag"></i>conditionpresent</div>
              </div>

            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="appTitle text-center">Medical Reporter</h1>
                </div>
              </div>
              <SearchBar
                isSearchOptionsDisplay={this.state.isSearchOptionsDisplay}
                onClickSearchDropDown={this.onClickSearchDropDown}
                onClickSearchBtn={this.searchBooks}
                onChangeSearchInput={this.onChangeSearchInput}
                onChangeExcludeInput={this.onChangeExcludeInput}
                handleKeyDown={this.handleKeyDown}
              />
              <Reports
                isDisplayTable={this.state.isDisplayTable}
                searchResults={this.state.searchResults}
                isDisplayTxtFile={this.state.isDisplayTxtFile}
                idToPass={this.state.idToPass}
                onClick={this.onClickBookRow}
                tags={this.state.tags}
                addTag={this.addTag}
                removeTag={this.removeTag}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;

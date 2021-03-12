import React, { Component } from 'react';
import "./style.css";
import raw from "raw.macro";
import { BOOKS } from "../../books/books";


class SearchBar extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <div className="input-group mb-3 searchContainer">
              <button type="button" className="input-group-text btn btn-secondary" onClick={this.props.onClickSearchBtn}>
                <i className="fas fa-search"></i>
              </button>
              <input id="mainSearchInput" type="text" className="form-control" placeholder="Search Medical Reports"
                onChange={e => this.props.onChangeSearchInput(e)}
                onKeyDown={e => this.props.handleKeyDown(e)}
              />
              <div className="noSpace" onClick={this.props.onClickSearchDropDown}>
                <button type="button" className="input-group-text btn transparent downArrow" >
                  <i class="fas fa-sort-down"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.props.isSearchOptionsDisplay ?
          <div className="dropDownContainer">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center ">
                <div className="input-group mb-3 searchContainerDropDown">
                  <span className="input-group-text dropDownLabel" id="basic-addon1">Included words</span>
                  <input type="text" className="form-control" placeholder="" onChange={(e) => this.props.onChangeSearchInput(e)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center ">
                <div class="input-group mb-3 searchContainerDropDown">
                  <span class="input-group-text dropDownLabel" id="basic-addon1">Excluded words</span>
                  <input type="text" class="form-control" placeholder="" onChange={e => this.props.onChangeExcludeInput(e)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center ">
                <button type="button" className="btn btn-success searchBtnDropDown" onClick={this.props.onClickSearchBtn}>Search With Filters</button>
              </div>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}

export default SearchBar;
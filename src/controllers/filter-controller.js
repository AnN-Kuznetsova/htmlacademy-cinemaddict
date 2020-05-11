import Filters from "../components/filters.js";
import {FilterType} from "../const.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    // this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onFilmsModelFilterChange = this._onFilmsModelFilterChange.bind(this);

    // this._tasksModel.setOnDataChange(this._onDataChange);
    this._filmsModel.setFilterChangeHandler(this._onFilmsModelFilterChange);
  }


  _getFilters(filterTypes) {
    return Object.entries(filterTypes).map((filterType) => {
      const [name, value] = filterType;

      return {
        name,
        value,
        count: 0,//getFilmsByFilter(allFilms, filterType).length,
        isChecked: value === this._activeFilterType,
        isNotShowQuantity: value === FilterType.ALL,
      };
    });
  }


  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
  }


  _onFilmsModelFilterChange() {
    this._activeFilterType = this._filmsModel.getFilter();
    window.console.log(`Model change filter: ${this._activeFilterType}`);
  }


  render() {
    const container = this._container;
    //const allFilms = this._filmsModel.getFilmsAll();

    const oldComponent = this._filterComponent;
    this._filterComponent = new Filters(this._getFilters(FilterType));
    this._filterComponent.setOnFilterClick(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }
  }
}

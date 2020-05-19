import Filters from "../components/filters.js";
import {FilterType} from "../const.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._filmsModelFilterChangeHandler = this._filmsModelFilterChangeHandler.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
    this._filmsModel.setFilterChangeHandler(this._filmsModelFilterChangeHandler);
  }


  render() {
    const container = this._container;

    const oldComponent = this._filterComponent;
    this._filterComponent = new Filters(this._getFilters(FilterType));
    this._filterComponent.setFilterClickHandler(this._filterChangeHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }
  }


  _getFilters(filterTypes) {
    return Object.entries(filterTypes).map((filterType) => {
      const [filterName, filterValue] = filterType;

      return {
        filterName,
        filterValue,
        count: getFilmsByFilter(this._filmsModel.getFilmsAll(), filterValue).length,
        isChecked: filterValue === this._activeFilterType,
        isNotShowQuantity: filterValue === FilterType.ALL,
      };
    });
  }


  _onDataChange() {
    this.render();
  }


  _filterChangeHandler(filterType) {
    this._filmsModel.setFilter(filterType);
  }


  _filmsModelFilterChangeHandler() {
    this._activeFilterType = this._filmsModel.getFilter();
    this.render();
  }
}

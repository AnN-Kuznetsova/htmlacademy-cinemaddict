import FilmCard from "../components/film-card.js";
import FilmDetails from "../components/film-details.js";
import FilmDataController from "./film-data-controller.js";
import CommentsController from "./comments-controller.js";
import {onEscPress} from "../utils/common.js";
import {render, RenderPosition, replace, removeElement} from "../utils/render.js";


const Mode = {
  CARD: `card`,
  DETAILS: `details`,
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.CARD;

    this._film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDataController = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closeFilmDetailsPopup = this._closeFilmDetailsPopup.bind(this);
  }


  _onEscKeyDown(evt) {
    onEscPress(evt, this._closeFilmDetailsPopup.bind(this));
  }

  _closeFilmDetailsPopup() {
    const filmSettings = this._filmDataController.getFilmSettings(); // this._filmDetailsComponent.getFilmSettings();
    if ((this._film.isAddToWatchlist !== filmSettings.isAddToWatchlist) ||
      (this._film.isMarkAsWatched !== filmSettings.isMarkAsWatched) ||
      (this._film.isFavorite !== filmSettings.isFavorite)) {
      this._onDataChange(this._film.id, Object.assign({}, this._film, {
        isAddToWatchlist: filmSettings.isAddToWatchlist,
        isMarkAsWatched: filmSettings.isMarkAsWatched,
        isFavorite: filmSettings.isFavorite,
      }));
    }

    removeElement(this._filmDataController.getFilmDataComponent());

    const commentsComponent = this._commentsController.getCommentsComponent();
    commentsComponent.reset();
    removeElement(commentsComponent);

    removeElement(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.CARD;
  }

  _openFilmDetailsPopup(filmDetailsComponent) {
    this._onViewChange();
    render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DETAILS;

    const filmDataContainer = filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);
    this._filmDataController = new FilmDataController(filmDataContainer, this._closeFilmDetailsPopup);
    this._filmDataController.render(this._film);

    const commentsContainer = filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsController = new CommentsController(commentsContainer, this._film.comments);
    this._commentsController.render();
  }


  render(film) {
    const onFilmCardPosterElementClick = () => {
      openPopup();
    };

    const onFilmCardTitleElementClick = () => {
      openPopup();
    };

    const onFilmСardСommentsElementClick = () => {
      openPopup();
    };

    const onAddToWatchlistButtonClick = () => {
      this._onDataChange(film.id, Object.assign({}, film, {isAddToWatchlist: !film.isAddToWatchlist}));
    };

    const onMarkAsWatchedButtonClick = () => {
      this._onDataChange(film.id, Object.assign({}, film, {isMarkAsWatched: !film.isMarkAsWatched}));
    };

    const onFavoriteButtonClick = () => {
      this._onDataChange(film.id, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    };


    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCard(film);
    this._filmCardComponent.setOnFilmCardPosterElementClick(onFilmCardPosterElementClick);
    this._filmCardComponent.setOnFilmCardTitleElementClick(onFilmCardTitleElementClick);
    this._filmCardComponent.setOnFilmСardСommentsElementClick(onFilmСardСommentsElementClick);
    this._filmCardComponent.setOnAddToWatchlistButtonClick(onAddToWatchlistButtonClick);
    this._filmCardComponent.setOnMarkAsWatchedButtonClick(onMarkAsWatchedButtonClick);
    this._filmCardComponent.setOnFavoriteButtonClick(onFavoriteButtonClick);

    this._filmDetailsComponent = new FilmDetails();
    const openPopup = this._openFilmDetailsPopup.bind(this, this._filmDetailsComponent);

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }


  setDefaultView() {
    if (this._mode !== Mode.CARD) {
      this._closeFilmDetailsPopup();
    }
  }


  get film() {
    return this._film;
  }
}

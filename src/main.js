import {UserRank} from "./components/user-rank.js";
import {SiteMenu} from "./components/site-menu.js";
import {Filter} from "./components/filter.js";
import {Filters} from "./components/filters.js";
import {Sort} from "./components/sort.js";
import {FilmsBoard} from "./components/films-board.js";
import {FilmsList} from "./components/films-list.js";
import {FilmsListTitle} from "./components/films-list-title.js";
import {FilmsListContainer} from "./components/films-list-container.js";
import {FilmCard} from "./components/film-card.js";
import {ShowMoreButton} from "./components/show-more-button.js";
import {FilmsListExtra} from "./components/films-list-extra.js";
import {FooterStatistics} from "./components/footer-statistics.js";
import {FilmDetails} from "./components/film-details.js";
import {onEscPress} from "./utils/common.js";
import {render, RenderPosition, removeElement, remove} from "./utils/render.js";
import {generateFilms} from "./mock/film";


const FILM_COUNT = 23;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const siteFooterElement = bodyElement.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);


let openFilmDetailsComponent = null;

const onEscKeyDown = (evt) => {
  onEscPress(evt, closeFilmDetailsPopup);
};

const closeFilmDetailsPopup = () => {
  removeElement(openFilmDetailsComponent);
  openFilmDetailsComponent = null;
  document.removeEventListener(`keydown`, onEscKeyDown);
};


const renderFilm = (filmsListContainerComponent, film) => {
  const openFilmDetails = () => {
    if (openFilmDetailsComponent) {
      closeFilmDetailsPopup();
    }
    openFilmDetailsComponent = render(bodyElement, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onFilmCardPosterElementClick = () => {
    openFilmDetails();
  };

  const onFilmCardTitleElementClick = () => {
    openFilmDetails();
  };

  const onFilmСardСommentsElementClick = () => {
    openFilmDetails();
  };

  const onfilmDetailsCloseButtonClick = () => {
    closeFilmDetailsPopup();
  };

  const filmCardComponent = new FilmCard(film);
  filmCardComponent.setOnFilmCardPosterElementClick(onFilmCardPosterElementClick);
  filmCardComponent.setOnFilmCardTitleElementClick(onFilmCardTitleElementClick);
  filmCardComponent.setOnFilmСardСommentsElementClick(onFilmСardСommentsElementClick);

  const filmDetailsComponent = new FilmDetails(film);
  const filmDetailsCloseButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  filmDetailsCloseButton.addEventListener(`click`, onfilmDetailsCloseButtonClick);

  render(filmsListContainerComponent.getElement(), filmCardComponent, RenderPosition.BEFOREEND);
};


const renderFilmsList = (filmsListComponent, films, isExtra = false, title = ``) => {
  if (films.length === 0) {
    render(filmsListComponent.getElement(), new FilmsListTitle(`There are no movies in our database`), RenderPosition.AFTERBEGIN);
    return;
  }

  const listTitle = isExtra ? title : `All movies. Upcoming`;
  const isVisually = isExtra ? true : false;
  const filmsListTitleComponent = new FilmsListTitle(listTitle, isVisually);
  render(filmsListComponent.getElement(), filmsListTitleComponent, RenderPosition.AFTERBEGIN);

  const filmsListContainerComponent = new FilmsListContainer();
  render(filmsListComponent.getElement(), filmsListContainerComponent, RenderPosition.BEFOREEND);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsListContainerComponent, film));

  if (films.length > SHOWING_FILMS_COUNT_ON_START) {
    const showMoreButtonComponent = new ShowMoreButton();
    render(filmsListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

    const onShowMoreButtonClick = () => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

      films.slice(prevFilmsCount, showingFilmsCount)
        .forEach((film) => renderFilm(filmsListContainerComponent, film));

      if (showingFilmsCount >= films.length) {
        remove(showMoreButtonComponent);
      }
    };

    showMoreButtonComponent.setOnShowMoreButtonClick(onShowMoreButtonClick);
  }
};


const renderFilmsBoard = (filmsBoardComponent, films) => {
  const filmsListComponent = new FilmsList();
  render(filmsBoardComponent.getElement(), filmsListComponent, RenderPosition.BEFOREEND);
  renderFilmsList(filmsListComponent, films);

  if (filmsListsExtra.length > 0) {
    for (const list of filmsListsExtra) {
      const filmsExtra = list.getFilmsExtra(films);
      if (filmsExtra) {
        const filmsListExtraComponent = new FilmsList(true);
        render(filmsBoardComponent.getElement(), filmsListExtraComponent, RenderPosition.BEFOREEND);
        renderFilmsList(filmsListExtraComponent, filmsExtra, true, list.title);
      }
    }
  }
};


const films = generateFilms(FILM_COUNT);

const filmsFilters = {
  all: new Filter(`All movies`, `filterDefaultFun`, films, true, true),
  watchlist: new Filter(`Watchlist`, `filterAddToWatchlistFun`, films),
  history: new Filter(`History`, `filterHistoryFun`, films),
  favorites: new Filter(`Favorites`, `filterFavoritesFun`, films),
};

const filmsListsExtra = [
  new FilmsListExtra(`Top rated`, `rating`),
  new FilmsListExtra(`Most commented`, `commentsCount`),
];

const siteMenuComponent = new SiteMenu();
render(siteHeaderElement, new UserRank(filmsFilters), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(siteMenuComponent.getElement(), new Filters(filmsFilters), RenderPosition.AFTERBEGIN);
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);

const filmsBoardComponent = new FilmsBoard();
render(siteMainElement, filmsBoardComponent, RenderPosition.BEFOREEND);
renderFilmsBoard(filmsBoardComponent, films);

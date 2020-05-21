import FilmsAPI from "./api/films-api.js";
import FilmsModel from "./models/films-model.js";
import FilmsProvider from "./api/films-provider.js";
import PageController from "./controllers/page-controller.js";
import Store from "./api/store.js";


const FILMS_STORE_PREFIX = `cinemaddict-localstorage`;
const FILMS_STORE_VER = `v1`;
const FILMS_STORE_NAME = `${FILMS_STORE_PREFIX}-${FILMS_STORE_VER}`;


const filmsApi = new FilmsAPI();
const filmsStore = new Store(FILMS_STORE_NAME, window.localStorage);
const filmsApiWithProvider = new FilmsProvider(filmsApi, filmsStore);
const filmsModel = new FilmsModel();


const pageController = new PageController(filmsModel, filmsApiWithProvider);
pageController.render();

filmsApiWithProvider.getFilms()
  .then((films) => filmsModel.setFilms(films))
  .catch(() => filmsModel.setFilms([]))
  .then(() => pageController.rerender());

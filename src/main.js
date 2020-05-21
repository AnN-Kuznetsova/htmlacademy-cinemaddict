import FilmsAPI from "./api/films-api.js";
import FilmsModel from "./models/films-model.js";
import FilmsProvider from "./api/films-provider.js";
import PageController from "./controllers/page-controller.js";
import Store from "./api/store.js";


const filmsApi = new FilmsAPI();
const filmsStore = new Store();
const filmsApiWithProvider = new FilmsProvider(filmsApi, filmsStore);
const filmsModel = new FilmsModel();


const pageController = new PageController(filmsModel, filmsApiWithProvider);
pageController.render();

filmsApiWithProvider.getFilms()
  .then((films) => filmsModel.setFilms(films))
  .catch(() => filmsModel.setFilms([]))
  .then(() => pageController.rerender());

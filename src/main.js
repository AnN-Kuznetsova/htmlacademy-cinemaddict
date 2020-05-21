import FilmsAPI from "./api/films-api.js";
import FilmsModel from "./models/films-model.js";
import PageController from "./controllers/page-controller.js";
import FilmsProvider from "./api/films-provider.js";


const filmsApi = new FilmsAPI();
const filmsApiWithProvider = new FilmsProvider(filmsApi);
const filmsModel = new FilmsModel();


const pageController = new PageController(filmsModel, filmsApiWithProvider);
pageController.render();

filmsApiWithProvider.getFilms()
  .then((films) => filmsModel.setFilms(films))
  .catch(() => filmsModel.setFilms([]))
  .then(() => pageController.rerender());

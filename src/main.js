import FilmsAPI from "./api/films-api.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films-model.js";


const filmsApi = new FilmsAPI();
const filmsModel = new FilmsModel();


const pageController = new PageController(filmsModel, filmsApi);
pageController.render();

filmsApi.getFilms()
  .then((films) => filmsModel.setFilms(films))
  .catch(() => filmsModel.setFilms([]))
  .then(() => pageController.rerender());

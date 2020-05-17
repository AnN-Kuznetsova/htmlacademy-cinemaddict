import FilmsAPI from "./api/films-api.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films-model.js";


const filmsApi = new FilmsAPI();
const filmsModel = new FilmsModel();


const pageController = new PageController(filmsModel, filmsApi);


filmsApi.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render();
  });

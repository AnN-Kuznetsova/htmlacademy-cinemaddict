import API from "./api.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films-model.js";


const AUTHORIZATION = `Basic dBK351hdk=dfMNf0fjk6`;


const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();


const pageController = new PageController(filmsModel);


api.getFilms()
  .then((films) => {
    window.console.log(films[0]);
    filmsModel.setFilms(films);
    pageController.render();
  });

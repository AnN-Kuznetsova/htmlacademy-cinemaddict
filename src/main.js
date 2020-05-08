import PageController from "./controllers/page-controller.js";
import {generateFilms} from "./mock/film";


const FILM_COUNT = 12;

const films = generateFilms(FILM_COUNT);

const pageController = new PageController(films);
pageController.render();

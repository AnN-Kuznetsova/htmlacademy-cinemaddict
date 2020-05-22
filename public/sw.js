const CACHE_PREFIX = `cinemaddict-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll([
            `/`,
            `/index.html`,
            `/bundle.js`,
            `/css/normalize.css`,
            `/css/main.css`,
            `/imges/background.png`,
            `/imges/bitmap.png`,
            `/imges/bitmap@2x.png`,
            `/imges/bitmap@3x.png`,
            `/imges/emoji/angry.png`,
            `/imges/emoji/puke.png`,
            `/imges/emoji/sleeping.png`,
            `/imges/emoji/smile.png`,
            `/imges/icons/icon-favorite.svg`,
            `/imges/icons/icon-favorite-active.svg`,
            `/imges/icons/icon-watched.svg`,
            `/imges/icons/icon-watched-active.svg`,
            `/imges/icons/icon-watchlist.svg`,
            `/imges/icons/icon-watchlist-active.svg`,
          ]);
        })
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
      // Получаем все названия кэшей
      caches.keys()
        .then(
            // Перебираем их и составляем набор промисов на удаление
            (keys) => Promise.all(
                keys.map(
                    (key) => {
                      // Удаляем только те кэши,
                      // которые начинаются с нашего префикса,
                      // но не совпадают по версии
                      if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                        return caches.delete(key);
                      }

                      // Остальные не обрабатываем
                      return null;
                    })
                  .filter((key) => key !== null)
            )
        )
  );
});

self.addEventListener(`fetch`, (evt) => {
  const {request} = evt;

  evt.respondWith(
      caches.match(request)
        .then((cacheResponse) => {
          // Если в кэше нашёлся ответ на запрос (request),
          // возвращаем его (cacheResponse) вместо запроса к серверу
          if (cacheResponse) {
            return cacheResponse;
          }

          // Если в кэше не нашёлся ответ,
          // повторно вызываем fetch
          // с тем же запросом (request),
          // и возвращаем его
          return fetch(request)
            .then((response) => {
              // Если ответа нет, или ответ со статусом отличным от 200 OK,
              // или ответ небезопасного типа (не basic), тогда просто передаём
              // ответ дальше, никак не обрабатываем
              if (!response || response.status !== 200 || response.type !== `basic`) {
                return response;
              }

              // А если ответ удовлетворяет всем условиям, клонируем его
              const clonedResponse = response.clone();

              // Копию кладём в кэш
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, clonedResponse));

              // Оригинал передаём дальше
              return response;
            });
        })
  );
});

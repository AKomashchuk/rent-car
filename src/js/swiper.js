import Swiper from 'swiper';
import { recomendationCar, recentCar } from '../API/cars';

  const swiper = new Swiper('.swiper', {
    breakpoints: {
      375: {
        slidesPerView: 3,
        spaceBetween: 19,
      },

      1450: {
        slidesPerView: 3,
        spaceBetween: 32,
        allowTouchMove: false,
        noSwiping: false,
      },

      2100: {
        slidesPerView: 5,
        spaceBetween: 32,
      }
    },
  });

  const recentCarFromServer = recentCar;
  const cardRecentCarElement = document.querySelector('.swiper-wrapper-recent');
  cardRecentCarElement.innerHTML = `
    ${recentCarFromServer.map(car => `
      <div class="recent-car_card card swiper-slide">
        <div class="card__about">
          <div class="card__name">${car.mark}</div>
          <div class="card__like like"></div>
        </div>
        <div class="card__type">${car.type}</div>
        <img src="./image/car-1.png" alt="image-car.png" class="card__img">
        <div class="card__function">
          <div class="card__box">
            <div class="card__gasoline"></div>
            <div class="card__icon-gasoline">
              ${car.gasoline}
            </div>
          </div>
          <div class="card__box">
            <div class="card__sreering"></div>
            <div class="card__icon-sreering">
              ${car.sreering}
            </div>
          </div>
          <div class="card__box">
            <div class="card__capacity"></div>
            <div class="card__icon-capacity">
              ${car.capacity} Person
            </div>
          </div>
        </div>
        <div class="card__price-and-rent">
          <div class="card__price">
            <div class="card__current-price">
              <strong class="card__current-price--dark">${car.currentPrice}/</strong>days
            </div>
            <span class="price__old price__light">${car.oldPrice}</span>
          </div>
          <div class="btn card__button btn-primary" type="button">Rental Now</div>
        </div>
      </div>
    `).join('')}
  `

  const cardRecomebdationCarElement = document.querySelector('.swiper-wrapper-recomendation');
  const recomendationCarFromServer = recomendationCar;
  cardRecomebdationCarElement.innerHTML =`
    ${recomendationCarFromServer.map(car => `
      <div class="recent-car_card card swiper-slide">
        <div class="card__about">
          <div class="card__name">${car.mark}</div>
          <div class="card__like like"></div>
        </div>
        <div class="card__type">${car.type}</div>
        <img src="./image/car-2.png" alt="image-car.png" class="card__img">
        <div class="card__function">
          <div class="card__box">
            <div class="card__gasoline"></div>
            <div class="card__icon-gasoline">
              ${car.gasoline}
            </div>
          </div>
          <div class="card__box">
            <div class="card__sreering"></div>
            <div class="card__icon-sreering">
              ${car.sreering}
            </div>
          </div>
          <div class="card__box">
            <div class="card__capacity"></div>
            <div class="card__icon-capacity">
              ${car.capacity} Person
            </div>
          </div>
        </div>
        <div class="card__price-and-rent">
          <div class="card__price">
            <div class="card__current-price">
              <strong class="card__current-price--dark">${car.currentPrice}/</strong>days
            </div>
            <span class="price__old price__light">${car.oldPrice}</span>
          </div>
          <div class="btn card__button btn-primary" type="button">Rental Now</div>
        </div>
      </div>
    `).join('')}
  `


  const carByTypeElements = document.querySelectorAll('.form-type');
  const carByOpacityElements = document.querySelectorAll('.form-opacity');
  const selectedCarElement = document.querySelector('.section__selected');
  let selectedTypeValues = [];
  let selectedCapacityValues = [];

  carByTypeElements.forEach(el => el.addEventListener(
    'click', 
    (event) => {
      selectedTypeValues = sortCar(event, selectedTypeValues);
      setCars();
    }
  ));

  carByOpacityElements.forEach(el => el.addEventListener(
    'click', 
    (event) => {
      selectedCapacityValues = sortCar(event, selectedCapacityValues);
      setCars();
    }
  ));

  function hiddenSection() {
    const isEmptyFilter = selectedTypeValues.length === 0 && selectedCapacityValues.length === 0;

    if (!isEmptyFilter) {
      document.querySelector('.recent-car').style.display = 'none';
      document.querySelector('.recomendation-car').style.display = 'none';
    } else {
      document.querySelector('.recent-car').style.display = 'block'
      document.querySelector('.recomendation-car').style.display = 'block'
    };
  }

  function sortCar(event, selectedValues) {
    return !selectedValues.includes(event.target.value)
      ? [...selectedValues, event.target.value]
      : selectedValues.filter(el => el !== event.target.value);
  }

  function setCars() {
    const isEmptyFilter = selectedTypeValues.length === 0 && selectedCapacityValues.length === 0;
    const filteredCar = recentCar
      .concat(recomendationCar)
      .filter(el => selectedTypeValues.length ? selectedTypeValues.includes(el.type) : true)
      .filter(el => selectedCapacityValues.length ? selectedCapacityValues.includes(el.capacity) : true);

    hiddenSection();

  selectedCarElement.innerHTML = isEmptyFilter ? '' : `
    <div class="car__more">
      <div class="car__title">Selected</div>
      <div class="car__view-all">View All</div>
    </div>
    <div class="car__cards car__cards--all">
      ${filteredCar.map(car => `
        <div class="card card__selected">
          <div class="card__about">
            <div class="card__name">${car.mark}</div>
            <div class="card__like like"></div>
          </div>
          <div class="card__type">${car.type}</div>
          <img src="./image/car-3.png" alt="image-car.png" class="card__img">
          <div class="card__function">
            <div class="card__box">
              <div class="card__gasoline"></div>
              <div class="card__icon-gasoline">
                ${car.gasoline}
              </div>
            </div>
            <div class="card__box">
              <div class="card__sreering"></div>
              <div class="card__icon-sreering">
                ${car.sreering}
              </div>
            </div>
            <div class="card__box">
              <div class="card__capacity"></div>
              <div class="card__icon-capacity">
                ${car.capacity} Person
              </div>
            </div>
          </div>
          <div class="card__price-and-rent">
            <div class="card__price">
              <div class="card__current-price">
                <strong class="card__current-price--dark">${car.currentPrice}/</strong>days
              </div>
              <span class="price__old price__light">${car.oldPrice}</span>
            </div>
            <div class="btn card__button btn-primary" type="button">Rental Now</div>
          </div>
        </div>
      `).join('')}
    </div>
  `
  }

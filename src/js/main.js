import '../scss/styles.scss';
import { users } from '../API/users';
import './swiper';

//like

const likeIconElements = document.querySelectorAll('.card__like');
likeIconElements.forEach(el => el.addEventListener('click', onLike));

function onLike() {
 console.log(this);
  this.classList.toggle('liked');
}

//comments

const usersElement = document.getElementById('user');
const usersFromServer = users.filter(user => user.comment);
const allCommentsElement = document.querySelector('.reviews__show-button');

let isAllCommentsShown = false;
allCommentsElement.addEventListener('click', showAllComments);

setComments();

function showAllComments() {
  isAllCommentsShown = !isAllCommentsShown;
  allCommentsElement.innerHTML = !isAllCommentsShown ? 'Show All' : 'Show Less'

  setComments();
}

function setComments() {
  const usersStartList = isAllCommentsShown ? usersFromServer : usersFromServer.slice(0, 2);

  usersElement.innerHTML=`
    ${usersStartList.map(user => `
      <div class="user__info">
        <div class="user__about">
          <img src="./image/user-avatar.png" alt="user-image.png" class="rounded-circle user__img">
          <div class="user__private-info">
            <h3 class="user__name">${user.name}</h3>
            <h4 class="user__position">${user.position}</h4>
          </div>
        </div>
        <div class="user__additional-info">
          <span class="user__date-comment">${user.date}</span>
          <div class="user__rank">
            <div class="about__stars stars stars--${user.stars}">
              <div class="stars__star"></div>
              <div class="stars__star"></div>
              <div class="stars__star"></div>
              <div class="stars__star"></div>
              <div class="stars__star"></div>
            </div>
          </div>
        </div>
      </div>
      <p class="user__paragraph">
        ${user.comment}
      </p>
    `).join('')}
  `
}

const countComments = document.querySelector('.reviews__count');
countComments.innerHTML=`${usersFromServer.length}`;
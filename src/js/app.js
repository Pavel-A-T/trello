import { load, save } from './localStorage';

const cards = document.getElementsByClassName('add-card');
const forms = document.getElementsByClassName('add-tasks-control');
const cancels = document.getElementsByClassName('add-tasks-cancel');

let draggetItem = null;

document.addEventListener('load', () => {
  const loadedState = load();
  if (loadedState) {
    const mainElement = document.body.querySelector('.container');
    mainElement.innerHTML = loadedState;
  }
});

document.addEventListener('beforeunload', () => {
  save();
});

function dragNDrop() {
  const listItems = document.querySelectorAll('.text');
  const list = document.querySelectorAll('.trello');

  for (let i = 0; i < listItems.length; i += 1) {
    const item = listItems[i];

    item.addEventListener('dragstart', () => {
      draggetItem = item;
      setTimeout(() => {
        item.style.display = 'none';
      }, 0);
    });

    item.addEventListener('dragend', () => {
      setTimeout(() => {
        item.style.display = 'block';
        draggetItem = null;
      }, 0);
    });

    for (let j = 0; j < list.length; j += 1) {
      const element = list[j];
      element.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      // element.addEventListener('dragenter', function (e) {
      //     e.preventDefault();
      //     this.style.backgroundColor = 'rgba(0,0,0,.3)';
      // });

      // element.addEventListener('dragleave', function (e) {
      //     e.preventDefault();
      //     this.style.backgroundColor = 'white';
      // });

      element.addEventListener('drop', function (e) {
        e.preventDefault();
        // this.style.backgroundColor = 'white';
        this.append(draggetItem);
      });
    }
  }
  save();
}

for (const card of cards) {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    const main = card.closest('.main');
    const form = main.getElementsByClassName('add-tasks-control')[0];
    form.classList.remove('hidden');
  });
}

for (const form of forms) {
  const button = form.getElementsByClassName('add-tasks-submit')[0];
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const text = form.getElementsByClassName('add-tasks-input')[0];
    if (!text.value) return;
    const main = form.closest('.main');
    const trello = main.getElementsByClassName('trello')[0];
    const textArea = document.createElement('textarea');
    textArea.value = `${text.value}`;
    text.value = '';
    textArea.classList.add('text');
    textArea.setAttribute('readonly', 'readonly');
    textArea.setAttribute('draggable', true);
    trello.appendChild(textArea);
    dragNDrop();
    form.classList.add('hidden');
  });
}

for (const cancel of cancels) {
  cancel.addEventListener('click', (event) => {
    event.preventDefault();
    const form = cancel.closest('.add-tasks-buttons').closest('.add-tasks-control');
    form.classList.add('hidden');
    const area = form.querySelector('textarea');
    area.value = '';
  });
}

dragNDrop();

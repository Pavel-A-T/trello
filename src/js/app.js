const cards = document.getElementsByClassName('add-card');
const forms = document.getElementsByClassName('add-tasks-control');
const cancels = document.getElementsByClassName('add-tasks-cancel');

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

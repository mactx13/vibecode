const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

const eventTitle = document.querySelector('#event-title');
const eventDate = document.querySelector('#event-date');
const eventPlace = document.querySelector('#event-place');
const eventDescription = document.querySelector('#event-description');

const showProgramButton = document.querySelector('#show-program');
const program = document.querySelector('#program');

const serviceForm = document.querySelector('#service-form');
const guideCheckbox = document.querySelector('#guide');
const audioCheckbox = document.querySelector('#audio');
const catalogCheckbox = document.querySelector('#catalog');

const choiceError = document.querySelector('#choice-error');
const dataError = document.querySelector('#data-error');
const result = document.querySelector('#result');
const reportJson = document.querySelector('#report-json');

let data;

try {
    data = JSON.parse(sourceJson);

    eventTitle.textContent = data.event.title;
    eventDate.textContent = data.event.date;
    eventPlace.textContent = data.event.place;
    eventDescription.textContent = data.event.description;
} catch (error) {
    dataError.textContent = 'Ошибка данных.';
    dataError.hidden = false;
    serviceForm.hidden = true;
}

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
    const selectedServices = services.filter(service => {
        return (service.id === 'guide' && guideChecked) ||
            (service.id === 'audio' && audioChecked) ||
            (service.id === 'catalog' && catalogChecked);
    });

    const items = selectedServices.map(({ title, price }) => {
        return {
            title: title.trim(),
            price: price
        };
    });

    const total = items.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    return {
        count: items.length,
        total: total,
        items: items
    };
}

showProgramButton.addEventListener('click', function () {
    program.innerHTML = data.event.meeting;
    program.hidden = false;
});

serviceForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const report = buildReport(
        data.services,
        guideCheckbox.checked,
        audioCheckbox.checked,
        catalogCheckbox.checked
    );

    if (report.count === 0) {
        choiceError.textContent = 'Выберите хотя бы одну услугу.';
        choiceError.hidden = false;
        result.hidden = true;
        reportJson.hidden = true;
        return;
    }

    choiceError.hidden = true;

    let resultText = 'Выбрано услуг: ' + report.count +
        '<br>Итого: ' + report.total + ' руб.';

    report.items.forEach(function (item) {
        resultText += '<br>' + item.title;
    });

    result.innerHTML = resultText;
    result.hidden = false;

    const jsonString = JSON.stringify(report);
    JSON.parse(jsonString);
    reportJson.textContent = jsonString;
    reportJson.hidden = false;
});

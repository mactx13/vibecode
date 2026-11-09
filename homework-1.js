
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 1. Билетная касса

function ticketPrice(category) {
    switch (category) {
        case 1:
            return 300;
        case 2:
            return 500;
        case 3:
            return 900;
        default:
            return 0;
    }
}

function maxTickets(budget, price) {
    let count = 0;

    while (budget >= price && price > 0) {
        budget -= price;
        count++;
    }

    return count;
}

function printTicketResult(category, budget) {
    let price = ticketPrice(category);

    if (price === 0) {
        console.log('неизвестная категория');
    } else {
        let count = maxTickets(budget, price);

        console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
    }
}

// 2. Доставка заказа

function deliveryPrice(distance, total) {
    if (total >= 3000) {
        return 0;
    }

    if (distance <= 3) {
        return 0;
    } else if (distance <= 10) {
        return 200;
    } else {
        return 200 + (distance - 10) * 25;
    }
}

function printDelivery(distance, total) {
    let price = deliveryPrice(distance, total);

    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

// 3. Лестница

function printSteps(height) {
    let count = 0;

    for (let i = 1; i <= height; i++) {

        if (i === 4) {
            continue;
        }

        if (i > 10) {
            console.log('Дальше лестница не построена');
            break;
        }

        console.log(`Ступень ${i}`);
        count++;
    }

    console.log(`Всего построено: ${count}`);
}

// Главное меню

console.log('Выберите задачу:');
console.log('1 — билетная касса');
console.log('2 — доставка заказа');
console.log('3 — лестница');

rl.question('Ваш выбор: ', function(choice) {

    switch (Number(choice)) {

        case 1:
            rl.question('Категория билета: ', function(category) {

                rl.question('Бюджет: ', function(budget) {

                    printTicketResult(Number(category), Number(budget));
                    rl.close();

                });

            });
            break;

        case 2:
            rl.question('Расстояние: ', function(distance) {

                rl.question('Сумма заказа: ', function(total) {

                    printDelivery(Number(distance), Number(total));
                    rl.close();

                });

            });
            break;

        case 3:
            rl.question('Высота лестницы: ', function(height) {

                printSteps(Number(height));
                rl.close();

            });
            break;

        default:
            console.log('такой задачи нет');
            rl.close();
    }

});

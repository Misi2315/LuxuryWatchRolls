document.addEventListener("DOMContentLoaded", () => {
    const cartImage = document.querySelector(".cartImage");
    const newImageURL = "https://blogger.googleusercontent.com/img/a/AVvXsEgz8xZgDXpne-dmMQyPaIXaccsvJCK8F9iJrBwhizXzOYfsn5nKWvWGJobPKj6aoApjC9x-wI-3VkSOtBCkTZSHfNpERxiKpytjLVSESWm57g9Tpv8zCebVBcHjxNCRh02KB9LSaQ2uDrDmDIwgxc3Jr4_z-TaXwznA9mwKUoGq-IlSCSDp74rQgRrM-Xc";

    cartImage.addEventListener("click", () => {
        // Animáció hozzáadása
        cartImage.classList.add("animate");

        // Kép cseréje az animáció után
        setTimeout(() => {
            cartImage.src = newImageURL;

            // Az animációs osztály eltávolítása
            setTimeout(() => {
                cartImage.classList.remove("animate");
            }, 500);
        }, 500);
    });
});
document.querySelector(".homeKépGomb").addEventListener("click", function() {
    document.getElementById("timeModal").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("timeModal").style.display = "none";
});

document.getElementById("timeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const hour = parseInt(document.getElementById("hour").value, 10) || 0;
    const minute = parseInt(document.getElementById("minute").value, 10) || 0;

    document.getElementById("timeModal").style.display = "none";

    // Frissítjük az óra mutatóit
    setClockHands(hour, minute);
});

document.getElementById("gombCatalog").addEventListener("click", function() {
    document.getElementById("homePage").style.display = "none"
    document.getElementById("citizenPage").style.display = "none";
    document.getElementById("cartierPage").style.display = "none";

    document.getElementById("catalogPage").style.display = "block";
    document.getElementById("alsoHatter").style.display = "block";
});
document.getElementById("backGomb").addEventListener("click", function() {
    document.getElementById("homePage").style.display = "none"
    document.getElementById("citizenPage").style.display = "none";
    document.getElementById("cartierPage").style.display = "none";

    document.getElementById("catalogPage").style.display = "block";
    document.getElementById("alsoHatter").style.display = "block";
});
document.getElementById("backGomb2").addEventListener("click", function() {
    document.getElementById("homePage").style.display = "none"
    document.getElementById("citizenPage").style.display = "none";
    document.getElementById("cartierPage").style.display = "none";

    document.getElementById("catalogPage").style.display = "block";
    document.getElementById("alsoHatter").style.display = "block";
});

document.getElementById("homeBuyGomb").addEventListener("click", function() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("citizenPage").style.display = "none";
    document.getElementById("cartierPage").style.display = "none";

    document.getElementById("catalogPage").style.display = "block";
    document.getElementById("alsoHatter").style.display = "block";
});

document.getElementById("gombHome").addEventListener("click", function() {
    document.getElementById("catalogPage").style.display = "none";
    document.getElementById("alsoHatter").style.display = "none";
    document.getElementById("citizenPage").style.display = "none";
    document.getElementById("cartierPage").style.display = "none";

    document.getElementById("homePage").style.display = "block";
});
document.getElementById("citizenKep").addEventListener("click", function() {
    document.getElementById("catalogPage").style.display = "none";
    document.getElementById("alsoHatter").style.display = "none";
    document.getElementById("homePage").style.display = "none";
    document.getElementById("cartierPage").style.display = "none";

    document.getElementById("citizenPage").style.display = "block";
});
document.getElementById("cartierKep").addEventListener("click", function() {
    document.getElementById("catalogPage").style.display = "none";
    document.getElementById("alsoHatter").style.display = "none";
    document.getElementById("homePage").style.display = "none";
    document.getElementById("citizenPage").style.display = "none";

    document.getElementById("cartierPage").style.display = "block";
});

document.getElementById("logo-image").addEventListener("click", function() {
    document.getElementById("catalogPage").style.display = "none";
    document.getElementById("alsoHatter").style.display = "none";
    document.getElementById("citizenPage").style.display = "none";
    document.getElementById("cartierPage").style.display = "none";

    document.getElementById("homePage").style.display = "block";
});

let isAutomaticTime = true; // Az automatikus időszinkronizáció vezérlése
let customTime = { hours: 0, minutes: 0, seconds: 0 }; // Tárolja az egyéni időt

document.querySelector(".homeKépGomb").addEventListener("click", function () {
    document.getElementById("timeModal").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("timeModal").style.display = "none";
});

document.getElementById("timeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const hour = parseInt(document.getElementById("hour").value, 10) || 0;
    const minute = parseInt(document.getElementById("minute").value, 10) || 0;

    // Kapcsoljuk ki az automatikus időfrissítést, és állítsuk be az egyéni időt
    isAutomaticTime = false;
    customTime.hours = hour;
    customTime.minutes = minute;
    customTime.seconds = 0; // Kezdje az egyéni időt 0 másodpercről

    setClockHands(customTime.hours, customTime.minutes, customTime.seconds);

    document.getElementById("timeModal").style.display = "none";
});

// Visszakapcsolás az automatikus időre
document.getElementById("resetToAutoTime").addEventListener("click", function () {
    isAutomaticTime = true; // Vissza az automatikus időre
    document.getElementById("timeModal").style.display = "none"; // Bezárja a modális ablakot
});

// Az óra automatikus frissítése
function updateClock() {
    if (isAutomaticTime) {
        const now = luxon.DateTime.now().setZone('Europe/Budapest');
        const hours = now.hour % 12;
        const minutes = now.minute;
        const seconds = now.second;

        setClockHands(hours, minutes, seconds);
    } else {
        // Ha az automatikus frissítés leállt, manuálisan léptetjük az egyéni időt
        customTime.seconds += 1;
        if (customTime.seconds >= 60) {
            customTime.seconds = 0;
            customTime.minutes += 1;
        }
        if (customTime.minutes >= 60) {
            customTime.minutes = 0;
            customTime.hours = (customTime.hours + 1) % 12;
        }

        setClockHands(customTime.hours, customTime.minutes, customTime.seconds);
    }
}

// A mutatók frissítése
function setClockHands(hours, minutes, seconds = 0) {
    const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    document.getElementById("hour-hand").style.transform = `rotate(${hourAngle}deg)`;
    document.getElementById("minute-hand").style.transform = `rotate(${minuteAngle}deg)`;
    document.getElementById("second-hand").style.transform = `rotate(${secondAngle}deg)`;
}

setInterval(updateClock, 1000);
updateClock();

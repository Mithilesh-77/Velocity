
const cars = [
    {
        name: "PORSCHE 911",
        category: "ICONIC PERFORMANCE",
        description: "A timeless expression of performance, precision and design.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1500&q=85"
    },
    {
        name: "GRAND TOURER",
        category: "REFINED ELEGANCE",
        description: "Luxury and sophistication shaped for unforgettable journeys.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1500&q=85"
    },
    {
        name: "PERFORMANCE X",
        category: "MODERN ENGINEERING",
        description: "A bold combination of contemporary design and power.",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1500&q=85"
    },
    {
        name: "VELOCITY GT",
        category: "PURE AUTOMOTIVE ART",
        description: "A striking machine created to inspire every drive.",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1500&q=85"
    }
];

let currentCar = 0;

const carImage = document.getElementById("carImage");
const carName = document.getElementById("carName");
const carCategory = document.getElementById("carCategory");
const carDescription = document.getElementById("carDescription");
const carCounter = document.getElementById("carCounter");
const rotationCar = document.getElementById("rotationCar");

function showCar(index) {
    currentCar = (index + cars.length) % cars.length;

    const car = cars[currentCar];

    rotationCar.classList.add("changing");

    setTimeout(() => {
        carImage.src = car.image;
        carImage.alt = car.name;
        carName.textContent = car.name;
        carCategory.textContent = car.category;
        carDescription.textContent = car.description;

        carCounter.textContent =
            `0${currentCar + 1} / 0${cars.length}`;

        rotationCar.classList.remove("changing");
    }, 250);
}

document.getElementById("nextCar").addEventListener("click", () => {
    showCar(currentCar + 1);
});

document.getElementById("previousCar").addEventListener("click", () => {
    showCar(currentCar - 1);
});

showCar(0);

// AUTOMATIC CAR ROTATION

let autoRotation = setInterval(() => {
    showCar(currentCar + 1);
}, 5000);

// Pause automatic rotation when user interacts
document.getElementById("nextCar").addEventListener("click", () => {
    clearInterval(autoRotation);
});

document.getElementById("previousCar").addEventListener("click", () => {
    clearInterval(autoRotation);
});

const container = document.querySelector('.container');

// store all available seat
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// console.log(seats);

// store  seat and total price
const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

// change movieSelect price string to int
let price = +movieSelect.value;



// make sure that you can only click an available seat not occupied
container.addEventListener('click',e=> {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelected();
    }
})

// fix the bug when change the movie but the price not change
movieSelect.addEventListener('change', e => {
    price = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelected();
})

function updateSelected() {
    // store seat count that u select
    const selectedSeat = document.querySelectorAll('.row .seat.selected');
    // count seat that u select
    const countSeat = selectedSeat.length;

    // get the selected seat index for local storage
    const seatsIndex = [...selectedSeat].map(seat => [...seats].indexOf(seat));
    // console.log(seatsIndex);
    localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));

    // show seat on page
    count.innerText = countSeat;
    // show total price
    total.innerText = countSeat * price;


}

// store movie in local storage
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem("movieIndex",movieIndex);
    localStorage.setItem("moviePrice",moviePrice);
}


// show local storage data to UI
function showDataToUI () {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    
    const selectMovieIndex = localStorage.getItem("movieIndex"); //index of select movie

    seats.forEach((seat,index) => {
        if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected')
        }
    });
    if (selectMovieIndex != null) {
        movieSelect.selectedIndex = selectMovieIndex;
    }
}


showDataToUI();
updateSelected();
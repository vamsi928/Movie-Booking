const movie = document.getElementById("name");
const count = document.getElementById("count");
const totalPrice = document.getElementById("price");
const seats = document.querySelectorAll(".row .seat");
const container = document.querySelector(".screen-container");

PopulateUI(); //calling it at the start of file to get anything from local storage
let moviePrice = Number(movie.value);

//Selecting seats
function selectSeats() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); //getting all the seats with class selected
  //for local storage getting the indexes of current selected seats
  const seatsIndex = [...selectedSeats].map((seat, i) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //local storage takes in a key value pair and value should be in string so using JSON.stringify
  const selectedCount = selectedSeats.length;
  count.textContent = selectedCount;
  totalPrice.textContent = selectedCount * moviePrice;
  setMovieData(movie.selectedIndex, movie.value);
}

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//get data from localStorage and populate UI
function PopulateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedSeats && selectedSeats.length > 0) {
    selectedSeats.map((seatNumber) =>
      [...seats].find((seat, i) =>
        Number(seatNumber) === i ? seat.classList.add("selected") : ""
      )
    );
    movie.selectedIndex = Number(selectedMovieIndex);
  }
}

//event listener for each seat
seats.forEach((seat) => {
  if (!seat.classList.contains("occupied")) {
    seat.addEventListener("click", (e) => {
      e.target.classList.toggle("selected");
      selectSeats();
    });
  }
});

//event listener for select option value change
movie.addEventListener("change", (e) => {
  setMovieData(e.target.selectedIndex, e.target.value);
  moviePrice = Number(e.target.value);
  selectSeats();
});

selectSeats();

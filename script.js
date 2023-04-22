const container = document.querySelector('.container')
const count = document.querySelector('#count')
const amount = document.getElementById('amount')

const seats = document.querySelectorAll('.seat:not(.reserved)')

const select = document.getElementById('movie')
container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected')
        calculateTotal()
    }
})


select.addEventListener('change', function(e){
    calculateTotal()
})

function calculateTotal() {

    console.log(seats)
    const selectedSeats = container.querySelectorAll('.seat.selected')
    
    const selectedSeatCount = selectedSeats.length
    console.log(selectedSeatCount)


    const selectedSeatsArr=[]
    const seatsArr = []

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat)
        console.log(selectedSeatsArr)
    })

    seats.forEach(function(seat){
        seatsArr.push(seat)
    })

    let selectedIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat)
    })

    // console.log(selectedIndexs);aa
    count.innerText = selectedSeatCount
    amount.innerText = selectedSeatCount*select.value

    saveToLocaleStorage(selectedIndexs)

}   

getFromLocalStorage()
calculateTotal()


function saveToLocaleStorage(indeks) {
    localStorage.setItem('selectedSeats', JSON.stringify(indeks))
    localStorage.setItem('selectedMovieIndex', select.selectedIndex)
}

function  getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex
    }


}



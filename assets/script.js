// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  //selects all .saveBtn class and adds an event listener to them
  document.querySelectorAll(".saveBtn").forEach(elem => elem.addEventListener("click", saveText));

  function saveText () {
    //gets the id of the parent element, which contains the hour
    var id = $(this).parent().attr("id");
    //gets the value in textarea, which is the previous sibling of our current element
    var text = $(this).prev().val();
    //sets the id (hour) and text (user input) to local storage
    localStorage.setItem(id, text);
  }
  
  //select all time blocks
  var allBlocks = document.querySelectorAll(".time-block");
  //runs compareTime function on each block
  allBlocks.forEach(compareTime);
  //runs getFromStorage on each block
  allBlocks.forEach(getFromStorage);

  function compareTime (item) {
    var currentHour = dayjs().hour();
    //selects characters in the id starting at the 5th index, which should return the hour (i.e. 12)
    var currentBlock = item.id.slice(5);

    //checks the current hour vs the block's hour and adds styling accordingly
    if (currentBlock == currentHour) {
      item.classList.add("present");
    } else if (currentBlock < currentHour) {
      item.classList.add("past");
    } else {
      item.classList.add("future");
    }
  }

  //gets each item from storage and then puts its value in corresponding textarea
  function getFromStorage (item) {
    var currentItem = localStorage.getItem(item.id);
    item.querySelector("textarea").value = currentItem;
  }

  //shows current date in currentDay element at top of page
  document.getElementById("currentDay").innerHTML = dayjs().format('dddd, MMMM DD');
});

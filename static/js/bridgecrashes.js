// window.onload = function() {
//   var rows = document.querySelectorAll('tr:not(.header)');

//   for (var i = 0; i < rows.length; i++) {
//     rows[i].style.display = 'none';
//   };
// }

function ContactsearchFX() {
  var input, filter, table, tr, td, i;
 
  input = document.getElementById("myInput");

  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[6];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } 
      else {
        tr[i].style.display = "none";
      };
    };
  };
  
  var rows = document.querySelectorAll('tr:not(.header)');
   
  if (input.value.length == 0) {
    for (var i = 0; i < rows.length; i++) {
      rows[i].style.display = 'none';
    };
  };
};
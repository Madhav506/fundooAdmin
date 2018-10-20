/**configures metadata for an Angular component. Component decorator and metadata */
/**A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Define an ngOnInit() method to handle any additional initialization tasks. */
import { Component, OnInit } from '@angular/core';
/** jQuery is to make it much easier to use JavaScript on website. */
/**importing jquery in admin dashboard component */
/**$ is shorthand in jQuery for window.jQuery */
import * as $ from "jquery";
import 'datatables.net'
/** @Component decorator identifies the class below it as a component class, and specifies its metadata. */
@Component({
  /**Selector used to create instance and insert this component where it finds corresponding html template */
  selector: 'app-admindashboard',
  /**defines host view */
  templateUrl: './admindashboard.component.html',
  /**defines css styles of this component */
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor() { }
  /**ngonInit is life cycle hook ngOnInit() called by Angular to indicate that angualar done with intialization */
  ngOnInit() {

    /**calling jQuery's $ function, passing to it the document object */
    /** ready event occurs when the DOM loaded */
    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var userDetails = [];

      /**AJAX is a technique for accessing web servers from a web page. */
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/user/getAdminUserList',
        dataType: "json",


        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */

        success: function (response) {

          console.log("successfull");
          console.log(response);
          for (var i = 0; i < response.data.data.length; i++) {
            userDetails.push([i, response.data.data[i].firstName, response.data.data[i].lastName, response.data.data[i].email, response.data.data[i].service]);
          }

          var users = $('#example').DataTable({
            data: userDetails,
            scroller: true,
            scrollY: 200,
          });

          /**var table = $('#example').DataTable();
           
          $('#example tbody').on( 'click', 'tr', function () {
          alert( 'Row index: '+table.row( this ).index() );
          } ) */

          $('#example tbody').on('click', 'tr', function () {
            $("#pop").click();
            /**Get the row index of the row column,returns integer */
            var userArrayIndex = users.row(this).index();
            $("#name").text(response.data.data[userArrayIndex].firstName);
            $("#firstName").text(response.data.data[userArrayIndex].firstName);
            $("#lastName").text(response.data.data[userArrayIndex].lastName);
            $("#role").text(response.data.data[userArrayIndex].role);
            $("#services").text(response.data.data[userArrayIndex].service);
            $("#createdDate").text(response.data.data[userArrayIndex].createdDate);
            $("#email").text(response.data.data[userArrayIndex].email);

          });

          return false;

        },

      })

      $.ajax({
        type: "GET",/**get  the data */
        url: 'http://34.213.106.173/api/user/UserStatics',
        headers: {
          'Authorization': token,


        },
        error: function (response) {/**if error exists then print the message */
          console.log('Error in login');

        },
        success: function (response) {
          console.log("successfull");
          console.log(response);
          var arr = response.data.details;
          var html = '';
          for (let index = 0; index < arr.length; index++) {
            html += "<div class='card col-sm-3 text-center  mt-4  ml-auto mr-auto'  style='background-color:#3b5998;font-family:cursive;font-size:15px;font-weight:bold' >";
            html += "<div class='card-header mt-3 text-uppercase' style='background-color: white'>" + arr[index].service + "</div>";
            html += "<div class='card-body'  style='background-color:#3b5998;color:white;font-size:16px' >" + arr[index].count + "</div>";
            html += "</div>";
            $("#service").html(html);

          }
        }

      })
      $('#signout').click(function () {

        $.ajax({
          type: "POST",
          url: 'http://34.213.106.173/api/user/logout',
          headers: {
            'Authorization': token,


          },
          error: function () {/**if error exists then print the message */
            console.log('Error in logout');
            alert("logout error");
            // localStorage.removeItem('token');

          },
          success: function () {
            console.log("successfull");
            localStorage.removeItem('token');
            window.location.href = "/login"
          }

        })
      })


    });




  }








}

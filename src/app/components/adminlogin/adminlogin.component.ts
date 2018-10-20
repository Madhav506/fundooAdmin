import { Component, OnInit } from '@angular/core';
/** jQuery is to make it much easier to use JavaScript on website. */
/**importing jquery in adminlogin component */
/**$ is shorthand in jQuery for window.jQuery */
import * as $ from "jquery";


/** @Component decorator identifies the class below it as a component class, and specifies its metadata. */
@Component({
  /**Selector used to create instance and insert this component where it finds corresponding html template */
  selector: 'app-adminlogin',
  /**defines host view */
  templateUrl: './adminlogin.component.html',
  /**defines css styles of this component */
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  /**it is called when objects are created */
  constructor() { }
  /**ngonInit is life cycle hook ngOnInit() called by Angular to indicate that angualar done with intialization */
  ngOnInit() {
    var token;
    if (localStorage.getItem('token')) {
      window.location.href = "/dashboard";
    }
    /**calling jQuery's $ function, passing to it the document object */
    /** ready event occurs when the DOM loaded */
    $(document).ready(function () {
      $("#btn").click(function () {
        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();
        var index = email.indexOf("@");
        var dot = email.indexOf(".");
        // console.log(email);
        // console.log(password);
        if (email == "") {
          $("#message").text("Please Enter email,It is required");
        }
        else if (password == "") {
          $("#message").text("Please Enter password");
        }
        else if (index < 1 || dot - index < 2) {
          $("#message").text("Please Enter valid Email");
        }

        if (email) {
          /**AJAX is a technique for accessing web servers from a web page. */
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/user/adminLogin',
            dataType: "json",
            data: {
              "email": email,
              "password": password
            },
            /**error callback of $.ajax if error occcurs */
            error: function (response) {
              console.log('login unsuccessfull');
              $("#message").text("Login unsuccessfull");

            },/**success is callback of $.ajax */
            success: function (response) {
              console.log("login successfull");
              $("#message").text("login Successfull");
              console.log(response)
              localStorage.setItem('token', response.id)

              window.location.href = "/dashboard";
              return false;
            }

          });

        } else {
          $("#message").text("Login Unsuccessfull,invalid credentials");

        } return false;

      });

    });
  }

}
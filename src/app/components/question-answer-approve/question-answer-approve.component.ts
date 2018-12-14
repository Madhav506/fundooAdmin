import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
// import { MatSnackBar } from '@angular/material';

// import{HttpService} from ''
@Component({
  selector: 'app-question-answer-approve',
  templateUrl: './question-answer-approve.component.html',
  styleUrls: ['./question-answer-approve.component.css']
})
export class QuestionAnswerApproveComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {

    /**calling jQuery's $ function, passing to it the document object */
    /** ready event occurs when the DOM loaded */
    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var    questionArray = [];

      /**AJAX is a technique for accessing web servers from a web page. */
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType: "json",
        headers: {
          'Authorization': token,
        },
      
        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */

        success: function (response) {
          $("#showLoader").hide();
          var questionId=[];
          console.log("successfull");
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            questionArray.push([i+1, response.data[i].message,]);
            questionId.push(response.data[i])
          }
          // this.showLoader=false;
          var questionArray1 = $('#example').DataTable({
            data: questionArray,
            scroller: true,
            scrollY: 300,
            scrollX:false,
            "columns":[
              {"width":"10%"},
              {"width":"70%"},
              {"width":"20%"},
            ],
            // // responsive: true,
            autowidth:true,
            "columnDefs": [ {
              "targets": -1,
              "defaultContent": 
              '<div class="btn-group">'+
              '<button class="newBtn btn btn-sm btn-primary" style=" background-color: #3b5998;" type="button">Approve</button>'+'<div>'+'</div>'
              + '<button class="Mybtn btn btn-sm  btn-primary" style="margin-left:10px; background-color:  #3b5998;"  type="button">Reject</button>'
              +'</div>'
         } ]
          });
 parent;
    $('#example').on('click', '.newBtn', function () {

      var RowIndex = $(this).closest('tr');
      var data = questionArray1.row(RowIndex).data();
    
      for (var i = 0; i < questionId.length; i++) {
     if(data[1] == questionId[i].message){
        this.parent=questionId[i].id;
        
      }

      }

      $.ajax({
        type: 'POST',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/'+this.parent,
        dataType: "json",
        isApproved:true,
        headers: {
          'Authorization': token,
        },
       
  
        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */
        success: function (response) {
          console.log('success',response);
          console.log(response.data);
          $.toaster({ message : 'Your message approved' });
          location.reload(true); 

        }

      });
     
    
  });
  var  parentNew;
  $('#example').on('click', '.Mybtn', function (e) {

    var RowIndex = $(this).closest('tr');
    var data = questionArray1.row(RowIndex).data();
    // console.log('questioniduyhj',data);
    // console.log('questionid...',questionId[0].id);

    for (var i = 0; i < questionId.length; i++) {
   if(data[1] == questionId[i].message){
      this.parentNew=questionId[i].id;

    }

    }
    console.log('questionid...',this.parentNew);

    $.ajax({
      type: 'POST',
      url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/'+this.parentNew,
      dataType: "json",
      headers: {
        'Authorization': token,
      },
    
      /**error callback of $.ajax if error occcurs */
      error: function (response) {
        console.log('error');
        return false;

      },/**success is callback of $.ajax */
      success: function (response) {
        console.log('success',response);
        console.log(response.data);
        $.toaster({ message : 'Your message Rejected' });

        location.reload(true); 


      }

    });
   
  
});
          return false;

        },

      });

     
    });
    $("#dashboard").click(function(){
      $(location).attr('href','dashboard');
    });
  

  }

 




}

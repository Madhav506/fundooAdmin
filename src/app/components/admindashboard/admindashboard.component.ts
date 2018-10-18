import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";


import 'datatables.net'
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})

export class AdmindashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      var token=localStorage.getItem('token');
      var data=[];
      
     
        $.ajax({
          type:'GET',
    url:'http://34.213.106.173/api/user/getAdminUserList',
    dataType:"json",
   
    /**error callback of $.ajax if error occcurs */
    error:function(response){
      console.log('error');
      return false;

    },/**success is callback of $.ajax */
    success:function(response){
      
      console.log("successfull");
      console.log(response);
      for ( var i=0 ; i<response.data.data.length ; i++ ) {
        data.push( [ i,response.data.data[i].firstName,response.data.data[i].lastName,response.data.data[i].email,response.data.data[i].service ] );
    }
    $('#example').DataTable( {
      data:           data,
     
      scroller:true,
      scrollY:200
      
    
  } );
      return false;
    }
    
    
          
        })

        $.ajax({
          type: "GET",/**get  the data */
          url:'http://34.213.106.173/api/user/UserStatics',
        headers:{
            'Authorization':token,
  
  
          },
        
      
        error:function(response){/**if error exists then print the alert */
          console.log('Error in login');
          alert("Enter all the details");
          
        },
        success:function(response){
          console.log("successfull");
          console.log(response);
          var arr=response.data.details;
          var html='';
          for(let index=0;index<arr.length;index++)
          {
            html+="<div class='card col-sm-3 text-center  mt-4  ml-auto mr-auto'  style='background-color:#3b5998;font-family:cursive;font-size:15px;font-weight:bold' >";
            html+="<div class='card-header' style='background-color: white'>"+arr[index].service+"</div>";
            html+="<div class='card-body'  style='background-color:#3b5998;color:white' >"+arr[index].count+"</div>";
            html+="</div>";
            $("#service").html(html);

          }
        }

      }) 














    
    });




  }








}

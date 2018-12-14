import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-orderproduct',
  templateUrl: './orderproduct.component.html',
  styleUrls: ['./orderproduct.component.css']
})
export class OrderproductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var id=localStorage.getItem("token");
    var rowIndex;
    $("#loader").show();
    $("#cartList").hide();
  $(document).ready(function(){

    
    $("#dashboard").click(function(){
      $(location).attr('href','dashboard');
    });

    $.ajax({
      type: 'GET',
      url: 'http://34.213.106.173/api/productcarts/userCartList',
      headers:{
        "Authorization": id
      },
      //data['data'][i].id
      success: function (data) {
        var cartList=[];
        console.log(data);

        for(let i=0;i<data['data'].length;i++){
          if(data['data'][i].user!=undefined){
          cartList.push([i+1,data['data'][i].user.firstName,data['data'][i].product.name,data['data'][i].price])
          }
          else{
            cartList.push([i+1,'User',data['data'][i].product.name,data['data'][i].price])
          }
        }
        $("#loader").hide();
        $("#cartList").show();

        var table=$('#cartList').DataTable( {
          "data":cartList,
          "columnDefs": [{
            "targets": 4,
            "render": function ( data, type, row, meta ) {
              return '<button type="button" class="btn  btn-primary" id="place" style="background-color: #3b5998">PlaceOrder</button>'
              +'<button type="button" class="btn  btn-primary" style="margin-left:10px;background-color: #3b5998" id="reject" style="background-color: #3b5998">Reject</button>';
            }
          }]
        });

        $('#cartList tbody').on('click', 'tr', function () {
          rowIndex = table.row(this).index();
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/productcarts/adminCompleteOrder',
            data:{
              "cartId": data['data'][rowIndex].id
            },
            dataType:"json",
            headers:{
              "Authorization": id
            },
            success: function (data) {
              $(location).attr('href','cart');
              // window.location.href = "/cart";
            },
            error: function (request, status, error) {
            }
          })
        });


        /********************************************************************************************/
        $('#reject tbody').on('click', 'tr', function () {
          rowIndex = table.row(this).index();
          $.ajax({
            type: 'POST',
            url: 'http://34.213.106.173/api/productcarts/adminCancelOrder',
            data:{
              "cartId": data['data'][rowIndex].id
            },
            dataType:"json",
            headers:{
              "Authorization": id
            },
            success: function (data) {
              $(location).attr('href','cart');
              // window.location.href = "/cart";
            },
            error: function (request, status, error) {
            }
          })
        });
        /********************************************************************************************/

      },
      error: function (request, status, error) {
      }
    });

  });
}
}
// $("#logout").click(function(){
    //   $.ajax({
    //     type: 'POST',
    //     url: 'http://34.213.106.173/api/user/logout',
    //     headers:{
    //       "Authorization": id
    //     },
    //     success: function (data) {
    //       window.location.href = "/login";
    //       localStorage.removeItem("token");
    //     },
    //     error: function (request, status, error) {
    //     }
    //   });
    // });
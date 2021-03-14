// import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
// import '@laylazi/bootstrap-rtl-scss/scss/bootstrap-rtl.scss';
import './scss/style.scss';
import './css/style.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min';
import 'normalize.css/normalize.css';

$(function(){
      $('[data-toggle="tooltip"]').tooltip();

      $(".add-to-cart-btn").on("click" , function(){
       alert("أضيف المنتج إلي عربة الشراء");
      });
      $("#copyright").text("  جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear());
      
      $('.product-option input[type="radio"]').change(function() {
        $(this).parents(".product-option").siblings().removeClass("active");
        $(this).parents(".product-option").addClass("active");
      });



    $("[data-product-quantity]").on( "change" , function() {
      // عدد المنتجات
      var newQuantity = $(this).val();
      // البحث عن السطر الذي يحتوي على معلومات المنتج
      var parent = $(this).parents("[data-product-info]");
      // سعر المنتج الواحد
      var pricePerUnit = parent.attr("data-product-price");
      // اجمالى سعر المنتجات
      var totalPriceForProduct = newQuantity * pricePerUnit ;
      parent.find(".total-price-for-product").text(totalPriceForProduct + "$"); 
      calculate();
    });

    $("[data-remove-from-cart]").on("click" , function(){
      // تحديد السطر المراد حذفه
      $(this).parents( "[data-product-info]").remove();
      calculate() ;
    });
    
    
  function calculate() {
    // انشيء متغير جديد لحفظ السعر الأجمالي
var totalPriceForAll = 0;
// لكل سطر يمثل معلومات المنتج في الصفحة   
if(!$("[data-product-info]").length) {
  return $("#total-price-for-all").text("0 $");
}
$("[data-product-info]").each(function(){
  // سعر القطعة الواحدة فى السطر
var pricePerUnit = $(this).attr("data-product-price");
// عدد المنتجات فى السطر الواحد
var quantity = $(this).find("[data-product-quantity]").val();
// اجمالي سعر المنتج الواحد
var totalPriceForProduct = pricePerUnit * quantity;
// سعر الاجمالي للمنتجات كلها عن طريق السعر الاجمالي للمنتج +سعر المنتجات كلها التى قيمتها الافتراضية =0
// totalPriceForAll = totalPriceForAll + totalPriceForProduct;
totalPriceForAll =   totalPriceForAll + (totalPriceForProduct);
$("#total-price-for-all").text(totalPriceForAll + "$");

});
  }
  
  var citiesByCountry = {
    sa:["الرياض" , "جدة"],
    eg:["القاهرة" , "الإسكندرية"],
    jo:["عمان" , "الزرقاء"],
    sy:["دمشق" , "حلب" , "حماة"]
  }
                                  // عندما يتغير البلد
  $("#form-checkout select[name = 'country']").change(function() {
                // أجلب أسم الدولة
            var country = $(this).val();
            // جلب مدن هذا البلد من المصفوفة
          var cities =   citiesByCountry[country];
                    // تفريغ قائمة المدن
          $("#form-checkout select[name = 'city']").empty();
                          // أضافة خيار أختر مدينة
          $("#form-checkout select[name = 'city']").append(
            "<option value= ' ' disabled selected>أختر المدينة</option>"
          );
                                  // أضف المدن إلي قائمة المدن
          cities.forEach(function(city) {
            var newOption = $("<option></option>");
            newOption.text(city);
            newOption.val(city);
            $("#form-checkout select[name = 'city']").append(newOption);
          });
  });
    $("#form-checkout input[name='payment_method']").change(function() {
                // جلب القيمة المختارة حاليا
      var paymentMethod = $(this).val();
      if(paymentMethod =="on_delivery"){

        $("#credit-card-info input").prop("disabled" , true);

      }

      else{

        $("#credit-card-info input").prop("disabled" , false);

      }
          // تبديل معلومات البطاقة
      $("#credit-card-info").toggle();

    });
    $( "#price-range" ).slider({
      range: true,
      min: 50,
      max: 1000,
      step:50,
      values: [ 250, 800 ],
      slide: function( event, ui ) {
        $("#price-min").text(ui.values[ 0 ]);
        $("#price-max").text(ui.values[1]);
      }
    });

});




$(document).on("click","#leyout-left-menu",function(){
   let hideLeftButton = document.getElementById("leyout-left-menu");
   console.log(hideLeftButton .innerHTML.toString())
   if( hideLeftButton.innerHTML == '&lt;&lt;'){// if innerHtml == <<
      $("#left-menu-leyout").css(
         {
            "width":"0px"
         });
      
         $(".right-menu").css("margin-left","0px")
      
         $("#leyout-left-menu").css({
            "left":"0px"
         })
          
   hideLeftButton.innerHTML = '>>';
   }
   else{
      $("#left-menu-leyout").css(
         {
            "width":"300px"
         });
      
         $(".right-menu").css("margin-left","300px")
      
         $("#leyout-left-menu").css({
            "left":"238px"
         })
         hideLeftButton.innerHTML = '<<';
   }
   
 
})

dictionarytable = () => $("#table-dictionary-english").ready(function(){

   let table = $("#table-dictionary-english").DataTable({
      "bInfo" : false,
      "info": false,
      "lengthChange": false,
      "paging": true,
      "pagingType": "simple",
      "oLanguage": {
         "sSearch": "",
        
       },
       
       language: {
         searchPlaceholder: "Search records",
        
         paginate: {
            
            next: '<span class="glyphicon glyphicon-menu-right">Next</span>',
            previous: '<span class="glyphicon glyphicon-menu-left">Back</span>'
        }
     },
     
          "ajax": {
          "url": "/dictionary/index.json"
      },
       "columns":[
          {"data": "id"},
          {"data": "word"},
          {"data": "translate"},
          {
           "data": null,
           "className": "dt-center editor-delete",
           "defaultContent": '<a>Delete</a>',
           "orderable": false
          },
          {
           "data": null,
           "className": "dt-center editor-edit",
           "defaultContent": '<a>Edit</a>',
           "orderable": false
          },
       ]
   });

     $(document).on('click','.editor-delete',function(e) {
              Confirm.open({
               
                classblock:"main-leyout",
                message: "Are you sure?",
                title: "You want delete this word?",
                yes:"Delete",
                no: "Cansel",
                onok: () => {
                      var row = $(this).closest('tr');         
                      var id = table.row( row ).data().id.toString();
                      let form = document.createElement("form");
                      form.method = "POST";
                      form.action = `/dictionary/destroy/${id}`;
                      form.style = "display: none;";
                      let methodInput = document.createElement("input");
                      methodInput.value = "DELETE";
                      methodInput.name = "Delete";
                      form.appendChild(methodInput);
                      document.body.appendChild(form);
                      form.submit();         
                 }
                })
         });

         $('#myInputTextField').keyup(function(){
            table.search($(this).val()).draw() ;
      })
         $(document).on('click','.editor-edit',function(e)
         {
            var row = $(this).closest('tr');         
            var id = table.row( row ).data().id.toString();
            let html =  `
         
            <div id='edit-form' class = "dictionary-edit-form">
            <div class = "dictionary-edit-block">
               <h3>Enter word</h3>
               <input type="text" id="word"  name="english_dictionary[word]" value ="${table.row( row ).data().word.toString()}">
            </div>
            <div class = "dictionary-edit-block">
               <h3>Enter translate </h3>
               <input type="text" id="translate" name="english_dictionary[translate]" value="${table.row(row).data().translate.toString()}">
            </div>
            <div class = "dictionary-edit-buttons">
            <a id ="edit-cansel">Cansel</a>
            <a type="submit" id="edit-ok">Submit</a>
            </div>
         </div>`;
            EditForm.open({
               classblock:"main-container",
               html: html,
               onok: () =>{
                  let word = document.getElementById("word");
                  let translate = document.getElementById("translate");
                  inputs = [word,translate];
                  let form = document.createElement("form");
                      form.method = "POST";
                      form.action = `/dictionary/edit/${id}`;
                      form.style = "display: none;";
                      for(let i = 0; i < inputs.length;i++) //can be make better (-time)
                      {
                        let methodInput = document.createElement("input");
                        methodInput.value = inputs[i].value;
                        methodInput.name = inputs[i].name;
                        form.appendChild(methodInput);
                      }
                      document.body.appendChild(form);
                      form.submit();       
               }
            })
         });
});


var EditForm = {
   open (options) {  
      options = Object.assign({}, {
         title: '',
         message: '',
         classblock: '',
         okText: 'OK',
         cancelText: 'Cancel',
         yes: '',
         no: '',
         html: '',
         onok: function () {console.log("delete")},
         oncancel: function () {console.log("cansel")}
      }, options);

      
      const template = document.createElement('template')
      template.innerHTML = options.html;
      console.log(template)
      const confirmEl  = template.content.querySelector('#edit-form');
      const bntNo      = template.content.querySelector('#edit-cansel');
      const bntYes     = template.content.querySelector('#edit-ok');
      confirmEl.addEventListener('click', e => {
         if (e.target === confirmEl) {
            options.oncancel();
            this._close(confirmEl,options.classblock);
         }
      });
      bntYes.addEventListener('click', () => {
         options.onok();
         this._close(confirmEl,options.classblock);
      });
      bntNo.addEventListener('click', () => {
            options.oncancel();
            this._close(confirmEl,options.classblock);
         });
      var main_page = document.body.getElementsByClassName(options.classblock)[0];

      main_page.appendChild(template.content);
   },
   _close(confirmEl,classname)
   {
      let main_page = document.body.getElementsByClassName(classname)[0];
      
      main_page.removeChild(confirmEl);
      confirmEl.classList.add('confirm--close');
     
   }
}


var Confirm = {
   open (options) {

      
   options = Object.assign({}, {
      title: '',
      message: '',
      classblock: '',
      okText: 'OK',
      cancelText: 'Cancel',
      yes: '',
      no: '',
      onok: function () {console.log("delete")},
      oncancel: function () {console.log("cansel")}
   }, options);



   const html = `
   <div class="user-alert-warning">
         <p class="warning-text"><span>${options.title}</span>${options.message}</p>
         <div class="warning-buttons">
            <a style ='cursor: pointer;' id = warning-cansel>${options.no}</a>
            <a style ='cursor: pointer;' id = warning-delete>${options.yes}</a>
         </div>
   `;
   const template = document.createElement('template')

   template.innerHTML = html;

   const confirmEl  = template.content.querySelector('.user-alert-warning');
   const bntNo      = template.content.querySelector('#warning-cansel');
   const bntYes     = template.content.querySelector('#warning-delete');


   confirmEl.addEventListener('click', e => {
      if (e.target === confirmEl) {
         options.oncancel();
         this._close(confirmEl,options.classblock);
      }
   });

   bntYes.addEventListener('click', () => {
      options.onok();
      this._close(confirmEl,options.classblock);
   });
   bntNo.addEventListener('click', () => {
         options.oncancel();
         this._close(confirmEl,options.classblock);
      });

      
   var main_page = document.body.getElementsByClassName(options.classblock)[0];

   main_page.appendChild(template.content);

},
   _close(confirmEl,classname)
   {
      let main_page = document.body.getElementsByClassName(classname)[0];
      
      main_page.removeChild(confirmEl);
      confirmEl.classList.add('confirm--close');
     
   }
   
}   
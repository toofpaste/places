
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
};

AddressBook.prototype.addContact = function(contact){
  contact.id = this.assignId();
  this.contacts.push(contact);
};
AddressBook.prototype.assignId = function(){
  this.currentId++;
  return this.currentId;
};
AddressBook.prototype.findContact = function(id){
  for(var i = 0; i < this.contacts.length; i++){
    if(this.contacts[i]){
      if(this.contacts[i].id == id){
        return this.contacts[i];
      }
    }
  };
  return false;
};
AddressBook.prototype.deleteContact = function(id){
  for(var c = 0; c < this.contacts.length; c++){
    if(this.contacts[c]){
      if(this.contacts[c].id == id){
        delete this.contacts[c];

        return true;
      }
    }
  };
  return false;
};

function Contact(firstName, lastName, phoneNumber, image){
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.image = image;
};

Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").fadeIn(1000);
  $(".titleInject").html(contact.firstName + " " + contact.lastName);
  $(".images").html("<img src = " + contact.image + ">");
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");

}



function printContact (printAddress){
  var contactList  = $("#contacts");
  // var targ = $("#images");
  var htmlForContactInfo = "";
  // var imgHtml = "";
  printAddress.contacts.forEach(function(contact){
    htmlForContactInfo += "<p id =" + contact.id + ">" +contact.firstName + " " + contact.lastName +  "</p>";
    // imgHtml += "<img src = " + contact.image + ">";
  });
  contactList.html(htmlForContactInfo);
  // targ.html(imgHtml);
};

function attachContactListeners() {
  // $("ul#contacts").on("click", "li", function() {
  //    addressBook.deleteContact(this.id);
  //    console.log(addressBook);
  //  });
  $("#buttons").on("click", ".deleteButton", function() {
   addressBook.deleteContact(this.id);
   $("#show-contact").hide();
   $("#fuckYou").fadeIn(1);
   $("#fuckYou").fadeOut(1000);
   printContact(addressBook);
 });

  $("#contacts").on("click", "p", function() {
   showContact(this.id);
  });

};


var addressBook = new AddressBook();


$(function () {
    attachContactListeners();
    $("#show-contact").hide();
    $("form#new-contact").submit(function (event) {
        event.preventDefault();

        var inputtedFirstName = $('input#new-first-name').val();
        var inputtedLastName = $('input#new-last-name').val();
        var inputtedPhoneNumber = $('input#new-phone-number').val();
        var imageInput = $('input#new-image').val();
        $("input#new-first-name").val("");
        $("input#new-last-name").val("");
        $("input#new-phone-number").val("");
        $('input#new-image').val("");
        var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, imageInput);
        addressBook.addContact(newContact);
        // console.log(newContact);
        printContact(addressBook);




    });
});

console.log("inside")
$(document).ready(function() {
    //option A
    // user name rule = ^[a-zA-Z0-9\-\_]{3,10}$
    // password rule = ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$
    // email rule = ^(\w|\d|\-|\.){3,}@([a-zA-Z]|[0-9]|\.){3,}\.([a-zA-Z0-9]){2,}
    $("#signup").submit(function(e){
        if ($(".alert") != null) {
            $(".alert").remove()
        }
        
        let username = $("#username").val();
        let password = $("#password").val();
        let email = $("#email").val();
        // console.log(username)
        // console.log(password)
        // console.log(email)
        var nameRegularExpression  = /^([a-zA-Z]|[0-9]|[\-\_]){3,10}$/;
        var passRegularExpression  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
        var emailRegularExpression  = /^(\w|\d|\-|\.){3,}@([a-zA-Z]|[0-9]|\.){3,}\.([a-zA-Z0-9]){2,}$/;
        console.log(username)
        console.log(password)
        console.log(email)
        console.log(nameRegularExpression.test(username))
        console.log(passRegularExpression.test(password))
        console.log(emailRegularExpression.test(email))
        
        if(nameRegularExpression.test(username) && passRegularExpression.test(password) && emailRegularExpression.test(email) ){
            console.log("done")
        }else{
            let divAlert=document.createElement("div")
            divAlert.classList.add('alert','alert-danger')
            divAlert.style.textAlign="center";
            if (!nameRegularExpression.test(username)) {
                divAlert.innerHTML="Wrong username -  username lenght must be more than two and must contains alphapatic and numbers only"
                e.preventDefault(e);
            }else if (!passRegularExpression.test(password)) {
                divAlert.innerText="Wrong password -  passowrd lenght must be more than three and must contains atleast one capital letter, one small letter and one number "
                e.preventDefault(e);
            }else if (!emailRegularExpression.test(email)) {
                divAlert.innerText="Wrong email -  invalid email ex: example@exaple.com"
                e.preventDefault(e);
            }
            let p=document.querySelector(".container")
            let sp=document.querySelector("#signup")
    
            p.insertBefore(divAlert,sp); 
        }
        
    });
});


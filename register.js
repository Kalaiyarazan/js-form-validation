(function(){
    class RegistrationForm{
    constructor(){   
        this.$form=document.querySelector("#registration-form")
        this.$fName=document.querySelector("#fname");
        this.$email=document.querySelector("#email");
        this.$phone=document.querySelector("#phone");
        this.$dob=document.querySelector("#dob");
        this.$gender=document.querySelectorAll(".gender-input");
        this.$expertise=document.querySelectorAll(".expertise-input"); 
        this.$password=document.querySelector("#password"); 
        this.$confirmPassword=document.querySelector("#confirm-password");      
        this.startEventListener()
    }
    startEventListener(){
        this.$form.addEventListener('submit', event=>{
            event.preventDefault();
            this.onSubmit();
        });
    }
    onSubmit(){
        const formValues = this.getFormValues();
        const formStatus = this.validateRegistrationForm(formValues);

        if(formStatus.isValid){
            this.clearErrors();
            this.submitForm(formValues);
        } else{
            this.clearErrors();
            this.highlightErrors(formStatus.result);
        }
        
    }

    getFormValues(){  
        
        const checkArr=[];
                for(var i=0;i<this.$expertise.length;i++){
                    if(this.$expertise[i].type =='checkbox' && this.$expertise[i].checked == true) 
                        checkArr.push(this.$expertise[i].value);}; 

            let genderValue;
            for(var i=0;i<this.$gender.length;i++){
                            if(this.$gender[i].type =='radio' && this.$gender[i].checked == true) 
                                genderValue=this.$gender[i].value};
        return{
            fullname:this.$fName.value,
            email:this.$email.value,
            phone:this.$phone.value,
            dob:this.$dob.value,
            gender:genderValue,
            expertise:checkArr,
            password:this.$password.value,
            confirmpassword:this.$confirmPassword.value,
        } 
    }


    submitForm(formValues){
        console.log("Submition Done");
        console.log(formValues);
    }

    highlightErrors(result){
        if(!result.fullname){
            this.$fName.classList.add('is-invalid');
        }
        if(!result.email){
            this.$email.classList.add('is-invalid');
        } 
        if(!result.phone){
            this.$phone.classList.add('is-invalid');
        }   
        if(!result.dob){
            this.$dob.classList.add('is-invalid');
        }  
        if(!result.gender){
            document.getElementById("gender-error").innerHTML=`<p>Choose atlease one!</p>`;
        } 
        if(!result.expertise){
                   document.getElementById("expertise-error").innerHTML=`<p>Choose atlease one!</p>`;
        }
        if(!result.password){
                   this.$password.classList.add('is-invalid');
        }   
        if(!result.confirmpassword){
            this.$confirmPassword.classList.add('is-invalid');
        }   
        console.log("Error Highlighted");
    }
    clearErrors(){
        this.$fName.classList.remove('is-invalid');
        this.$email.classList.remove('is-invalid');
        this.$phone.classList.remove('is-invalid');
        this.$dob.classList.remove('is-invalid');
        document.getElementById("gender-error").innerHTML=`<p></p>`; 
        document.getElementById("expertise-error").innerHTML=`<p></p>`;
        this.$password.classList.remove('is-invalid');
        this.$confirmPassword.classList.remove('is-invalid');
    }
    
    // Validation Part
    validateRegistrationForm(formValues){
        const result={  
            fullname:validateFullName(formValues.fullname),
            email:validateEmail(formValues.email),
            phone:validatePhone(formValues.phone),
            dob:validateDob(formValues.dob),
            gender:validateGender(formValues.gender),
            expertise:validateExpertise(formValues.expertise),
            password:validatePassword(formValues.password),
            confirmpassword:validateConfirmPassword(formValues.confirmpassword),
        };

        let field;
        let isValid = true;

        for(field in result) {
            isValid = isValid && result[field];
        }
        return{
            isValid, result
        };


        function validateFullName(name){
            return name.length>3;
        }
        function validateEmail(email){
            const emailRegEx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return emailRegEx.test(email);
        }
        function validatePhone(phone){
            const phoneRegEx=/^\d{10}$/ ;
            return phoneRegEx.test(phone);
        }
        function validateDob(dob){
               const dobRegEx=/^\d{4}-\d{2}-\d{2}$/;
               return dobRegEx.test(dob);
        }
        function validateGender(gender){
            return gender=="male" || gender =="female";
        }
        function validateExpertise(expertise){
            return expertise.length!=0;
        }
        function validatePassword(password){
            const passRegEx=/^[a-zA-Z0-9$!@#%^&*()?.,]{8,}/g;
            return passRegEx.test(password);
        }
        function validateConfirmPassword(confirmpassword){
            return password.value==confirmpassword;
        }
     
    }
}
const myRegistrationForm=new RegistrationForm();}) ()
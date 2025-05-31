export const validations={
   name: {
        regex:/^[a-zA-Z0-9_ ]{3,16}$/, 
        message:"A username can contain only letters, digit and underscore between 3-16 characters"
    },
    phoneNumber:{
        regex:/^\+?[0-9]{10,12}$/,
        message:"A phone number can only contain 10 - 12 digits containing +"
    },
   pin: {
  regex: /^[0-9]{4}$/,
  message: "A pin must be 4  digits"
}
}
    



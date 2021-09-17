"use strict";
// Class Definition
var KTResetPassword = function() {
    var _login;
	let HOST_URL = 'http://localhost:4000'
    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';

        _login.removeClass('login-forgot-on');
        _login.removeClass('login-signin-on');
        _login.removeClass('login-signup-on');

        _login.addClass(cls);

        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }

    var _handleSignInForm = function() {
        var validation;

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_signin_form'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Email Address is required'
							}, 
							emailAddress: {
								message: 'Please enter a valid email'
							}
						}
					},
					password: {
						validators: {
							notEmpty: {
								message: 'Password is required'
							}
						}
					}
				},
				plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        $('#kt_login_signin_submit').on('click', function (e) {
            e.preventDefault();
			var icon = "success";
            validation.validate().then(function(status) {
		        if (status == 'Valid') {
					var email = $('input[name="email"]').val()
					var password = $('input[name="password"]').val()
					var data = {email: email, password:password}
					// if the details from the user is valid, then connect to the login API
					fetch(`/login`, {
						method: 'POST', 
						headers: {
							'Content-Type': 'application/json'	
						},
						body: JSON.stringify(data)
					})
						.then(response => response.json())
						.then(data => {
							console.log(data)
							// if unsuccessful then show error message
							if(data.success != true){
								icon = "error"
							}else{
								icon = `success`
								localStorage.setItem('auth_token',data.token)
								localStorage.setItem('user_id', JSON.stringify(data.user))
								
								$.ajax({
									url: "/store_auth_details",
									method: 'POST',
									data: {auth_token: localStorage.getItem('auth_token'), user_role: localStorage.getItem('user_role')}
								}).done(function() {
									$( this ).addClass( "done" );
								});
							}
							swal.fire({
								text: data.message,
								icon: icon,
								buttonsStyling: false,
								confirmButtonText: "Ok, got it!",
								customClass: {
									confirmButton: "btn font-weight-bold btn-light-primary"
								}
							}).then(function() {
								if(icon == "success"){
									window.location.href = "/"
								}
								KTUtil.scrollTop();
							});

						})
				} else {
					swal.fire({
		                text: "Sorry, looks like there are some errors detected, please try again.",
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
                        customClass: {
    						confirmButton: "btn font-weight-bold btn-light-primary"
    					}
		            }).then(function() {
						KTUtil.scrollTop();
					});
				}
		    });
        });

        // Handle forgot button
        $('#kt_login_forgot').on('click', function (e) {
            e.preventDefault();
            _showForm('forgot');
        });


		

        // Handle signup
        $('#kt_login_signup').on('click', function (e) {
            e.preventDefault();
			_showForm('signup');
			
			// $('#interests-select-option').select2({
			// 	placeholder: 'Select an option',
			// 	dropdownParent: $('#procauseModal')
			// }).select2('val', null);
			// $("#interests-select-option").append("<li> <span> " + "asdfsdfadfad"+ " <i class='bx bx-x' ></i></span> </li>");

		});
    }

    var _handleSignUpForm = function(e) {
        var validation;
        var form = KTUtil.getById('kt_login_signup_form');

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			form,
			{
				fields: {
					fullname: {
						validators: {
							notEmpty: {
								message: 'Username is required'
							}
						}
					},
					email: {
                        validators: {
							notEmpty: {
								message: 'Email address is required'
							},
                            emailAddress: {
								message: 'The value is not a valid email address'
							}
						}
					},
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'The password is required'
                            }
                        }
                    },
                    cpassword: {
                        validators: {
                            notEmpty: {
                                message: 'The password confirmation is required'
                            },
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'The password and its confirm are not the same'
                            }
                        }
                    },
                    agree: {
                        validators: {
                            notEmpty: {
                                message: 'You must accept the terms and conditions'
                            }
                        }
                    },
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        $('#kt_login_signup_submit').on('click', function (e) {
			e.preventDefault();
			

			// var business_keywords = $('#keywords-select-dropdown').select2('data')
            validation.validate().then(function(status) {
		        if (status == 'Valid') {
					// alert('I got here')
					var full_name = $('input[name="businessname"]').val()
					// var mobile_number = $('input[name=phonenumber]').val()
					// var web_url = $('input[name=websiteurl]').val()
					var email = $('input[name=signup_email]').val()
					var business_interests = []
					$('.selected-interest-options li').each((i,interest)=>{
						business_interests.push($(interest).text())
					})
					
					// var business_description = $('input[name=businessdescription]').val()
					// var business_address = $('input[name=address]').val()
					var password = $('input[name=signup_password]').val()
					var role = 1
					var data = {full_name,role, email, business_interests,password}
					console.log('full data: ',data)
					// connect with backend to registere user and business 

					// $.ajax({
					// 	url: "/store_auth_details",
					// 	method: 'POST',
					// 	data: {auth_token: localStorage.getItem('auth_token'), user_role: localStorage.getItem('user_role')}
					// }).done(function() {
					// 	$( this ).addClass( "done" );
					// });


					fetch('/register', {
						method: 'POST', 
						headers: {
							'Content-Type': 'application/json'
						}, 
						body: JSON.stringify(data)
					})
					.then(response => response.json())
					.then(data => {
						if(data.success == true){
							swal.fire({
								text: "All is cool! Now you submit this form",
								icon: "success",
								buttonsStyling: false,
								confirmButtonText: "Ok, got it!",
								customClass: {
									confirmButton: "btn font-weight-bold btn-light-primary"
								}
							}).then(function() {
								KTUtil.scrollTop();
							});
						}else{
							swal.fire({
								text: "Sorry, looks like there are some errors detected, please try again.",
								icon: "error",
								buttonsStyling: false,
								confirmButtonText: "Ok, got it!",
								customClass: {
									confirmButton: "btn font-weight-bold btn-light-primary"
								}
							}).then(function() {
								KTUtil.scrollTop();
								if(data.success){
									window.location.href = "/"
								}
							});
						}
					})
				} else {
					swal.fire({
		                text: "Sorry, looks like there are some errors detected, please try again.",
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
                        customClass: {
    						confirmButton: "btn font-weight-bold btn-light-primary"
    					}
		            }).then(function() {
						KTUtil.scrollTop();
					});
				}
		    });
        });

        // Handle cancel button
        $('#kt_login_signup_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }

    var _handleForgotForm = function(e) {
        var validation;

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_forgot_form'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Email address is required'
							},
                            emailAddress: {
								message: 'The value is not a valid email address'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        // Handle submit button
        $('#kt_login_forgot_submit').on('click', function (e) {
            e.preventDefault();
			var email = $('input[name="fp_email"]').val()
			var data = {email: email}
			console.log('email: ', data)
            validation.validate().then(function(status) {
		        if (status == 'Valid') {
					// if the details from the user is valid, then connect to the login API
					fetch(`${HOST_URL}/forgot_password`, {
						method: 'POST', 
						headers: {'Content-Type': "application/json"}, 
						body: JSON.stringify(data)
					})
					.then(response => response.json())
					.then(data => {
						console.log(data)
						// if unsuccessful then show error message
						if(data.success != true){
							var icon = "error"
						}else{
							var icon = `success`
						}
						swal.fire({
							text: data.message,
							icon: icon,
							buttonsStyling: false,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn font-weight-bold btn-light-primary"
							}
						}).then(function() {
							KTUtil.scrollTop();
						});

					})
                    // Submit form
                    KTUtil.scrollTop();
				} else {
					swal.fire({
		                text: "Sorry, looks like there are some errors detected, please try again.",
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
                        customClass: {
    						confirmButton: "btn font-weight-bold btn-light-primary"
    					}
		            }).then(function() {
						KTUtil.scrollTop();
					});
				}
		    });
        });

        // Handle cancel button
        $('#kt_login_forgot_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }

    // Public Functions
    return {
        // public functions
        init: function() {
            _login = $('#kt_login');

            _handleSignInForm();
            _handleSignUpForm();
            _handleForgotForm();
        }
    };
}();

// Class Initialization
jQuery(document).ready(function() {
    KTResetPassword.init();
});

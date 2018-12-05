$(document).ready(function () {
    checkLogin();
    // initSample();
    $('#btn-submit').click(function () {
        $('#formLogin').submit();
    });

    $('#formLogin').validate({
        rules: {
            emailLogin: {
                required: true,
                email: true
            },
            passwordLogin: {
                required: true,
                minlength: 6,
                maxlength: 15
            }

        },
        messages: {
            emailLogin: {
                required: 'Vui lòng nhập Email.',
                email: 'Email sai định dạng. VD: example123@gmail.com'
            },
            passwordLogin: {
                required: 'Vui lòng nhập mật khẩu.',
                minlength: 'Password quá ngắn, ít nhất phải {0} ký tự.',
                maxlength: 'Password quá dài, ít nhất phải {0} ký tự.',
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            var senderObject = {
                password: $('form input[name="passwordLogin"]').val(),
                email: $('form input[name="emailLogin"]').val(),
            };
            $.ajax({
                url: LOGIN_API,
                method: 'POST',
                contentType: 'application/json; charset=utf-8;',
                data: JSON.stringify(senderObject),

                success: function (res) {
                    swal("Đăng nhập thành công.", "", "success");
                    $('.btnModalLogin').addClass('d-none');
                    localStorage.setItem('token', res.token);
                    $('#modalLogin').modal('hide');
                    checkLogin();
                },
                error: function (msg) {
                    var errorMsg = JSON.parse(msg.responseText);
                    for (var i = 0; i < Object.keys(errorMsg.error).length; i++) {
                        $('.' + Object.keys(errorMsg.error)[i] + '-msg').html('*' + Object.values(errorMsg.error)[i])

                    }
                }

            });
            return false;
        },
    });

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('_');

    }

    $('#song-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 100
            },
            singer: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            author: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            thumbnail: {
                required: true,
            },
            link: {
                required: true
            },
        },
        messages: {
            name: {
                required: 'Vui lòng nhập tên của bài hát.',
                minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
                maxlength: 'Tên quá dài, vui lòng nhập nhiều nhất {0} ký tự',
            },
            singer: {
                required: 'Vui lòng nhập tên ca sỹ.',
                minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
                maxlength: 'Tên quá dài, vui lòng nhập nhiều nhất {0} ký tự',
            },
            author: {
                required: 'Vui lòng nhập tên tác giả.',
                minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
                maxlength: 'Tên quá dài, vui lòng nhập nhiều nhất {0} ký tự',
            },
            thumbnail: {
                required: 'Vui lòng nhập link ảnh của bài hát.',
            },
            link: {
                required: 'Vui lòng nhập link bài hát.',
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            var senderSaveObject = {
                name: $(form["name"]).val(),
                singer: $(form["singer"]).val(),
                author: $(form["author"]).val(),
                thumbnail: $(form["thumbnail"]).val(),
                link: $(form["link"]).val(),
            };

            if (localStorage.getItem('token') != null) {
                $.ajax({
                    url: 'https://2-dot-backup-server-001.appspot.com/_api/v2/songs',
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    // Authorization: "Basic " + localStorage.getItem('token-key'),
                    beforeSend: function (xhr) {
                        /* Authorization header */
                        xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token'));
                    },
                    data: JSON.stringify(senderSaveObject),
                    success: function (res) {
                        swal("Đăng bài hát thành công.", res.name, "success");
                        $('#ModalCreateSong').modal('hide');
                    },
                    error: function (msg) {
                        swal("Đăng bài hát thất bại!", "", "error");
                    }
                });
            } else {
                swal("Token hết hạn!", "Vui lòng đăng nhập để tiếp tục upload bài hát.", "error").then((result) => {
                    if (result.value) {
                        checkLogin();
                        $('#ModalCreateSong').modal('hide');
                        $('#modalLogin').modal();
                    }
                });
            }
            return false;
        }
    });

    $('#formRegister').validate({
        rules: {
            firstName: {
                required: true,
                maxlength: 15,
            },
            lastName: {
                required: true,
                maxlength: 15,
            },
            avatar: {
                required: true,
            },
            address: {
                required: true,
            },
            email: {
                required: true,

            },
            phone: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 15,
            },
            'confirm-password': {
                equalTo: 'input[name="password"]'
            },
        },
        messages: {
            firstName: {
                required: 'Vui lòng nhập tên của bạn.',
                maxlength: 'Tên của bạn quá dài, nhiều nhất là {0} ký tự.'
            },
            phone: {
                required: "Vui lòng nhập Phone"
            },
            lastName: {
                required: 'Vui lòng nhập họ.',
                maxlength: 'Họ của bạn quá dài, nhiều nhất là {0} ký tự.'
            },
            email: {
                required: 'Vui lòng nhập email',
                maxlength: 'email quá dài.'
            },
            password: {
                required: 'Vui lòng nhập pass',
                minlength: 'Password quá ngắn.',
                maxlength: 'Password quá dài.',
            },
            'confirm-password': {
                equalTo: 'Mật khẩu không giống password.'
            },
            address: {
                required: 'Vui lòng nhập địa chỉ.'
            },
            avatar: {
                required: 'Vui lòng nhập ảnh đại diện.'
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            var senderObject = {
                firstName: $('form input[name="firstName"]').val(),
                lastName: $('form input[name="lastName"]').val(),
                password: $('form input[name="password"]').val(),
                email: $('form input[name="email"]').val(),
                address: $('form input[name="address"]').val(),
                phone: $('form input[name="phone"]').val(),
                avatar: $('form input[name="avatar"]').val(),
            };
            $.ajax({
                url: REGISTER_API,
                method: 'POST',
                contentType: 'application/json; charset=utf-8;',
                data: JSON.stringify(senderObject),

                success: function (res) {
                    swal("Dang ky thanh cong", "", "success");
                    $('#modalRegister').modal('hide');
                    // checkLogin();
                },
                error: function (msg) {
                    var errorMsg = JSON.parse(msg.responseText);
                    for (var i = 0; i < Object.keys(errorMsg.error).length; i++) {
                        $('.' + Object.keys(errorMsg.error)[i] + '-msg').html('*' + Object.values(errorMsg.error)[i])
                    }
                }
            });
            return false;
        },
    });

    $('#ShowModalCreateSong').click(function () {
        $('#ModalCreateSong').modal();
    });
    $('.btnModalLogin').click(function () {
        $('#modalLogin').modal();
    });

    $('.btnModalRegister').click(function () {
        $('#modalRegister').modal();
    });

    $('#Logout').click(function () {
        logOut();
    });

});

function checkLogin() {
    if (localStorage.getItem('token')) {
        $('.btnModalLogin').addClass('d-none');
        $('.btnModalRegister').addClass('d-none');
        $('#ShowModalCreateSong').removeClass('d-none');
        $('#Logout').removeClass('d-none');
    } else {
        $('.btnModalLogin').removeClass('d-none');
        $('.btnModalRegister').removeClass('d-none');
        $('#ShowModalCreateSong').addClass('d-none');
        $('#Logout').addClass('d-none');
    }
}

function logOut() {
    swal({
        title: 'Đăng xuất',
        text: "Bạn có thật sự muốn đăng xuất?",
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Quay lại',
        confirmButtonText: 'Đồng ý'
    }).then((result) => {
        if (result.value) {
            localStorage.removeItem('token');
            checkLogin();
            swal(
                '',
                'Đăng xuất thành công!',
                'success'
            );
        } else {
            swal('Tiếp tục cảm nhận âm nhạc nào!');
        }
    });
}

function removeTextError() {
    $('.error').html('');
}




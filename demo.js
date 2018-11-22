$(document).ready(function () {
    $("#formLogin").validate({
       rules : {
           firstName: {
               required: true,
               minLength: 2,
               maxLength: 15,
           },
           lastName: {
               required: true,
               minLength: 2,
               maxLength: 15
           },
           password: {
               required: true,
               minLength: 5,
               maxLength: 18
           },
           'confirm-password': {
               equalTo: '[name="password"]'
           }
       } ,
        messages : {
           firstName: {
               required: 'Vui long nhap ten cua ban',
               minLength: 'Ten cua ban qua ngan, it nhat phai {0} ki tu.',
               maxLength: 'Ten cua ban qua ngan, it nhat phai {0} ki tu.',
           },
            lastName: {
               required: 'Vui long nhap ho cua ban',
                minLength: 'Ho cua ban qua ngan, it nhat phai {0} ki tu.',
                maxLength: 'Ho cua ban qua dai, it nhat phai {0} ki tu.',
            },
            password: {
               required: 'Vui long nhap password',
                minLength: 'password qua ngan',
                maxLength: 'password qua dai'
            },
            'confirm-password': {
               equalTo: 'Mat khau khong dung.'
            }

        }
    });
});
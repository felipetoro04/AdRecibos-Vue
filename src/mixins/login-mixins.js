export default {
    created() {
        this.checkLogin();
    },
    methods: {
        //  checkLogin(){
        //     var id = localStorage.getItem('USER_ID').trim();
        //     if (id == null || id == ''){
        //         this.isLogged = false;
        //     }
        //     else{
        //         this.isLogged = true;
        //     }
        // }
        checkLogin(){
            var id = localStorage.getItem('USER_ID') ? localStorage.getItem('USER_ID').trim() : null;
            if (id == null || id == ''){
                //aqui tengo que redireccionar
                window.location.href="/login"
                console.log(111111)
                return false
            }
            console.log(id)
        }
    }
}
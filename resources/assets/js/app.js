var Vue = require('vue');
Vue.use(require('vue-resource'));
Vue.http.options.emulateJSON = true;

new Vue({
    el: "#application",

    data: {
        todos: [],
        newTodo: {
            todoName: '',
            todoDescription: ''
        },
        submitted: false
    },

    computed: {
        errors: function() {
            for(var key in this.newTodo) {
                if(! this.newTodo[key]) return true;
            }
        }
    },

    ready: function () {
        this.getTodos()
    },
    
    methods: {

        getTodos: function () {
            this.$http.get('http://localhost:10000/', function (todos) {
                this.todos = todos;
            });
        },

        onFormSubmit: function(){
            var todo = this.newTodo;

            this.$http.post(
                'http://localhost:10000/add',
                {'todoName': todo.todoName, 'todoDescription': todo.todoDescription},
                function(data, status){
                    this.getTodos();

                    this.submitted = true;

                    this.newTodo = {
                        'todoName' : "",
                        'todoDescription' : ""
                    };
                });
        }
    }

});
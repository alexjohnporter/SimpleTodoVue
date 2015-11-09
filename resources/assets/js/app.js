var Vue = require('vue');
Vue.use(require('vue-resource'));
Vue.http.options.emulateJSON = true;

new Vue({
    el: "#application",

    data: {
        todos: [],

        todo: {
            todoIdentifier: '',
            todoName: '',
            todoDescription: ''
        },

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
        },

        noTodos: function() {
            if(this.todos.length == 0){
              //do stuff here
            }
        }
    },

    ready: function () {
        this.getTodos(),
        this.noTodos()
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
        },

        deleteTodo: function(todo)
        {
            this.$http.delete(
                'http://localhost:10000/delete/'+todo.todoIdentifier,
                function(data, status){
                    this.getTodos();
                });
        }
    }

});
var Vue = require('vue');
Vue.use(require('vue-resource'));

new Vue({
    el: "#application",

    data: {
        todos: {},
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

        onFormSubmit: function(e){
            e.preventDefault();
            var todo = this.newTodo;

            this.$http.post('http://localhost:10000/add', todo);

            this.submitted = true;

            this.newTodo = {
                'todoName' : "",
                'todoDescription' : ""
            };

        }
    }

});
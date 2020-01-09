var mongoose = required('mongoose');

var todoListSchema = mongoose.schema({
    content: {type:String, required: true},
    done: {type: Boolean},
    date: {type:Date, default: Date.now}
});

userSchema.methods.content = function () {
    return this.content;
};

var todoList = mongoose.model('todoList', todoListSchema);
module.exports = todoList;
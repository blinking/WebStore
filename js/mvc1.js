(function ($) {
    //定义User
//    var User = Backbone.Model.extend({
//        defaults: {
//////            Type: '',
//////            nickname: '',
//////            sex: '',
//////            address: '',
//////            phone: ''
//            id:'',
//            username:'',
//            password:'',
//            email:''
//
//        }
//    });
//
    //定义UserList
    var UserList = Backbone.Collection.extend({
        model: User,
        url: "http://222.201.139.38:8080/UserTest/User/getAllUsers"
    });
////    http://222.201.139.38:8080/UserTest/User/getUserById
//
    //定义UserItemView,显示用户列表中的一个条目
    var UserItemView = Backbone.View.extend({
        tagName:"td",
        userItemTemplate: _.template($("#user-item-template").html(),{}),
        render: function(){
            this.$el.html(this.userItemTemplate(this.model.toJSON()));
            return this;
        }
    });

    //定义UserListView，显示用户列表
    var UserListView = Backbone.view.extend({
        el:$('table'),
        initialize: function(){
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

//            this.render(); // not all
            alert("qq");

//            this.userList.bind('reset', this.addAll, this);
//            this.userList.bind('all', this.render, this);
//            this.userList.fetch({silent: true, success: function(collection, response){
//                if(response != null){
//                    collection.reset(response.user);
//                }else{
//                    userListView.render();
//                }
//            }
    //}
    //);


        },

        render: function(){
//            this.$("#total").html("共有" + this.userList.length + "条记录：");
            alert("q");
        }


//
//        addOne: function(user){
//            var view = new UserItemView({model:user});
//            this.$("td").append(view.render().el);
//        },
//
//        addAll: function(){
//            this.userList.each(this.addOne);
//        }
    });

//    // 定义搜索结果的显示
//    var SearchView = Backbone.view.extend({
//        el:$("#panel"),
//        initialize: function(){
//        },
//        events:{
//            'click #send': 'doSearch'
//        },
//        doSearch: function(event){
//            alert("aaa");
//            this.user = new User({openID: $("#content").val()});
//            this.user.bind('reset', this.addOne, this);
//            this.user.fetch({silent: true, success: function(model, user){
//                if(user != null){
//                    model.reset(user.user);
//                }else{
//                    searchView.render();
//                }
//            }});
//
//        },
//        addOne: function(user){
//            this.view.remove();
//            var view = new UserItemView({model:user});
//            this.$("td").append(view.render().el);
//        },
//        render: function(){
//            alert("没有找到相关记录！");
//        }
//    });
//    var searchView = new SearchView();
    var userListView = new UserListView();
})(jQuery);
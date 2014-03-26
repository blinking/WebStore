$(function(){
	var Student=Backbone.Model.extend({
		defaults:function(){
			return{
				name:"XXX",
				age:"0",
				selected:false,
				id:Students.nextId()
			};
		},
		initialize:function(){
			if(!this.get("name")){
				this.set({"name":this.defaults().name});
			}
			if(!this.get("age")||!(/(^[1-9]\d*$)/.test(this.get("age")))){
				this.set({"age":this.defaults().age});
			}
		},
		toggle:function(){
			this.save({selected:!this.get("selected")});
		}
	});

	var Students=Backbone.Collection.extend({
		
		model:Student,
		localStorage:new Backbone.LocalStorage("Students-Table"),

		selected:function(){
			return this.filter(function(student){return student.get('selected');});
		},

		nextId:function(){
			if(!this.length)
				return 1;
			return this.last().get('id')+1;
		}
	});
	var Students=new Students;

	var StudentView=Backbone.View.extend({

		tagName:"tr",

		template:_.template($('#item-template').html()),

		events:{
			"click .toggle":"toggleSelect",
			"dblclick td":"edit",
			"click a.destroy":"clear",
			"blur .edit":"close"
		},

		initialize:function(){

			this.listenTo(this.model,'change',this.render);

			this.listenTo(this.model,'destroy',this.remove);
		},

		render:function(){
			this.$el.html(this.template(this.model.toJSON()));

			this.$el.toggleClass('selected',this.model.get('selected'));
			return this;
		},

		toggleSelect:function(){
			this.model.toggle();
		},

		edit:function(e){
			$(e.currentTarget).addClass("editing").find("input,select").focus();
		},

		close:function(e){
			var input=$(e.currentTarget);

			if(input.attr('name')=="name"){
				if(!input.val()){
					input.val(this.model.defaults().name);
				}
				this.model.save({"name":input.val()});
			}else if(input.attr('name')=="gender"){
				this.model.save({"gender":input.val()});
			}else{
				if(!input.val()||!(/(^[1-9]\d*$)/.test(input.val()))){
					input.val(this.model.defaults().age);
				}
				this.model.save({"age":input.val()});
			}
			input.parent().removeClass("editing");
		},

		clear:function(){
			this.model.destroy();
		}
	});

	var AppView=Backbone.View.extend({
		el:$("#content"),

		statsTemplate:_.template($('#stats-template').html()),

		events:{
			"click #add-student":"addNewStudent",
			"click #clear-selected":"clearSelected",
			"click #select-all":"selectAll"
		},

		initialize:function(){
			this.allCheckbox=$("#select-all");
			this.main=$("#main");
			this.footer=$('footer');
			this.name=$("#new-name");
			this.age=$("#new-age");
			this.gender=$("#new-gender");

			this.listenTo(Students,'add',this.addOne);

			this.listenTo(Students,'reset',this.addAll);

			this.listenTo(Students,'all',this.render);

			Students.fetch();
		},

		render:function(){
			var selected=Students.selected().length;
			
			if(Students.length){
				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTemplate({selected:selected}));
			}else{
				this.main.hide();
				this.footer.hide();
			}

			this.allCheckbox.attr("checked",selected==Students.length?true:false);
		},

		addOne:function(student){
			var view=new StudentView({model:student});

			this.$("#student-list").append(view.render().el);
		},

		addAll:function(){
			Students.each(this.addOne,this);
		},

		addNewStudent:function(){
			Students.create({name:this.name.val(),gender:this.gender.val(),age:this.age.val()});
			this.name.val('');
			this.age.val('');
			this.gender.val(1);
		},

		clearSelected:function(){
			_.invoke(Students.selected(),'destroy');
		},

		selectAll:function(){
			var selected=this.allCheckbox.attr('checked')=="checked";
			Students.each(function(student){
				student.save({'selected':selected});
			});
		}
	});

	var App=new AppView;
});
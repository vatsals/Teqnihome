import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable } from 'rxjs/Rx';
import { FilterPipe } from '../filter.pipe';
import { DataService } from '../data.service';
declare var $:any;
declare var jQuery:any;
declare var ng: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('content') content;
  @ViewChild('myDiv') myDiv: ElementRef;
  org_chart: any;
  observer: any;
  iterate: string;
  testData: any;
  testData2: any;
  term: any;
  empCheck: any;
  private changes: MutationObserver;
  valr : Array<any> = [];
  //employees = ["Mr. John", "Mr. Steve", "Mrs. Reena",  "Mr. Sean", "Mr. Rusk", "Mrs. Lyra", "Mr. Bank", "Mr. Toy", "Mrs. Rose"];
  employees = [];
  employeesAll = [];
  //places = ["TeqniHome - UK", "CFO", "CTO",  "Sales", "Marketting", "Advertisement"];
  places = [];
  emps = [];
  names = [];
  links = ["TeqniHome - USA", "TeqniHome - India", "TeqniHome - Australia"];

  constructor(private elementRef:ElementRef, private dataService:DataService, private dragulaService: DragulaService) {
      localStorage.removeItem("copy");
      localStorage.removeItem("copyId");
      localStorage.removeItem("copyMail");
      this.dataService.empsAll()
      .subscribe(
            data => {
                if(data.responseEntity){
                    for(var i=0;i<data.responseEntity.length;i++) {
                        this.employeesAll.push({
                          "id": data.responseEntity[i].key,
                          "name": data.responseEntity[i].name,
                          "personName": data.responseEntity[i].emailId,
                          "parent": data.responseEntity[i].parent
                        });
                        if(data.responseEntity[i].parent=='-1') {
                            this.employees.push({
                              "id": data.responseEntity[i].key,
                              "name": data.responseEntity[i].name,
                              "personName": data.responseEntity[i].emailId,
                              "parent": data.responseEntity[i].parent
                            });
                        }
                        else {
                            this.names.push({
                              "id": data.responseEntity[i].key,
                              "name": data.responseEntity[i].name,
                              "personName": data.responseEntity[i].emailId,
                              "parent": data.responseEntity[i].parent
                            });
                        }
                    }
                }
                this.employees.sort((a, b) => {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  else return 0;
                });
                this.employeesAll.sort((a, b) => {
                  if (a.parent.toLowerCase() < b.parent.toLowerCase()) return -1;
                  else if (a.parent.toLowerCase() > b.parent.toLowerCase()) return 1;
                  else return 0;
                });
                this.emps = this.employees;
                localStorage.removeItem("employees");
                localStorage.removeItem("employeesAll");
                localStorage.removeItem("names");
                localStorage.setItem("employees", JSON.stringify(this.employees));
                localStorage.setItem("employeesAll", JSON.stringify(this.employeesAll));
                localStorage.setItem("names", JSON.stringify(this.names));
            }
        );
      //localStorage.setItem("employees", JSON.stringify(this.employees));
      var loc;
      // loc = 'usa';
    // loc = 'indi';
      setTimeout(() => {
            $("body").on('DOMSubtreeModified', ".content", (e) => {
            	this.emps = [];
            	var e2 = [];
                this.emps = JSON.parse(localStorage.getItem("employees"));
                for(var t=0;t<this.emps.length;t++) {
                	if(this.emps[t].personName!="Email Id") {
                		e2.push(this.emps[t]);
                	}
                }
                this.emps = e2;
                localStorage.removeItem("employees");
                localStorage.setItem("employees", JSON.stringify(this.emps));
                // localStorage.removeItem("names");
                // localStorage.setItem("names", JSON.stringify(this.names));
          });
            if(loc) {
                document.getElementById('8').scrollIntoView({block: 'start', behavior: 'smooth'});
                var x = document.getElementsByClassName('tab');
                (<any>x[0]).style.border = '1px solid #e7e7e7';
                (<any>x[0]).style.padding = '30px';
                (<any>x[0]).style.background = '#fff';
                (<any>x[0]).style.borderCollapse = 'inherit';
                (<any>x[0]).style.boxShadow = '1px 1px 0px #ddd';
            }
            else {
                var x = document.getElementsByClassName('tab');
                (<any>x[0]).style.border = '1px solid #e7e7e7';
                (<any>x[0]).style.padding = '30px';
                (<any>x[0]).style.background = '#fff';
                (<any>x[0]).style.borderCollapse = 'inherit';
                (<any>x[0]).style.boxShadow = '1px 1px 0px #ddd';
            }
        }, 100);
  	$(function(){
        var storedNames = JSON.parse(localStorage.getItem("names"));
  		this.testData = [
		  	{
		  		id: 1, 
		  		name: 'TeqniHome - UK', 
		  		personName: 'Mr. John',
		  		parent: 0
		  	},
		  	// {
		  	// 	id: 2, 
		  	// 	name: 'CFO', 
		  	// 	personName: 'Mr. Steve',
		  	// 	parent: 1
		  	// },
		  	// {
		  	// 	id: 3, 
		  	// 	name: 'CEO', 
		  	// 	personName: 'Mr. Rusk',
		  	// 	parent: 1
		  	// },
		  	// {
		  	// 	id: 4,
		  	// 	name: 'CTO', 
		  	// 	personName: 'Mrs. Reena',
		  	// 	parent: 3
		  	// },
		  	// {
		  	// 	id: 5, 
		  	// 	name: 'Sales', 
		  	// 	personName: 'Mr/Ms.',
		  	// 	parent: 3
		  	// },
     //    {
     //        id: 12, 
     //        name: 'Front End', 
     //        personName: 'Mr/Ms.',
     //        parent: 4
     //    },
		  	// {
		  	// 	id: 6, 
		  	// 	name: 'Marketting', 
		  	// 	personName: 'Mr/Ms.',
		  	// 	parent: 2
		  	// },
		  	// {
		  	// 	id: 7, 
		  	// 	name: 'Advertisement', 
		  	// 	personName: 'Mr/Ms.',
		  	// 	parent: 2
		  	// }
		  ];
        this.testData = storedNames;
		this.testData2 = [
			{
		  		id: 8, 
		  		name: 'TeqniHome - USA', 
		  		personName: 'Mr/Ms.',
		  		parent: 0
		  	},
		  	{
		  		id: 9, 
		  		name: 'CTO', 
		  		personName: 'Mr/Ms.',
		  		parent: 8
		  	},
		  	{
		  		id: 10, 
		  		name: 'CEO', 
		  		personName: 'Mr/Ms.',
		  		parent: 8
		  	},
		  	{
		  		id: 11, 
		  		name: 'Front End', 
		  		personName: 'Mr/Ms.',
		  		parent: 9
		  	}
		];
        // for(var l=0;l<this.testData.length;l++) {
        //     if(this.testData[l].personName!='Mr/Ms.') {
        //         names.push(this.testData[l].personName);
        //     }
        // }
        // localStorage.removeItem("names");
        // localStorage.setItem("names", JSON.stringify(names));
        // var storedNames = JSON.parse(localStorage.getItem("names"));
        // var empNames = JSON.parse(localStorage.getItem("employees"));
        // for(var m=0;m<storedNames.length;m++) {
        //       for (var i=empNames.length-1; i>=0; i--) {
        //             if (empNames[i] === storedNames[m]) {
        //                 empNames.splice(i, 1);
        //             }
        //       }
        //   }
        // localStorage.setItem("employees", JSON.stringify(empNames));
		// for(var l=0;l<this.testData2.length;l++) {
		// 	if(l==0) {
		// 		var k = {
		// 			id: this.testData2[l].id,
		// 			name: this.testData2[l].name,
		// 			personName: this.testData2[l].personName,
		// 			parent: this.testData[4].id
		// 		};
		// 		if(loc=='usa') {
		// 			this.testData.push(k);
		// 		}
		// 	}
		// 	else {
		// 		if(loc=='usa') {
		// 			this.testData.push(this.testData2[l]);
		// 		}
		// 	}
		// }
        this.org_chart = $('#orgChart').orgChart({
            data: loc=='indi'?this.testData2:this.testData,
            showControls: true,
            allowEdit: true,
        });
    });
  }

  myClick() {
      
  }

  save() {
    
  }

  ngOnInit() {
  	(function($) {
    $.fn.orgChart = function(options) {
        var opts = $.extend({}, $.fn.orgChart.defaults, options);
        return new OrgChart($(this), opts);
    }

    $.fn.orgChart.defaults = {
        data: [{id:1, name:'Root', personName: 'Mr/Ms.', parent: 0}],
        showControls: false,
        allowEdit: false,
        onAddNode: null,
        onDeleteNode: null,
        onClickNode: null,
        newNodeText: 'Add'
    };

    function OrgChart($container, opts){
        var data = opts.data;
        var nodes = {};
        var rootNodes = [];
        var rem = [];
        var unrem = [];
        var unsem = [];
        this.opts = opts;
        this.$container = $container;
        var self = this;

        this.draw = function(){
            $.each(rem, function(i, el){
                if($.inArray(el, unrem) === -1) unrem.push(el);
            });
            // var sem = JSON.parse(localStorage.getItem("employees"));
            // var names = JSON.parse(localStorage.getItem("names"));
            // for(var m=0;m<unrem.length;m++) {
            //     for (var i=names.length-1; i>=0; i--) {
            //         if (names[i] === unrem[m]) {
            //             names.splice(i, 1);
            //         }
            //     }
            //       sem.push(unrem[m]);
            // }
            // $.each(sem, function(i, el){
            //     if($.inArray(el, unsem) === -1) unsem.push(el);
            // });
            // localStorage.setItem("employees", JSON.stringify(unsem));
            // localStorage.setItem("names", JSON.stringify(names));
            $container.empty().append(rootNodes[0].render(opts));
            $container.find('.node').click(function(){
                if(self.opts.onClickNode !== null){
                    self.opts.onClickNode(nodes[$(this).attr('node-id')]);
                }
            });

            if(opts.allowEdit){
                $container.find('.node h2').click(function(e){
                    var thisId = $(this).parent().attr('node-id');
                    self.startEdit(thisId);
                    e.stopPropagation();
                });
                $container.find('.node p').click(function(e){
                    var thisId = $(this).parent().attr('node-id');
                    self.startEdit(thisId);
                    e.stopPropagation();
                });
                $container.find('.node .fa-refresh').click(function(e){
                    var thisId = $(this).parent().attr('node-id');
                    $('#linkId').val(e.target.id);
                });
            }

            // add "add button" listener
            $container.find('.org-add-button').click(function(e){
                var thisId = $(this).parent().attr('node-id');

                if(self.opts.onAddNode !== null){
                    self.opts.onAddNode(nodes[thisId]);
                }
                else{
                    self.newNode(thisId);
                }
                e.stopPropagation();
            });

            $container.find('.org-del-button').click(function(e){
                var thisId = $(this).parent().attr('node-id');
                if(self.opts.onDeleteNode !== null){
                    self.opts.onDeleteNode(nodes[thisId]);
                }
                else{
                    self.deleteNode(thisId);
                }
                e.stopPropagation();
            });
        }

        this.startEdit = function(id){
        	var copy = JSON.parse(localStorage.getItem("copy"));
        	var copyId = parseInt(JSON.parse(localStorage.getItem("copyId")));
            var copyMail = JSON.parse(localStorage.getItem("copyMail"));
        	var storedNames = JSON.parse(localStorage.getItem("names"));
        	var sem = JSON.parse(localStorage.getItem("employees"));
        	for(var myIds=0;myIds<sem.length;myIds++) {
                if (parseInt(sem[myIds].id) == copyId) {
                    if(copyMail) {
                    	sem.splice(myIds, 1);
                    }
                    else {
                    }
                }
            }
            for(var my=0;my<storedNames.length;my++) {
                if (parseInt(storedNames[my].id) == parseInt(nodes[id].data.id)) {
                    if(copyMail) {
                    	var kname = {
						    "id": copyId,
						    "name": copy,
						    "personName": copyMail,
						    "parent": storedNames[my].parent
						}
						var kprev = storedNames[my];
                    	kprev["parent"] = "-1";
                    	sem.push(kprev);
                    	storedNames.push(kname);
                    	storedNames.splice(my, 1);
                    }
                    else {
                    }
                }
            }
            nodes[id].data.id = copyId;
        	nodes[id].data.name = copy;
        	nodes[id].data.personName = copyMail;
        	var user = [];
        	for (var k4 in nodes) {
		        if (nodes.hasOwnProperty(k4)) {
					user.push(nodes[k4].data);
		        }
		    }
            localStorage.removeItem("names");
            localStorage.setItem("names", JSON.stringify(user));
            localStorage.removeItem("employees");
            localStorage.setItem("employees", JSON.stringify(sem));
            if(copy) {
                var k = copy;
                // if(nodes[id].data.personName!='' && nodes[id].data.personName!='Mr/Ms.') {
                //     var sem = JSON.parse(localStorage.getItem("employees"));
                //     sem.push(nodes[id].data.personName);
                //     localStorage.setItem("employees", JSON.stringify(sem));
                //     var storedNames = JSON.parse(localStorage.getItem("names"));
                //     for(var my=0;my<storedNames.length;my++) {
                //         if (storedNames[my] === nodes[id].data.personName) {
                //             storedNames.splice(my, 1);
                //         }
                //       }
                //     localStorage.setItem("names", JSON.stringify(storedNames));
                // }
                nodes[id].data.name = k;
                nodes[id].data.personName = copyMail;
            }
            else {
                var k = nodes[id].data.personName;
            }
            var inputElement = $('<input class="org-input" type="text" style="margin-bottom: 5px; margin-bottom: 5px;width: 170px;font-size: 11px;" value="'+nodes[id].data.name+'"/>');
            var inputElement2 = $('<input class="org-input" type="text" style="margin-bottom: 5px;width: 170px;font-size: 11px;" value="'+nodes[id].data.personName+'"/>');
            var inputElement3 = $('<span>'+nodes[id].data.parent+'</span>');
            $container.find('div[node-id='+id+'] h2').replaceWith(inputElement);
            $container.find('div[node-id='+id+'] p').replaceWith(inputElement2);
            $container.find('div[node-id='+id+'] span').replaceWith(inputElement3);
            var commitChange = function(){
                var h2Element = $('<h2>'+nodes[id].data.name+'</h2>');
                var h2Element2 = $('<p>'+nodes[id].data.personName+'</p>');
                var h2Element3 = $('<span>'+nodes[id].data.parent+'</span>');
                if(opts.allowEdit){
                    h2Element.click(function(){
                        self.startEdit(id);
                    })
                    h2Element2.click(function(){
                        self.startEdit(id);
                    })
                    if(h2Element2[0].innerHTML=='' && k!='Mr/Ms.') {
                        var sem = JSON.parse(localStorage.getItem("employees"));
                        var names = JSON.parse(localStorage.getItem("names"));
                        for(var n=0;n<names.length;n++) {
                            if(names[n]==nodes[id].data.personName) {
                                nodes[id].data.personName!=''?sem.push(nodes[id].data):h2Element2[0].innerHTML='Mr/Ms.';
                                1;
                            }
                        }
                        // localStorage.removeItem("employees");
                        //localStorage.setItem("employees", JSON.stringify(sem));
                    }
                }
                // localStorage.removeItem("names");
                // var sem = JSON.parse(localStorage.getItem("employees"));
                // var jobs = [];
                // if(opts) {
                //     for(var l=0;l<opts.data.length;l++) {
                //         if(opts.data[l].personName!='Mr/Ms.') {
                //             jobs.push(opts.data[l].personName);
                //         }
                //     }
                // }
                // localStorage.setItem("names", JSON.stringify(jobs));
                // var storedNames = JSON.parse(localStorage.getItem("names"));
                // var empNames = JSON.parse(localStorage.getItem("employees"));
                // for(var m=0;m<storedNames.length;m++) {
                //       for (var i=empNames.length-1; i>=0; i--) {
                //             if (empNames[i] === storedNames[m]) {
                //                 empNames.splice(i, 1);
                //             }
                //       }
                //   }
                // localStorage.setItem("employees", JSON.stringify(empNames));
                inputElement.replaceWith(h2Element);
                inputElement2.replaceWith(h2Element2);
                inputElement3.replaceWith(h2Element3);
            }  
            // inputElement.focus();
            inputElement.keyup(function(event){
                if(event.which == 13){
                    commitChange();
                }
                else{
                    nodes[id].data.name = inputElement.val();
                }
            });
            inputElement2.keyup(function(event){
                if(event.which == 13){
                    // alert(nodes[id].data.personName);
                    // var sem = JSON.parse(localStorage.getItem("employees"));
                    // var storedNames = JSON.parse(localStorage.getItem("names"));
                    // for(var n1=0;n1<sem.length;n1++) {
                    //     if(sem[n1]==k) {
                    //         k!=''?storedNames.push(k):1;
                    //     }
                    // }
                    // // console.log(storedNames);
                    // localStorage.setItem("names", JSON.stringify(storedNames));
                    // var empNames = JSON.parse(localStorage.getItem("employees"));
                    // for(var m=0;m<storedNames.length;m++) {
                    //       for (var i=empNames.length-1; i>=0; i--) {
                    //             if (empNames[i] === storedNames[m]) {
                    //                 empNames.splice(i, 1);
                    //             }
                    //       }
                    // }
                    // localStorage.setItem("employees", JSON.stringify(empNames));
                    var storedNames = JSON.parse(localStorage.getItem("names"));
                    for(var n1=0;n1<storedNames.length;n1++) {
                        
                    }
                    commitChange();
                }
                else{
                    k = inputElement2.val();
                }
            });
            inputElement.blur(function(event){
                commitChange();
            })
            localStorage.removeItem("copy");
            localStorage.removeItem("copyId");
            localStorage.removeItem("copyMail");
        }

        this.newNode = function(parentId){
            var nextId = Object.keys(nodes).length;
            while(nextId in nodes){
                nextId++;
            }

            self.addNode({id: nextId, name: 'Mr/Ms.', personName: 'Email Id', parent: parentId});
        }

        this.addNode = function(data){
            var newNode = new Node(data);
            nodes[data.id] = newNode;
            nodes[data.parent].addChild(newNode);
            self.draw();
            self.startEdit(data.id);
        }

        this.deleteNode = function(id){
            nodes[id].data&&nodes[id].data.personName!=''&&nodes[id].data.personName!='Mr/Ms.'?rem.push(nodes[id].data):1;
            var storedNames = JSON.parse(localStorage.getItem("names"));
            for(var i=0;i<nodes[id].children.length;i++){
                self.deleteNode(nodes[id].children[i].data.id);
                nodes[id].children[i]&&nodes[id].children[i].data.personName!=''&&nodes[id].children[i].data.personName!='Mr/Ms.'?rem.push(nodes[id].children[i].data):1;
            }
            var emps = [];
            if(rem.length>0) {
                for(var y=0;y<rem.length;y++) {
                    emps.push(rem[y]);
                }
            }
            nodes[nodes[id].data.parent].removeChild(id);
            delete nodes[id];
            this.employees = JSON.parse(localStorage.getItem("employees"));
            for(var y=0;y<emps.length;y++) {
                emps[y].parent = -1;
                this.employees.push(emps[y]);
            }
            this.employees = this.employees.filter((thing, index, self) =>
			  index === self.findIndex((t) => (
			    t.personName === thing.personName
			  ))
			)
            var names = JSON.parse(localStorage.getItem("employeesAll"));
            var emps2 = this.employees;
            var mt = names.filter(function(o1){
			    return !emps2.some(function(o2){
			        return o1.id === o2.id;
			    });
			}).map(function(o){
			    return o;
			});
            localStorage.removeItem("names");
            localStorage.setItem("names", JSON.stringify(mt));
            localStorage.removeItem("employees");
            localStorage.setItem("employees", JSON.stringify(this.employees));
            self.draw();
        }

        this.getData = function(){
            var outData = [];
            for(var i in nodes){
                outData.push(nodes[i].data);
            }
            return outData;
        }

        // constructor
        for(var i in data){
            var node = new Node(data[i]);
            nodes[data[i].id] = node;
        }

        // generate parent child tree
        for(var itr in nodes){
            if(nodes[itr].data.parent == 0){
                rootNodes.push(nodes[itr]);
            }
            else{
                nodes[nodes[itr].data.parent].addChild(nodes[itr]);
            }
        }

        // draw org chart
        $container.addClass('orgChart');
        self.draw();
    }

    function Node(data){
        this.data = data;
        this.children = [];
        var self = this;

        this.addChild = function(childNode){
            this.children.push(childNode);
        }

        this.removeChild = function(id){
            for(var i=0;i<self.children.length;i++){
                if(self.children[i].data.id == id){
                    self.children.splice(i,1);
                    return;
                }
            }
        }

        this.render = function(opts){
            var childLength = self.children.length,
                mainTable;

            mainTable = "<table cellpadding='0' cellspacing='0' border='0' class='tab'>";
            var nodeColspan = childLength>0?2*childLength:2;
            mainTable += "<tr><td colspan='"+nodeColspan+"'>"+self.formatNode(opts)+"</td></tr>";

            if(childLength > 0){
                var downLineTable = "<table cellpadding='0' cellspacing='0' border='0'><tr class='lines x'><td class='line left half'></td><td class='line right half'></td></table>";
                mainTable += "<tr class='lines'><td colspan='"+childLength*2+"'>"+downLineTable+'</td></tr>';

                var linesCols = '';
                for(var i=0;i<childLength;i++){
                    if(childLength==1){
                        linesCols += "<td class='line left half'></td>";    // keep vertical lines aligned if there's only 1 child
                    }
                    else if(i==0){
                        linesCols += "<td class='line left'></td>";     // the first cell doesn't have a line in the top
                    }
                    else{
                        linesCols += "<td class='line left top'></td>";
                    }

                    if(childLength==1){
                        linesCols += "<td class='line right half'></td>";
                    }
                    else if(i==childLength-1){
                        linesCols += "<td class='line right'></td>";
                    }
                    else{
                        linesCols += "<td class='line right top'></td>";
                    }
                }
                mainTable += "<tr class='lines v'>"+linesCols+"</tr>";

                mainTable += "<tr>";
                for(var str in self.children){
                    mainTable += "<td colspan='2'>"+self.children[str].render(opts)+"</td>";
                }
                mainTable += "</tr>";
            }
            mainTable += '</table>';
            return mainTable;
        }

        this.formatNode = function(opts){
            var nameString = '', descString = '', perString = '', addOns = '', parString = '';
            if(typeof data.name !== 'undefined'){
                nameString = '<h2>'+self.data.name+'</h2>';
            }
            if(typeof data.personName !== 'undefined'){
                perString = '<p style="font-size: 11px;">'+self.data.personName+'</p>';
            }
            if(typeof data.description !== 'undefined'){
                descString = '<p>'+self.data.description+'</p>';
            }
            if(typeof data.parent !== 'undefined'){
                parString = '<span>'+self.data.parent+'</span>';
            }
            addOns = '<div class="divcl"><i class="fa fa-vcard-o" id="'+self.data.id+'" style="cursor: pointer; color: #197CD3; opacity:0.9; flex: 1; justify-content: center;"></i><i class="fa fa-user-circle-o" id="'+self.data.id+'" style="cursor: pointer; color: #44B546; opacity:0.9; flex: 1; justify-content: center;"></i><i class="fa fa-envelope" id="'+self.data.id+'" style="cursor: pointer; color: #F15156; opacity:0.9; flex: 1; justify-content: center;"></i><i class="fa fa-users" id="'+self.data.id+'" style="cursor: pointer; color: #197CD3; opacity:0.9; flex: 1; justify-content: center;"></i><i class="fa fa-refresh" data-toggle="modal" data-target="#form" id="'+self.data.id+'" style="cursor: pointer; color: #EAB812; opacity:0.9; flex: 1; justify-content: center;"></i></div>';
            if(opts.showControls){
                var buttonsHtml = "<div class='org-add-button'>"+opts.newNodeText+"</div><div class='org-del-button'></div>";
            }
            else{
                buttonsHtml = '';
            }
            var bag = '';
            return "<div class='node' id='"+this.data.id+"' node-id='"+this.data.id+"'>"+nameString+perString+parString+descString+addOns+buttonsHtml+bag+"</div>";
        }
    }
	})(jQuery);
  }


  copy(e) {
    var txtArea = document.createElement("textarea");

    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    txtArea.value = e.target.textContent;
    document.body.appendChild(txtArea);
    txtArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        if(successful){
            localStorage.removeItem("copyMail");
            localStorage.removeItem("copy");
            localStorage.removeItem("copyId");
            var arr = e.target.id.toString().split(',');
            localStorage.setItem("copyMail", JSON.stringify(arr[0]));
            localStorage.setItem("copyId", JSON.stringify(arr[1]));
            localStorage.setItem("copy", JSON.stringify(e.target.textContent));
            return true;
        }
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(txtArea);
    return false;
  }

  pasteHere(event) {
      let clipboardData = (<any>window).clipboardData;
      console.log(clipboardData);
  }


  ngAfterViewInit() {
      this.check();
      // $("body").on('DOMSubtreeModified', ".content", function() {
      //       var empNames = JSON.parse(localStorage.getItem("employees"));
      //       this.employees = [];
      //       for(var t=0;t<empNames.length;t++) {
      //           this.employees.push(empNames[t]);
      //       }
      //       console.log(this.employees);
      // });
  }

  check() {
      var storedNames = JSON.parse(localStorage.getItem("names"));
      for(var m=0;m<storedNames.length;m++) {
          for (var i=this.employees.length-1; i>=0; i--) {
                if (this.employees[i] === storedNames[m]) {
                    this.employees.splice(i, 1);
                }
          }
      }
  }

  saveEmp() {
  	var storedNames = JSON.parse(localStorage.getItem("names"));
  	var final = [];
  	for(var t=0;t<storedNames.length;t++) {
  		var k = {
  			"id": storedNames[t].id,
		    "teamLead": storedNames[t].parent,
		    "title": "Title",
		    "department": "Dept"
  		}
  		final.push(k);
  	}
  	var storedEmps = JSON.parse(localStorage.getItem("employees"));
  	for(var t=0;t<storedEmps.length;t++) {
  		var k2 = {
  			"id": storedEmps[t].id,
		    "teamLead": "-1",
		    "title": "Title",
		    "department": "Dept"
  		}
  		final.push(k2);
  	}
  	console.log(final);
  	this.dataService.savesEmp(final)
      .subscribe(
            data => {
              alert('Chart Updated');
            }
        );
  }

  onDomChange() {
      const element = this.elementRef.nativeElement;

        this.changes = new MutationObserver((mutations: MutationRecord[]) => {
              mutations.forEach((mutation: MutationRecord) => console.log('Yaas'));
            }
        );

        this.changes.observe(element, {
          attributes: true,
          childList: true,
          characterData: true
        });

  }

  toggleTitle(){
    $('.title').slideToggle();
  }

}

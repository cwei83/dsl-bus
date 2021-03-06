window.onload = function() {
    //show date
    var today = new Date();
    var year = today.getFullYear();
    var month = "" + (today.getMonth() + 1);
    if (month < 10)
	month = "0" + month;
    var day = today.getDate();
    if (day < 10)
	day = "0" + day;
    document.getElementById("timebox").innerHTML = year + month + day;

    //JSON table
    var myList = {
	"row": [{
	    "trip": [{
		"line_name": "12_3",
		"start_time": 600,
		"end_time": 740
	    }, {
		"line_name": "R3_15",
		"start_time": 815,
		"end_time": 1018
	    }, {
		"line_name": "12_18",
		"start_time": 1105,
		"end_time": 1115
	    }, {
		"line_name": "12_24",
		"start_time": 1435,
		"end_time": 1535
	    }]
	}, {
	    "trip": [{
		"line_name": "12_1",
		"start_time": 545,
		"end_time": 715
	    }, {
		"line_name": "12_9",
		"start_time": 740,
		"end_time": 940
	    }, {
		"line_name": "12_16",
		"start_time": 1015,
		"end_time": 1215
	    }, {
		"line_name": "12_22",
		"start_time": 1245,
		"end_time": 1445
	    }]
	}, {
	    "trip": [{
		"line_name": "12_2",
		"start_time": 600,
		"end_time": 738
	    }, {
		"line_name": "R8_10",
		"start_time": 800,
		"end_time": 945
	    }, {
		"line_name": "12_17",
		"start_time": 1040,
		"end_time": 1240
	    }, {
		"line_name": "12_23",
		"start_time": 1310,
		"end_time": 1510
	    }, {
		"line_name": "DLP_5",
		"start_time": 1720,
		"end_time": 1810
	    }, {
		"line_name": "DLP_7",
		"start_time": 1810,
		"end_time": 1900
	    }]
	}, {
	    "trip": [{
		"line_name": "12_4",
		"start_time": 620,
		"end_time": 825
	    }, {
		"line_name": "12_12",
		"start_time": 840,
		"end_time": 1040
	    }, {
		"line_name": "12_19",
		"start_time": 1130,
		"end_time": 1330
	    }, {
		"line_name": "12_35",
		"start_time": 1740,
		"end_time": 1940
	    }]
	}, {
	    "trip": [{
		"line_name": "12_6",
		"start_time": 635,
		"end_time": 905
	    }, {
		"line_name": "12_15",
		"start_time": 950,
		"end_time": 1150
	    }, {
		"line_name": "12_21",
		"start_time": 1220,
		"end_time": 1420
	    }, {
		"line_name": "R8_20",
		"start_time": 1545,
		"end_time": 1715
	    }, {
		"line_name": "DLP_6",
		"start_time": 1740,
		"end_time": 1810
	    }, {
		"line_name": "DLP_8",
		"start_time": 1815,
		"end_time": 1920
	    }]
	}]
    };

    var table = document.getElementById("table1");
    var totwork = new Array(myList.row.length);
    var allwork = 0;
    var maxnum_cells = 0;
    //var table = document.getElementById("table1");
    var isPrepared = false;
    var row_of_temp, cell_of_temp;
    var content;


    display_table();

    alert("Y");

    //definition of functions
    function store(Cell) {
	//A->TEMP
	row_of_temp = Cell.parentNode.rowIndex;
	cell_of_temp = Cell.cellIndex; //table index
	//content      = Cell.innerHTML;
    }

    function examine(row, col) {
	var oldCell, oldCell_pre, oldCell_next;
	var thisCell, thisCell_pre, thisCell_next;

	var new_col = (col+1)/2;
	var new_cell_of_temp = (cell_of_temp+1)/2;

	alert("PP");

	if(new_cell_of_temp-1==0){
	    oldCell = myList.row[row_of_temp].trip[new_cell_of_temp-1];
	    oldCell_pre = {"end_time": 0};
	    oldCell_next = myList.row[row_of_temp].trip[new_cell_of_temp];
	} else if (new_cell_of_temp==myList.row[row_of_temp].trip.length){
	    oldCell = myList.row[row_of_temp].trip[new_cell_of_temp-1];
	    oldCell_pre = myList.row[row_of_temp].trip[new_cell_of_temp-2];
	    oldCell_next = {"start_time": 9999}
	} else{
	    oldCell = myList.row[row_of_temp].trip[new_cell_of_temp-1];
	    oldCell_pre = myList.row[row_of_temp].trip[new_cell_of_temp-2];
	    oldCell_next = myList.row[row_of_temp].trip[new_cell_of_temp];
	}

	if(new_col-1==0){
	    thisCell = myList.row[row].trip[new_col-1];
	    thisCell_pre = {"end_time": 0};
	    thisCell_next = myList.row[row].trip[new_col];
	} else if (new_col==myList.row[row].trip.length) {
	    thisCell = myList.row[row].trip[new_col-1];
	    thisCell_pre = myList.row[row].trip[new_col-2];
	    thisCell_next = {"start_time": 9999};
	} else {
	    thisCell = myList.row[row].trip[new_col-1];
	    thisCell_pre = myList.row[row].trip[new_col-2];
	    thisCell_next = myList.row[row].trip[new_col];
	}
	
	if (thisCell.start_time < oldCell_pre.end_time) {
	    alert("1");
	    return -1;
	}
	if (thisCell.end_time > oldCell_next.start_time) {
	    alert("2");
	    return -1;
	}

	//examine thisCell origin position time
	//thisCell_pre.end_time -> oldCell -> thisCell_next.start_time
	if (oldCell.start_time < thisCell_pre.end_time) {
	    alert("3");
	    return -1;
	}
	if (oldCell.end_time > thisCell_next.start_time) {
	    alsert("4");
	    return -1;
	}
	alert("0");  
	return 0
    }
    function examine_ins(row,col){
	var oldCell;
	var thisCell_pre,thisCell_next;

alert("row:"+row+" col:"+col);

	var new_col = col/2; //the left of the gap
	var new_cell_of_temp = (cell_of_temp+1)/2;
	
	oldCell = myList.row[row_of_temp].trip[new_cell_of_temp-1];
	alert("ei");
	if(new_col==myList.row[row].trip.length){
	    thisCell_pre = myList.row[row].trip[new_col-1];
	    thisCell_next = {"start_time": 9999};
	} else {
	    thisCell_pre = myList.row[row].trip[new_col-1];
	    thisCell_next = myList.row[row].trip[new_col];
	}
alert("old:"+oldCell.line_name);
alert("pre:"+thisCell_pre.line_name);
alert("nex:"+thisCell_next.line_name);


	if(oldCell.start_time < thisCell_pre.end_time){
	    alert("3");
	    return -1;
	}
	if(oldCell.end_time > thisCell_next.start_time){
	    alert("4");
	    return -1;
	}
	alert("0");
	return 0;
    }

    function exchange( /*Cell_tb,*/ row, col) {
	//var oldCell_tb = table.rows[row_of_temp].cells[cell_of_temp];
	var oldCell = myList.row[row_of_temp].trip[(cell_of_temp+1)/2-1]; //json index
	var thisCell = myList.row[row].trip[(col+1)/2-1];
	var temp;

	//old->TEMP
	temp = oldCell;
	alert("old :" + oldCell.line_name);
	alert("this:" + thisCell.line_name);

	//this->old
	oldCell = thisCell;

	//TEMP->this
	thisCell = temp;
	alert("old :" + oldCell.line_name);
	alert("this:" + thisCell.line_name);

	//reverse input
	myList.row[row_of_temp].trip[(cell_of_temp+1)/2-1] = oldCell; //json index
	myList.row[row].trip[(col+1)/2-1] = thisCell;

	//change innerHtml
	//changeText(row_of_temp); //oldCell
	//changeText(row); //thisCell
	
	//table.parentNode.removeChild(table);
	//table = document.getElementById("table1");
	//for(var q=0;q<table.row.length;q++)
	    //table.deleteRow(0);

	for(var q=table.rows.length-1;q>=0;q--)
	    table.deleteRow(q);
	alert("deleted!");
	display_table();

	alert("Exchange Finished!");


    }

    function insert(row,col) {
	var oldCell = myList.row[row_of_temp].trip[(cell_of_temp+1)/2-1];
	alert("add");
	//add obj brfore 'col/2'
	myList.row[row].trip.splice((col/2),0,oldCell);
	alert("del");
	//delete obj
	myList.row[row_of_temp].trip.splice( ((cell_of_temp+1)/2-1),1);

	for(var q=table.rows.length-1;q>=0;q--)
	    table.deleteRow(q);
	display_table();

	alert("Insert Finished!");
    }

    function changeText(row) {
	for (j = 1, totwork[row] = 0; j < myList.row[row].trip.length + 1; j++) {
	    var Trip = myList.row[row].trip[j - 1];
	    table.rows[row].cells[j].innerText = "";
	    table.rows[row].cells[j].innerText = Trip.line_name + " \n(" + Trip.start_time + "-" + Trip.end_time + ")";
	    totwork[row] += (Math.floor(Trip.end_time / 100) - Math.floor(Trip.start_time / 100)) * 60 + (Trip.end_time % 100 - Trip.start_time % 100);
	}
	if (maxnum_cells < myList.row[row].trip.length + 1)
	    maxnum_cells = myList.row[row].trip.length + 1;

	//total worktime per driver
	for (var i = 0, allwork = 0; i < myList.row.length; i++) {
	    table.rows[i].cells[maxnum_cells + 1].innerText = totwork[i] + "¤À";
	    allwork += totwork[i];
	}

	//num of drivers & avg worktime
	document.getElementById("driver").innerHTML = myList.row.length + "¤H";
	document.getElementById("avgwork").innerHTML = Math.round(allwork / myList.row.length) + "¤À";
    }

    function display_table() {
	table = document.getElementById("table1");
	alert("BLABLA");
	totwork = new Array(myList.row.length);
	allwork = 0;
	maxnum_cells = 0;
	isPrepared = false;
	//JSON table build
	for (var i = 0, j, k; i < myList.row.length; i++) {
	    table.insertRow();
	    //Serial Number
	    table.rows[i].insertCell(0);
	    table.rows[i].cells[0].innerText = i + 1;

	    for (j = 1,  k = 1, totwork[i] = 0; j < myList.row[i].trip.length + 1; j++, k+=2) {
		var Trip = myList.row[i].trip[j - 1];
		table.rows[i].insertCell(k);
		table.rows[i].cells[k].innerText = Trip.line_name + " \n(" + Trip.start_time + "-" + Trip.end_time + ")";
		table.rows[i].insertCell(k+1);
		table.rows[i].cells[k+1].style.width = '20px';
		totwork[i] += (Math.floor(Trip.end_time / 100) - Math.floor(Trip.start_time / 100)) * 60 + (Trip.end_time % 100 - Trip.start_time % 100);
	    }
	    if (maxnum_cells < myList.row[i].trip.length*2 + 1)
		maxnum_cells = myList.row[i].trip.length*2 + 1;
	}
	//total worktime per driver
	for (var i = 0, j; i < myList.row.length; i++) {
	    for (j = myList.row[i].trip.length*2 + 1; j < maxnum_cells + 1; j++) {
		table.rows[i].insertCell(j);
	    }

	    table.rows[i].cells[j - 1].innerText = totwork[i] + "分";
	    allwork += totwork[i];
	}
	//table.style.emptyCells = "show";

	//num of drivers & avg worktime
	document.getElementById("driver").innerHTML = myList.row.length + "人";
	document.getElementById("avgwork").innerHTML = Math.round(allwork / myList.row.length) + "分";

	//click then change
	//var table = document.getElementById("table1");
	//var isPrepared = false;
	//var row_of_temp, cell_of_temp;
	//var content;
	//var line,start,end;
	if (table != null) {
	    for (var i = 0; i < table.rows.length; i++) {
		for (var j = 0; j < table.rows[i].cells.length; j++) {
		    table.rows[i].cells[j].onclick = function() {
			if (!isPrepared) {
			    this.style.backgroundColor = "#FF931E";
			    store(this);
			    isPrepared = true;
			} else {
			    this.style.backgroundColor = "#39B54A";
			    if (j%2 == 0 && j!=0) //insert
			    {
				if (examine_ins(this.parentNode.rowIndex, this.cellIndex) == 0)
				{
				    alert("insert");
				    insert(this.parentNode.rowIndex, this.cellIndex);

				}
				else{
				    alert("insert failed");
				}
			    }
			    else if (j%2 != 0 && j!=table.rows[i].cells.length) //exchange
			    {
				if (examine(this.parentNode.rowIndex, this.cellIndex) == 0) {
					alert("hel");
					exchange( /*this, */ this.parentNode.rowIndex, this.cellIndex);
					alert("YO");
				    } else {
					alert("exchange failed");
			    	}
			    }

			    //exchange(/*this, */this.parentNode.rowIndex, this.cellIndex);
			    table.rows[row_of_temp].cells[cell_of_temp].style.backgroundColor = "#FFFFFF";
			    table.rows[this.parentNode.rowIndex].cells[this.cellIndex].style.backgroundColor = "#FFFFFF";
			    isPrepared = false;
			}
		    };
		}
	    }
	}
    }
}

var i = 0;
var score = 0;
var cell = new Array(4);
main()








function clear()
{
	for(var i=0; i<4; i++)
	{
		cell[i] = new Array(4);
		for(var j=0; j<4; j++)
			cell[i][j]="";
	}
}


function newgame()
{
    main()
    score=0;
    document.getElementById("fade").style.display = 'none';
    document.getElementById("light").style.display = 'none';
    screen()
}


function main()
{
	document.onkeydown = checkKey
	window.onload = screen
	clear()
	rand()
	rand()
}



function screen()
{
	for(var i=0; i<4; i++)
	{
		for(var j=0; j<4; j++)
		{
			var x = document.getElementById("tabela").rows[i].cells;
			x[j].innerHTML = cell[i][j];

			x[j].style.backgroundColor = "#FFFFFF";
			if(cell[i][j] != "")
			{
				var color =  (Math.log(cell[i][j])/Math.log(2))*32;
				x[j].style.backgroundColor = "rgb(" + (200-(Math.floor(color/255))) + "," + (200-(Math.floor(color/16))) + ","+(255-(color))+")" ;
			}
		}
	}
	document.getElementById("score").innerHTML = score;
}



function rand()
{
	var empty = new Array(0);
	
	for(var i=0; i<4; i++)
	{
		for(var j=0; j<4; j++)
		{
			if(cell[i][j] == "")
				empty.push(i*4+j);
		}
	}
	if(verify(empty.length))
	{
		var index = Math.floor( Math.random() * empty.length);
		cell[Math.floor(empty[index]/4)][empty[index]%4] = 2;
	}
	rand2()
}





function rand2()
{
	var empty = new Array(0);
	
	for(var i=0; i<4; i++)
	{
		for(var j=0; j<4; j++)
		{
			if(cell[i][j] == "")
				empty.push(i*4+j);
		}
	}
	verify(empty.length)
}



function checkKey(e)
{
	var event = window.event ? window.event : e;
	if(event.keyCode == 38) //UP
		move(0,3,0,4,1,0)
	if(event.keyCode == 40) //DOWN
		move(3,0,0,4,-1,0)
	if(event.keyCode == 37) //LEFT
		move(0,4,0,3,0,1)
	if(event.keyCode == 39) //RIGHT
		move(0,4,3,0,0,-1)
	if(event.keyCode == 78) //NEW
		main()
}






function move(a,b,c,d,x,y)
{
	var fezsoma = 0;
	
	for(var xx = a; b != xx; (a<b ? xx++ : xx--))
	{
		for( var yy =c; yy !=d; (c<d ? yy++ : yy--))
		{
			for(var X = a; b != X; (a<b ? X++ : X--))
			{
				for( var Y =c; Y !=d; (c<d ? Y++ : Y--))
				{
					if(cell[X][Y] == "")
					{
						if(cell[X+x][Y+y] != "")
							fezsoma = 1;
						cell[X][Y] = cell[X+x][Y+y];
						cell[X+x][Y+y]="";
					}
				}
			}
			if(cell[xx][yy] == cell[xx+x][yy+y])
			{
				cell[xx][yy] = cell[xx][yy] + cell[xx+x][yy+y];
				cell[xx+x][yy+y] = "";
				fezsoma = 1;
				score = parseInt(score + cell[xx][yy]);
			}
		}
	}
	if(fezsoma)
		rand()
	screen()
}



function verify(empty)
{
	if(empty == 0)
	{
		for( var i = 0; i<4; i++)
		{
			for( var j=0; j<4; j++)
			{
				if(j<3)
					if(cell[i][j] == cell[i][j+1])
						return 1;
				if(i<3)
					if(cell[i][j] == cell[i+1][j])
						return 1;
			}
		}
		//alert('No more moves')
        document.getElementById("fade").style.display = 'block';
        document.getElementById("light").style.display = 'block';
		return 0;
	}
	return 1;
}

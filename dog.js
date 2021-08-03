function Dog(change_times) {
    this.row = 5;
    this.col = 5;
    this.change_times = change_times;
    this.squares = [];
    this.tds = [];
    this.parent = document.querySelector('.gameBox');
}
Dog.prototype.init = function () {
    for (var i = 0; i <this.row; i++) {
        this.squares[i] = [];
        for (var j = 0; j <this.col; j++) {
                this.squares[i][j] = {
                    type: 'doga',
                };
        }
    }
    this.createDom();
    var rand = this.randomNum();
    console.log(rand);
    var n = 0;
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            n++;
            if (rand.indexOf(n) != -1) {
                this.tds[i][j].onmousedown();
            }
        }
    }
   
};
Dog.prototype.randomNum = function () {
    var square = new Array(this.row * this.col);
    for (var i = 0; i < square.length; i++) {
        square[i] = i;
    }
    square.sort(function () { return 0.5 - Math.random() });
    //console.log(square);
    return square.slice(0, this.change_times);

}


Dog.prototype.createDom = function () {
    console.log(this.squares);
    var This = this;
    var table = document.createElement('table');
    for (var i = 0; i <this.row; i++) {
        var domTr = document.createElement('tr');
        this.tds[i] = [];
        for (var j = 0; j <this.col; j++) {
            var domTd = document.createElement('td');

            domTd.pos = [i,j];
            domTd.onmousedown = function () {
                This.play(event,this);
                

            }
            this.tds[i][j] = domTd;
            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    for (var i = 0; i <this.row; i++) {
        for (var j = 0; j <this.col; j++) {
            this.tds[i][j].className='doga'
        }
    }
    this.parent.innerHTML = '';
    this.parent.appendChild(table);
}
Dog.prototype.play = function (ev, obj) {
    this.squares[obj.pos[0]][obj.pos[1]].type = (this.squares[obj.pos[0]][obj.pos[1]].type == 'doga' ?'dogb':'doga');
    obj.className = this.squares[obj.pos[0]][obj.pos[1]].type;
    for (var i = obj.pos[0] - 1; i <= obj.pos[0] + 1;i++) {
        for (var j = obj.pos[1] - 1; j <= obj.pos[1] + 1; j++) {
            if (i - obj.pos[0] == obj.pos[1]-j|| i - obj.pos[0] == j - obj.pos[1] || i < 0 || i >=this.row || j < 0 || j >= this.col) {

            } else {
                this.tds[i][j].className = (this.tds[i][j].className == 'doga' ? 'dogb' : 'doga');
                this.squares[i][j].className = this.tds[i][j].className;
                this.squares[i][j].type = this.squares[i][j].className;
            }
        }
    }
    var std_img = this.squares[0][0].type;
    var control = 1;
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.row; j++) {
            if (this.squares[i][j].type != std_img) {
                control = 0;
            }
        }
    }
    if (control == 1) {
        alert("YOU WIN");
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.row; j++) {
                this.tds[i][j].onmousedown = null;
            }
        }
    }
}
var btns = document.querySelectorAll('.level button');
var dog = null;
var ln = 0;
var arr = [3, 5, 10];
for (let i = 0; i < btns.length - 1; i++) {
    btns[i].onclick = function () {
        for (var k = 0; k < btns.length; k++) {
            btns[k].className = '';
            this.className = 'active';
        }
        dog = new Dog(arr[i]);
        dog.init();
        //console.log(i);

    }
}

btns[0].onclick();
btns[3].onclick = function () {
    btns[0].onclick();
}
btns[3].onclick

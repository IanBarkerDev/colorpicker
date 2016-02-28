var App = React.createClass({
    getInitialState: function() {
        return (
        {

        }
        )
    },
    render: function() {
        return(
            <div>
                <MenuBar />
                <Main />
            </div>

        )
    }
});

var MenuBar = React.createClass({
   render: function() {
       return (
           <div className="menubar">
               <h1>Color Picker</h1>
               <p>Begin by selecting your first tile and entering a color.</p>
           </div>
       )
   }
});

var Main = React.createClass({
    getInitialState: function() {
        return(
        {
            tiles: ["#ffffff"],
            newTile: ""
        }
        )

    },

    handleDeleteTile: function (a) {
        deleteElement(this.state.tiles, a);
        this.forceUpdate();
    },

    handleAddTile: function(a) {
        this.state.tiles.push(a);
        console.log(this.state.tiles);
        this.forceUpdate();
    },

    render: function() {
        return (
            <div className="main">
                {this.state.tiles.map(function(t, index) {
                    return (
                        <Tile t={t} index={index} key={index} handleDeleteTile={this.handleDeleteTile}/>
                    )
                }, this)}
                <NewTile handleAddTile={this.handleAddTile}/>
            </div>
        )
    }
});

var Tile = React.createClass({
    deleteTile: function() {
        this.props.handleDeleteTile(this.props.t);
    },

    render: function() {
        var t = this.props.t;
        var index = this.props.index;

        if(t.length < 6) {
            var arrT = t.split("");
            t = arrT[0] + arrT[1] + arrT[1] + arrT[2] + arrT[2] + arrT[3] + arrT[3];
        }


        var hsl = convertToHSL(t);
        var color;
        if(hsl.l < 30) {
            color = "#fff";
        } else {
            color = "#000";
        }
        var divStyle = {
            backgroundColor: t,
            color: color
        };

        return (
            <div className="tile" id={index} style={divStyle} onClick={this.deleteTile}><span className="center">{t.substr(1)}</span></div>
        )
    }
});

var NewTile = React.createClass({
    getInitialState: function() {
        return({
            secondVisible: false,
            newTile: ""
        })
    },

    updateNewTile: function(e) {
        this.setState({
            newTile: e.target.value
        })
    },

    addTile: function() {
        if(this.state.newTile.length === 0) {
            this.switchDiv();
        } else {
            this.props.handleAddTile("#" + this.state.newTile);
        }
        document.getElementById("newTile").value = "";
        this.setState({
            newTile: "",
            secondVisible: false
        })
    },

    switchDiv: function() {
        this.setState({
            secondVisible: true
        })
    },

    render: function() {
        var firstStyle = {
            display: (this.state.secondVisible ? "none" : "block")
        };

        var secondStyle = {
            display: (this.state.secondVisible ? "block" : "none")
        };
        return(
            <div className="tile" id="newTileDiv">
                <span className="center" style={firstStyle} id="newTileFirst" onClick={this.switchDiv}>+</span>
                <div style={secondStyle} id="newTileSecond">
                    <input type="text" onChange={this.updateNewTile} id="newTile"/>
                    <button type="button" onClick={this.addTile}>Submit</button>
                </div>
            </div>
        )
    }
});

function convertToHSL(str) {
    str = str.substr(1);
    var a = str[0];
    var q = str[1];
    var c = str[2];
    var d = str[3];
    var e = str[4];
    var f = str[5];


    var r, g, b;

    a = convertHexToNum(a);
    q = convertHexToNum(q);
    c = convertHexToNum(c);
    d = convertHexToNum(d);
    e = convertHexToNum(e);
    f = convertHexToNum(f);



    r = a * 16 + +q;
    g = c * 16 + +d;
    b = e * 16 + +f;

    r = r / 255;
    g = g / 255;
    b = b / 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);

    var h, s, l;
    l = (min + max) / 2;

    if(min === max) {
        h = 0;
        s = 0;
    } else {
        var diff = max - min;
        s = (l > .5 ? diff / (2 - max - min) : diff / (max + min));

        switch(max) {
            case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
            case g: h = (b - r) / diff + 2; break;
            case b: h = (r - g) / diff + 4; break;
        }

        h = h / 6;
    }

    return {h: (h * 100 + .5) | 0, s: (s * 100 + .5) | 0, l: (l * 100 + .5) | 0};


}

function convertHexToNum(a) {
    switch(a) {
        case "a": a = 10; break;
        case "b": a = 11; break;
        case "c": a = 12; break;
        case "d": a = 13; break;
        case "e": a = 14; break;
        case "f": a = 15; break;
        default: break;
    }

    return a;
}

function deleteElement(arr, e) {
    for(var i = 0; i < arr.length; i ++) {
        if(arr[i] === e) {
            arr.splice(i, 1);
            break;
        }
    }
}



ReactDOM.render(<App />, document.getElementById("react"));
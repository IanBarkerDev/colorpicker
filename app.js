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

        var num = convertToDecimal(t);
        var color;

        if(num < 16777215 / 2) {
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

function convertToDecimal(str) {
    str = str.substr(1);
    str = str.split("");

    var total = 0;

    if(str.length === 3) {
        total += str[0] + str[1] * 16 + str[2] * 256 + str[0] * 256 * 16 + str[1] * 256 * 256 + str[2] * 16 * 256 * 256;

    } else {
        total += str[0] + str[1] * 16 + str[2] * 256 + str[3] * 256 * 16 + str[4] * 256 * 256 + str[5] * 16 * 256 * 256;
    }

    return total;
}

function deleteElement(arr, e) {
    for(var i = 0; i < arr.length; i ++) {
        if(arr[i] === e) {
            arr.splice(i, 1);
        }
    }
}



ReactDOM.render(<App />, document.getElementById("react"));
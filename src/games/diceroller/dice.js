import React from 'react';
import './dice.css';

export class Dice extends React.Component {
  state = {
      log: '',
      n: 1,
      mod: 0
  };

    timeStamp = () => {
        const monthArr = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        const date = new Date();
        const month = monthArr[date.getMonth()];
        const day = date.getDate();
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        hours = hours < 10 ? '0' + hours : hours;
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return '[' + month + ' ' + day + ', ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm + ']';
    }

    dieRoll = (event) => {
        let mod = this.state.mod;
        const d = event.target.innerHTML.slice(1);
        const rolls = [];

        for (let i = 0; i < this.state.n; i++) {
            rolls[i] = Math.floor(Math.random() * d) + 1;
        }

        let rollsum = 0;
        for (let j = 0; j < this.state.n; j++) {
            rollsum += rolls[j];
        }

        const total = rollsum + Number(mod);

        if (
            this.state.mod === Number(0)
            || this.state.mod === String(0)
        ) {
            mod = '';
        }

        if (this.state.mod > 0) {
            mod = this.state.mod.charAt(0) === '+'
                ? this.state.mod
                : '+' + this.state.mod;
        }

        const timestamp = this.timeStamp();
        const result = `<li tabindex='0'> ${ timestamp } You rolled <strong> ${ this.state.n }d${ d }${ mod } </strong> for <strong> ${ total } </strong></li>`;
        const newResult = result + this.state.log;
        this.setState({ log: newResult });
    }

    setMod = (event) => {
        this.setState({ mod: event.target.value });
    }

    setN = (event) => {
        this.setState({ n: event.target.value });
    }

    renderLog = () => {
        return (
            <div dangerouslySetInnerHTML={ { __html: this.state.log } }>
            </div>
        );
    }

    render() {
        return (
            <div id="container">
                <p className="nobr">n</p>
                <select
                    id="n"
                    defaultValue={ 1 }
                    onClick={ this.setN }
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>

                <button id="d4" className="diceroll" onClick={ this.dieRoll }>d4</button>
                <button id="d6" className="diceroll" onClick={ this.dieRoll }>d6</button>
                <button id="d8" className="diceroll" onClick={ this.dieRoll }>d8</button>
                <button id="d10" className="diceroll" onClick={ this.dieRoll }>d10</button>
                <button id="d12" className="diceroll" onClick={ this.dieRoll }>d12</button>
                <button id="d20" className="diceroll" onClick={ this.dieRoll }>d20</button>

                <select
                    id="mod"
                    defaultValue={ 0 }
                    onClick={ this.setMod }
                >
                    <option>-10</option>
                    <option>-9</option>
                    <option>-8</option>
                    <option>-7</option>
                    <option>-6</option>
                    <option>-5</option>
                    <option>-4</option>
                    <option>-3</option>
                    <option>-2</option>
                    <option>-1</option>
                    <option>0</option>
                    <option>+1</option>
                    <option>+2</option>
                    <option>+3</option>
                    <option>+4</option>
                    <option>+5</option>
                    <option>+6</option>
                    <option>+7</option>
                    <option>+8</option>
                    <option>+9</option>
                    <option>+10</option>
                </select>

                <p className="nobr">mod</p>

                <div id="logcontainer">
                    <button id="logbutton">ROLL LOG</button>
                    <ul id="log">
                        { this.renderLog() }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Dice;

// TODO: Add keyboard navigation
// $(document).keydown(
//     function(e)
//       {
//         if (e.keyCode == 37) {
//           if (document.activeElement.id == 'd4') {document.getElementById('n').focus();}
//           if (document.activeElement.id == 'd6') {document.getElementById('d4').focus();}
//           if (document.activeElement.id == 'd8') {document.getElementById('d6').focus();}
//           if (document.activeElement.id == 'd10') {document.getElementById('d8').focus();}
//           if (document.activeElement.id == 'd12') {document.getElementById('d10').focus();}
//           if (document.activeconstlement.id == 'd20') {document.getElementById('d12').focus();}
//           if (document.activeconstlement.id == 'mod') {document.getElementById('d20').focus();}
//         }
//         if (e.keyCode == 39) {
//           if (document.activeElement.id == 'd20') {document.getElementById('mod').focus();}
//           if (document.activeElement.id == 'd12') {document.getElementById('d20').focus();}
//           if (document.activeElement.id == 'd10') {document.getElementById('d12').focus();}
//           if (document.activeElement.id == 'd8') {document.getElementById('d10').focus();}
//           if (document.activeElement.id == 'd6') {document.getElementById('d8').focus();}
//           if (document.activeElement.id == 'd4') {document.getElementById('d6').focus();}
//           if (document.activeElement.id == 'n') {document.getElementById('d4').focus();}
//         }
//         if (e.keyCode == 40) {
//           if (document.activeElement.className == 'diceroll') {document.getElementById('logbutton').focus();}
//           else if (document.activeElement.id == 'logbutton') {$('li:first').focus();}
//           else if ($('li').is(':focus')) {$('li:focus').next().focus();}
//         }
//         if (e.keyCode == 38) {
//           if (document.activeElement.id == 'logbutton') {document.getElementById('n').focus();}
//           if ($('li:first').is(':focus')) {document.getElementById('logbutton').focus();}
//           if ($('li').is(':focus')) {$('li:focus').prev().focus();}
//         }
//       });

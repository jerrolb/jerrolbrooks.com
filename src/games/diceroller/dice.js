import React from 'react';
import './dice.css';

export class Dice extends React.Component {
  state = {
      log: '',
      n: 1,
      mod: 0,
      buttons: [
          'n',
          'd4',
          'd6',
          'd8',
          'd10',
          'd12',
          'd20',
          'mod'
      ]
  };

  componentDidMount() {
      document.getElementById('d4').focus();
  }

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

    handleKeyPress = (e) => {
        if (e.keyCode === 37) { // Left
            const currButton = this.state.buttons.indexOf(e.target.id);
            const prevButton = this.state.buttons[currButton - 1]
                ? this.state.buttons[currButton - 1]
                : null;

            if (currButton === this.state.buttons.length - 1) {
                this.setState({ mod: e.target.value });
                if (e.target.value.charAt(0) === '+') {
                    document.getElementById('mod').value = '+' + (Number(e.target.value.slice(1)) + 1);
                } else if (
                    e.target.value === Number(0)
                    || e.target.value === String(0)
                ) {
                    document.getElementById('mod').value = '+1';
                } else {
                    document.getElementById('mod').value = (Number(e.target.value) + 1);
                }
            }

            return prevButton
                ? document.getElementById(prevButton).focus()
                : false;
        }
        if (e.keyCode === 39) { // Right
            const currButton = this.state.buttons.indexOf(e.target.id);
            const nextButton = this.state.buttons[currButton + 1]
                ? this.state.buttons[currButton + 1]
                : null;

            if (currButton === 0) {
                this.setState({ n: Number(e.target.value) });
                document.getElementById('n').value -= 1;
            }

            return nextButton
                ? document.getElementById(nextButton).focus()
                : false;
        }
        if (e.keyCode === 40) { // Down
            if (document.activeElement.className === 'diceroll') {document.getElementById('logbutton').focus();}
        }
        if (e.keyCode === 38) { // Up
            if (e.target.id === 'logbutton') {document.getElementById('d4').focus();}
        }
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
                    defaultValue={ this.state.n }
                    onKeyDown={ this.handleKeyPress }
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

                <button id="d4" className="diceroll" onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d4</button>
                <button id="d6" className="diceroll" onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d6</button>
                <button id="d8" className="diceroll" onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d8</button>
                <button id="d10" className="diceroll" onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d10</button>
                <button id="d12" className="diceroll" onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d12</button>
                <button id="d20" className="diceroll" onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d20</button>

                <select
                    id="mod"
                    defaultValue={ this.state.mod }
                    onKeyDown={ this.handleKeyPress }
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

                <div id="logcontainer" onKeyDown={ this.handleKeyPress }>
                    <button id="logbutton" onKeyDown={ this.handleKeyPress }>ROLL LOG</button>
                    <ul id="log">
                        { this.renderLog() }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Dice;


import React from 'react';
import PropTypes from 'prop-types';
import { BUTTONS, MONTHS } from './config/constants';
import './dice.css';

export class Dice extends React.Component {
    static defaultProps = {
        buttons: BUTTONS,
        months: MONTHS
    }
    static propTypes = {
        buttons: PropTypes.array.isRequired,
        months: PropTypes.array.isRequired,
    };

  state = {
      log: '',
      n: 1,
      mod: 0,
  };

  componentDidMount() {
      document.getElementById('d4').focus();
  }

    timeStamp = () => {
        const date = new Date();
        const month = this.props.months[date.getMonth()];
        const day = date.getDate();
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        hours = hours < 10 ? '0' + hours : hours;
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return '[' + month + ' ' + day + ', ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm + ']';
    }

    // TODO: Do not use setState's callback
    dieRoll = (event) => {
        const d = event.target.innerHTML.slice(1);
        this.setState({
            n: document.getElementById('n').value,
            mod: document.getElementById('mod').value
        }, () => {
            let mod = this.state.mod;
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
        });
    }

    setMod = (event) => {
        this.setState({ mod: event.target.value });
    }

    setN = (event) => {
        this.setState({ n: event.target.value });
    }

    handleKeyPress = (event) => {
        let currButton;
        let nextButton;
        let prevButton;

        // TODO: Refactor key handling -- this is just quick and ugly
        switch (event.keyCode) {
        case 37: // Left
            currButton = this.props.buttons.indexOf(event.target.id);
            prevButton = this.props.buttons[currButton - 1]
                ? this.props.buttons[currButton - 1]
                : null;

            if (currButton === this.props.buttons.length - 1) {
                this.setState({ mod: event.target.value });
                if (event.target.value.charAt(0) === '+') {
                    const result = '+' + (Number(event.target.value.slice(1)) + 1);
                    if (result === '+11') {
                        document.getElementById('mod').selectedIndex = document.getElementById('mod').length - 1;
                    } else {
                        document.getElementById('mod').value = '+' + (Number(event.target.value.slice(1)) + 1);
                    }
                } else if (
                    event.target.value === Number(0)
                    || event.target.value === String(0)
                ) {
                    document.getElementById('mod').value = '+1';
                } else {
                    document.getElementById('mod').value = (Number(event.target.value) + 1);
                }
            }

            return prevButton
                ? document.getElementById(prevButton).focus()
                : false;
        case 39: // Right
            currButton = this.props.buttons.indexOf(event.target.id);
            nextButton = this.props.buttons[currButton + 1]
                ? this.props.buttons[currButton + 1]
                : null;

            if (currButton === 0) {
                this.setState({ n: Number(event.target.value) });
                document.getElementById('n').value -= 1;
            }

            return nextButton
                ? document.getElementById(nextButton).focus()
                : false;
        case 40: // Down
            if (document.activeElement.className === 'diceroll') {
                document.getElementById('logbutton').focus();
            }
            break;
        case 38: // Up
            if (event.target.id === 'logbutton') {
                document.getElementById('d4').focus();
            }
            break;
        default:
            break;
        }
    }

    renderLog = () => {
        return (
            // TODO: Do not use dangerouslySetInnerHTML
            <div dangerouslySetInnerHTML={ { __html: this.state.log } }></div>
        );
    }

    render() {
        return (
            <div id="container">
                <p className="nobr">n</p>
                <select
                    id="n"
                    defaultValue={ this.state.n }
                    onClick={ this.setN }
                    onKeyDown={ this.handleKeyPress }
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
                    onClick={ this.setMod }
                    onKeyDown={ this.handleKeyPress }
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
                    <option></option>
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

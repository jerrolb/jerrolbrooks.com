import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BUTTONS, MONTHS } from './config/constants';
import './dice.css';
import {
    updateN,
    updateMod,
    updateLog
} from '../../redux/actions/diceActions';

class Dice extends React.Component {
    static defaultProps = {
        buttons: BUTTONS,
        months: MONTHS,
        updateLog: updateLog,
        updateMod: updateMod,
        updateN: updateN
    }
    static propTypes = {
        buttons: PropTypes.array.isRequired,
        log: PropTypes.string.isRequired,
        mod: PropTypes.number.isRequired,
        months: PropTypes.array.isRequired,
        n: PropTypes.number.isRequired,
        updateLog: PropTypes.func.isRequired,
        updateMod: PropTypes.func.isRequired,
        updateN: PropTypes.func.isRequired
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

    dieRoll = (event) => {
        this.props.updateN(Number(document.getElementById('n').value));
        this.props.updateMod(Number(document.getElementById('mod').value));

        const d = event.target.innerHTML.slice(1);
        let mod = this.props.mod;
        const rolls = [];

        for (let i = 0; i < this.props.n; i++) {
            rolls[i] = Math.floor(Math.random() * d) + 1;
        }

        let rollsum = 0;
        for (let j = 0; j < this.props.n; j++) {
            rollsum += rolls[j];
        }

        const total = rollsum + Number(mod);

        if (
            this.props.mod === Number(0)
            || this.props.mod === String(0)
        ) {
            mod = '';
        } else if (this.props.mod > 0) {
            mod = '+' + this.props.mod;
        }

        const timestamp = this.timeStamp();
        const result = `<li tabindex='0'> ${ timestamp } You rolled <strong> ${ this.props.n }d${ d }${ mod } </strong> for <strong> ${ total } </strong></li>`;
        const newResult = result + this.props.log;
        this.props.updateLog(newResult);
    }

    setMod = (event) => {
        this.props.updateMod(Number(event.target.value));
    }

    setN = (event) => {
        this.props.updateN(Number(event.target.value));
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
                this.props.updateMod(Number(event.target.value));
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
                this.props.updateN(Number(event.target.value));
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
            <div dangerouslySetInnerHTML={ { __html: this.props.log } } />
        );
    }

    clearLog = () => {
        this.props.updateLog('');
    }

    render() {
        return (
            <div id="container">
                <p className="nobr">n</p>
                <select
                    id="n"
                    // TODO: Clean up this logic
                    defaultValue={ this.props.n }
                    onClick={ this.setN }
                    onChange={ this.setN }
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
                    // TODO: Clean up this logic
                    defaultValue={ this.props.mod }
                    onClick={ this.setMod }
                    onChange={ this.setMod }
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

                <div
                    id="logcontainer"
                    onKeyDown={ this.handleKeyPress }
                    style={ { overflowY: 'scroll' } }
                >
                    <button id="logbutton" onClick={ this.clearLog }>Clear Log</button>
                    <ul id="log">
                        { this.renderLog() }
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        n: state.dice.n,
        mod: state.dice.mod,
        log: state.dice.log
    };
}

function mapDispatchToProps (dispatch) {
    return {
        updateN: (n) => dispatch(updateN(n)),
        updateMod: (mod) => dispatch(updateMod(mod)),
        updateLog: (log) => dispatch(updateLog(log))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);

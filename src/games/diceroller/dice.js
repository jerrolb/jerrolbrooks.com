import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BUTTONS, MONTHS } from './config/constants';
import {
    updateN,
    updateMod,
    updateLog
} from '../../redux/actions/diceActions';
import './dice.css';

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
        this.d4.focus();
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
        return `[${ month } ${ day }, ${ hours }:${ minutes }:${ seconds } ${ ampm }]`;
    }

    dieRoll = (event) => {
        const dice = event.target.innerHTML.slice(1);
        const rolls = [];
        const n = this.props.n;
        let mod = this.props.mod;

        for (let index = 0; index < n; index++) {
            rolls[index] = Math.floor(Math.random() * dice) + 1;
        }

        let rollSum = 0;
        for (let accumulator = 0; accumulator < n; accumulator++) {
            rollSum += rolls[accumulator];
        }

        const total = rollSum + mod;

        if (mod === 0) {
            mod = '';
        } else if (mod > 0) {
            mod = `+${ mod }`;
        }

        const timestamp = this.timeStamp();
        const result = `<li tabindex='0'> ${ timestamp } You rolled <strong> ${ this.props.n }d${ dice }${ mod } </strong> for <strong> ${ total } </strong></li>`;
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

        switch (event.keyCode) {
        case 37: // Left
            currButton = this.props.buttons.indexOf(event.target.id);
            prevButton = this.props.buttons[currButton - 1]
                ? this.props.buttons[currButton - 1]
                : null;

            if (currButton === this.props.buttons.length - 1) {
                ++event.target.selectedIndex;
            }

            return prevButton ? this[prevButton].focus() : false;
        case 39: // Right
            currButton = this.props.buttons.indexOf(event.target.id);
            nextButton = this.props.buttons[currButton + 1]
                ? this.props.buttons[currButton + 1]
                : null;

            if (currButton === 0) {
                --event.target.selectedIndex;
            }

            return nextButton ? this[nextButton].focus() : false;
        case 40: // Down
            if (event.target.className === 'diceroll') {
                this.clearLogBtn.focus();
            }
            break;
        case 38: // Up
            if (event.target.id === 'clearLog') {
                this.d4.focus();
            }
            break;
        default:
            break;
        }
    }

    renderLog = () => {
        return (
            <div dangerouslySetInnerHTML={ { __html: this.props.log } } />
        );
    }

    clearLog = () => {
        this.props.updateLog('');
        this.d4.focus();
    }

    render() {
        return (
            <div id="container">
                <p className="nobr">n</p>
                <select
                    id="n"
                    ref={ (elem) => this.n = elem }
                    defaultValue={ this.props.n }
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

                <button id="d4" className="diceroll" ref={ (elem) => this.d4 = elem } onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d4</button>
                <button id="d6" className="diceroll" ref={ (elem) => this.d6 = elem } onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d6</button>
                <button id="d8" className="diceroll" ref={ (elem) => this.d8 = elem } onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d8</button>
                <button id="d10" className="diceroll" ref={ (elem) => this.d10 = elem } onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d10</button>
                <button id="d12" className="diceroll" ref={ (elem) => this.d12 = elem } onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d12</button>
                <button id="d20" className="diceroll" ref={ (elem) => this.d20 = elem } onKeyDown={ this.handleKeyPress } onClick={ this.dieRoll }>d20</button>

                <select
                    id="mod"
                    ref={ (elem) => this.mod = elem }
                    defaultValue={ this.props.mod }
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

                <button
                    id="clearLog"
                    onClick={ this.clearLog }
                    onKeyDown={ this.handleKeyPress }
                    ref={ (elem) => this.clearLogBtn = elem }
                >
                    Clear Log
                </button>

                <div id="logContainer">
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

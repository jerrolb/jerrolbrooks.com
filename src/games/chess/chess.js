import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BOOL, COLORS, PIECES, FILES, RANKS, SQUARES, FILESBOARD, RANKSBOARD, numberOfSquaresOnBoard, fileRankToSquare } from './config/constants';
// import './chess.css';
import $ from 'jquery';

class Chess extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
    };

    componentDidMount() {
        this.initFilesRanksBoard();
        $(function () {
            document.getElementById('container').innerHTML = 'Coming Soon';
        });
        console.log(BOOL, COLORS, PIECES);
    }

    initFilesRanksBoard = () => {
        let index = 0;
        let file = FILES.FILE_A;
        const rank = RANKS.RANK_1;
        let square = SQUARES.A1;

        for (index = 0; index < numberOfSquaresOnBoard; ++index) {
            for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
                square = fileRankToSquare(file.rank);
                FILESBOARD[square] = file;
                RANKSBOARD[square] = rank;
            }
        }
    }

    render() {
        return (
            <div id="container">
            </div>
        );
    }
}

function mapStateToProps (state) {
}

function mapDispatchToProps (dispatch) {
}

export default connect(mapStateToProps, mapDispatchToProps)(Chess);

import { $, $$ } from "../../util/util.js";
import {
    URL,
    ARROW_UP,
    ARROW_DOWN,
    DIRECTION_UP,
    DIRECTION_DOWN,
    ENTER_KEY
} from "../../util/constants.js";

import css from "./search_bar.scss";

class SearchBar {
    constructor(searchList) {
        this.searchList = searchList;
        this.timer = null;
        this.hitList = null;
    }

    // 참고: https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa
    inputEventListener(event) {
        const targetString = event.target.value;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (targetString === "") {
            $(".hitlist-wrapper").style.display = "none";
            return;
        }

        this.timer = setTimeout(function () {
            fetch(URL.DEV.API_SERVER_SEARCH.ADDRESS + targetString)
                .then(res => res.json())
                .then(titles => this.searchList.setTargetTitle(targetString, titles));
        }.bind(this), 200);
    }

    isArrowKeyCode(keyCode) {
        return keyCode === ARROW_UP || keyCode === ARROW_DOWN;
    }

    shutDownSearchList() {
        if (this.hitList === null) {
            this.hitList = $(".hitlist-wrapper");
        }

        this.hitList.style.display = "none";
    }

    isHitListOn() {
        if (this.hitList === null) {
            this.hitList = $(".hitlist-wrapper");
        }

        return this.hitList.style.display === "block";
    }


    giveSelectedWordToTarget(toNode, fromNode, parentNode, direction) {
        fromNode.classList.remove("selected-word");
        if (toNode === null) {
            if (direction === DIRECTION_DOWN) {
                parentNode[0].classList.add("selected-word");
                return;
            }
            parentNode[parentNode.length - 1].classList.add("selected-word");
            return;
        }

        toNode.classList.add("selected-word");
    }

    handleKeyMovement(arrowDirection) {
        if (this.isHitListOn() === false) {
            return;
        }

        const selected = $(".hitlist-wrapper .selected-word");
        const liDOMS = [...$(".hitlist-wrapper ul").children];

        if (!selected) {
            liDOMS[0].classList.add("selected-word");
            return;
        }

        if (arrowDirection === DIRECTION_DOWN) {
            const nextTarget = selected.nextSibling;
            this.giveSelectedWordToTarget(nextTarget, selected, liDOMS, DIRECTION_DOWN);
            return;
        }

        const previousTarget = selected.previousSibling;
        this.giveSelectedWordToTarget(previousTarget, selected, liDOMS, DIRECTION_UP);
    }

    movedSelectedWordToInputBox() {
        const selected = $(".hitlist-wrapper .selected-word");

        if (!selected) {
            return;
        }

        const text = [...selected.querySelectorAll('span')]
            .reduce((acc, spanTag) => {
                acc += spanTag.innerHTML;
                return acc;
            }, "");

        if (text === "") {
            return;
        }

        $("#search-bar-input").value = text;
        this.shutDownSearchList();
    }

    keyDownEventListener(event) {
        const { keyCode } = event;

        if (keyCode === ENTER_KEY) {
            this.movedSelectedWordToInputBox();
            return;
        }

        if (this.isArrowKeyCode(keyCode) === false) {
            return;
        }

        if (keyCode === ARROW_UP) {
            this.handleKeyMovement(DIRECTION_UP);
            return;
        }

        if (keyCode === ARROW_DOWN) {
            this.handleKeyMovement(DIRECTION_DOWN);
        }
    }

    addInputEvent() {
        $('#search-bar-input').addEventListener('input', this.inputEventListener.bind(this));
        $('#search-bar-input').addEventListener('keydown', this.keyDownEventListener.bind(this));
        $('.icon-wrapper').addEventListener("click", this.shutDownSearchList.bind(this));
        $('body').addEventListener("click", this.shutDownSearchList.bind(this));
    }

    render() {
        return `<div id="amazon-logo"></div>
                <div class="search-bar-wrapper">
                    <div class="category-wrapper">
                        <div class="search-bar-category">
                            <select name="category">
                                <option value="all">All</option>
                                <option value="album">Album</option>
                                <option value="app">App & Game</option>
                                <option value="book">Book</option>
                                <option value="home">Home</option>
                                <option value="sports">Sports</option>
                                <option value="software">Software</option>
                                <option value="toy">Toy</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <input id="search-bar-input" type="text"></input>
                        <div class="hitlist-wrapper"></div>
                    </div>
                    <div class="icon-wrapper">
                        <div class="search-bar-icon">
                            <i class="fas fa-search"></i>
                        </div>
                    </div>
                </div>
                `;
    }
}

export default SearchBar;
import { $, $$ } from "../../util/util.js";
import { URL, KEY_CODE, DIRECTION, SCROLL, CSS_CLASS } from "../../util/constants.js";

import css from "./search_bar.scss";

class SearchBar {
    constructor(searchList) {
        this.searchList = searchList;
        this.timer = null;
        this.hitList = null;
    }

    // 참고: https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa
    inputEventListener(event) {
        const { target: { value } } = event;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (value === "") {
            $(".hitlist-wrapper").hide();
            return;
        }

        this.timer = setTimeout(function () {
            fetch(URL.PROD.API_SERVER_SEARCH.ADDRESS + value)
                .then(res => res.json())
                .then(titles => this.searchList.setTargetTitle(value, titles));
        }.bind(this), 200);
    }

    isArrowKeyCode(keyCode) {
        return keyCode === KEY_CODE.ARROW_UP || keyCode === KEY_CODE.ARROW_DOWN;
    }

    isSearchListArea(target) {
        const inspectionClassList = Object.values(CSS_CLASS);
        return inspectionClassList.some(inspectionCandidate => target.classList.contains(inspectionCandidate));
    }

    clickAnywereElse(event) {
        const { target } = event;
        if (this.isSearchListArea(target)) {
            return;
        }
        this.shutDownSearchList();
    }

    shutDownSearchList() {
        if (this.hitList === null) {
            this.hitList = $(".hitlist-wrapper");
        }

        this.hitList.hide();
    }

    isHitListOn() {
        if (this.hitList === null) {
            this.hitList = $(".hitlist-wrapper");
        }

        return this.hitList.show();
    }


    giveSelectedWordToTarget(toNode, fromNode, parentNode, direction) {
        fromNode.classList.remove("selected-word");

        if (toNode === null) {
            if (direction === DIRECTION.DOWN) {
                parentNode[0].classList.add("selected-word");
                $('.hitlist-wrapper').setScrollTop(SCROLL.TOP_START);
                return;
            }
            parentNode[parentNode.length - 1].classList.add("selected-word");
            $('.hitlist-wrapper').setScrollTop(SCROLL.BOTTOM_END);
            return;
        }

        toNode.classList.add("selected-word");
    }

    scrollUpAndDown(direction) {
        const hitList = $('.hitlist-wrapper');
        const scorllDistanceFromTop = hitList.scrollTop;

        if (direction === DIRECTION.DOWN) {
            hitList.setScrollTop(scorllDistanceFromTop + SCROLL.ONE_UNIT);
            return;
        }
        hitList.setScrollTop(scorllDistanceFromTop - SCROLL.ONE_UNIT);
    }

    handleKeyMovement(arrowDirection) {
        if (!this.isHitListOn()) {
            return;
        }

        const selected = $(".hitlist-wrapper .selected-word");
        const liDOMS = [...$(".hitlist-wrapper ul").children];

        if (!selected) {
            liDOMS[0].classList.add("selected-word");
            return;
        }

        if (arrowDirection === DIRECTION.DOWN) {
            const nextTarget = selected.nextSibling;
            this.giveSelectedWordToTarget(nextTarget, selected, liDOMS, DIRECTION.DOWN);
            this.scrollUpAndDown(DIRECTION.DOWN);
            return;
        }

        const previousTarget = selected.previousSibling;
        this.giveSelectedWordToTarget(previousTarget, selected, liDOMS, DIRECTION.UP);
        this.scrollUpAndDown(DIRECTION.UP);
    }

    movedSelectedWordToInputBox() {
        const selected = $(".hitlist-wrapper .selected-word");

        if (!selected) {
            return;
        }

        const selectedWord = [...selected.querySelectorAll('span')]
            .reduce((acc, spanTag) => {
                acc += spanTag.innerHTML;
                return acc;
            }, "");

        if (selectedWord === "") {
            return;
        }

        $("#search-bar-input").value = selectedWord;
        this.shutDownSearchList();
    }

    keyDownEventListener(event) {
        const { keyCode } = event;

        if (keyCode === KEY_CODE.ENTER_KEY) {
            this.movedSelectedWordToInputBox();
            return;
        }

        if (this.isArrowKeyCode(keyCode) === false) {
            return;
        }

        if (keyCode === KEY_CODE.ARROW_UP) {
            this.handleKeyMovement(DIRECTION.UP);
            return;
        }

        if (keyCode === KEY_CODE.ARROW_DOWN) {
            this.handleKeyMovement(DIRECTION.DOWN);
        }
    }

    handleMouseClickLiTag(inputBox, target) {
        inputBox.value = [...target.querySelectorAll('span')]
            .reduce((acc, spanTag) => {
                acc += spanTag.innerHTML;
                return acc;
            }, "");
    }

    changeInputValue(event) {
        if (this.isHitListOn() === false) {
            return;
        }
        const { target } = event;

        if (target.innerHTML === "No Results Matched") {
            return;
        }

        const targetClassList = [...target.classList];

        if (targetClassList.doesElementExist("search-list-words") || targetClassList.doesElementExist("hitlist-wrapper")) {
            return;
        }

        const inputBox = $("#search-bar-input");

        if (targetClassList.doesElementExist("search-list-word")) {
            this.handleMouseClickLiTag(inputBox, target);
        }

        if (targetClassList.doesElementExist("target-word")) {
            inputBox.value = target.innerHTML + target.nextSibling.innerHTML;
        }

        if (targetClassList.doesElementExist("rest-word")) {
            inputBox.value = target.previousSibling.innerHTML + target.innerHTML;
        }

        this.shutDownSearchList();
    }

    addInputEvent() {
        $('#search-bar-input').addEventListener('input', this.inputEventListener.bind(this));
        $('#search-bar-input').addEventListener('keydown', this.keyDownEventListener.bind(this));
        $('.icon-wrapper').addEventListener("click", this.shutDownSearchList.bind(this));
        $('body').addEventListener("click", this.clickAnywereElse.bind(this));
        $(".hitlist-wrapper").addEventListener("click", this.changeInputValue.bind(this));
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
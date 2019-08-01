import {debounce} from "../../koon.js";

class SearchController {
    get recentData() {
        return this.recentModel.data;
    }
    
    constructor(searchForm, autoList, recentList, recentModel, autoModel) {
        this.searchForm = searchForm;
        this.autoList = autoList;
        this.recentList = recentList;
        this.recentModel = recentModel;
        this.autoModel = autoModel;
        this.eventSetting();
        this.currentList = "recentList";
        this.searchEvent = debounce(this.searchEvent.bind(this), 300);
    }

    eventSetting() {
        document.addEventListener('keydown', (evt) => {
            if(evt.key === "Enter") {
                evt.preventDefault();
            }
        })

        document.addEventListener('keyup', (evt) => {
            if(evt.key === 'Escape') {
                this.focusEvent({'detail' : '@esc'});
            }
        })

        this.searchForm.focusEvent = this.focusEvent.bind(this);
    }

    init() {
        this.searchForm.init();
    }

    focusEvent(event) {
        if(event.detail === '@onFocus') {
            this.recentList.render(this.recentData);

        } else if((event.detail === '@outFocus') || (event.detail === '@esc')) {
            this.currentList = 'recentList';
            this.recentList.hide();
            this.autoList.hide();
            this.searchForm.inputEl.value = '';
            this.searchForm.inputEl.blur();

        } else if(event.detail === '@onKeyUp') {
            this.keyEvent(event.target);
        }
    }

    keyEvent(target) {
        if(target === 'ArrowUp') {
            this.arrowEvent('up');

        } else if(target === 'ArrowDown') {
            this.arrowEvent('down');

        } else if(target === 'Enter') {
            this.enterEvent()

        } else {
            this.searchEvent();
        }
    }

    searchEvent() {
        this.recentList.hide();
        this.currentList = 'autoList';

        let keyword = this.searchForm.inputEl.value;
        this.checkWord(keyword)
            .then((data) => {
                this.autoList.render(keyword, data);
            })
    }

    arrowEvent(direction) {
        let txtValue;

        if(this.currentList === 'recentList') {
            txtValue = this.recentList.focus(direction);
        } else {
            txtValue = this.autoList.focus(direction);
        }
        
        this.searchForm.inputEl.value = txtValue;
    }

    enterEvent() {
        this.currentList = 'recentList';
        let data = this.searchForm.inputEl.value;
        this.recentModel.saveData(data);
        this.recentList.hide();
        this.autoList.hide();
        this.searchForm.inputEl.value = '';
    }

    async checkWord(keyword) {
        let answer = await this.autoModel.fetchKeyword(keyword);
        return answer;
    };
}

export default SearchController;
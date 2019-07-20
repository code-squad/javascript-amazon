class SearchController {
    constructor(searchForm, autoList, recentList, recentModel, autoModel) {
        this.searchForm = searchForm;
        this.autoList = autoList;
        this.recentList = recentList;
        this.recentModel = recentModel;
        this.autoModel = autoModel;
        this.eventSetting();
        this.currentList = "recentList";
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
            let data = this.recentModel.data;
            this.recentList.render(data);

        } else if((event.detail === '@outFocus') || (event.detail === '@esc')) {
            this.recentList.hide();
            this.autoList.hide();
            this.searchForm.inputEl.value = '';

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
            this.recentList.hide();
            this.currentList = 'autoList';

            let target = this.searchForm.inputEl.value;
            let answer = this.checkWord(target);
            this.autoList.render(target, answer);
 
        }
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

    checkWord(target) {
        let answer = undefined;
        this.autoModel.map((v) => {
            if(target === v.key || target.includes(v.key)) {
                answer =  v.list;
                return;
            } else {
                this.autoList.hide();
            }
        })

        return answer;
    };
}

export default SearchController;
class Search {
    constructor (data,{autoComplete,input}) {
        this.autoComplete = autoComplete;
        this.data = data;
        this.input = input;
        this.autoCompleteItems;
        this.currentTargetIndex=-1;
        this.handleInputChange();
        this.handleKeyDown();
        this.closeAllList()
    }
    handleInputChange () {
        this.input.addEventListener('input',(e)=>{
            const value = this.input.value;
            if (!value) return;
            const autoCompleteItemsExits = !!document.querySelector('.autocomplete-items');
            if (autoCompleteItemsExits) {
                this.autoCompleteItems.parentNode.removeChild(this.autoCompleteItems);
            }
            this.autoCompleteItems = document.createElement('div');
            this.autoCompleteItems.classList.add('autocomplete-items')
            this.autoComplete.appendChild(this.autoCompleteItems);
            const addList =()=>{
                this.data.forEach((dataValue)=>{
                if (dataValue.substring(0,value.length).toUpperCase()===value.toUpperCase()) {
                    const contentDiv = document.createElement('div');
                    contentDiv.innerHTML=`<strong>${dataValue.substring(0,value.length)}</strong>${dataValue.substring(value.length)}<input type='hidden' value='${dataValue}'>`
                    this.autoCompleteItems.appendChild(contentDiv);   
                    contentDiv.addEventListener('click',(e)=>{
                        this.input.value = e.target.querySelector('input').value;
                    })
                }
                })
            }
            setTimeout(()=>{
               addList();
            },300)
        })
    }
    closeAllList () {
        document.addEventListener('click',(e)=>{
            e.preventDefault();
            const itemContainer=document.querySelector('.autocomplete-items');
            if (!itemContainer) return;            
            if (e.target!==this.input && e.target!==itemContainer ) {
                itemContainer.parentNode.removeChild(itemContainer);
            }
        })
    }
    handleKeyDown () {
        this.input.addEventListener('keydown',(e)=>{
            if (e.which === 40) {
                this.currentTargetIndex++;
                if (!this.autoCompleteItems) return;
                let checkOutOfListIndex=this.currentTargetIndex >= this.autoCompleteItems.children.length;
                if (checkOutOfListIndex) this.currentTargetIndex=0;
                Array.from(this.autoCompleteItems.children).forEach((item)=>{
                    item.classList.remove('autocomplete-active')});
                let choosedTarget =this.autoCompleteItems.children[this.currentTargetIndex];
                choosedTarget=this.autoCompleteItems.children[this.currentTargetIndex];
                choosedTarget.classList.add('autocomplete-active');
                this.input.value = choosedTarget.querySelector('input').value
            } else if (e.which === 38) {
                this.currentTargetIndex--;
                if (!this.autoCompleteItems) return;
                let checkOutOfListIndex=this.currentTargetIndex < 0;
                if (checkOutOfListIndex) this.currentTargetIndex=this.autoCompleteItems.children.length-1;
                Array.from(this.autoCompleteItems.children).forEach((item)=>{
                   item.classList.remove('autocomplete-active')});
                let choosedTarget =this.autoCompleteItems.children[this.currentTargetIndex];
                choosedTarget=this.autoCompleteItems.children[this.currentTargetIndex];
                choosedTarget.classList.add('autocomplete-active');
                this.input.value = choosedTarget.querySelector('input').value
            } else if (e.which === 13) {
                e.preventDefault();
                if (this.currentTargetIndex > -1) {                    
                    this.autoCompleteItems.children[this.currentTargetIndex].click(); 
                }
            }
        })
    }   
}

window.addEventListener('DOMContentLoaded',()=>{
    fetch('./searchData.json')
        .then((data)=>data.json())
        .then((searchData)=>{
            const targetElement= {
                autoComplete : document.querySelector('.autocomplete'),
                input : document.querySelector('input#searchBar')   
            }
            const search = new Search(searchData.data,targetElement);       
        });
})

